var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection');

var loop = new Loop();

renderer.infectDom('game');

objectCollection.on('add.player', function(element) {
    renderer.addElement(element.sprite);
    renderer.addElement(element.hitbox);
});

objectCollection.on('add.playerShot', function(element) {
    renderer.addElement(element.sprite);
});

var playerArray = objectCollection.getArray('playerShot');
var playerShotArray = objectCollection.getArray('playerShot');

var playerFactory = require('./game/entities/player'),
    playerShotFactory =require('./game/entities/playerShot');

var player = playerFactory({
    x : 100,
    y : 100
});

var shot = playerShotFactory({
    x : 200,
    y : 300,
    directionIntent : { x : 0, y : -1 }
});

objectCollection.add('player', player);
objectCollection.add('playerShot', shot);

loop.update = function(dt) {
    // Update the inputs
    input.update(dt);

    // Entities
    player.update(dt);
    shot.update(dt);
};

loop.postUpdate = function(dt) {
    // Entities
    player.postUpdate(dt);
    shot.postUpdate(dt);
};

loop.render = function(dt) {
    // Entities
    player.render(dt);
    shot.render(dt);

    // Refresh the whole scene
    renderer.render(dt);
};

loop.start();
