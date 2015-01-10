"use strict";

var pool = require('../../lib/pool'),
    enemyShot = require('../entities/enemyShot');

module.exports = pool({
    factory: enemyShot,
    initialize: function (element, options) {
    },
    initialNumber: 100
});
