var input = require('../input');

module.exports = {
    focused : false,
    normalSpeed : 250,
    focusedSpeed : 100,
    update : function(element, dt) {
        var directionIntent = element.directionIntent;

        if(input.currentInput.UP) {
            directionIntent.y = -1;
        } else if(input.currentInput.DOWN) {
            directionIntent.y = 1;
        } else {
            directionIntent.y = 0;
        }

        if(input.currentInput.LEFT) {
            directionIntent.x = -1;
        } else if(input.currentInput.RIGHT) {
            directionIntent.x = 1;
        } else {
            directionIntent.x = 0;
        }

        if(directionIntent.x !== 0 || directionIntent.y !== 0) {
            directionIntent.normalize();
        }

        element.focused = !!input.currentInput.FOCUS;

        if(element.focused) {
            element.speed = element.focusedSpeed;
        } else {
            element.speed = element.normalSpeed
        }
    }
};
