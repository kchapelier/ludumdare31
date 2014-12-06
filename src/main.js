var Loop = require('./lib/gameloop'),
    PIXI = require('pixi.js');

var loop = new Loop();

var renderer = PIXI.autoDetectRenderer(800, 600);
var stage = new PIXI.Stage(0xFFFFFF);

var container = document.getElementById('game');
container.appendChild(renderer.view);

loop.update = function(dt) {
    console.log(dt);
};

//loop.start();
