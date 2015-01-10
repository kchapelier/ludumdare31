"use strict";

var Pool = function (factory, initialize, initialNumber) {
    this.factoryFunction = factory;
    this.initializeFunction = initialize;

    this.availableInstances = [];

    this.allocate(initialNumber);
};

Pool.prototype.availableInstances = null;
Pool.prototype.factoryFunction = null;
Pool.prototype.initializeFunction = null;

Pool.prototype.allocate = function (number) {
    var i;

    for (i = 0; i < number; i++) {
        this.availableInstances.push(this.factoryFunction());
    }

    return this;
};

Pool.prototype.get = function (initializationOptions) {
    var element;

    if (this.availableInstances.length < 1) {
        this.allocate(5);
    }

    element = this.availableInstances.pop();

    this.initializeFunction(element, initializationOptions);

    return element;
};

Pool.prototype.free = function (element) {
    if (this.availableInstances.indexOf(element) === -1) {
        this.availableInstances.push(element);
    }

    return this;
};

Pool.prototype.clear = function () {
    while (this.availableInstances.length) {
        this.availableInstances.pop();
    }

    return this;
};

var pool = function (options) {
    return new Pool(
        options.factory,
        options.initialize,
        options.initialNumber || 40
    );
};

module.exports = pool;
