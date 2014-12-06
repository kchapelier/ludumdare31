var Victor = require('victor');

module.exports = {
    x : 0,
    y : 0,
    speed : 250,
    direction : new Victor(0, 0),
    directionIntent : new Victor(0, 0),
    update : function(element, dt) {
        var mult = 1000 / element.speed;
        element.x+= element.directionIntent.x * dt / mult;
        element.y+= element.directionIntent.y * dt / mult;
    }
};
