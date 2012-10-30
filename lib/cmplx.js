
var util = require('util');



function Cmplx() {
	if (this instanceof Cmplx) {
	} else return new Cmplx();
}

util.inherits(Cmplx, Object);

Cmplx.prototype.toArith = function () {
	return Arith(this.real, this.imaginary);
};

Cmplx.prototype.toPolar = function (rhs) {
	return Polar(this.radius, this.angle);
};

Cmplx.toRad = function (deg) {
	return deg * (Math.PI/180);
};

Cmplx.toDeg = function (rad) {
	return rad * (180/Math.PI);
};

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

Arith.prototype.add = function (rhs) {
	return Arith.add(this, rhs.toArith());
};

Arith.prototype.sub = function (rhs) {
	return Arith.sub(this, rhs.toArith());
};

Arith.prototype.mul = function (rhs) {
	return Arith.mul(this, rhs.toArith());
};

Arith.prototype.div = function (rhs) {
	return Arith.div(this, rhs.toArith());
};

Arith.prototype.conj = function () {
	return Arith.conj(this);
};

Arith.prototype.norm = function () {
	return Arith.norm(this);
};

Arith.prototype.toString = function () {
	return this.real+' + '+this.imaginary+'i';
};

Arith.add = function (lhs, rhs) {
	return Arith(lhs.real+rhs.real, lhs.imaginary+rhs.imaginary);
};

Arith.sub = function (lhs, rhs) {
	return Arith(lhs.real-rhs.real, lhs.imaginary-rhs.imaginary);
};

Arith.mul = function (lhs, rhs) {
	return Arith(lhs.real*rhs.real-lhs.imaginary*rhs.imaginary, lhs.real*rhs.imaginary+rhs.real*lhs.imaginary);
};

Arith.div = function (lhs, rhs) {
	var d = rhs.real*rhs.real+rhs.imaginary*rhs.imaginary;
	return Arith((lhs.real*rhs.real+lhs.imaginary*rhs.imaginary)/d, (-lhs.real*rhs.imaginary+rhs.real*lhs.imaginary)/d);
};

Arith.conj = function (lhs) {
	return Arith(lhs.real, -lhs.imaginary);
};

Arith.norm = function (lhs) {
	return Arith.mul(lhs, Arith.conj(lhs));
};


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

Polar.prototype.add = function (rhs) {
	return Polar.add(this, rhs.toPolar());
};

Polar.prototype.sub = function (rhs) {
	return Polar.sub(this, rhs.toPolar());
};

Polar.prototype.mul = function (rhs) {
	return Polar.mul(this, rhs.toPolar());
};

Polar.prototype.div = function (rhs) {
	return Polar.div(this, rhs.toPolar());
};

Polar.prototype.conj = function () {
	return Polar.conj(this);
};

Polar.prototype.norm = function () {
	return Polar.norm(this);
};

Polar.prototype.toString = function () {
	return this.radius+' e ^ '+this.imaginary+'i';
};

Polar.add = function (lhs, rhs) {
	return Arith.add(lhs, rhs).toPolar();
};

Polar.sub = function (lhs, rhs) {
	return Arith.sub(lhs, rhs).toPolar();
};

Polar.mul = function (lhs, rhs) {
	return Polar(lhs.radius*rhs.radius, lhs.angle+rhs.angle);
};

Polar.div = function (lhs, rhs) {
	return Polar(lhs.radius/rhs.radius, lhs.angle-rhs.angle);
};

Polar.conj = function (lhs) {
	return Polar(lhs.radius, -lhs.angle);
};

Polar.norm = function (lhs) {
	return Polar.mul(lhs, Polar.conj(lhs));
};



Cmplx.ZERO = Arith(0, 0);
Cmplx.REAL = Arith(1, 0);
Cmplx.IMAG = Arith(0, 1);
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

