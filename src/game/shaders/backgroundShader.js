"use strict";

var PIXI = require('pixi.js');

var BackgroundShader = function() {
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        playerPositionX: {type: '1f', value: 0},
        playerPositionY: {type: '1f', value: 0},
        enemyPositionX: {type: '1f', value: 0},
        enemyPositionY: {type: '1f', value: 0},
        screenWidth: {type: '1f', value: 0},
        screenHeight: {type: '1f', value: 0}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float playerPositionX;',
        'uniform float playerPositionY;',
        'uniform float enemyPositionX;',
        'uniform float enemyPositionY;',
        'uniform float screenWidth;',
        'uniform float screenHeight;',

        'void main(void) {',
        '   float distPlayer = sqrt(pow(vTextureCoord.x - (playerPositionX + 16.) / screenWidth, 2.) + pow(vTextureCoord.y - (screenHeight - playerPositionY - 16.) / screenHeight, 2.));',
        '   float distEnemy = sqrt(pow(vTextureCoord.x - (enemyPositionX + 16.) / screenWidth, 2.) + pow(vTextureCoord.y - (screenHeight - enemyPositionY) / screenHeight, 2.));',
        '   float whiteness = clamp((1. - distEnemy), 0., 0.85);',
        '   float blackness = 1. - whiteness / 1.3 + 1. - distPlayer + abs(vTextureCoord.x - 0.5) * pow(10., 1. - vTextureCoord.y);',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.,1.,1.), whiteness);',
        '   gl_FragColor.rgba = mix(gl_FragColor.rgba, vec4(0., 0., 0., 0.85 - distPlayer), blackness);',
        '}'
    ];
};

BackgroundShader.prototype = Object.create( PIXI.AbstractFilter.prototype );
BackgroundShader.prototype.constructor = BackgroundShader;

Object.defineProperty(BackgroundShader.prototype, 'player', {
    get: function() {
        return {
            x : this.uniforms.playerPositionX.value,
            y : this.uniforms.playerPositionY.value
        };
    },
    set: function(value) {
        this.uniforms.playerPositionX.value = value.x;
        this.uniforms.playerPositionY.value = value.y;
    }
});

Object.defineProperty(BackgroundShader.prototype, 'enemy', {
    get: function() {
        return {
            x : this.uniforms.enemyPositionX.value,
            y : this.uniforms.enemyPositionY.value
        };
    },
    set: function(value) {
        this.uniforms.enemyPositionX.value = value.x;
        this.uniforms.enemyPositionY.value = value.y;
    }
});

Object.defineProperty(BackgroundShader.prototype, 'renderer', {
    get: function() {
        return {
            width : this.uniforms.screenWidth.value,
            height : this.uniforms.screenHeight.value
        };
    },
    set: function(value) {
        this.uniforms.screenWidth.value = value.screenWidth;
        this.uniforms.screenHeight.value = value.screenHeight;
    }
});

module.exports = BackgroundShader;
