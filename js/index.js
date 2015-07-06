'use strict';
var phases = require('./constants').gamePhases;
var Pitch = require('./pitch');
var input = require('./input');

var pitch = new Pitch({
	selector: '.pitch',
	filename: 'assets/blood-bowl-pitch_Clipart_svg_File.svg'
});

input.registerPitch(pitch);
