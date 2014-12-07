"use strict";

var PIXI = require('pixi.js');
var texture = PIXI.Texture.fromImage('./assets/images/player-bullet.png', false);

module.exports = {
    initialize : function(element) {
        element.sprite = new PIXI.Sprite(texture);
    },
    render : function(element) {
        element.sprite.x = Math.round(element.x) + (32 - element.sprite.width) / 2;
        element.sprite.y = Math.round(element.y);
    }
};
