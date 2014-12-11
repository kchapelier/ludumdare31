"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    collection = require('../objectCollection.js'),
    renderer = require('../renderer.js'),
    BackgroundShader = require('../shaders/backgroundShader'),
    PIXI = require('pixi.js');

var player = null,
    enemy = null;

module.exports = GameObject.createFactory(
    {
        x: 0,
        y: 0,
        sprite: null,
        width: null,
        initialize: function (element) {
            element.sprite = new PIXI.DisplayObjectContainer();
            element.shader = new BackgroundShader();
            element.sprite.filters = [element.shader];

            for (var i = 0; i < 10; i++) {
                element.createRandomGraphic();
            }
        },
        createRandomGraphic: function () {
            // create a new graphics object
            var graphics = new PIXI.Graphics();

            // begin a green fill..
            graphics.beginFill(0x000010, 0.15);

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
        postUpdate: function (element) {
            if (player === null || enemy === null) {
                player = collection.getArray('player')[0];
                enemy = collection.getArray('enemy')[0];
            }

            element.shader.renderer = renderer;
            element.shader.player = player;
            element.shader.enemy = enemy;
        }
    }
);
