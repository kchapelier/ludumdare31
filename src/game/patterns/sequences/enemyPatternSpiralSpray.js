"use strict";

var Sequence = require('../sequence');

module.exports = new Sequence([
    ['setBulletSpeed', 180],
    ['rotate', 0.2],
    ['setBulletSprite', 'small-enemy-bullet-blue'],
    ['randomShot', 12, Math.PI / 2 - 0.5, Math.PI / 2, false],
    ['setBulletSprite', 'small-enemy-bullet-red'],
    ['randomShot', 15, Math.PI / 1.5 - 0.5, -Math.PI / 2, false]
], 140);
