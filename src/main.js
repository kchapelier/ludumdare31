var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    PIXI = require('pixi.js');

var loop = new Loop();


renderer.infectDom('game');

var texture = PIXI.Texture.fromImage('./assets/images/placeholder.png', false);
var sprite = new PIXI.Sprite(texture);

renderer.addElement(sprite);

var posX = 0;
var posY = 0;

loop.update = function(dt) {
    input.update(dt);
    if(input.currentInput.UP) {
        posY-= dt;
    } else if(input.currentInput.DOWN) {
        posY+= dt;
    }

    if(input.currentInput.LEFT) {
        posX-= dt;
    } else if(input.currentInput.RIGHT) {
        posX+= dt;
    }
};

loop.postUpdate = function() {
    sprite.x = Math.round(posX);
    sprite.y = Math.round(posY);
};

loop.render = function() {
    renderer.render();
};

loop.start();
