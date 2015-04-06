/**
 * @fileOverview This file provides JavaScript classes related to complex numbers.
 * @author <a href="mailto:paulbottin+git@gmail.com">Paul Bottin</a>
 * @version 0.0.4
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
Cmplx.prototype.toPolar = function () {
	return Polar(this.radius, this.angle);
};

/**
 * Explicitly convert this complex number into a point object.
 * @name Cmplx#toPoint
 * @function
 * @returns {Object}
 */
Cmplx.prototype.toPoint = function () {
  return { x: this.real, y: this.imaginary };
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
		this.__defineSetter__('real', function (value) {
			real = value;
		});
		this.__defineGetter__('real', function () {
			return real;
		});
		this.__defineSetter__('imaginary', function (value) {
			imaginary = value;
		});
		this.__defineGetter__('imaginary', function () {
			return imaginary;
		});
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
 * @name Arith#addInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.addInline = function (rhs) {
	return Arith.addInline(this, rhs.toArith());
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
 * @name Arith#subInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.subInline = function (rhs) {
	return Arith.subInline(this, rhs.toArith());
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
 * @name Arith#mulInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.mulInline = function (rhs) {
	return Arith.mulInline(this, rhs.toArith());
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
 * @name Arith#divInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.prototype.divInline = function (rhs) {
	return Arith.divInline(this, rhs.toArith());
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
 * @name Arith#conjInline
 * @function
 * @returns {Arith}
 */
Arith.prototype.conjInline = function () {
	return Arith.conjInline(this);
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
 * @name Arith#normInline
 * @function
 * @returns {Arith}
 */
Arith.prototype.normInline = function () {
	return Arith.normInline(this);
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
 * @name Arith.addInline
 * @function
 * @param {Arith} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.addInline = function (lhs, rhs) {
	lhs.real += rhs.real;
	lhs.imaginary += rhs.imaginary;
	return lhs;
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
 * @name Arith.subInline
 * @function
 * @param {Arith} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.subInline = function (lhs, rhs) {
	lhs.real -= rhs.real;
	lhs.imaginary -= rhs.imaginary;
	return lhs;
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
 * @name Arith.mulInline
 * @function
 * @param {Arith} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.mulInline = function (lhs, rhs) {
	var real = lhs.real*rhs.real-lhs.imaginary*rhs.imaginary
	,	imaginary = lhs.real*rhs.imaginary+rhs.real*lhs.imaginary
	;
	lhs.real = real;
	lhs.imaginary = imaginary;
	return lhs;
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
 * @name Arith.divInline
 * @function
 * @param {Arith} lhs
 * @param {Cmplx} rhs
 * @returns {Arith}
 */
Arith.divInline = function (lhs, rhs) {
	var d = rhs.real*rhs.real+rhs.imaginary*rhs.imaginary
	,	real = (lhs.real*rhs.real+lhs.imaginary*rhs.imaginary)/d
	,	imaginary = (-lhs.real*rhs.imaginary+rhs.real*lhs.imaginary)/d
	;
	lhs.real = real;
	lhs.imaginary = imaginary;
	return lhs;
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
 * @name Arith.conjInline
 * @function
 * @param {Arith} lhs
 * @returns {Arith}
 */
Arith.conjInline = function (lhs) {
	lhs.imaginary = -lhs.imaginary;
	return lhs;
};

/**
 * @name Arith.norm
 * @function
 * @param {Cmplx} lhs
 * @returns {Arith}
 */
Arith.norm = function (lhs) {
  var r = lhs.radius;
	return Arith(lhs.real/r, lhs.imaginary/r);
};

/**
 * @name Arith.normInline
 * @function
 * @param {Arith} lhs
 * @returns {Arith}
 */
Arith.normInline = function (lhs) {
  var r = lhs.radius;
  lhs.real /= r;
  lhs.imaginary /= r;
	return lhs;
};

/**
 * @name Arith.fromPoint
 * @function
 * @param {Object} point
 * @returns {Arith}
 */
Arith.fromPoint = function (point) {
  return Arith(point.x, point.y);
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
		this.__defineGetter__('real', function () {
			return this.radius*Math.cos(this.angle);
		});
		this.__defineGetter__('imaginary', function () {
			return this.radius*Math.sin(this.angle);
		});
		this.__defineSetter__('radius', function (value) {
			radius = value;
		});
		this.__defineGetter__('radius', function () {
			return radius;
		});
		this.__defineSetter__('angle', function (value) {
			angle = value;
		});
		this.__defineGetter__('angle', function () {
			return angle;
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
 * @name Polar#addInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.addInline = function (rhs) {
	return Polar.addInline(this, rhs.toPolar());
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
 * @name Polar#subInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.subInline = function (rhs) {
	return Polar.subInline(this, rhs.toPolar());
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
 * @name Polar#mulInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.mulInline = function (rhs) {
	return Polar.mulInline(this, rhs.toPolar());
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
 * @name Polar#divInline
 * @function
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.prototype.divInline = function (rhs) {
	return Polar.divInline(this, rhs.toPolar());
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
 * @name Polar#conjInline
 * @function
 * @returns {Polar}
 */
Polar.prototype.conjInline = function () {
	return Polar.conjInline(this);
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
 * @name Polar#normInline
 * @function
 * @returns {Polar}
 */
Polar.prototype.normInline = function () {
	return Polar.normInline(this);
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
 * @name Polar.addInline
 * @function
 * @param {Polar} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.addInline = function (lhs, rhs) {
	var sum = Arith.add(lhs, rhs);
	lhs.radius = sum.radius;
	lhs.angle = sum.angle;
	return lhs;
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
 * @name Polar.subInline
 * @function
 * @param {Polar} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.subInline = function (lhs, rhs) {
	var sum = Arith.sub(lhs, rhs);
	lhs.radius = sum.radius;
	lhs.angle = sum.angle;
	return lhs;
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
 * @name Polar.mulInline
 * @function
 * @param {Polar} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.mulInline = function (lhs, rhs) {
	lhs.radius*=rhs.radius;
	lhs.angle+=rhs.angle;
	return lhs;
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
 * @name Polar.divInline
 * @function
 * @param {Polar} lhs
 * @param {Cmplx} rhs
 * @returns {Polar}
 */
Polar.divInline = function (lhs, rhs) {
	lhs.radius/=rhs.radius;
	lhs.angle-=rhs.angle;
	return lhs;
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
 * @name Polar.conjInline
 * @function
 * @param {Polar} lhs
 * @returns {Polar}
 */
Polar.conjInline = function (lhs) {
	lhs.angle = -lhs.angle;
	return lhs;
};

/**
 * @name Polar.norm
 * @function
 * @param {Cmplx} lhs
 * @returns {Polar}
 */
Polar.norm = function (lhs) {
	return Polar(1, lhs.angle);
};

/**
 * @name Polar.normInline
 * @function
 * @param {Polar} lhs
 * @returns {Polar}
 */
Polar.normInline = function (lhs) {
  lhs.radius = 1;
	return lhs;
};

/**
 * @name Polar.fromPoint
 * @function
 * @param {Object} point
 * @returns {Polar}
 */
Polar.fromPoint = function (point) {
  return Arith(point.x, point.y).toPolar();
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
