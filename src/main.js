var Loop = require('./lib/gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    GameObject = require('./lib/quick-and-dirty-gameobject');

var loop = new Loop();

renderer.infectDom('game');

var playerFactory = GameObject.createFactory(
    require('./game/components/playerInput'),
    require('./game/components/playerWeapon'),
    require('./game/components/position'),
    require('./game/components/playerRender')
);

var playerShotFactory = GameObject.createFactory(
    require('./game/components/position'),
    require('./game/components/playerShotRender')
);

var player = playerFactory({
    x : 100,
    y : 100
});

var shot = playerShotFactory({
    x : 200,
    y : 300,
    directionIntent : { x : 0, y : -1 }
});

renderer.addElement(player.sprite);
renderer.addElement(player.hitbox);
renderer.addElement(shot.sprite);

loop.update = function(dt) {
    // Update the inputs
    input.update(dt);

    // Entities
    player.update(dt);
    shot.update(dt);
};

loop.postUpdate = function(dt) {
    // Entities
    player.postUpdate(dt);
    shot.postUpdate(dt);
};

loop.render = function(dt) {
    // Entities
    player.render(dt);
    shot.render(dt);

    // Refresh the whole scene
    renderer.render(dt);
};

loop.start();
