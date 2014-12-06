var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection');

renderer.infectDom('game');

var loop = new Loop();

// Array of entities

var playerShotArray = objectCollection.getArray('playerShot'),
    enemyShotArray = objectCollection.getArray('enemyShot');

// Entity factories

var playerFactory = require('./game/entities/player'),
    enemyFactory =require('./game/entities/enemy');

var player = playerFactory({
    x : 100,
    y : 350
});

var enemy = enemyFactory({
    x : 300,
    y : 50
});

objectCollection.add('player', player);
objectCollection.add('enemy', enemy);

loop.update = function(dt) {
    // Update the inputs
    input.update(dt);

    // Entities
    player.update(dt);
    enemy.update(dt);

    playerShotArray.forEach(function(shot) {
        shot.update(dt);
    });

    enemyShotArray.forEach(function(shot) {
        shot.update(dt);
    });
};

loop.postUpdate = function(dt) {
    // Entities
    player.postUpdate(dt);
    enemy.postUpdate(dt);

    playerShotArray.forEach(function(shot) {
        shot.postUpdate(dt);
    });

    enemyShotArray.forEach(function(shot) {
        shot.postUpdate(dt);
    });
};

loop.render = function(dt) {
    // Entities
    player.render(dt);
    enemy.render(dt);

    playerShotArray.forEach(function(shot) {
        shot.render(dt);
    });

    enemyShotArray.forEach(function(shot) {
        shot.render(dt);
    });

    // Refresh the whole scene
    renderer.render(dt);
};

loop.start();
