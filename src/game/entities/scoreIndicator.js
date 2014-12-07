"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject'),
    PIXI = require('pixi.js'),
    numeral = require('numeral');

module.exports = GameObject.createFactory(
    {
        x : 10,
        y : 10,
        score : 0,
        initialize : function (element) {
            element.numeralScore = numeral(element.score);
            element.numeralScore.format('0,0');
            element.sprite = new PIXI.Text(element.score, { fill : "#FFFFFF", stroke : "#777777", strokeThickness : 4 });
        },
        render : function(element) {
            element.sprite.x = element.x;
            element.sprite.y = element.y;
        },
        setScore : function (score) {
            this.score = score;
            this.numeralScore.set(this.score);
            this.sprite.setText(this.numeralScore.format());
        }
    }
);
