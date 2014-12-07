"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('enemy-sprite');

module.exports = {
    initialize : function(element) {
        element.sprite = new PIXI.Sprite(texture);
    },
    render : function(element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
    }
};
