"use strict";

var RandomLoopSequence = require('../randomLoopSequence');


module.exports = new RandomLoopSequence([
    require('./enemyPatternBipolarBlast'),
    require('./enemyPatternFastAim'),
    require('./enemyPatternMain'),
    require('./enemyPatternRandomRainbow'),
    require('./enemyPatternSpiralRed'),
    require('./enemyPatternSpiralYellow'),
    require('./enemyPatternSpiralSpray'),
    require('./enemyPatternSun')
], 2250);
