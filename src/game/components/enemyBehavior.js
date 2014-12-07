"use strict";

var Pattern = require('../patterns/pattern'),
    collection = require('../objectCollection'),
    renderer = require('../renderer'),
    Victor = require('victor'),
    Sequence = require('../patterns/sequence'),
    ParallelSequence = require('../patterns/parallelSequence');

var player = null;

module.exports = {
    nextPosition : null,
    moveDuration : 6000,
    moveCounter : 0,
    initialize : function (element) {
        element.pattern = new Pattern(element, { x: 0, y: 0});
        /*
        element.sequence = new Sequence([
            ['burst', 5, 0.3, 0, false],
            ['burst', 5, 0.3, Math.PI, false],
            ['burst', 5, 0.3, Math.PI / 2, false],
            ['burst', 5, 0.3, Math.PI * 3 / 2, false],
            ['wait', 100],
            ['rotate', Math.PI / 4],
            ['burst', 5, 0.3, 0, false],
            ['burst', 5, 0.3, Math.PI, false],
            ['burst', 5, 0.3, Math.PI / 2, false],
            ['burst', 5, 0.3, Math.PI * 3 / 2, false],
            ['rotate', 0.45 - Math.PI / 2],
            ['wait', 100]
        ], 0);
        */


        element.sequence = new Sequence([
            ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
            ['bulletSpeed', 100],
            ['burst', 12, Math.PI * 2, 0, false],
            ['randomShot', 3, Math.PI / 2, 0, false],
            ['wait', 50],
            ['increaseBulletSpeed', 8],
            ['burst', 12, Math.PI * 2, -0.06, false],
            ['randomShot', 4, Math.PI / 2, 0, false],
            ['wait', 50],
            ['increaseBulletSpeed', 8],
            ['burst', 12, Math.PI * 2, -0.12, false],
            ['increaseBulletSpeed', 120],
            ['bulletSprite', 'medium-enemy-bullet-yellow'],
            ['randomShot', 12, Math.PI * 2, 0, false],
            ['wait', 150],
            ['rotate', 0.3]
        ], 0);

        /*
        element.sequence = new ParallelSequence([
            new Sequence([
                ['burst', 2, 0.5, 0, false],
                ['wait', 150]
            ]),
            new Sequence([
                ['burst', 2, 0.5, Math.PI, false],
                ['wait', 200]
            ]),
            new Sequence([
                ['randomShot', 15, Math.PI - 0.5, Math.PI / 2, false],
                ['randomShot', 15, Math.PI - 0.5, -Math.PI / 2, false],
                ['wait', 40]
            ]),
            new Sequence([
                ['randomShot', 3, Math.PI * 2, 0, false],
                ['wait', 40],
                ['rotate', 0.01]
            ])
        ]);
        */

    },
    update : function(element, dt) {
        if(player === null) {
            player = collection.getArray('player')[0];
            element.pattern.setDestination(player);
        }



        element.pattern.update();
        element.sequence.update(element.pattern, dt);

        var margin = 20,
            distance = 350;

        if(element.moveCounter <= 0 && Math.random() > 0.99) {
            element.nextPosition = {
                x: Math.min(renderer.screenWidth - margin, Math.max(margin, element.x + (Math.random() - 0.5) * distance)),
                y: Math.min(renderer.screenHeight / 5, Math.max(margin, element.y + (Math.random() - 0.5) * distance / 5))
            };

            element.moveCounter = element.moveDuration;
        }
    },
    postUpdate : function(element, dt) {
        if(element.nextPosition) {
            element.moveCounter -= dt;
            var v = new Victor(element.x, element.y);
            v.mix(element.nextPosition, Math.min(1, 1 - (element.moveCounter / element.moveDuration)));

            element.x = v.x;
            element.y = v.y;
        }
    }
};
