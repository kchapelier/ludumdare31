var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection');

renderer.infectDom('game');

var loop = new Loop();

// Array of entities

var playerShotArray = objectCollection.getArray('playerShot');

// Entity factories

var playerFactory = require('./game/entities/player'),
    playerShotFactory =require('./game/entities/playerShot');

var player = playerFactory({
    x : 100,
    y : 100
});

objectCollection.add('player', player);

loop.update = function(dt) {
    // Update the inputs
    input.update(dt);

    // Entities
    player.update(dt);
    playerShotArray.forEach(function(shot) {
        shot.update(dt);
    });
};

loop.postUpdate = function(dt) {
    // Entities
    player.postUpdate(dt);
    playerShotArray.forEach(function(shot) {
        shot.postUpdate(dt);
    });
};

loop.render = function(dt) {
    // Entities
    player.render(dt);
    playerShotArray.forEach(function(shot) {
        shot.render(dt);
    });

    // Refresh the whole scene
    renderer.render(dt);
};

loop.start();
