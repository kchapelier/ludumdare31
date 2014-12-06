var Input = require('../lib/input');

module.exports = new Input({
    FOCUS : { keys : ['shift', 'ctrl'], group : 'focus' },
    UP : { keys : ['up', 'w'], group : 'axisV' },
    DOWN : { keys : ['down', 's'], group : 'axisV' },
    LEFT : { keys : ['left', 'a'], group : 'axisH' },
    RIGHT : { keys : ['right', 'd'], group : 'axisH' }
});
