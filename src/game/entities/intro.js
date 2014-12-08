"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    PIXI = require('pixi.js'),
    numeral = require('numeral');

module.exports = GameObject.createFactory(
    {
        score : 0,
        initialize : function (element) {
            element.sprite = new PIXI.DisplayObjectContainer();
            element.numeralScore = numeral(element.score);
            element.numeralScore.format('0,0');
            element.highScoreElement = new PIXI.Text('Highscore: ' + element.score, { font : '20px Arial',fill : "#FFFFFF", stroke : "#222222", strokeThickness : 4 });
            element.highScoreElement.visible = false;

            element.commandsElement = new PIXI.Text('Arrows or WASD to move.\r\nSPACE or X to shoot.\r\SHIFT, CTRL or V to focus.', { font : 'normal 20px Arial',fill : "#FFFFFF", stroke : "#222222", strokeThickness : 4 });
            element.pressElement = new PIXI.Text('Press SPACE to play', { font : '30px Arial',fill : "#FFFFFF", stroke : "#222222", strokeThickness : 4 });

            element.highScoreElement.x = 10;
            element.highScoreElement.y = 10;

            element.commandsElement.x = 10;
            element.commandsElement.y = 200;

            element.pressElement.x = 10;
            element.pressElement.y = 300;

            element.sprite.addChild(element.highScoreElement);

            element.sprite.addChild(element.commandsElement);

            element.sprite.addChild(element.pressElement);
        },
        render : function(element) {},
        setHighScore : function (scores) {
            console.log(scores);
            this.score = scores.normal;
            this.numeralScore.set(this.score);
            this.highScoreElement.setText('Highscore: ' + this.numeralScore.format());
            this.highScoreElement.visible = true;
        }
    }
);
