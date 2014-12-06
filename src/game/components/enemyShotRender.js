"use strict";

var PIXI = require('pixi.js');
var texture = PIXI.Texture.fromImage('./assets/images/placeholder.png', false);

module.exports = {
    initialize : function(element) {
        element.sprite = new PIXI.Sprite(texture);
    },
    render : function(element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
    }
};
