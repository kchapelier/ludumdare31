var keyboardjs = require('keyboardjs');

var keyPressed = [];

var Input = function(commands) {
    this.currentInput = {};
    this.setCommands(commands);
};

Input.prototype.commands = null;
Input.prototype.inversedCommands = null;
Input.prototype.currentInput = null;

Input.prototype.setCommands = function(commands) {
    console.log('setCommands');
    this.currentInput = {};
    this.commands = commands;
    this.createInverseLookupTable();
};

Input.prototype.createInverseLookupTable = function() {
    var index,
        keys,
        i;

    console.log('createInverseLookupTable');

    this.inversedCommands = {};

    for(index in this.commands) {
        keys = this.commands[index];

        for(var i = 0; i < keys.keys.length; i++) {
            this.inversedCommands[keys.keys[i]] = { command : index, group : keys.group };
        }
    }

    //console.log(this.inversedCommands);
};

Input.prototype.update = function() {
    var key,
        index,
        i;

    keyPressed = keyboardjs.activeKeys();

    for(index in this.commands) {
        this.currentInput[index] = false;
    }

    for(i = 0; i < keyPressed.length; i++) {
        key = keyPressed[i];

        if(this.inversedCommands.hasOwnProperty(key)) {
            this.currentInput[this.inversedCommands[key].command] = true;
        }
    }
};

module.exports = Input;
