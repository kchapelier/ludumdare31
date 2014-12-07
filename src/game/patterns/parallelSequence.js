"use strict";

var Sequence = require('./sequence');

var ParallelSequence = function(sequences) {
    this.sequences = sequences;
};


ParallelSequence.prototype.update = function(pattern, dt) {
    for(var i = 0; i < this.sequences.length; i++) {
        this.sequences[i].update(pattern, dt);
    }
};

ParallelSequence.prototype.isComplete = function() {
    var complete = true;

    for(var i = 0; i < this.sequences.length; i++) {
        complete = complete && this.sequences[i].isComplete();
    }
};

ParallelSequence.prototype.reset = function() {
    for(var i = 0; i < this.sequences.length; i++) {
        this.sequences[i].reset();
    }
};

module.exports = ParallelSequence;
