'use strict';

var phases = require('./constants').gamePhases;

var State = function () {
	this.gamePhase = phases.coinToss;
};

State.prototype = {

};

module.exports = new State();
