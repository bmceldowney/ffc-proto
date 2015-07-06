'use strict';

var InputManager = function () {
	this.pitch = null;
};

InputManager.prototype = {
	get state () {

	}
};

InputManager.prototype.registerPitch = function (pitch) {
	this.pitch = pitch;
	pitch.container.click(this.onPitchClick.bind(this));
};

InputManager.prototype.onPitchClick = function (ev) {
	var overlay = document.querySelector('.home-overlay');
	overlay.classList.toggle('open');
	var gridPos = pointToGrid.call(this, pointToRelative(ev.clientX, ev.clientY, this.pitch.container.node));
};

function pointToGrid(point) {
	var x = Math.floor(point.x / this.gridWidth);
	var y = Math.floor(point.y / this.gridHeight);

	return { x: x, y: y};
}

function pointToRelative(x, y, svg) {
	var matrix = svg.getScreenCTM();
	var point = svg.createSVGPoint();
	var translatedPoint;

	point.x = x;
	point.y = y;
	translatedPoint = point.matrixTransform(matrix.inverse());

	return {
		x: round(translatedPoint.x),
		y: round(translatedPoint.y)
	};
}

function round (value) {
	return Math.round(value * 100) / 100;
}

module.exports = new InputManager();
