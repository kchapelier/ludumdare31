var renderer = require('../renderer'),
    objectCollection = require('../objectCollection')

var margin = 200;

module.exports = {
    update : function(element) {
        if(
            element.x < 0 - margin ||
            element.y < 0 - margin ||
            element.x > renderer.screenWidth + margin ||
            element.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('enemyShot', element);
        }
    }
};