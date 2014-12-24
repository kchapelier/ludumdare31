var Input = require('migl-input');

var input = new Input({
    SHOOT: {
        keys: ['<space>', 'X'],
        group: 'shoot'
    },
    FOCUS: {
        keys: ['<shift>', '<ctrl>', 'V'],
        group: 'focus'
    },
    UP: {
        keys: ['<up>', 'W'],
        group: 'axisV'
    },
    DOWN: {
        keys: ['<down>', 'S'],
        group: 'axisV'
    },
    LEFT: {
        keys: ['<left>', 'A'],
        group: 'axisH'
    },
    RIGHT: {
        keys: ['<right>', 'D'],
        group: 'axisH'
    }
});

input.attach();

module.exports = input;
