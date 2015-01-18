"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['wait', 65],
    ['setBulletSprite', 'small-enemy-bullet-blue'],
    ['setBulletSpeed', 350],
    ['setAngle', 0, true],
    ['burst', 18, Math.PI / 7, 0, false],
    ['burst', 18, Math.PI / 7, Math.PI / 2, false],
    ['burst', 18, Math.PI / 7, Math.PI / 2 * 2, false],
    ['burst', 18, Math.PI / 7, Math.PI / 2 * 3, false],
    ['wait', 65],
    ['setBulletSprite', 'small-enemy-bullet-negative'],
    ['setBulletSpeed', 350],
    ['setAngle', 0, true],
    ['burst', 18, Math.PI / 6, 0, false],
    ['burst', 18, Math.PI / 6, Math.PI / 2, false],
    ['burst', 18, Math.PI / 6, Math.PI / 2 * 2, false],
    ['burst', 18, Math.PI / 6, Math.PI / 2 * 3, false]
], 9);
