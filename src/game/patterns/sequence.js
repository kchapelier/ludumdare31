"use strict";

var Sequence = function (operations, repeatition) {
    this.operations = operations;
    this.repeatition = repeatition;

    this.reset();
};

Sequence.prototype.operations = null;
Sequence.prototype.repeatition = null;
Sequence.prototype.accumulatedTime = null;
Sequence.prototype.currentOperation = null;
Sequence.prototype.currentRepeatition = null;

Sequence.prototype.update = function (pattern, dt) {
    if (!this.isComplete()) {
        if (this.execute(pattern, this.operations[this.currentOperation], dt)) {
            //console.log('----');
            this.currentOperation++;

            if (this.currentOperation >= this.operations.length) {
                this.currentOperation = 0;
                this.currentRepeatition++;
            }
        }

        return true;
    }

    return false;
};

Sequence.prototype.execute = function (pattern, operation, dt) {
    var method = operation[0],
        args = [];

    if (method === 'wait') {
        this.accumulatedTime += dt;
        //console.log(this.accumulatedTime);

        if (this.accumulatedTime >= operation[1]) {
            this.accumulatedTime = 0;
            //console.log('reset accumulatedTime');
            return true;
        }
    } else {
        for (var i = 1; i < operation.length; i++) {
            args.push(operation[i]);
        }

        pattern[method].apply(pattern, args);

        return true;
    }

    return false;
};

Sequence.prototype.isComplete = function () {
    return this.operations.length === 0 || (this.currentRepeatition >= this.repeatition && this.repeatition > 1);
};

Sequence.prototype.reset = function () {
    this.accumulatedTime = 0;
    this.currentOperation = 0;
    this.currentRepeatition = 0;
};

module.exports = Sequence;
