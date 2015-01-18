"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['wait', 75],
    ['setBulletSpeed', 270],
    ['randomAngle'],
    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
    ['burst', 10, Math.PI / 4, 0, false],
    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
    ['burst', 10, Math.PI / 4, Math.PI / 2, false],
    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
    ['burst', 10, Math.PI / 4, Math.PI / 2 * 2, false],
    ['randomBulletSprite', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red', 'small-enemy-bullet-blue'],
    ['burst', 10, Math.PI / 4, Math.PI / 2 * 3, false]
], 70);
