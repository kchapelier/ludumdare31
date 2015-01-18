"use strict";

var Sequence = require('../sequence'),
    RandomLoopSequence = require('../randomLoopSequence');

module.exports = new RandomLoopSequence([
    new Sequence([
        ['setBulletSprite', 'small-enemy-bullet-blue'],
        ['setBulletSpeed', 110],
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
        ['setBulletSprite', 'medium-enemy-bullet-yellow'],
        ['randomShot', 30, Math.PI * 2, 0, false],
        ['wait', 140],
        ['rotate', 0.37]
    ], 12),
    new Sequence([
        ['setBulletSprite', 'small-enemy-bullet-negative'],
        ['setAngle', 0],
        ['setBulletSpeed', 100],
        ['burst', 55, Math.PI * 2, 0, false],
        ['wait', 130],
        ['burst', 55, Math.PI * 2, -0.13, false],
        ['wait', 190],
        ['rotate', 0.3]
    ], 2)
], 900, 6);
