var Input = require('../lib/input');

module.exports = new Input({
    UP : { keys : ['up', 'w'], group : 'axisV' },
    DOWN : { keys : ['down', 's'], group : 'axisV' },
    LEFT : { keys : ['left', 'a'], group : 'axisH' },
    RIGHT : { keys : ['right', 'd'], group : 'axisH' }
});
