"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['setBulletSpeed', 175],
    ['setBulletSprite', 'medium-enemy-bullet-yellow'],
    ['burst', 5, 0.3, 0, false],
    ['burst', 5, 0.3, Math.PI, false],
    ['burst', 5, 0.3, Math.PI / 2, false],
    ['burst', 5, 0.3, Math.PI * 3 / 2, false],
    ['wait', 160],
    ['setBulletSprite', 'small-enemy-bullet-yellow'],
    ['burst', 3, 0.3, 0.1, false],
    ['burst', 3, 0.3, 0.1 + Math.PI, false],
    ['burst', 3, 0.3, 0.1 + Math.PI / 2, false],
    ['burst', 3, 0.3, 0.1 + Math.PI * 3 / 2, false],
    ['rotate', 0.50 - Math.PI / 2]
], 70);
