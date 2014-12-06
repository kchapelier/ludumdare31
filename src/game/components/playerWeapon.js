"use strict";

var collection = require('../objectCollection'),
    shotFactory = require('../entities/playerShot');

module.exports = {
    update : function(element, dt) {
        if(!!element.shooting) {
            collection.add('playerShot', shotFactory({
                x : element.x,
                y : element.y - 20,
                speed : 550,
                directionIntent : { x : 0, y : -1 }
            }));
        }
    }
};
