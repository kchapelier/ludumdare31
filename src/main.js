var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    GameObject = require('./lib/quick-and-dirty-gameobject');

var loop = new Loop();

renderer.infectDom('game');

var playerFactory = GameObject.createFactory(
    require('./game/components/playerInput'),
    require('./game/components/position'),
    require('./game/components/playerRender')
);

var player = playerFactory({
    x : 100,
    y : 100
});

renderer.addElement(player.sprite);
renderer.addElement(player.hitbox);

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
