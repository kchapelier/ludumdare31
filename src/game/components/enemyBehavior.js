"use strict";

var Pattern = require('../patterns/pattern'),
    collection = require('../objectCollection'),
    renderer = require('../renderer'),
    Victor = require('victor'),
    enemySequenceLoop = require('../patterns/sequences/enemySequenceLoop');
/*
    Sequence = require('../patterns/sequence'),
    //ParallelSequence = require('../patterns/parallelSequence'),
    RandomLoopSequence = require('../patterns/randomLoopSequence');
*/
var player = null;

module.exports = {
    nextPosition: null,
    moveDuration: 6000,
    moveCounter: 0,
    initialize: function (element) {
        element.pattern = new Pattern(element, {
            x: 0,
            y: 0
        });

        element.sequence = enemySequenceLoop;
    },
    update: function (element, dt) {
        if (player === null) {
            player = collection.getArray('player')[0];
            element.pattern.setDestination(player);
        }

        element.pattern.update();
        element.sequence.update(element.pattern, dt);

        var margin = 20,
            distance = 350;

        if (element.moveCounter <= 0 && Math.random() > 0.99) {
            element.nextPosition = {
                x: Math.min(renderer.screenWidth - margin, Math.max(margin, element.x + (Math.random() - 0.5) * distance)),
                y: Math.min(renderer.screenHeight / 5, Math.max(margin, element.y + (Math.random() - 0.5) * distance / 5))
            };

            element.moveCounter = element.moveDuration;
        }
    },
    postUpdate: function (element, dt) {
        if (element.nextPosition) {
            element.moveCounter -= dt;
            var v = new Victor(element.x, element.y);
            v.mix(element.nextPosition, Math.min(1, 1 - (element.moveCounter / element.moveDuration)));

            element.x = v.x;
            element.y = v.y;
        }
    }
};
