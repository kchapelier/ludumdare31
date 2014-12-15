var vkey = require('vkey');

var keyPressed = [];

var Input = function(commands) {
    this.currentInput = {};
    this.attach();
    this.setCommands(commands);
};

Input.prototype.commands = null;
Input.prototype.inversedCommands = null;
Input.prototype.currentInput = null;

Input.prototype.setCommands = function (commands) {
    this.currentInput = {};
    this.commands = commands;
    this.createInverseLookupTable();
};

Input.prototype.createInverseLookupTable = function () {
    var index,
        keys,
        i;

    this.inversedCommands = {};

    for (index in this.commands) {
        keys = this.commands[index];

        for (i = 0; i < keys.keys.length; i++) {
            this.inversedCommands[keys.keys[i]] = {
                command: index,
                group: keys.group
            };
        }
    }
};

//TODO use object instead ?

Input.prototype.activateKey = function (key) {
    if(keyPressed.indexOf(key) === -1) {
        keyPressed.push(key);
    }
};

Input.prototype.deactivateKey = function (key) {
    keyPressed.splice(keyPressed.indexOf(key), 1);
};

Input.prototype.update = function () {
    var key,
        index,
        i;

    for (index in this.commands) {
        this.currentInput[index] = false;
    }

    for (i = 0; i < keyPressed.length; i++) {
        key = keyPressed[i];

        if (this.inversedCommands.hasOwnProperty(key)) {
            this.currentInput[this.inversedCommands[key].command] = true;
        }
    }
};

Input.prototype.attach = function() {
    var self = this;

    document.body.addEventListener('keydown', function(e) {
        self.activateKey(vkey[e.keyCode]);
    });

    document.body.addEventListener('keyup', function(e) {
        self.deactivateKey(vkey[e.keyCode]);
    });
};

Input.prototype.detach = function() {

};

module.exports = Input;
