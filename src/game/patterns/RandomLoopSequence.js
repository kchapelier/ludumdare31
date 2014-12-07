"use strict";

var Sequence = require('./sequence');

var RandomLoopSequence = function(sequences, delayInBetween) {
    this.sequences = sequences;
    this.currentSequence = null;
    this.previousSequence = null;
    this.delayInBetween = delayInBetween;
    this.accumulatedTime = 0;
    this.waiting = false;
};

RandomLoopSequence.prototype.update = function(pattern, dt) {
    if(this.currentSequence !== null && this.isComplete()) {
        this.reset();
        this.waiting = true;
    }

    if(this.currentSequence === null) {
        do {
            this.currentSequence = Math.floor(Math.random() * this.sequences.length);
        } while(this.previousSequence === this.currentSequence && this.sequences.length > 1);
    }

    if(this.waiting) {
        this.accumulatedTime+= dt;

        if(this.accumulatedTime >= this.delayInBetween) {
            this.accumulatedTime = 0;
            this.waiting = false;
        }
    } else {
        this.sequences[this.currentSequence].update(pattern, dt);
    }
};

RandomLoopSequence.prototype.isComplete = function() {
    return this.currentSequence === null || this.sequences[this.currentSequence].isComplete();
};

RandomLoopSequence.prototype.reset = function() {
    if(this.currentSequence !== null) {
        this.sequences[this.currentSequence].reset();
        this.previousSequence = this.currentSequence;
    }

    this.currentSequence = null;
    this.accumulatedTime = 0;
    this.waiting = false;
};

module.exports = RandomLoopSequence;
