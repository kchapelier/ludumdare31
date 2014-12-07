var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    sound = require('./game/sound'),
    highScores = require('./game/highscores'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection');

highScores.get(function(scores) {
    console.log(scores);
});

//FIXME Terribly optimistic assets loading

sound.load('intro', 'ld31-intro');
sound.load('hit1', 'ld31-hit1', 1);
sound.load('hit2', 'ld31-hit2', 1);
sound.load('dissonant1', 'ld31-dissonant1');
sound.load('dissonant2', 'ld31-dissonant2');
sound.load('dissonant3', 'ld31-dissonant3');
sound.load('dissonant4', 'ld31-dissonant4');

textureCollection.load('enemy-indicator', 'enemy-indicator.png');
textureCollection.load('medium-enemy-bullet-yellow', 'medium-enemy-bullet-yellow.png');
textureCollection.load('small-enemy-bullet-yellow', 'small-enemy-bullet-yellow.png');
textureCollection.load('small-enemy-bullet-red', 'small-enemy-bullet-red.png');
textureCollection.load('small-enemy-bullet-blue', 'small-enemy-bullet-blue.png');
textureCollection.load('small-enemy-bullet-negative', 'small-enemy-bullet-negative.png');

textureCollection.load('player-sprite', 'placeholder.png');
textureCollection.load('enemy-sprite', 'placeholder.png');
textureCollection.load('hitbox', 'hitbox.png');
textureCollection.load('player-bullet', 'player-bullet.png');

renderer.infectDom('game');
sound.play('intro', {
    loop : true
});

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

    background.postUpdate(dt);

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

            sound.play('dissonant3');
            highScores.set('normal', score, function(scores) {
                //console.log(scores);
            });
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
            sound.play('hit2');
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
