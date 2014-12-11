"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    collection = require('../objectCollection.js'),
    renderer = require('../renderer.js'),
    PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var enemy = null;

var texture = textureCollection.get('enemy-indicator');

module.exports = GameObject.createFactory(
    {
        x: 0,
        y: 0,
        sprite: null,
        initialize: function (element) {
            element.sprite = new PIXI.Sprite(texture);
        },
        postUpdate: function (element) {
            if (enemy === null) {
                enemy = collection.getArray('enemy')[0];
            }
        },
        render: function (element) {
            element.sprite.x = (enemy ? enemy.x + enemy.sprite.width / 2 : renderer.screenWidth / 2) - element.sprite.width / 2;
            element.sprite.y = renderer.screenHeight - element.sprite.height;
        }
    }
);
