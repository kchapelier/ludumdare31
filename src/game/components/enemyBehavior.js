"use strict";

var Pattern = require('../patterns/pattern'),
    collection = require('../objectCollection');

var player = null;

module.exports = {
    initialize : function (element) {
        element.pattern = new Pattern(element, { x: 0, y: 0});
    },
    update : function(element) {
        if(player === null) {
            player = collection.getArray('player')[0];
            element.pattern.setDestination(player);
        }

        element.pattern.update();

        if(Math.random() > 0.3) {
            element.pattern
                .setAngle(0, false)
                .randomShot(3, 0.8, 0, true);
        }
    }
};
