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

var player2 = playerFactory({
    x : 300,
    y : 200,
    speed : 200
});

renderer.addElement(player.sprite);
renderer.addElement(player2.sprite);

loop.update = function(dt) {
    input.update(dt);
    player.update(dt);
    player2.update(dt);
};

loop.postUpdate = function(dt) {
    player.postUpdate(dt);
    player2.postUpdate(dt);
};

loop.render = function(dt) {
    player.render(dt);
    player2.render(dt);
    renderer.render(dt);
};

loop.start();
