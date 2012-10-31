/**
 * @fileOverview This file provides JavaScript classes related to complex numbers.
 * @author <a href="mailto:paulbottin+git@gmail.com">Paul Bottin</a>
 * @version 0.0.2
 */

var util = require('util');

/**
 * Abstract base class for complex number. This class is extended by
 * <code>Arith</code> and <code>Polar</code>. It's not intended to
 * be used directly.  
 * @name Cmplx
 * @constructor
 */
function Cmplx() {
	if (this instanceof Cmplx) {
	} else return new Cmplx();
}

util.inherits(Cmplx, Object);

/**
 * Explicitly convert this complex number into arithmetic form.
 * @name Cmplx#toArith
 * @function
 * @returns {Arith}
 */
Cmplx.prototype.toArith = function () {
	return Arith(this.real, this.imaginary);
};

/**
 * Explicitly convert this complex number into polar form.
 * @name Cmplx#toPolar
 * @function
 * @returns {Polar}
 */
Cmplx.prototype.toPolar = function (rhs) {
	return Polar(this.radius, this.angle);
};

/**
 * Converts an angle given in degrees into radians.
 * @name Cmplx.toRad
 * @function
 * @param {Number} deg
 * @returns {Number}
 */
Cmplx.toRad = function (deg) {
	return deg * (Math.PI/180);
};

/**
 * Converts an angle given in radians into degrees.
 * @name Cmplx.toDeg
 * @function
 * @param {Number} rad
 * @returns {Number}
 */
Cmplx.toDeg = function (rad) {
	return rad * (180/Math.PI);
};

/**
 * A complex number in arithmetic (a + i b) form.
 * @name Arith
 * @constructor
 * @extends Cmplx
 * @param {Number} real
 * @param {Number} imaginary
 */
function Arith(real, imaginary) {
	if (this instanceof Arith) {
		this.real = real;
		this.imaginary = imaginary;
		this.__defineGetter__('radius', function () {
			return Math.sqrt(this.real*this.real+this.imaginary*this.imaginary);
		});
		this.__defineGetter__('angle', function () {
			return Math.atan2(this.imaginary, this.real);
		});
	} else return new Arith(real, imaginary);
}

util.inherits(Arith, Cmplx);

/**
 * @name Arith#add
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.add = function (rhs) {
	return Arith.add(this, rhs.toArith());
};

/**
 * @name Arith#sub
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.sub = function (rhs) {
	return Arith.sub(this, rhs.toArith());
};

/**
 * @name Arith#mul
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.mul = function (rhs) {
	return Arith.mul(this, rhs.toArith());
};

/**
 * @name Arith#div
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.div = function (rhs) {
	return Arith.div(this, rhs.toArith());
};

/**
 * @name Arith#conj
 * @function
 * @returns {Arith}
 */
Arith.prototype.conj = function () {
	return Arith.conj(this);
};

/**
 * @name Arith#norm
 * @function
 * @returns {Arith}
 */
Arith.prototype.norm = function () {
	return Arith.norm(this);
};

/**
 * @name Arith#toString
 * @function
 * @returns {String}
 */
Arith.prototype.toString = function () {
	return this.real+' + i '+this.imaginary;
};

/**
 * @name Arith.add
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.add = function (lhs, rhs) {
	return Arith(lhs.real+rhs.real, lhs.imaginary+rhs.imaginary);
};

/**
 * @name Arith.sub
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.sub = function (lhs, rhs) {
	return Arith(lhs.real-rhs.real, lhs.imaginary-rhs.imaginary);
};

/**
 * @name Arith.mul
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.mul = function (lhs, rhs) {
	return Arith(lhs.real*rhs.real-lhs.imaginary*rhs.imaginary, lhs.real*rhs.imaginary+rhs.real*lhs.imaginary);
};

/**
 * @name Arith.div
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.div = function (lhs, rhs) {
	var d = rhs.real*rhs.real+rhs.imaginary*rhs.imaginary;
	return Arith((lhs.real*rhs.real+lhs.imaginary*rhs.imaginary)/d, (-lhs.real*rhs.imaginary+rhs.real*lhs.imaginary)/d);
};

/**
 * @name Arith.conj
 * @function
 * @param {Cmplx} lhs
 * @returns {Arith}
 */
Arith.conj = function (lhs) {
	return Arith(lhs.real, -lhs.imaginary);
};

/**
 * @name Arith.norm
 * @function
 * @param {Cmplx} lhs
 * @returns {Arith}
 */
Arith.norm = function (lhs) {
	return Arith.mul(lhs, Arith.conj(lhs));
};

/**
 * A complex number in polar (r e ^ (i p)) form.
 * @name Polar
 * @constructor
 * @extends Cmplx
 * @param {Number} radius
 * @param {Number} angle
 */
function Polar(radius, angle) {
	if (this instanceof Polar) {
		this.radius = radius;
		this.angle = angle;
		this.__defineGetter__('real', function () {
			return this.radius*Math.cos(this.angle);
		});
		this.__defineGetter__('imaginary', function () {
			return this.radius*Math.sin(this.angle);
		});
	} else return new Polar(radius, angle);
}

util.inherits(Polar, Cmplx);

/**
 * @name Polar#add
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.add = function (rhs) {
	return Polar.add(this, rhs.toPolar());
};

/**
 * @name Polar#sub
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.sub = function (rhs) {
	return Polar.sub(this, rhs.toPolar());
};

/**
 * @name Polar#mul
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.mul = function (rhs) {
	return Polar.mul(this, rhs.toPolar());
};

/**
 * @name Polar#div
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.div = function (rhs) {
	return Polar.div(this, rhs.toPolar());
};

/**
 * @name Polar#conj
 * @function
 * @returns {Polar}
 */
Polar.prototype.conj = function () {
	return Polar.conj(this);
};

/**
 * @name Polar#norm
 * @function
 * @returns {Polar}
 */
Polar.prototype.norm = function () {
	return Polar.norm(this);
};

/**
 * @name Polar#toString
 * @function
 * @returns {String}
 */
Polar.prototype.toString = function () {
	return this.radius+' e ^ (i '+this.imaginary+')';
};

/**
 * @name Polar.add
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.add = function (lhs, rhs) {
	return Arith.add(lhs, rhs).toPolar();
};

/**
 * @name Polar.sub
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.sub = function (lhs, rhs) {
	return Arith.sub(lhs, rhs).toPolar();
};

/**
 * @name Polar.mul
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.mul = function (lhs, rhs) {
	return Polar(lhs.radius*rhs.radius, lhs.angle+rhs.angle);
};

/**
 * @name Polar.div
 * @function
 * @param {Cmplx} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.div = function (lhs, rhs) {
	return Polar(lhs.radius/rhs.radius, lhs.angle-rhs.angle);
};

/**
 * @name Polar.conj
 * @function
 * @param {Cmplx} lhs
 * @returns {Polar}
 */
Polar.conj = function (lhs) {
	return Polar(lhs.radius, -lhs.angle);
};

/**
 * @name Polar.norm
 * @function
 * @param {Cmplx} lhs
 * @returns {Polar}
 */
Polar.norm = function (lhs) {
	return Polar.mul(lhs, Polar.conj(lhs));
};

/**
 * @name Cmplx.ZERO
 * @field
 * @type Arith
 */
Cmplx.ZERO = Arith(0, 0);

/**
 * @name Cmplx.REAL
 * @field
 * @type Arith
 */
Cmplx.REAL = Arith(1, 0);

/**
 * @name Cmplx.IMAG
 * @field
 * @type Arith
 */
Cmplx.IMAG = Arith(0, 1);

/**
 * @name Cmplx.ONE
 * @field
 * @type Polar
 */
Cmplx.ONE  = Polar(1, 0);

Cmplx.Cmplx = Cmplx;
Arith.Cmplx = Cmplx;
Polar.Cmplx = Cmplx;

Cmplx.Arith = Arith;
Arith.Arith = Arith;
Polar.Arith = Arith;

Cmplx.Polar = Polar;
Arith.Polar = Polar;
Polar.Polar = Polar;

module.exports = Cmplx;

