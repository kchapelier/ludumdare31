"use strict";

var Loop = require('migl-gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    sound = require('./game/sound'),
    highScores = require('./game/highscores'),
    //perlin = require('perlin'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection');

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

var start = function () {
    var running = false;
    var inIntro = false;
    renderer.infectDom('game');
    sound.play('intro', {
        loop: true
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
        enemyIndicatorFactory = require('./game/entities/enemyIndicator'),
        introFactory = require('./game/entities/intro');

    var score = 0;
    var scoreElement = new scoreFactory();
    var enemyIndicator = new enemyIndicatorFactory();
    var background = backgroundFactory();
    var intro = introFactory();

    var container = document.getElementById('game');

    var mouse = {
        x: 0,
        y: 0
    };

    container.addEventListener('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    var showIntro = function () {
        enemyIndicator.sprite.visible = false;
        enemy.sprite.visible = false;
        player.sprite.visible = false;
        player.hitbox.visible = false;
        scoreElement.sprite.visible = false;
        intro.sprite.visible = true;
        inIntro = true;
    };

    var newGame = function () {
        score = 0;
        sound.play('dissonant2');
        enemyIndicator.sprite.visible = true;
        enemy.sprite.visible = true;
        player.sprite.visible = true;
        player.hitbox.visible = true;
        scoreElement.sprite.visible = true;

        player.x = (renderer.screenWidth - 32) / 2;
        player.y = 450;
        enemy.x = (renderer.screenWidth - 32) / 2;
        enemy.y = 50;
        enemy.nextPosition = null;
        enemy.moveCounter = 0;

        scoreElement.setScore(score);
        enemy.sequence.reset();

        intro.sprite.visible = false;

        running = true;
        inIntro = false;
    };

    var gameOver = function (score) {
        sound.play('dissonant3');
        highScores.set('normal', score, function (scores) {
            intro.setHighScore(scores);
        });

        running = false;

        setTimeout(function () {
            showIntro();

            objectCollection.removeAll('playerShot');
            objectCollection.removeAll('enemyShot');
        }, 500);
    };

    highScores.get(function (scores) {
        intro.setHighScore(scores);
    });

    renderer.addElement(background.sprite);
    renderer.addElement(intro.sprite);
    renderer.addElement(scoreElement.sprite);
    renderer.addElement(enemyIndicator.sprite);

    var player = playerFactory(),
        enemy = enemyFactory();

    objectCollection.add('player', player);
    objectCollection.add('enemy', enemy);

    showIntro();

    loop.update = function (dt) {
        // Update the inputs
        input.update(dt);

        if (inIntro) {
            if (input.currentInput.SHOOT) {
                newGame();
            }
        }

        // Entities

        if (running) {
            player.update(dt);
            enemy.update(dt);

            playerShotArray.forEach(function (shot) {
                shot.update(dt);
            });

            enemyShotArray.forEach(function (shot) {
                shot.update(dt);
            });
        }
    };

    loop.postUpdate = function (dt) {
        // Entities
        if (running) {
            player.postUpdate(dt);
            enemy.postUpdate(dt);

            playerShotArray.forEach(function (shot) {
                shot.postUpdate(dt);
            });

            enemyShotArray.forEach(function (shot) {
                shot.postUpdate(dt);
            });

            //check collision enemyShot > player

            var sizePlayerHitbox = player.hitbox.width,
                playerHitboxX = player.hitbox.x,
                playerHitboxY = player.hitbox.y;

            enemyShotArray.forEach(function (shot) {
                var sizeEnemyShot = shot.sprite.width / 4;

                var diffX = Math.abs(playerHitboxX - shot.x - sizeEnemyShot);
                var diffY = Math.abs(playerHitboxY - shot.y - sizeEnemyShot);

                if (diffY < sizePlayerHitbox && diffX < sizePlayerHitbox) {
                    objectCollection.remove('enemyShot', shot);
                    gameOver(score);
                }
            });

            //check collision playerShot > enemy

            playerShotArray.forEach(function (shot) {
                var sizeEnemyHitbox = 32;

                var diffX = Math.abs(enemy.x - shot.x);
                var diffY = Math.abs(enemy.y - shot.y);

                if (diffY < sizeEnemyHitbox && diffX < sizeEnemyHitbox) {
                    objectCollection.remove('playerShot', shot);
                    sound.play('hit2');
                    score += 100;
                }
            });

            enemyIndicator.postUpdate(dt);

            scoreElement.setScore(score);
        }

        background.postUpdate(dt);

        if (inIntro) {
            background.shader.player = mouse;
        }
    };

    loop.render = function (dt) {
        // Entities
        scoreElement.render(dt);
        enemyIndicator.render(dt);
        player.render(dt);
        enemy.render(dt);

        playerShotArray.forEach(function (shot) {
            shot.render(dt);
        });

        enemyShotArray.forEach(function (shot) {
            shot.render(dt);
        });

        // Refresh the whole scene
        renderer.render(dt);
    };

    loop.start();
};

module.exports = start;

