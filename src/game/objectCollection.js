var collection = require('../lib/objectCollection'),
    renderer = require('./renderer');

collection.on('add.player', function(element) {
    renderer.addElement(element.sprite);
    renderer.addElement(element.hitbox);
});

collection.on('add.playerShot', function(element) {
    renderer.addElement(element.sprite);
});

module.exports = collection;
