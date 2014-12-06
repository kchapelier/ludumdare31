"use strict";

var collection = require('../objectCollection'),
    shotFactory = require('../entities/enemyShot');

module.exports = {
    update : function(element) {
        if(Math.random() > 0.92) {
            collection.add('enemyShot', shotFactory({
                x : element.x,
                y : element.y,
                speed : 400,
                directionIntent : { x : 0, y : 1 }
            }));
        }
    }
};
