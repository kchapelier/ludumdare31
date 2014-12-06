var Loop = require('./lib/gameloop');

var loop = new Loop();

loop.update = function(dt) {
    console.log(dt);
};

//loop.start();
