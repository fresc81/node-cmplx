
var cmplx = require('./lib/cmplx')

,	z1_A = cmplx.Arith(1.2, 3.2)
,	z1_P = z1_A.toPolar()
,	z1_AC = z1_A.conj()
,	z1_PC = z1_P.conj()

,	z2_P = cmplx.Polar(2.3, cmplx.toRad(45))
,	z2_A = z2_P.toArith()
,	z2_PC = z2_P.conj()
,	z2_AC = z2_A.conj()

,	z3_AP = z1_A.add(cmplx.ONE).mul(z2_P)
,	z3_PA = z1_P.add(cmplx.ONE).mul(z2_A)

;

console.log('z1_A: %s', z1_A);
console.log('z1_P: %s', z1_P);
console.log('z1_AC: %s', z1_AC);
console.log('z1_PC: %s', z1_PC);

console.log();

console.log('z2_P: %s', z2_P);
console.log('z2_A: %s', z2_A);
console.log('z2_PC: %s', z2_PC);
console.log('z2_AC: %s', z2_AC);

console.log();

console.log('z3_AP: %s', z3_AP);
console.log('z3_PA: %s', z3_PA);

