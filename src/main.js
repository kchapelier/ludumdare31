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
    enemyFactory = require('./game/entities/enemy'),
    backgroundFactory = require('./game/entities/background'),
    scoreFactory = require('./game/entities/scoreIndicator'),
    enemyIndicatorFactory = require('./game/entities/enemyIndicator');

var score = 0;
var scoreElement = new scoreFactory();
var enemyIndicator = new enemyIndicatorFactory();
var background = backgroundFactory();

renderer.addElement(background.sprite);
renderer.addElement(scoreElement.sprite);
renderer.addElement(enemyIndicator.sprite);

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
    //player.update(dt);
    //enemy.update(dt);

    playerShotArray.forEach(function(shot) {
        shot.update(dt);
    });

    enemyShotArray.forEach(function(shot) {
        shot.update(dt);
    });
};

loop.postUpdate = function(dt) {
    // Entities
    //player.postUpdate(dt);
    //enemy.postUpdate(dt);

    playerShotArray.forEach(function(shot) {
        shot.postUpdate(dt);
    });

    enemyShotArray.forEach(function(shot) {
        shot.postUpdate(dt);
    });

    //check collision enemyShot > player

    enemyShotArray.forEach(function(shot) {
        var sizeEnemyShot = 32,
            sizePlayerHitbox = 16;

        var diffX = Math.abs(player.x - shot.x);
        var diffY = Math.abs(player.y - shot.y);

        if(diffY < sizePlayerHitbox && diffX < sizePlayerHitbox) {
            objectCollection.remove('enemyShot', shot);
        }
    });

    //check collision playerShot > enemy

    playerShotArray.forEach(function(shot) {
        var sizeEnemyShot = 32,
            sizeEnemyHitbox = 32;

        var diffX = Math.abs(enemy.x - shot.x);
        var diffY = Math.abs(enemy.y - shot.y);

        if(diffY < sizeEnemyHitbox && diffX < sizeEnemyHitbox) {
            objectCollection.remove('playerShot', shot);
            score+= 100;
        }
    });

    enemyIndicator.postUpdate(dt);

    scoreElement.setScore(score);
};

loop.render = function(dt) {
    // Entities
    scoreElement.render(dt);
    enemyIndicator.render(dt);
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
