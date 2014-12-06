var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    GameObject = require('./lib/quick-and-dirty-gameobject'),
    PIXI = require('pixi.js');

var loop = new Loop();


renderer.infectDom('game');

var texture = PIXI.Texture.fromImage('./assets/images/placeholder.png', false);
var sprite = new PIXI.Sprite(texture);

var drawComponent = {
    render : function (element, dt) {
        sprite.x = Math.round(element.x);
        sprite.y = Math.round(element.y);
    }
};

var playerFactory = GameObject.createFactory(
    require('./game/components/playerInput'),
    require('./game/components/position'),
    drawComponent
);

var player = playerFactory({
    x : 300,
    y : 200
});

renderer.addElement(sprite);

loop.update = function(dt) {
    input.update(dt);
    player.update(dt);
};

loop.postUpdate = function(dt) {
    player.postUpdate(dt);
};

loop.render = function(dt) {
    player.render(dt);
    renderer.render(dt);
};

loop.start();
