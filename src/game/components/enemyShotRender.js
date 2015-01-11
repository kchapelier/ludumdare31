"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('small-enemy-bullet-yellow');

module.exports = {
    initialize: function (element) {
        var bulletTexture;

        if (!!element.texture) {
            bulletTexture = textureCollection.get(element.texture);
        }

        element.sprite = new PIXI.Sprite(bulletTexture ? bulletTexture : texture);
    },
    render: function (element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
    },
    setTexture: function(texture) {
        this.sprite.setTexture(textureCollection.get(texture));
    }
};
