"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['wait', 80],
    ['setBulletSpeed', 200],
    ['setBulletSprite', 'medium-enemy-bullet-yellow'],
    ['randomShot', 25, Math.PI - 0.7, Math.PI / 2, false],
    ['randomShot', 25, Math.PI - 0.7, -Math.PI / 2, false]
], 10);
