"use strict";

var pool = require('../../lib/pool'),
    playerShot = require('../entities/playerShot');

module.exports = pool({
    factory: playerShot,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
    },
    initialNumber: 100
});
