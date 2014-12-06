var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection');

renderer.infectDom('game');

var loop = new Loop();

// Array of entities

var playerArray = objectCollection.getArray('playerShot'),
    playerShotArray = objectCollection.getArray('playerShot');

// Entity factories

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
