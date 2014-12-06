"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    collection = require('../objectCollection.js'),
    renderer = require('../renderer.js'),
    PIXI = require('pixi.js');

var enemy = null;

module.exports = GameObject.createFactory(
    {
        x : 0,
        y : 0,
        sprite : null,
        width : null,
        initialize : function (element) {
            element.sprite = new PIXI.Text('enemy', { fill : "#000000" });
            element.width = element.sprite.width;
            element.height = element.sprite.height;
        },
        postUpdate : function (element) {
            if(enemy === null) {
                enemy = collection.getArray('enemy')[0];
            }
        },
        render : function(element) {
            element.sprite.x = (enemy ? enemy.x + enemy.sprite.width / 2 : renderer.screenWidth / 2) - element.width / 2;
            element.sprite.y = renderer.screenHeight - element.height;
        }
    }
);
