"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['setBulletSpeed', 275],
    ['setBulletSprite', 'small-enemy-bullet-red'],
    ['burst', 5, 0.35, 0, false],
    ['burst', 5, 0.35, Math.PI, false],
    ['burst', 5, 0.35, Math.PI / 2, false],
    ['burst', 5, 0.35, Math.PI * 3 / 2, false],
    ['wait', 110],
    ['rotate', 0.1, Math.PI / 4],
    ['setBulletSprite', 'small-enemy-bullet-red'],
    ['burst', 5, 0.35, 0, false],
    ['burst', 5, 0.35, Math.PI, false],
    ['burst', 5, 0.35, Math.PI / 2, false],
    ['burst', 5, 0.35, Math.PI * 3 / 2, false],
    ['rotate', 0.40 - Math.PI / 2],
    ['wait', 90]
], 70);
