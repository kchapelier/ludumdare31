"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    collection = require('../objectCollection.js'),
    renderer = require('../renderer.js'),
    PIXI = require('pixi.js');

var player = null;

var screen

module.exports = GameObject.createFactory(
    {
        x : 0,
        y : 0,
        sprite : null,
        width : null,
        initialize : function (element) {
            element.sprite = new PIXI.DisplayObjectContainer();

            for(var i = 0; i < 10; i++) {
                element.createRandomGraphic();
            }
        },
        createRandomGraphic : function() {
            // create a new graphics object
            var graphics = new PIXI.Graphics();

            // begin a green fill..
            graphics.beginFill(0x000000, 0.1);

            // draw a triangle using lines
            graphics.moveTo((0.2 + Math.random() * 0.6) * renderer.screenWidth, (0.4 + Math.random() * 4) * renderer.screenHeight);
            graphics.lineTo((0.0 + Math.random() * 0.5) * renderer.screenWidth, 0);
            graphics.lineTo((1.0 - Math.random() * 0.5) * renderer.screenWidth, 0);

            // end the fill
            graphics.endFill();

            graphics.x = (Math.random() - 0.5) * renderer.screenWidth;

            // add it the stage so we see it on our screens..
            this.sprite.addChild(graphics);
        },
        postUpdate : function (element) {
            if(player === null) {
                player = collection.getArray('player')[0];
            }
        }
    }
);
