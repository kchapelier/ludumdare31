"use strict";

var Pattern = require('../patterns/pattern'),
    collection = require('../objectCollection'),
    renderer = require('../renderer'),
    Victor = require('victor'),
    Sequence = require('../patterns/sequence'),
    //ParallelSequence = require('../patterns/parallelSequence'),
    RandomLoopSequence = require('../patterns/randomLoopSequence');

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

        element.sequence = new RandomLoopSequence([
            new RandomLoopSequence([
                new Sequence([
                    ['bulletSpeed', 180],
                    ['rotate', 0.2],
                    ['bulletSprite', 'small-enemy-bullet-blue'],
                    ['randomShot', 12, Math.PI / 2 - 0.5, Math.PI / 2, false],
                    ['bulletSprite', 'small-enemy-bullet-red'],
                    ['randomShot', 15, Math.PI / 1.5 - 0.5, -Math.PI / 2, false]
                ], 140),
                new Sequence([
                    ['bulletSpeed', 200],
                    ['bulletSprite', 'medium-enemy-bullet-yellow'],
                    ['randomShot', 25, Math.PI - 0.7, Math.PI / 2, false],
                    ['randomShot', 25, Math.PI - 0.7, -Math.PI / 2, false]
                ], 10)
            ], 0, 1),
            new RandomLoopSequence([
                new Sequence([
                    ['wait', 75],
                    ['bulletSpeed', 270],
                    ['randomAngle'],
                    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
                    ['burst', 10, Math.PI / 4, 0, false],
                    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
                    ['burst', 10, Math.PI / 4, Math.PI / 2, false],
                    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
                    ['burst', 10, Math.PI / 4, Math.PI / 2 * 2, false],
                    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
                    ['burst', 10, Math.PI / 4, Math.PI / 2 * 3, false]
                ], 70),
                new Sequence([
                    ['wait', 65],
                    ['bulletSprite', 'small-enemy-bullet-blue'],
                    ['bulletSpeed', 350],
                    ['setAngle', 0, true],
                    ['burst', 18, Math.PI / 7, 0, false],
                    ['burst', 18, Math.PI / 7, Math.PI / 2, false],
                    ['burst', 18, Math.PI / 7, Math.PI / 2 * 2, false],
                    ['burst', 18, Math.PI / 7, Math.PI / 2 * 3, false],
                    ['wait', 65],
                    ['bulletSprite', 'small-enemy-bullet-negative'],
                    ['bulletSpeed', 350],
                    ['setAngle', 0, true],
                    ['burst', 18, Math.PI / 6, 0, false],
                    ['burst', 18, Math.PI / 6, Math.PI / 2, false],
                    ['burst', 18, Math.PI / 6, Math.PI / 2 * 2, false],
                    ['burst', 18, Math.PI / 6, Math.PI / 2 * 3, false]
                ], 9)
            ], 0, 1),
            new RandomLoopSequence([
                new Sequence([
                    ['bulletSpeed', 200],
                    ['bulletSprite', 'medium-enemy-bullet-yellow'],
                    ['burst', 5, 0.3, 0, false],
                    ['burst', 5, 0.3, Math.PI, false],
                    ['burst', 5, 0.3, Math.PI / 2, false],
                    ['burst', 5, 0.3, Math.PI * 3 / 2, false],
                    ['wait', 120],
                    ['rotate', 0.1, Math.PI / 4],
                    ['bulletSprite', 'small-enemy-bullet-yellow'],
                    ['burst', 5, 0.3, 0, false],
                    ['burst', 5, 0.3, Math.PI, false],
                    ['burst', 5, 0.3, Math.PI / 2, false],
                    ['burst', 5, 0.3, Math.PI * 3 / 2, false],
                    ['rotate', 0.40 - Math.PI / 2],
                    ['wait', 100]
                ], 70),
                new Sequence([
                    ['bulletSpeed', 275],
                    ['bulletSprite', 'small-enemy-bullet-red'],
                    ['burst', 5, 0.35, 0, false],
                    ['burst', 5, 0.35, Math.PI, false],
                    ['burst', 5, 0.35, Math.PI / 2, false],
                    ['burst', 5, 0.35, Math.PI * 3 / 2, false],
                    ['wait', 110],
                    ['rotate', 0.1, Math.PI / 4],
                    ['bulletSprite', 'small-enemy-bullet-red'],
                    ['burst', 5, 0.35, 0, false],
                    ['burst', 5, 0.35, Math.PI, false],
                    ['burst', 5, 0.35, Math.PI / 2, false],
                    ['burst', 5, 0.35, Math.PI * 3 / 2, false],
                    ['rotate', 0.40 - Math.PI / 2],
                    ['wait', 90]
                ], 70)
            ], 0, 1),
            new RandomLoopSequence([
                new Sequence([
                    ['bulletSprite', 'small-enemy-bullet-blue'],
                    ['bulletSpeed', 110],
                    ['burst', 12, Math.PI * 2, 0, false],
                    ['wait', 50],
                    ['increaseBulletSpeed', 5],
                    ['burst', 12, Math.PI * 2, -0.055, false],
                    ['wait', 50],
                    ['increaseBulletSpeed', 6],
                    ['burst', 12, Math.PI * 2, -0.11, false],
                    ['wait', 50],
                    ['increaseBulletSpeed', 7],
                    ['burst', 12, Math.PI * 2, -0.165, false],
                    ['increaseBulletSpeed', 90],
                    ['bulletSprite', 'medium-enemy-bullet-yellow'],
                    ['randomShot', 30, Math.PI * 2, 0, false],
                    ['wait', 140],
                    ['rotate', 0.37]
                ], 12),
                new Sequence([
                    ['bulletSprite', 'small-enemy-bullet-negative'],
                    ['setAngle', 0],
                    ['bulletSpeed', 100],
                    ['burst', 55, Math.PI * 2, 0, false],
                    ['wait', 130],
                    ['burst', 55, Math.PI * 2, -0.13, false],
                    ['wait', 190],
                    ['rotate', 0.3]
                ], 2)
            ], 900, 6)

            /* BUGGED
             new ParallelSequence([
             new Sequence([
             ['bulletSpeed', 130],
             ['wait', 5000]
             ], 1),
             new Sequence([
             ['increaseBulletSpeed', 6],
             ['randomBulletSprite', 'small-enemy-bullet-negative', 'small-enemy-bullet-yellow', 'small-enemy-bullet-blue', 'small-enemy-bullet-red'],
             ['randomShot', 1, Math.PI / 7, 0, true],
             ['wait', 20]
             ], 120)
             ], 1) */

        ], 2250);
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
