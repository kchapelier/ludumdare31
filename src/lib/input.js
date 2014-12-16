var vkey = require('vkey');

var Input = function(commands) {
    this.setCommands(commands);
};

Input.prototype.commands = null;
Input.prototype.inversedCommands = null;
Input.prototype.activeCommands = null;
Input.prototype.currentInput = null;

Input.prototype.setCommands = function (commands) {
    this.currentInput = {};
    this.activeCommands = [];
    this.commands = commands || {};

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

Input.prototype.activateKey = function (key) {
    var command = this.inversedCommands[key];

    if(command && this.activeCommands.indexOf(command) === -1) {
        this.activeCommands.push(command);
    }
};

Input.prototype.deactivateKey = function (key) {
    var command = this.inversedCommands[key];

    if(command) {
        this.activeCommands.splice(this.activeCommands.lastIndexOf(command), 1);
    }
};

Input.prototype.update = function (dt) {
    var key,
        index,
        i;

    for (index in this.commands) {
        this.currentInput[index] = false;
    }

    var groupSetted = {};

    for (i = this.activeCommands.length; i--;) {
        var command = this.activeCommands[i];

        if(!groupSetted[command.group]) {
            groupSetted[command.group] = true;
            this.currentInput[command.command] = true;
        }
    }
};

Input.prototype.attach = function(element) {
    var self = this;

    element = element || document.body;

    element.addEventListener('keydown', function(e) {
        self.activateKey(vkey[e.keyCode]);
    });

    element.addEventListener('keyup', function(e) {
        self.deactivateKey(vkey[e.keyCode]);
    });
};

Input.prototype.detach = function(element) {

};

module.exports = Input;
