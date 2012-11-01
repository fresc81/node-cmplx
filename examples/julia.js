
/*
 * computes the Mandelbrot Set for the given parameters using complex numbers and prints it to the console
 */

var cmplx = require('../lib/cmplx')

,	depth = 16
,	width = 128
,	height = 128

,	xScale = 3 / width
,	yScale = 2 / height
,	xOffset = -2
,	yOffset = -1

,	count = width * height
,	julia = new Array( count )
;

// calculate Mandelbrot Set
for (var x=0; x<width; x++) {
	var a = x * xScale + xOffset
	;
	
	for (var y=0; y<height; y++) {
		var b = y * yScale + yOffset
		,	i = y * width + x
		,	c = cmplx.Arith(a, b)
		,	z = cmplx.ZERO
		;
		
		julia[i] = ' ';
		for (var n = 0; n<depth; n++) {
			
			// z1 = z0 ^ 2 + c
			z = z.mul(z).add(c);
			
			// |z| > 2
			if (z.radius > 2) {
				
				// store iteration level
				julia[i] = n.toString(16);
				break;
			}
		}
	}
}

// print to console
var s = "";
for (var i = 0; i<count; i++) {
	if (i % width == 0) {
		s += "\n";
	}
	s += julia[i];
}
console.log(s);
