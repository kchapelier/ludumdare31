"use strict";

var EventEmitter = require('events').EventEmitter;

var dictionary = {};

var ensureArray = function(type) {
    if(!dictionary[type]) {
        dictionary[type] = [];
    }
};

var Collection = function() {
    EventEmitter.call(this);
};

Collection.prototype = new EventEmitter();

Collection.prototype.add = function(type, object) {
    ensureArray(type);
    dictionary[type].push(object);

    this.emit('add', object);
    this.emit('add.' + type, object);
};

Collection.prototype.remove = function(type, object) {
    if(!!dictionary[type]) {
        var pos = dictionary[type].indexOf(object);

        if(pos > -1) {
            dictionary[type].splice(pos, 1);
            this.emit('remove', object);
            this.emit('remove.' + type, object);
        }
    }

};

Collection.prototype.getArray = function(type) {
    ensureArray(type);
    return dictionary[type];
};

module.exports = new Collection();
