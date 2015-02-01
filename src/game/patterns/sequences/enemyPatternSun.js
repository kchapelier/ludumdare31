"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['setBulletSprite', 'medium-enemy-bullet-yellow'],
    ['setAngle', 0, true],
    ['setBulletSpeed', 130],
    ['burst', 35, Math.PI * 2, 0, false],
    ['wait', 70],
    ['setBulletSpeed', 150],
    ['burst', 35, Math.PI * 2, 0, false],
    ['wait', 70],
    ['setBulletSpeed', 170],
    ['burst', 35, Math.PI * 2, 0, false],
    ['wait', 70],
    ['setBulletSpeed', 195],
    ['burst', 35, Math.PI * 2, 0, false],
    ['wait', 70],
    ['setBulletSpeed', 220],
    ['burst', 35, Math.PI * 2, 0, false],
    ['wait', 180]
], 18);