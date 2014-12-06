"use strict";

var Victor = require('victor'),
    collection = require('../objectCollection'),
    shotFactory = require('../entities/enemyShot');

var shot = function(position, speed, direction) {
    collection.add('enemyShot', shotFactory({
        x : position.x,
        y : position.y,
        speed : speed,
        directionIntent : direction
    }));
};

var Pattern = function(source, destination) {
    this.source = source;
    this.destination = destination;
    this.aimDirection = new Victor(0, 1);
    this.playerDirection = new Victor(1, 0);
};

Pattern.prototype.source = null;
Pattern.prototype.destination = null;
Pattern.prototype.aimDirection = null;
Pattern.prototype.playerDirection = null;

Pattern.prototype.setSource = function(source) {
    this.source = source;
};

Pattern.prototype.setDestination = function(destination) {
    this.destination = destination;
};

Pattern.prototype.updatePlayerDirection = function() {
    var angle = Math.atan2(this.destination.y - this.source.y, this.destination.x - this.source.x);

    this.playerDirection.x = 1;
    this.playerDirection.y = 0;

    this.playerDirection.rotate(angle);
};

Pattern.prototype.update = function() {
    this.updatePlayerDirection();
};

Pattern.prototype.rotate = function(angle) {
    this.aimDirection.rotate(angle);

    return this;
};

Pattern.prototype.setAngle = function(angle, fromPlayer) {
    if(fromPlayer) {
        this.aimDirection = this.playerDirection.clone();
        this.aimDirection.rotate(angle);
    } else {
        this.aimDirection.rotate(angle);
    }

    return this;
};

Pattern.prototype.singleShot = function(angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation);

    shot(this.source, 200, v);

    return this;
};

Pattern.prototype.randomShot = function(number, angleSpread, angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation - angleSpread / 2);

    for(var i = 0; i < number; i++) {
        var vc = v.clone();
        vc.rotate(angleSpread * Math.random());
        shot(this.source, 200, vc);
    }
};

Pattern.prototype.burst = function(number, angleSpread, angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation - angleSpread / 2);

    for(var i = 0; i < number; i++) {
        shot(this.source, 200, v.clone());
        v.rotate(angleSpread / (number - 1));
    }

    return this;
};

module.exports = Pattern;
