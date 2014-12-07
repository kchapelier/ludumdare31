"use strict";

var PIXI = require('pixi.js');
var texture = PIXI.Texture.fromImage('./assets/images/medium-enemy-bullet-yellow.png', false);

module.exports = {
    initialize : function(element) {
        element.sprite = new PIXI.Sprite(texture);
    },
    render : function(element) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;
    }
};
