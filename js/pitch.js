/*eslint new-cap: 0*/
'use strict';
var proto;
var Pitch = function (config) {
	this.config = this.validateConfig(config);

	this.container = Snap(this.config.selector);
	Snap.load(this.config.filename, this.onSvgLoaded.bind(this));
};

proto = Pitch.prototype = {
	get gridWidth () {
		return this.gridDimensions.width / 26;
	},

	get gridHeight () {
		return this.gridDimensions.height / 15;
	}
};

proto.gridCircle = function (gridPosition) {
	if (!this.circle) {
		this.circle = this.container.circle(0, 0, (this.gridWidth / 2) - 6);
	}

	var x = (gridPosition.x * this.gridWidth) + (this.gridWidth / 2);
	var y = (gridPosition.y * this.gridHeight) + (this.gridHeight / 2);

	this.circle.transform('t' + x + ', ' + y);
};

proto.onSvgLoaded = function (fragment) {
	this.gridDimensions = this.getDimensions(fragment);

	this.container.append(fragment);
	this.container.attr({
		viewBox: "0 0 " + this.gridDimensions.width + " " + this.gridDimensions.height,
		width: 1080
	});
};

proto.validateConfig = function (config) {
	var missingParams = [];
	var retval = config || {};

	if (!config.filename) { missingParams.push('filename'); }
	if (!config.selector) { missingParams.push('selector'); }

	if (missingParams.length) {
		throw new Error('Pitch constructor: config object missing required parameters ' + missingParams.join());
	}

	return retval;
};

proto.getDimensions = function (fragment) {
	var retval = {};

	retval.width = this.config.gridWidth || fragment.node.firstElementChild.attributes.getNamedItem('width').value;
	retval.height = this.config.gridHeight || fragment.node.firstElementChild.attributes.getNamedItem('height').value;

	return retval;
};

module.exports = Pitch;
