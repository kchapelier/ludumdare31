"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['setBulletSpeed', 200],
    ['setBulletSprite', 'medium-enemy-bullet-yellow'],
    ['burst', 5, 0.3, 0, false],
    ['burst', 5, 0.3, Math.PI, false],
    ['burst', 5, 0.3, Math.PI / 2, false],
    ['burst', 5, 0.3, Math.PI * 3 / 2, false],
    ['wait', 120],
    ['rotate', 0.1, Math.PI / 4],
    ['setBulletSprite', 'small-enemy-bullet-yellow'],
    ['burst', 5, 0.3, 0, false],
    ['burst', 5, 0.3, Math.PI, false],
    ['burst', 5, 0.3, Math.PI / 2, false],
    ['burst', 5, 0.3, Math.PI * 3 / 2, false],
    ['rotate', 0.40 - Math.PI / 2],
    ['wait', 100]
], 70);
