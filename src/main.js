var Loop = require('./lib/gameloop'),
    PIXI = require('pixi.js');

var loop = new Loop();

var renderer = PIXI.autoDetectRenderer(600, 400);
var stage = new PIXI.Stage(0xFFFFFF);

var container = document.getElementById('game');
container.appendChild(renderer.view);

var texture = PIXI.Texture.fromImage('./assets/images/placeholder.png', false);

var sprite = new PIXI.Sprite(texture);

stage.addChild(sprite);

loop.update = function(dt) {
    sprite.x = dt * 5;
    sprite.y = dt * 5;
};

loop.render = function() {
    renderer.render(stage);
};

loop.start();
