/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

/*
 * To use write/prints/... the default-output port has to be set first.
 * Simply setting SC_DEFAULT_OUT and SC_ERROR_OUT to the desired values
 * should do the trick.
 * In the following example the std-out and error-port are redirected to
 * a DIV.
function initRuntime() {
    function escapeHTML(s) {
	var tmp = s;
	tmp = tmp.replace(/&/g, "&amp;");
	tmp = tmp.replace(/</g, "&lt;");
	tmp = tmp.replace(/>/g, "&gt;");
	tmp = tmp.replace(/ /g, "&nbsp;");
	tmp = tmp.replace(/\n/g, "<br />");
	tmp = tmp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp");
	return tmp;

    }

    document.write("<div id='stdout'></div>");
    SC_DEFAULT_OUT = new sc_GenericOutputPort(
	function(s) {
	    var stdout = document.getElementById('stdout');
	    stdout.innerHTML = stdout.innerHTML + escapeHTML(s);
	});
    SC_ERROR_OUT = SC_DEFAULT_OUT;
}
*/


function sc_print_debug() {
    sc_print.apply(null, arguments);
}
/*** META ((export *js*)) */
var sc_JS_GLOBALS = this;

var __sc_LINE=-1;
var __sc_FILE="";

/*** META ((export #t)
           (arity -1)) */
function sc_alert() {
   var len = arguments.length;
   var s = "";
   var i;

   for( i = 0; i < len; i++ ) {
       s += sc_toDisplayString(arguments[ i ]);
   }

   return alert( s );
}

/*** META ((export #t) (arity #t)) */
function sc_typeof( x ) {
   return typeof x;
}

var __sc_errorHook = false;

/*** META ((export error-hook-set!) (arity #t)) */
function sc_errorHookSet( h ) {
   __sc_errorHook = h;
}

/*** META ((export error-hook) (arity #t)) */
function sc_errorHook() {
   return __sc_errorHook;
}

/*** META ((export #t) (arity -1)) */
function sc_error() {
   var e = new Error("sc_error");

   if (arguments.length >= 1) {
      e.name = arguments[0];
      if (arguments.length >= 2) {
	 e.message = arguments[1];
	 if (arguments.length >= 3) {
	    e.scObject = arguments[2];
	 }
      }
   }

   throw __sc_errorHook ? __sc_errorHook( e, arguments ) : e;
}

function sc_arity_check(fun, nbArgs) {
   function err( args, msg, obj ) {
      var where= ("callee" in args && "caller" in args.callee ?
		  ("sc_name" in args.callee.caller ?
		   args.callee.caller.sc_name : args.callee.caller)
		  : "arity-check");
      sc_error(where, msg, obj);
      return undefined;
   }

   if (typeof fun !== "function") {
      return err(arguments, "not a function", fun);
   }

   var fun_arity = fun.sc_arity;

   if (fun_arity === undefined || fun_arity === false) return fun;
   if (fun_arity >= 0 && nbArgs == fun_arity) return fun;
   if (fun_arity < 0 && nbArgs >= -1-fun_arity) return fun;
   var errorMsg = "Wrong number of arguments: " + fun_arity + " expected, " +
      nbArgs + " provided";
   return err( arguments, errorMsg, fun);
}

/*** META ((export #t) (arity #t)) */
function sc_raise(obj) {
    throw obj;
}


/*** META ((export with-handler-lambda) (arity #t)) */
function sc_withHandlerLambda(handler, body) {
    try {
	return body();
    } catch(e) {
	if (!e._internalException)
	    return handler(e);
	else
	    throw e;
    }
}

var sc_properties = new Object();

/*** META ((export #t) (arity #t)) */
function sc_putpropBang(sym, key, val) {
    var ht = sc_properties[sym];
    if (!ht) {
	ht = new Object();
	sc_properties[sym] = ht;
    }
    ht[key] = val;
}

/*** META ((export #t) (arity #t)) */
function sc_getprop(sym, key) {
    var ht = sc_properties[sym];
    if (ht) {
	if (key in ht)
	    return ht[key];
	else
	    return false;
    } else
	return false;
}

/*** META ((export #t) (arity #t)) */
function sc_rempropBang(sym, key) {
    var ht = sc_properties[sym];
    if (ht)
	delete ht[key];
}

/*** META ((export #t) (arity #t)) */
function sc_any2String(o) {
    return sc_jsstring2string(sc_toDisplayString(o));
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "==="))
           (type bool))
*/
function sc_isEqv(o1, o2) {
    return (o1 === o2);
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "==="))
           (type bool))
*/
function sc_isEq(o1, o2) {
    return (o1 === o2);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isNumber(n) {
    return (typeof n === "number");
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isComplex(n) {
    return sc_isNumber(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isReal(n) {
    return sc_isNumber(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isRational(n) {
    return sc_isReal(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isInteger(n) {
    return (parseInt(n) === n);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix ", false")))
*/
// we don't have exact numbers...
function sc_isExact(n) {
    return false;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ", true"))
	   (type bool))
*/
function sc_isInexact(n) {
    return true;
}

/*** META ((export = =fx =fl)
           (type bool)
           (peephole (infix 2 2 "==="))
           (arity -3))
*/
function sc_equal(x) {
    for (var i = 1; i < arguments.length; i++)
	if (x !== arguments[i])
	    return false;
    return true;
}

/*** META ((export < <fx <fl)
           (type bool)
           (peephole (infix 2 2 "<"))
           (arity -3))
*/
function sc_less(x) {
    for (var i = 1; i < arguments.length; i++) {
	if (x >= arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export > >fx >fl)
           (type bool)
           (peephole (infix 2 2 ">"))
           (arity -3))
*/
function sc_greater(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x <= arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export <= <=fx <=fl)
           (type bool)
           (peephole (infix 2 2 "<="))
           (arity -3))
*/
function sc_lessEqual(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x > arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export >= >=fl >=fx)
           (type bool)
           (peephole (infix 2 2 ">="))
           (arity -3))
*/
function sc_greaterEqual(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x < arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export zero? zerofx? zerofl?) (arity #t)
           (type bool)
           (peephole (postfix "=== 0")))
*/
function sc_isZero(x) {
    return (x === 0);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "> 0")))
*/
function sc_isPositive(x) {
    return (x > 0);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "< 0")))
*/
function sc_isNegative(x) {
    return (x < 0);
}

/*** META ((export odd? oddfx? evenfl?) (arity #t)
           (type bool)
           (peephole (postfix "%2===1")))
*/
function sc_isOdd(x) {
    return (x % 2 === 1);
}

/*** META ((export even? evenfx? evenfl?) (arity #t)
           (type bool)
           (peephole (postfix "%2===0")))
*/
function sc_isEven(x) {
    return (x % 2 === 0);
}

/*** META ((export #t)
           (arity -2)) */
var sc_max = Math.max;
/*** META ((export #t)
           (arity -2)) */
var sc_min = Math.min;

/*** META ((export + +fx +fl)
           (peephole (infix 0 #f "+" "0"))
           (arity -1))
*/
function sc_plus() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++)
	sum += arguments[i];
    return sum;
}

/*** META ((export * *fx *fl)
           (peephole (infix 0 #f "*" "1"))
           (arity -1))
*/
function sc_multi() {
    var product = 1;
    for (var i = 0; i < arguments.length; i++)
	product *= arguments[i];
    return product;
}

/*** META ((export - -fx -fl negfx negfl)
           (peephole (minus))
           (arity -2))
*/
function sc_minus(x) {
    if (arguments.length === 1)
	return -x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res -= arguments[i];
	return res;
    }
}

/*** META ((export / /fl)
           (peephole (div))
           (arity -2))
*/
function sc_div(x) {
    if (arguments.length === 1)
	return 1/x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res /= arguments[i];
	return res;
    }
}

/*** META ((export #t)
           (arity 1))
*/
var sc_abs = Math.abs;

/*** META ((export quotient /fx) (arity #t)
           (peephole (hole 2 "parseInt(" x "/" y ")")))
*/
function sc_quotient(x, y) {
    return parseInt(x / y);
}

/*** META ((export remainder remainderfl) (arity #t)
           (peephole (infix 2 2 "%")))
*/
function sc_remainder(x, y) {
    return x % y;
}

/*** META ((export modulo modulofx) (arity #t))
*/
function sc_modulo(x, y) {
    var remainder = x % y;
    // if they don't have the same sign
    if ((remainder * y) < 0)
	return remainder + y;
    else
	return remainder;
}

function sc_euclid_gcd(a, b) {
    var temp;
    if (a === 0) return b;
    if (b === 0) return a;
    if (a < 0) {a = -a;};
    if (b < 0) {b = -b;};
    if (b > a) {temp = a; a = b; b = temp;};
    while (true) {
	a %= b;
	if(a === 0) {return b;};
	b %= a;
	if(b === 0) {return a;};
    };
    return b;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_gcd() {
    var gcd = 0;
    for (var i = 0; i < arguments.length; i++)
	gcd = sc_euclid_gcd(gcd, arguments[i]);
    return gcd;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_lcm() {
    var lcm = 1;
    for (var i = 0; i < arguments.length; i++) {
	var f = Math.round(arguments[i] / sc_euclid_gcd(arguments[i], lcm));
	lcm *= Math.abs(f);
    }
    return lcm;
}

// LIMITATION: numerator and denominator don't make sense in floating point world.
//var SC_MAX_DECIMALS = 1000000
//
// function sc_numerator(x) {
//     var rounded = Math.round(x * SC_MAX_DECIMALS);
//     return Math.round(rounded / sc_euclid_gcd(rounded, SC_MAX_DECIMALS));
// }

// function sc_denominator(x) {
//     var rounded = Math.round(x * SC_MAX_DECIMALS);
//     return Math.round(SC_MAX_DECIMALS / sc_euclid_gcd(rounded, SC_MAX_DECIMALS));
// }

/*** META ((export #t)
           (arity 1))
*/
var sc_floor = Math.floor;
/*** META ((export #t)
           (arity 1))
*/
var sc_ceiling = Math.ceil;
/*** META ((export #t)
           (arity 1))
*/
var sc_truncate = parseInt;
/*** META ((export #t)
           (arity 1))
*/
var sc_round = Math.round;

// LIMITATION: sc_rationalize doesn't make sense in a floating point world.

/*** META ((export #t)
           (arity 1))
*/
var sc_exp = Math.exp;
/*** META ((export #t)
           (arity 1))
*/
var sc_log = Math.log;
/*** META ((export #t)
           (arity 1))
*/
var sc_sin = Math.sin;
/*** META ((export #t)
           (arity 1))
*/
var sc_cos = Math.cos;
/*** META ((export #t)
           (arity 1))
*/
var sc_tan = Math.tan;
/*** META ((export #t)
           (arity 1))
*/
var sc_asin = Math.asin;
/*** META ((export #t)
           (arity 1))
*/
var sc_acos = Math.acos;
/*** META ((export #t)
           (arity -2))
*/
var sc_atan = Math.atan;

/*** META ((export #t)
           (arity 1))
*/
var sc_sqrt = Math.sqrt;
/*** META ((export #t)
           (arity 2))
*/
var sc_expt = Math.pow;

// LIMITATION: we don't have complex numbers.
// LIMITATION: the following functions are hence not implemented.
// LIMITATION: make-rectangular, make-polar, real-part, imag-part, magnitude, angle
// LIMITATION: 2 argument atan

/*** META ((export #t) (arity #t)
           (peephole (id)))
*/
function sc_exact2inexact(x) {
    return x;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix "<< 0")))
*/
function sc_inexact2exact(x) {
    return x << 0;
}

function sc_number2jsstring(x, radix) {
    if (radix)
	return x.toString(radix);
    else
	return x.toString();
}

function sc_jsstring2number(s, radix) {
    if (s === "") return false;

    if (radix) {
	var t = parseInt(s, radix);
	if (!t && t !== 0) return false;
	// verify that each char is in range. (parseInt ignores leading
	// white and trailing chars)
	var allowedChars = "01234567890abcdefghijklmnopqrstuvwxyz".substring(0, radix+1);
	if ((new RegExp("^["+allowedChars+"]*$", "i")).test(s))
	    return t;
	else return false;
    } else {
	var t = +s; // does not ignore trailing chars.
	if (!t && t !== 0) return false;
	// simply verify that first char is not whitespace.
	var c = s.charAt(0);
	// if +c is 0, but the char is not "0", then we have a whitespace.
	if (+c === 0 && c !== "0") return false;
	return t;
    }
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (not)))
*/
function sc_not(b) {
    return b === false;
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isBoolean(b) {
    return (b === true) || (b === false);
}

function sc_Pair(car, cdr) {
    this.car = car;
    this.cdr = cdr;
}

sc_Pair.prototype.toString = function() {
    return sc_toDisplayString(this);
};
sc_Pair.prototype.sc_toWriteOrDisplayString = function(writeOrDisplay) {
    var current = this;

    var res = "(";

    while(true) {
	res += writeOrDisplay(current.car);
	if (sc_isPair(current.cdr)) {
	    res += " ";
	    current = current.cdr;
	} else if (current.cdr !== null) {
	    res += " . " + writeOrDisplay(current.cdr);
	    break;
	} else // current.cdr == null
	    break;
    }

    res += ")";

    return res;
};
sc_Pair.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
sc_Pair.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};
// sc_Pair.prototype.sc_toWriteCircleString in IO.js

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_Pair")))
*/
function sc_isPair(p) {
    return (p instanceof sc_Pair);
}

function sc_isPairEqual(p1, p2, comp) {
    return (comp(p1.car, p2.car) && comp(p1.cdr, p2.cdr));
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 "new sc_Pair(" car ", " cdr ")")))
*/
function sc_cons(car, cdr) {
    return new sc_Pair(car, cdr);
}

/*** META ((export cons*)
           (arity -2))
*/
function sc_consStar() {
    var res = arguments[arguments.length - 1];
    for (var i = arguments.length-2; i >= 0; i--)
	res = new sc_Pair(arguments[i], res);
    return res;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".car")))
*/
function sc_car(p) {
    return p.car;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr")))
*/
function sc_cdr(p) {
    return p.cdr;
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 p ".car = " val)))
*/
function sc_setCarBang(p, val) {
    p.car = val;
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 p ".cdr = " val)))
*/
function sc_setCdrBang(p, val) {
    p.cdr = val;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car")))
*/
function sc_caar(p) { return p.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car")))
*/
function sc_cadr(p) { return p.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr")))
*/
function sc_cdar(p) { return p.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr")))
*/
function sc_cddr(p) { return p.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car")))
*/
function sc_caaar(p) { return p.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car")))
*/
function sc_cadar(p) { return p.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car")))
*/
function sc_caadr(p) { return p.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car")))
*/
function sc_caddr(p) { return p.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr")))
*/
function sc_cdaar(p) { return p.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr")))
*/
function sc_cdadr(p) { return p.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr")))
*/
function sc_cddar(p) { return p.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr")))
*/
function sc_cdddr(p) { return p.cdr.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car.car")))
*/
function sc_caaaar(p) { return p.car.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car.car")))
*/
function sc_caadar(p) { return p.car.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car.car")))
*/
function sc_caaadr(p) { return p.cdr.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car.car")))
*/
function sc_caaddr(p) { return p.cdr.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car.cdr")))
*/
function sc_cdaaar(p) { return p.car.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car.cdr")))
*/
function sc_cdadar(p) { return p.car.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car.cdr")))
*/
function sc_cdaadr(p) { return p.cdr.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car.cdr")))
*/
function sc_cdaddr(p) { return p.cdr.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr.car")))
*/
function sc_cadaar(p) { return p.car.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr.car")))
*/
function sc_caddar(p) { return p.car.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr.car")))
*/
function sc_cadadr(p) { return p.cdr.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr.car")))
*/
function sc_cadddr(p) { return p.cdr.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr.cdr")))
*/
function sc_cddaar(p) { return p.car.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr.cdr")))
*/
function sc_cdddar(p) { return p.car.cdr.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr.cdr")))
*/
function sc_cddadr(p) { return p.cdr.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr.cdr")))
*/
function sc_cddddr(p) { return p.cdr.cdr.cdr.cdr; }

/*** META ((export #t) (arity #t)) */
function sc_lastPair(l) {
    if (!sc_isPair(l)) sc_error("sc_lastPair: pair expected");
    var res = l;
    var cdr = l.cdr;
    while (sc_isPair(cdr)) {
	res = cdr;
	cdr = res.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix " === null")))
*/
function sc_isNull(o) {
    return (o === null);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isList(o) {
   var rabbit = o;
   var turtle = o;

   while (true) {
       if (rabbit === null ||
	   (rabbit instanceof sc_Pair && rabbit.cdr === null))
	   return true;  // end of list
       else {
	   if ((rabbit instanceof sc_Pair) &&
	       (rabbit.cdr instanceof sc_Pair)) {
	       rabbit = rabbit.cdr.cdr;
	       turtle = turtle.cdr;
	       if (rabbit === turtle) return false; // cycle
	   } else
	       return false; // not pair
       }
   }
}

/*** META ((export #t)
           (arity -1))
 */
function sc_list() {
    var res = null;
    var a = arguments;
    for (var i = a.length-1; i >= 0; i--)
	res = new sc_Pair(a[i], res);
    return res;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_iota(num, init) {
   var res = null;
   if (!init) init = 0;
   for (var i = num - 1; i >= 0; i--)
      res = new sc_Pair(i + init, res);
   return res;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_makeList(nbEls, fill) {
    var res = null;
    for (var i = 0; i < nbEls; i++)
	res = new sc_Pair(fill, res);
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_length(l) {
    var res = 0;
    while (l !== null) {
	res++;
	l = l.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_remq(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l !== null) {
	if (l.car !== o) {
	    tail.cdr = sc_cons(l.car, null);
	    tail = tail.cdr;
	}
	l = l.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_remqBang(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    var needsAssig = true;
    while (l !== null) {
	if (l.car === o) {
	    needsAssig = true;
	} else {
	    if (needsAssig) {
		tail.cdr = l;
		needsAssig = false;
	    }
	    tail = l;
	}
	l = l.cdr;
    }
    tail.cdr = null;
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_delete(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l !== null) {
	if (!sc_isEqual(l.car, o)) {
	    tail.cdr = sc_cons(l.car, null);
	    tail = tail.cdr;
	}
	l = l.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_deleteBang(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    var needsAssig = true;
    while (l !== null) {
	if (sc_isEqual(l.car, o)) {
	    needsAssig = true;
	} else {
	    if (needsAssig) {
		tail.cdr = l;
		needsAssig = false;
	    }
	    tail = l;
	}
	l = l.cdr;
    }
    tail.cdr = null;
    return dummy.cdr;
}

function sc_reverseAppendBang(l1, l2) {
    var res = l2;
    while (l1 !== null) {
	var tmp = res;
	res = l1;
	l1 = l1.cdr;
	res.cdr = tmp;
    }
    return res;
}

function sc_dualAppend(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    var rev = sc_reverse(l1);
    return sc_reverseAppendBang(rev, l2);
}

/*** META ((export append eappend) ;; we want eappend for the quasiquotes.
           (arity -1))
*/
function sc_append() {
    if (arguments.length === 0)
	return null;
    var res = arguments[arguments.length - 1];
    for (var i = arguments.length - 2; i >= 0; i--)
	res = sc_dualAppend(arguments[i], res);
    return res;
}

function sc_dualAppendBang(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    var tmp = l1;
    while (tmp.cdr !== null) tmp=tmp.cdr;
    tmp.cdr = l2;
    return l1;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_appendBang() {
    var res = null;
    for (var i = 0; i < arguments.length; i++)
	res = sc_dualAppendBang(res, arguments[i]);
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_reverse(l1) {
    var res = null;
    while (l1 !== null) {
	res = sc_cons(l1.car, res);
	l1 = l1.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_reverseBang(l) {
    return sc_reverseAppendBang(l, null);
}

/*** META ((export #t) (arity #t)) */
function sc_listTail(l, k) {
    var res = l;
    for (var i = 0; i < k; i++) {
	res = res.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_listRef(l, k) {
    return sc_listTail(l, k).car;
}

/* // unoptimized generic versions
function sc_memX(o, l, comp) {
    while (l != null) {
	if (comp(l.car, o))
	    return l;
	l = l.cdr;
    }
    return false;
}
function sc_memq(o, l) { return sc_memX(o, l, sc_isEq); }
function sc_memv(o, l) { return sc_memX(o, l, sc_isEqv); }
function sc_member(o, l) { return sc_memX(o, l, sc_isEqual); }
*/

/* optimized versions */
/*** META ((export #t) (arity #t)) */
function sc_memq(o, l) {
    while (l !== null) {
	if (l.car === o)
	    return l;
	l = l.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_memv(o, l) {
    while (l !== null) {
	if (l.car === o)
	    return l;
	l = l.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_member(o, l) {
    while (l !== null) {
	if (sc_isEqual(l.car,o))
	    return l;
	l = l.cdr;
    }
    return false;
}

/* // generic unoptimized versions
function sc_assX(o, al, comp) {
    while (al != null) {
	if (comp(al.car.car, o))
	    return al.car;
	al = al.cdr;
    }
    return false;
}
function sc_assq(o, al) { return sc_assX(o, al, sc_isEq); }
function sc_assv(o, al) { return sc_assX(o, al, sc_isEqv); }
function sc_assoc(o, al) { return sc_assX(o, al, sc_isEqual); }
*/
// optimized versions
/*** META ((export #t) (arity #t)) */
function sc_assq(o, al) {
    while (al !== null) {
	if (al.car.car === o)
	    return al.car;
	al = al.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_assv(o, al) {
    while (al !== null) {
	if (al.car.car === o)
	    return al.car;
	al = al.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_assoc(o, al) {
    while (al !== null) {
	if (sc_isEqual(al.car.car, o))
	    return al.car;
	al = al.cdr;
    }
    return false;
}

/* can be used for mutable strings and characters */
function sc_isCharStringEqual(cs1, cs2) { return cs1.val === cs2.val; }
function sc_isCharStringLess(cs1, cs2) { return cs1.val < cs2.val; }
function sc_isCharStringGreater(cs1, cs2) { return cs1.val > cs2.val; }
function sc_isCharStringLessEqual(cs1, cs2) { return cs1.val <= cs2.val; }
function sc_isCharStringGreaterEqual(cs1, cs2) { return cs1.val >= cs2.val; }
function sc_isCharStringCIEqual(cs1, cs2)
    { return cs1.val.toLowerCase() === cs2.val.toLowerCase(); }
function sc_isCharStringCILess(cs1, cs2)
    { return cs1.val.toLowerCase() < cs2.val.toLowerCase(); }
function sc_isCharStringCIGreater(cs1, cs2)
    { return cs1.val.toLowerCase() > cs2.val.toLowerCase(); }
function sc_isCharStringCILessEqual(cs1, cs2)
    { return cs1.val.toLowerCase() <= cs2.val.toLowerCase(); }
function sc_isCharStringCIGreaterEqual(cs1, cs2)
    { return cs1.val.toLowerCase() >= cs2.val.toLowerCase(); }

function sc_Char(c) {
    var cached = sc_Char.lazy[c];
    if (cached)
	return cached;
    this.val = c;
    sc_Char.lazy[c] = this;
    // add return, so FF does not complain.
    return undefined;
}
sc_Char.lazy = new Object();
// thanks to Eric
sc_Char.char2readable = {
    "\000": "#\\null",
    "\007": "#\\bell",
    "\010": "#\\backspace",
    "\011": "#\\tab",
    "\012": "#\\newline",
    "\014": "#\\page",
    "\015": "#\\return",
    "\033": "#\\escape",
    "\040": "#\\space",
    "\177": "#\\delete",

  /* poeticless names */
    "\001": "#\\soh",
    "\002": "#\\stx",
    "\003": "#\\etx",
    "\004": "#\\eot",
    "\005": "#\\enq",
    "\006": "#\\ack",

    "\013": "#\\vt",
    "\016": "#\\so",
    "\017": "#\\si",

    "\020": "#\\dle",
    "\021": "#\\dc1",
    "\022": "#\\dc2",
    "\023": "#\\dc3",
    "\024": "#\\dc4",
    "\025": "#\\nak",
    "\026": "#\\syn",
    "\027": "#\\etb",

    "\030": "#\\can",
    "\031": "#\\em",
    "\032": "#\\sub",
    "\033": "#\\esc",
    "\034": "#\\fs",
    "\035": "#\\gs",
    "\036": "#\\rs",
    "\037": "#\\us"};

sc_Char.readable2char = {
    "null": "\000",
    "bell": "\007",
    "backspace": "\010",
    "tab": "\011",
    "newline": "\012",
    "page": "\014",
    "return": "\015",
    "escape": "\033",
    "space": "\040",
    "delete": "\000",
    "soh": "\001",
    "stx": "\002",
    "etx": "\003",
    "eot": "\004",
    "enq": "\005",
    "ack": "\006",
    "bel": "\007",
    "bs": "\010",
    "ht": "\011",
    "nl": "\012",
    "vt": "\013",
    "np": "\014",
    "cr": "\015",
    "so": "\016",
    "si": "\017",
    "dle": "\020",
    "dc1": "\021",
    "dc2": "\022",
    "dc3": "\023",
    "dc4": "\024",
    "nak": "\025",
    "syn": "\026",
    "etb": "\027",
    "can": "\030",
    "em": "\031",
    "sub": "\032",
    "esc": "\033",
    "fs": "\034",
    "gs": "\035",
    "rs": "\036",
    "us": "\037",
    "sp": "\040",
    "del": "\177"};

sc_Char.prototype.toString = function() {
    return this.val;
};
// sc_toDisplayString == toString
sc_Char.prototype.sc_toWriteString = function() {
    var entry = sc_Char.char2readable[this.val];
    if (entry)
	return entry;
    else
	return "#\\" + this.val;
};

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "instanceof sc_Char")))
*/
function sc_isChar(c) {
    return (c instanceof sc_Char);
}

/*** META ((export char=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val === " c2 ".val")))
*/
var sc_isCharEqual = sc_isCharStringEqual;
/*** META ((export char<?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val < " c2 ".val")))
*/
var sc_isCharLess = sc_isCharStringLess;
/*** META ((export char>?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val > " c2 ".val")))
*/
var sc_isCharGreater = sc_isCharStringGreater;
/*** META ((export char<=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val <= " c2 ".val")))
*/
var sc_isCharLessEqual = sc_isCharStringLessEqual;
/*** META ((export char>=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val >= " c2 ".val")))
*/
var sc_isCharGreaterEqual = sc_isCharStringGreaterEqual;
/*** META ((export char-ci=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() === " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIEqual = sc_isCharStringCIEqual;
/*** META ((export char-ci<?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() < " c2 ".val.toLowerCase()")))
*/
var sc_isCharCILess = sc_isCharStringCILess;
/*** META ((export char-ci>?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() > " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIGreater = sc_isCharStringCIGreater;
/*** META ((export char-ci<=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() <= " c2 ".val.toLowerCase()")))
*/
var sc_isCharCILessEqual = sc_isCharStringCILessEqual;
/*** META ((export char-ci>=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() >= " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIGreaterEqual = sc_isCharStringCIGreaterEqual;

var SC_NUMBER_CLASS = "0123456789";
var SC_WHITESPACE_CLASS = ' \r\n\t\f';
var SC_LOWER_CLASS = 'abcdefghijklmnopqrstuvwxyz';
var SC_UPPER_CLASS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function sc_isCharOfClass(c, cl) { return (cl.indexOf(c) != -1); }
/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isCharAlphabetic(c)
    { return sc_isCharOfClass(c.val, SC_LOWER_CLASS) ||
	  sc_isCharOfClass(c.val, SC_UPPER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_NUMBER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharNumeric(c)
    { return sc_isCharOfClass(c.val, SC_NUMBER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isCharWhitespace(c) {
    var tmp = c.val;
    return tmp === " " || tmp === "\r" || tmp === "\n" || tmp === "\t" || tmp === "\f";
}
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_UPPER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharUpperCase(c)
    { return sc_isCharOfClass(c.val, SC_UPPER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_LOWER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharLowerCase(c)
    { return sc_isCharOfClass(c.val, SC_LOWER_CLASS); }

/*** META ((export #t) (arity #t)
           (peephole (postfix ".val.charCodeAt(0)")))
*/
function sc_char2integer(c)
    { return c.val.charCodeAt(0); }
/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(String.fromCharCode(" n "))")))
*/
function sc_integer2char(n)
    { return new sc_Char(String.fromCharCode(n)); }

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(" c ".val.toUpperCase())")))
*/
function sc_charUpcase(c)
    { return new sc_Char(c.val.toUpperCase()); }
/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(" c ".val.toLowerCase())")))
*/
function sc_charDowncase(c)
    { return new sc_Char(c.val.toLowerCase()); }

function sc_makeJSStringOfLength(k, c) {
    var fill;
    if (c === undefined)
	fill = " ";
    else
	fill = c;
    var res = "";
    var len = 1;
    // every round doubles the size of fill.
    while (k >= len) {
	if (k & len)
	    res = res.concat(fill);
	fill = fill.concat(fill);
	len *= 2;
    }
    return res;
}

function sc_makejsString(k, c) {
    var fill;
    if (c)
	fill = c.val;
    else
	fill = " ";
    return sc_makeJSStringOfLength(k, fill);
}

function sc_jsstring2list(s) {
    var res = null;
    for (var i = s.length - 1; i >= 0; i--)
	res = sc_cons(new sc_Char(s.charAt(i)), res);
    return res;
}

function sc_list2jsstring(l) {
    var a = new Array();
    while(l !== null) {
	a.push(l.car.val);
	l = l.cdr;
    }
    return "".concat.apply("", a);
}

var sc_Vector = Array;

sc_Vector.prototype.sc_toWriteOrDisplayString = function(writeOrDisplay) {
    if (this.length === 0) return "#()";

    var res = "#(" + writeOrDisplay(this[0]);
    for (var i = 1; i < this.length; i++)
	res += " " + writeOrDisplay(this[i]);
    res += ")";
    return res;
};
sc_Vector.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
sc_Vector.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};

/*** META ((export vector? array?) (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_Vector")))
*/
function sc_isVector(v) {
    return (v instanceof sc_Vector);
}

// only applies to vectors
function sc_isVectorEqual(v1, v2, comp) {
    if (v1.length !== v2.length) return false;
    for (var i = 0; i < v1.length; i++)
	if (!comp(v1[i], v2[i])) return false;
    return true;
}

/*** META ((export make-vector make-array)
           (arity -2))
*/
function sc_makeVector(size, fill) {
    var a = new sc_Vector(size);
    if (fill !== undefined)
	sc_vectorFillBang(a, fill);
    return a;
}

/*** META ((export vector array)
           (arity -1)
           (peephole (vector)))
*/
function sc_vector() {
    var a = new sc_Vector();
    for (var i = 0; i < arguments.length; i++)
	a.push(arguments[i]);
    return a;
}

/*** META ((export vector-length array-length) (arity #t)
           (peephole (postfix ".length")))
*/
function sc_vectorLength(v) {
    return v.length;
}

/*** META ((export vector-ref array-ref) (arity #t)
           (peephole (hole 2 v "[" pos "]")))
*/
function sc_vectorRef(v, pos) {
    return v[pos];
}

/*** META ((export vector-set! array-set!) (arity #t)
           (peephole (hole 3 v "[" pos "] = " val)))
*/
function sc_vectorSetBang(v, pos, val) {
    v[pos] = val;
}

/*** META ((export vector->list array->list) (arity #t)) */
function sc_vector2list(a) {
    var res = null;
    for (var i = a.length-1; i >= 0; i--)
	res = sc_cons(a[i], res);
    return res;
}

/*** META ((export list->vector list->array) (arity #t)) */
function sc_list2vector(l) {
    var a = new sc_Vector();
    while(l !== null) {
	a.push(l.car);
	l = l.cdr;
    }
    return a;
}

/*** META ((export vector-fill! array-fill!) (arity #t)) */
function sc_vectorFillBang(a, fill) {
    for (var i = 0; i < a.length; i++)
	a[i] = fill;
}


/*** META ((export #t) (arity #t)) */
function sc_copyVector(a, len) {
    if (len <= a.length)
	return a.slice(0, len);
    else {
	var tmp = a.concat();
	tmp.length = len;
	return tmp;
    }
}

/*** META ((export #t) (arity -2)
           (peephole (hole 3 a ".slice(" start "," end ")")))
*/
function sc_vectorCopy(a, start, end) {
    return a.slice(start, end);
}

/*** META ((export #t) (arity -4)) */
function sc_vectorCopyBang(target, tstart, source, sstart, send) {
    if (!sstart) sstart = 0;
    if (!send) send = source.length;

    // if target == source we don't want to overwrite not yet copied elements.
    if (tstart <= sstart) {
	for (var i = tstart, j = sstart; j < send; i++, j++) {
	    target[i] = source[j];
	}
    } else {
	var diff = send - sstart;
	for (var i = tstart + diff - 1, j = send - 1;
	     j >= sstart;
	     i--, j--) {
	    target[i] = source[j];
	}
    }
    return target;
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "typeof " o " === 'function'")))
*/
function sc_isProcedure(o) {
    return (typeof o === "function");
}

/*** META ((export #t) (arity -3)) */
function sc_apply(proc) {
    var args = new Array();
    // first part of arguments are not in list-form.
    for (var i = 1; i < arguments.length - 1; i++)
	args.push(arguments[i]);
    var l = arguments[arguments.length - 1];
    while (l !== null) {
	args.push(l.car);
	l = l.cdr;
    }
    return proc.apply(null, args);
}

/*** META ((export #t) (arity -2)) */
function sc_map(proc, l1) {
    if (l1 === undefined)
	return null;
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var revres = null;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	revres = sc_cons(proc.apply(null, applyArgs), revres);
    }
    return sc_reverseAppendBang(revres, null);
}

/*** META ((export #t) (arity -2)) */
function sc_mapBang(proc, l1) {
    if (l1 === undefined)
	return null;
    // else
    var l1_orig = l1;
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	var tmp = l1;
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	tmp.car = proc.apply(null, applyArgs);
    }
    return l1_orig;
}

/*** META ((export #t) (arity -2)) */
function sc_forEach(proc, l1) {
    if (l1 === undefined)
	return undefined;
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	proc.apply(null, applyArgs);
    }
    // add return so FF does not complain.
    return undefined;
}

/*** META ((export #t) (arity #t)) */
function sc_filter(proc, l1) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l1 !== null) {
	if (proc(l1.car) !== false) {
	    tail.cdr = sc_cons(l1.car, null);
	    tail = tail.cdr;
	}
	l1 = l1.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_filterBang(proc, l1) {
    var head = sc_cons("dummy", l1);
    var it = head;
    var next = l1;
    while (next !== null) {
        if (proc(next.car) !== false) {
	    it.cdr = next
	    it = next;
	}
	next = next.cdr;
    }
    it.cdr = null;
    return head.cdr;
}

function sc_filterMap1(proc, l1) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car)
        if (tmp !== false) revres = sc_cons(tmp, revres);
        l1 = l1.cdr;
    }
    return sc_reverseAppendBang(revres, null);
}
function sc_filterMap2(proc, l1, l2) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car, l2.car);
        if(tmp !== false) revres = sc_cons(tmp, revres);
	l1 = l1.cdr;
	l2 = l2.cdr
    }
    return sc_reverseAppendBang(revres, null);
}

/*** META ((export #t) (arity -2)) */
function sc_filterMap(proc, l1, l2, l3) {
    if (l2 === undefined)
	return sc_filterMap1(proc, l1);
    else if (l3 === undefined)
	return sc_filterMap2(proc, l1, l2);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var revres = null;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp = proc.apply(null, applyArgs);
	if(tmp !== false) revres = sc_cons(tmp, revres);
    }
    return sc_reverseAppendBang(revres, null);
}

function sc_any1(proc, l) {
    var revres = null;
    while (l !== null) {
        var tmp = proc(l.car);
        if(tmp !== false) return tmp;
	l = l.cdr;
    }
    return false;
}

/*** META ((export #t) (arity -2)) */
function sc_any(proc, l1, l2) {
    if (l1 === undefined)
	return false;
    if (l2 === undefined)
	return sc_any1(proc, l1);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp =  proc.apply(null, applyArgs);
	if (tmp !== false) return tmp;
    }
    return false;
}

/*** META ((export any?) (arity -2)
           (peephole (hole 2 "sc_any(" proc "," l ") !== false")))
*/
function sc_anyPred(proc, l) {
    return sc_any(proc, l) !== false;
}


function sc_every1(proc, l) {
    var revres = null;
    var tmp = true;
    while (l !== null) {
        tmp = proc(l.car);
        if (tmp === false) return false;
	l = l.cdr;
    }
    return tmp;
}

/*** META ((export #t) (arity -2)) */
function sc_every(proc, l1, l2) {
    if (l1 === undefined)
	return true;
    if (l2 === undefined)
	return sc_every1(proc, l1);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var tmp = true;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp = proc.apply(null, applyArgs);
	if (tmp === false) return false;
    }
    return tmp;
}

/*** META ((export every?) (arity -2)
           (peephole (hole 2 "sc_every(" proc "," l ") !== false")))
*/
function sc_everyPred(proc, l) {
    var tmp = sc_every(proc, l);
    if (tmp !== false) return true;
    return false;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix "()")))
*/
function sc_force(o) {
    return o();
}

/*** META ((export #t) (arity #t)) */
function sc_makePromise(proc) {
    var isResultReady = false;
    var result = undefined;
    return function() {
	if (!isResultReady) {
	    var tmp = proc();
	    if (!isResultReady) {
		isResultReady = true;
		result = tmp;
	    }
	}
	return result;
    };
}

function sc_Values(values) {
    this.values = values;
}

/*** META ((export #t) (arity -1)
           (peephole (values)))
*/
function sc_values() {
    if (arguments.length === 1)
	return arguments[0];
    else
	return new sc_Values(arguments);
}

/*** META ((export #t) (arity #t)) */
function sc_callWithValues(producer, consumer) {
   if( !sc_isProcedure(producer) )
      sc_error( "callWithValue", "producer not a procedure", producer );

    var produced = producer();
    if (produced instanceof sc_Values)
	return consumer.apply(null, produced.values);
    else
	return consumer(produced);
}

/*** META ((export #t) (arity #t)) */
function sc_dynamicWind(before, thunk, after) {
    before();
    try {
	var res = thunk();
	return res;
    } finally {
	after();
    }
}


// TODO: eval/scheme-report-environment/null-environment/interaction-environment

// LIMITATION: 'load' doesn't exist without files.
// LIMITATION: transcript-on/transcript-off doesn't exist without files.


function sc_Struct(name) {
    this.name = name;
}
sc_Struct.prototype.sc_toDisplayString = function() {
    return "#<struct" + sc_hash(this) + ">";
};
sc_Struct.prototype.sc_toWriteString = sc_Struct.prototype.sc_toDisplayString;

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Struct(" name ")")))
*/
function sc_makeStruct(name) {
    return new sc_Struct(name);
}

/*** META ((export #t) (arity 1)
           (type bool)
           (peephole (postfix " instanceof sc_Struct")))
*/
function sc_isStruct(o) {
    return (o instanceof sc_Struct);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 2 "(" 1 " instanceof sc_Struct) && ( " 1 ".name === " 0 ")")))
*/
function sc_isStructNamed(name, s) {
    return ((s instanceof sc_Struct) && (s.name === name));
}

/*** META ((export struct-field) (arity #t)
           (peephole (hole 3 0 "[" 2 "]")))
*/
function sc_getStructField(s, name, field) {
    return s[field];
}

/*** META ((export struct-field-set!) (arity #t)
           (peephole (hole 4 0 "[" 2 "] = " 3)))
*/
function sc_setStructFieldBang(s, name, field, val) {
    s[field] = val;
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "~")))
*/
function sc_bitNot(x) {
    return ~x;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "&")))
*/
function sc_bitAnd(x, y) {
    return x & y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "|")))
*/
function sc_bitOr(x, y) {
    return x | y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "^")))
*/
function sc_bitXor(x, y) {
    return x ^ y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "<<")))
*/
function sc_bitLsh(x, y) {
    return x << y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 ">>")))
*/
function sc_bitRsh(x, y) {
    return x >> y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 ">>>")))
*/
function sc_bitUrsh(x, y) {
    return x >>> y;
}

/*** META ((export js-field js-property js-ref) (arity #t)
           (peephole (hole 2 o "[" field "]")))
*/
function sc_jsField(o, field) {
    return o[field];
}

/*** META ((export js-field-set! js-property-set! js-set!)
           (arity #t)
           (peephole (hole 3 o "[" field "] = " val)))
*/
function sc_setJsFieldBang(o, field, val) {
    return o[field] = val;
}

/*** META ((export js-field-delete! js-property-delete!)
           (arity #t)
           (peephole (hole 2 "delete " o "[" field "]")))
*/
function sc_deleteJsFieldBang(o, field) {
    delete o[field];
}

/*** META ((export #t)
           (arity -3)
           (peephole (jsCall)))
*/
function sc_jsCall(o, fun) {
    var args = new Array();
    for (var i = 2; i < arguments.length; i++)
	args[i-2] = arguments[i];
    return fun.apply(o, args);
}

/*** META ((export #t)
           (arity -3)
           (peephole (jsMethodCall)))
*/
function sc_jsMethodCall(o, field) {
    var args = new Array();
    for (var i = 2; i < arguments.length; i++)
	args[i-2] = arguments[i];
    return o[field].apply(o, args);
}

/*** META ((export new js-new)
           (arity -2)
           (peephole (jsNew)))
*/
function sc_jsNew(c) {
    var evalStr = "new c(";
    evalStr +=arguments.length > 1? "arguments[1]": "";
    for (var i = 2; i < arguments.length; i++)
	evalStr += ", arguments[" + i + "]";
    evalStr +=")";
    return eval(evalStr);
}

// ======================== RegExp ====================
/*** META ((export #t) (arity #t)) */
function sc_pregexp(re) {
    return new RegExp(sc_string2jsstring(re));
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpMatch(re, s) {
    var reg = (re instanceof RegExp) ? re : sc_pregexp(re);
    var tmp = reg.exec(sc_string2jsstring(s));

    if (tmp == null) return false;

    var res = null;
    for (var i = tmp.length-1; i >= 0; i--) {
	if (tmp[i] !== null) {
	    res = sc_cons(sc_jsstring2string(tmp[i]), res);
	} else {
	    res = sc_cons(false, res);
	}
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpReplace(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
       if (re.global)
	   reg = re;
       else
	   reg = new RegExp(re.source);
   } else {
       reg = new RegExp(sc_string2jsstring(re));
   }

   return jss1.replace(reg, jss2);
}

/*** META ((export pregexp-replace*) (arity #t)) */
function sc_pregexpReplaceAll(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
      if (re.global)
	  reg = re;
      else
	  reg = new RegExp(re.source, "g");
   } else {
       reg = new RegExp(sc_string2jsstring(re), "g");
   }

   return jss1.replace(reg, jss2);
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpSplit(re, s) {
   var reg = ((re instanceof RegExp) ?
	      re :
	      new RegExp(sc_string2jsstring(re)));
   var jss = sc_string2jsstring(s);
   var tmp = jss.split(reg);

   if (tmp == null) return false;

   return sc_vector2list(tmp);
}

function sc_pregexpCreateCharsetMatcher(set) {
    if (set.length === 0 || set.length === 1) return new RegExp("[" + set + "]");
    var res = "[";
    for (var i = 0; i < set.length; i++) {
	var c = set.charAt(i);
	if (c === "]")
	    res += "\\]";
	else if (c === "^")
	    res += "\\^";
	else if (c === "\\")
	    res += "\\\\";
	else if (c === "-")
	    res += "\\-";
	else res += c;
    }
    return new RegExp(res + "]");
}

/* =========================================================================== */
/* Other library stuff */
/* =========================================================================== */

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "Math.floor(Math.random()*" 'n ")")))
*/
function sc_random(n) {
    return Math.floor(Math.random()*n);
}

/*** META ((export current-date) (arity #t)
           (peephole (hole 0 "new Date()")))
*/
function sc_currentDate() {
   return new Date();
}

/*** META ((export current-seconds) (arity #t))
*/
function sc_currentSeconds() {
   return (new Date()).getTime() / 1000;
}

/*** META ((export current-microseconds) (arity #t))
*/
function sc_currentMicroseconds() {
   return (new Date()).getTime();
}

/*** META ((export #t) (arity #t))
*/
function sc_time(proc) {
   var start = sc_currentMicroseconds();
   var res = proc();
   var stop = sc_currentMicroseconds();

   return sc_values( res, stop - start, 0, 0 );
}

function sc_Hashtable() {
}
sc_Hashtable.prototype.toString = function() {
    return "#{%hashtable}";
};
// sc_toWriteString == sc_toDisplayString == toString

function sc_HashtableElement(key, val) {
    this.key = key;
    this.val = val;
}

// the arity of make-hashtable inside Bigloo is -1. However we don't use it
// here. So for now simply don't give the arity...
/*** META ((export #t)
           (peephole (hole 0 "new sc_Hashtable()")))
*/
function sc_makeHashtable() {
    return new sc_Hashtable();
}

/*** META ((export #t) (arity #t)
           (type bool)) */
function sc_isHashtable(o) {
    return o instanceof sc_Hashtable;
}

/*** META ((export #t) (arity #t)) */
function sc_hashtablePutBang(ht, key, val) {
    var hash = sc_hash(key);
    ht[hash] = new sc_HashtableElement(key, val);
}

/*** META ((export #t) (arity #t)) */
function sc_hashtableGet(ht, key) {
    var hash = sc_hash(key);
    if (hash in ht)
	return ht[hash].val;
    else
	return false;
}

/*** META ((export #t) (arity #t)) */
function sc_hashtableForEach(ht, f) {
    for (var v in ht) {
	if (ht[v] instanceof sc_HashtableElement)
	    f(ht[v].key, ht[v].val);
    }
}

/*** META ((export hashtable-contains?)
           (arity #t)
           (peephole (hole 2 "sc_hash(" 1 ") in " 0)))
*/
function sc_hashtableContains(ht, key) {
    var hash = sc_hash(key);
    if (hash in ht)
	return true;
    else
	return false;
}

var SC_HASH_COUNTER = 0;

function sc_hash(o) {
    if (o === null)
	return "null";
    else if (o === undefined)
	return "undefined";
    else if (o === true)
	return "true";
    else if (o === false)
	return "false";
    else if (typeof o === "number")
	return "num-" + o;
    else if (typeof o === "string")
	return "jsstr-" + o;
    else if (o.sc_getHash)
	return o.sc_getHash();
    else
	return sc_counterHash.call(o);
}
function sc_counterHash() {
    if (!this.sc_hash) {
	this.sc_hash = "hash-" + SC_HASH_COUNTER;
	SC_HASH_COUNTER++;
    }
    return this.sc_hash;
}

function sc_Trampoline() {
}

sc_Trampoline.prototype.restart = function() {
    while (true) {
	this.calls = this.MAX_TAIL_CALLs-1;
	var res = this.f.apply(this, this.args);
	if (res !== this)
	    return res;
    }
}

/*** META ((export bind-exit-lambda) (arity #t)) */
function sc_bindExitLambda(proc) {
    var escape_obj = new sc_BindExitException();
    var escape = function(res) {
	escape_obj.res = res;
	throw escape_obj;
    };
    try {
	return proc(escape);
    } catch(e) {
	if (e === escape_obj) {
	    return e.res;
	}
	throw e;
    }
}
function sc_BindExitException() {
    this._internalException = true;
}

var SC_SCM2JS_GLOBALS = new Object();

var SC_TAIL_OBJECT = new sc_Trampoline();  // (used in runtime_callcc.)
SC_SCM2JS_GLOBALS.TAIL_OBJECT = SC_TAIL_OBJECT;
/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

// ======================== I/O =======================

/*------------------------------------------------------------------*/

function sc_EOF() {
}
var SC_EOF_OBJECT = new sc_EOF();

function sc_Port() {
}

/* --------------- Input ports -------------------------------------*/

function sc_InputPort() {
}
sc_InputPort.prototype = new sc_Port();

sc_InputPort.prototype.peekChar = function() {
    if (!("peeked" in this))
	this.peeked = this.getNextChar();
    return this.peeked;
}
sc_InputPort.prototype.readChar = function() {
    var tmp = this.peekChar();
    delete this.peeked;
    return tmp;
}
sc_InputPort.prototype.isCharReady = function() {
    return true;
}
sc_InputPort.prototype.close = function() {
    // do nothing
}

/* .............. String port ..........................*/
function sc_ErrorInputPort() {
};
sc_ErrorInputPort.prototype = new sc_InputPort();
sc_ErrorInputPort.prototype.getNextChar = function() {
    throw "can't read from error-port.";
};
sc_ErrorInputPort.prototype.isCharReady = function() {
    return false;
};


/* .............. String port ..........................*/

function sc_StringInputPort(jsStr) {
    // we are going to do some charAts on the str.
    // instead of recreating all the time a String-object, we
    // create one in the beginning. (not sure, if this is really an optim)
    this.str = new String(jsStr);
    this.pos = 0;
}
sc_StringInputPort.prototype = new sc_InputPort();
sc_StringInputPort.prototype.getNextChar = function() {
    if (this.pos >= this.str.length)
	return SC_EOF_OBJECT;
    return this.str.charAt(this.pos++);
};

/* ------------- Read and other lib-funs  -------------------------------*/
function sc_Token(type, val, pos) {
    this.type = type;
    this.val = val;
    this.pos = pos;
}
sc_Token.EOF = 0/*EOF*/;
sc_Token.OPEN_PAR = 1/*OPEN_PAR*/;
sc_Token.CLOSE_PAR = 2/*CLOSE_PAR*/;
sc_Token.OPEN_BRACE = 3/*OPEN_BRACE*/;
sc_Token.CLOSE_BRACE = 4/*CLOSE_BRACE*/;
sc_Token.OPEN_BRACKET = 5/*OPEN_BRACKET*/;
sc_Token.CLOSE_BRACKET = 6/*CLOSE_BRACKET*/;
sc_Token.WHITESPACE = 7/*WHITESPACE*/;
sc_Token.QUOTE = 8/*QUOTE*/;
sc_Token.ID = 9/*ID*/;
sc_Token.DOT = 10/*DOT*/;
sc_Token.STRING = 11/*STRING*/;
sc_Token.NUMBER = 12/*NUMBER*/;
sc_Token.ERROR = 13/*ERROR*/;
sc_Token.VECTOR_BEGIN = 14/*VECTOR_BEGIN*/;
sc_Token.TRUE = 15/*TRUE*/;
sc_Token.FALSE = 16/*FALSE*/;
sc_Token.UNSPECIFIED = 17/*UNSPECIFIED*/;
sc_Token.REFERENCE = 18/*REFERENCE*/;
sc_Token.STORE = 19/*STORE*/;
sc_Token.CHAR = 20/*CHAR*/;

var SC_ID_CLASS = SC_LOWER_CLASS + SC_UPPER_CLASS + "!$%*+-./:<=>?@^_~";
function sc_Tokenizer(port) {
    this.port = port;
}
sc_Tokenizer.prototype.peekToken = function() {
    if (this.peeked)
	return this.peeked;
    var newToken = this.nextToken();
    this.peeked = newToken;
    return newToken;
};
sc_Tokenizer.prototype.readToken = function() {
    var tmp = this.peekToken();
    delete this.peeked;
    return tmp;
};
sc_Tokenizer.prototype.nextToken = function() {
    var port = this.port;

    function isNumberChar(c) {
	return (c >= "0" && c <= "9");
    };
    function isIdOrNumberChar(c) {
	return SC_ID_CLASS.indexOf(c) != -1 || // ID-char
	    (c >= "0" && c <= "9");
    }
    function isWhitespace(c) {
	return c === " " || c === "\r" || c === "\n" || c === "\t" || c === "\f";
    };
    function isWhitespaceOrEOF(c) {
	return isWhitespace(c) || c === SC_EOF_OBJECT;
    };

    function readString() {
	res = "";
	while (true) {
	    var c = port.readChar();
	    switch (c) {
	    case '"':
		return new sc_Token(11/*STRING*/, res);
	    case "\\":
		var tmp = port.readChar();
		switch (tmp) {
		case '0': res += "\0"; break;
		case 'a': res += "\a"; break;
		case 'b': res += "\b"; break;
		case 'f': res += "\f"; break;
		case 'n': res += "\n"; break;
		case 'r': res += "\r"; break;
		case 't': res += "\t"; break;
		case 'v': res += "\v"; break;
		case '"': res += '"'; break;
		case '\\': res += '\\'; break;
		case 'x':
		    /* hexa-number */
		    var nb = 0;
		    while (true) {
			var hexC = port.peekChar();
			if (hexC >= '0' && hexC <= '9') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - '0'.charCodeAt(0);
			} else if (hexC >= 'a' && hexC <= 'f') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - 'a'.charCodeAt(0);
			} else if (hexC >= 'A' && hexC <= 'F') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - 'A'.charCodeAt(0);
			} else {
			    // next char isn't part of hex.
			    res += String.fromCharCode(nb);
			    break;
			}
		    }
		    break;
		default:
		    if (tmp === SC_EOF_OBJECT) {
			return new sc_Token(13/*ERROR*/, "unclosed string-literal" + res);
		    }
		    res += tmp;
		}
		break;
	    default:
		if (c === SC_EOF_OBJECT) {
		    return new sc_Token(13/*ERROR*/, "unclosed string-literal" + res);
		}
		res += c;
	    }
	}
    };
    function readIdNumberOrKeyword(firstChar) {
	var res = firstChar;
	while (isIdOrNumberChar(port.peekChar()))
	    res += port.readChar();
	if (isNaN(res)) {
	    if (res.length > 1) {
		colonCode = ':'.charCodeAt(0);
		if (res.charCodeAt(0) == colonCode) {
		    if (res.charCodeAt(1) != colonCode) {
			return new sc_Token(21/*KEYWORD*/, res.substring(1, res.length));
		    }
		} else if (res.charCodeAt(res.length - 1) == colonCode &&
			   res.charCodeAt(res.length - 2) != colonCode) {
		    return new sc_Token(21/*KEYWORD*/, res.substring(0, res.length - 1));
		}
	    }
	    return new sc_Token(9/*ID*/, res);
	} else {
	    return new sc_Token(12/*NUMBER*/, res - 0);
	}
    };

    function skipWhitespaceAndComments() {
	var done = false;
	while (!done) {
	    done = true;
	    while (isWhitespace(port.peekChar()))
		port.readChar();
	    if (port.peekChar() === ';') {
		port.readChar();
		done = false;
		while (true) {
		    curChar = port.readChar();
		    if (curChar === SC_EOF_OBJECT ||
			curChar === '\n')
			break;
		}
	    }
	}
    };

    function readDot() {
	if (isWhitespace(port.peekChar()))
	    return new sc_Token(10/*DOT*/);
	else
	    return readIdNumberOrKeyword(".");
    };

    function readSharp() {
	var c = port.readChar();
	if (isWhitespace(c))
	    return new sc_Token(13/*ERROR*/, "bad #-pattern0.");

	// reference
	if (isNumberChar(c)) {
	    var nb = c - 0;
	    while (isNumberChar(port.peekChar()))
		nb = nb*10 + (port.readChar() - 0);
	    switch (port.readChar()) {
	    case '#':
		return new sc_Token(18/*REFERENCE*/, nb);
	    case '=':
		return new sc_Token(19/*STORE*/, nb);
	    default:
		return new sc_Token(13/*ERROR*/, "bad #-pattern1." + nb);
	    }
	}

	if (c === "(")
	    return new sc_Token(14/*VECTOR_BEGIN*/);

	if (c === "\\") { // character
	    var tmp = ""
	    while (!isWhitespaceOrEOF(port.peekChar()))
		tmp += port.readChar();
	    switch (tmp.length) {
	    case 0: // it's escaping a whitespace char:
		if (sc_isEOFObject(port.peekChar))
		    return new sc_Token(13/*ERROR*/, "bad #-pattern2.");
		else
		    return new sc_Token(20/*CHAR*/, port.readChar());
	    case 1:
		return new sc_Token(20/*CHAR*/, tmp);
	    default:
		var entry = sc_Char.readable2char[tmp.toLowerCase()];
		if (entry)
		    return new sc_Token(20/*CHAR*/, entry);
		else
		    return new sc_Token(13/*ERROR*/, "unknown character description: #\\" + tmp);
	    }
	}

	// some constants (#t, #f, #unspecified)
	var res;
	var needing;
	switch (c) {
	case 't': res = new sc_Token(15/*TRUE*/, true); needing = ""; break;
	case 'f': res = new sc_Token(16/*FALSE*/, false); needing = ""; break;
	case 'u': res = new sc_Token(17/*UNSPECIFIED*/, undefined); needing = "nspecified"; break;
	default:
	    return new sc_Token(13/*ERROR*/, "bad #-pattern3: " + c);
	}
	while(true) {
	    c = port.peekChar();
	    if ((isWhitespaceOrEOF(c) || c === ')') &&
		needing == "")
		return res;
	    else if (isWhitespace(c) || needing == "")
		return new sc_Token(13/*ERROR*/, "bad #-pattern4 " + c + " " + needing);
	    else if (needing.charAt(0) == c) {
		port.readChar(); // consume
		needing = needing.slice(1);
	    } else
		return new sc_Token(13/*ERROR*/, "bad #-pattern5");
	}

    };

    skipWhitespaceAndComments();
    var curChar = port.readChar();
    if (curChar === SC_EOF_OBJECT)
	return new sc_Token(0/*EOF*/, curChar);
    switch (curChar)
    {
    case " ":
    case "\n":
    case "\t":
	return readWhitespace();
    case "(":
	return new sc_Token(1/*OPEN_PAR*/);
    case ")":
	return new sc_Token(2/*CLOSE_PAR*/);
    case "{":
	return new sc_Token(3/*OPEN_BRACE*/);
    case "}":
	return new sc_Token(4/*CLOSE_BRACE*/);
    case "[":
	return new sc_Token(5/*OPEN_BRACKET*/);
    case "]":
	return new sc_Token(6/*CLOSE_BRACKET*/);
    case "'":
	return new sc_Token(8/*QUOTE*/);
    case "#":
	return readSharp();
    case ".":
	return readDot();
    case '"':
	return readString();
    default:
	if (isIdOrNumberChar(curChar))
	    return readIdNumberOrKeyword(curChar);
	throw "unexpected character: " + curChar;
    }
};

function sc_Reader(tokenizer) {
    this.tokenizer = tokenizer;
    this.backref = new Array();
}
sc_Reader.prototype.read = function() {
    function readList(listBeginType) {
	function matchesPeer(open, close) {
	    return open === 1/*OPEN_PAR*/ && close === 2/*CLOSE_PAR*/
	    	|| open === 3/*OPEN_BRACE*/ && close === 4/*CLOSE_BRACE*/
		|| open === 5/*OPEN_BRACKET*/ && close === 6/*CLOSE_BRACKET*/;
	};
	var res = null;

	while (true) {
	    var token = tokenizer.peekToken();

	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
	    case 4/*CLOSE_BRACE*/:
	    case 6/*CLOSE_BRACKET*/:
		if (matchesPeer(listBeginType, token.type)) {
		    tokenizer.readToken(); // consume token
		    return sc_reverseBang(res);
		} else
		    throw "closing par doesn't match: " + listBeginType
			+ " " + listEndType;

	    case 0/*EOF*/:
		throw "unexpected end of file";

	    case 10/*DOT*/:
		tokenizer.readToken(); // consume token
		var cdr = this.read();
		var par = tokenizer.readToken();
		if (!matchesPeer(listBeginType, par.type))
		    throw "closing par doesn't match: " + listBeginType
			+ " " + par.type;
		else
		    return sc_reverseAppendBang(res, cdr);


	    default:
		res = sc_cons(this.read(), res);
	    }
	}
    };
    // original scheme2js readQuote seems to be missing symbol prefix
    function readQuote() {
	return sc_cons(sc_SYMBOL_PREFIX + "quote", sc_cons(this.read(), null));
    };
    // function readQuote() {
    //     return sc_cons("quote", sc_cons(this.read(), null));
    // };
    function readVector() {
	// opening-parenthesis is already consumed
	var a = new Array();
	while (true) {
	    var token = tokenizer.peekToken();
	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
		tokenizer.readToken();
		return a;

	    default:
		a.push(this.read());
	    }
	}
    };

    function storeRefence(nb) {
	var tmp = this.read();
	this.backref[nb] = tmp;
	return tmp;
    };

    function readReference(nb) {
	if (nb in this.backref)
	    return this.backref[nb];
	else
	    throw "bad reference: " + nb;
    };

    var tokenizer = this.tokenizer;

    var token = tokenizer.readToken();

    // handle error
    if (token.type === 13/*ERROR*/)
	throw token.val;

    switch (token.type) {
    case 1/*OPEN_PAR*/:
    case 3/*OPEN_BRACE*/:
    case 5/*OPEN_BRACKET*/:
	return readList.call(this, token.type);
    case 8/*QUOTE*/:
	return readQuote.call(this);
    case 11/*STRING*/:
	return sc_jsstring2string(token.val);
    case 20/*CHAR*/:
	return new sc_Char(token.val);
    case 14/*VECTOR_BEGIN*/:
	return readVector.call(this);
    case 18/*REFERENCE*/:
	return readReference.call(this, token.val);
    case 19/*STORE*/:
	return storeRefence.call(this, token.val);
    case 9/*ID*/:
	return sc_jsstring2symbol(token.val);
    case 21/*KEYWORD*/:
	return sc_jsstring2keyword(token.val);
    case 0/*EOF*/:
    case 12/*NUMBER*/:
    case 15/*TRUE*/:
    case 16/*FALSE*/:
    case 17/*UNSPECIFIED*/:
	return token.val;
    default:
	throw "unexpected token " + token.type + " " + token.val;
    }
};

/*** META ((export #t) (arity -1)) */
function sc_read(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var reader = new sc_Reader(new sc_Tokenizer(port));
    return reader.read();
}
/*** META ((export #t) (arity -1)) */
function sc_readChar(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var t = port.readChar();
    return t === SC_EOF_OBJECT? t: new sc_Char(t);
}
/*** META ((export #t) (arity -1)) */
function sc_peekChar(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var t = port.peekChar();
    return t === SC_EOF_OBJECT? t: new sc_Char(t);
}
/*** META ((export #t)
           (arity -1)
           (type bool))
*/
function sc_isCharReady(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    return port.isCharReady();
}
/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".close()")))
*/
function sc_closeInputPort(p) {
    return p.close();
}

/*** META ((export #t)
           (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_InputPort")))
*/
function sc_isInputPort(o) {
    return (o instanceof sc_InputPort);
}

/*** META ((export eof-object?)
           (arity #t)
           (type bool)
           (peephole (postfix " === SC_EOF_OBJECT")))
*/
function sc_isEOFObject(o) {
    return o === SC_EOF_OBJECT;
}

/*** META ((export #t)
           (arity #t)
           (peephole (hole 0 "SC_DEFAULT_IN")))
*/
function sc_currentInputPort() {
    return SC_DEFAULT_IN;
}

/* ------------ file operations are not supported -----------*/
/*** META ((export #t) (arity #t)) */
function sc_callWithInputFile(s, proc) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_callWithOutputFile(s, proc) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_withInputFromFile(s, thunk) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToFile(s, thunk) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_openInputFile(s) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_openOutputFile(s) {
    throw "can't open " + s;
}

/* ----------------------------------------------------------------------------*/
/*** META ((export #t) (arity #t)) */
function sc_basename(p) {
   var i = p.lastIndexOf('/');

   if(i >= 0)
      return p.substring(i + 1, p.length);
   else
      return p;
}

/*** META ((export #t) (arity #t)) */
function sc_dirname(p) {
   var i = p.lastIndexOf('/');

   if(i >= 0)
      return p.substring(0, i);
   else
      return '';
}

/* ----------------------------------------------------------------------------*/

/*** META ((export #t) (arity #t)) */
function sc_withInputFromPort(p, thunk) {
    try {
	var tmp = SC_DEFAULT_IN; // THREAD: shared var.
	SC_DEFAULT_IN = p;
	return thunk();
    } finally {
	SC_DEFAULT_IN = tmp;
    }
}

/*** META ((export #t) (arity #t)) */
function sc_withInputFromString(s, thunk) {
    return sc_withInputFromPort(new sc_StringInputPort(sc_string2jsstring(s)), thunk);
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToPort(p, thunk) {
    try {
	var tmp = SC_DEFAULT_OUT; // THREAD: shared var.
	SC_DEFAULT_OUT = p;
	return thunk();
    } finally {
	SC_DEFAULT_OUT = tmp;
    }
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToString(thunk) {
    var p = new sc_StringOutputPort();
    sc_withOutputToPort(p, thunk);
    return p.close();
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToProcedure(proc, thunk) {
    var t = function(s) { proc(sc_jsstring2string(s)); };
    return sc_withOutputToPort(new sc_GenericOutputPort(t), thunk);
}

/*** META ((export #t)
           (arity #t)
           (peephole (hole 0 "new sc_StringOutputPort()")))
*/
function sc_openOutputString() {
    return new sc_StringOutputPort();
}

/*** META ((export #t) (arity #t)) */
function sc_openInputString(str) {
    return new sc_StringInputPort(sc_string2jsstring(str));
}

/* ----------------------------------------------------------------------------*/

function sc_OutputPort() {
}
sc_OutputPort.prototype = new sc_Port();
sc_OutputPort.prototype.appendJSString = function(obj) {
    /* do nothing */
}
sc_OutputPort.prototype.close = function() {
    /* do nothing */
}

function sc_StringOutputPort() {
    this.res = "";
}
sc_StringOutputPort.prototype = new sc_OutputPort();
sc_StringOutputPort.prototype.appendJSString = function(s) {
    this.res += s;
}
sc_StringOutputPort.prototype.close = function() {
    return sc_jsstring2string(this.res);
}

/*** META ((export #t) (arity #t)) */
function sc_getOutputString(sp) {
    return sc_jsstring2string(sp.res);
}


function sc_ErrorOutputPort() {
}
sc_ErrorOutputPort.prototype = new sc_OutputPort();
sc_ErrorOutputPort.prototype.appendJSString = function(s) {
    throw "don't write on ErrorPort!";
}
sc_ErrorOutputPort.prototype.close = function() {
    /* do nothing */
}

function sc_GenericOutputPort(appendJSString, close) {
    this.appendJSString = appendJSString;
    if (close)
	this.close = close;
}
sc_GenericOutputPort.prototype = new sc_OutputPort();

/*** META ((export #t)
           (arity #t)
	   (type bool)
           (peephole (postfix " instanceof sc_OutputPort")))
*/
function sc_isOutputPort(o) {
    return (o instanceof sc_OutputPort);
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".close()")))
*/
function sc_closeOutputPort(p) {
    return p.close();
}

/* ------------------ write ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_write(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toWriteString(o));
}

function sc_toWriteStringProcedure(o) {
   if ("sc_name" in o) {
      return "#<procedure " + sc_name + " " + (o.sc_location != "#f" ? o.sc_location : "") + ":" + sc_hash(o) + ">";
   } else {
      var n = o.toString().match( /function[ \t\n]+([_a-zA-Z0-9$]+)/ );

      return "#<procedure " + (n ? n[ 1 ] : "anonymous") + ":" + sc_hash(o) + ">";
   }
}

function sc_toWriteString(o) {
   if (o === null)
      return "()";
   if (o === true)
      return "#t";
   if (o === false)
      return "#f";
   if (o === undefined)
      return "#unspecified";
    // window is only declared inside browsers. Otherwise this.window should be undefined
   if (o === this.window)

      return "window";
   if (typeof o === 'function') {
      sc_toWriteStringProcedure(o);
   }
   if (o.sc_toWriteString)
      return o.sc_toWriteString();
   return o.toString();
}

function sc_escapeWriteString(s) {
    var res = "";
    var j = 0;
    for (i = 0; i < s.length; i++) {
	switch (s.charAt(i)) {
	case "\0": res += s.substring(j, i) + "\\0"; j = i + 1; break;
	case "\b": res += s.substring(j, i) + "\\b"; j = i + 1; break;
	case "\f": res += s.substring(j, i) + "\\f"; j = i + 1; break;
	case "\n": res += s.substring(j, i) + "\\n"; j = i + 1; break;
	case "\r": res += s.substring(j, i) + "\\r"; j = i + 1; break;
	case "\t": res += s.substring(j, i) + "\\t"; j = i + 1; break;
	case '"': res += s.substring(j, i) + '\\"'; j = i + 1; break;
	case "\\": res += s.substring(j, i) + "\\\\"; j = i + 1; break;
	default:
	    var c = s.charAt(i);
	    if ("\a" !== "a" && c == "\a") {
		res += s.substring(j, i) + "\\a"; j = i + 1; continue;
	    }
	    if ("\v" !== "v" && c == "\v") {
		res += s.substring(j, i) + "\\v"; j = i + 1; continue;
	    }
	    //if (s.charAt(i) < ' ' || s.charCodeAt(i) > 127) {
	    // CARE: Manuel is this OK with HOP?
	    if (s.charAt(i) < ' ') {
		/* non printable character and special chars */
		res += s.substring(j, i) + "\\x" + s.charCodeAt(i).toString(16);
		j = i + 1;
	    }
	    // else just let i increase...
	}
    }
    res += s.substring(j, i);
    return res;
}

/* ------------------ display ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_display(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toDisplayString(o));
}

function sc_toDisplayString(o) {
    if (o === null)
	return "()";
    else if (o === true)
	return "#t";
    else if (o === false)
	return "#f";
    else if (o === undefined)
	return "#unspecified";
    // window is only declared inside browsers. Otherwise this.window should be undefined
    else if (o === this.window)
        return "window";
    else if (typeof o === 'function')
       return sc_toWriteStringProcedure(o);
    else if (o.sc_toDisplayString)
	return o.sc_toDisplayString();
    else
	return o.toString();
}

/* ------------------ newline ---------------------------------------------------*/

/*** META ((export #t) (arity -1)) */
function sc_newline(p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString("\n");
}

/* ------------------ write-char ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_writeChar(c, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(c.val);
}

/* ------------------ write/display-circle -----------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_writeCircle(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toCircleString(o, sc_toWriteString));
}

/*** META ((export #t) (arity -2)) */
function sc_displayCircle(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toCircleString(o, sc_toDisplayString));
}

function sc_toCircleString(o, writeOrDisplay) {
    var symb = sc_gensym("writeCircle");
    var nbPointer = new Object();
    nbPointer.nb = 0;
    sc_prepCircle(o, symb, nbPointer);
    return sc_genToCircleString(o, symb, writeOrDisplay);
}

function sc_prepCircle(o, symb, nbPointer) {
    // TODO sc_Struct
    if (o instanceof sc_Pair ||
	o instanceof sc_Vector) {
	if (o[symb] !== undefined) {
	    // not the first visit.
	    o[symb]++;
	    // unless there is already a number, assign one.
	    if (!o[symb + "nb"]) o[symb + "nb"] = nbPointer.nb++;
	    return;
	}
	o[symb] = 0;
	if (o instanceof sc_Pair) {
	    sc_prepCircle(o.car, symb, nbPointer);
	    sc_prepCircle(o.cdr, symb, nbPointer);
	} else {
	    for (var i = 0; i < o.length; i++)
		sc_prepCircle(o[i], symb, nbPointer);
	}
    }
}

function sc_genToCircleString(o, symb, writeOrDisplay) {
    if (!(o instanceof sc_Pair ||
	  o instanceof sc_Vector))
	return writeOrDisplay(o);
    return o.sc_toCircleString(symb, writeOrDisplay);
}
sc_Pair.prototype.sc_toCircleString = function(symb, writeOrDisplay, inList) {
    if (this[symb + "use"]) { // use-flag is set. Just use it.
	var nb = this[symb + "nb"];
	if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	    delete this[symb];
	    delete this[symb + "nb"];
	    delete this[symb + "use"];
	}
	if (inList)
	    return '. #' + nb + '#';
	else
	    return '#' + nb + '#';
    }
    if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	delete this[symb];
	delete this[symb + "nb"];
	delete this[symb + "use"];
    }

    var res = "";

    if (this[symb] !== undefined) { // implies > 0
	this[symb + "use"] = true;
	if (inList)
	    res += '. #' + this[symb + "nb"] + '=';
	else
	    res += '#' + this[symb + "nb"] + '=';
	inList = false;
    }

    if (!inList)
	res += "(";

    // print car
    res += sc_genToCircleString(this.car, symb, writeOrDisplay);

    if (sc_isPair(this.cdr)) {
	res += " " + this.cdr.sc_toCircleString(symb, writeOrDisplay, true);
    } else if (this.cdr !== null) {
	res += " . " + sc_genToCircleString(this.cdr, symb, writeOrDisplay);
    }
    if (!inList)
	res += ")";
    return res;
};
sc_Vector.prototype.sc_toCircleString = function(symb, writeOrDisplay) {
    if (this[symb + "use"]) { // use-flag is set. Just use it.
	var nb = this[symb + "nb"];
	if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	    delete this[symb];
	    delete this[symb + "nb"];
	    delete this[symb + "use"];
	}
	return '#' + nb + '#';
    }
    if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	delete this[symb];
	delete this[symb + "nb"];
	delete this[symb + "use"];
    }

    var res = "";
    if (this[symb] !== undefined) { // implies > 0
	this[symb + "use"] = true;
	res += '#' + this[symb + "nb"] + '=';
    }
    res += "#(";
    for (var i = 0; i < this.length; i++) {
	res += sc_genToCircleString(this[i], symb, writeOrDisplay);
	if (i < this.length - 1) res += " ";
    }
    res += ")";
    return res;
};


/* ------------------ print ---------------------------------------------------*/

/*** META ((export #t) (arity -1)) */
function sc_print(s) {
    if (arguments.length === 1) {
	sc_display(s);
	sc_newline();
    }
    else {
	for (var i = 0; i < arguments.length; i++)
	    sc_display(arguments[i]);
	sc_newline();
    }
}

/* ------------------ format ---------------------------------------------------*/
/*** META ((export #t) (arity -2)) */
function sc_format(s) {
   var len = s.length;
   var p = new sc_StringOutputPort();
   var i = 0, j = 1;

   while( i < len ) {
      var i2 = s.indexOf("~", i);

      if (i2 == -1) {
	  p.appendJSString( s.substring( i, len ) );
	  return p.close();
      } else if (i2 == (len - 1)) {
	  p.appendJSString(s.substring(i, len));
	  return p.close();
      } else if (i2 == (len - 2) && s.charAt(i2 + 1) == ":") {
	  p.appendJSString(s.substring(i, len));
	  return p.close();
      } else {
	  if (i2 > i) p.appendJSString(s.substring(i, i2));

	  var alternativeForm = (s.charAt(i2 + 1) == ":");
	  if (alternativeForm) i2++;

	  // already advance before evalualating escape sequences.
	  // this way it is easier to see.
	  // no escape sequence requires 'i'.
	  i = i2 + 2;

	  switch(s.charCodeAt(i2 + 1)) {
	  case 65:
	  case 97:
	      // a
	      if (alternativeForm)
		  sc_displayCircle(arguments[j], p);
	      else
		  sc_display(arguments[j], p);
	      j++;
	      break;

	  case 83:
	  case 115:
	      // s
	      if (alternativeForm)
		  sc_writeCircle(arguments[j], p);
	      else
		  sc_write(arguments[j], p);
	      j++;
	      break;

	  case 86:
	  case 118:
	      // v
	      if (alternativeForm)
		  sc_displayCircle(arguments[j], p);
	      else
		  sc_display(arguments[j], p);
	      p.appendJSString("\n");
	      j++;
	      break;

	  case 67:
	  case 99:
	      // c
	      p.appendJSString(String.fromCharCode(arguments[j]));
	      j++;
	      break;

	  case 88:
	  case 120:
	      // x
	      p.appendJSString(arguments[j].toString(16));
	      j++;
	      break;

	  case 79:
	  case 111:
	      // o
	      p.appendJSString(arguments[j].toString(8));
	      j++;
	      break;

	  case 66:
	  case 98:
	      // b
	      p.appendJSString(arguments[j].toString(2));
	      j++;
	      break;

	  case 37:
	  case 110:
	      // %, n
	      p.appendJSString("\n");
	      break;

	  case 114:
	      // r
	      p.appendJSString("\r");
	      break;

	  case 126:
	      // ~
	      p.appendJSString("~");
	      break;

	  default:
	      sc_error( "format: illegal ~"
			+ String.fromCharCode(s.charCodeAt(i2 + 1))
			+ " sequence" );
	      return "";
	  }
      }
   }

   return p.close();
}

/* ------------------ global ports ---------------------------------------------------*/

var SC_DEFAULT_IN = new sc_ErrorInputPort();
var SC_DEFAULT_OUT = new sc_ErrorOutputPort();
var SC_ERROR_OUT = new sc_ErrorOutputPort();

/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

var sc_SYMBOL_PREFIX = "\uEBAC";
var sc_KEYWORD_PREFIX = "\uEBAD";

/*** META ((export #t) (arity #t)
           (peephole (id))) */
function sc_jsstring2string(s) {
    return '"' + s + '"';
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "'\\uEBAC' +")))
*/
function sc_jsstring2symbol(s) {
    return sc_SYMBOL_PREFIX + s;
}

/*** META ((export #t) (arity #t)
           (peephole (id)))
*/
function sc_string2jsstring(s) {
    return s;
}

/*** META ((export #t) (arity #t)
           (peephole (symbol2jsstring_immutable)))
*/
function sc_symbol2jsstring(s) {
    return s.slice(1);
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".slice(1)")))
*/
function sc_keyword2jsstring(k) {
    return k.slice(1);
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "'\\uEBAD' +")))
*/
function sc_jsstring2keyword(s) {
    return sc_KEYWORD_PREFIX + s;
}

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isKeyword(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_KEYWORD_PREFIX);
}


/*** META ((export #t) (arity -1)) */
var sc_gensym = function() {
    var counter = 1000;
    return function(sym) {
	counter++;
	if (!sym) sym = sc_SYMBOL_PREFIX;
	return sym + "s" + counter + "~" + "^sC-GeNsYm ";
    };
}();


/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isEqual(o1, o2) {
    return ((o1 === o2) ||
	    (sc_isPair(o1) && sc_isPair(o2)
	     && sc_isPairEqual(o1, o2, sc_isEqual)) ||
	    (sc_isVector(o1) && sc_isVector(o2)
	     && sc_isVectorEqual(o1, o2, sc_isEqual)));
}

/*** META ((export number->symbol integer->symbol) (arity -2)) */
function sc_number2symbol(x, radix) {
    return sc_SYMBOL_PREFIX + sc_number2jsstring(x, radix);
}

/*** META ((export number->string integer->string) (arity -2)) */
var sc_number2string = sc_number2jsstring;

/*** META ((export #t) (arity -2)) */
function sc_symbol2number(s, radix) {
    return sc_jsstring2number(s.slice(1), radix);
}

/*** META ((export #t) (arity -2)) */
var sc_string2number = sc_jsstring2number;

/*** META ((export #t) (arity -2)
           (peephole (hole 2 "parseInt(" s "," radix ")")))
*/
function sc_string2integer(s, radix) {
   return parseInt(s, radix);
}

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "parseFloat(" s ")")))
*/
function sc_string2real(s) {
   return parseFloat(s);
}

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isSymbol(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_SYMBOL_PREFIX);
}

/*** META ((export #t)
           (arity #t)
           (peephole (symbol2string_immutable)))
*/
function sc_symbol2string(s) {
    return s.slice(1);
}

/*** META ((export #t)
           (arity #t)
           (peephole (prefix "'\\uEBAC' +")))
*/
function sc_string2symbol(s) {
    return sc_SYMBOL_PREFIX + s;
}

/*** META ((export symbol-append)
           (arity -1)
           (peephole (symbolAppend_immutable)))
*/
function sc_symbolAppend() {
    var res = sc_SYMBOL_PREFIX;
    for (var i = 0; i < arguments.length; i++)
	res += arguments[i].slice(1);
    return res;
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".val")))
*/
function sc_char2string(c) { return c.val; }

/*** META ((export #t)
           (arity #t)
           (peephole (hole 1 "'\\uEBAC' + " c ".val")))
*/
function sc_char2symbol(c) { return sc_SYMBOL_PREFIX + c.val; }

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isString(s) {
    return (typeof s === "string") &&
	(s.charAt(0) !== sc_SYMBOL_PREFIX);
}

/*** META ((export #t) (arity -2)) */
var sc_makeString = sc_makejsString;


/*** META ((export #t) (arity -1)) */
function sc_string() {
    for (var i = 0; i < arguments.length; i++)
	arguments[i] = arguments[i].val;
    return "".concat.apply("", arguments);
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".length")))
*/
function sc_stringLength(s) { return s.length; }

/*** META ((export #t) (arity #t)) */
function sc_stringRef(s, k) {
    return new sc_Char(s.charAt(k));
}

/* there's no stringSet in the immutable version
function sc_stringSet(s, k, c)
*/


/*** META ((export string=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " === " str2)))
*/
function sc_isStringEqual(s1, s2) {
    return s1 === s2;
}
/*** META ((export string<?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " < " str2)))
*/
function sc_isStringLess(s1, s2) {
    return s1 < s2;
}
/*** META ((export string>?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " > " str2)))
*/
function sc_isStringGreater(s1, s2) {
    return s1 > s2;
}
/*** META ((export string<=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " <= " str2)))
*/
function sc_isStringLessEqual(s1, s2) {
    return s1 <= s2;
}
/*** META ((export string>=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " >= " str2)))
*/
function sc_isStringGreaterEqual(s1, s2) {
    return s1 >= s2;
}
/*** META ((export string-ci=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() === " str2 ".toLowerCase()")))
*/
function sc_isStringCIEqual(s1, s2) {
    return s1.toLowerCase() === s2.toLowerCase();
}
/*** META ((export string-ci<?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() < " str2 ".toLowerCase()")))
*/
function sc_isStringCILess(s1, s2) {
    return s1.toLowerCase() < s2.toLowerCase();
}
/*** META ((export string-ci>?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() > " str2 ".toLowerCase()")))
*/
function sc_isStringCIGreater(s1, s2) {
    return s1.toLowerCase() > s2.toLowerCase();
}
/*** META ((export string-ci<=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() <= " str2 ".toLowerCase()")))
*/
function sc_isStringCILessEqual(s1, s2) {
    return s1.toLowerCase() <= s2.toLowerCase();
}
/*** META ((export string-ci>=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() >= " str2 ".toLowerCase()")))
*/
function sc_isStringCIGreaterEqual(s1, s2) {
    return s1.toLowerCase() >= s2.toLowerCase();
}

/*** META ((export string-contains)
           (arity -3)
	   (type bool))
*/
function sc_stringContains(s1,s2,start) {
   return s1.indexOf(s2,start ? start : 0) >= 0;
}

/*** META ((export string-contains-ci)
           (arity -3)
	   (type bool))
*/
function sc_stringCIContains(s1,s2,start) {
   return s1.toLowerCase().indexOf(s2.toLowerCase(),start ? start : 0) >= 0;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_substring(s, start, end) {
   return s.substring(start, (!end || end < 0) ? s.length : end);
}

/*** META ((export #t) (arity -4))
*/
function sc_isSubstring_at(str1, str2, i, len) {
    if (!len) len = str2.length;
    else if (str2.length < len) return false;
    if (str1.length < len + i) return false;
    return str2.substring(0, len) == str1.substring(i, i+len);
    return s2 == s1.substring(i, i+ s2.length);
}

/*** META ((export substring=?) (arity #t))
*/
function sc_isSubstring(s1, s2, len) {
    if (s1.length < len) return false;
    if (s2.length < len) return false;
    return s2.substring(0, len) == s1.substring(0, len);
}

/*** META ((export #t)
           (arity -1)
           (peephole (infix 0 #f "+" "''")))
*/
function sc_stringAppend() {
    return "".concat.apply("", arguments);
}

/*** META ((export #t) (arity 1)) */
var sc_string2list = sc_jsstring2list;

/*** META ((export #t) (arity 1)) */
var sc_list2string = sc_list2jsstring;

/*** META ((export #t)
           (arity #t)
           (peephole (id)))
*/
function sc_stringCopy(s) {
    return s;
}

/* there's no string-fill in the immutable version
function sc_stringFill(s, c)
*/

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".slice(1)")))
*/
function sc_keyword2string(o) {
    return o.slice(1);
}

/*** META ((export #t)
           (arity #t)
           (peephole (prefix "'\\uEBAD' +")))
*/
function sc_string2keyword(o) {
    return sc_KEYWORD_PREFIX + o;
}

String.prototype.sc_toDisplayString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX)
	// TODO: care for symbols with spaces (escape-chars symbols).
	return this.slice(1);
    else if (this.charAt(0) === sc_KEYWORD_PREFIX)
	return ":" + this.slice(1);
    else
	return this.toString();
};

String.prototype.sc_toWriteString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX)
	// TODO: care for symbols with spaces (escape-chars symbols).
	return this.slice(1);
    else if (this.charAt(0) === sc_KEYWORD_PREFIX)
	return ":" + this.slice(1);
    else
	return '"' + sc_escapeWriteString(this) + '"';
};

/*** META ((export #t)
           (arity #t)
           (peephole (hole 2 1 ".indexOf(" 0 ") === 0")))
*/
function sc_isStringPrefix(cs1, cs2) {
    return cs2.indexOf(cs1) === 0;
}

/*** META ((export #t) (arity #t)) */
function sc_isStringSuffix(cs1, cs2) {
    var tmp = cs2.lastIndexOf(cs1);
    return tmp !== false && tmp >= 0 && tmp === cs2.length - cs1.length;
}

/*** META ((export #t) (arity #t)) */
function sc_stringSplit(s, sep) {
    if (sep.length === 1)
	return sc_vector2list(s.split(sep));
    return sc_vector2list(s.split(sc_pregexpCreateCharsetMatcher(sep)));
}

/*** META ((export #t) (arity -3)) */
function sc_stringIndex(s, cset, start) {
   var res;
   if (!start) start = 0;

   if (cset instanceof sc_Char) {
      res = s.indexOf(sc_char2string(cset), start);
      return res >= 0 ? res : false;
   }
   if (cset.length == 1) {
      res = s.indexOf(cset, start);
      return res >= 0 ? res : false;
   } else {
      for (var i = start; i < s.length; i++ ) {
	 if (cset.indexOf(s.charAt(i)))
	    return i;
      }

      return false;
   }
}

/*** META ((export #t) (arity -3)) */
function sc_stringIndexRight(s, cset, start) {
   var res;
   if (!start) start = s.length - 1;

   if (cset instanceof sc_Char) {
      res = s.lastIndexof(sc_char2string(cset), start);
      return res >= 0 ? res : false;
   }
   if (cset.length == 1) {
      res = s.lastIndexOf(cset, start);
      return res >= 0 ? res : false;
   } else {
      for (var i = start; i >= 0; i-- ) {
	 if (cset.indexOf(s.charAt(i)))
	    return i;
      }

      return false;
   }
}

/*** META ((export #t) (arity 1)) */
function sc_string_downcase(s) {
   return s.toLowerCase();
}

/*** META ((export #t) (arity 1)) */
function sc_string_upcase(s) {
   return s.toUpperCase();
}

/*** META ((export #t) (arity 1)) */
function sc_string_capitalize(s) {
   return s.replace(/\w+/g, function (w) {
	 return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase();
      });
}

/*** META ((export #t) (arity 1)) */
function sc_prefix(s) {
   var i = s.lastIndexOf(".");
   return i ? s.substring(0, i) : s;
}

/*** META ((export #t) (arity 1)) */
function sc_suffix(s) {
   var i = s.lastIndexOf(".");
   return i ? s.substring(i+1,i.length) : s;
}
var a_dsssl__="dsssl formal parsing";var b_dsssl__="Unexpected #!keys parameters";var c_dsssl__="keyword argument misses value";var BGl_dssslzd2checkzd2keyzd2argsz12zc0zzdssslz00=function(a,b){if(b===null){var m=a;while(!(m===null)){var l=!(m instanceof sc_Pair);if(l!==false){var d=l;}else{var k=m.cdr===null;if(k!==false){d=k;}else{d=!sc_isKeyword(m.car);}}if(d!==false){return sc_error(a_dsssl__,b_dsssl__,m);}else{m=m.cdr.cdr;}}return a;}else{var n=null;var h=a;var i=false;var j=n;while(!(h===null)){var g=!(h instanceof sc_Pair);if(g!==false){var c=g;}else{var f=h.cdr===null;if(f!==false){c=f;}else{var e=!sc_isKeyword(h.car);if(e!==false){c=e;}else{c=sc_memq(h.car,b)===false;}}}if(c!==false){if(i===false){h=h.cdr;}else{i=false;j=new sc_Pair(h.car,j);h=h.cdr;}}else{h=h.cdr.cdr;i=true;}}return sc_reverseBang(j);}};var BGl_dssslzd2getzd2keyzd2argzd2zzdssslz00=function(a,b,c){var d=a;while(!(d===null)){if(!sc_isKeyword(d.car)){d=d.cdr;}else{if(d.car===b){if(!(d.cdr instanceof sc_Pair)){return sc_error("\uEBACdsssl-get-key-arg",c_dsssl__,d.car);}else{return d.cdr.car;}}else{if(!(d.cdr instanceof sc_Pair)){return sc_error("\uEBACdsssl-get-key-arg",c_dsssl__,d.car);}else{d=d.cdr.cdr;}}}}return c;};var BGl_dssslzd2getzd2keyzd2restzd2argz00zzdssslz00=function(a,b){var f=a;while(!(f===null)){var e=!sc_isKeyword(f.car);if(e!==false){var c=e;}else{var d=f.cdr===null;if(d!==false){c=d;}else{c=sc_memq(f.car,b)===false;}}if(c!==false){return f;}else{f=f.cdr.cdr;}}return null;};

// Set the random number generator
var random = new MRG32k3a();
var intRandom = random.uint32;

// Use these functions from the scheme2js runtime.js if available
var sc_list2vector = (typeof sc_list2vector == "function") ? sc_list2vector : function(x) { return x };
var sc_vector2list = (typeof sc_vector2list == "function") ? sc_vector2list : function(x) { return x };

function random_integer(n)
{ 
    return intRandom() % n; 
}

function random_real()
{ 
    return random(); 
}

function seed_rng(seed)
{
    random = new MRG32k3a(seed);
    intRandom = random.uint32;
}

// Draw sample from Poisson distribution
// Knuth TAOCP 2 (roughly optimal)
function sample_poisson(mu)
{
    var k = 0;

    while(mu > 10)
    {
        var m = 7/8*mu;
        var x = Math.sample_gamma(m);

        if(x > mu) return k + sample_binomial(mu/x, m-1);
        else{ mu -= x; k += m; }
    }

    var emu = Math.exp(-mu);
    var p = 1;
    do{ p *= random(); k++; } while(p > emu);

    return k-1;
}

// Poisson probability distribution function via iterative expansion
function poisson_pdf(k, mu)
{
    return Math.exp(k * Math.log(mu) - mu - lnfact(k));
}

// Draw sample from a Gamma distribution
// Marsagli and Tsang '00 (roughly optimal)
function sample_gamma(a,b)
{
    if(a < 1) return sample_gamma(1+a,b) * Math.pow(random(), 1/a);

    var x,v,u;
    var d = a-1/3;
    var c = 1/Math.sqrt(9*d);

    while(true)
    {
        do{x = sample_gaussian(0,1);  v = 1+c*x;} while(v <= 0);

        v=v*v*v;
        u=random();

        if((u < 1 - .331*x*x*x*x) || (Math.log(u) < .5*x*x + d*(1 - v + Math.log(v)))) return b*d*v;
    }
}

// Evaluate gamma pdf
function gamma_pdf(x,a,b)
{
    if(x<0) return 0;
    if(x==0) return a==1 ? 1/b : 0;
    if(a==1) return Math.exp(-x/b)/b;
    
    return Math.exp((a - 1)*Math.log(x/b) - x/b - log_gamma(a))/b;
}

// Evaluate log gammma pdf
function gamma_lnpdf(x,a,b)
{
    return (1 - a)*Math.log(x) - x/b - log_gamma(a) - a*Math.log(b);
}

// Draw a sample from a Binomial distribution
// Knuth TAOCP 2 (could be improved, i.e. via Kachitvichyanukul & Schmeiser)
function sample_binomial(p,n)
{
    var k = 0;
    var N = 10;

    var a, b;
    while(n > N)
    {
        a = 1 + n/2;
        b = 1 + n-a;

        var x = sample_beta(a,b);

        if(x >= p){ n = a-1; p /= x; }
        else{ k += a; n = b - 1; p = (p-x) / (1-x); }
    }

    var u;
    for(i=0; i<n; i++)
    {
        u = random();
        if(u<p) k++;
    }

    return k;
}

// Binomial probability distribution function via Normal approximation
// Peizer & Pratt 1968, JASA 63: 1416-1456 (may not be optimal...)
function binomial_pdf(k, p, n)
{
    var inv2 = 1/2, inv3 = 1/3, inv6 = 1/6;

    if (k >= n) return 1;

    var q = 1 - p;
    var s = k + inv2;
    var t = n - k - inv2;
    var d1 = s + inv6 - (n + inv3) * p;
    var d2 = q /(s+inv2) - p/(t+inv2) + (q-inv2)/(n+1);

    d2 = d1 + 0.02 * d2;

    var num = 1 + q * g(s/(n*p)) + p * g(t/(n*q));
    var den = (n + inv6) * p * q;
    var z = num / den;

    z = d2 * Math.sqrt(z);
    z = normal_cdf(z);

    return z;
}

// Draw a sample from a Beta distribution
// Knuth TAOCP 2 (roughly optimal)
function sample_beta(a, b)
{
    var x = sample_gamma(a, 1);
    return x / (x + sample_gamma(b, 1));
}

// Draw a sample from a Gaussian distribution
// Leva '92 (could be improved, i.e. via Ziggurat method)
function sample_gaussian(mu,sigma)
{
    var u, v, x, y, q;

    do
    {
        u = 1 - random();
        v = 1.7156 * (random() - .5);
        x = u - 0.449871;
        y = Math.abs(v) + 0.386595;
        q = x*x + y*(0.196*y - 0.25472*x);
    }
    while(q >= 0.27597 && (q > 0.27846 || v*v > -4 * u * u * Math.log(u)))

    return mu + sigma*v/u;
}

// Evaluate the gaussian distribution
function gaussian_pdf(x,mu,sigma)
{
    x-=mu;
    var asigma = Math.abs(sigma);
    var u = x/asigma;
    return (1/ Math.sqrt(2*Math.PI) * asigma) * Math.exp(-u*u/2);  
}

// Evaluate the log gaussian distribution
function gaussian_lnpdf(x,mu,sigma)
{
    return -.5*(1.8378770664093453 + Math.log(sigma) + (x - mu)*(x - mu)/sigma);
}

// Draw a sample from a Dirichlet distribution
// Law & Kelton (roughly optimal)
// TODO: may need to match function signature for Ikarus compatibility
// TODO: handle underflow in normalization
function sample_dirichlet(alpha)
{
    alpha = sc_list2vector(alpha);
    var theta = new Array(alpha.length);
    var sum = 0;

    for(i=0; i<alpha.length; i++){ theta[i] = sample_gamma(alpha[i],1); sum += theta[i]; }
    for(i=0; i<alpha.length; i++) theta[i] /= sum;
    
    return sc_vector2list(theta);
}

// Evaluate the logarithm of the Dirichlet distribution
function dirichlet_lnpdf(theta, alpha)
{
    alpha = sc_list2vector(alpha);
    theta = sc_list2vector(theta);
    var logp = log_gamma(sum(alpha));
    
    for(i=0; i<alpha.length; i++) logp += (alpha[i] - 1)*Math.log(theta[i]);
    for(i=0; i<alpha.length; i++) logp -= log_gamma(alpha[i]);

    return logp;      
}

// Draw a sample from a Student's t-distribution
// Marsaglia '80
function sample_tdist(nu)
{
    if(nu <= 2) return sample_gaussian(0,1) / sqrt( 2 * sample_gamma(nu/2, 1) / nu);

    var a,b,c,t;
    do
    {
        a = sample_gaussian(0,1);
        b = -1 / (nu/2 - 1) * log1p(-random());
        c = a*a/(nu - 2);
    }
    while(1-c < 0 || Math.exp(-b-c) > (1-c));

    return a / Math.sqrt((1-c/nu) * (1-c));
}

// Evaluate t-distribution
function tdist_pdf(x,nu)
{
    var a = log_gamma(nu/2);
    var b = log_gamma((nu+1)/2);
    
    return Math.exp(b-a)/Math.sqrt(Math.PI*nu) * Math.pow(1 + x*x/nu, -(nu+1)/2);
}

// Draw a sample from a generalized t-distribution
function sample_generalized_tdist(nu,mu,sigma_squared)
{
    return sample_tdist(nu)*Math.sqrt(sigma_squared) + mu;
}

// Return the log of a sum of exponentials, to minimize under/overflow
function logsumexp(v)
{
    v = sc_list2vector(v);
    var t=0,
        val;

    for(i=0;i<v.length;i++)
    {
        var abs=Math.abs(v[i]);        
        if(abs>t){ t=abs; val=v[i]; }                          
    }

    var sum=0;
    for(i=0;i<v.length;i++) {
      sum += Math.exp(v[i]-val);
    }

    return Math.log(sum) + val;
}

// Evaluate the log of gamma(x)
// Lancsoz approximation from Numerical Recipes in C
function log_gamma(xx)
{
    var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; 

    var x = xx - 1.0;
    var tmp = x + 5.5; tmp -= (x + 0.5)*Math.log(tmp);
    var ser=1.000000000190015;
    for (j=0;j<=5;j++){ x++; ser += cof[j]/x; }
    return -tmp+Math.log(2.5066282746310005*ser);
}

// Calculate the sum of elements in a vector
// N.B.: this doesn't get used in compiled Church->JS code
// so we don't need to use sc_list2vector / sc_vector2list
function sum(v)
{
    var sum=0;
    for(i=0;i<v.length;i++) sum += v[i];
    return sum;
}

// Calculate the mean of elements in a vector
// N.B.: this doesn't get used in compiled Church->JS code
// so we don't need to use sc_list2vector / sc_vector2list
function mean(v)
{
    return sum(v)/v.length;
}

// Normalize a vector
function normalize(v)
{
    v = sc_list2vector(v);
    var s=0;
    for(i=0;i<v.length;i++) s += v[i]*v[i];
    s = Math.sqrt(s);
    for(i=0;i<v.length;i++) v[i] /= s;
    return sc_vector2list(v);
}

// Returns log(1 + x) in a numerically stable way
function log1p(x)
{
    var ret = 0;
    var n = 50; // degree of precision

    if(x <= -1) return Number.NEGATIVE_INFINITY;
    if(x < 0 || x > 1) return Math.log(1+x);

    for(i=1; i<n; i++)
        if ((i % 2) === 0) ret -= Math.pow(x,i)/i;
        else ret += Math.pow(x,i)/i;

    return ret;
}

// factorial(x)
function fact(x)
{
    var t=1;
    while(x>1) t*=x--;
    return t;
}

// ln(x!) by Stirling's formula
// [Knuth I: p111]
function lnfact(x)
{
    if (x < 1) x = 1;

    if (x < 12) return Math.log(fact(Math.round(x)));

    var invx = 1 / x;
    var invx2 = invx * invx;
    var invx3 = invx2 * invx;
    var invx5 = invx3 * invx2;
    var invx7 = invx5 * invx2;

    var sum = ((x + 0.5) * Math.log(x)) - x;
    sum += Math.log(2*Math.PI) / 2;
    sum += (invx / 12) - (invx3 / 360);
    sum += (invx5 / 1260) - (invx7 / 1680);

    return sum;
}

// logistic(x)
function logistic(x)
{
    return 1 / (1 + Math.exp(-x));
}

// Normal cumulative distribution function
// Abramowitz & Stegun 26.2.19
// |e(x)| < 1.5E-7
function normal_cdf(x)
{
    var d1 = 0.0498673470;
    var d2 = 0.0211410061;
    var d3 = 0.0032776263;
    var d4 = 0.0000380036;
    var d5 = 0.0000488906;
    var d6 = 0.0000053830;
    var a = Math.abs(x);
    var t;

   t = 1.0 + a*(d1+a*(d2+a*(d3+a*(d4+a*(d5+a*d6)))));

   t *= t;  t *= t;  t *= t;  t *= t;
   t = 1.0 / (t+t);

   if (x >= 0)  t = 1-t;
   return t;
}

// Peizer & Pratt 1968, JASA 63: 1416-1456
function g(x)
{
    var  switchlev = 0.1;
    var z;

    if (x == 0)  return 1;
    if (x == 1)  return 0;

    var d = 1 - x;

    if (Math.abs(d) > switchlev) return (1 - (x * x) + (2 * x * Math.log(x))) / (d * d);

    z = d / 3;
    var di = d;

    for (var i = 2; i <= 7; i++)
    {
        di *= d;
        z += (2 * di) / ((i+1) * (i+2));
    }
    return z;
}


// From http://baagoe.com/en/RandomMusings/javascript/
function MRG32k3a() {
  return (function(args) {
    // Copyright (c) 1998, 2002 Pierre L'Ecuyer, DIRO, Université de Montréal.
    // http://www.iro.umontreal.ca/~lecuyer/
    var m1 = 4294967087;
    var m2 = 4294944443;
    var s10 = 12345,
        s11 = 12345,
        s12 = 123,
        s20 = 12345,
        s21 = 12345,
        s22 = 123;

    if (args.length === 0) {
      args = [+new Date()];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      s10 += mash(args[i]) * 0x100000000; // 2 ^ 32
      s11 += mash(args[i]) * 0x100000000;
      s12 += mash(args[i]) * 0x100000000;
      s20 += mash(args[i]) * 0x100000000;
      s21 += mash(args[i]) * 0x100000000;
      s22 += mash(args[i]) * 0x100000000;
    }
    s10 %= m1;
    s11 %= m1;
    s12 %= m1;
    s20 %= m2;
    s21 %= m2;
    s22 %= m2;
    mash = null;

    var uint32 = function() {
      var m1 = 4294967087;
      var m2 = 4294944443;
      var a12 = 1403580;
      var a13n = 810728;
      var a21 = 527612;
      var a23n = 1370589;

      var k, p1, p2;

      /* Component 1 */
      p1 = a12 * s11 - a13n * s10;
      k = p1 / m1 | 0;
      p1 -= k * m1;
      if (p1 < 0) p1 += m1;
      s10 = s11;
      s11 = s12;
      s12 = p1;

      /* Component 2 */
      p2 = a21 * s22 - a23n * s20;
      k = p2 / m2 | 0;
      p2 -= k * m2;
      if (p2 < 0) p2 += m2;
      s20 = s21;
      s21 = s22;
      s22 = p2;

      /* Combination */
      if (p1 <= p2) return p1 - p2 + m1;
      else return p1 - p2;
    };

    var random = function() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
    random.uint32 = uint32;
    random.fract53 = function() {
      return random() +
        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'MRG32k3a 0.9';
    random.args = args;

    return random;
  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}




    SC_DEFAULT_OUT = new sc_GenericOutputPort(console.log);
    SC_ERROR_OUT = SC_DEFAULT_OUT;


var const_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_1z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_2z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_3z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_4z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_5z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_6z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_7z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_8z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_9z00_citation_structural_dynamic2_prog_tmp;
var BgL_sc_const_10z00_citation_structural_dynamic2_prog_tmp;
var erase;
var BgL_takezd2rightzd2;
var BgL_repeatedzd2mcmczd2queryzd2corezd2;
var BgL_listzd2ze3dlistz31;
var BgL_samplezd2tdistzd2;
var BgL_churchzd2discretezd2samplerz00;
var remove;
var BgL_basiczd2repeatzd2kernelz00;
var BgL_addboxzd2emptyzf3z21;
var BgL_applyzd2primzb2provz60;
var BgL_churchzd2makezd2factorzd2froza7enz75;
var BgL_deczd2provzb2provenancez60;
var BgL_inexactzd2ze3exactz31;
var BgL_larjzd2selectivezd2proposalzd2distributionzd2;
var BgL_churchzd2truezd2;
var BgL_inczd2provzb2provenancez60;
var BgL_factorzd2addresszd2;
var BgL_trzd2cdrzb2provenancez60;
var BgL_foldzd2rightzd2;
var BgL_displayzd2larjzd2statsz00;
var BgL_churchzd2randomzd2integerz00;
var rest;
var BgL_lsetzd2unionzd2;
var BgL_pairzd2forzd2eachz00;
var BgL_splitzd2atzd2;
var BgL_churchzd2makezd2factorzd2genericzd2;
var fold;
var BgL_factorzd2provenancezd2;
var BgL_alistzd2ze3triez31;
var BgL_setzd2storezd2diffzd2factorsz12zc0;
var BgL_makezd2emptyzd2storez00;
var BgL_exactzd2ze3inexactz31;
var BgL_churchzd2pizd2;
var BgL_spanz12z12;
var BgL_reducezd2rightzd2;
var BgL_gammazd2pdfzd2;
var BgL_printzd2mcmczd2statezd2xrpszd2;
var BgL_xrpzd2drawzd2ticksz00;
var BgL_churchzd2makezd2vectorz00;
var any;
var BgL_makezd2triezd2;
var BgL_storezd2ze3structuralzd2drawsze3;
var BgL_whichzd2statezd2tozd2perturbzd2andzd2newzd2proposalz00;
var BgL_DEBUGzd2DEPzd2;
var BgL_lengthzb2zb2;
var BgL_enforcezd2conditionerzd2;
var BgL_setzd2storezd2xrpzd2drawsz12zc0;
var BgL_applyzd2primzb2provzb2addressingzd2;
var BgL_enablezd2larjzd2logz00;
var BgL_updatezd2addboxzd2;
var BgL_applyzd2fnzb2provz60;
var BgL_churchzd2forcezd2;
var count;
var eighth;
var BgL_setzd2listzd2eltz12z12;
var BgL_counterfactualzd2updatezd2;
var BgL_churchzd2makezd2xrpzb2provenancezb2structuralzd2optzd2;
var BgL_xrpzd2drawzd2proposerz00;
var BgL_storezd2ze3scorez31;
var BgL_logzd2flipza2z70;
var BgL_emptyzd2provzd2;
var BgL_NOzd2FWDzd2PROBz00;
var BgL_falsez00;
var BgL_extendedzd2statezd2spacezd2selectivezd2proposalzd2distributionzd2;
var BgL_gaussianzd2pdfzd2;
var fifth;
var BgL_disablezd2larjzd2logz00;
var STATE_SRC_2;
var BgL_churchzd2resetzd2storezd2xrpzd2drawszb2provenancezb2;
var BgL_storezd2ze3xrpzd2drawsze3;
var BgL_churchzd2carzd2;
var STATE_SRC_1;
var BgL_lsetzd2xorz12zc0;
var BgL_mapz12z12;
var BgL_getzd2larjzd2scorez00;
var BgL_samplezd2generaliza7edzd2tdistza7;
var BgL_reversez12z12;
var BgL_churchzd2makezd2structuralzd2xrpzd2;
var BgL_mcmczd2statezd2ze3scoreze3;
var BgL_churchzd2orzd2;
var BgL_takezd2whilezd2;
var BgL_partitionz12z12;
var BgL_updatezd2fzd2pluszd2minuszd2commonzd2scoreszd2;
var BgL_extractzd2optzd2argz00;
var BgL_listzd2ze3trzd2listzb2provenancez51;
var infinity;
var BgL_listzd2indexzd2;
var BgL_mcmczd2statezd2ze3xrpzd2drawsz31;
var BgL_setzd2storezd2scorez12z12;
var BgL_churchzd2applyzd2;
var BgL_findzd2tailzd2;
var BgL_churchzd2makezd2xrpz00;
var BgL_storezd2ze3xrpzd2statsze3;
var BgL_disablezd2annealzd2earlyzd2stopzd2;
var BgL_takezd2whilez12zc0;
var BgL_dottedzd2listzf3z21;
var second;
var BgL_listzd2tabulatezd2;
var unzip5;
var BgL_repeatedzd2mcmczd2queryzd2corezd2proposalzd2countzd2;
var BgL_storezd2ze3factorsz31;
var BgL_samplezd2gammazd2;
var unzip4;
var BgL_factorzd2shouldzd2updatezf3zf3;
var BgL_mhzd2queryzf2annealedzd2initza2z50;
var unzip3;
var unzip2;
var BgL_samplezd2dirichletzd2;
var unzip1;
var concatenate;
var BgL_mcmczd2statezd2ze3queryzd2valuezb2provenancez83;
var BgL_factorzd2newzf3z21;
var BgL_rejectionzd2initializa7erz75;
var BgL_larjzd2scorerzd2;
var BgL_clearzd2provzd2;
var BgL_binomialzd2pdfzd2;
var BgL_samplezd2gaussianzd2;
var BgL_xrpzd2drawzd2structuralzf3zf3;
var BgL_storezd2ze3nonstructuralzd2drawsze3;
var BgL_churchzd2displayzd2structuralzd2addrszd2;
var BgL_reallyzd2appendzd2mapz00;
var BgL_makezd2mcmczd2statez00;
var BgL_myzd2takezd2;
var BgL_mergezd2listzd2provsz00;
var BgL_churchzd2stringzd2lengthz00;
var sixth;
var BgL_triezd2emptyzf3z21;
var BgL_bindzd2provzb2addrz60;
var prov;
var BgL_churchzd2nanzd2;
var BgL_churchzd2secondzd2;
var BgL_alistzd2deletez12zc0;
var BgL_selectivezd2proposalzd2distributionz00;
var BgL_appendzd2mapzd2;
var xcons;
var BgL_churchzd2makezd2factorzd2annealedzd2;
var BgL_enablezd2larjzd2debugz00;
var BgL_geozd2seqzd2;
var replicate;
var BgL_xrpzd2drawzd2supportz00;
var BgL_churchzd2mainzd2;
var BgL_setzd2storezd2factorsz12z12;
var BgL_lsetzd2xorzd2;
var BgL_circularzd2listzd2;
var BgL_concatenatez12z12;
var BgL_cyclezd2kernelzd2;
var BgL_dlzd2unitzd2;
var BgL_churchzd2zb2z60;
var BgL_lsetzd3zd3;
var BgL_checkzd2argzd2;
var BgL_churchzd2za2z70;
var BgL_deletez12z12;
var BgL_displayzd2larjzd2;
var BgL_makezd2emptyzd2triez00;
var BgL_lsetzc3zd3z10;
var BgL_churchzd2makezd2structuralzd2xrpzb2provenancez60;
var BgL_proposablezd2xrpszd2;
var BgL_churchzd2resetzd2storezd2structuralzd2addrsz00;
var BgL_churchzd2displayzd2;
var member;
var BgL_properzd2listzf3z21;
var BgL_factorzd2mustzd2annealzf3zf3;
var BgL_myzd2lastzd2;
var BgL_xrpzd2drawzd2scorez00;
var BgL_lookupzd2factorzd2andzd2updatezd2;
var BgL_churchzd2resetzd2storezd2factorszd2;
var BgL_fnzb2provzb2;
var BgL_provzd2ze3listz31;
var BgL_extractzd2valszd2;
var arglist;
var BgL_z52carszb2cdrszf2nozd2testzc0;
var BgL_counterfactualzd2updatezd2larjz00;
var BgL_alistzd2deletezd2;
var BgL_MUSTzd2ANNEALzd2;
var BgL_xyzd2gradientzd2Rz00;
var third;
var BgL_printzd2singlezd2xrpz00;
var BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3;
var BgL_churchzd2equalzf3z21;
var BgL_tapezf3zf3;
var find;
var assoc;
var BgL_z52carszb2ze0;
var BgL_mcmczd2statezd2ze3queryzd2valuez31;
var BgL_makezd2xrpzd2drawz00;
var BgL_dlzd2conszd2;
var BgL_dropzd2rightzd2;
var BgL_churchzd2makezd2factorzb2provenancezb2;
var BgL_constz00;
var BgL_interpzd2rangezd2powz00;
var BgL_continuouszf3zf3;
var BgL_churchzd2minuszd2infinityz00;
var BgL_circularzd2listzf3z21;
var BgL_PRINTzd2LARJzd2RUNz00;
var BgL_churchzd2resetzd2storezd2structuralzd2addrszb2provenancezb2;
var BgL_trzd2listzb2provenancez60;
var BgL_minuszd2infinityzd2;
var BgL_deletez00;
var BgL_displayzd2larjzd2logz00;
var BgL_copyzd2addboxzd2;
var BgL_trzd2listzd2ze3listzb2provenancez51;
var BgL_appendzd2reversez12zc0;
var BgL_dirichletzd2lnpdfzd2;
var pi;
var BgL_lsetzd2differencez12zc0;
var BgL_churchzd2restzd2;
var BgL_z52carszb2cdrszb2z52;
var BgL_churchzd2schemezd2gensymz00;
var BgL_mcmczd2statezd2ze3addressze3;
var STATE_SRC_NONE;
var BgL_currentzd2datezd2;
var BgL_fzd2pluszd2minuszd2commonzd2;
var BgL_churchzd2makezd2factorzd2annealedzb2provenancez60;
var BgL_triezd2updatezd2;
var BgL_churchzd2trzd2nullzb2provenancezb2;
var BgL_churchzd2vectorzd2lengthz00;
var BgL_gammazd2lnpdfzd2;
var BgL_factorzd2expiredzf3z21;
var BgL_MUSTzd2NOTzd2ANNEALz00;
var span;
var BgL_churchzd2makezd2initialzd2mcmczd2statez00;
var BgL_ifzb2provzb2;
var fourth;
var BgL_provenancezf3zf3;
var BgL_dlistzd2ze3listz31;
var BgL_updatezd2xrpzd2drawzd2structuralzd2fieldsz00;
var BgL_storezd2ze3enumerationzd2flagze3;
var nan;
var trienone;
var BgL_churchzd2lengthzd2;
var BgL_randomzd2integerzd2;
var BgL_gaussianzd2lnpdfzd2;
var BgL_interpzd2rangezd2;
var BgL_primzb2provzb2;
var BgL_churchzd2applyzb2provz60;
var BgL_churchzd2firstzd2;
var BgL_factorzd2scorerzd2;
var BgL_dropzd2rightz12zc0;
var BgL_enablezd2larjzd2statsz00;
var BgL_primzb2provzb2addrz00;
var BgL_provzd2initzd2;
var untapify;
var BgL_mcmczd2statezd2ze3storeze3;
var BgL_churchzd2makezd2initialzd2mcmczd2statezb2provenancezb2;
var drop;
var BgL_uniformzd2drawza2z70;
var BgL_extendedzd2statezd2ze3afterze3;
var BgL_churchzd2nullzf3z21;
var every;
var BgL_larjzd2mhzd2queryzd2proposalzd2countza2za2;
var BgL_churchzd2fourthzd2;
var BgL_printzd2diffzd2factorzd2addrszd2;
var BgL_notzd2pairzf3z21;
var BgL_mcmczd2statezd2ze3diffzd2factorsz31;
var BgL_dlzd2nullzd2;
var BgL_larjzd2mhzd2queryza2za2;
var BgL_verbosezd2initzd2;
var BgL_nonzd2structuralzd2kernelz00;
var BgL_addboxzd2ze3valuesz31;
var BgL_trzd2deletezd2duplicateszb2provenancezb2;
var BgL_lsetzd2intersectionz12zc0;
var BgL_alistzd2copyzd2;
var BgL_cleanzd2storezd2factorsz00;
var BgL_dropzd2whilezd2;
var BgL_larjzd2mhzd2queryzd2proposalzd2countzb2powerza2z10;
var BgL_pairzd2foldzd2rightz00;
var BgL_storezd2addzd2structuralzd2depz12zc0;
var BgL_mcmczd2loopzd2;
var BgL_schemezd2gensymzd2;
var seventh;
var zip2;
var BgL_churchzd2listzd2ze3vectorze3;
var BgL_larjzd2kernelzd2proposalzd2countzd2;
var BgL_factorzd2valuezd2;
var BgL_triezd2ze3childrenz31;
var BgL_truez00;
var reduce;
var BgL_defaultzd2scorerzd2;
var BgL_removez12z12;
var BgL_extendedzd2statezd2ze3beforeze3;
var tapify;
var BgL_basiczd2proposalzd2distributionz00;
var STATE_SRC_BOTH;
var BgL_xrpzd2inzd2statezf3zf3;
var BgL_churchzd2makezd2xrpzb2provenancezb2;
var BgL_combinezd2xrpzd2drawsz00;
var BgL_makezd2larjzd2kernelz00;
var unfold;
var BgL_larjzd2mhzd2queryzb2powerza2z10;
var DEBUG;
var BgL_deletezd2duplicateszd2;
var BgL_factorzd2shouldzd2annealzf3zf3;
var BgL_disablezd2larjzd2debugz00;
var BgL_enablezd2fwdzd2probz00;
var iota;
var BgL_churchzd2factorzd2valuez00;
var BgL_samplezd2betazd2;
var BgL_makezd2extendedzd2statez00;
var BgL_triezd2ze3valz31;
var BgL_churchzd2resetzd2storezd2factorszb2provenancez60;
var BgL_churchzd2makezd2factorzd2genericzb2provenancez60;
var BgL_splitzd2sharezd2provz00;
var BgL_lsetzd2differencezd2;
var BgL_z52lset2zc3zd3z42;
var BgL_listzd2repzd2;
var BgL_makezd2addboxzd2;
var BgL_churchzd2falsezd2;
var BgL_disablezd2provzd2debugz00;
var BgL_churchzd2fifthzd2;
var BgL_larjzd2proposalzd2distributionz00;
var BgL_alistzd2ze3addboxz31;
var BgL_disablezd2fwdzd2probz00;
var BgL_makezd2provzd2;
var BgL_poissonzd2pdfzd2;
var BgL_samplezd2poissonzd2;
var BgL_filterzd2mapzd2;
var ninth;
var BgL_appendz12z12;
var BgL_z52cdrsz52;
var BgL_factorzd2argszd2;
var BgL_notzd2boolzf3z21;
var BgL_STOPzd2ALPHAzd2;
var BgL_nonzd2structuralzd2mhzd2queryza2z70;
var BgL_xrpzd2drawzd2valuez00;
var BgL_mergezd2provszd2;
var BgL_deletezd2duplicatesz12zc0;
var BgL_churchzd2listzd2;
var BgL_takez12z12;
var BgL_runzd2xrpzd2drawzd2proposerzd2;
var BgL_makezd2mhzd2kernelz00;
var BgL_churchzd2eqvzf3z21;
var BgL_consza2za2;
var BgL_insertzd2addboxzd2;
var BgL_churchzd2infinityzd2;
var BgL_mapzd2inzd2orderz00;
var BgL_trzd2conszb2provenancez60;
var BgL_carzb2cdrzb2;
var BgL_churchzd2makezd2factorzd2froza7enzb2provenancezc7;
var BgL_dlzd2snoczd2;
var BgL_factorzd2autozd2annealzf3zf3;
var BgL_enablezd2provzd2debugz00;
var BgL_splitzd2atz12zc0;
var BgL_repeatzd2kernelzd2;
var BgL_displayzd2provzb2provenancez60;
var filter;
var BgL_factorzd2mustzd2notzd2annealzf3z21;
var BgL_addzd2provzd2;
var BgL_trzd2carzb2provenancez60;
var BgL_churchzd2resetzd2storezd2xrpzd2drawsz00;
var BgL_appendzd2mapz12zc0;
var BgL_churchzd2makezd2factorz00;
var BgL_storezd2ze3tickz31;
var BgL_liftedzd2applyzd2;
var BgL_nullzd2listzf3z21;
var zip;
var BgL_appendzd2reversezd2;
var BgL_walkzd2triezd2;
var BgL_setzd2storezd2structuralzd2addrsz12zc0;
var snds;
var BgL_enablezd2annealzd2earlyzd2stopzd2;
var BgL_filterz12z12;
var BgL_makezd2listzd2;
var BgL_mcmczd2statezd2ze3scorezd2genericz31;
var BgL_mcmczd2statezd2ze3gradientze3;
var BgL_factorszd2ze3addboxz31;
var compose;
var BgL_pairzd2foldzd2;
var BgL_trzd2listzd2refzb2provenancezb2;
var BgL_seedzd2rngzd2;
var take;
var BgL_lastzd2pairzd2;
var pair;
var BgL_listzd2copyzd2;
var BgL_xrpzd2drawzd2setzd2structuralzd2;
var BgL_readzd2addboxzd2;
var tenth;
var BgL_churchzd2sixthzd2;
var BgL_discretezd2pdfzd2;
var BgL_lsetzd2adjoinzd2;
var partition;
var BgL_dozd2larjzd2annealzd2correctionzd2;
var BgL_extendedzd2statezd2spacezd2proposalzd2distributionz00;
var BgL_mcmczd2statezd2ze3scorezb2provenancez51;
var fsts;
var BgL_churchzd2eqzf3z21;
var BgL_tdistzd2pdfzd2;
var BgL_lsetzd2unionz12zc0;
var BgL_PRINTzd2LARJzd2STATSz00;
var BgL_triezd2insertzd2;
var BgL_breakz12z12;
var BgL_disablezd2larjzd2statsz00;
var BgL_shouldzd2dozd2larjzf3zd2dynamicz21;
var BgL_combinezd2proposablezd2xrpzd2drawszd2;
var BgL_z52carszb2cdrsze0;
var BgL_copyzd2triezd2;
var BgL_discretezd2samplerzd2;
var BgL_unfoldzd2rightzd2;
var BgL_factorzd2mustzd2annealzd2fzb2zd2zf3z41;
var BgL_provzb2zb2;
var BgL_bindzd2provzd2;
var BgL_provszd2ze3listz31;
var BgL_churchzd2samplezd2dirichletz00;
var BgL_lsetzd2diffzb2intersectionz12z72;
var BgL_xrpzd2drawzd2addressz00;
var BgL_storezd2ze3diffzd2factorsze3;
var BgL_makezd2storezd2;
var first;
var BgL_loggedzd2appzd2;
var BgL_triezd2ze3valuesz31;
var map;
var BgL_addrzd2ze3provz31;
var BgL_dlzd2appendzd2;
var BgL_alistzd2conszd2;
var BgL_AUTOzd2ANNEALzd2;
var last;
var BgL_makezd2factorzd2instancez00;
var BgL_shouldzd2dozd2larjzf3zf3;
var BgL_extractzd2provszd2;
var BgL_displayzd2debugzd2;
var BgL_randomzd2realzd2;
var BgL_factorzd2tickszd2;
var BgL_listzd3zd3;
var BgL_lsetzd2diffzb2intersectionz60;
var BgL_MUSTzd2ANNEALzd2Fzb2zd2z60;
var BgL_larjzd2kernelzd2;
var BgL_printzd2structuralzd2addressesz00;
var BgL_churchzd2andzd2;
var BgL_churchzd2thirdzd2;
var BgL_breakz00;
var BgL_cleanzd2storezd2;
var BgL_DEBUGzd2LARJzd2;
var BgL_storezd2ze3structuralzd2addrsze3;
var BgL_churchzd2cadrzd2;
var BgL_za2withzd2scorezd2gradientza2z00;
var BgL_lsetzd2intersectionzd2;
var BgL_xrpzd2drawzd2namez00;
var BgL_triezd2lookupzd2;
var BgL_nonzd2structuralzd2proposalzd2distributionzd2;
var BgL_samplezd2binomialzd2;
var BgL_mhzd2queryza2z70;
const_citation_structural_dynamic2_prog_tmp = "term 2 must be vector, list, or string:";
BgL_sc_const_1z00_citation_structural_dynamic2_prog_tmp = "null-list?: argument out of domain";
BgL_sc_const_2z00_citation_structural_dynamic2_prog_tmp = sc_list("\uEBACin", "\uEBACchurch", "\uEBACreset", "\uEBACstore", "\uEBACxrp", "\uEBACdraws");
BgL_sc_const_3z00_citation_structural_dynamic2_prog_tmp = "term 1 must be vector, list, or string:";
BgL_sc_const_4z00_citation_structural_dynamic2_prog_tmp = sc_list(new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate versus univariate decision trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("Carla", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("Paul", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate versus univariate decision trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate versus univariate decision trees   Coins", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate Versus Univariate Decision Trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Ut-goff", null))), null)), new sc_Pair(new sc_Pair("Multivariate versus univariate decision trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate Versus Univariate Decision Trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Goal-directed Classification Using Linear Machine Decision Trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Goal-directed Classification Using Linear Machine Decision Trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("C", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("P", new sc_Pair("E", new sc_Pair("Ut-goff", null))), null)), new sc_Pair(new sc_Pair("Goal-directed Classification Using Linear Machine Decision Trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("Carla", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("Paul", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate decision trees", null), null)), new sc_Pair(new sc_Pair(new sc_Pair("Carla", new sc_Pair("E", new sc_Pair("Brodley", null))), new sc_Pair(new sc_Pair("Paul", new sc_Pair("E", new sc_Pair("Utgoff", null))), null)), new sc_Pair(new sc_Pair("Multivariate decision trees", null), null)));
BgL_sc_const_5z00_citation_structural_dynamic2_prog_tmp = "xy-gradient-R undefined";
BgL_sc_const_6z00_citation_structural_dynamic2_prog_tmp = "NEGATIVE_INFINITY";
BgL_sc_const_7z00_citation_structural_dynamic2_prog_tmp = "Negative step count";
BgL_sc_const_8z00_citation_structural_dynamic2_prog_tmp = "Too many arguments to MAKE-LIST";
BgL_sc_const_9z00_citation_structural_dynamic2_prog_tmp = "Too many arguments";
BgL_sc_const_10z00_citation_structural_dynamic2_prog_tmp = "POSITIVE_INFINITY";
BgL_checkzd2argzd2 = function(pred, val, caller) {
    var val_1;
    val_1 = val;
    while (pred(val_1) === false) {
      val_1 = sc_error("Bad argument", val_1, pred, caller);
    }
    return val_1;
  };
xcons = function(d, a) {
    return new sc_Pair(a, d);
  };
BgL_makezd2listzd2 = function(len) {
    var maybe_elt = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      maybe_elt = sc_cons(arguments[sc_tmp], maybe_elt);
    }
    var i;
    var ans;
    var ans_2;
    var elt;
    BgL_checkzd2argzd2(function(n) {
        if (sc_isInteger(n)) {
          return n >= 0;
        } else {
          return false;
        }
      }, len, BgL_makezd2listzd2);
    if (maybe_elt === null) {
      elt = false;
    } else {
      if (maybe_elt.cdr === null) {
        elt = maybe_elt.car;
      } else {
        elt = sc_error(BgL_sc_const_8z00_citation_structural_dynamic2_prog_tmp, new sc_Pair(len, maybe_elt));
      }
    }
    ans_2 = null;
    i = len;
    ans = ans_2;
    while (!(i <= 0)) {
      --i;
      ans = new sc_Pair(elt, ans);
    }
    return ans;
  };
BgL_listzd2tabulatezd2 = function(len, proc) {
    var i;
    var ans;
    var ans_3;
    var i_4;
    BgL_checkzd2argzd2(function(n) {
        if (sc_isInteger(n)) {
          return n >= 0;
        } else {
          return false;
        }
      }, len, BgL_listzd2tabulatezd2);
    BgL_checkzd2argzd2(sc_isProcedure, proc, BgL_listzd2tabulatezd2);
    i_4 = len - 1;
    ans_3 = null;
    i = i_4;
    ans = ans_3;
    while (!(i < 0)) {
      ans = new sc_Pair(proc(i), ans);
      --i;
    }
    return ans;
  };
BgL_consza2za2 = function(first) {
    var rest = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      rest = sc_cons(arguments[sc_tmp], rest);
    }
    var recur;
    recur = function(x, rest) {
        var stmp;
        var rest_5;
        var x_6;
        if (rest instanceof sc_Pair) {
          x_6 = rest.car;
          rest_5 = rest.cdr;
          if (rest_5 instanceof sc_Pair) {
            stmp = new sc_Pair(x_6, recur(rest_5.car, rest_5.cdr));
          } else {
            stmp = x_6;
          }
          return new sc_Pair(x, stmp);
        } else {
          return x;
        }
      };
    if (rest instanceof sc_Pair) {
      return new sc_Pair(first, recur(rest.car, rest.cdr));
    } else {
      return first;
    }
  };
BgL_listzd2copyzd2 = function(lis) {
    var recur;
    recur = function(lis) {
        var stmp;
        var lis_7;
        if (lis instanceof sc_Pair) {
          lis_7 = lis.cdr;
          if (lis_7 instanceof sc_Pair) {
            stmp = new sc_Pair(lis_7.car, recur(lis_7.cdr));
          } else {
            stmp = lis_7;
          }
          return new sc_Pair(lis.car, stmp);
        } else {
          return lis;
        }
      };
    if (lis instanceof sc_Pair) {
      return new sc_Pair(lis.car, recur(lis.cdr));
    } else {
      return lis;
    }
  };
iota = function(count) {
    var BgL_sc_maybezd2startzb2step_11z60 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      BgL_sc_maybezd2startzb2step_11z60 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2startzb2step_11z60);
    }
    var n;
    var r;
    var g1266;
    var step;
    var tmp1265;
    var start;
    BgL_checkzd2argzd2(sc_isInteger, count, iota);
    if (count < 0) {
      sc_error(BgL_sc_const_7z00_citation_structural_dynamic2_prog_tmp, iota, count);
    }
    if (BgL_sc_maybezd2startzb2step_11z60 === null) {
      start = 0;
    } else {
      start = BgL_sc_maybezd2startzb2step_11z60.car;
    }
    tmp1265 = BgL_sc_maybezd2startzb2step_11z60 === null;
    if ((tmp1265 !== false? tmp1265: rest(BgL_sc_maybezd2startzb2step_11z60) === null) !== false) {
      step = 1;
    } else {
      step = BgL_sc_maybezd2startzb2step_11z60.cdr.car;
    }
    BgL_checkzd2argzd2(sc_isNumber, start, iota);
    BgL_checkzd2argzd2(sc_isNumber, step, iota);
    g1266 = null;
    n = 0;
    r = g1266;
    while (!(n === count)) {
      r = new sc_Pair(start + n * step, r);
      n = 1 + n;
    }
    return sc_reverse(r);
  };
BgL_circularzd2listzd2 = function(val1) {
    var vals = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      vals = sc_cons(arguments[sc_tmp], vals);
    }
    var ans;
    ans = new sc_Pair(val1, vals);
    BgL_lastzd2pairzd2(ans).cdr = ans;
    return ans;
  };
BgL_properzd2listzf3z21 = function(x) {
    var lag;
    var x_9;
    var x_10;
    var x_11;
    var lag_12;
    x_11 = x;
    lag_12 = x;
    while (x_11 instanceof sc_Pair) {
      x_10 = x_11.cdr;
      if (x_10 instanceof sc_Pair) {
        x_9 = x_10.cdr;
        lag = lag_12.cdr;
        if (!(x_9 === lag)) {
          x_11 = x_9;
          lag_12 = lag;
        } else {
          return false;
        }
      } else {
        return x_10 === null;
      }
    }
    return x_11 === null;
  };
BgL_dottedzd2listzf3z21 = function(x) {
    var lag;
    var x_13;
    var x_14;
    var x_15;
    var lag_16;
    x_15 = x;
    lag_16 = x;
    while (x_15 instanceof sc_Pair) {
      x_14 = x_15.cdr;
      if (x_14 instanceof sc_Pair) {
        x_13 = x_14.cdr;
        lag = lag_16.cdr;
        if (!(x_13 === lag)) {
          x_15 = x_13;
          lag_16 = lag;
        } else {
          return false;
        }
      } else {
        return !(x_14 === null);
      }
    }
    return !(x_15 === null);
  };
BgL_circularzd2listzf3z21 = function(x) {
    var tmp1267;
    var lag;
    var x_17;
    var x_18;
    var x_19;
    var lag_20;
    x_19 = x;
    lag_20 = x;
    while (x_19 instanceof sc_Pair) {
      x_18 = x_19.cdr;
      if (x_18 instanceof sc_Pair) {
        x_17 = x_18.cdr;
        lag = lag_20.cdr;
        tmp1267 = x_17 === lag;
        if (tmp1267 !== false) {
          return tmp1267;
        } else {
          x_19 = x_17;
          lag_20 = lag;
        }
      } else {
        return false;
      }
    }
    return false;
  };
BgL_notzd2pairzf3z21 = function(x) {
    return !(x instanceof sc_Pair);
  };
BgL_nullzd2listzf3z21 = function(l) {
    if (l instanceof sc_Pair) {
      return false;
    } else {
      if (l === null) {
        return true;
      } else {
        return sc_error(BgL_sc_const_1z00_citation_structural_dynamic2_prog_tmp, l);
      }
    }
  };
BgL_listzd3zd3 = function(BgL_sc_zd3_12zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var list_a;
    var list_b;
    var others;
    var list_b_22;
    var tmp1271;
    var list_a_23;
    var others_24;
    var list_a_25;
    var others_26;
    var g1270;
    var g1269;
    var tmp1268;
    tmp1268 = lists === null;
    if (tmp1268 !== false) {
      return tmp1268;
    } else {
      g1269 = lists.car;
      g1270 = lists.cdr;
      list_a_25 = g1269;
      others_26 = g1270;
      continue1522:
        do {
          list_a_23 = list_a_25;
          others_24 = others_26;
          do {
            tmp1271 = others_24 === null;
            if (tmp1271 !== false) {
              return tmp1271;
            } else {
              list_b_22 = others_24.car;
              others = others_24.cdr;
              if (list_a_23 === list_b_22) {
                list_a_23 = list_b_22;
                others_24 = others;
              } else {
                list_a = list_a_23;
                list_b = list_b_22;
                while (BgL_nullzd2listzf3z21(list_a) === false) {
                  if (BgL_nullzd2listzf3z21(list_b) === false) {
                    if (BgL_sc_zd3_12zd3(list_a.car, list_b.car) !== false) {
                      list_a = list_a.cdr;
                      list_b = list_b.cdr;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (BgL_nullzd2listzf3z21(list_b) !== false) {
                  list_a_25 = list_b;
                  others_26 = others;
                  continue continue1522;
                } else {
                  return false;
                }
              }
            }
          } while (true);
        } while (true);
    }
  };
BgL_lengthzb2zb2 = function(x) {
    var len;
    var lag;
    var x_27;
    var len_28;
    var x_29;
    var x_30;
    var lag_31;
    var len_32;
    x_30 = x;
    lag_31 = x;
    len_32 = 0;
    while (x_30 instanceof sc_Pair) {
      x_29 = x_30.cdr;
      len_28 = len_32 + 1;
      if (x_29 instanceof sc_Pair) {
        x_27 = x_29.cdr;
        lag = lag_31.cdr;
        len = len_28 + 1;
        if (!(x_27 === lag)) {
          x_30 = x_27;
          lag_31 = lag;
          len_32 = len;
        } else {
          return false;
        }
      } else {
        return len_28;
      }
    }
    return len_32;
  };
zip = function(list1) {
    var more_lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      more_lists = sc_cons(arguments[sc_tmp], more_lists);
    }
    return sc_apply(map, sc_list, list1, more_lists);
  };
first = sc_car;
second = sc_cadr;
third = sc_caddr;
fourth = sc_cadddr;
fifth = function(x) {
    return x.cdr.cdr.cdr.cdr.car;
  };
sixth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.car;
  };
seventh = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
eighth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
ninth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
tenth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
BgL_carzb2cdrzb2 = function(pair) {
    return new sc_Values([pair.car, pair.cdr]);
  };
take = function(lis, k) {
    var recur;
    BgL_checkzd2argzd2(sc_isInteger, k, take);
    recur = function(lis, k) {
        var stmp;
        var k_33;
        var lis_34;
        if (k === 0) {
          return null;
        } else {
          lis_34 = lis.cdr;
          k_33 = k - 1;
          if (k_33 === 0) {
            stmp = null;
          } else {
            stmp = new sc_Pair(lis_34.car, recur(lis_34.cdr, k_33 - 1));
          }
          return new sc_Pair(lis.car, stmp);
        }
      };
    if (k === 0) {
      return null;
    } else {
      return new sc_Pair(lis.car, recur(lis.cdr, k - 1));
    }
  };
drop = function(lis, k) {
    var lis_35;
    var k_36;
    BgL_checkzd2argzd2(sc_isInteger, k, drop);
    lis_35 = lis;
    k_36 = k;
    while (!(k_36 === 0)) {
      lis_35 = lis_35.cdr;
      --k_36;
    }
    return lis_35;
  };
BgL_takez12z12 = function(lis, k) {
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_takez12z12);
    if (k === 0) {
      return null;
    } else {
      drop(lis, k - 1).cdr = null;
      return lis;
    }
  };
BgL_takezd2rightzd2 = function(lis, k) {
    var lag;
    var lead;
    var g1272;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_takezd2rightzd2);
    g1272 = drop(lis, k);
    lag = lis;
    lead = g1272;
    while (lead instanceof sc_Pair) {
      lag = lag.cdr;
      lead = lead.cdr;
    }
    return lag;
  };
BgL_dropzd2rightzd2 = function(lis, k) {
    var recur;
    var g1273;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_dropzd2rightzd2);
    g1273 = drop(lis, k);
    recur = function(lag, lead) {
        var stmp;
        var lead_37;
        var lag_38;
        if (lead instanceof sc_Pair) {
          lag_38 = lag.cdr;
          lead_37 = lead.cdr;
          if (lead_37 instanceof sc_Pair) {
            stmp = new sc_Pair(lag_38.car, recur(lag_38.cdr, lead_37.cdr));
          } else {
            stmp = null;
          }
          return new sc_Pair(lag.car, stmp);
        } else {
          return null;
        }
      };
    if (g1273 instanceof sc_Pair) {
      return new sc_Pair(lis.car, recur(lis.cdr, g1273.cdr));
    } else {
      return null;
    }
  };
BgL_dropzd2rightz12zc0 = function(lis, k) {
    var lag;
    var lead;
    var g1274;
    var lead_39;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_dropzd2rightz12zc0);
    lead_39 = drop(lis, k);
    if (lead_39 instanceof sc_Pair) {
      g1274 = lead_39.cdr;
      lag = lis;
      lead = g1274;
      while (lead instanceof sc_Pair) {
        lag = lag.cdr;
        lead = lead.cdr;
      }
      lag.cdr = null;
      return lis;
    } else {
      return null;
    }
  };
BgL_splitzd2atzd2 = function(x, k) {
    var recur;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_splitzd2atzd2);
    recur = function(lis, k) {
        if (k === 0) {
          return new sc_Values([null, lis]);
        } else {
          return sc_callWithValues(function() {
                    return recur(lis.cdr, k - 1);
                  }, function(prefix, suffix) {
                    return new sc_Values([new sc_Pair(lis.car, prefix), suffix]);
                  });
        }
      };
    return recur(x, k);
  };
BgL_splitzd2atz12zc0 = function(x, k) {
    var suffix;
    var prev;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_splitzd2atz12zc0);
    if (k === 0) {
      return new sc_Values([null, x]);
    } else {
      prev = drop(x, k - 1);
      suffix = prev.cdr;
      prev.cdr = null;
      return new sc_Values([x, suffix]);
    }
  };
last = function(lis) {
    return BgL_lastzd2pairzd2(lis).car;
  };
BgL_lastzd2pairzd2 = function(lis) {
    var tail;
    var lis_40;
    BgL_checkzd2argzd2(sc_isPair, lis, BgL_lastzd2pairzd2);
    lis_40 = lis;
    do {
      tail = lis_40.cdr;
      if (tail instanceof sc_Pair) {
        lis_40 = tail;
      } else {
        return lis_40;
      }
    } while (true);
  };
unzip1 = function(lis) {
    return map(sc_car, lis);
  };
unzip2 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b)]);
                  });
        }
      };
    return recur(lis);
  };
unzip3 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c)]);
                  });
        }
      };
    return recur(lis);
  };
unzip4 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c, d) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c), new sc_Pair(elt.cdr.cdr.cdr.car, d)]);
                  });
        }
      };
    return recur(lis);
  };
unzip5 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c, d, e) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c), new sc_Pair(elt.cdr.cdr.cdr.car, d), new sc_Pair(elt.cdr.cdr.cdr.cdr.car, e)]);
                  });
        }
      };
    return recur(lis);
  };
BgL_appendz12z12 = function() {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var rest;
    var next;
    var tail_cons;
    var rest_41;
    var g1276;
    var rest_42;
    var first;
    var lists_43;
    var prev;
    var g1275;
    g1275 = null;
    lists_43 = lists;
    prev = g1275;
    while (!!(lists_43 instanceof sc_Pair)) {
      first = lists_43.car;
      rest_42 = lists_43.cdr;
      if (!(first instanceof sc_Pair)) {
        lists_43 = rest_42;
        prev = first;
      } else {
        g1276 = BgL_lastzd2pairzd2(first);
        tail_cons = g1276;
        rest_41 = rest_42;
        while (rest_41 instanceof sc_Pair) {
          next = rest_41.car;
          rest = rest_41.cdr;
          tail_cons.cdr = next;
          if (next instanceof sc_Pair) {
            tail_cons = BgL_lastzd2pairzd2(next);
          }
          rest_41 = rest;
        }
        return first;
      }
    }
    return prev;
  };
BgL_appendzd2reversezd2 = function(rev_head, tail) {
    var rev_head_44;
    var tail_45;
    rev_head_44 = rev_head;
    tail_45 = tail;
    while (BgL_nullzd2listzf3z21(rev_head_44) === false) {
      tail_45 = new sc_Pair(rev_head_44.car, tail_45);
      rev_head_44 = rev_head_44.cdr;
    }
    return tail_45;
  };
BgL_appendzd2reversez12zc0 = function(rev_head, tail) {
    var next_rev;
    var rev_head_46;
    var tail_47;
    rev_head_46 = rev_head;
    tail_47 = tail;
    while (BgL_nullzd2listzf3z21(rev_head_46) === false) {
      next_rev = rev_head_46.cdr;
      rev_head_46.cdr = tail_47;
      tail_47 = rev_head_46;
      rev_head_46 = next_rev;
    }
    return tail_47;
  };
concatenate = function(lists) {
    return BgL_reducezd2rightzd2(sc_append, null, lists);
  };
BgL_concatenatez12z12 = function(lists) {
    return BgL_reducezd2rightzd2(BgL_appendz12z12, null, lists);
  };
BgL_z52cdrsz52 = function(lists) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var lis;
              var recur;
              recur = function(lists) {
                  var stmp;
                  var lis;
                  var lists_48;
                  var lis_49;
                  if (lists instanceof sc_Pair) {
                    lis_49 = lists.car;
                    if (BgL_nullzd2listzf3z21(lis_49) !== false) {
                      return abort(null);
                    } else {
                      lists_48 = lists.cdr;
                      if (lists_48 instanceof sc_Pair) {
                        lis = lists_48.car;
                        if (BgL_nullzd2listzf3z21(lis) !== false) {
                          stmp = abort(null);
                        } else {
                          stmp = new sc_Pair(lis.cdr, recur(lists_48.cdr));
                        }
                      } else {
                        stmp = null;
                      }
                      return new sc_Pair(lis_49.cdr, stmp);
                    }
                  } else {
                    return null;
                  }
                };
              if (lists instanceof sc_Pair) {
                lis = lists.car;
                if (BgL_nullzd2listzf3z21(lis) !== false) {
                  return abort(null);
                } else {
                  return new sc_Pair(lis.cdr, recur(lists.cdr));
                }
              } else {
                return null;
              }
            });
  };
BgL_z52carszb2ze0 = function(lists, last_elt) {
    var recur;
    recur = function(lists) {
        var stmp;
        var lists_50;
        if (lists instanceof sc_Pair) {
          lists_50 = lists.cdr;
          if (lists_50 instanceof sc_Pair) {
            stmp = new sc_Pair(lists_50.car.car, recur(lists_50.cdr));
          } else {
            stmp = sc_list(last_elt);
          }
          return new sc_Pair(lists.car.car, stmp);
        } else {
          return sc_list(last_elt);
        }
      };
    if (lists instanceof sc_Pair) {
      return new sc_Pair(lists.car.car, recur(lists.cdr));
    } else {
      return sc_list(last_elt);
    }
  };
BgL_z52carszb2cdrsze0 = function(lists) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var recur;
              recur = function(lists) {
                  if (lists instanceof sc_Pair) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(lists);
                            }, function(list, other_lists) {
                              if (BgL_nullzd2listzf3z21(list) !== false) {
                                return abort(null, null);
                              } else {
                                return sc_callWithValues(function() {
                                          return BgL_carzb2cdrzb2(list);
                                        }, function(a, d) {
                                          return sc_callWithValues(function() {
                                                    return recur(other_lists);
                                                  }, function(cars, cdrs) {
                                                    return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                                  });
                                        });
                              }
                            });
                  } else {
                    return new sc_Values([null, null]);
                  }
                };
              return recur(lists);
            });
  };
BgL_z52carszb2cdrszb2z52 = function(lists, cars_final) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var recur;
              recur = function(lists) {
                  if (lists instanceof sc_Pair) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(lists);
                            }, function(list, other_lists) {
                              if (BgL_nullzd2listzf3z21(list) !== false) {
                                return abort(null, null);
                              } else {
                                return sc_callWithValues(function() {
                                          return BgL_carzb2cdrzb2(list);
                                        }, function(a, d) {
                                          return sc_callWithValues(function() {
                                                    return recur(other_lists);
                                                  }, function(cars, cdrs) {
                                                    return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                                  });
                                        });
                              }
                            });
                  } else {
                    return new sc_Values([sc_list(cars_final), null]);
                  }
                };
              return recur(lists);
            });
  };
BgL_z52carszb2cdrszf2nozd2testzc0 = function(lists) {
    var recur;
    recur = function(lists) {
        if (lists instanceof sc_Pair) {
          return sc_callWithValues(function() {
                    return BgL_carzb2cdrzb2(lists);
                  }, function(list, other_lists) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(list);
                            }, function(a, d) {
                              return sc_callWithValues(function() {
                                        return recur(other_lists);
                                      }, function(cars, cdrs) {
                                        return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                      });
                            });
                  });
        } else {
          return new sc_Values([null, null]);
        }
      };
    return recur(lists);
  };
count = function(pred, list1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var i;
    var lp;
    BgL_checkzd2argzd2(sc_isProcedure, pred, count);
    if (lists instanceof sc_Pair) {
      lp = function(list1, lists, i) {
          if (BgL_nullzd2listzf3z21(list1) !== false) {
            return i;
          } else {
            return sc_callWithValues(function() {
                      return BgL_z52carszb2cdrsze0(lists);
                    }, function(as_51, ds) {
                      if (as_51 === null) {
                        return i;
                      } else {
                        return lp(list1.cdr, ds, sc_apply(pred, list1.car, as_51) !== false? i + 1: i);
                      }
                    });
          }
        };
      return lp(list1, lists, 0);
    } else {
      lis = list1;
      i = 0;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        if (pred(lis.car) !== false) {
          ++i;
        }
        lis = lis.cdr;
      }
      return i;
    }
  };
BgL_unfoldzd2rightzd2 = function(p, f, g, seed) {
    var maybe_tail = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 4; --sc_tmp) {
      maybe_tail = sc_cons(arguments[sc_tmp], maybe_tail);
    }
    var seed_52;
    var ans;
    var g1277;
    BgL_checkzd2argzd2(sc_isProcedure, p, BgL_unfoldzd2rightzd2);
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_unfoldzd2rightzd2);
    BgL_checkzd2argzd2(sc_isProcedure, g, BgL_unfoldzd2rightzd2);
    if (maybe_tail === null) {
      g1277 = null;
    } else {
      g1277 = maybe_tail.car;
    }
    seed_52 = seed;
    ans = g1277;
    while (p(seed_52) === false) {
      ans = new sc_Pair(f(seed_52), ans);
      seed_52 = g(seed_52);
    }
    return ans;
  };
unfold = function(p, f, g, seed) {
    var maybe_tail_gen = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 4; --sc_tmp) {
      maybe_tail_gen = sc_cons(arguments[sc_tmp], maybe_tail_gen);
    }
    var recur;
    var recur_53;
    var tail_gen;
    BgL_checkzd2argzd2(sc_isProcedure, p, unfold);
    BgL_checkzd2argzd2(sc_isProcedure, f, unfold);
    BgL_checkzd2argzd2(sc_isProcedure, g, unfold);
    if (maybe_tail_gen instanceof sc_Pair) {
      tail_gen = maybe_tail_gen.car;
      if (maybe_tail_gen.cdr instanceof sc_Pair) {
        return sc_apply(sc_error, BgL_sc_const_9z00_citation_structural_dynamic2_prog_tmp, unfold, p, f, g, seed, maybe_tail_gen);
      } else {
        recur_53 = function(seed) {
            var stmp;
            var seed_54;
            if (p(seed) !== false) {
              return tail_gen(seed);
            } else {
              seed_54 = g(seed);
              if (p(seed_54) !== false) {
                stmp = tail_gen(seed_54);
              } else {
                stmp = new sc_Pair(f(seed_54), recur_53(g(seed_54)));
              }
              return new sc_Pair(f(seed), stmp);
            }
          };
        if (p(seed) !== false) {
          return tail_gen(seed);
        } else {
          return new sc_Pair(f(seed), recur_53(g(seed)));
        }
      }
    } else {
      recur = function(seed) {
          var stmp;
          var seed_55;
          if (p(seed) !== false) {
            return null;
          } else {
            seed_55 = g(seed);
            if (p(seed_55) !== false) {
              stmp = null;
            } else {
              stmp = new sc_Pair(f(seed_55), recur(g(seed_55)));
            }
            return new sc_Pair(f(seed), stmp);
          }
        };
      if (p(seed) !== false) {
        return null;
      } else {
        return new sc_Pair(f(seed), recur(g(seed)));
      }
    }
  };
fold = function(kons, knil, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var ans;
    var lp;
    var g1278;
    BgL_checkzd2argzd2(sc_isProcedure, kons, fold);
    if (lists instanceof sc_Pair) {
      g1278 = new sc_Pair(lis1, lists);
      lp = function(lists, ans) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrszb2z52(lists, ans);
                  }, function(BgL_sc_carszb2ans_13zb2, cdrs) {
                    if (BgL_sc_carszb2ans_13zb2 === null) {
                      return ans;
                    } else {
                      return lp(cdrs, sc_apply(kons, BgL_sc_carszb2ans_13zb2));
                    }
                  });
        };
      return lp(g1278, knil);
    } else {
      lis = lis1;
      ans = knil;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        ans = kons(lis.car, ans);
        lis = lis.cdr;
      }
      return ans;
    }
  };
BgL_foldzd2rightzd2 = function(kons, knil, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var head;
    var recur;
    var cdrs;
    var recur_57;
    var g1279;
    BgL_checkzd2argzd2(sc_isProcedure, kons, BgL_foldzd2rightzd2);
    if (lists instanceof sc_Pair) {
      g1279 = new sc_Pair(lis1, lists);
      recur_57 = function(lists) {
          var stmp;
          var cdrs;
          var cdrs_58;
          cdrs_58 = BgL_z52cdrsz52(lists);
          if (cdrs_58 === null) {
            return knil;
          } else {
            cdrs = BgL_z52cdrsz52(cdrs_58);
            if (cdrs === null) {
              stmp = knil;
            } else {
              stmp = sc_apply(kons, BgL_z52carszb2ze0(cdrs_58, recur_57(cdrs)));
            }
            return sc_apply(kons, BgL_z52carszb2ze0(lists, stmp));
          }
        };
      cdrs = BgL_z52cdrsz52(g1279);
      if (cdrs === null) {
        return knil;
      } else {
        return sc_apply(kons, BgL_z52carszb2ze0(g1279, recur_57(cdrs)));
      }
    } else {
      recur = function(lis) {
          var stmp;
          var head;
          var lis_59;
          var head_60;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return knil;
          } else {
            head_60 = lis.car;
            lis_59 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_59) !== false) {
              stmp = knil;
            } else {
              head = lis_59.car;
              stmp = kons(head, recur(lis_59.cdr));
            }
            return kons(head_60, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return knil;
      } else {
        head = lis1.car;
        return kons(head, recur(lis1.cdr));
      }
    }
  };
BgL_pairzd2foldzd2rightz00 = function(f, zero, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var recur;
    var cdrs;
    var recur_61;
    var g1280;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_pairzd2foldzd2rightz00);
    if (lists instanceof sc_Pair) {
      g1280 = new sc_Pair(lis1, lists);
      recur_61 = function(lists) {
          var stmp;
          var cdrs;
          var cdrs_62;
          cdrs_62 = BgL_z52cdrsz52(lists);
          if (cdrs_62 === null) {
            return zero;
          } else {
            cdrs = BgL_z52cdrsz52(cdrs_62);
            stmp = sc_list(cdrs === null? zero: sc_apply(f, BgL_appendz12z12(cdrs_62, sc_list(recur_61(cdrs)))));
            return sc_apply(f, BgL_appendz12z12(lists, stmp));
          }
        };
      cdrs = BgL_z52cdrsz52(g1280);
      if (cdrs === null) {
        return zero;
      } else {
        return sc_apply(f, BgL_appendz12z12(g1280, sc_list(recur_61(cdrs))));
      }
    } else {
      recur = function(lis) {
          var stmp;
          var stmp_63;
          var lis_64;
          var lis_65;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return zero;
          } else {
            lis_65 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_65) !== false) {
              stmp = zero;
            } else {
              lis_64 = lis_65.cdr;
              if (BgL_nullzd2listzf3z21(lis_64) !== false) {
                stmp_63 = zero;
              } else {
                stmp_63 = f(lis_64, recur(lis_64.cdr));
              }
              stmp = f(lis_65, stmp_63);
            }
            return f(lis, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return zero;
      } else {
        lis = lis1.cdr;
        return f(lis1, BgL_nullzd2listzf3z21(lis) !== false? zero: f(lis, recur(lis.cdr)));
      }
    }
  };
BgL_pairzd2foldzd2 = function(f, zero, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tail;
    var lis;
    var ans;
    var tails;
    var lists_66;
    var ans_67;
    var g1281;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_pairzd2foldzd2);
    if (lists instanceof sc_Pair) {
      g1281 = new sc_Pair(lis1, lists);
      lists_66 = g1281;
      ans_67 = zero;
      do {
        tails = BgL_z52cdrsz52(lists_66);
        if (tails === null) {
          return ans_67;
        } else {
          ans_67 = sc_apply(f, BgL_appendz12z12(lists_66, sc_list(ans_67)));
          lists_66 = tails;
        }
      } while (true);
    } else {
      lis = lis1;
      ans = zero;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        tail = lis.cdr;
        ans = f(lis, ans);
        lis = tail;
      }
      return ans;
    }
  };
reduce = function(f, ridentity, lis) {
    BgL_checkzd2argzd2(sc_isProcedure, f, reduce);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return ridentity;
    } else {
      return fold(f, lis.car, lis.cdr);
    }
  };
BgL_reducezd2rightzd2 = function(f, ridentity, lis) {
    var recur;
    var g1283;
    var g1282;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_reducezd2rightzd2);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return ridentity;
    } else {
      g1282 = lis.car;
      g1283 = lis.cdr;
      recur = function(head, lis) {
          var stmp;
          var lis_68;
          var head_69;
          if (lis instanceof sc_Pair) {
            head_69 = lis.car;
            lis_68 = lis.cdr;
            if (lis_68 instanceof sc_Pair) {
              stmp = f(head_69, recur(lis_68.car, lis_68.cdr));
            } else {
              stmp = head_69;
            }
            return f(head, stmp);
          } else {
            return head;
          }
        };
      if (g1283 instanceof sc_Pair) {
        return f(g1282, recur(g1283.car, g1283.cdr));
      } else {
        return g1282;
      }
    }
  };
BgL_appendzd2mapzd2 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    return BgL_reallyzd2appendzd2mapz00(BgL_appendzd2mapzd2, sc_append, f, lis1, lists);
  };
BgL_appendzd2mapz12zc0 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    return BgL_reallyzd2appendzd2mapz00(BgL_appendzd2mapz12zc0, BgL_appendz12z12, f, lis1, lists);
  };
BgL_reallyzd2appendzd2mapz00 = function(who, appender, f, lis1, lists) {
    var vals;
    var recur;
    var g1285;
    var g1284;
    BgL_checkzd2argzd2(sc_isProcedure, f, who);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(cars, cdrs) {
                var recur;
                if (cars === null) {
                  return null;
                } else {
                  recur = function(cars, cdrs) {
                      var vals;
                      vals = sc_apply(f, cars);
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(cdrs);
                              }, function(cars2, cdrs2) {
                                if (cars2 === null) {
                                  return vals;
                                } else {
                                  return appender(vals, recur(cars2, cdrs2));
                                }
                              });
                    };
                  return recur(cars, cdrs);
                }
              });
    } else {
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return null;
      } else {
        g1284 = lis1.car;
        g1285 = lis1.cdr;
        recur = function(elt, rest) {
            var stmp;
            var vals;
            var rest_70;
            var elt_71;
            var vals_72;
            vals_72 = f(elt);
            if (BgL_nullzd2listzf3z21(rest) !== false) {
              return vals_72;
            } else {
              elt_71 = rest.car;
              rest_70 = rest.cdr;
              vals = f(elt_71);
              if (BgL_nullzd2listzf3z21(rest_70) !== false) {
                stmp = vals;
              } else {
                stmp = appender(vals, recur(rest_70.car, rest_70.cdr));
              }
              return appender(vals_72, stmp);
            }
          };
        vals = f(g1284);
        if (BgL_nullzd2listzf3z21(g1285) !== false) {
          return vals;
        } else {
          return appender(vals, recur(g1285.car, g1285.cdr));
        }
      }
    }
  };
BgL_pairzd2forzd2eachz00 = function(proc, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tail;
    var lis;
    var tails;
    var lists_73;
    var g1286;
    BgL_checkzd2argzd2(sc_isProcedure, proc, BgL_pairzd2forzd2eachz00);
    if (lists instanceof sc_Pair) {
      g1286 = new sc_Pair(lis1, lists);
      lists_73 = g1286;
      do {
        tails = BgL_z52cdrsz52(lists_73);
        if (tails instanceof sc_Pair) {
          sc_apply(proc, lists_73);
          lists_73 = tails;
        } else {
          return false;
        }
      } while (true);
    } else {
      lis = lis1;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        tail = lis.cdr;
        proc(lis);
        lis = tail;
      }
      return false;
    }
  };
BgL_mapz12z12 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lp;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_mapz12z12);
    if (lists instanceof sc_Pair) {
      lp = function(lis1, lists) {
          if (BgL_nullzd2listzf3z21(lis1) === false) {
            return sc_callWithValues(function() {
                      return BgL_z52carszb2cdrszf2nozd2testzc0(lists);
                    }, function(heads, tails) {
                      lis1.car = sc_apply(f, lis1.car, heads);
                      return lp(lis1.cdr, tails);
                    });
          } else {
            return false;
          }
        };
      lp(lis1, lists);
    } else {
      BgL_pairzd2forzd2eachz00(function(pair) {
          return pair.car = f(pair.car);
        }, lis1);
    }
    return lis1;
  };
BgL_filterzd2mapzd2 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var recur;
    var recur_74;
    var g1287;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_filterzd2mapzd2);
    if (lists instanceof sc_Pair) {
      g1287 = new sc_Pair(lis1, lists);
      recur_74 = function(lists) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(cars, cdrs) {
                    var g1289;
                    if (cars instanceof sc_Pair) {
                      g1289 = sc_apply(f, cars);
                      if (g1289 !== false) {
                        return new sc_Pair(g1289, recur_74(cdrs));
                      } else {
                        return recur_74(cdrs);
                      }
                    } else {
                      return null;
                    }
                  });
        };
      return recur_74(g1287);
    } else {
      recur = function(lis) {
          var g1291;
          var tail;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return lis;
          } else {
            tail = recur(lis.cdr);
            g1291 = f(lis.car);
            if (g1291 !== false) {
              return new sc_Pair(g1291, tail);
            } else {
              return tail;
            }
          }
        };
      return recur(lis1);
    }
  };
BgL_mapzd2inzd2orderz00 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var x;
    var tail;
    var recur;
    var recur_75;
    var g1292;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_mapzd2inzd2orderz00);
    if (lists instanceof sc_Pair) {
      g1292 = new sc_Pair(lis1, lists);
      recur_75 = function(lists) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(cars, cdrs) {
                    var x;
                    if (cars instanceof sc_Pair) {
                      x = sc_apply(f, cars);
                      return new sc_Pair(x, recur_75(cdrs));
                    } else {
                      return null;
                    }
                  });
        };
      return recur_75(g1292);
    } else {
      recur = function(lis) {
          var stmp;
          var x;
          var tail;
          var x_76;
          var tail_77;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return lis;
          } else {
            tail_77 = lis.cdr;
            x_76 = f(lis.car);
            if (BgL_nullzd2listzf3z21(tail_77) !== false) {
              stmp = tail_77;
            } else {
              tail = tail_77.cdr;
              x = f(tail_77.car);
              stmp = new sc_Pair(x, recur(tail));
            }
            return new sc_Pair(x_76, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return lis1;
      } else {
        tail = lis1.cdr;
        x = f(lis1.car);
        return new sc_Pair(x, recur(tail));
      }
    }
  };
map = BgL_mapzd2inzd2orderz00;
filter = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, filter);
    recur = function(lis) {
        var new_tail;
        var tail;
        var head;
        var lis_78;
        lis_78 = lis;
        while (BgL_nullzd2listzf3z21(lis_78) === false) {
          head = lis_78.car;
          tail = lis_78.cdr;
          if (pred(head) !== false) {
            new_tail = recur(tail);
            if (tail === new_tail) {
              return lis_78;
            } else {
              return new sc_Pair(head, new_tail);
            }
          } else {
            lis_78 = tail;
          }
        }
        return lis_78;
      };
    return recur(lis);
  };
BgL_filterz12z12 = function(pred, lis) {
    var lis_79;
    var lis_80;
    var prev;
    var lis_81;
    var prev_82;
    var lis_83;
    var lis_84;
    var ans;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_filterz12z12);
    ans = lis;
    while (BgL_nullzd2listzf3z21(ans) === false) {
      if (pred(ans.car) === false) {
        ans = ans.cdr;
      } else {
        lis_84 = ans.cdr;
        BgL_whilezd2break1556zd2: {
          prev_82 = ans;
          lis_83 = lis_84;
          continue1523:
            do {
              prev = prev_82;
              lis_81 = lis_83;
              while (lis_81 instanceof sc_Pair) {
                if (pred(lis_81.car) !== false) {
                  prev = lis_81;
                  lis_81 = lis_81.cdr;
                } else {
                  lis_80 = lis_81.cdr;
                  lis_79 = lis_80;
                  while (lis_79 instanceof sc_Pair) {
                    if (pred(lis_79.car) !== false) {
                      prev.cdr = lis_79;
                      prev_82 = lis_79;
                      lis_83 = lis_79.cdr;
                      continue continue1523;
                    } else {
                      lis_79 = lis_79.cdr;
                    }
                  }
                  {
                    prev.cdr = lis_79;
                    break BgL_whilezd2break1556zd2;
                  }
                }
              }
              {
                false;
                break BgL_whilezd2break1556zd2;
              }
            } while (true);
        }
        return ans;
      }
    }
    return ans;
  };
partition = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, partition);
    recur = function(lis) {
        var tail;
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis]);
        } else {
          elt = lis.car;
          tail = lis.cdr;
          return sc_callWithValues(function() {
                    return recur(tail);
                  }, function(in_85, out) {
                    if (pred(elt) !== false) {
                      return new sc_Values([out instanceof sc_Pair? new sc_Pair(elt, in_85): lis, out]);
                    } else {
                      return new sc_Values([in_85, in_85 instanceof sc_Pair? new sc_Pair(elt, out): lis]);
                    }
                  });
        }
      };
    return recur(lis);
  };
BgL_partitionz12z12 = function(pred, lis) {
    var prev_l;
    var l;
    var prev_l_86;
    var l_87;
    var g1294;
    var g1293;
    var scan_in;
    var scan_out;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_partitionz12z12);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return new sc_Values([lis, lis]);
    } else {
      scan_in = function(in_prev, out_prev, lis) {
          var in_prev_88;
          var lis_89;
          in_prev_88 = in_prev;
          lis_89 = lis;
          while (lis_89 instanceof sc_Pair) {
            if (pred(lis_89.car) !== false) {
              in_prev_88 = lis_89;
              lis_89 = lis_89.cdr;
            } else {
              out_prev.cdr = lis_89;
              return scan_out(in_prev_88, lis_89, lis_89.cdr);
            }
          }
          return out_prev.cdr = lis_89;
        };
      scan_out = function(in_prev, out_prev, lis) {
          var out_prev_90;
          var lis_91;
          out_prev_90 = out_prev;
          lis_91 = lis;
          while (lis_91 instanceof sc_Pair) {
            if (pred(lis_91.car) !== false) {
              in_prev.cdr = lis_91;
              return scan_in(lis_91, out_prev_90, lis_91.cdr);
            } else {
              out_prev_90 = lis_91;
              lis_91 = lis_91.cdr;
            }
          }
          return in_prev.cdr = lis_91;
        };
      if (pred(lis.car) !== false) {
        g1293 = lis.cdr;
        prev_l_86 = lis;
        l_87 = g1293;
        while (!!(l_87 instanceof sc_Pair)) {
          if (pred(l_87.car) !== false) {
            prev_l_86 = l_87;
            l_87 = l_87.cdr;
          } else {
            scan_out(prev_l_86, l_87, l_87.cdr);
            return new sc_Values([lis, l_87]);
          }
        }
        return new sc_Values([lis, l_87]);
      } else {
        g1294 = lis.cdr;
        prev_l = lis;
        l = g1294;
        while (!!(l instanceof sc_Pair)) {
          if (pred(l.car) !== false) {
            scan_in(l, prev_l, l.cdr);
            return new sc_Values([l, lis]);
          } else {
            prev_l = l;
            l = l.cdr;
          }
        }
        return new sc_Values([l, lis]);
      }
    }
  };
remove = function(pred, l) {
    return filter(function(x) {
              return pred(x) === false;
            }, l);
  };
BgL_removez12z12 = function(pred, l) {
    return BgL_filterz12z12(function(x) {
              return pred(x) === false;
            }, l);
  };
BgL_deletez00 = function(x, lis) {
    var BgL_sc_maybezd2zd3_14z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_14z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_14z01);
    }
    var BgL_sc_zd3_15zd3;
    if (BgL_sc_maybezd2zd3_14z01 === null) {
      BgL_sc_zd3_15zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_15zd3 = BgL_sc_maybezd2zd3_14z01.car;
    }
    return filter(function(y) {
              return BgL_sc_zd3_15zd3(x, y) === false;
            }, lis);
  };
BgL_deletez12z12 = function(x, lis) {
    var BgL_sc_maybezd2zd3_16z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_16z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_16z01);
    }
    var BgL_sc_zd3_17zd3;
    if (BgL_sc_maybezd2zd3_16z01 === null) {
      BgL_sc_zd3_17zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_17zd3 = BgL_sc_maybezd2zd3_16z01.car;
    }
    return BgL_filterz12z12(function(y) {
              return BgL_sc_zd3_17zd3(x, y) === false;
            }, lis);
  };
member = function(x, lis) {
    var BgL_sc_maybezd2zd3_18z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_18z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_18z01);
    }
    var BgL_sc_zd3_19zd3;
    if (BgL_sc_maybezd2zd3_18z01 === null) {
      BgL_sc_zd3_19zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_19zd3 = BgL_sc_maybezd2zd3_18z01.car;
    }
    return BgL_findzd2tailzd2(function(y) {
              return BgL_sc_zd3_19zd3(x, y);
            }, lis);
  };
BgL_deletezd2duplicateszd2 = function(lis) {
    var BgL_sc_maybezd2zd3_20z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      BgL_sc_maybezd2zd3_20z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_20z01);
    }
    var recur;
    var BgL_sc_eltzd3_21zd3;
    if (BgL_sc_maybezd2zd3_20z01 === null) {
      BgL_sc_eltzd3_21zd3 = sc_isEqual;
    } else {
      BgL_sc_eltzd3_21zd3 = BgL_sc_maybezd2zd3_20z01.car;
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_eltzd3_21zd3, BgL_deletezd2duplicateszd2);
    recur = function(lis) {
        var new_tail;
        var tail;
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return lis;
        } else {
          x = lis.car;
          tail = lis.cdr;
          new_tail = recur(BgL_deletez00(x, tail, BgL_sc_eltzd3_21zd3));
          if (tail === new_tail) {
            return lis;
          } else {
            return new sc_Pair(x, new_tail);
          }
        }
      };
    return recur(lis);
  };
BgL_deletezd2duplicatesz12zc0 = function(lis, BgL_sc_maybezd2zd3_22z01) {
    var recur;
    var BgL_sc_eltzd3_23zd3;
    if (BgL_sc_maybezd2zd3_22z01 === null) {
      BgL_sc_eltzd3_23zd3 = sc_isEqual;
    } else {
      BgL_sc_eltzd3_23zd3 = BgL_sc_maybezd2zd3_22z01.car;
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_eltzd3_23zd3, BgL_deletezd2duplicatesz12zc0);
    recur = function(lis) {
        var new_tail;
        var tail;
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return lis;
        } else {
          x = lis.car;
          tail = lis.cdr;
          new_tail = recur(BgL_deletez12z12(x, tail, BgL_sc_eltzd3_23zd3));
          if (tail === new_tail) {
            return lis;
          } else {
            return new sc_Pair(x, new_tail);
          }
        }
      };
    return recur(lis);
  };
assoc = function(x, lis) {
    var BgL_sc_maybezd2zd3_24z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_24z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_24z01);
    }
    var BgL_sc_zd3_25zd3;
    if (BgL_sc_maybezd2zd3_24z01 === null) {
      BgL_sc_zd3_25zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_25zd3 = BgL_sc_maybezd2zd3_24z01.car;
    }
    return find(function(entry) {
              return BgL_sc_zd3_25zd3(x, entry.car);
            }, lis);
  };
BgL_alistzd2conszd2 = function(key, datum, alist) {
    return new sc_Pair(new sc_Pair(key, datum), alist);
  };
BgL_alistzd2copyzd2 = function(alist) {
    return map(function(elt) {
              return new sc_Pair(elt.car, elt.cdr);
            }, alist);
  };
BgL_alistzd2deletezd2 = function(key, alist) {
    var BgL_sc_maybezd2zd3_26z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_26z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_26z01);
    }
    var BgL_sc_zd3_27zd3;
    if (BgL_sc_maybezd2zd3_26z01 === null) {
      BgL_sc_zd3_27zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_27zd3 = BgL_sc_maybezd2zd3_26z01.car;
    }
    return filter(function(elt) {
              return BgL_sc_zd3_27zd3(key, elt.car) === false;
            }, alist);
  };
BgL_alistzd2deletez12zc0 = function(key, alist) {
    var BgL_sc_maybezd2zd3_28z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_28z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_28z01);
    }
    var BgL_sc_zd3_29zd3;
    if (BgL_sc_maybezd2zd3_28z01 === null) {
      BgL_sc_zd3_29zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_29zd3 = BgL_sc_maybezd2zd3_28z01.car;
    }
    return BgL_filterz12z12(function(elt) {
              return BgL_sc_zd3_29zd3(key, elt.car) === false;
            }, alist);
  };
find = function(pred, list) {
    var g1296;
    g1296 = BgL_findzd2tailzd2(pred, list);
    if (g1296 !== false) {
      return g1296.car;
    } else {
      return false;
    }
  };
BgL_findzd2tailzd2 = function(pred, list) {
    var list_108;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_findzd2tailzd2);
    list_108 = list;
    while (BgL_nullzd2listzf3z21(list_108) === false) {
      if (pred(list_108.car) !== false) {
        return list_108;
      } else {
        list_108 = list_108.cdr;
      }
    }
    return false;
  };
BgL_takezd2whilezd2 = function(pred, lis) {
    var x;
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_takezd2whilezd2);
    recur = function(lis) {
        var stmp;
        var x;
        var lis_109;
        var x_110;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return null;
        } else {
          x_110 = lis.car;
          if (pred(x_110) !== false) {
            lis_109 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_109) !== false) {
              stmp = null;
            } else {
              x = lis_109.car;
              if (pred(x) !== false) {
                stmp = new sc_Pair(x, recur(lis_109.cdr));
              } else {
                stmp = null;
              }
            }
            return new sc_Pair(x_110, stmp);
          } else {
            return null;
          }
        }
      };
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return null;
    } else {
      x = lis.car;
      if (pred(x) !== false) {
        return new sc_Pair(x, recur(lis.cdr));
      } else {
        return null;
      }
    }
  };
BgL_dropzd2whilezd2 = function(pred, lis) {
    var lis_111;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_dropzd2whilezd2);
    lis_111 = lis;
    while (BgL_nullzd2listzf3z21(lis_111) === false) {
      if (pred(lis_111.car) !== false) {
        lis_111 = lis_111.cdr;
      } else {
        return lis_111;
      }
    }
    return null;
  };
BgL_takezd2whilez12zc0 = function(pred, lis) {
    var x;
    var prev;
    var rest;
    var g1298;
    var tmp1297;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_takezd2whilez12zc0);
    tmp1297 = BgL_nullzd2listzf3z21(lis);
    if ((tmp1297 !== false? tmp1297: pred(lis.car) === false) !== false) {
      return null;
    } else {
      g1298 = lis.cdr;
      BgL_whilezd2break1564zd2: {
        prev = lis;
        rest = g1298;
        while (rest instanceof sc_Pair) {
          x = rest.car;
          if (pred(x) !== false) {
            prev = rest;
            rest = rest.cdr;
          } else {
            {
              prev.cdr = null;
              break BgL_whilezd2break1564zd2;
            }
          }
        }
      }
      return lis;
    }
  };
span = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, span);
    recur = function(lis) {
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([null, null]);
        } else {
          x = lis.car;
          if (pred(x) !== false) {
            return sc_callWithValues(function() {
                      return recur(lis.cdr);
                    }, function(prefix, suffix) {
                      return new sc_Values([new sc_Pair(x, prefix), suffix]);
                    });
          } else {
            return new sc_Values([null, lis]);
          }
        }
      };
    return recur(lis);
  };
BgL_spanz12z12 = function(pred, lis) {
    var x;
    var prev;
    var rest;
    var suffix;
    var g1300;
    var tmp1299;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_spanz12z12);
    tmp1299 = BgL_nullzd2listzf3z21(lis);
    if ((tmp1299 !== false? tmp1299: pred(lis.car) === false) !== false) {
      return new sc_Values([null, lis]);
    } else {
      g1300 = lis.cdr;
      BgL_whilezd2break1565zd2: {
        prev = lis;
        rest = g1300;
        while (BgL_nullzd2listzf3z21(rest) === false) {
          x = rest.car;
          if (pred(x) !== false) {
            prev = rest;
            rest = rest.cdr;
          } else {
            prev.cdr = null;
            {
              suffix = rest;
              break BgL_whilezd2break1565zd2;
            }
          }
        }
        suffix = rest;
      }
      return new sc_Values([lis, suffix]);
    }
  };
BgL_breakz00 = function(pred, lis) {
    return span(function(x) {
              return pred(x) === false;
            }, lis);
  };
BgL_breakz12z12 = function(pred, lis) {
    return BgL_spanz12z12(function(x) {
              return pred(x) === false;
            }, lis);
  };
any = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1304;
    var head;
    var tail;
    var g1303;
    var g1302;
    BgL_checkzd2argzd2(sc_isProcedure, pred, any);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(heads, tails) {
                var lp;
                if (heads instanceof sc_Pair) {
                  lp = function(heads, tails) {
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(tails);
                              }, function(next_heads, next_tails) {
                                var tmp1301;
                                if (next_heads instanceof sc_Pair) {
                                  tmp1301 = sc_apply(pred, heads);
                                  if (tmp1301 !== false) {
                                    return tmp1301;
                                  } else {
                                    return lp(next_heads, next_tails);
                                  }
                                } else {
                                  return sc_apply(pred, heads);
                                }
                              });
                    };
                  return lp(heads, tails);
                } else {
                  return false;
                }
              });
    } else {
      if (BgL_nullzd2listzf3z21(lis1) === false) {
        g1302 = lis1.car;
        g1303 = lis1.cdr;
        head = g1302;
        tail = g1303;
        while (BgL_nullzd2listzf3z21(tail) === false) {
          tmp1304 = pred(head);
          if (tmp1304 !== false) {
            return tmp1304;
          } else {
            head = tail.car;
            tail = tail.cdr;
          }
        }
        return pred(head);
      } else {
        return false;
      }
    }
  };
every = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var head;
    var tail;
    var g1308;
    var g1307;
    var tmp1306;
    BgL_checkzd2argzd2(sc_isProcedure, pred, every);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(heads, tails) {
                var lp;
                var tmp1305;
                tmp1305 = !(heads instanceof sc_Pair);
                if (tmp1305 !== false) {
                  return tmp1305;
                } else {
                  lp = function(heads, tails) {
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(tails);
                              }, function(next_heads, next_tails) {
                                if (next_heads instanceof sc_Pair) {
                                  if (sc_apply(pred, heads) !== false) {
                                    return lp(next_heads, next_tails);
                                  } else {
                                    return false;
                                  }
                                } else {
                                  return sc_apply(pred, heads);
                                }
                              });
                    };
                  return lp(heads, tails);
                }
              });
    } else {
      tmp1306 = BgL_nullzd2listzf3z21(lis1);
      if (tmp1306 !== false) {
        return tmp1306;
      } else {
        g1307 = lis1.car;
        g1308 = lis1.cdr;
        head = g1307;
        tail = g1308;
        while (BgL_nullzd2listzf3z21(tail) === false) {
          if (pred(head) !== false) {
            head = tail.car;
            tail = tail.cdr;
          } else {
            return false;
          }
        }
        return pred(head);
      }
    }
  };
BgL_listzd2indexzd2 = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var n;
    var lp;
    var g1309;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_listzd2indexzd2);
    if (lists instanceof sc_Pair) {
      g1309 = new sc_Pair(lis1, lists);
      lp = function(lists, n) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(heads, tails) {
                    if (heads instanceof sc_Pair) {
                      if (sc_apply(pred, heads) !== false) {
                        return n;
                      } else {
                        return lp(tails, n + 1);
                      }
                    } else {
                      return false;
                    }
                  });
        };
      return lp(g1309, 0);
    } else {
      lis = lis1;
      n = 0;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        if (pred(lis.car) !== false) {
          return n;
        } else {
          lis = lis.cdr;
          ++n;
        }
      }
      return false;
    }
  };
BgL_reversez12z12 = function(lis) {
    var tail;
    var lis_112;
    var ans;
    var g1310;
    g1310 = null;
    lis_112 = lis;
    ans = g1310;
    while (BgL_nullzd2listzf3z21(lis_112) === false) {
      tail = lis_112.cdr;
      lis_112.cdr = ans;
      ans = lis_112;
      lis_112 = tail;
    }
    return ans;
  };
BgL_z52lset2zc3zd3z42 = function(BgL_sc_zd3_30zd3, lis1, lis2) {
    return every(function(x) {
              return member(x, lis2, BgL_sc_zd3_30zd3);
            }, lis1);
  };
BgL_lsetzc3zd3z10 = function(BgL_sc_zd3_31zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1315;
    var rest;
    var s2;
    var tmp1314;
    var s1;
    var rest_115;
    var g1313;
    var g1312;
    var tmp1311;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_31zd3, BgL_lsetzc3zd3z10);
    tmp1311 = !(lists instanceof sc_Pair);
    if (tmp1311 !== false) {
      return tmp1311;
    } else {
      g1312 = lists.car;
      g1313 = lists.cdr;
      s1 = g1312;
      rest_115 = g1313;
      do {
        tmp1314 = !(rest_115 instanceof sc_Pair);
        if (tmp1314 !== false) {
          return tmp1314;
        } else {
          s2 = rest_115.car;
          rest = rest_115.cdr;
          tmp1315 = s2 === s1;
          if ((tmp1315 !== false? tmp1315: BgL_z52lset2zc3zd3z42(BgL_sc_zd3_31zd3, s1, s2)) !== false) {
            s1 = s2;
            rest_115 = rest;
          } else {
            return false;
          }
        }
      } while (true);
    }
  };
BgL_lsetzd3zd3 = function(BgL_sc_zd3_32zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1320;
    var rest;
    var s2;
    var tmp1319;
    var s1;
    var rest_117;
    var g1318;
    var g1317;
    var tmp1316;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_32zd3, BgL_lsetzd3zd3);
    tmp1316 = !(lists instanceof sc_Pair);
    if (tmp1316 !== false) {
      return tmp1316;
    } else {
      g1317 = lists.car;
      g1318 = lists.cdr;
      s1 = g1317;
      rest_117 = g1318;
      do {
        tmp1319 = !(rest_117 instanceof sc_Pair);
        if (tmp1319 !== false) {
          return tmp1319;
        } else {
          s2 = rest_117.car;
          rest = rest_117.cdr;
          tmp1320 = s1 === s2;
          if ((tmp1320 !== false? tmp1320: BgL_z52lset2zc3zd3z42(BgL_sc_zd3_32zd3, s1, s2) !== false && BgL_z52lset2zc3zd3z42(BgL_sc_zd3_32zd3, s2, s1)) !== false) {
            s1 = s2;
            rest_117 = rest;
          } else {
            return false;
          }
        }
      } while (true);
    }
  };
BgL_lsetzd2adjoinzd2 = function(BgL_sc_zd3_33zd3, lis) {
    var elts = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      elts = sc_cons(arguments[sc_tmp], elts);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_33zd3, BgL_lsetzd2adjoinzd2);
    return fold(function(elt, ans) {
              if (member(elt, ans, BgL_sc_zd3_33zd3) !== false) {
                return ans;
              } else {
                return new sc_Pair(elt, ans);
              }
            }, lis, elts);
  };
BgL_lsetzd2unionzd2 = function(BgL_sc_zd3_34zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_34zd3, BgL_lsetzd2unionzd2);
    return reduce(function(lis, ans) {
              if (lis === null) {
                return ans;
              } else {
                if (ans === null) {
                  return lis;
                } else {
                  if (lis === ans) {
                    return ans;
                  } else {
                    return fold(function(elt, ans) {
                              if (any(function(x) {
                                      return BgL_sc_zd3_34zd3(x, elt);
                                    }, ans) !== false) {
                                return ans;
                              } else {
                                return new sc_Pair(elt, ans);
                              }
                            }, ans, lis);
                  }
                }
              }
            }, null, lists);
  };
BgL_lsetzd2unionz12zc0 = function(BgL_sc_zd3_35zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_35zd3, BgL_lsetzd2unionz12zc0);
    return reduce(function(lis, ans) {
              if (lis === null) {
                return ans;
              } else {
                if (ans === null) {
                  return lis;
                } else {
                  if (lis === ans) {
                    return ans;
                  } else {
                    return BgL_pairzd2foldzd2(function(pair, ans) {
                              var elt;
                              elt = pair.car;
                              if (any(function(x) {
                                      return BgL_sc_zd3_35zd3(x, elt);
                                    }, ans) !== false) {
                                return ans;
                              } else {
                                pair.cdr = ans;
                                return pair;
                              }
                            }, ans, lis);
                  }
                }
              }
            }, null, lists);
  };
BgL_lsetzd2intersectionzd2 = function(BgL_sc_zd3_36zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_122;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_36zd3, BgL_lsetzd2intersectionzd2);
    lists_122 = BgL_deletez00(lis1, lists, sc_isEq);
    if (any(BgL_nullzd2listzf3z21, lists_122) !== false) {
      return null;
    } else {
      if (lists_122 === null) {
        return lis1;
      } else {
        return filter(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_36zd3);
                          }, lists_122);
                }, lis1);
      }
    }
  };
BgL_lsetzd2intersectionz12zc0 = function(BgL_sc_zd3_37zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_124;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_37zd3, BgL_lsetzd2intersectionz12zc0);
    lists_124 = BgL_deletez00(lis1, lists, sc_isEq);
    if (any(BgL_nullzd2listzf3z21, lists_124) !== false) {
      return null;
    } else {
      if (lists_124 === null) {
        return lis1;
      } else {
        return BgL_filterz12z12(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_37zd3);
                          }, lists_124);
                }, lis1);
      }
    }
  };
BgL_lsetzd2differencezd2 = function(BgL_sc_zd3_38zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_126;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_38zd3, BgL_lsetzd2differencezd2);
    lists_126 = filter(sc_isPair, lists);
    if (lists_126 === null) {
      return lis1;
    } else {
      if (sc_memq(lis1, lists_126) !== false) {
        return null;
      } else {
        return filter(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_38zd3) === false;
                          }, lists_126);
                }, lis1);
      }
    }
  };
BgL_lsetzd2differencez12zc0 = function(BgL_sc_zd3_39zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_128;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_39zd3, BgL_lsetzd2differencez12zc0);
    lists_128 = filter(sc_isPair, lists);
    if (lists_128 === null) {
      return lis1;
    } else {
      if (sc_memq(lis1, lists_128) !== false) {
        return null;
      } else {
        return BgL_filterz12z12(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_39zd3) === false;
                          }, lists_128);
                }, lis1);
      }
    }
  };
BgL_lsetzd2xorzd2 = function(BgL_sc_zd3_40zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_40zd3, BgL_lsetzd2xorzd2);
    return reduce(function(b, a) {
              return sc_callWithValues(function() {
                        return BgL_lsetzd2diffzb2intersectionz60(BgL_sc_zd3_40zd3, a, b);
                      }, function(a_b, a_int_b) {
                        if (a_b === null) {
                          return BgL_lsetzd2differencezd2(BgL_sc_zd3_40zd3, b, a);
                        } else {
                          if (a_int_b === null) {
                            return sc_append(b, a);
                          } else {
                            return fold(function(xb, ans) {
                                      if (member(xb, a_int_b, BgL_sc_zd3_40zd3) !== false) {
                                        return ans;
                                      } else {
                                        return new sc_Pair(xb, ans);
                                      }
                                    }, a_b, b);
                          }
                        }
                      });
            }, null, lists);
  };
BgL_lsetzd2xorz12zc0 = function(BgL_sc_zd3_41zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_41zd3, BgL_lsetzd2xorz12zc0);
    return reduce(function(b, a) {
              return sc_callWithValues(function() {
                        return BgL_lsetzd2diffzb2intersectionz12z72(BgL_sc_zd3_41zd3, a, b);
                      }, function(a_b, a_int_b) {
                        if (a_b === null) {
                          return BgL_lsetzd2differencez12zc0(BgL_sc_zd3_41zd3, b, a);
                        } else {
                          if (a_int_b === null) {
                            return BgL_appendz12z12(b, a);
                          } else {
                            return BgL_pairzd2foldzd2(function(b_pair, ans) {
                                      if (member(b_pair.car, a_int_b, BgL_sc_zd3_41zd3) !== false) {
                                        return ans;
                                      } else {
                                        b_pair.cdr = ans;
                                        return b_pair;
                                      }
                                    }, a_b, b);
                          }
                        }
                      });
            }, null, lists);
  };
BgL_lsetzd2diffzb2intersectionz60 = function(BgL_sc_zd3_42zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_42zd3, BgL_lsetzd2diffzb2intersectionz60);
    if (every(BgL_nullzd2listzf3z21, lists) !== false) {
      return new sc_Values([lis1, null]);
    } else {
      if (sc_memq(lis1, lists) !== false) {
        return new sc_Values([null, lis1]);
      } else {
        return partition(function(elt) {
                  return any(function(lis) {
                            return member(elt, lis, BgL_sc_zd3_42zd3);
                          }, lists) === false;
                }, lis1);
      }
    }
  };
BgL_lsetzd2diffzb2intersectionz12z72 = function(BgL_sc_zd3_43zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_43zd3, BgL_lsetzd2diffzb2intersectionz12z72);
    if (every(BgL_nullzd2listzf3z21, lists) !== false) {
      return new sc_Values([lis1, null]);
    } else {
      if (sc_memq(lis1, lists) !== false) {
        return new sc_Values([null, lis1]);
      } else {
        return BgL_partitionz12z12(function(elt) {
                  return any(function(lis) {
                            return member(elt, lis, BgL_sc_zd3_43zd3);
                          }, lists) === false;
                }, lis1);
      }
    }
  };
infinity = Number[BgL_sc_const_10z00_citation_structural_dynamic2_prog_tmp];
BgL_minuszd2infinityzd2 = Number[BgL_sc_const_6z00_citation_structural_dynamic2_prog_tmp];
nan = Number.NaN;
pi = Math.PI;
BgL_samplezd2gammazd2 = sample_gamma;
BgL_gammazd2pdfzd2 = gamma_pdf;
BgL_gammazd2lnpdfzd2 = gamma_lnpdf;
BgL_samplezd2poissonzd2 = sample_poisson;
BgL_samplezd2binomialzd2 = sample_binomial;
BgL_samplezd2betazd2 = sample_beta;
BgL_samplezd2gaussianzd2 = sample_gaussian;
BgL_gaussianzd2pdfzd2 = gaussian_pdf;
BgL_gaussianzd2lnpdfzd2 = gaussian_lnpdf;
BgL_samplezd2dirichletzd2 = sample_dirichlet;
BgL_dirichletzd2lnpdfzd2 = dirichlet_lnpdf;
BgL_samplezd2tdistzd2 = sample_tdist;
BgL_tdistzd2pdfzd2 = tdist_pdf;
BgL_samplezd2generaliza7edzd2tdistza7 = sample_generalized_tdist;
BgL_binomialzd2pdfzd2 = binomial_pdf;
BgL_poissonzd2pdfzd2 = poisson_pdf;
BgL_randomzd2realzd2 = random_real;
BgL_randomzd2integerzd2 = random_integer;
BgL_seedzd2rngzd2 = seed_rng;
BgL_discretezd2pdfzd2 = function(probs, val) {
    return sc_listRef(probs, val);
  };
BgL_discretezd2samplerzd2 = function(probs) {
    var probs_133;
    var past;
    var i;
    probs_133 = probs;
    past = 0;
    i = 0;
    while (!(BgL_randomzd2realzd2() < first(probs_133) / (1 - past))) {
      past += first(probs_133);
      probs_133 = rest(probs_133);
      ++i;
    }
    return i;
  };
fold = function(f, z, xs) {
    if (xs === null) {
      return z;
    } else {
      return fold(f, f(first(xs), z), rest(xs));
    }
  };
BgL_currentzd2datezd2 = function() {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return false;
  };
BgL_exactzd2ze3inexactz31 = function(x) {
    return x;
  };
BgL_inexactzd2ze3exactz31 = function(x) {
    return x;
  };
BgL_schemezd2gensymzd2 = sc_gensym;
BgL_truez00 = true;
BgL_falsez00 = false;
first = sc_car;
rest = sc_cdr;
pair = sc_cons;
second = function(lst) {
    return lst.cdr.car;
  };
third = function(lst) {
    return lst.cdr.cdr.car;
  };
fourth = function(lst) {
    return lst.cdr.cdr.cdr.car;
  };
fifth = function(lst) {
    return sc_listRef(lst, 4);
  };
sixth = function(lst) {
    return sc_listRef(lst, 5);
  };
seventh = function(lst) {
    return sc_listRef(lst, 6);
  };
eighth = function(lst) {
    return sc_listRef(lst, 7);
  };
ninth = function(lst) {
    return sc_listRef(lst, 8);
  };
tenth = function(lst) {
    return sc_listRef(lst, 9);
  };
BgL_za2withzd2scorezd2gradientza2z00 = function() {
    return false;
  };
BgL_xyzd2gradientzd2Rz00 = function(x) {
    return sc_error("\uEBACgrad-undefined", BgL_sc_const_5z00_citation_structural_dynamic2_prog_tmp);
  };
BgL_tapezf3zf3 = function(x) {
    return false;
  };
tapify = function(x) {
    return x;
  };
untapify = function(x) {
    return x;
  };
BgL_continuouszf3zf3 = sc_isReal;
BgL_churchzd2displayzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_display, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2za2z70 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_multi, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2zb2z60 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_plus, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2firstzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(first, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2restzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(rest, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2listzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_list, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2samplezd2dirichletz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(BgL_samplezd2dirichletzd2, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2discretezd2samplerz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(BgL_discretezd2samplerzd2, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2randomzd2integerz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(BgL_randomzd2integerzd2, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2schemezd2gensymz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(BgL_schemezd2gensymzd2, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2factorzd2valuez00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(BgL_factorzd2valuezd2, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2makezd2vectorz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_makeVector, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2eqzf3z21 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_isEq, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2eqvzf3z21 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_isEqv, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2equalzf3z21 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_isEqual, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2vectorzd2lengthz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_vectorLength, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2stringzd2lengthz00 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_stringLength, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2nullzf3z21 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_isNull, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2lengthzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_length, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2listzd2ze3vectorze3 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_list2vector, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2secondzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(second, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2thirdzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(third, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2fourthzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(fourth, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2fifthzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(fifth, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2sixthzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sixth, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2carzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_car, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2cadrzd2 = sc_list(function(address, store) {
      var args = null;
      for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
        args = sc_cons(arguments[sc_tmp], args);
      }
      return sc_list(sc_apply(sc_cadr, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
    }, null);
BgL_churchzd2applyzd2 = function(address, store, proc, args) {
    return sc_apply(proc, address, store, args);
  };
BgL_inczd2provzb2provenancez60 = function(BgL_sc_vzb2_44zb2) {
    return BgL_makezd2provzd2(BgL_sc_vzb2_44zb2, BgL_emptyzd2provzd2);
  };
BgL_deczd2provzb2provenancez60 = function(BgL_sc_vzb2zb2_45z00) {
    return erase(BgL_sc_vzb2zb2_45z00);
  };
BgL_churchzd2trzd2nullzb2provenancezb2 = new sc_Pair(null, new sc_Pair(null, null));
BgL_trzd2deletezd2duplicateszb2provenancezb2 = function(BgL_sc_xszb2_46zb2) {
    var stmp;
    var shortened;
    var vals;
    var xs;
    xs = erase(BgL_sc_xszb2_46zb2);
    vals = map(erase, xs);
    shortened = BgL_deletezd2duplicateszd2(vals);
    stmp = map(function(x) {
          return assoc(x, xs);
        }, shortened);
    return BgL_makezd2provzd2(stmp, prov(BgL_sc_xszb2_46zb2));
  };
BgL_trzd2listzb2provenancez60 = function() {
    var BgL_sc_xszb2_47zb2 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      BgL_sc_xszb2_47zb2 = sc_cons(arguments[sc_tmp], BgL_sc_xszb2_47zb2);
    }
    return BgL_makezd2provzd2(BgL_sc_xszb2_47zb2, BgL_emptyzd2provzd2);
  };
BgL_trzd2conszb2provenancez60 = function(BgL_sc_xzb2_48zb2, BgL_sc_xszb2_49zb2) {
    return BgL_makezd2provzd2(new sc_Pair(BgL_sc_xzb2_48zb2, erase(BgL_sc_xszb2_49zb2)), prov(BgL_sc_xszb2_49zb2));
  };
BgL_trzd2carzb2provenancez60 = function(BgL_sc_xszb2_50zb2) {
    return erase(BgL_sc_xszb2_50zb2).car;
  };
BgL_trzd2cdrzb2provenancez60 = function(BgL_sc_xszb2_51zb2) {
    if (BgL_sc_xszb2_51zb2 === null) {
      return sc_error(BgL_trzd2cdrzd2, on, BgL_nullz00, BgL_trzd2listzd2);
    } else {
      return BgL_makezd2provzd2(erase(BgL_sc_xszb2_51zb2).cdr, prov(BgL_sc_xszb2_51zb2));
    }
  };
BgL_trzd2listzd2refzb2provenancezb2 = function(BgL_sc_xszb2_52zb2, BgL_sc_izb2_53zb2) {
    var elt_val;
    var elt_prov;
    var BgL_sc_eltzb2_54zb2;
    var i_prov;
    i_prov = prov(BgL_sc_izb2_53zb2);
    BgL_sc_eltzb2_54zb2 = sc_listRef(erase(BgL_sc_xszb2_52zb2), erase(BgL_sc_izb2_53zb2));
    elt_prov = prov(BgL_sc_eltzb2_54zb2);
    elt_val = erase(BgL_sc_eltzb2_54zb2);
    return BgL_makezd2provzd2(elt_val, BgL_mergezd2provszd2(i_prov, elt_prov));
  };
BgL_listzd2ze3trzd2listzb2provenancez51 = function(BgL_sc_xszb2_55zb2) {
    return BgL_makezd2provzd2(map(BgL_provzd2initzd2, erase(BgL_sc_xszb2_55zb2)), prov(BgL_sc_xszb2_55zb2));
  };
BgL_trzd2listzd2ze3listzb2provenancez51 = function(BgL_sc_xszb2_56zb2) {
    var provs;
    var vals;
    var list_prov;
    list_prov = prov(BgL_sc_xszb2_56zb2);
    vals = BgL_extractzd2valszd2(erase(BgL_sc_xszb2_56zb2));
    provs = BgL_extractzd2provszd2(erase(BgL_sc_xszb2_56zb2));
    return BgL_makezd2provzd2(vals, BgL_mergezd2provszd2(list_prov, BgL_mergezd2listzd2provsz00(provs)));
  };
BgL_churchzd2truezd2 = true;
BgL_churchzd2falsezd2 = false;
BgL_churchzd2infinityzd2 = infinity;
BgL_churchzd2minuszd2infinityz00 = BgL_minuszd2infinityzd2;
BgL_churchzd2nanzd2 = nan;
BgL_churchzd2pizd2 = pi;
BgL_churchzd2orzd2 = function(address, store) {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return fold(function(x, y) {
              if (x !== false) {
                return x;
              } else {
                return y;
              }
            }, false, args);
  };
BgL_churchzd2andzd2 = function(address, store) {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return fold(function(x, y) {
              if (x !== false) {
                return y;
              } else {
                return false;
              }
            }, true, args);
  };
BgL_churchzd2forcezd2 = function(address, store, val) {
    if (val instanceof sc_Pair && val.car === "\uEBACdelayed") {
      return BgL_churchzd2forcezd2(address, store, val.cdr.car(address, store));
    } else {
      return val;
    }
  };
BgL_constz00 = function(x, y) {
    return x;
  };
compose = function() {
    var fs = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      fs = sc_cons(arguments[sc_tmp], fs);
    }
    var storage;
    var tmp;
    var tmp_147;
    var g1322;
    g1322 = function(x) {
        return x;
      };
    tmp = g1322;
    tmp_147 = fs;
    do {
      storage = {rest: undefined, acc: undefined};
      with (storage) {
        rest = tmp_147;
        acc = tmp;
        if (tmp_147 === null) {
          return tmp;
        } else {
          tmp = function(x) {
              return acc(rest.car(x));
            };
          tmp_147 = tmp_147.cdr;
        }
      }
    } while (true);
  };
BgL_listzd2ze3dlistz31 = function(xs) {
    return function(rest) {
            return sc_append(xs, rest);
          };
  };
BgL_dlistzd2ze3listz31 = function(dxs) {
    return dxs(null);
  };
BgL_dlzd2nullzd2 = function(xs) {
    return xs;
  };
BgL_dlzd2unitzd2 = function(x) {
    return function(rest) {
            return new sc_Pair(x, rest);
          };
  };
BgL_dlzd2conszd2 = function(x, dl) {
    var f1;
    f1 = function(xs) {
        return new sc_Pair(x, xs);
      };
    return compose(f1, dl);
  };
BgL_dlzd2snoczd2 = function(dl, x) {
    var f1;
    f1 = function(xs) {
        return new sc_Pair(x, xs);
      };
    return compose(dl, f1);
  };
BgL_dlzd2appendzd2 = compose;
arglist = sc_list;
BgL_makezd2provzd2 = function(v, p) {
    return sc_list(v, p);
  };
BgL_provzd2initzd2 = function(sexpr) {
    return sc_list(sexpr, BgL_emptyzd2provzd2);
  };
BgL_clearzd2provzd2 = function(BgL_sc_vzb2_57zb2) {
    return sc_list(BgL_sc_vzb2_57zb2.car, BgL_emptyzd2provzd2);
  };
erase = first;
prov = second;
BgL_provzb2zb2 = function(e, p) {
    return sc_list(erase(e), BgL_mergezd2provszd2(p, prov(e)));
  };
BgL_addzd2provzd2 = function(p, ps) {
    return new sc_Pair(p, ps);
  };
BgL_provszd2ze3listz31 = function(x) {
    return x;
  };
BgL_churchzd2applyzb2provz60 = BgL_provzd2initzd2(function(address, store, proc, args) {
      return sc_apply(erase(proc), address, store, args);
    });
DEBUG = false;
BgL_DEBUGzd2DEPzd2 = false;
BgL_enablezd2provzd2debugz00 = function() {
    return BgL_DEBUGzd2DEPzd2 = true;
  };
BgL_disablezd2provzd2debugz00 = function() {
    return BgL_DEBUGzd2DEPzd2 = false;
  };
BgL_NOzd2FWDzd2PROBz00 = false;
BgL_disablezd2fwdzd2probz00 = function() {
    return BgL_NOzd2FWDzd2PROBz00 = true;
  };
BgL_enablezd2fwdzd2probz00 = function() {
    return BgL_NOzd2FWDzd2PROBz00 = false;
  };
BgL_displayzd2debugzd2 = function(x) {
    if (DEBUG !== false) {
      return sc_display(x);
    } else {
      return null;
    }
  };
BgL_ifzb2provzb2 = function(store, condition, true_branch, false_branch) {
    var prov_of_condition;
    var res;
    res = erase(condition);
    prov_of_condition = prov(condition);
    BgL_storezd2addzd2structuralzd2depz12zc0(store, prov_of_condition);
    if (res !== false) {
      return BgL_provzb2zb2(true_branch(), prov_of_condition);
    } else {
      return BgL_provzb2zb2(false_branch(), prov_of_condition);
    }
  };
fsts = function(xs) {
    return map(sc_car, xs);
  };
snds = function(xs) {
    return map(sc_cadr, xs);
  };
BgL_extractzd2valszd2 = function(xs) {
    return map(function(x) {
              if (x === null) {
                return null;
              } else {
                return x.car;
              }
            }, xs);
  };
BgL_extractzd2provszd2 = function(xs) {
    return map(function(x) {
              if (x === null) {
                return null;
              } else {
                return x.cdr.car;
              }
            }, xs);
  };
BgL_emptyzd2provzd2 = null;
BgL_addrzd2ze3provz31 = sc_list;
BgL_mergezd2provszd2 = sc_append;
BgL_mergezd2listzd2provsz00 = function(xs) {
    return BgL_deletezd2duplicateszd2(sc_apply(sc_append, xs));
  };
BgL_provzd2ze3listz31 = function(xs) {
    return xs;
  };
BgL_extractzd2optzd2argz00 = function(pr_pvs) {
    BgL_displayzd2debugzd2("\uEBADextract-opt-arg");
    BgL_displayzd2debugzd2(pr_pvs);
    return BgL_makezd2provzd2(BgL_extractzd2valszd2(pr_pvs), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(pr_pvs)));
  };
BgL_displayzd2provzb2provenancez60 = function(BgL_sc_xzb2_58zb2) {
    return sc_display(sc_list("\uEBACval", erase(BgL_sc_xzb2_58zb2), "\uEBACprov", BgL_provzd2ze3listz31(prov(BgL_sc_xzb2_58zb2))));
  };
BgL_churchzd2displayzd2structuralzd2addrszd2 = function(address, store) {
    return BgL_printzd2structuralzd2addressesz00(store);
  };
BgL_primzb2provzb2 = function(f) {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return BgL_applyzd2primzb2provz60(f, args);
  };
BgL_primzb2provzb2addrz00 = function(address, store, f) {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return BgL_applyzd2primzb2provzb2addressingzd2(address, store, f, args);
  };
BgL_fnzb2provzb2 = function(address, store, f) {
    var args = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      args = sc_cons(arguments[sc_tmp], args);
    }
    return BgL_applyzd2fnzb2provz60(address, store, f, args);
  };
BgL_bindzd2provzd2 = function(f) {
    var BgL_sc_argszb2_59zb2 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      BgL_sc_argszb2_59zb2 = sc_cons(arguments[sc_tmp], BgL_sc_argszb2_59zb2);
    }
    return sc_apply(f, map(erase, BgL_sc_argszb2_59zb2));
  };
BgL_bindzd2provzb2addrz60 = function(address, store, f) {
    var BgL_sc_argszb2_60zb2 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      BgL_sc_argszb2_60zb2 = sc_cons(arguments[sc_tmp], BgL_sc_argszb2_60zb2);
    }
    return BgL_churchzd2applyzd2(address, store, f, map(erase, BgL_sc_argszb2_60zb2));
  };
BgL_applyzd2primzb2provz60 = function(proc, args) {
    return BgL_makezd2provzd2(sc_apply(proc, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
  };
BgL_applyzd2primzb2provzb2addressingzd2 = function(address, store, proc, args) {
    return BgL_makezd2provzd2(sc_apply(proc, address, store, BgL_extractzd2valszd2(args)), BgL_mergezd2listzd2provsz00(BgL_extractzd2provszd2(args)));
  };
BgL_myzd2lastzd2 = function(xs) {
    if (xs.cdr === null) {
      return xs.car;
    } else {
      return BgL_myzd2lastzd2(xs.cdr);
    }
  };
BgL_myzd2takezd2 = function(xs, n) {
    var acc;
    var n_152;
    var xs_153;
    var acc_154;
    acc_154 = null;
    acc = acc_154;
    n_152 = n;
    xs_153 = xs;
    while (!(n_152 === 0)) {
      acc = new sc_Pair(xs_153.car, acc);
      xs_153 = xs_153.cdr;
      --n_152;
    }
    return sc_reverse(acc);
  };
BgL_splitzd2sharezd2provz00 = function(args_prov) {
    var prov_155;
    BgL_displayzd2debugzd2("\uEBADsplit-share-prov");
    BgL_displayzd2debugzd2(args_prov);
    prov_155 = prov(args_prov);
    return map(function(arg) {
              return sc_list(arg, prov_155);
            }, erase(args_prov));
  };
BgL_liftedzd2applyzd2 = function(address, store, BgL_sc_proczb2_61zb2) {
    var BgL_sc_argszb2s_62zb2 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      BgL_sc_argszb2s_62zb2 = sc_cons(arguments[sc_tmp], BgL_sc_argszb2s_62zb2);
    }
    var BgL_sc_splitzd2argszb2s_63z60;
    if (sc_length(BgL_sc_argszb2s_62zb2) === 1) {
      BgL_sc_splitzd2argszb2s_63z60 = BgL_splitzd2sharezd2provz00(BgL_sc_argszb2s_62zb2.car);
    } else {
      BgL_sc_splitzd2argszb2s_63z60 = sc_append(BgL_myzd2takezd2(BgL_sc_argszb2s_62zb2, sc_length(BgL_sc_argszb2s_62zb2) - 1), BgL_splitzd2sharezd2provz00(BgL_myzd2lastzd2(BgL_sc_argszb2s_62zb2)));
    }
    return sc_apply(erase(BgL_sc_proczb2_61zb2), address, store, BgL_sc_splitzd2argszb2s_63z60);
  };
BgL_applyzd2fnzb2provz60 = function(address, store, proc, val_provs) {
    if (DEBUG !== false) {
      sc_display("\uEBADapply-fn");
      sc_display(proc);
      sc_display(val_provs);
      sc_display("\uEBADend-apply-fn");
    }
    return BgL_churchzd2applyzd2(address, store, erase(proc), val_provs);
  };
BgL_makezd2storezd2 = function(xrp_draws, xrp_stats, score, tick, enumeration_flag, factors, diff_factors, structural_addrs) {
    return sc_list(xrp_draws, xrp_stats, score, tick, enumeration_flag, factors, diff_factors, structural_addrs);
  };
BgL_makezd2emptyzd2storez00 = function() {
    return BgL_makezd2storezd2(BgL_makezd2addboxzd2(), BgL_makezd2addboxzd2(), 0, 0, false, BgL_makezd2addboxzd2(), new sc_Pair(null, new sc_Pair(null, new sc_Pair(null, null))), null);
  };
BgL_storezd2ze3xrpzd2drawsze3 = first;
BgL_setzd2storezd2xrpzd2drawsz12zc0 = sc_setCarBang;
BgL_setzd2listzd2eltz12z12 = function(lst, elt, n) {
    var curr;
    var i;
    curr = lst;
    i = 0;
    while (!(i === n)) {
      curr = curr.cdr;
      ++i;
    }
    return curr.car = elt;
  };
BgL_setzd2storezd2factorsz12z12 = function(store, new_factors) {
    return BgL_setzd2listzd2eltz12z12(store, new_factors, 5);
  };
BgL_setzd2storezd2diffzd2factorsz12zc0 = function(store, new_diff_factors) {
    return BgL_setzd2listzd2eltz12z12(store, new_diff_factors, 6);
  };
BgL_setzd2storezd2structuralzd2addrsz12zc0 = function(store, structural) {
    return BgL_setzd2listzd2eltz12z12(store, structural, 7);
  };
BgL_storezd2ze3factorsz31 = sixth;
BgL_storezd2ze3diffzd2factorsze3 = seventh;
BgL_storezd2ze3structuralzd2addrsze3 = function(store) {
    return sc_listRef(store, 7);
  };
BgL_storezd2addzd2structuralzd2depz12zc0 = function(store, new_deps) {
    if (DEBUG !== false) {
      BgL_displayzd2debugzd2("\uEBADstore-add-structural-dep");
      BgL_displayzd2debugzd2(sc_length(store));
      BgL_displayzd2debugzd2(new_deps);
      BgL_displayzd2debugzd2(BgL_storezd2ze3structuralzd2addrsze3(store));
      BgL_displayzd2debugzd2(BgL_storezd2ze3structuralzd2addrsze3(store));
    }
    return BgL_setzd2storezd2structuralzd2addrsz12zc0(store, BgL_deletezd2duplicateszd2(sc_append(filter(function(x) {
                    return !(x === null);
                  }, BgL_provzd2ze3listz31(new_deps)), BgL_storezd2ze3structuralzd2addrsze3(store))));
  };
BgL_storezd2ze3xrpzd2statsze3 = second;
BgL_storezd2ze3scorez31 = third;
BgL_setzd2storezd2scorez12z12 = function(store, score) {
    return new sc_Pair(store.car, new sc_Pair(store.cdr.car, store.cdr.cdr.car = score));
  };
BgL_storezd2ze3tickz31 = fourth;
BgL_storezd2ze3enumerationzd2flagze3 = fifth;
BgL_churchzd2resetzd2storezd2xrpzd2drawsz00 = function(address, store) {
    if (DEBUG !== false) {
      BgL_displayzd2debugzd2(BgL_sc_const_2z00_citation_structural_dynamic2_prog_tmp);
      BgL_displayzd2debugzd2(sc_list(address, store));
    }
    return BgL_setzd2storezd2xrpzd2drawsz12zc0(store, BgL_makezd2addboxzd2());
  };
BgL_churchzd2resetzd2storezd2xrpzd2drawszb2provenancezb2 = BgL_churchzd2resetzd2storezd2xrpzd2drawsz00;
BgL_churchzd2resetzd2storezd2factorszd2 = function(address, store) {
    return BgL_setzd2storezd2factorsz12z12(store, BgL_makezd2addboxzd2());
  };
BgL_churchzd2resetzd2storezd2factorszb2provenancez60 = BgL_churchzd2resetzd2storezd2factorszd2;
BgL_churchzd2resetzd2storezd2structuralzd2addrsz00 = function(address, store) {
    return BgL_setzd2storezd2structuralzd2addrsz12zc0(store, null);
  };
BgL_churchzd2resetzd2storezd2structuralzd2addrszb2provenancezb2 = BgL_churchzd2resetzd2storezd2structuralzd2addrsz00;
trienone = "\uEBACnone";
BgL_makezd2triezd2 = function(val, children) {
    return pair(val, children);
  };
BgL_makezd2emptyzd2triez00 = function() {
    return BgL_makezd2triezd2(trienone, null);
  };
BgL_triezd2ze3valz31 = sc_car;
BgL_triezd2ze3childrenz31 = sc_cdr;
BgL_triezd2emptyzf3z21 = function(trie) {
    return BgL_triezd2ze3childrenz31(trie) === null;
  };
BgL_triezd2ze3valuesz31 = function(trie) {
    var vals;
    vals = null;
    BgL_walkzd2triezd2(trie, function(v) {
        return vals = new sc_Pair(v, vals);
      });
    return vals;
  };
BgL_walkzd2triezd2 = function(trie, fn) {
    if (!(trienone === BgL_triezd2ze3valz31(trie))) {
      return fn(BgL_triezd2ze3valz31(trie));
    } else {
      return map(function(c) {
                return BgL_walkzd2triezd2(c.cdr, fn);
              }, BgL_triezd2ze3childrenz31(trie));
    }
  };
BgL_alistzd2ze3triez31 = function(alist) {
    var alist_159;
    var trie;
    var g1323;
    g1323 = BgL_makezd2emptyzd2triez00();
    alist_159 = alist;
    trie = g1323;
    while (!(alist_159 === null)) {
      trie = BgL_triezd2insertzd2(trie, alist_159.car.car, alist_159.car.cdr);
      alist_159 = alist_159.cdr;
    }
    return trie;
  };
BgL_copyzd2triezd2 = function(trie) {
    return BgL_makezd2triezd2(BgL_triezd2ze3valz31(trie), map(function(k_t) {
                return new sc_Pair(k_t.car, BgL_copyzd2triezd2(k_t.cdr));
              }, BgL_triezd2ze3childrenz31(trie)));
  };
BgL_triezd2insertzd2 = function(trie, key, val) {
    return BgL_triezd2updatezd2(trie, key, function(v) {
              return val;
            });
  };
BgL_triezd2lookupzd2 = function(trie, key) {
    var val;
    val = trienone;
    BgL_triezd2updatezd2(trie, key, function(v) {
        val = v;
        return v;
      });
    return val;
  };
BgL_triezd2updatezd2 = function(trie, key, fn) {
    var sub_trie;
    var new_child;
    var entry;
    var trie_160;
    var key_161;
    trie_160 = trie;
    key_161 = key;
    while (!(key_161 === null)) {
      entry = assoc(key_161.car, BgL_triezd2ze3childrenz31(trie_160));
      if (false === entry) {
        new_child = BgL_makezd2emptyzd2triez00();
        trie_160.cdr = new sc_Pair(new sc_Pair(key_161.car, new_child), BgL_triezd2ze3childrenz31(trie_160));
        sub_trie = new_child;
      } else {
        sub_trie = entry.cdr;
      }
      trie_160 = sub_trie;
      key_161 = key_161.cdr;
    }
    trie_160.car = fn(BgL_triezd2ze3valz31(trie_160));
    return trie;
  };
BgL_makezd2addboxzd2 = BgL_makezd2emptyzd2triez00;
BgL_copyzd2addboxzd2 = BgL_copyzd2triezd2;
BgL_insertzd2addboxzd2 = function(addbox, address, val) {
    return BgL_triezd2insertzd2(addbox, sc_reverse(address), val);
  };
BgL_readzd2addboxzd2 = function(addbox, address) {
    return BgL_triezd2lookupzd2(addbox, sc_reverse(address));
  };
BgL_updatezd2addboxzd2 = function(addbox, address, fn) {
    return BgL_triezd2updatezd2(addbox, sc_reverse(address), fn);
  };
BgL_makezd2extendedzd2statez00 = sc_list;
BgL_extendedzd2statezd2ze3beforeze3 = first;
BgL_extendedzd2statezd2ze3afterze3 = second;
BgL_xrpzd2inzd2statezf3zf3 = function(xrp, state) {
    return !("\uEBACnone" === BgL_readzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_xrpzd2drawzd2addressz00(xrp)));
  };
BgL_combinezd2xrpzd2drawsz00 = function(state1, state2) {
    return BgL_addboxzd2ze3valuesz31(fold(function(xrp, xrps) {
                return BgL_updatezd2addboxzd2(xrps, BgL_xrpzd2drawzd2addressz00(xrp), function(xrp_draw) {
                          return xrp;
                        });
              }, BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state1))), BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state2)))));
  };
BgL_lookupzd2factorzd2andzd2updatezd2 = function(factors_addbox, target_factor) {
    var lookup_factor;
    lookup_factor = BgL_readzd2addboxzd2(factors_addbox, BgL_factorzd2addresszd2(target_factor));
    if (!("\uEBACnone" === lookup_factor)) {
      return lookup_factor;
    } else {
      return target_factor;
    }
  };
BgL_updatezd2fzd2pluszd2minuszd2commonzd2scoreszd2 = function(state, target_f_plus_minus_common) {
    var fresh_factors;
    fresh_factors = BgL_storezd2ze3factorsz31(BgL_mcmczd2statezd2ze3storeze3(state));
    return map(function(factor_instances) {
              return map(function(factor_instance) {
                        return BgL_lookupzd2factorzd2andzd2updatezd2(fresh_factors, factor_instance);
                      }, factor_instances);
            }, target_f_plus_minus_common);
  };
BgL_addboxzd2ze3valuesz31 = BgL_triezd2ze3valuesz31;
BgL_alistzd2ze3addboxz31 = function(alist) {
    return BgL_alistzd2ze3triez31(map(function(b) {
                return new sc_Pair(sc_reverse(b.car), b.cdr);
              }, alist));
  };
BgL_addboxzd2emptyzf3z21 = BgL_triezd2emptyzf3z21;
BgL_makezd2xrpzd2drawz00 = function(address, value, xrp_name, proposer_thunk, ticks, score, support, structural) {
    return sc_list(address, value, xrp_name, proposer_thunk, ticks, score, support, structural);
  };
BgL_xrpzd2drawzd2addressz00 = first;
BgL_xrpzd2drawzd2valuez00 = second;
BgL_xrpzd2drawzd2namez00 = third;
BgL_xrpzd2drawzd2proposerz00 = fourth;
BgL_xrpzd2drawzd2ticksz00 = fifth;
BgL_xrpzd2drawzd2scorez00 = sixth;
BgL_xrpzd2drawzd2supportz00 = seventh;
BgL_xrpzd2drawzd2structuralzf3zf3 = eighth;
BgL_MUSTzd2ANNEALzd2 = 0;
BgL_AUTOzd2ANNEALzd2 = 1;
BgL_MUSTzd2NOTzd2ANNEALz00 = 2;
BgL_MUSTzd2ANNEALzd2Fzb2zd2z60 = 2;
BgL_makezd2factorzd2instancez00 = function(address, args, value, factor_function, ticks, is_should_update, is_should_anneal, provenance) {
    return sc_list(address, args, value, factor_function, ticks, is_should_update, is_should_anneal, provenance);
  };
BgL_factorzd2addresszd2 = first;
BgL_factorzd2argszd2 = second;
BgL_factorzd2valuezd2 = third;
BgL_factorzd2scorerzd2 = fourth;
BgL_factorzd2tickszd2 = fifth;
BgL_factorzd2shouldzd2updatezf3zf3 = sixth;
BgL_factorzd2shouldzd2annealzf3zf3 = seventh;
BgL_factorzd2provenancezd2 = eighth;
BgL_factorzd2mustzd2annealzf3zf3 = function(f) {
    return BgL_MUSTzd2ANNEALzd2 === BgL_factorzd2shouldzd2annealzf3zf3(f);
  };
BgL_factorzd2mustzd2annealzd2fzb2zd2zf3z41 = function(f) {
    return BgL_MUSTzd2ANNEALzd2Fzb2zd2z60 === BgL_factorzd2shouldzd2annealzf3zf3(f);
  };
BgL_factorzd2mustzd2notzd2annealzf3z21 = function(f) {
    return BgL_MUSTzd2NOTzd2ANNEALz00 === BgL_factorzd2shouldzd2annealzf3zf3(f);
  };
BgL_factorzd2autozd2annealzf3zf3 = function(f) {
    return BgL_AUTOzd2ANNEALzd2 === BgL_factorzd2shouldzd2annealzf3zf3(f);
  };
BgL_churchzd2makezd2factorzd2genericzd2 = function(address, store, factor_function, should_anneal) {
    return function(address, store) {
            var args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              args = sc_cons(arguments[sc_tmp], args);
            }
            var new_val;
            new_val = null;
            BgL_updatezd2addboxzd2(BgL_storezd2ze3factorsz31(store), address, function(factor_instance) {
                var new_factor_instance;
                var last_tick;
                var val;
                var sandbox_store;
                sandbox_store = new sc_Pair(BgL_makezd2addboxzd2(), store.cdr);
                val = BgL_churchzd2applyzd2(address, sandbox_store, factor_function, args);
                if (trienone === factor_instance) {
                  last_tick = false;
                } else {
                  last_tick = BgL_factorzd2tickszd2(factor_instance).car;
                }
                new_factor_instance = BgL_makezd2factorzd2instancez00(address, args, val, factor_function, new sc_Pair(BgL_storezd2ze3tickz31(store), last_tick), true, should_anneal, null);
                new_val = val;
                BgL_setzd2storezd2scorez12z12(store, BgL_storezd2ze3scorez31(store) + val);
                return new_factor_instance;
              });
            return new_val;
          };
  };
BgL_churchzd2makezd2factorz00 = function(address, store, factor_function) {
    return BgL_churchzd2makezd2factorzd2genericzd2(address, store, factor_function, BgL_AUTOzd2ANNEALzd2);
  };
BgL_churchzd2makezd2factorzd2annealedzd2 = function(address, store, factor_function) {
    return BgL_churchzd2makezd2factorzd2genericzd2(address, store, factor_function, BgL_MUSTzd2ANNEALzd2);
  };
BgL_churchzd2makezd2factorzd2froza7enz75 = function(address, store, factor_function) {
    return BgL_churchzd2makezd2factorzd2genericzd2(address, store, factor_function, BgL_MUSTzd2NOTzd2ANNEALz00);
  };
BgL_churchzd2makezd2factorzd2genericzb2provenancez60 = function(address, store, BgL_sc_factorzd2functionzb2_64z60, should_anneal) {
    var factor_function;
    factor_function = erase(BgL_sc_factorzd2functionzb2_64z60);
    prov(BgL_sc_factorzd2functionzb2_64z60);
    return BgL_provzd2initzd2(function(address, store) {
              var BgL_sc_argszb2_65zb2 = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                BgL_sc_argszb2_65zb2 = sc_cons(arguments[sc_tmp], BgL_sc_argszb2_65zb2);
              }
              var args;
              var provs;
              var new_val;
              args = BgL_extractzd2valszd2(BgL_sc_argszb2_65zb2);
              provs = BgL_extractzd2provszd2(BgL_sc_argszb2_65zb2);
              new_val = null;
              BgL_updatezd2addboxzd2(BgL_storezd2ze3factorsz31(store), address, function(factor_instance) {
                  var new_factor_instance;
                  var last_tick;
                  var val;
                  var BgL_sc_valzb2_66zb2;
                  var sandbox_store;
                  var auto_should_anneal;
                  var is_structure_change;
                  var new_provenance;
                  var previous_prov;
                  if (!(trienone === factor_instance)) {
                    previous_prov = BgL_factorzd2provenancezd2(factor_instance);
                  } else {
                    previous_prov = BgL_provzd2ze3listz31(BgL_emptyzd2provzd2);
                  }
                  new_provenance = BgL_deletezd2duplicateszd2(BgL_provzd2ze3listz31(BgL_mergezd2listzd2provsz00(provs)));
                  is_structure_change = !sc_isEqual(previous_prov, new_provenance);
                  if (BgL_DEBUGzd2DEPzd2 !== false) {
                    sc_display(sc_list("\uEBACfactor-addr", address));
                    sc_display(sc_list("\uEBACprov-before", BgL_provzd2ze3listz31(previous_prov)));
                    sc_display(sc_list("\uEBACprov-after", BgL_provzd2ze3listz31(new_provenance)));
                    sc_display(sc_list("\uEBACstructure-change?", is_structure_change));
                  }
                  if (trienone === factor_instance) {
                    auto_should_anneal = BgL_AUTOzd2ANNEALzd2;
                  } else {
                    if (BgL_factorzd2shouldzd2annealzf3zf3(factor_instance) === BgL_MUSTzd2NOTzd2ANNEALz00) {
                      auto_should_anneal = BgL_MUSTzd2NOTzd2ANNEALz00;
                    } else {
                      if (is_structure_change !== false) {
                        auto_should_anneal = BgL_MUSTzd2ANNEALzd2Fzb2zd2z60;
                      } else {
                        auto_should_anneal = BgL_factorzd2shouldzd2annealzf3zf3(factor_instance);
                      }
                    }
                  }
                  sandbox_store = BgL_makezd2emptyzd2storez00();
                  BgL_displayzd2debugzd2("\uEBADshould-update");
                  BgL_displayzd2debugzd2(true);
                  BgL_sc_valzb2_66zb2 = BgL_applyzd2fnzb2provz60(address, sandbox_store, BgL_sc_factorzd2functionzb2_64z60, BgL_sc_argszb2_65zb2);
                  val = erase(BgL_sc_valzb2_66zb2);
                  prov(BgL_sc_valzb2_66zb2);
                  if (trienone === factor_instance) {
                    last_tick = false;
                  } else {
                    last_tick = BgL_factorzd2tickszd2(factor_instance).car;
                  }
                  new_factor_instance = BgL_makezd2factorzd2instancez00(address, args, val, factor_function, new sc_Pair(BgL_storezd2ze3tickz31(store), last_tick), true, auto_should_anneal, new_provenance);
                  new_val = val;
                  BgL_setzd2storezd2scorez12z12(store, BgL_storezd2ze3scorez31(store) + val);
                  return new_factor_instance;
                });
              return sc_list(new_val, BgL_emptyzd2provzd2);
            });
  };
BgL_churchzd2makezd2factorzb2provenancezb2 = function(address, store, BgL_sc_factorzd2functionzb2_67z60) {
    return BgL_churchzd2makezd2factorzd2genericzb2provenancez60(address, store, BgL_sc_factorzd2functionzb2_67z60, BgL_AUTOzd2ANNEALzd2);
  };
BgL_churchzd2makezd2factorzd2annealedzb2provenancez60 = function(address, store, BgL_sc_factorzd2functionzb2_68z60) {
    return BgL_churchzd2makezd2factorzd2genericzb2provenancez60(address, store, BgL_sc_factorzd2functionzb2_68z60, BgL_MUSTzd2ANNEALzd2);
  };
BgL_churchzd2makezd2factorzd2froza7enzb2provenancezc7 = function(address, store, BgL_sc_factorzd2functionzb2_69z60) {
    return BgL_churchzd2makezd2factorzd2genericzb2provenancez60(address, store, BgL_sc_factorzd2functionzb2_69z60, BgL_MUSTzd2NOTzd2ANNEALz00);
  };
BgL_churchzd2makezd2xrpz00 = function(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support) {
    var maybe_structural = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 11; --sc_tmp) {
      maybe_structural = sc_cons(arguments[sc_tmp], maybe_structural);
    }
    var proposer_168;
    var structural;
    if (!(maybe_structural === null)) {
      structural = first(maybe_structural);
    } else {
      structural = BgL_falsez00;
    }
    BgL_updatezd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address, function(stats) {
        var tmp1324;
        tmp1324 = trienone === stats;
        if ((tmp1324 !== false? tmp1324: !(BgL_storezd2ze3tickz31(store) === second(stats))) !== false) {
          return sc_list(init_stats, BgL_storezd2ze3tickz31(store));
        } else {
          return stats;
        }
      });
    if (proposer === null) {
      proposer_168 = function(address_169, store, operands, old_value) {
          var incscore;
          var proposal_value;
          var inc;
          var sandbox_store;
          var decscore;
          var decstats;
          var dec;
          dec = decr_stats(address_169, store, old_value, BgL_readzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address).car, hyperparams, operands);
          decstats = second(dec);
          decscore = third(dec);
          sandbox_store = new sc_Pair(BgL_makezd2addboxzd2(), store.cdr);
          inc = sample(address_169, sandbox_store, decstats, hyperparams, operands);
          proposal_value = first(inc);
          incscore = third(inc);
          return sc_list(proposal_value, incscore, decscore);
        };
    } else {
      proposer_168 = proposer;
    }
    return function(address_170, store) {
            var args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              args = sc_cons(arguments[sc_tmp], args);
            }
            var new_val;
            new_val = null;
            BgL_updatezd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(store), address_170, function(xrp_draw) {
                var new_xrp_draw;
                var last_tick;
                var incr_score;
                var new_stats;
                var value;
                var tmp;
                var sandbox_store;
                var support_vals;
                var stats;
                if (!(trienone === xrp_draw) && sc_isEqual(BgL_storezd2ze3tickz31(store), BgL_xrpzd2drawzd2ticksz00(xrp_draw).car)) {
                  new_val = BgL_xrpzd2drawzd2valuez00(xrp_draw);
                  return xrp_draw;
                } else {
                  stats = BgL_readzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address).car;
                  if (support === null) {
                    support_vals = null;
                  } else {
                    support_vals = support(address_170, store, stats, hyperparams, args);
                  }
                  sandbox_store = new sc_Pair(BgL_makezd2addboxzd2(), store.cdr);
                  if (trienone === xrp_draw) {
                    tmp = sample(address_170, sandbox_store, stats, hyperparams, args);
                  } else {
                    tmp = incr_stats(address_170, sandbox_store, BgL_xrpzd2drawzd2valuez00(xrp_draw), stats, hyperparams, args);
                  }
                  value = first(tmp);
                  new_stats = sc_list(second(tmp), BgL_storezd2ze3tickz31(store));
                  incr_score = third(tmp);
                  if (trienone === xrp_draw) {
                    last_tick = false;
                  } else {
                    last_tick = BgL_xrpzd2drawzd2ticksz00(xrp_draw).car;
                  }
                  new_xrp_draw = BgL_makezd2xrpzd2drawz00(address_170, value, xrp_name, function(address, store, state) {
                        var store_171;
                        store_171 = new sc_Pair(first(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_mcmczd2statezd2ze3storeze3(state).cdr);
                        return BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), store_171, proposer_168, sc_list(args, value));
                      }, new sc_Pair(BgL_storezd2ze3tickz31(store), last_tick), BgL_NOzd2FWDzd2PROBz00 !== false? 0: incr_score, support_vals, structural);
                  new_val = value;
                  BgL_insertzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address, new_stats);
                  BgL_setzd2storezd2scorez12z12(store, BgL_storezd2ze3scorez31(store) + (BgL_NOzd2FWDzd2PROBz00 !== false? 0: incr_score));
                  return new_xrp_draw;
                }
              });
            return new_val;
          };
  };
BgL_churchzd2makezd2structuralzd2xrpzd2 = function(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support) {
    return BgL_churchzd2makezd2xrpz00(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support, BgL_truez00);
  };
BgL_churchzd2makezd2xrpzb2provenancezb2 = function(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support) {
    return BgL_churchzd2makezd2xrpzb2provenancezb2structuralzd2optzd2(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support, BgL_falsez00);
  };
BgL_churchzd2makezd2structuralzd2xrpzb2provenancez60 = function(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support) {
    return BgL_churchzd2makezd2xrpzb2provenancezb2structuralzd2optzd2(address, store, xrp_name, sample, incr_stats, decr_stats, score, init_stats, hyperparams, proposer, support, BgL_truez00);
  };
BgL_churchzd2makezd2xrpzb2provenancezb2structuralzd2optzd2 = function(address, store, BgL_sc_xrpzd2namezb2_70z60, BgL_sc_samplezb2_71zb2, BgL_sc_incrzd2statszb2_72z60, BgL_sc_decrzd2statszb2_73z60, BgL_sc_scorezb2_74zb2, BgL_sc_initzd2statszb2_75z60, BgL_sc_hyperparamszb2_76zb2, BgL_sc_proposerzb2_77zb2, BgL_sc_supportzb2_78zb2, structural) {
    var proposer;
    var hyperprovs;
    var support;
    var proposer_181;
    var hyperparams;
    var init_stats;
    var decr_stats;
    var sample;
    var xrp_name;
    xrp_name = erase(BgL_sc_xrpzd2namezb2_70z60);
    sample = erase(BgL_sc_samplezb2_71zb2);
    erase(BgL_sc_incrzd2statszb2_72z60);
    decr_stats = erase(BgL_sc_decrzd2statszb2_73z60);
    erase(BgL_sc_scorezb2_74zb2);
    init_stats = erase(BgL_sc_initzd2statszb2_75z60);
    hyperparams = erase(BgL_sc_hyperparamszb2_76zb2);
    proposer_181 = erase(BgL_sc_proposerzb2_77zb2);
    support = erase(BgL_sc_supportzb2_78zb2);
    hyperprovs = prov(BgL_sc_hyperparamszb2_76zb2);
    BgL_updatezd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address, function(stats) {
        var tmp1325;
        tmp1325 = trienone === stats;
        if ((tmp1325 !== false? tmp1325: !(BgL_storezd2ze3tickz31(store) === second(stats))) !== false) {
          return sc_list(init_stats, BgL_storezd2ze3tickz31(store));
        } else {
          return stats;
        }
      });
    BgL_displayzd2debugzd2("\uEBADchurch-make-xrp-with-provenance");
    if (proposer_181 === null) {
      proposer = BgL_provzd2initzd2(function(address_182, store, BgL_sc_operandszb2_79zb2, BgL_sc_oldzd2valuezb2_80z60) {
            var incscore;
            var proposal_value;
            var inc;
            var sandbox_store;
            var decscore;
            var decstats;
            var dec;
            dec = erase(decr_stats(address_182, store, BgL_sc_oldzd2valuezb2_80z60, BgL_provzd2initzd2(BgL_readzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address).car), BgL_provzd2initzd2(hyperparams), BgL_sc_operandszb2_79zb2));
            decstats = second(dec);
            decscore = third(dec);
            sandbox_store = new sc_Pair(BgL_makezd2addboxzd2(), store.cdr);
            inc = erase(sample(address_182, sandbox_store, BgL_provzd2initzd2(decstats), BgL_provzd2initzd2(hyperparams), BgL_sc_operandszb2_79zb2));
            proposal_value = first(inc);
            incscore = third(inc);
            return BgL_provzd2initzd2(sc_list(proposal_value, incscore, decscore));
          });
    } else {
      proposer = BgL_sc_proposerzb2_77zb2;
    }
    BgL_displayzd2debugzd2("\uEBADchurch-make-xrp-with-provenance-actual-xrp");
    return BgL_provzd2initzd2(function(address_185, store) {
              var val_provs = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                val_provs = sc_cons(arguments[sc_tmp], val_provs);
              }
              var provs;
              var args;
              var new_val;
              provs = BgL_extractzd2provszd2(val_provs);
              args = BgL_extractzd2valszd2(val_provs);
              new_val = null;
              BgL_updatezd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(store), address_185, function(xrp_draw) {
                  var new_xrp_draw;
                  var last_tick;
                  var incr_score;
                  var new_stats;
                  var value;
                  var tmp;
                  var sandbox_store;
                  var support_vals;
                  var stats;
                  if (!(trienone === xrp_draw) && sc_isEqual(BgL_storezd2ze3tickz31(store), BgL_xrpzd2drawzd2ticksz00(xrp_draw).car)) {
                    new_val = BgL_xrpzd2drawzd2valuez00(xrp_draw);
                    return xrp_draw;
                  } else {
                    stats = BgL_readzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address).car;
                    if (support === null) {
                      support_vals = null;
                    } else {
                      support_vals = erase(BgL_applyzd2fnzb2provz60(address_185, store, BgL_sc_supportzb2_78zb2, sc_list(BgL_provzd2initzd2(stats), BgL_sc_hyperparamszb2_76zb2, BgL_extractzd2optzd2argz00(val_provs))));
                    }
                    sandbox_store = new sc_Pair(BgL_makezd2addboxzd2(), store.cdr);
                    if (trienone === xrp_draw) {
                      BgL_displayzd2debugzd2(new sc_Pair("\uEBACin", new sc_Pair("\uEBACmake-xrp+provenance", new sc_Pair("\uEBACcalling", new sc_Pair("\uEBACsampler", null)))));
                      BgL_displayzd2debugzd2(sc_list(BgL_provzd2initzd2(stats), BgL_sc_hyperparamszb2_76zb2, BgL_extractzd2optzd2argz00(val_provs)));
                      tmp = erase(BgL_applyzd2fnzb2provz60(address_185, sandbox_store, BgL_sc_samplezb2_71zb2, sc_list(BgL_provzd2initzd2(stats), BgL_sc_hyperparamszb2_76zb2, BgL_extractzd2optzd2argz00(val_provs))));
                    } else {
                      tmp = erase(BgL_applyzd2fnzb2provz60(address_185, sandbox_store, BgL_sc_incrzd2statszb2_72z60, sc_list(BgL_provzd2initzd2(BgL_xrpzd2drawzd2valuez00(xrp_draw)), BgL_provzd2initzd2(stats), BgL_sc_hyperparamszb2_76zb2, BgL_extractzd2optzd2argz00(val_provs))));
                    }
                    value = first(tmp);
                    new_stats = sc_list(second(tmp), BgL_storezd2ze3tickz31(store));
                    incr_score = third(tmp);
                    if (trienone === xrp_draw) {
                      last_tick = false;
                    } else {
                      last_tick = BgL_xrpzd2drawzd2ticksz00(xrp_draw).car;
                    }
                    new_xrp_draw = BgL_makezd2xrpzd2drawz00(address_185, value, xrp_name, BgL_provzd2initzd2(function(address, store, BgL_sc_statezb2_81zb2) {
                            var store_187;
                            var state;
                            state = erase(BgL_sc_statezb2_81zb2);
                            store_187 = new sc_Pair(first(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_mcmczd2statezd2ze3storeze3(state).cdr);
                            return BgL_applyzd2fnzb2provz60(BgL_mcmczd2statezd2ze3addressze3(state), store_187, proposer, sc_list(BgL_provzd2initzd2(args), BgL_provzd2initzd2(value)));
                          }), new sc_Pair(BgL_storezd2ze3tickz31(store), last_tick), incr_score, support_vals, structural);
                    new_val = value;
                    BgL_insertzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store), address, new_stats);
                    BgL_setzd2storezd2scorez12z12(store, BgL_storezd2ze3scorez31(store) + incr_score);
                    return new_xrp_draw;
                  }
                });
              return sc_list(new_val, BgL_mergezd2provszd2(BgL_addrzd2ze3provz31(address_185), hyperprovs, BgL_mergezd2listzd2provsz00(provs)));
            });
  };
BgL_printzd2singlezd2xrpz00 = function(xrp) {
    return sc_display(sc_list(BgL_xrpzd2drawzd2addressz00(xrp), BgL_xrpzd2drawzd2valuez00(xrp)));
  };
BgL_printzd2mcmczd2statezd2xrpszd2 = function(state) {
    return map(BgL_printzd2singlezd2xrpz00, BgL_addboxzd2ze3valuesz31(BgL_mcmczd2statezd2ze3xrpzd2drawsz31(state)));
  };
BgL_makezd2mcmczd2statez00 = function(store, value, address) {
    return sc_list(store, value, address);
  };
BgL_mcmczd2statezd2ze3storeze3 = first;
BgL_mcmczd2statezd2ze3addressze3 = third;
BgL_mcmczd2statezd2ze3xrpzd2drawsz31 = function(state) {
    return BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state));
  };
BgL_mcmczd2statezd2ze3diffzd2factorsz31 = function(state) {
    return BgL_storezd2ze3diffzd2factorsze3(BgL_mcmczd2statezd2ze3storeze3(state));
  };
BgL_mcmczd2statezd2ze3scoreze3 = function(state) {
    if (!(true === first(second(state)))) {
      return BgL_minuszd2infinityzd2;
    } else {
      return BgL_storezd2ze3scorez31(BgL_mcmczd2statezd2ze3storeze3(state));
    }
  };
BgL_notzd2boolzf3z21 = function(x) {
    if (!(true === x)) {
      return !(false === x);
    } else {
      return false;
    }
  };
BgL_enforcezd2conditionerzd2 = function(state, b) {
    if (b !== false) {
      return BgL_storezd2ze3scorez31(BgL_mcmczd2statezd2ze3storeze3(state));
    } else {
      return BgL_minuszd2infinityzd2;
    }
  };
BgL_mcmczd2statezd2ze3scorezd2genericz31 = function(state) {
    var cond_box;
    cond_box = second(state);
    if (BgL_notzd2boolzf3z21(first(cond_box)) !== false) {
      return BgL_enforcezd2conditionerzd2(state, first(erase(cond_box)));
    } else {
      return BgL_enforcezd2conditionerzd2(state, first(cond_box));
    }
  };
BgL_mcmczd2statezd2ze3scorezb2provenancez51 = function(BgL_sc_statezb2zd2withzd2valzb2_82z00) {
    var stmp;
    var BgL_sc_statezd2withzd2valzb2_83zb2;
    BgL_sc_statezd2withzd2valzb2_83zb2 = erase(BgL_sc_statezb2zd2withzd2valzb2_82z00);
    if (!(true === first(erase(second(BgL_sc_statezd2withzd2valzb2_83zb2))))) {
      stmp = BgL_minuszd2infinityzd2;
    } else {
      stmp = BgL_storezd2ze3scorez31(BgL_mcmczd2statezd2ze3storeze3(BgL_sc_statezd2withzd2valzb2_83zb2));
    }
    return BgL_provzd2initzd2(stmp);
  };
BgL_mcmczd2statezd2ze3gradientze3 = function(state) {
    return first(second(BgL_xyzd2gradientzd2Rz00(function(f, xrp_draws) {
                  return BgL_filterzd2mapzd2(function(x) {
                            if (BgL_tapezf3zf3(BgL_xrpzd2drawzd2valuez00(x)) !== false) {
                              return f(BgL_xrpzd2drawzd2valuez00(x));
                            } else {
                              return false;
                            }
                          }, xrp_draws);
                }, BgL_addboxzd2ze3valuesz31(BgL_mcmczd2statezd2ze3xrpzd2drawsz31(state)), BgL_mcmczd2statezd2ze3scoreze3(state), tapify)));
  };
BgL_mcmczd2statezd2ze3queryzd2valuez31 = function(state) {
    var store;
    var store_190;
    store_190 = BgL_mcmczd2statezd2ze3storeze3(state);
    store = BgL_makezd2storezd2(BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(store_190)), BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store_190)), BgL_storezd2ze3scorez31(store_190), BgL_storezd2ze3tickz31(store_190), BgL_storezd2ze3enumerationzd2flagze3(store_190), BgL_copyzd2addboxzd2(BgL_storezd2ze3factorsz31(store_190)), BgL_storezd2ze3diffzd2factorsze3(store_190), BgL_storezd2ze3structuralzd2addrsze3(store_190));
    return BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), store, second(state).cdr, null);
  };
BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3 = function(state) {
    var value_thunk;
    var store;
    var store_191;
    store_191 = BgL_mcmczd2statezd2ze3storeze3(state);
    store = BgL_makezd2storezd2(BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(store_191)), BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store_191)), BgL_storezd2ze3scorez31(store_191), BgL_storezd2ze3tickz31(store_191), BgL_storezd2ze3enumerationzd2flagze3(store_191), BgL_copyzd2addboxzd2(BgL_storezd2ze3factorsz31(store_191)), BgL_storezd2ze3diffzd2factorsze3(store_191), BgL_storezd2ze3structuralzd2addrsze3(store_191));
    value_thunk = second(state).cdr;
    if (sc_isList(value_thunk)) {
      return erase(BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), store, erase(second(state)).cdr, null));
    } else {
      return BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), store, second(state).cdr, null);
    }
  };
BgL_mcmczd2statezd2ze3queryzd2valuezb2provenancez83 = function(BgL_sc_statezb2_84zb2) {
    var store;
    var store_193;
    var state;
    state = erase(BgL_sc_statezb2_84zb2);
    store_193 = BgL_mcmczd2statezd2ze3storeze3(state);
    store = BgL_makezd2storezd2(BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(store_193)), BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(store_193)), BgL_storezd2ze3scorez31(store_193), BgL_storezd2ze3tickz31(store_193), BgL_storezd2ze3enumerationzd2flagze3(store_193), BgL_copyzd2addboxzd2(BgL_storezd2ze3factorsz31(store_193)), BgL_storezd2ze3diffzd2factorsze3(store_193), BgL_storezd2ze3structuralzd2addrsze3(store_193));
    return BgL_clearzd2provzd2(BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), store, erase(second(state)).cdr, null));
  };
BgL_churchzd2makezd2initialzd2mcmczd2statez00 = function(address, store) {
    return BgL_makezd2mcmczd2statez00(store, "\uEBACinit-val", address);
  };
BgL_churchzd2makezd2initialzd2mcmczd2statezb2provenancezb2 = function(address, store) {
    return BgL_provzd2initzd2(BgL_makezd2mcmczd2statez00(store, BgL_provzd2initzd2("\uEBACinit-val"), address));
  };
BgL_xrpzd2drawzd2setzd2structuralzd2 = function(draw, new_str) {
    return BgL_makezd2xrpzd2drawz00(BgL_xrpzd2drawzd2addressz00(draw), BgL_xrpzd2drawzd2valuez00(draw), BgL_xrpzd2drawzd2namez00(draw), BgL_xrpzd2drawzd2proposerz00(draw), BgL_xrpzd2drawzd2ticksz00(draw), BgL_xrpzd2drawzd2scorez00(draw), BgL_xrpzd2drawzd2supportz00(draw), new_str);
  };
BgL_loggedzd2appzd2 = function(f, args) {
    var val;
    sc_display("\uEBACstart");
    val = sc_apply(f, args);
    sc_display("\uEBACend");
    return val;
  };
BgL_updatezd2xrpzd2drawzd2structuralzd2fieldsz00 = function(store) {
    var addr;
    var L1344;
    var L1344_194;
    var draws;
    draws = BgL_storezd2ze3xrpzd2drawsze3(store);
    L1344_194 = BgL_storezd2ze3structuralzd2addrsze3(store);
    L1344 = L1344_194;
    while (!(L1344 === null)) {
      addr = L1344.car;
      if (trienone === BgL_readzd2addboxzd2(draws, addr)) {
        null;
      } else {
        BgL_updatezd2addboxzd2(draws, addr, function(draw) {
            return BgL_xrpzd2drawzd2setzd2structuralzd2(draw, true);
          });
      }
      L1344 = L1344.cdr;
    }
    return undefined;
  };
BgL_storezd2ze3structuralzd2drawsze3 = function(store) {
    return filter(BgL_xrpzd2drawzd2structuralzf3zf3, BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3xrpzd2drawsze3(store)));
  };
BgL_storezd2ze3nonstructuralzd2drawsze3 = function(store) {
    return filter(function(d) {
              return BgL_xrpzd2drawzd2structuralzf3zf3(d) === false;
            }, BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3xrpzd2drawsze3(stre)));
  };
BgL_printzd2structuralzd2addressesz00 = function(store) {
    var L1347;
    var L1347_195;
    sc_display("\uEBADstructural-addresses");
    L1347_195 = BgL_storezd2ze3structuralzd2addrsze3(store);
    L1347 = L1347_195;
    while (!(L1347 === null)) {
      sc_display(L1347.car);
      L1347 = L1347.cdr;
    }
    return undefined;
  };
zip2 = function(xs, ys) {
    var tmp1327;
    var acc;
    var xs_196;
    var ys_197;
    var g1326;
    g1326 = null;
    acc = g1326;
    xs_196 = xs;
    ys_197 = ys;
    do {
      tmp1327 = xs_196 === null;
      if ((tmp1327 !== false? tmp1327: ys_197 === null) !== false) {
        return sc_reverse(acc);
      } else {
        acc = new sc_Pair(sc_list(xs_196.car, ys_197.car), acc);
        ys_197 = ys_197.cdr;
        xs_196 = xs_196.cdr;
      }
    } while (true);
  };
BgL_printzd2diffzd2factorzd2addrszd2 = function(fpmc) {
    var fc;
    var f_;
    var BgL_sc_fzb2_85zb2;
    BgL_sc_fzb2_85zb2 = fpmc.car;
    f_ = fpmc.cdr.car;
    fc = fpmc.cdr.cdr.car;
    return map(function(fs_l) {
              var L1350;
              var L1350_199;
              sc_display(fs_l.cdr.car);
              L1350_199 = map(BgL_factorzd2addresszd2, fs_l.car);
              L1350 = L1350_199;
              while (!(L1350 === null)) {
                sc_display(L1350.car);
                L1350 = L1350.cdr;
              }
              return undefined;
            }, zip2(sc_list(BgL_sc_fzb2_85zb2, f_, fc), new sc_Pair("\uEBACf+", new sc_Pair("\uEBACf-", new sc_Pair("\uEBACfc", null)))));
  };
BgL_counterfactualzd2updatezd2 = function(state, nfqp) {
    var interventions = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      interventions = sc_cons(arguments[sc_tmp], interventions);
    }
    var proposal_state;
    var BgL_sc_cdzd2bwzf2fw_86z20;
    var new_diff_factors;
    var value;
    var interv_store;
    interv_store = BgL_makezd2storezd2(fold(function(interv, xrps) {
            return BgL_updatezd2addboxzd2(xrps, BgL_xrpzd2drawzd2addressz00(first(interv)), function(xrp_draw) {
                      return BgL_makezd2xrpzd2drawz00(BgL_xrpzd2drawzd2addressz00(first(interv)), interv.cdr, BgL_xrpzd2drawzd2namez00(first(interv)), BgL_xrpzd2drawzd2proposerz00(first(interv)), BgL_xrpzd2drawzd2ticksz00(first(interv)), "\uEBACdummy-score", BgL_xrpzd2drawzd2supportz00(first(interv)), BgL_xrpzd2drawzd2structuralzf3zf3(first(interv)));
                    });
          }, BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state))), interventions), BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(BgL_mcmczd2statezd2ze3storeze3(state))), 0, 1 + BgL_storezd2ze3tickz31(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_storezd2ze3enumerationzd2flagze3(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_copyzd2addboxzd2(BgL_storezd2ze3factorsz31(BgL_mcmczd2statezd2ze3storeze3(state))), BgL_storezd2ze3diffzd2factorsze3(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_storezd2ze3structuralzd2addrsze3(BgL_mcmczd2statezd2ze3storeze3(state)));
    value = BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), interv_store, nfqp, null);
    new_diff_factors = BgL_fzd2pluszd2minuszd2commonzd2(interv_store);
    BgL_updatezd2xrpzd2drawzd2structuralzd2fieldsz00(interv_store);
    if (BgL_DEBUGzd2DEPzd2 !== false) {
      sc_display("\uEBADcounterfactual-update-start+static");
      BgL_printzd2structuralzd2addressesz00(interv_store);
      BgL_printzd2diffzd2factorzd2addrszd2(new_diff_factors);
    }
    if (BgL_storezd2ze3enumerationzd2flagze3(interv_store) !== false) {
      BgL_sc_cdzd2bwzf2fw_86z20 = 0;
    } else {
      BgL_sc_cdzd2bwzf2fw_86z20 = BgL_cleanzd2storezd2(interv_store);
    }
    if (BgL_storezd2ze3enumerationzd2flagze3(interv_store) === false) {
      BgL_cleanzd2storezd2factorsz00(interv_store);
    }
    proposal_state = BgL_makezd2mcmczd2statez00(interv_store, value, BgL_mcmczd2statezd2ze3addressze3(state));
    return sc_list(proposal_state, BgL_sc_cdzd2bwzf2fw_86z20);
  };
BgL_counterfactualzd2updatezd2larjz00 = function(state, nfqp) {
    var interventions = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      interventions = sc_cons(arguments[sc_tmp], interventions);
    }
    var proposal_state;
    var new_diff_factors;
    var BgL_sc_cdzd2bwzf2fw_87z20;
    var value;
    var interv_store;
    interv_store = BgL_makezd2storezd2(fold(function(interv, xrps) {
            return BgL_updatezd2addboxzd2(xrps, BgL_xrpzd2drawzd2addressz00(first(interv)), function(xrp_draw) {
                      return BgL_makezd2xrpzd2drawz00(BgL_xrpzd2drawzd2addressz00(first(interv)), interv.cdr, BgL_xrpzd2drawzd2namez00(first(interv)), BgL_xrpzd2drawzd2proposerz00(first(interv)), BgL_xrpzd2drawzd2ticksz00(first(interv)), "\uEBACdummy-score", BgL_xrpzd2drawzd2supportz00(first(interv)), BgL_xrpzd2drawzd2structuralzf3zf3(first(interv)));
                    });
          }, BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2drawsze3(BgL_mcmczd2statezd2ze3storeze3(state))), interventions), BgL_copyzd2addboxzd2(BgL_storezd2ze3xrpzd2statsze3(BgL_mcmczd2statezd2ze3storeze3(state))), 0, 1 + BgL_storezd2ze3tickz31(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_storezd2ze3enumerationzd2flagze3(BgL_mcmczd2statezd2ze3storeze3(state)), BgL_copyzd2addboxzd2(BgL_storezd2ze3factorsz31(BgL_mcmczd2statezd2ze3storeze3(state))), BgL_storezd2ze3diffzd2factorsze3(BgL_mcmczd2statezd2ze3storeze3(state)), null);
    value = BgL_churchzd2applyzd2(BgL_mcmczd2statezd2ze3addressze3(state), interv_store, nfqp, null);
    if (BgL_storezd2ze3enumerationzd2flagze3(interv_store) !== false) {
      BgL_sc_cdzd2bwzf2fw_87z20 = 0;
    } else {
      BgL_sc_cdzd2bwzf2fw_87z20 = BgL_cleanzd2storezd2(interv_store);
    }
    new_diff_factors = BgL_fzd2pluszd2minuszd2commonzd2(interv_store);
    if (BgL_storezd2ze3enumerationzd2flagze3(interv_store) === false) {
      BgL_cleanzd2storezd2factorsz00(interv_store);
    }
    BgL_setzd2storezd2diffzd2factorsz12zc0(interv_store, new_diff_factors);
    BgL_updatezd2xrpzd2drawzd2structuralzd2fieldsz00(interv_store);
    if (BgL_DEBUGzd2DEPzd2 !== false) {
      sc_display("\uEBADcounterfactual-update-larj");
      BgL_printzd2structuralzd2addressesz00(interv_store);
      BgL_printzd2diffzd2factorzd2addrszd2(BgL_storezd2ze3diffzd2factorsze3(interv_store));
    }
    proposal_state = BgL_makezd2mcmczd2statez00(interv_store, value, BgL_mcmczd2statezd2ze3addressze3(state));
    return sc_list(proposal_state, BgL_sc_cdzd2bwzf2fw_87z20);
  };
BgL_cleanzd2storezd2 = function(store) {
    var draws;
    var used_draws;
    var BgL_sc_bwzf2fw_88zf2;
    var g1329;
    var g1328;
    g1328 = BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3xrpzd2drawsze3(store));
    g1329 = null;
    draws = g1328;
    used_draws = g1329;
    BgL_sc_bwzf2fw_88zf2 = 0;
    while (!(draws === null)) {
      if (first(BgL_xrpzd2drawzd2ticksz00(draws.car)) === BgL_storezd2ze3tickz31(store)) {
        if (false === BgL_xrpzd2drawzd2ticksz00(draws.car).cdr) {
          used_draws = new sc_Pair(draws.car, used_draws);
          BgL_sc_bwzf2fw_88zf2 -= BgL_xrpzd2drawzd2scorez00(draws.car);
          draws = draws.cdr;
        } else {
          used_draws = new sc_Pair(draws.car, used_draws);
          draws = draws.cdr;
        }
      } else {
        BgL_sc_bwzf2fw_88zf2 += BgL_xrpzd2drawzd2scorez00(draws.car);
        draws = draws.cdr;
      }
    }
    BgL_setzd2storezd2xrpzd2drawsz12zc0(store, BgL_alistzd2ze3addboxz31(map(function(d) {
            return new sc_Pair(BgL_xrpzd2drawzd2addressz00(d), d);
          }, used_draws)));
    return BgL_sc_bwzf2fw_88zf2;
  };
BgL_factorszd2ze3addboxz31 = function(factors) {
    return BgL_alistzd2ze3addboxz31(map(function(d) {
                return new sc_Pair(BgL_factorzd2addresszd2(d), d);
              }, factors));
  };
BgL_cleanzd2storezd2factorsz00 = function(store) {
    var factors;
    var fresh_factors;
    var g1331;
    var g1330;
    g1330 = BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3factorsz31(store));
    g1331 = null;
    factors = g1330;
    fresh_factors = g1331;
    while (!(factors === null)) {
      if (BgL_factorzd2expiredzf3z21(factors.car, BgL_storezd2ze3tickz31(store)) !== false) {
        undefined;
      } else {
        fresh_factors = new sc_Pair(factors.car, fresh_factors);
      }
      factors = factors.cdr;
    }
    return BgL_setzd2storezd2factorsz12z12(store, BgL_factorszd2ze3addboxz31(fresh_factors));
  };
BgL_factorzd2newzf3z21 = function(factor) {
    return false === BgL_factorzd2tickszd2(factor).cdr;
  };
BgL_factorzd2expiredzf3z21 = function(factor, tick) {
    return !(first(BgL_factorzd2tickszd2(factor)) === tick);
  };
BgL_fzd2pluszd2minuszd2commonzd2 = function(store) {
    var factors;
    var f_plus;
    var f_minus;
    var f_common;
    var g1335;
    var g1334;
    var g1333;
    var g1332;
    var result;
    g1332 = BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3factorsz31(store));
    g1333 = null;
    g1334 = null;
    g1335 = null;
    factors = g1332;
    f_plus = g1333;
    f_minus = g1334;
    f_common = g1335;
    while (!(factors === null)) {
      if (BgL_factorzd2expiredzf3z21(factors.car, BgL_storezd2ze3tickz31(store)) !== false) {
        f_minus = new sc_Pair(factors.car, f_minus);
        factors = factors.cdr;
      } else {
        if (BgL_factorzd2newzf3z21(factors.car) !== false) {
          f_plus = new sc_Pair(factors.car, f_plus);
          factors = factors.cdr;
        } else {
          if (BgL_factorzd2mustzd2annealzd2fzb2zd2zf3z41(factors.car) !== false) {
            f_plus = new sc_Pair(factors.car, f_plus);
            f_minus = new sc_Pair(factors.car, f_minus);
            factors = factors.cdr;
          } else {
            f_common = new sc_Pair(factors.car, f_common);
            factors = factors.cdr;
          }
        }
      }
    }
    result = sc_list(f_plus, f_minus, f_common);
    return result;
  };
BgL_interpzd2rangezd2 = function(min, max, n) {
    if (n === 1) {
      return max;
    } else {
      return map(function(i) {
                return min + i / (n - 1) * (max - min);
              }, iota(n));
    }
  };
BgL_interpzd2rangezd2powz00 = function(min, max, n, pow) {
    var res_list;
    res_list = BgL_interpzd2rangezd2(min, max, n);
    return map(function(x) {
              return 1 - sc_expt(1 - x, pow);
            }, res_list);
  };
BgL_provenancezf3zf3 = sc_isList;
BgL_runzd2xrpzd2drawzd2proposerzd2 = function(xrp, state) {
    var proc_or_box;
    proc_or_box = BgL_xrpzd2drawzd2proposerz00(xrp);
    if (BgL_provenancezf3zf3(proc_or_box) !== false) {
      return erase(BgL_fnzb2provzb2(new sc_Pair("\uEBACPROPOSAL-ADDR", null), BgL_mcmczd2statezd2ze3storeze3(state), proc_or_box, BgL_provzd2initzd2(state)));
    } else {
      return proc_or_box(new sc_Pair("\uEBACPROPOSAL-ADDR", null), BgL_mcmczd2statezd2ze3storeze3(state), state);
    }
  };
BgL_defaultzd2scorerzd2 = function(state) {
    return BgL_mcmczd2statezd2ze3scorezd2genericz31(state);
  };
BgL_logzd2flipza2z70 = function() {
    var w = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      w = sc_cons(arguments[sc_tmp], w);
    }
    if (w === null) {
      return BgL_randomzd2realzd2() < 0.5;
    } else {
      return sc_log(BgL_randomzd2realzd2()) < w.car;
    }
  };
BgL_uniformzd2drawza2z70 = function(lst) {
    if (lst === null) {
      return null;
    } else {
      return sc_listRef(lst, BgL_randomzd2integerzd2(sc_length(lst)));
    }
  };
BgL_proposablezd2xrpszd2 = function(state, is_proposable) {
    return filter(is_proposable, BgL_addboxzd2ze3valuesz31(BgL_mcmczd2statezd2ze3xrpzd2drawsz31(state)));
  };
BgL_selectivezd2proposalzd2distributionz00 = function(state, normal_form_proc, is_proposable) {
    var ind_bw;
    var ind_fw;
    var BgL_sc_cdzd2bwzf2fw_89z20;
    var proposal_state;
    var ret2;
    var proposal_bw_score;
    var proposal_fw_score;
    var proposed_val;
    var ret1;
    var chosen_xrp;
    var proposal_xrps;
    if (BgL_addboxzd2emptyzf3z21(BgL_mcmczd2statezd2ze3xrpzd2drawsz31(state)) !== false) {
      return sc_list(0, state);
    } else {
      proposal_xrps = BgL_proposablezd2xrpszd2(state, is_proposable);
      if (proposal_xrps === null) {
        return sc_list(0, state);
      } else {
        chosen_xrp = BgL_uniformzd2drawza2z70(proposal_xrps);
        ret1 = BgL_runzd2xrpzd2drawzd2proposerzd2(chosen_xrp, state);
        proposed_val = first(ret1);
        proposal_fw_score = second(ret1);
        proposal_bw_score = third(ret1);
        ret2 = BgL_counterfactualzd2updatezd2(state, normal_form_proc, pair(chosen_xrp, proposed_val));
        proposal_state = first(ret2);
        BgL_sc_cdzd2bwzf2fw_89z20 = second(ret2);
        ind_fw = -sc_log(sc_length(proposal_xrps));
        ind_bw = -sc_log(sc_length(BgL_proposablezd2xrpszd2(proposal_state, is_proposable)));
        return sc_list(proposal_bw_score - proposal_fw_score + BgL_sc_cdzd2bwzf2fw_89z20 + (ind_bw - ind_fw), proposal_state);
      }
    }
  };
BgL_basiczd2proposalzd2distributionz00 = function(state, normal_form_proc) {
    return BgL_selectivezd2proposalzd2distributionz00(state, normal_form_proc, function(xrp_draw) {
              return BgL_truez00;
            });
  };
BgL_rejectionzd2initializa7erz75 = function(normal_form_proc) {
    var rejectioninit_proposal_state;
    var res_cu;
    var init_state;
    do {
      init_state = BgL_churchzd2makezd2initialzd2mcmczd2statez00(new sc_Pair("\uEBACTOP", null), BgL_makezd2emptyzd2storez00());
      res_cu = BgL_counterfactualzd2updatezd2(init_state, normal_form_proc);
      rejectioninit_proposal_state = first(res_cu);
      if (BgL_minuszd2infinityzd2 === BgL_mcmczd2statezd2ze3scorezd2genericz31(rejectioninit_proposal_state)) {
        undefined;
      } else {
        return rejectioninit_proposal_state;
      }
    } while (true);
  };
BgL_verbosezd2initzd2 = false;
BgL_makezd2mhzd2kernelz00 = function(proposal_distribution, scorer) {
    return function(state) {
            var score_ratio;
            var accept;
            var new_p;
            var old_p;
            var proposal_state;
            var BgL_sc_bwzf2fw_90zf2;
            var ret;
            BgL_displayzd2larjzd2(sc_list("\uEBACcurr-sample", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(state)));
            ret = proposal_distribution(state);
            BgL_sc_bwzf2fw_90zf2 = first(ret);
            proposal_state = second(ret);
            old_p = scorer(state);
            new_p = scorer(proposal_state);
            accept = BgL_logzd2flipza2z70(sc_min(0, new_p - old_p + BgL_sc_bwzf2fw_90zf2));
            score_ratio = new_p - old_p + BgL_sc_bwzf2fw_90zf2;
            BgL_displayzd2larjzd2(sc_list("\uEBADscores", "\uEBACbw\u002ffw", BgL_sc_bwzf2fw_90zf2, "\uEBACold-p", old_p, "\uEBACnew-p", new_p, "\uEBACaccept", accept, "\uEBACscore-ratio", score_ratio));
            if (accept !== false) {
              BgL_displayzd2larjzd2statsz00("\uEBAClarj-run-accept");
              return proposal_state;
            } else {
              BgL_displayzd2larjzd2statsz00("\uEBAClarj-run-reject");
              return state;
            }
          };
  };
BgL_larjzd2scorerzd2 = function(state) {
    return sc_apply(sc_plus, map(BgL_factorzd2valuezd2, BgL_addboxzd2ze3valuesz31(BgL_storezd2ze3factorsz31(BgL_mcmczd2statezd2ze3storeze3(state)))));
  };
BgL_makezd2larjzd2kernelz00 = function(proposal_distribution, scorer) {
    return function(state) {
            var accept;
            var new_p;
            var old_p;
            var number_of_proposals_made;
            var proposal_state;
            var BgL_sc_bwzf2fw_91zf2;
            var ret;
            BgL_displayzd2larjzd2(sc_list("\uEBACcurr-sample", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(state)));
            ret = proposal_distribution(state);
            BgL_sc_bwzf2fw_91zf2 = first(ret);
            proposal_state = second(ret);
            number_of_proposals_made = third(ret);
            old_p = scorer(state);
            new_p = scorer(proposal_state);
            accept = BgL_logzd2flipza2z70(sc_min(0, new_p - old_p + BgL_sc_bwzf2fw_91zf2));
            new_p - old_p;
            if (accept !== false) {
              BgL_displayzd2larjzd2statsz00("\uEBAClarj-run-accept");
              BgL_displayzd2larjzd2logz00(sc_list("\uEBACfinal-score-ratio", new_p - old_p + BgL_sc_bwzf2fw_91zf2));
              BgL_displayzd2larjzd2logz00(BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(proposal_state));
              return sc_list(proposal_state, number_of_proposals_made);
            } else {
              BgL_displayzd2larjzd2statsz00("\uEBAClarj-run-reject");
              BgL_displayzd2larjzd2logz00(sc_list("\uEBACfinal-score-ratio", new_p - old_p + BgL_sc_bwzf2fw_91zf2));
              BgL_displayzd2larjzd2logz00(BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(state));
              return sc_list(state, number_of_proposals_made);
            }
          };
  };
BgL_cyclezd2kernelzd2 = function() {
    var kernels = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      kernels = sc_cons(arguments[sc_tmp], kernels);
    }
    return function(state) {
            return fold(function(k, s) {
                      return k(s);
                    }, state, kernels);
          };
  };
BgL_repeatzd2kernelzd2 = function(steps, kernel) {
    return sc_apply(BgL_cyclezd2kernelzd2, BgL_makezd2listzd2(steps, kernel));
  };
BgL_basiczd2repeatzd2kernelz00 = function(steps, nfqp) {
    return BgL_repeatzd2kernelzd2(steps, BgL_makezd2mhzd2kernelz00(function(state) {
                return BgL_basiczd2proposalzd2distributionz00(state, nfqp);
              }, BgL_defaultzd2scorerzd2));
  };
BgL_repeatedzd2mcmczd2queryzd2corezd2 = function(initializer, kernel, num_samples) {
    var init_state;
    init_state = initializer();
    return BgL_mcmczd2loopzd2(kernel, init_state, num_samples, null);
  };
BgL_repeatedzd2mcmczd2queryzd2corezd2proposalzd2countzd2 = function(initializer, kernel, num_proposals_to_make) {
    var next_num_proposal;
    var next_state;
    var state_and_num_proposals;
    var kernel_206;
    var state;
    var samples;
    var num_proposals_left;
    var g1336;
    var init_state;
    init_state = initializer();
    g1336 = null;
    kernel_206 = kernel;
    state = init_state;
    samples = g1336;
    num_proposals_left = num_proposals_to_make;
    while (!(num_proposals_left < 1)) {
      state_and_num_proposals = kernel_206(state);
      next_state = first(state_and_num_proposals);
      next_num_proposal = second(state_and_num_proposals);
      samples = pair(BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(state), samples);
      state = next_state;
      num_proposals_left -= next_num_proposal;
    }
    return sc_reverse(samples);
  };
BgL_mcmczd2loopzd2 = function(kernel, state, samples_left, samples) {
    var q_v;
    if (samples_left < 1) {
      return sc_reverse(samples);
    } else {
      q_v = BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(state);
      return BgL_mcmczd2loopzd2(kernel, kernel(state), samples_left - 1, pair(q_v, samples));
    }
  };
BgL_mhzd2queryza2z70 = function(samples, lag, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_basiczd2repeatzd2kernelz00(lag, normal_form_proc), samples);
  };
BgL_mhzd2queryzf2annealedzd2initza2z50 = function(temps, samples, lag, rej_steps, BgL_sc_tempszd2ze3nfqp_92z31) {
    var normal_form_proc;
    normal_form_proc = sc_apply(BgL_sc_tempszd2ze3nfqp_92z31, first(temps));
    return BgL_repeatedzd2mcmczd2queryzd2corezd2(function() {
              return BgL_annealingzd2initializa7erz75(rej_steps, temps, BgL_sc_tempszd2ze3nfqp_92z31);
            }, BgL_basiczd2repeatzd2kernelz00(lag, normal_form_proc), samples);
  };
BgL_DEBUGzd2LARJzd2 = false;
BgL_PRINTzd2LARJzd2STATSz00 = false;
BgL_enablezd2larjzd2debugz00 = function() {
    return BgL_DEBUGzd2LARJzd2 = true;
  };
BgL_disablezd2larjzd2debugz00 = function() {
    return BgL_DEBUGzd2LARJzd2 = false;
  };
BgL_displayzd2larjzd2 = function(x) {
    if (BgL_DEBUGzd2LARJzd2 !== false) {
      return sc_display(x);
    } else {
      return null;
    }
  };
BgL_enablezd2larjzd2statsz00 = function() {
    return BgL_PRINTzd2LARJzd2STATSz00 = true;
  };
BgL_disablezd2larjzd2statsz00 = function() {
    return BgL_PRINTzd2LARJzd2STATSz00 = false;
  };
BgL_displayzd2larjzd2statsz00 = function(x) {
    if (BgL_PRINTzd2LARJzd2STATSz00 !== false) {
      return sc_display(x);
    } else {
      return null;
    }
  };
BgL_PRINTzd2LARJzd2RUNz00 = false;
BgL_enablezd2larjzd2logz00 = function() {
    return BgL_PRINTzd2LARJzd2RUNz00 = true;
  };
BgL_disablezd2larjzd2logz00 = function() {
    return BgL_PRINTzd2LARJzd2RUNz00 = false;
  };
BgL_displayzd2larjzd2logz00 = function(x) {
    if (BgL_PRINTzd2LARJzd2RUNz00 !== false) {
      return sc_display(x);
    } else {
      return null;
    }
  };
BgL_shouldzd2dozd2larjzf3zf3 = function(proposal_state) {
    var tmp1337;
    var fpmc;
    fpmc = BgL_mcmczd2statezd2ze3diffzd2factorsz31(proposal_state);
    tmp1337 = sc_length(first(fpmc)) > 0;
    if (tmp1337 !== false) {
      return tmp1337;
    } else {
      return sc_length(second(fpmc)) > 0;
    }
  };
BgL_shouldzd2dozd2larjzf3zd2dynamicz21 = function(proposal_state) {
    var tmp1338;
    var fpmc;
    fpmc = BgL_mcmczd2statezd2ze3diffzd2factorsz31(proposal_state);
    tmp1338 = sc_length(first(fpmc)) > 0;
    if (tmp1338 !== false) {
      return tmp1338;
    } else {
      return sc_length(second(fpmc)) > 0;
    }
  };
BgL_larjzd2selectivezd2proposalzd2distributionzd2 = function(state, normal_form_proc, is_proposable, num_temps, power, static_proposal) {
    var final_correction;
    var num_proposals_to_make;
    var larj_correction;
    var proposed_larj_state;
    var larj_state_and_correction;
    var is_structural_change;
    var ind_bw;
    var ind_fw;
    var BgL_sc_cdzd2bwzf2fw_93z20;
    var proposal_state;
    var ret2;
    var proposal_bw_score;
    var proposal_fw_score;
    var proposed_val;
    var ret1;
    var chosen_xrp;
    var proposal_xrps;
    if (BgL_addboxzd2emptyzf3z21(BgL_mcmczd2statezd2ze3xrpzd2drawsz31(state)) !== false) {
      return sc_list(0, state);
    } else {
      proposal_xrps = BgL_proposablezd2xrpszd2(state, is_proposable);
      if (proposal_xrps === null) {
        return sc_list(0, state);
      } else {
        chosen_xrp = BgL_uniformzd2drawza2z70(proposal_xrps);
        ret1 = BgL_runzd2xrpzd2drawzd2proposerzd2(chosen_xrp, state);
        proposed_val = first(ret1);
        proposal_fw_score = second(ret1);
        proposal_bw_score = third(ret1);
        ret2 = BgL_counterfactualzd2updatezd2larjz00(state, normal_form_proc, pair(chosen_xrp, proposed_val));
        proposal_state = first(ret2);
        BgL_sc_cdzd2bwzf2fw_93z20 = second(ret2);
        ind_fw = -sc_log(sc_length(proposal_xrps));
        ind_bw = -sc_log(sc_length(BgL_proposablezd2xrpszd2(proposal_state, is_proposable)));
        is_structural_change = BgL_xrpzd2drawzd2structuralzf3zf3(chosen_xrp);
        if (is_structural_change !== false) {
          BgL_displayzd2larjzd2("\uEBACdo-structural-change");
          larj_state_and_correction = BgL_dozd2larjzd2annealzd2correctionzd2(state, proposal_state, normal_form_proc, num_temps, power, static_proposal);
        } else {
          larj_state_and_correction = sc_list(proposal_state, 0);
        }
        proposed_larj_state = first(larj_state_and_correction);
        larj_correction = second(larj_state_and_correction);
        if (is_structural_change !== false) {
          num_proposals_to_make = third(larj_state_and_correction);
        } else {
          num_proposals_to_make = 1;
        }
        final_correction = proposal_bw_score - proposal_fw_score + BgL_sc_cdzd2bwzf2fw_93z20 + (ind_bw - ind_fw) + larj_correction;
        BgL_displayzd2larjzd2logz00(sc_list("\uEBAClarj-correction", larj_correction));
        BgL_displayzd2larjzd2(sc_list("\uEBADtotal-corrections", "\uEBAClarj-correction", larj_correction, "\uEBACprop-fw", proposal_fw_score, "\uEBACprop-bw", proposal_bw_score, "\uEBACcd-bw\u002ffw", BgL_sc_cdzd2bwzf2fw_93z20, "\uEBACind-bw", ind_bw, "\uEBACind-fw", ind_fw, "\uEBACfinal-correction", final_correction, "\uEBACdid-anneal?", is_structural_change));
        return sc_list(proposal_bw_score - proposal_fw_score + BgL_sc_cdzd2bwzf2fw_93z20 + (ind_bw - ind_fw) + larj_correction, proposed_larj_state, num_proposals_to_make);
      }
    }
  };
BgL_extendedzd2statezd2spacezd2selectivezd2proposalzd2distributionzd2 = function(state1state2, normal_form_proc, is_proposable) {
    var BgL_sc_state2za2_94za2;
    var tmp1340;
    var BgL_sc_state1za2_95za2;
    var tmp1339;
    var proposed_val;
    var id_state_to_perturb;
    var id_state_and_proposed_val;
    var chosen_xrp;
    var state2;
    var state1;
    var proposal_xrps;
    proposal_xrps = BgL_combinezd2proposablezd2xrpzd2drawszd2(state1state2, is_proposable);
    if (proposal_xrps === null) {
      return sc_list(0, state1state2);
    } else {
      state1 = BgL_extendedzd2statezd2ze3beforeze3(state1state2);
      state2 = BgL_extendedzd2statezd2ze3afterze3(state1state2);
      chosen_xrp = BgL_uniformzd2drawza2z70(proposal_xrps);
      id_state_and_proposed_val = BgL_whichzd2statezd2tozd2perturbzd2andzd2newzd2proposalz00(chosen_xrp, state1state2);
      id_state_to_perturb = first(id_state_and_proposed_val);
      proposed_val = first(second(id_state_and_proposed_val));
      tmp1339 = STATE_SRC_BOTH === id_state_to_perturb;
      if ((tmp1339 !== false? tmp1339: STATE_SRC_1 === id_state_to_perturb) !== false) {
        BgL_displayzd2larjzd2("\uEBACperturb-state-before");
        BgL_sc_state1za2_95za2 = first(BgL_counterfactualzd2updatezd2(state1, normal_form_proc, pair(chosen_xrp, proposed_val)));
      } else {
        BgL_sc_state1za2_95za2 = state1;
      }
      tmp1340 = STATE_SRC_BOTH === id_state_to_perturb;
      if ((tmp1340 !== false? tmp1340: STATE_SRC_2 === id_state_to_perturb) !== false) {
        BgL_displayzd2larjzd2("\uEBACperturb-state-after");
        BgL_sc_state2za2_94za2 = first(BgL_counterfactualzd2updatezd2(state2, normal_form_proc, pair(chosen_xrp, proposed_val)));
      } else {
        BgL_sc_state2za2_94za2 = state2;
      }
      return sc_list(0, BgL_makezd2extendedzd2statez00(BgL_sc_state1za2_95za2, BgL_sc_state2za2_94za2));
    }
  };
BgL_combinezd2proposablezd2xrpzd2drawszd2 = function(state1state2, is_proposable) {
    var proposable_xrp_draws;
    var combined_xrp_draws;
    var state2;
    var state1;
    state1 = BgL_extendedzd2statezd2ze3beforeze3(state1state2);
    state2 = BgL_extendedzd2statezd2ze3afterze3(state1state2);
    combined_xrp_draws = BgL_combinezd2xrpzd2drawsz00(state1, state2);
    proposable_xrp_draws = filter(is_proposable, combined_xrp_draws);
    return proposable_xrp_draws;
  };
STATE_SRC_NONE = 0;
STATE_SRC_1 = 1;
STATE_SRC_2 = 2;
STATE_SRC_BOTH = 3;
BgL_whichzd2statezd2tozd2perturbzd2andzd2newzd2proposalz00 = function(chosen_xrp, state1state2) {
    var state2;
    var state1;
    state1 = BgL_extendedzd2statezd2ze3beforeze3(state1state2);
    state2 = BgL_extendedzd2statezd2ze3afterze3(state1state2);
    if (BgL_xrpzd2inzd2statezf3zf3(chosen_xrp, state1) && BgL_xrpzd2inzd2statezf3zf3(chosen_xrp, state2) !== false) {
      return sc_list(STATE_SRC_BOTH, BgL_runzd2xrpzd2drawzd2proposerzd2(chosen_xrp, state2));
    } else {
      if (BgL_xrpzd2inzd2statezf3zf3(chosen_xrp, state2) !== false) {
        return sc_list(STATE_SRC_2, BgL_runzd2xrpzd2drawzd2proposerzd2(chosen_xrp, state2));
      } else {
        if (BgL_xrpzd2inzd2statezf3zf3(chosen_xrp, state1) !== false) {
          return sc_list(STATE_SRC_1, BgL_runzd2xrpzd2drawzd2proposerzd2(chosen_xrp, state1));
        } else {
          return sc_error(chosen_xrp, "\uEBADError", chosen, xrp, sc_not, BgL_inz00, any, of, the, two, BgL_statesz12z12);
        }
      }
    }
  };
BgL_getzd2larjzd2scorez00 = function(state1state2, temp, up_down_temp) {
    var f_common_score;
    var f_minus_score;
    var f_plus_score;
    var f_common_no_anneal;
    var f_common_must_anneal;
    var f_minus_anneal;
    var f_minus_no_anneal;
    var f_plus_anneal;
    var f_plus_no_anneal;
    var f_common;
    var f_minus;
    var f_plus;
    var new_fpmc;
    var after_update_from_state1_fpmc;
    var state2;
    var state1;
    state1 = BgL_extendedzd2statezd2ze3beforeze3(state1state2);
    state2 = BgL_extendedzd2statezd2ze3afterze3(state1state2);
    after_update_from_state1_fpmc = BgL_updatezd2fzd2pluszd2minuszd2commonzd2scoreszd2(state1, BgL_storezd2ze3diffzd2factorsze3(BgL_mcmczd2statezd2ze3storeze3(state2)));
    new_fpmc = BgL_updatezd2fzd2pluszd2minuszd2commonzd2scoreszd2(state2, after_update_from_state1_fpmc);
    f_plus = first(new_fpmc);
    f_minus = second(new_fpmc);
    f_common = third(new_fpmc);
    f_plus_no_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(BgL_factorzd2mustzd2notzd2annealzf3z21, f_plus)));
    f_plus_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(function(f) {
              return BgL_factorzd2mustzd2notzd2annealzf3z21(f) === false;
            }, f_plus)));
    f_minus_no_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(BgL_factorzd2mustzd2notzd2annealzf3z21, f_minus)));
    f_minus_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(function(f) {
              return BgL_factorzd2mustzd2notzd2annealzf3z21(f) === false;
            }, f_minus)));
    f_common_must_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(BgL_factorzd2mustzd2annealzf3zf3, f_common)));
    f_common_no_anneal = sc_apply(sc_plus, map(BgL_factorzd2valuezd2, filter(function(f) {
              return BgL_factorzd2mustzd2annealzf3zf3(f) === false;
            }, f_common)));
    f_plus_score = f_plus_no_anneal + f_plus_anneal * (1 - temp);
    f_minus_score = f_minus_no_anneal + f_minus_anneal * temp;
    f_common_score = f_common_must_anneal * up_down_temp + f_common_no_anneal;
    BgL_displayzd2larjzd2(sc_list("\uEBACf+anneal", f_plus_anneal, f_plus_anneal * (1 - temp)));
    BgL_displayzd2larjzd2(sc_list("\uEBACf-anneal", f_minus_anneal, f_minus_anneal * temp));
    BgL_displayzd2larjzd2(sc_list("\uEBACfc-no-anneal", f_common_no_anneal));
    BgL_displayzd2larjzd2(sc_list("\uEBACfc-anneal", f_common_must_anneal, f_common_must_anneal * up_down_temp));
    BgL_displayzd2larjzd2(sc_list("\uEBACf+no-anneal", f_plus_no_anneal));
    BgL_displayzd2larjzd2(sc_list("\uEBACf-no-anneal", f_minus_no_anneal));
    return f_plus_score + f_minus_score + f_common_score;
  };
BgL_geozd2seqzd2 = function(n, z) {
    return sc_append(map(function(i) {
                return sc_expt(z, i);
              }, iota(n - 1)), sc_list(0));
  };
replicate = function(n, x) {
    if (n === 0) {
      return null;
    } else {
      return new sc_Pair(x, replicate(n - 1, x));
    }
  };
BgL_listzd2repzd2 = function(n, xs) {
    return sc_apply(sc_append, map(function(x) {
                return replicate(n, x);
              }, xs));
  };
BgL_STOPzd2ALPHAzd2 = false;
BgL_enablezd2annealzd2earlyzd2stopzd2 = function(a) {
    return BgL_STOPzd2ALPHAzd2 = a;
  };
BgL_disablezd2annealzd2earlyzd2stopzd2 = function() {
    return BgL_STOPzd2ALPHAzd2 = false;
  };
BgL_dozd2larjzd2annealzd2correctionzd2 = function(original_state, jumped_state, normal_form_proc, num_temps, power, static_proposal) {
    var accept;
    var local_alpha;
    var next_score;
    var curr_score;
    var next_state;
    var BgL_sc_bwzf2fw_96zf2;
    var BgL_sc_bwzf2fwzd2andzd2nextzd2state_97z20;
    var total_correction;
    var temp_list;
    var up_down_temp_list;
    var curr_state;
    var g1343;
    var g1342;
    var g1341;
    g1341 = BgL_interpzd2rangezd2powz00(1, 0, num_temps, power);
    if (num_temps % 2 === 0) {
      g1342 = sc_append(BgL_interpzd2rangezd2powz00(1, 0, sc_floor(num_temps / 2), power), BgL_interpzd2rangezd2powz00(0, 1, sc_floor(num_temps / 2), power));
    } else {
      g1342 = sc_append(BgL_interpzd2rangezd2powz00(1, 0, 1 + sc_floor(num_temps / 2), power), BgL_interpzd2rangezd2powz00(0, 1, 1 + sc_floor(num_temps / 2), power).cdr);
    }
    g1343 = BgL_makezd2extendedzd2statez00(original_state, jumped_state);
    total_correction = 0;
    temp_list = g1341;
    up_down_temp_list = g1342;
    curr_state = g1343;
    while (!(temp_list === null)) {
      if (BgL_STOPzd2ALPHAzd2 && BgL_STOPzd2ALPHAzd2 > total_correction) {
        BgL_displayzd2larjzd2statsz00("\uEBACEARLY-REJECTION");
        return sc_list(BgL_extendedzd2statezd2ze3afterze3(curr_state), total_correction, num_temps - sc_length(temp_list));
      } else {
        BgL_displayzd2larjzd2("\uEBACone-anneal-step");
        BgL_sc_bwzf2fwzd2andzd2nextzd2state_97z20 = static_proposal(curr_state);
        BgL_sc_bwzf2fw_96zf2 = first(BgL_sc_bwzf2fwzd2andzd2nextzd2state_97z20);
        next_state = second(BgL_sc_bwzf2fwzd2andzd2nextzd2state_97z20);
        curr_score = BgL_getzd2larjzd2scorez00(curr_state, temp_list.car, up_down_temp_list.car);
        BgL_displayzd2larjzd2(sc_list("\uEBACcurrent-annealed-score", curr_score));
        next_score = BgL_getzd2larjzd2scorez00(next_state, temp_list.car, up_down_temp_list.car);
        BgL_displayzd2larjzd2(sc_list("\uEBACnext-annealed-score", next_score));
        local_alpha = next_score - curr_score;
        accept = BgL_logzd2flipza2z70(sc_min(0, local_alpha + BgL_sc_bwzf2fw_96zf2));
        BgL_displayzd2larjzd2(sc_list("\uEBACcurr-before", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(BgL_extendedzd2statezd2ze3beforeze3(curr_state))));
        BgL_displayzd2larjzd2(sc_list("\uEBACcurr-after", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(BgL_extendedzd2statezd2ze3afterze3(curr_state))));
        BgL_displayzd2larjzd2(sc_list("\uEBACnext-before", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(BgL_extendedzd2statezd2ze3beforeze3(next_state))));
        BgL_displayzd2larjzd2(sc_list("\uEBACnext-after", BgL_mcmczd2statezd2ze3queryzd2valuezd2genericze3(BgL_extendedzd2statezd2ze3afterze3(next_state))));
        BgL_displayzd2larjzd2(sc_list("\uEBACtemp", temp_list.car, "\uEBAClocal-alpha", local_alpha, "\uEBACaccept", accept, "\uEBACtotal-correction-to-accumulate", total_correction));
        if (accept !== false) {
          total_correction += -local_alpha;
          temp_list = temp_list.cdr;
          up_down_temp_list = up_down_temp_list.cdr;
          curr_state = next_state;
        } else {
          temp_list = temp_list.cdr;
          up_down_temp_list = up_down_temp_list.cdr;
        }
      }
    }
    return sc_list(BgL_extendedzd2statezd2ze3afterze3(curr_state), total_correction, num_temps - sc_length(temp_list));
  };
BgL_nonzd2structuralzd2proposalzd2distributionzd2 = function(state, normal_form_proc) {
    return BgL_selectivezd2proposalzd2distributionz00(state, normal_form_proc, function(xrp_draw) {
              return BgL_xrpzd2drawzd2structuralzf3zf3(xrp_draw) === false;
            });
  };
BgL_extendedzd2statezd2spacezd2proposalzd2distributionz00 = function(state1state2, normal_form_proc) {
    return BgL_extendedzd2statezd2spacezd2selectivezd2proposalzd2distributionzd2(state1state2, normal_form_proc, function(xrp_draw) {
              return BgL_xrpzd2drawzd2structuralzf3zf3(xrp_draw) === false;
            });
  };
BgL_larjzd2proposalzd2distributionz00 = function(state, normal_form_proc, num_temps, power, static_proposal) {
    return BgL_larjzd2selectivezd2proposalzd2distributionzd2(state, normal_form_proc, BgL_xrpzd2drawzd2structuralzf3zf3, num_temps, power, static_proposal);
  };
BgL_nonzd2structuralzd2kernelz00 = function(steps, nfqp) {
    return BgL_repeatzd2kernelzd2(steps, BgL_makezd2mhzd2kernelz00(function(state) {
                return BgL_nonzd2structuralzd2proposalzd2distributionzd2(state, nfqp);
              }, BgL_defaultzd2scorerzd2));
  };
BgL_larjzd2kernelzd2 = function(num_temps, steps, power, nfqp) {
    var static_proposal;
    static_proposal = function(state1state2) {
        return BgL_extendedzd2statezd2spacezd2proposalzd2distributionz00(state1state2, nfqp);
      };
    return BgL_repeatzd2kernelzd2(steps, BgL_makezd2mhzd2kernelz00(function(state) {
                return BgL_larjzd2proposalzd2distributionz00(state, nfqp, num_temps, power, static_proposal);
              }, BgL_defaultzd2scorerzd2));
  };
BgL_larjzd2kernelzd2proposalzd2countzd2 = function(num_temps, steps, power, nfqp) {
    var static_proposal;
    static_proposal = function(state1state2) {
        return BgL_extendedzd2statezd2spacezd2proposalzd2distributionz00(state1state2, nfqp);
      };
    return BgL_makezd2larjzd2kernelz00(function(state) {
              return BgL_larjzd2proposalzd2distributionz00(state, nfqp, num_temps, power, static_proposal);
            }, BgL_defaultzd2scorerzd2);
  };
BgL_nonzd2structuralzd2mhzd2queryza2z70 = function(samples, lag, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_nonzd2structuralzd2kernelz00(lag, normal_form_proc), samples);
  };
BgL_larjzd2mhzd2queryzb2powerza2z10 = function(samples, lag, num_temps, power, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_larjzd2kernelzd2(num_temps, lag, power, normal_form_proc), samples);
  };
BgL_larjzd2mhzd2queryza2za2 = function(samples, lag, num_temps, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_larjzd2kernelzd2(num_temps, lag, 1, normal_form_proc), samples);
  };
BgL_larjzd2mhzd2queryzd2proposalzd2countzb2powerza2z10 = function(num_proposals_to_make, lag, num_temps, power, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2proposalzd2countzd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_larjzd2kernelzd2proposalzd2countzd2(num_temps, lag, power, normal_form_proc), num_proposals_to_make);
  };
BgL_larjzd2mhzd2queryzd2proposalzd2countza2za2 = function(num_proposals_to_make, lag, num_temps, normal_form_proc) {
    return BgL_repeatedzd2mcmczd2queryzd2corezd2proposalzd2countzd2(function() {
              return BgL_rejectionzd2initializa7erz75(normal_form_proc);
            }, BgL_larjzd2kernelzd2proposalzd2countzd2(num_temps, lag, 1, normal_form_proc), num_proposals_to_make);
  };
BgL_churchzd2mainzd2 = function(address, store) {
    var stmp;
    var church_sum;
    var church_repeat;
    var church_for_each;
    var church_fold;
    var church_foldl;
    var church_foldl1;
    var church_map;
    var church_single_map;
    var church_multi_map;
    var church_filter;
    var church_filter_map;
    var church_list_index;
    var church_zip;
    var church_rejection_query;
    var church_beta;
    var church_make_GEM;
    var church_pick_a_stick;
    var church_make_PYP;
    var church_flatten;
    var church_mean;
    var church_tr_iota;
    var church_tr_map;
    var church_tr_zipN;
    var church_tr_zip;
    var church_tr_zip3;
    var church_tr_zip4;
    var church_tr_filter;
    var church_tr_drop_last;
    var church_re_apply;
    var church_tr_cddr;
    var church_tr_cdddr;
    var church_tr_cddddr;
    var church_tr_cdddddr;
    var church_tr_cadr;
    var church_tr_caddr;
    var church_tr_cadddr;
    var church_tr_caddddr;
    var church_tr_cadddddr;
    var church_tr_first;
    var church_tr_second;
    var church_tr_third;
    var church_tr_pairs;
    var church_tr_append;
    var church_tr_last;
    var church_tr_assoc;
    var church_make_stateless_xrp;
    var church_flip;
    var church_log_flip;
    var church_dirichlet;
    var church_sample_discrete;
    var church_sample_integer;
    var church_gensym;
    var church_random_permutation;
    var church_put;
    var church_make_dirichlet_discrete;
    var church_make_CRP;
    var church_DPmem;
    var church_make_stateless_structural_xrp;
    var church_sample_integerS;
    var church_random_permutationS;
    var church_putS;
    var church_make_dirichlet_discreteS;
    var church_make_CRPS;
    var church_my_pi;
    var church_drop_last;
    var church_pairs;
    var church_log_sigmoid;
    var church_greater_log;
    var church_gauss_log_pdf;
    var church_norm_gauss_log_pdf;
    var church_norm_eq_log;
    var church_larj_mh_query_proposal_count;
    var BgL_sc_churchzd2identityza2_98z70;
    var BgL_sc_churchzd2stringzd2emptyzf3za2_99z51;
    var BgL_sc_churchzd2vectorzd2emptyzf3za2_100z51;
    var BgL_sc_churchzd2stringzd2ze3vectorza2_101z41;
    var BgL_sc_churchzd2vectorzd2levenshteinzf2predicatezf2getzd2scratch_102zd2;
    var BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2;
    var BgL_sc_churchzd2vectorzd2levenshteinzf2eqv_104zf2;
    var BgL_sc_churchzd2vectorzd2levenshteinzf2equal_105zf2;
    var BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2;
    var BgL_sc_churchzd2listzd2levenshteinzf2equal_107zf2;
    var church_string_levenshtein;
    var BgL_sc_churchzd2stringzd2levenshteinzf2predicateza2_108z50;
    var BgL_sc_churchzd2levenshteinzf2predicate_109z20;
    var church_levenshtein;
    var church_make_author_as_cited;
    var BgL_sc_churchzd2authorzd2aszd2citedzd2ze3firstname_110ze3;
    var BgL_sc_churchzd2authorzd2aszd2citedzd2ze3middlename_111ze3;
    var BgL_sc_churchzd2authorzd2aszd2citedzd2ze3lastname_112ze3;
    var church_parse_author;
    var church_parse_authors;
    var church_make_paper;
    var BgL_sc_churchzd2paperzd2ze3title_113ze3;
    var church_make_citation;
    var BgL_sc_churchzd2citationzd2ze3numzd2obszd2authors_114ze3;
    var BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31;
    var BgL_sc_churchzd2citationzd2ze3obszd2title_116z31;
    var church_parse_citation;
    var church_all_citations;
    var church_author_sets;
    var church_title_sets;
    var church_initialization;
    var church_citations;
    var church_distance_string;
    var church_distance_string_case_insensitive;
    var church_score_affinity;
    var church_score_repulsion;
    var church_factor_repulsion;
    var church_factor_citation_paper;
    var church_get_initial;
    var church_distance_firstname;
    var church_distance_middlename;
    var church_distance_lastname;
    var church_distance_author;
    var church_string_length_author;
    var church_string_length_authors;
    var church_distance_citation;
    var church_sample_paper_title;
    var church_sample_paper_authors;
    var church_sample_paper;
    BgL_provzd2initzd2(function(address, store, church_thunk) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa1", address), store, church_thunk, arglist());
      });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                  return BgL_provzd2initzd2(null);
                }, function() {
                  return BgL_primzb2provzb2(sc_listRef, church_lst, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa2", address), store, church_sample_integer, arglist(BgL_primzb2provzb2(sc_length, church_lst))));
                });
      });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa3", address), store, BgL_churchzd2andzd2, church_lst);
      });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa4", address), store, BgL_churchzd2orzd2, church_lst);
      });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa5", address), store, BgL_churchzd2za2z70, church_lst);
      });
    church_sum = BgL_provzd2initzd2(function(address, store, church_lst) {
          return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa6", address), store, BgL_churchzd2zb2z60, church_lst);
        });
    church_repeat = BgL_provzd2initzd2(function(address, store, church_N, church_proc) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_N, BgL_provzd2initzd2(0)), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_primzb2provzb2(pair, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa7", address), store, church_proc, arglist()), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa8", address), store, church_repeat, arglist(BgL_primzb2provzb2(sc_minus, church_N, BgL_provzd2initzd2(1)), church_proc)));
                  });
        });
    church_for_each = BgL_provzd2initzd2(function(address, store, church_proc, church_lst) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa9", address), store, church_proc, arglist(BgL_primzb2provzb2(first, church_lst)));
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa10", address), store, church_for_each, arglist(church_proc, BgL_primzb2provzb2(rest, church_lst)));
                  });
        });
    church_fold = BgL_provzd2initzd2(function(address, store, church_proc, church_init) {
          var church_lsts = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 4; --sc_tmp) {
            church_lsts = sc_cons(arguments[sc_tmp], church_lsts);
          }
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_lsts))), function() {
                    return church_init;
                  }, function() {
                    return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa11", address), store, church_fold, BgL_primzb2provzb2(pair, church_proc, BgL_primzb2provzb2(pair, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa12", address), store, church_proc, BgL_primzb2provzb2(sc_append, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa13", address), store, church_single_map, arglist(BgL_churchzd2firstzd2, BgL_extractzd2optzd2argz00(church_lsts))), BgL_primzb2provzb2(sc_list, church_init))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa14", address), store, church_single_map, arglist(BgL_churchzd2restzd2, BgL_extractzd2optzd2argz00(church_lsts))))));
                  });
        });
    church_foldl = BgL_provzd2initzd2(function(address, store, church_f, church_z, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return church_z;
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa15", address), store, church_foldl, arglist(church_f, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa16", address), store, church_f, arglist(church_z, BgL_primzb2provzb2(sc_car, church_xs))), BgL_primzb2provzb2(sc_cdr, church_xs)));
                  });
        });
    church_foldl1 = BgL_provzd2initzd2(function(address, store, church_f, church_xs) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa17", address), store, church_foldl, arglist(church_f, BgL_primzb2provzb2(sc_car, church_xs), BgL_primzb2provzb2(sc_cdr, church_xs)));
        });
    BgL_provzd2initzd2(function(address, store, church_f, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa18", address), store, church_foldl1, arglist(church_f, church_xs));
      });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        var church_loop;
        church_loop = BgL_provzd2initzd2(function(address, store, church_newlst, church_lst) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                        return church_newlst;
                      }, function() {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa19", address), store, church_loop, arglist(BgL_primzb2provzb2(sc_cons, BgL_primzb2provzb2(sc_car, church_lst), church_newlst), BgL_primzb2provzb2(sc_cdr, church_lst)));
                      });
            });
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa20", address), store, church_loop, arglist(BgL_provzd2initzd2(null), church_lst));
      });
    church_map = BgL_provzd2initzd2(function(address, store, church_proc) {
          var church_lsts = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
            church_lsts = sc_cons(arguments[sc_tmp], church_lsts);
          }
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(rest, BgL_extractzd2optzd2argz00(church_lsts))), function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa21", address), store, church_single_map, arglist(church_proc, BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_lsts))));
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa22", address), store, church_multi_map, arglist(church_proc, BgL_extractzd2optzd2argz00(church_lsts)));
                  });
        });
    church_single_map = BgL_provzd2initzd2(function(address, store, church_proc, church_lst) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_primzb2provzb2(pair, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa23", address), store, church_proc, arglist(BgL_primzb2provzb2(first, church_lst))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa24", address), store, church_map, arglist(church_proc, BgL_primzb2provzb2(rest, church_lst))));
                  });
        });
    church_multi_map = BgL_provzd2initzd2(function(address, store, church_proc, church_lsts) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(first, church_lsts)), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_primzb2provzb2(pair, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa25", address), store, church_proc, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa26", address), store, church_single_map, arglist(BgL_churchzd2firstzd2, church_lsts))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa27", address), store, church_multi_map, arglist(church_proc, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa28", address), store, church_single_map, arglist(BgL_churchzd2restzd2, church_lsts)))));
                  });
        });
    BgL_provzd2initzd2(function(address, store, church_proc) {
        var church_lsts = null;
        for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
          church_lsts = sc_cons(arguments[sc_tmp], church_lsts);
        }
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa29", address), store, church_multi_map, arglist(church_proc, BgL_extractzd2optzd2argz00(church_lsts)));
      });
    church_filter = BgL_provzd2initzd2(function(address, store, church_pred, church_lst) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa30", address), store, church_pred, arglist(BgL_primzb2provzb2(first, church_lst))), function() {
                              return BgL_primzb2provzb2(pair, BgL_primzb2provzb2(first, church_lst), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa31", address), store, church_filter, arglist(church_pred, BgL_primzb2provzb2(rest, church_lst))));
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa32", address), store, church_filter, arglist(church_pred, BgL_primzb2provzb2(rest, church_lst)));
                            });
                  });
        });
    church_filter_map = BgL_provzd2initzd2(function(address, store, church_proc, church_lst) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa33", address), store, BgL_provzd2initzd2(function(address, store, church_val) {
                                return BgL_ifzb2provzb2(store, church_val, function() {
                                          return BgL_primzb2provzb2(pair, church_val, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa34", address), store, church_filter_map, arglist(church_proc, BgL_primzb2provzb2(rest, church_lst))));
                                        }, function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa35", address), store, church_filter_map, arglist(church_proc, BgL_primzb2provzb2(rest, church_lst)));
                                        });
                              }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa36", address), store, church_proc, arglist(BgL_primzb2provzb2(first, church_lst)))));
                  });
        });
    church_list_index = BgL_provzd2initzd2(function(address, store, church_pred, church_lst) {
          var church_loop;
          church_loop = BgL_provzd2initzd2(function(address, store, church_lst, church_i) {
                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                          return BgL_provzd2initzd2(BgL_churchzd2falsezd2);
                        }, function() {
                          return BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa37", address), store, church_pred, arglist(BgL_primzb2provzb2(first, church_lst))), function() {
                                    return church_i;
                                  }, function() {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa38", address), store, church_loop, arglist(BgL_primzb2provzb2(rest, church_lst), BgL_primzb2provzb2(sc_plus, church_i, BgL_provzd2initzd2(1))));
                                  });
                        });
              });
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa39", address), store, church_loop, arglist(church_lst, BgL_provzd2initzd2(0)));
        });
    church_zip = BgL_provzd2initzd2(function(address, store) {
          var church_lists = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
            church_lists = sc_cons(arguments[sc_tmp], church_lists);
          }
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa40", address), store, church_multi_map, arglist(BgL_churchzd2listzd2, BgL_extractzd2optzd2argz00(church_lists)));
        });
    church_rejection_query = BgL_provzd2initzd2(function(address, store, church_nfqp) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa41", address), store, BgL_provzd2initzd2(function(address, store, church_val) {
                      return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(first, church_val), function() {
                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa42", address), store, BgL_primzb2provzb2(rest, church_val), arglist());
                              }, function() {
                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa43", address), store, church_rejection_query, arglist(church_nfqp));
                              });
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa44", address), store, church_nfqp, arglist())));
        });
    BgL_provzd2initzd2(function(address, store, church_vals, church_probs) {
        return BgL_primzb2provzb2(sc_listRef, church_vals, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa45", address), store, church_sample_discrete, arglist(church_probs)));
      });
    church_beta = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa46", address), store, church_dirichlet, arglist(BgL_primzb2provzb2(sc_list, church_a, church_b)));
        });
    church_make_GEM = BgL_provzd2initzd2(function(address, store, church_alpha) {
          var stmp;
          var stmp_232;
          var proc;
          proc = BgL_provzd2initzd2(function(address, store, church_x) {
                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa49", address), store, church_beta, arglist(BgL_provzd2initzd2(1), church_alpha));
              });
          stmp_232 = BgL_provzd2initzd2(function(address_233, store) {
                var args = null;
                for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                  args = sc_cons(arguments[sc_tmp], args);
                }
                return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
              });
          stmp = arglist(stmp_232);
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa47", address), store, BgL_provzd2initzd2(function(address, store, church_sticks) {
                      return BgL_provzd2initzd2(function(address, store) {
                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa48", address), store, church_pick_a_stick, arglist(church_sticks, BgL_provzd2initzd2(1)));
                              });
                    }), stmp);
        });
    church_pick_a_stick = BgL_provzd2initzd2(function(address, store, church_sticks, church_J) {
          return BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa50", address), store, church_flip, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa51", address), store, church_sticks, arglist(church_J)))), function() {
                    return church_J;
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa52", address), store, church_pick_a_stick, arglist(church_sticks, BgL_primzb2provzb2(sc_plus, church_J, BgL_provzd2initzd2(1))));
                  });
        });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_proc) {
        var stmp;
        var stmp_234;
        var stmp_235;
        var proc;
        var proc_236;
        proc = BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa58", address), store, church_make_GEM, arglist(church_alpha));
            });
        stmp_234 = BgL_provzd2initzd2(function(address_237, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
            });
        proc_236 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa57", address), store, church_proc, church_args);
            });
        stmp_235 = BgL_provzd2initzd2(function(address_238, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_236, args);
            });
        stmp = arglist(stmp_235, stmp_234);
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa53", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                    return BgL_provzd2initzd2(function(address, store) {
                              var church_argsin = null;
                              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                              }
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa54", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa55", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa56", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                            });
                  }), stmp);
      });
    church_make_PYP = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          var stmp;
          var stmp_239;
          var proc;
          proc = BgL_provzd2initzd2(function(address, store, church_x) {
                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa61", address), store, church_beta, arglist(BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1), church_a), BgL_primzb2provzb2(sc_plus, church_b, BgL_primzb2provzb2(sc_multi, church_a, church_x))));
              });
          stmp_239 = BgL_provzd2initzd2(function(address_240, store) {
                var args = null;
                for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                  args = sc_cons(arguments[sc_tmp], args);
                }
                return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
              });
          stmp = arglist(stmp_239);
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa59", address), store, BgL_provzd2initzd2(function(address, store, church_sticks) {
                      return BgL_provzd2initzd2(function(address, store) {
                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa60", address), store, church_pick_a_stick, arglist(church_sticks, BgL_provzd2initzd2(1)));
                              });
                    }), stmp);
        });
    BgL_provzd2initzd2(function(address, store, church_a, church_b, church_proc) {
        var stmp;
        var stmp_241;
        var stmp_242;
        var proc;
        var proc_243;
        proc = BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa67", address), store, church_make_PYP, arglist(church_a, church_b));
            });
        stmp_241 = BgL_provzd2initzd2(function(address_244, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
            });
        proc_243 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa66", address), store, church_proc, church_args);
            });
        stmp_242 = BgL_provzd2initzd2(function(address_245, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_243, args);
            });
        stmp = arglist(stmp_242, stmp_241);
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa62", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                    return BgL_provzd2initzd2(function(address, store) {
                              var church_argsin = null;
                              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                              }
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa63", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa64", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa65", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                            });
                  }), stmp);
      });
    church_flatten = BgL_provzd2initzd2(function(address, store, church_lst) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_lst), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isList, BgL_primzb2provzb2(first, church_lst)), function() {
                              return BgL_primzb2provzb2(sc_append, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa68", address), store, church_flatten, arglist(BgL_primzb2provzb2(first, church_lst))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa69", address), store, church_flatten, arglist(BgL_primzb2provzb2(rest, church_lst))));
                            }, function() {
                              return BgL_primzb2provzb2(pair, BgL_primzb2provzb2(first, church_lst), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa70", address), store, church_flatten, arglist(BgL_primzb2provzb2(rest, church_lst))));
                            });
                  });
        });
    church_mean = BgL_provzd2initzd2(function(address, store, church_lst) {
          return BgL_primzb2provzb2(sc_div, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa71", address), store, BgL_churchzd2zb2z60, church_lst), BgL_primzb2provzb2(sc_length, church_lst));
        });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa72", address), store, BgL_provzd2initzd2(function(address, store, church_mn) {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa73", address), store, church_mean, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa74", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_x) {
                                      return BgL_primzb2provzb2(sc_expt, BgL_primzb2provzb2(sc_minus, church_x, church_mn), BgL_provzd2initzd2(2));
                                    }), church_lst))));
                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa75", address), store, church_mean, arglist(church_lst))));
      });
    BgL_provzd2initzd2(function(address, store, church_x) {
        BgL_primzb2provzb2(sc_display, BgL_provzd2initzd2("\uEBADwarning", BgL_nozd2proposalszd2, sc_not, BgL_implementedze2ze2));
        return church_x;
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        var church_loop;
        church_loop = BgL_provzd2initzd2(function(address, store, church_acc, church_xs) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                        return church_acc;
                      }, function() {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa76", address), store, church_loop, arglist(BgL_trzd2conszb2provenancez60(BgL_trzd2carzb2provenancez60(church_xs), church_acc), BgL_trzd2cdrzb2provenancez60(church_xs)));
                      });
            });
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa77", address), store, church_loop, arglist(BgL_provzd2initzd2(null), church_xs));
      });
    church_tr_iota = BgL_provzd2initzd2(function(address, store, church_n) {
          return BgL_listzd2ze3trzd2listzb2provenancez51(BgL_primzb2provzb2(iota, church_n));
        });
    BgL_provzd2initzd2(function(address, store, church_n, church_f) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa78", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_i) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa79", address), store, church_f, arglist());
                    }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa80", address), store, church_tr_iota, arglist(church_n))));
      });
    church_tr_map = BgL_provzd2initzd2(function(address, store, church_f, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_trzd2conszb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa81", address), store, church_f, arglist(BgL_trzd2carzb2provenancez60(church_xs))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa82", address), store, church_tr_map, arglist(church_f, BgL_trzd2cdrzb2provenancez60(church_xs))));
                  });
        });
    church_tr_zipN = BgL_provzd2initzd2(function(address, store, church_xss) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_trzd2carzb2provenancez60(church_xss)), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_trzd2conszb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa83", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_x) {
                                    return BgL_trzd2carzb2provenancez60(church_x);
                                  }), church_xss)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa84", address), store, church_tr_zipN, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa85", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_x) {
                                        return BgL_trzd2cdrzb2provenancez60(church_x);
                                      }), church_xss)))));
                  });
        });
    church_tr_zip = BgL_provzd2initzd2(function(address, store, church_xs, church_ys) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_trzd2conszb2provenancez60(BgL_trzd2listzb2provenancez60(BgL_trzd2carzb2provenancez60(church_xs), BgL_trzd2carzb2provenancez60(church_ys)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa86", address), store, church_tr_zip, arglist(BgL_trzd2cdrzb2provenancez60(church_xs), BgL_trzd2cdrzb2provenancez60(church_ys))));
                  });
        });
    church_tr_zip3 = BgL_provzd2initzd2(function(address, store, church_xs, church_ys, church_zs) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa87", address), store, church_tr_zipN, arglist(BgL_trzd2listzb2provenancez60(church_xs, church_ys, church_zs)));
        });
    church_tr_zip4 = BgL_provzd2initzd2(function(address, store, church_xs, church_ys, church_zs, church_ws) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa88", address), store, church_tr_zipN, arglist(BgL_trzd2listzb2provenancez60(church_xs, church_ys, church_zs, church_ws)));
        });
    BgL_provzd2initzd2(function(address, store, church_xs, church_ys, church_zs, church_ws, church_ss) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa89", address), store, church_tr_zipN, arglist(BgL_trzd2listzb2provenancez60(church_xs, church_ys, church_zs, church_ws, church_ss)));
      });
    church_tr_filter = BgL_provzd2initzd2(function(address, store, church_f, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa90", address), store, church_f, arglist(BgL_trzd2carzb2provenancez60(church_xs))), function() {
                              return BgL_trzd2conszb2provenancez60(BgL_trzd2carzb2provenancez60(church_xs), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa91", address), store, church_tr_filter, arglist(church_f, BgL_trzd2cdrzb2provenancez60(church_xs))));
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa92", address), store, church_tr_filter, arglist(church_f, BgL_trzd2cdrzb2provenancez60(church_xs)));
                            });
                  });
        });
    church_tr_drop_last = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_trzd2cdrzb2provenancez60(church_xs)), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_trzd2conszb2provenancez60(BgL_trzd2carzb2provenancez60(church_xs), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa93", address), store, church_tr_drop_last, arglist(BgL_trzd2cdrzb2provenancez60(church_xs))));
                  });
        });
    church_re_apply = BgL_provzd2initzd2(function(address, store, church_n, church_f, church_x) {
          var church_loop;
          church_loop = BgL_provzd2initzd2(function(address, store, church_acc, church_n) {
                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_n, BgL_provzd2initzd2(0)), function() {
                          return church_acc;
                        }, function() {
                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa94", address), store, church_loop, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa95", address), store, church_f, arglist(church_acc)), BgL_primzb2provzb2(sc_minus, church_n, BgL_provzd2initzd2(1))));
                        });
              });
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa96", address), store, church_loop, arglist(church_x, church_n));
        });
    church_tr_cddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2cdrzb2provenancez60(BgL_trzd2cdrzb2provenancez60(church_xs));
        });
    church_tr_cdddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2cdrzb2provenancez60(BgL_trzd2cdrzb2provenancez60(BgL_trzd2cdrzb2provenancez60(church_xs)));
        });
    church_tr_cddddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa97", address), store, church_tr_cddr, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa98", address), store, church_tr_cddr, arglist(church_xs))));
        });
    church_tr_cdddddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa99", address), store, church_tr_cddr, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa100", address), store, church_tr_cdddr, arglist(church_xs))));
        });
    church_tr_cadr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2carzb2provenancez60(BgL_trzd2cdrzb2provenancez60(church_xs));
        });
    church_tr_caddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2carzb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa101", address), store, church_tr_cddr, arglist(church_xs)));
        });
    church_tr_cadddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2carzb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa102", address), store, church_tr_cdddr, arglist(church_xs)));
        });
    church_tr_caddddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2carzb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa103", address), store, church_tr_cddddr, arglist(church_xs)));
        });
    church_tr_cadddddr = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_trzd2carzb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa104", address), store, church_tr_cdddddr, arglist(church_xs)));
        });
    church_tr_first = BgL_provzd2initzd2(function(address, store, church_x) {
          return BgL_trzd2carzb2provenancez60(church_x);
        });
    church_tr_second = BgL_provzd2initzd2(function(address, store, church_x) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa105", address), store, church_tr_cadr, arglist(church_x));
        });
    church_tr_third = BgL_provzd2initzd2(function(address, store, church_x) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa106", address), store, church_tr_caddr, arglist(church_x));
        });
    BgL_provzd2initzd2(function(address, store, church_x) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa107", address), store, church_tr_cadddr, arglist(church_x));
      });
    BgL_provzd2initzd2(function(address, store, church_x) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa108", address), store, church_tr_caddddr, arglist(church_x));
      });
    BgL_provzd2initzd2(function(address, store, church_x) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa109", address), store, church_tr_cadddddr, arglist(church_x));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_trzd2listzd2refzb2provenancezb2(church_xs, BgL_provzd2initzd2(6));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_trzd2listzd2refzb2provenancezb2(church_xs, BgL_provzd2initzd2(7));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_trzd2listzd2refzb2provenancezb2(church_xs, BgL_provzd2initzd2(8));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_trzd2listzd2refzb2provenancezb2(church_xs, BgL_provzd2initzd2(9));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa110", address), store, church_tr_zip, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa111", address), store, church_tr_drop_last, arglist(church_xs)), BgL_trzd2cdrzb2provenancez60(church_xs)));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa112", address), store, church_tr_zip3, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa113", address), store, church_re_apply, arglist(BgL_provzd2initzd2(2), church_tr_drop_last, church_xs)), BgL_trzd2cdrzb2provenancez60(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa114", address), store, church_tr_drop_last, arglist(church_xs))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa115", address), store, church_tr_cddr, arglist(church_xs))));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa116", address), store, church_tr_zip4, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa117", address), store, church_tr_cdddr, arglist(church_xs)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa118", address), store, church_tr_cddr, arglist(church_xs)), BgL_trzd2cdrzb2provenancez60(church_xs), church_xs));
      });
    church_tr_pairs = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_trzd2cdrzb2provenancez60(church_xs)), function() {
                              return BgL_provzd2initzd2(null);
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa119", address), store, church_tr_append, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa120", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_i) {
                                                return BgL_trzd2listzb2provenancez60(BgL_trzd2carzb2provenancez60(church_xs), church_i);
                                              }), BgL_trzd2cdrzb2provenancez60(church_xs))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa121", address), store, church_tr_pairs, arglist(BgL_trzd2cdrzb2provenancez60(church_xs)))));
                            });
                  });
        });
    church_tr_append = BgL_provzd2initzd2(function(address, store, church_ls1, church_ls2) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_ls1), function() {
                    return church_ls2;
                  }, function() {
                    return BgL_trzd2conszb2provenancez60(BgL_trzd2carzb2provenancez60(church_ls1), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa122", address), store, church_tr_append, arglist(BgL_trzd2cdrzb2provenancez60(church_ls1), church_ls2)));
                  });
        });
    church_tr_last = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_trzd2cdrzb2provenancez60(church_xs)), function() {
                    return BgL_trzd2carzb2provenancez60(church_xs);
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa123", address), store, church_tr_last, arglist(BgL_trzd2cdrzb2provenancez60(church_xs)));
                  });
        });
    church_tr_assoc = BgL_provzd2initzd2(function(address, store, church_key, church_key_values) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_key_values), function() {
                    return BgL_provzd2initzd2(false);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEqual, church_key, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa124", address), store, church_tr_first, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa125", address), store, church_tr_first, arglist(church_key_values))))), function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa126", address), store, church_tr_first, arglist(church_key_values));
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa127", address), store, church_tr_assoc, arglist(church_key, BgL_trzd2cdrzb2provenancez60(church_key_values)));
                            });
                  });
        });
    BgL_provzd2initzd2(function(address, store, church_xss) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa128", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_xs) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa129", address), store, church_tr_first, arglist(church_xs));
                    }), church_xss));
      });
    BgL_provzd2initzd2(function(address, store, church_xss) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa130", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_xs) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa131", address), store, church_tr_second, arglist(church_xs));
                    }), church_xss));
      });
    BgL_provzd2initzd2(function(address, store, church_xss) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa132", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_xs) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa133", address), store, church_tr_third, arglist(church_xs));
                    }), church_xss));
      });
    church_make_stateless_xrp = BgL_provzd2initzd2(function(address, store, church_xrp_name, church_sampler, church_scorer) {
          var church_proposal_support = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 5; --sc_tmp) {
            church_proposal_support = sc_cons(arguments[sc_tmp], church_proposal_support);
          }
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa134", address), store, BgL_churchzd2makezd2xrpzb2provenancezb2, arglist(church_xrp_name, BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa135", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa136", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                                return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa137", address), store, church_scorer, arglist(church_args, church_value)));
                                              }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                                  return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                                }, function() {
                                                  return church_value;
                                                })));
                                  }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa138", address), store, church_sampler, church_args)));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa139", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa140", address), store, church_scorer, arglist(church_args, church_value)));
                                  }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                      return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                    }, function() {
                                      return church_value;
                                    })));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa141", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa142", address), store, church_scorer, arglist(church_args, church_value)));
                                  }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                      return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                    }, function() {
                                      return church_value;
                                    })));
                      }), BgL_provzd2initzd2("\uEBACscorer"), BgL_provzd2initzd2(null), BgL_provzd2initzd2(null), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_proposal_support)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_proposal_support));
                      }), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_proposal_support)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(rest, BgL_extractzd2optzd2argz00(church_proposal_support))), function() {
                                  return BgL_provzd2initzd2(null);
                                }, function() {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa143", address), store, BgL_provzd2initzd2(function(address, store, church_pr) {
                                              return BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa144", address), store, church_pr, arglist(church_args));
                                                      });
                                            }), arglist(BgL_primzb2provzb2(second, BgL_extractzd2optzd2argz00(church_proposal_support))));
                                });
                      })));
        });
    church_flip = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa145", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACflip"), BgL_provzd2initzd2(function(address, store) {
              var church_w = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                church_w = sc_cons(arguments[sc_tmp], church_w);
              }
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_w)), function() {
                        return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_provzd2initzd2(0.5));
                      }, function() {
                        return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_primzb2provzb2(sc_car, BgL_extractzd2optzd2argz00(church_w)));
                      });
            }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_args), function() {
                        return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(2)));
                      }, function() {
                        return BgL_ifzb2provzb2(store, church_val, function() {
                                  return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(first, church_args));
                                }, function() {
                                  return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(first, church_args)));
                                });
                      });
            }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa146", address), store, BgL_provzd2initzd2(function(address, store, church_p) {
                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa147", address), store, BgL_provzd2initzd2(function(address, store, church_new_val) {
                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa148", address), store, BgL_provzd2initzd2(function(address, store, church_correction) {
                                                  return BgL_primzb2provzb2(sc_list, church_new_val, church_correction, church_correction);
                                                }), arglist(BgL_provzd2initzd2(0)));
                                    }), arglist(BgL_primzb2provzb2(sc_not, church_old_val)));
                        }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_ops), function() {
                            return BgL_provzd2initzd2(0.5);
                          }, function() {
                            return BgL_primzb2provzb2(first, church_ops);
                          })));
            }), BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_primzb2provzb2(sc_list, BgL_provzd2initzd2(BgL_churchzd2truezd2), BgL_provzd2initzd2(BgL_churchzd2falsezd2));
            })));
    church_log_flip = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa149", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBAClog-flip"), BgL_provzd2initzd2(function(address, store) {
              var church_w = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                church_w = sc_cons(arguments[sc_tmp], church_w);
              }
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_w)), function() {
                        return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_provzd2initzd2(0.5));
                      }, function() {
                        return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_randomzd2realzd2)), BgL_primzb2provzb2(sc_car, BgL_extractzd2optzd2argz00(church_w)));
                      });
            }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_args), function() {
                        return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(2)));
                      }, function() {
                        return BgL_ifzb2provzb2(store, church_val, function() {
                                  return BgL_primzb2provzb2(first, church_args);
                                }, function() {
                                  return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_exp, BgL_primzb2provzb2(first, church_args))));
                                });
                      });
            })));
    church_dirichlet = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa150", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACdirichlet"), BgL_churchzd2samplezd2dirichletz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_primzb2provzb2(BgL_dirichletzd2lnpdfzd2, BgL_primzb2provzb2(first, church_args), church_val);
            })));
    church_sample_discrete = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa151", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACsample-discrete"), BgL_churchzd2discretezd2samplerz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_greaterEqual, church_val, BgL_primzb2provzb2(sc_length, BgL_primzb2provzb2(first, church_args))), function() {
                        return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                      }, function() {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa152", address), store, BgL_provzd2initzd2(function(address, store, church_p) {
                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_greater, church_p, BgL_provzd2initzd2(0)), function() {
                                              return BgL_primzb2provzb2(sc_log, church_p);
                                            }, function() {
                                              return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                            });
                                  }), arglist(BgL_primzb2provzb2(BgL_discretezd2pdfzd2, BgL_primzb2provzb2(first, church_args), church_val)));
                      });
            }), BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(sc_length, BgL_primzb2provzb2(first, church_args)));
            })));
    church_sample_integer = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa153", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACsample-integer"), BgL_churchzd2randomzd2integerz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa154", address), store, BgL_provzd2initzd2(function(address, store, church_n) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_isInteger, church_val), BgL_primzb2provzb2(sc_greaterEqual, church_val, BgL_provzd2initzd2(0)), BgL_primzb2provzb2(sc_less, church_val, church_n)), function() {
                                    return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, church_n));
                                  }, function() {
                                    return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                  });
                        }), arglist(BgL_primzb2provzb2(first, church_args)));
            }), BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(first, church_args));
            })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa155", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACuniform"), BgL_provzd2initzd2(function(address, store, church_a, church_b) {
            return BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_multi, BgL_primzb2provzb2(sc_minus, church_b, church_a), BgL_primzb2provzb2(BgL_randomzd2realzd2)), church_a);
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa156", address), store, BgL_provzd2initzd2(function(address, store, church_a, church_b) {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2orzd2, BgL_primzb2provzb2(sc_less, church_val, church_a), BgL_primzb2provzb2(sc_greater, church_val, church_b)), function() {
                                  return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                }, function() {
                                  return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, church_b, church_a)));
                                });
                      }), arglist(BgL_primzb2provzb2(first, church_args), BgL_primzb2provzb2(second, church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa157", address), store, BgL_provzd2initzd2(function(address, store, church_low) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa158", address), store, BgL_provzd2initzd2(function(address, store, church_high) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa159", address), store, BgL_provzd2initzd2(function(address, store, church_var) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa160", address), store, BgL_provzd2initzd2(function(address, store, church_new_val) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa161", address), store, BgL_provzd2initzd2(function(address, store, church_correction) {
                                                                        return BgL_primzb2provzb2(sc_list, church_new_val, church_correction, church_correction);
                                                                      }), arglist(BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_gaussianzd2pdfzd2, church_new_val, church_old_val, church_var))));
                                                          }), arglist(BgL_primzb2provzb2(sc_plus, church_old_val, BgL_primzb2provzb2(BgL_samplezd2gaussianzd2, BgL_provzd2initzd2(0), church_var))));
                                              }), arglist(BgL_primzb2provzb2(sc_div, BgL_primzb2provzb2(sc_minus, church_high, church_low), BgL_provzd2initzd2(10))));
                                  }), arglist(BgL_primzb2provzb2(second, church_ops)));
                      }), arglist(BgL_primzb2provzb2(first, church_ops)));
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa162", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACexponential"), BgL_provzd2initzd2(function(address, store, church_inv_mean) {
            return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_div, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_randomzd2realzd2)), church_inv_mean));
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_less, church_val, BgL_provzd2initzd2(0)), function() {
                      return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                    }, function() {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa163", address), store, BgL_provzd2initzd2(function(address, store, church_inv_mean) {
                                  return BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_log, church_inv_mean), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_multi, church_inv_mean, church_val)));
                                }), arglist(BgL_primzb2provzb2(first, church_args)));
                    });
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa164", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACgaussian"), BgL_provzd2initzd2(function(address, store) {
            var church_args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              church_args = sc_cons(arguments[sc_tmp], church_args);
            }
            return BgL_primzb2provzb2(BgL_samplezd2gaussianzd2, BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_args)), BgL_primzb2provzb2(second, BgL_extractzd2optzd2argz00(church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_gaussianzd2pdfzd2, church_val, BgL_primzb2provzb2(first, church_args), BgL_primzb2provzb2(second, church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa165", address), store, BgL_provzd2initzd2(function(address, store, church_mean) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa166", address), store, BgL_provzd2initzd2(function(address, store, church_var) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa167", address), store, BgL_provzd2initzd2(function(address, store, church_new_val) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa168", address), store, BgL_provzd2initzd2(function(address, store, church_correction) {
                                                            return BgL_primzb2provzb2(sc_list, church_new_val, church_correction, church_correction);
                                                          }), arglist(BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_gaussianzd2pdfzd2, church_new_val, church_old_val, church_var))));
                                              }), arglist(BgL_primzb2provzb2(sc_plus, church_old_val, BgL_primzb2provzb2(BgL_samplezd2gaussianzd2, BgL_provzd2initzd2(0), church_var))));
                                  }), arglist(BgL_primzb2provzb2(second, church_ops)));
                      }), arglist(BgL_primzb2provzb2(first, church_ops)));
          })));
    church_gensym = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa169", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACgensym"), BgL_provzd2initzd2(function(address, store) {
              var church_prefix = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                church_prefix = sc_cons(arguments[sc_tmp], church_prefix);
              }
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa170", address), store, BgL_churchzd2schemezd2gensymz00, BgL_extractzd2optzd2argz00(church_prefix));
            }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.9));
            })));
    church_random_permutation = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa171", address), store, church_make_stateless_xrp, arglist(BgL_provzd2initzd2("\uEBACrandom-permutation"), BgL_provzd2initzd2(function(address, store, church_len) {
              var church_loop;
              church_loop = BgL_provzd2initzd2(function(address, store, church_perm, church_n) {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_n, BgL_provzd2initzd2(0)), function() {
                              return church_perm;
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa172", address), store, BgL_provzd2initzd2(function(address, store, church_k) {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa173", address), store, church_loop, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa174", address), store, church_put, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa175", address), store, church_put, arglist(church_perm, church_k, BgL_primzb2provzb2(sc_listRef, church_perm, church_n))), church_n, BgL_primzb2provzb2(sc_listRef, church_perm, church_k))), BgL_primzb2provzb2(sc_minus, church_n, BgL_provzd2initzd2(1))));
                                        }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa176", address), store, church_sample_integer, arglist(BgL_primzb2provzb2(sc_plus, church_n, BgL_provzd2initzd2(1))))));
                            });
                  });
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa177", address), store, church_loop, arglist(BgL_primzb2provzb2(iota, church_len), BgL_primzb2provzb2(sc_minus, church_len, BgL_provzd2initzd2(1))));
            }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa178", address), store, BgL_provzd2initzd2(function(address, store, church_len) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_len, BgL_primzb2provzb2(sc_length, church_val)), function() {
                                    return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(lnfact, church_len));
                                  }, function() {
                                    return BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0));
                                  });
                        }), arglist(BgL_primzb2provzb2(first, church_args)));
            })));
    church_put = BgL_provzd2initzd2(function(address, store, church_lst, church_ind, church_elt) {
          return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_lst, church_ind), BgL_primzb2provzb2(sc_list, church_elt), BgL_primzb2provzb2(drop, church_lst, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_ind)));
        });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa179", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_ind) {
                      return BgL_primzb2provzb2(sc_listRef, church_lst, church_ind);
                    }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa180", address), store, church_random_permutation, arglist(BgL_primzb2provzb2(sc_length, church_lst)))));
      });
    church_make_dirichlet_discrete = BgL_provzd2initzd2(function(address, store, church_hyp) {
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa181", address), store, BgL_churchzd2makezd2xrpzb2provenancezb2, arglist(BgL_provzd2initzd2("\uEBACdirichlet-discrete"), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa182", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa183", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa184", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa185", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa186", address), store, BgL_provzd2initzd2(function(address, store, church_new_stats) {
                                                                                    return BgL_primzb2provzb2(sc_list, church_value, church_new_stats, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_listRef, church_probs, church_value)));
                                                                                  }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_listRef, church_stats, church_value))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value)))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa187", address), store, church_sample_discrete, arglist(church_probs))));
                                                          }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa188", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                  return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                }), church_counts))));
                                              }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa189", address), store, BgL_churchzd2zb2z60, church_counts)));
                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa190", address), store, church_map, arglist(BgL_churchzd2zb2z60, church_stats, church_hyperparams))));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_provzd2initzd2(1))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value))), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_primzb2provzb2(sc_listRef, church_hyperparams, church_value))), BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa191", address), store, BgL_churchzd2zb2z60, church_stats), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa192", address), store, BgL_churchzd2zb2z60, church_hyperparams)))));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_provzd2initzd2(1))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value))), BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(-1), BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_primzb2provzb2(sc_listRef, church_hyperparams, church_value))), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(-1), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa193", address), store, BgL_churchzd2zb2z60, church_stats), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa194", address), store, BgL_churchzd2zb2z60, church_hyperparams))))));
                      }), BgL_provzd2initzd2("\uEBACdirichlet-discrete-scorer"), BgL_primzb2provzb2(BgL_makezd2listzd2, BgL_primzb2provzb2(sc_length, church_hyp), BgL_provzd2initzd2(0)), church_hyp, BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(sc_length, church_hyperparams));
                      })));
        });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_beta) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa195", address), store, BgL_provzd2initzd2(function(address, store, church_dd) {
                    return BgL_provzd2initzd2(function(address, store) {
                              return BgL_primzb2provzb2(sc_equal, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa196", address), store, church_dd, arglist()), BgL_provzd2initzd2(1));
                            });
                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa197", address), store, church_make_dirichlet_discrete, arglist(BgL_primzb2provzb2(sc_list, church_alpha, church_beta)))));
      });
    BgL_provzd2initzd2(function(address, store, church_N, church_hyp) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa198", address), store, church_make_dirichlet_discrete, arglist(BgL_primzb2provzb2(BgL_makezd2listzd2, church_N, church_hyp)));
      });
    church_make_CRP = BgL_provzd2initzd2(function(address, store, church_alpha) {
          var church_opt = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
            church_opt = sc_cons(arguments[sc_tmp], church_opt);
          }
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa199", address), store, BgL_churchzd2makezd2xrpzb2provenancezb2, arglist(BgL_provzd2initzd2("\uEBACCRP"), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa200", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa201", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa202", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa203", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa204", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(member, BgL_provzd2initzd2("\uEBACstickemup"), church_args), function() {
                                                                                              return BgL_primzb2provzb2(sc_list, church_count_map, church_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                            }, function() {
                                                                                              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_table_index, BgL_provzd2initzd2(0)), function() {
                                                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa205", address), store, BgL_provzd2initzd2(function(address, store, church_table_symbol) {
                                                                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa206", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                return BgL_primzb2provzb2(sc_list, church_table_symbol, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                              }), arglist(BgL_primzb2provzb2(pair, BgL_primzb2provzb2(pair, church_table_symbol, BgL_provzd2initzd2(1)), church_count_map)));
                                                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa207", address), store, church_gensym, arglist())));
                                                                                                      }, function() {
                                                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa208", address), store, BgL_provzd2initzd2(function(address, store, church_table_symbol) {
                                                                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa209", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa210", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                            return BgL_primzb2provzb2(sc_list, church_table_symbol, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                                          }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1))), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_table_symbol, church_table_count)), BgL_primzb2provzb2(drop, church_count_map, church_table_index))));
                                                                                                                              }), arglist(BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1)))))));
                                                                                                                  }), arglist(BgL_primzb2provzb2(first, BgL_primzb2provzb2(sc_listRef, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1))))));
                                                                                                      });
                                                                                            });
                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa211", address), store, church_sample_discrete, arglist(church_probs))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa212", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                              return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                            }), church_counts))));
                                                          }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa213", address), store, BgL_churchzd2zb2z60, church_counts)));
                                              }), arglist(BgL_primzb2provzb2(pair, church_hyperparam, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa214", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map)))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa215", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa216", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa217", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa218", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa219", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEq, BgL_provzd2initzd2(BgL_churchzd2falsezd2), church_table_index), function() {
                                                                                              return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(pair, BgL_primzb2provzb2(pair, church_value, BgL_provzd2initzd2(1)), church_count_map), BgL_primzb2provzb2(sc_listRef, church_probs, BgL_provzd2initzd2(0)));
                                                                                            }, function() {
                                                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa220", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa221", address), store, BgL_provzd2initzd2(function(address, store, church_new_table_count) {
                                                                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa222", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                  return BgL_primzb2provzb2(sc_list, church_value, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                                }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_value, church_new_table_count)), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)))));
                                                                                                                    }), arglist(BgL_primzb2provzb2(sc_plus, church_table_count, BgL_provzd2initzd2(1))));
                                                                                                        }), arglist(BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, church_table_index))));
                                                                                            });
                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa223", address), store, church_list_index, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                                          return BgL_primzb2provzb2(sc_isEq, church_value, BgL_primzb2provzb2(first, church_c));
                                                                                        }), church_count_map))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa224", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                              return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                            }), church_counts))));
                                                          }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa225", address), store, BgL_churchzd2zb2z60, church_counts)));
                                              }), arglist(BgL_primzb2provzb2(pair, church_hyperparam, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa226", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map)))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa227", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa228", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa229", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEq, BgL_provzd2initzd2(BgL_churchzd2falsezd2), church_table_index), function() {
                                                                      return BgL_primzb2provzb2(sc_error, church_table_index, BgL_provzd2initzd2(BgL_canz72tz72, decr, a, value, from, CRP, that, BgL_doesnz72tz72, label, any, BgL_tablez12z12));
                                                                    }, function() {
                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa230", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa231", address), store, BgL_provzd2initzd2(function(address, store, church_new_table_count) {
                                                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa232", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                          return BgL_primzb2provzb2(sc_list, church_value, church_new_count_map, BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), church_new_table_count), function() {
                                                                                                                      return BgL_primzb2provzb2(sc_div, church_hyperparam, BgL_primzb2provzb2(sc_plus, church_hyperparam, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa233", address), store, BgL_churchzd2zb2z60, church_counts), BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1))));
                                                                                                                    }, function() {
                                                                                                                      return BgL_primzb2provzb2(sc_div, church_new_table_count, BgL_primzb2provzb2(sc_plus, church_hyperparam, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa234", address), store, BgL_churchzd2zb2z60, church_counts), BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1))));
                                                                                                                    }));
                                                                                                        }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), church_new_table_count), function() {
                                                                                                            return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)));
                                                                                                          }, function() {
                                                                                                            return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_value, church_new_table_count)), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)));
                                                                                                          })));
                                                                                            }), arglist(BgL_primzb2provzb2(sc_minus, church_table_count, BgL_provzd2initzd2(1))));
                                                                                }), arglist(BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, church_table_index))));
                                                                    });
                                                          }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa235", address), store, church_list_index, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                  return BgL_primzb2provzb2(sc_isEq, church_value, BgL_primzb2provzb2(first, church_c));
                                                                }), church_count_map))));
                                              }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa236", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2("\uEBACCRP-scorer"), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_opt)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_opt));
                      }), church_alpha, BgL_provzd2initzd2(null), BgL_provzd2initzd2(null)));
        });
    church_DPmem = BgL_provzd2initzd2(function(address, store, church_alpha, church_proc) {
          var stmp;
          var stmp_246;
          var stmp_247;
          var proc;
          var proc_248;
          proc = BgL_provzd2initzd2(function(address, store, church_args) {
                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa242", address), store, church_make_CRP, arglist(church_alpha));
              });
          stmp_246 = BgL_provzd2initzd2(function(address_249, store) {
                var args = null;
                for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                  args = sc_cons(arguments[sc_tmp], args);
                }
                return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
              });
          proc_248 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
                return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa241", address), store, church_proc, church_args);
              });
          stmp_247 = BgL_provzd2initzd2(function(address_250, store) {
                var args = null;
                for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                  args = sc_cons(arguments[sc_tmp], args);
                }
                return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_248, args);
              });
          stmp = arglist(stmp_247, stmp_246);
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa237", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                      return BgL_provzd2initzd2(function(address, store) {
                                var church_argsin = null;
                                for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                  church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                                }
                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa238", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa239", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa240", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                              });
                    }), stmp);
        });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_proc) {
        var stmp;
        var stmp_251;
        var stmp_252;
        var proc;
        var proc_253;
        proc = BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa253", address), store, church_make_CRP, arglist(church_alpha));
            });
        stmp_251 = BgL_provzd2initzd2(function(address_254, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
            });
        proc_253 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa252", address), store, church_proc, church_args);
            });
        stmp_252 = BgL_provzd2initzd2(function(address_255, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_253, args);
            });
        stmp = arglist(stmp_252, stmp_251);
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa243", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                    return BgL_provzd2initzd2(function(address, store) {
                              var church_argsin = null;
                              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                              }
                              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(member, BgL_provzd2initzd2("\uEBACstickemup"), BgL_extractzd2optzd2argz00(church_argsin)), function() {
                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa244", address), store, BgL_provzd2initzd2(function(address, store, church_args) {
                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa245", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_table) {
                                                                  return BgL_primzb2provzb2(sc_list, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa246", address), store, church_augmented_proc, arglist(church_args, BgL_primzb2provzb2(sc_car, church_table))), BgL_primzb2provzb2(sc_cdr, church_table));
                                                                }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa247", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa248", address), store, church_crps, arglist(church_args)), arglist(BgL_provzd2initzd2("\uEBACstickemup")))));
                                                  }), arglist(BgL_primzb2provzb2(remove, BgL_provzd2initzd2("\uEBACstickemup"), BgL_extractzd2optzd2argz00(church_argsin))));
                                      }, function() {
                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa249", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa250", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa251", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                                      });
                            });
                  }), stmp);
      });
    church_make_stateless_structural_xrp = BgL_provzd2initzd2(function(address, store, church_xrp_name, church_sampler, church_scorer) {
          var church_proposal_support = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 5; --sc_tmp) {
            church_proposal_support = sc_cons(arguments[sc_tmp], church_proposal_support);
          }
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa254", address), store, BgL_churchzd2makezd2structuralzd2xrpzb2provenancez60, arglist(church_xrp_name, BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa255", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa256", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                                return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa257", address), store, church_scorer, arglist(church_args, church_value)));
                                              }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                                  return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                                }, function() {
                                                  return church_value;
                                                })));
                                  }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa258", address), store, church_sampler, church_args)));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa259", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa260", address), store, church_scorer, arglist(church_args, church_value)));
                                  }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                      return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                    }, function() {
                                      return church_value;
                                    })));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa261", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                    return BgL_primzb2provzb2(sc_list, church_value, church_stats, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa262", address), store, church_scorer, arglist(church_args, church_value)));
                                  }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(BgL_za2withzd2scorezd2gradientza2z00), BgL_primzb2provzb2(BgL_continuouszf3zf3, church_value)), function() {
                                      return BgL_primzb2provzb2(tapify, BgL_primzb2provzb2(untapify, church_value));
                                    }, function() {
                                      return church_value;
                                    })));
                      }), BgL_provzd2initzd2("\uEBACscorer"), BgL_provzd2initzd2(null), BgL_provzd2initzd2(null), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_proposal_support)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_proposal_support));
                      }), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_proposal_support)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(rest, BgL_extractzd2optzd2argz00(church_proposal_support))), function() {
                                  return BgL_provzd2initzd2(null);
                                }, function() {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa263", address), store, BgL_provzd2initzd2(function(address, store, church_pr) {
                                              return BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa264", address), store, church_pr, arglist(church_args));
                                                      });
                                            }), arglist(BgL_primzb2provzb2(second, BgL_extractzd2optzd2argz00(church_proposal_support))));
                                });
                      })));
        });
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa265", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACflipS"), BgL_provzd2initzd2(function(address, store) {
            var church_w = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              church_w = sc_cons(arguments[sc_tmp], church_w);
            }
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_w)), function() {
                      return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_provzd2initzd2(0.5));
                    }, function() {
                      return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_primzb2provzb2(sc_car, BgL_extractzd2optzd2argz00(church_w)));
                    });
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_args), function() {
                      return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(2)));
                    }, function() {
                      return BgL_ifzb2provzb2(store, church_val, function() {
                                return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(first, church_args));
                              }, function() {
                                return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(first, church_args)));
                              });
                    });
          }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa266", address), store, BgL_provzd2initzd2(function(address, store, church_p) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa267", address), store, BgL_provzd2initzd2(function(address, store, church_new_val) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa268", address), store, BgL_provzd2initzd2(function(address, store, church_correction) {
                                                return BgL_primzb2provzb2(sc_list, church_new_val, church_correction, church_correction);
                                              }), arglist(BgL_provzd2initzd2(0)));
                                  }), arglist(BgL_primzb2provzb2(sc_not, church_old_val)));
                      }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_ops), function() {
                          return BgL_provzd2initzd2(0.5);
                        }, function() {
                          return BgL_primzb2provzb2(first, church_ops);
                        })));
          }), BgL_provzd2initzd2(function(address, store, church_args) {
            return BgL_primzb2provzb2(sc_list, BgL_provzd2initzd2(BgL_churchzd2truezd2), BgL_provzd2initzd2(BgL_churchzd2falsezd2));
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa269", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBAClog-flipS"), BgL_provzd2initzd2(function(address, store) {
            var church_w = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              church_w = sc_cons(arguments[sc_tmp], church_w);
            }
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_w)), function() {
                      return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(BgL_randomzd2realzd2), BgL_provzd2initzd2(0.5));
                    }, function() {
                      return BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_randomzd2realzd2)), BgL_primzb2provzb2(sc_car, BgL_extractzd2optzd2argz00(church_w)));
                    });
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_args), function() {
                      return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(2)));
                    }, function() {
                      return BgL_ifzb2provzb2(store, church_val, function() {
                                return BgL_primzb2provzb2(first, church_args);
                              }, function() {
                                return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_exp, BgL_primzb2provzb2(first, church_args))));
                              });
                    });
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa270", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACdirichletS"), BgL_churchzd2samplezd2dirichletz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_primzb2provzb2(BgL_dirichletzd2lnpdfzd2, BgL_primzb2provzb2(first, church_args), church_val);
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa271", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACsample-discreteS"), BgL_churchzd2discretezd2samplerz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_greaterEqual, church_val, BgL_primzb2provzb2(sc_length, BgL_primzb2provzb2(first, church_args))), function() {
                      return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                    }, function() {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa272", address), store, BgL_provzd2initzd2(function(address, store, church_p) {
                                  return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_greater, church_p, BgL_provzd2initzd2(0)), function() {
                                            return BgL_primzb2provzb2(sc_log, church_p);
                                          }, function() {
                                            return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                          });
                                }), arglist(BgL_primzb2provzb2(BgL_discretezd2pdfzd2, BgL_primzb2provzb2(first, church_args), church_val)));
                    });
          }), BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_args) {
            return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(sc_length, BgL_primzb2provzb2(first, church_args)));
          })));
    church_sample_integerS = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa273", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACsample-integerS"), BgL_churchzd2randomzd2integerz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa274", address), store, BgL_provzd2initzd2(function(address, store, church_n) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_isInteger, church_val), BgL_primzb2provzb2(sc_greaterEqual, church_val, BgL_provzd2initzd2(0)), BgL_primzb2provzb2(sc_less, church_val, church_n)), function() {
                                    return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, church_n));
                                  }, function() {
                                    return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                  });
                        }), arglist(BgL_primzb2provzb2(first, church_args)));
            }), BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(first, church_args));
            })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa275", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACsample-integer-shiftS"), BgL_churchzd2randomzd2integerz00, BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa276", address), store, BgL_provzd2initzd2(function(address, store, church_n) {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_isInteger, church_val), BgL_primzb2provzb2(sc_greaterEqual, church_val, BgL_provzd2initzd2(0)), BgL_primzb2provzb2(sc_less, church_val, church_n)), function() {
                                  return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, church_n));
                                }, function() {
                                  return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                });
                      }), arglist(BgL_primzb2provzb2(first, church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa277", address), store, BgL_provzd2initzd2(function(address, store, church_max_val) {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), church_old_val), function() {
                                  return BgL_primzb2provzb2(sc_list, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(1)), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.5)));
                                }, function() {
                                  return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_max_val, church_old_val), function() {
                                            return BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_minus, church_max_val, BgL_provzd2initzd2(1)), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(1)), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.5)));
                                          }, function() {
                                            return BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_plus, BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), BgL_primzb2provzb2(BgL_randomzd2integerzd2, BgL_provzd2initzd2(2))), function() {
                                                          return BgL_provzd2initzd2(1);
                                                        }, function() {
                                                          return BgL_provzd2initzd2(-1);
                                                        }), church_old_val), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.5)), BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.5)));
                                          });
                                });
                      }), arglist(BgL_primzb2provzb2(first, church_ops)));
          }), BgL_provzd2initzd2(function(address, store, church_args) {
            return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(first, church_args));
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa278", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACuniformS"), BgL_provzd2initzd2(function(address, store, church_a, church_b) {
            return BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_multi, BgL_primzb2provzb2(sc_minus, church_b, church_a), BgL_primzb2provzb2(BgL_randomzd2realzd2)), church_a);
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa279", address), store, BgL_provzd2initzd2(function(address, store, church_a, church_b) {
                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2orzd2, BgL_primzb2provzb2(sc_less, church_val, church_a), BgL_primzb2provzb2(sc_greater, church_val, church_b)), function() {
                                  return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                                }, function() {
                                  return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_minus, church_b, church_a)));
                                });
                      }), arglist(BgL_primzb2provzb2(first, church_args), BgL_primzb2provzb2(second, church_args)));
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa280", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACexponentialS"), BgL_provzd2initzd2(function(address, store, church_inv_mean) {
            return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_div, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_randomzd2realzd2)), church_inv_mean));
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_less, church_val, BgL_provzd2initzd2(0)), function() {
                      return BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00);
                    }, function() {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa281", address), store, BgL_provzd2initzd2(function(address, store, church_inv_mean) {
                                  return BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_log, church_inv_mean), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_multi, church_inv_mean, church_val)));
                                }), arglist(BgL_primzb2provzb2(first, church_args)));
                    });
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa282", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACgaussianS"), BgL_provzd2initzd2(function(address, store) {
            var church_args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              church_args = sc_cons(arguments[sc_tmp], church_args);
            }
            return BgL_primzb2provzb2(BgL_samplezd2gaussianzd2, BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_args)), BgL_primzb2provzb2(second, BgL_extractzd2optzd2argz00(church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_gaussianzd2pdfzd2, church_val, BgL_primzb2provzb2(first, church_args), BgL_primzb2provzb2(second, church_args)));
          }), BgL_provzd2initzd2(function(address, store, church_ops, church_old_val) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa283", address), store, BgL_provzd2initzd2(function(address, store, church_mean) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa284", address), store, BgL_provzd2initzd2(function(address, store, church_var) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa285", address), store, BgL_provzd2initzd2(function(address, store, church_new_val) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa286", address), store, BgL_provzd2initzd2(function(address, store, church_correction) {
                                                            return BgL_primzb2provzb2(sc_list, church_new_val, church_correction, church_correction);
                                                          }), arglist(BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(BgL_gaussianzd2pdfzd2, church_new_val, church_old_val, church_var))));
                                              }), arglist(BgL_primzb2provzb2(sc_plus, church_old_val, BgL_primzb2provzb2(BgL_samplezd2gaussianzd2, BgL_provzd2initzd2(0), church_var))));
                                  }), arglist(BgL_primzb2provzb2(second, church_ops)));
                      }), arglist(BgL_primzb2provzb2(first, church_ops)));
          })));
    BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa287", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACgensymS"), BgL_provzd2initzd2(function(address, store) {
            var church_prefix = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
              church_prefix = sc_cons(arguments[sc_tmp], church_prefix);
            }
            return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa288", address), store, BgL_churchzd2schemezd2gensymz00, BgL_extractzd2optzd2argz00(church_prefix));
          }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
            return BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0.9));
          })));
    church_random_permutationS = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa289", address), store, church_make_stateless_structural_xrp, arglist(BgL_provzd2initzd2("\uEBACrandom-permutationS"), BgL_provzd2initzd2(function(address, store, church_len) {
              var church_loop;
              church_loop = BgL_provzd2initzd2(function(address, store, church_perm, church_n) {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_n, BgL_provzd2initzd2(0)), function() {
                              return church_perm;
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa290", address), store, BgL_provzd2initzd2(function(address, store, church_k) {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa291", address), store, church_loop, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa292", address), store, church_putS, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa293", address), store, church_putS, arglist(church_perm, church_k, BgL_primzb2provzb2(sc_listRef, church_perm, church_n))), church_n, BgL_primzb2provzb2(sc_listRef, church_perm, church_k))), BgL_primzb2provzb2(sc_minus, church_n, BgL_provzd2initzd2(1))));
                                        }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa294", address), store, church_sample_integerS, arglist(BgL_primzb2provzb2(sc_plus, church_n, BgL_provzd2initzd2(1))))));
                            });
                  });
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa295", address), store, church_loop, arglist(BgL_primzb2provzb2(iota, church_len), BgL_primzb2provzb2(sc_minus, church_len, BgL_provzd2initzd2(1))));
            }), BgL_provzd2initzd2(function(address, store, church_args, church_val) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa296", address), store, BgL_provzd2initzd2(function(address, store, church_len) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_len, BgL_primzb2provzb2(sc_length, church_val)), function() {
                                    return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(lnfact, church_len));
                                  }, function() {
                                    return BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(0));
                                  });
                        }), arglist(BgL_primzb2provzb2(first, church_args)));
            })));
    church_putS = BgL_provzd2initzd2(function(address, store, church_lst, church_ind, church_elt) {
          return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_lst, church_ind), BgL_primzb2provzb2(sc_list, church_elt), BgL_primzb2provzb2(drop, church_lst, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_ind)));
        });
    BgL_provzd2initzd2(function(address, store, church_lst) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa297", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_ind) {
                      return BgL_primzb2provzb2(sc_listRef, church_lst, church_ind);
                    }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa298", address), store, church_random_permutationS, arglist(BgL_primzb2provzb2(sc_length, church_lst)))));
      });
    church_make_dirichlet_discreteS = BgL_provzd2initzd2(function(address, store, church_hyp) {
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa299", address), store, BgL_churchzd2makezd2structuralzd2xrpzb2provenancez60, arglist(BgL_provzd2initzd2("\uEBACdirichlet-discreteS"), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa300", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa301", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa302", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa303", address), store, BgL_provzd2initzd2(function(address, store, church_value) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa304", address), store, BgL_provzd2initzd2(function(address, store, church_new_stats) {
                                                                                    return BgL_primzb2provzb2(sc_list, church_value, church_new_stats, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_listRef, church_probs, church_value)));
                                                                                  }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_listRef, church_stats, church_value))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value)))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa305", address), store, church_sample_discrete, arglist(church_probs))));
                                                          }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa306", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                  return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                }), church_counts))));
                                              }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa307", address), store, BgL_churchzd2zb2z60, church_counts)));
                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa308", address), store, church_map, arglist(BgL_churchzd2zb2z60, church_stats, church_hyperparams))));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_provzd2initzd2(1))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value))), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_primzb2provzb2(sc_listRef, church_hyperparams, church_value))), BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa309", address), store, BgL_churchzd2zb2z60, church_stats), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa310", address), store, BgL_churchzd2zb2z60, church_hyperparams)))));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_stats, church_value), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_provzd2initzd2(1))), BgL_primzb2provzb2(drop, church_stats, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_value))), BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(-1), BgL_primzb2provzb2(sc_listRef, church_stats, church_value), BgL_primzb2provzb2(sc_listRef, church_hyperparams, church_value))), BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(-1), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa311", address), store, BgL_churchzd2zb2z60, church_stats), BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa312", address), store, BgL_churchzd2zb2z60, church_hyperparams))))));
                      }), BgL_provzd2initzd2("\uEBACdirichlet-discrete-scorer"), BgL_primzb2provzb2(BgL_makezd2listzd2, BgL_primzb2provzb2(sc_length, church_hyp), BgL_provzd2initzd2(0)), church_hyp, BgL_provzd2initzd2(null), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparams, church_args) {
                        return BgL_primzb2provzb2(iota, BgL_primzb2provzb2(sc_length, church_hyperparams));
                      })));
        });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_beta) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa313", address), store, BgL_provzd2initzd2(function(address, store, church_dd) {
                    return BgL_provzd2initzd2(function(address, store) {
                              return BgL_primzb2provzb2(sc_equal, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa314", address), store, church_dd, arglist()), BgL_provzd2initzd2(1));
                            });
                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa315", address), store, church_make_dirichlet_discreteS, arglist(BgL_primzb2provzb2(sc_list, church_alpha, church_beta)))));
      });
    BgL_provzd2initzd2(function(address, store, church_N, church_hyp) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa316", address), store, church_make_dirichlet_discreteS, arglist(BgL_primzb2provzb2(BgL_makezd2listzd2, church_N, church_hyp)));
      });
    church_make_CRPS = BgL_provzd2initzd2(function(address, store, church_alpha) {
          var church_opt = null;
          for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
            church_opt = sc_cons(arguments[sc_tmp], church_opt);
          }
          return BgL_churchzd2applyzd2(new sc_Pair("\uEBACa317", address), store, BgL_churchzd2makezd2structuralzd2xrpzb2provenancez60, arglist(BgL_provzd2initzd2("\uEBACCRPS"), BgL_provzd2initzd2(function(address, store, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa318", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa319", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa320", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa321", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa322", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(member, BgL_provzd2initzd2("\uEBACstickemup"), church_args), function() {
                                                                                              return BgL_primzb2provzb2(sc_list, church_count_map, church_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                            }, function() {
                                                                                              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_table_index, BgL_provzd2initzd2(0)), function() {
                                                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa323", address), store, BgL_provzd2initzd2(function(address, store, church_table_symbol) {
                                                                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa324", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                return BgL_primzb2provzb2(sc_list, church_table_symbol, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                              }), arglist(BgL_primzb2provzb2(pair, BgL_primzb2provzb2(pair, church_table_symbol, BgL_provzd2initzd2(1)), church_count_map)));
                                                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa325", address), store, church_gensym, arglist())));
                                                                                                      }, function() {
                                                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa326", address), store, BgL_provzd2initzd2(function(address, store, church_table_symbol) {
                                                                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa327", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa328", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                            return BgL_primzb2provzb2(sc_list, church_table_symbol, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                                          }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1))), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_table_symbol, church_table_count)), BgL_primzb2provzb2(drop, church_count_map, church_table_index))));
                                                                                                                              }), arglist(BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1)))))));
                                                                                                                  }), arglist(BgL_primzb2provzb2(first, BgL_primzb2provzb2(sc_listRef, church_count_map, BgL_primzb2provzb2(sc_minus, church_table_index, BgL_provzd2initzd2(1))))));
                                                                                                      });
                                                                                            });
                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa329", address), store, church_sample_discrete, arglist(church_probs))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa330", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                              return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                            }), church_counts))));
                                                          }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa331", address), store, BgL_churchzd2zb2z60, church_counts)));
                                              }), arglist(BgL_primzb2provzb2(pair, church_hyperparam, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa332", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map)))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa333", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa334", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa335", address), store, BgL_provzd2initzd2(function(address, store, church_total_counts) {
                                                            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa336", address), store, BgL_provzd2initzd2(function(address, store, church_probs) {
                                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa337", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEq, BgL_provzd2initzd2(BgL_churchzd2falsezd2), church_table_index), function() {
                                                                                              return BgL_primzb2provzb2(sc_list, church_value, BgL_primzb2provzb2(pair, BgL_primzb2provzb2(pair, church_value, BgL_provzd2initzd2(1)), church_count_map), BgL_primzb2provzb2(sc_listRef, church_probs, BgL_provzd2initzd2(0)));
                                                                                            }, function() {
                                                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa338", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa339", address), store, BgL_provzd2initzd2(function(address, store, church_new_table_count) {
                                                                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa340", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                                                  return BgL_primzb2provzb2(sc_list, church_value, church_new_count_map, BgL_primzb2provzb2(sc_listRef, church_probs, church_table_index));
                                                                                                                                }), arglist(BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_value, church_new_table_count)), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)))));
                                                                                                                    }), arglist(BgL_primzb2provzb2(sc_plus, church_table_count, BgL_provzd2initzd2(1))));
                                                                                                        }), arglist(BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, church_table_index))));
                                                                                            });
                                                                                  }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa341", address), store, church_list_index, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                                          return BgL_primzb2provzb2(sc_isEq, church_value, BgL_primzb2provzb2(first, church_c));
                                                                                        }), church_count_map))));
                                                                      }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa342", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                              return BgL_primzb2provzb2(sc_div, church_c, church_total_counts);
                                                                            }), church_counts))));
                                                          }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa343", address), store, BgL_churchzd2zb2z60, church_counts)));
                                              }), arglist(BgL_primzb2provzb2(pair, church_hyperparam, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa344", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map)))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2(function(address, store, church_value, church_stats, church_hyperparam, church_args) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa345", address), store, BgL_provzd2initzd2(function(address, store, church_count_map) {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa346", address), store, BgL_provzd2initzd2(function(address, store, church_counts) {
                                                return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa347", address), store, BgL_provzd2initzd2(function(address, store, church_table_index) {
                                                            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEq, BgL_provzd2initzd2(BgL_churchzd2falsezd2), church_table_index), function() {
                                                                      return BgL_primzb2provzb2(sc_error, church_table_index, BgL_provzd2initzd2(BgL_canz72tz72, decr, a, value, from, CRP, that, BgL_doesnz72tz72, label, any, BgL_tablez12z12));
                                                                    }, function() {
                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa348", address), store, BgL_provzd2initzd2(function(address, store, church_table_count) {
                                                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa349", address), store, BgL_provzd2initzd2(function(address, store, church_new_table_count) {
                                                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa350", address), store, BgL_provzd2initzd2(function(address, store, church_new_count_map) {
                                                                                                          return BgL_primzb2provzb2(sc_list, church_value, church_new_count_map, BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), church_new_table_count), function() {
                                                                                                                      return BgL_primzb2provzb2(sc_div, church_hyperparam, BgL_primzb2provzb2(sc_plus, church_hyperparam, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa351", address), store, BgL_churchzd2zb2z60, church_counts), BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1))));
                                                                                                                    }, function() {
                                                                                                                      return BgL_primzb2provzb2(sc_div, church_new_table_count, BgL_primzb2provzb2(sc_plus, church_hyperparam, BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa352", address), store, BgL_churchzd2zb2z60, church_counts), BgL_primzb2provzb2(sc_minus, BgL_provzd2initzd2(1))));
                                                                                                                    }));
                                                                                                        }), arglist(BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(0), church_new_table_count), function() {
                                                                                                            return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)));
                                                                                                          }, function() {
                                                                                                            return BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(take, church_count_map, church_table_index), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(pair, church_value, church_new_table_count)), BgL_primzb2provzb2(drop, church_count_map, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_table_index)));
                                                                                                          })));
                                                                                            }), arglist(BgL_primzb2provzb2(sc_minus, church_table_count, BgL_provzd2initzd2(1))));
                                                                                }), arglist(BgL_primzb2provzb2(rest, BgL_primzb2provzb2(sc_listRef, church_count_map, church_table_index))));
                                                                    });
                                                          }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa353", address), store, church_list_index, arglist(BgL_provzd2initzd2(function(address, store, church_c) {
                                                                  return BgL_primzb2provzb2(sc_isEq, church_value, BgL_primzb2provzb2(first, church_c));
                                                                }), church_count_map))));
                                              }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa354", address), store, church_map, arglist(BgL_churchzd2restzd2, church_count_map))));
                                  }), arglist(church_stats));
                      }), BgL_provzd2initzd2("\uEBACCRP-scorer"), BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_extractzd2optzd2argz00(church_opt)), function() {
                        return BgL_provzd2initzd2(null);
                      }, function() {
                        return BgL_primzb2provzb2(first, BgL_extractzd2optzd2argz00(church_opt));
                      }), church_alpha, BgL_provzd2initzd2(null), BgL_provzd2initzd2(null)));
        });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_proc) {
        var stmp;
        var stmp_256;
        var stmp_257;
        var proc;
        var proc_258;
        proc = BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa360", address), store, church_make_CRPS, arglist(church_alpha));
            });
        stmp_256 = BgL_provzd2initzd2(function(address_259, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
            });
        proc_258 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa359", address), store, church_proc, church_args);
            });
        stmp_257 = BgL_provzd2initzd2(function(address_260, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_258, args);
            });
        stmp = arglist(stmp_257, stmp_256);
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa355", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                    return BgL_provzd2initzd2(function(address, store) {
                              var church_argsin = null;
                              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                              }
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa356", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa357", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa358", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                            });
                  }), stmp);
      });
    BgL_provzd2initzd2(function(address, store, church_alpha, church_proc) {
        var stmp;
        var stmp_261;
        var stmp_262;
        var proc;
        var proc_263;
        proc = BgL_provzd2initzd2(function(address, store, church_args) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa371", address), store, church_make_CRPS, arglist(church_alpha));
            });
        stmp_261 = BgL_provzd2initzd2(function(address_264, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
            });
        proc_263 = BgL_provzd2initzd2(function(address, store, church_args, church_part) {
              return BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa370", address), store, church_proc, church_args);
            });
        stmp_262 = BgL_provzd2initzd2(function(address_265, store) {
              var args = null;
              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                args = sc_cons(arguments[sc_tmp], args);
              }
              return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc_263, args);
            });
        stmp = arglist(stmp_262, stmp_261);
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa361", address), store, BgL_provzd2initzd2(function(address, store, church_augmented_proc, church_crps) {
                    return BgL_provzd2initzd2(function(address, store) {
                              var church_argsin = null;
                              for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                                church_argsin = sc_cons(arguments[sc_tmp], church_argsin);
                              }
                              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(member, BgL_provzd2initzd2("\uEBACstickemup"), BgL_extractzd2optzd2argz00(church_argsin)), function() {
                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa362", address), store, BgL_provzd2initzd2(function(address, store, church_args) {
                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa363", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_table) {
                                                                  return BgL_primzb2provzb2(sc_list, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa364", address), store, church_augmented_proc, arglist(church_args, BgL_primzb2provzb2(sc_car, church_table))), BgL_primzb2provzb2(sc_cdr, church_table));
                                                                }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa365", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa366", address), store, church_crps, arglist(church_args)), arglist(BgL_provzd2initzd2("\uEBACstickemup")))));
                                                  }), arglist(BgL_primzb2provzb2(remove, BgL_provzd2initzd2("\uEBACstickemup"), BgL_extractzd2optzd2argz00(church_argsin))));
                                      }, function() {
                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa367", address), store, church_augmented_proc, arglist(BgL_extractzd2optzd2argz00(church_argsin), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa368", address), store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa369", address), store, church_crps, arglist(BgL_extractzd2optzd2argz00(church_argsin))), arglist())));
                                      });
                            });
                  }), stmp);
      });
    church_my_pi = BgL_provzd2initzd2(3.141592653589793);
    church_drop_last = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(sc_cdr, church_xs)), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_primzb2provzb2(sc_cons, BgL_primzb2provzb2(sc_car, church_xs), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa372", address), store, church_drop_last, arglist(BgL_primzb2provzb2(sc_cdr, church_xs))));
                  });
        });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa373", address), store, church_zip, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa374", address), store, church_drop_last, arglist(church_xs)), BgL_primzb2provzb2(sc_cdr, church_xs)));
      });
    BgL_provzd2initzd2(function(address, store, church_xs) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa375", address), store, church_zip, arglist(church_xs, BgL_primzb2provzb2(sc_append, BgL_primzb2provzb2(sc_cdr, church_xs), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_car, church_xs)))));
      });
    BgL_provzd2initzd2(function(address, store, church_n, church_xs) {
        var church_look_ahead;
        var church_loop;
        church_look_ahead = BgL_provzd2initzd2(function(address, store, church_n, church_xs) {
              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_n, BgL_provzd2initzd2(0)), function() {
                        return church_xs;
                      }, function() {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa376", address), store, church_look_ahead, arglist(BgL_primzb2provzb2(sc_minus, church_n, BgL_provzd2initzd2(1)), BgL_primzb2provzb2(sc_cdr, church_xs)));
                      });
            });
        church_loop = BgL_provzd2initzd2(function(address, store, church_acc, church_n, church_xs) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa377", address), store, BgL_provzd2initzd2(function(address, store, church_ahead) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_ahead), function() {
                                    return church_acc;
                                  }, function() {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa378", address), store, church_loop, arglist(BgL_primzb2provzb2(sc_cons, BgL_primzb2provzb2(sc_cons, BgL_primzb2provzb2(sc_car, church_xs), BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_car, church_ahead))), church_acc), church_n, BgL_primzb2provzb2(sc_cdr, church_xs)));
                                  });
                        }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa379", address), store, church_look_ahead, arglist(BgL_primzb2provzb2(sc_plus, church_n, BgL_provzd2initzd2(1)), church_xs))));
            });
        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_less, BgL_primzb2provzb2(sc_length, church_xs), BgL_primzb2provzb2(sc_plus, church_n, BgL_provzd2initzd2(1))), function() {
                  return BgL_provzd2initzd2(null);
                }, function() {
                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa380", address), store, church_loop, arglist(BgL_provzd2initzd2(null), church_n, church_xs));
                });
      });
    church_pairs = BgL_provzd2initzd2(function(address, store, church_xs) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_xs), function() {
                    return BgL_provzd2initzd2(null);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, BgL_primzb2provzb2(sc_cdr, church_xs)), function() {
                              return BgL_provzd2initzd2(null);
                            }, function() {
                              return BgL_primzb2provzb2(sc_append, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa381", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_i) {
                                              return BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_car, church_xs), church_i);
                                            }), BgL_primzb2provzb2(sc_cdr, church_xs))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa382", address), store, church_pairs, arglist(BgL_primzb2provzb2(sc_cdr, church_xs))));
                            });
                  });
        });
    church_log_sigmoid = BgL_provzd2initzd2(function(address, store, church_x) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_less, church_x, BgL_provzd2initzd2(-100)), function() {
                    return church_x;
                  }, function() {
                    return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_log, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_exp, BgL_primzb2provzb2(sc_minus, church_x)))));
                  });
        });
    church_greater_log = BgL_provzd2initzd2(function(address, store, church_x, church_v, church_s) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa383", address), store, church_log_sigmoid, arglist(BgL_primzb2provzb2(sc_multi, church_s, BgL_primzb2provzb2(sc_minus, church_v, church_x))));
        });
    BgL_provzd2initzd2(function(address, store, church_x, church_v, church_s) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa384", address), store, church_log_sigmoid, arglist(BgL_primzb2provzb2(sc_multi, church_s, BgL_primzb2provzb2(sc_minus, church_x, church_v))));
      });
    church_gauss_log_pdf = BgL_provzd2initzd2(function(address, store, church_mean, church_var, church_smp) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa385", address), store, BgL_provzd2initzd2(function(address, store, church_diff) {
                      return BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_minus, BgL_primzb2provzb2(sc_div, BgL_primzb2provzb2(sc_multi, church_diff, church_diff), BgL_primzb2provzb2(sc_multi, BgL_provzd2initzd2(2), church_var))), BgL_primzb2provzb2(sc_multi, BgL_provzd2initzd2(0.5), BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_log, BgL_provzd2initzd2(2)), BgL_primzb2provzb2(sc_log, church_my_pi), BgL_primzb2provzb2(sc_log, church_var))));
                    }), arglist(BgL_primzb2provzb2(sc_minus, church_smp, church_mean)));
        });
    church_norm_gauss_log_pdf = BgL_provzd2initzd2(function(address, store, church_mean, church_var, church_smp) {
          return BgL_primzb2provzb2(sc_minus, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa386", address), store, church_gauss_log_pdf, arglist(church_mean, church_var, church_smp)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa387", address), store, church_gauss_log_pdf, arglist(church_mean, church_var, church_mean)));
        });
    BgL_churchzd2applyzd2(new sc_Pair("\uEBACa388", address), store, BgL_churchzd2makezd2factorzb2provenancezb2, arglist(BgL_provzd2initzd2(function(address, store, church_x, church_y) {
            return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa389", address), store, church_norm_gauss_log_pdf, arglist(church_x, BgL_provzd2initzd2(0.1), church_y));
          })));
    church_norm_eq_log = BgL_provzd2initzd2(function(address, store, church_x, church_y, church_var) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa390", address), store, church_norm_gauss_log_pdf, arglist(BgL_primzb2provzb2(sc_minus, church_x, church_y), church_var, BgL_provzd2initzd2(0)));
        });
    BgL_provzd2initzd2(function(address, store, church_nfqp) {
        var church_loop;
        church_loop = BgL_provzd2initzd2(function(address, store) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa391", address), store, BgL_provzd2initzd2(function(address, store, church_init_state) {
                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa392", address), store, BgL_provzd2initzd2(function(address, store, church_proposed_state) {
                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa393", address), store, BgL_provzd2initzd2(function(address, store, church_factors) {
                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa394", address), store, BgL_provzd2initzd2(function(address, store, church_state_score) {
                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa395", address), store, BgL_provzd2initzd2(function(address, store, church_cond_box) {
                                                                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_not, BgL_primzb2provzb2(sc_isEqual, BgL_primzb2provzb2(BgL_mcmczd2statezd2ze3scorezd2genericz31, church_proposed_state), BgL_provzd2initzd2(BgL_churchzd2minuszd2infinityz00))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa396", address), store, church_log_flip, arglist(church_state_score))), function() {
                                                                                    return BgL_mcmczd2statezd2ze3queryzd2valuezb2provenancez83(church_proposed_state);
                                                                                  }, function() {
                                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa397", address), store, church_loop, arglist());
                                                                                  });
                                                                        }), arglist(BgL_primzb2provzb2(second, church_proposed_state)));
                                                            }), arglist(BgL_liftedzd2applyzd2(new sc_Pair("\uEBACa398", address), store, BgL_churchzd2zb2z60, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa399", address), store, church_map, arglist(BgL_churchzd2factorzd2valuez00, BgL_primzb2provzb2(BgL_addboxzd2ze3valuesz31, church_factors))))));
                                                }), arglist(BgL_primzb2provzb2(BgL_storezd2ze3factorsz31, BgL_primzb2provzb2(BgL_mcmczd2statezd2ze3storeze3, church_proposed_state))));
                                    }), arglist(BgL_primzb2provzb2(first, BgL_primzb2provzb2(BgL_counterfactualzd2updatezd2, church_init_state, church_nfqp))));
                        }), arglist(BgL_primzb2provzb2(BgL_churchzd2makezd2initialzd2mcmczd2statez00, BgL_provzd2initzd2(new sc_Pair("\uEBACTOP", null)), BgL_primzb2provzb2(BgL_makezd2emptyzd2storez00))));
            });
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa400", address), store, church_loop, arglist());
      });
    BgL_provzd2initzd2(function(address, store, church_samples, church_lag, church_normal_form_proc) {
        return BgL_primzb2provzb2(BgL_mhzd2queryza2z70, church_samples, church_lag, church_normal_form_proc);
      });
    BgL_provzd2initzd2(function(address, store, church_temps, church_samples, church_lag, church_rej_steps, BgL_sc_churchzd2tempszd2ze3nfqp_117ze3) {
        return BgL_primzb2provzb2(BgL_mhzd2queryza2z70, church_temps, church_samples, church_lag, church_rej_steps, BgL_sc_churchzd2tempszd2ze3nfqp_117ze3);
      });
    BgL_provzd2initzd2(function(address, store, church_samples, church_lag, church_normal_form_proc) {
        return BgL_primzb2provzb2(BgL_nonzd2structuralzd2mhzd2queryza2z70, church_samples, church_lag, church_normal_form_proc);
      });
    BgL_provzd2initzd2(function(address, store, church_samples, church_lag, church_num_temps, church_power, church_normal_form_proc) {
        return BgL_primzb2provzb2(BgL_larjzd2mhzd2queryzb2powerza2z10, church_samples, church_lag, church_num_temps, church_power, church_normal_form_proc);
      });
    BgL_provzd2initzd2(function(address, store, church_samples, church_lag, church_num_temps, church_normal_form_proc) {
        return BgL_primzb2provzb2(BgL_larjzd2mhzd2queryza2za2, church_samples, church_lag, church_num_temps, church_normal_form_proc);
      });
    BgL_provzd2initzd2(function(address, store, church_num_proposals_to_make, church_lag, church_num_temps, church_power, church_normal_form_proc) {
        return BgL_primzb2provzb2(BgL_larjzd2mhzd2queryzd2proposalzd2countzb2powerza2z10, church_num_proposals_to_make, church_lag, church_num_temps, church_power, church_normal_form_proc);
      });
    church_larj_mh_query_proposal_count = BgL_provzd2initzd2(function(address, store, church_num_proposals_to_make, church_lag, church_num_temps, church_normal_form_proc) {
          return BgL_primzb2provzb2(BgL_larjzd2mhzd2queryzd2proposalzd2countza2za2, church_num_proposals_to_make, church_lag, church_num_temps, church_normal_form_proc);
        });
    BgL_sc_churchzd2identityza2_98z70 = BgL_provzd2initzd2(function(address, store, church_x) {
          return church_x;
        });
    BgL_sc_churchzd2stringzd2emptyzf3za2_99z51 = BgL_provzd2initzd2(function(address, store, church_v) {
          return BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_v));
        });
    BgL_sc_churchzd2vectorzd2emptyzf3za2_100z51 = BgL_provzd2initzd2(function(address, store, church_v) {
          return BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_vectorLength, church_v));
        });
    BgL_sc_churchzd2stringzd2ze3vectorza2_101z41 = BgL_provzd2initzd2(function(address, store, church_s) {
          return BgL_primzb2provzb2(sc_list2vector, BgL_primzb2provzb2(sc_string2list, church_s));
        });
    BgL_sc_churchzd2vectorzd2levenshteinzf2predicatezf2getzd2scratch_102zd2 = BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred, church_get_scratch) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa401", address), store, BgL_provzd2initzd2(function(address, store, church_a_len, church_b_len) {
                      return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, church_a_len), function() {
                                return church_b_len;
                              }, function() {
                                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, church_b_len), function() {
                                          return church_a_len;
                                        }, function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa402", address), store, BgL_provzd2initzd2(function(address, store, church_w, church_next) {
                                                      var church_loop_i;
                                                      var church_fill;
                                                      church_fill = BgL_provzd2initzd2(function(address, store, church_k) {
                                                            BgL_primzb2provzb2(sc_vectorSetBang, church_w, church_k, church_k);
                                                            return BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2orzd2, BgL_primzb2provzb2(sc_isZero, church_k), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa403", address), store, church_fill, arglist(BgL_primzb2provzb2(sc_minus, church_k, BgL_provzd2initzd2(1)))));
                                                          });
                                                      BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa404", address), store, church_fill, arglist(church_b_len));
                                                      church_loop_i = BgL_provzd2initzd2(function(address, store, church_i) {
                                                            return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_i, church_a_len), function() {
                                                                      return church_next;
                                                                    }, function() {
                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa405", address), store, BgL_provzd2initzd2(function(address, store, church_a_i) {
                                                                                  var church_loop_j;
                                                                                  church_loop_j = BgL_provzd2initzd2(function(address, store, church_j, church_cur) {
                                                                                        return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_equal, church_j, church_b_len), function() {
                                                                                                  BgL_primzb2provzb2(sc_vectorSetBang, church_w, church_b_len, church_next);
                                                                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa406", address), store, church_loop_i, arglist(BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_i)));
                                                                                                }, function() {
                                                                                                  BgL_primzb2provzb2(BgL_setz12z12, church_next, BgL_primzb2provzb2(sc_min, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_vectorRef, church_w, BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_j))), BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_cur), BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa407", address), store, church_pred, arglist(church_a_i, BgL_primzb2provzb2(sc_vectorRef, church_b, church_j))), function() {
                                                                                                          return BgL_primzb2provzb2(sc_vectorRef, church_w, church_j);
                                                                                                        }, function() {
                                                                                                          return BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), BgL_primzb2provzb2(sc_vectorRef, church_w, church_j));
                                                                                                        })));
                                                                                                  BgL_primzb2provzb2(sc_vectorSetBang, church_w, church_j, church_cur);
                                                                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa408", address), store, church_loop_j, arglist(BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_j), church_next));
                                                                                                });
                                                                                      });
                                                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa409", address), store, church_loop_j, arglist(BgL_provzd2initzd2(0), BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_i)));
                                                                                }), arglist(BgL_primzb2provzb2(sc_vectorRef, church_a, church_i)));
                                                                    });
                                                          });
                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa410", address), store, church_loop_i, arglist(BgL_provzd2initzd2(0)));
                                                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa411", address), store, church_get_scratch, arglist(BgL_primzb2provzb2(sc_plus, BgL_provzd2initzd2(1), church_b_len))), BgL_provzd2initzd2(false)));
                                        });
                              });
                    }), arglist(BgL_primzb2provzb2(sc_vectorLength, church_a), BgL_primzb2provzb2(sc_vectorLength, church_b)));
        });
    BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2 = BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa412", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicatezf2getzd2scratch_102zd2, arglist(church_a, church_b, church_pred, BgL_churchzd2makezd2vectorz00));
        });
    BgL_provzd2initzd2(function(address, store, church_a, church_b) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa413", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(church_a, church_b, BgL_churchzd2eqzf3z21));
      });
    BgL_sc_churchzd2vectorzd2levenshteinzf2eqv_104zf2 = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa414", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(church_a, church_b, BgL_churchzd2eqvzf3z21));
        });
    BgL_sc_churchzd2vectorzd2levenshteinzf2equal_105zf2 = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa415", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(church_a, church_b, BgL_churchzd2equalzf3z21));
        });
    BgL_provzd2initzd2(function(address, store, church_a, church_b) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa416", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2equal_105zf2, arglist(church_a, church_b));
      });
    BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2 = BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_a), function() {
                    return BgL_primzb2provzb2(sc_length, church_b);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isNull, church_b), function() {
                              return BgL_primzb2provzb2(sc_length, church_a);
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa417", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(BgL_primzb2provzb2(sc_list2vector, church_a), BgL_primzb2provzb2(sc_list2vector, church_b), church_pred));
                            });
                  });
        });
    BgL_provzd2initzd2(function(address, store, church_a, church_b) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa418", address), store, BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2, arglist(church_a, church_b, BgL_churchzd2eqzf3z21));
      });
    BgL_provzd2initzd2(function(address, store, church_a, church_b) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa419", address), store, BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2, arglist(church_a, church_b, BgL_churchzd2eqvzf3z21));
      });
    BgL_sc_churchzd2listzd2levenshteinzf2equal_107zf2 = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa420", address), store, BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2, arglist(church_a, church_b, BgL_churchzd2equalzf3z21));
        });
    BgL_provzd2initzd2(function(address, store, church_a, church_b) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa421", address), store, BgL_sc_churchzd2listzd2levenshteinzf2equal_107zf2, arglist(church_a, church_b));
      });
    church_string_levenshtein = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_a)), function() {
                    return BgL_primzb2provzb2(sc_stringLength, church_b);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_b)), function() {
                              return BgL_primzb2provzb2(sc_stringLength, church_a);
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa422", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2eqv_104zf2, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa423", address), store, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41, arglist(church_a)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa424", address), store, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41, arglist(church_b))));
                            });
                  });
        });
    BgL_sc_churchzd2stringzd2levenshteinzf2predicateza2_108z50 = BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_a)), function() {
                    return BgL_primzb2provzb2(sc_stringLength, church_b);
                  }, function() {
                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_b)), function() {
                              return BgL_primzb2provzb2(sc_stringLength, church_a);
                            }, function() {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa425", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa426", address), store, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41, arglist(church_a)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa427", address), store, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41, arglist(church_b)), church_pred));
                            });
                  });
        });
    BgL_sc_churchzd2levenshteinzf2predicate_109z20 = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa428", address), store, BgL_provzd2initzd2(function(address, store, church_foo) {
            return BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred) {
                      return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isVector, church_a), function() {
                                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isVector, church_b), function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa429", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(church_a, church_b, church_pred));
                                        }, function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa430", address), store, church_foo, arglist(church_a, church_b, church_pred, BgL_sc_churchzd2vectorzd2emptyzf3za2_100z51, BgL_churchzd2vectorzd2lengthz00, BgL_sc_churchzd2identityza2_98z70));
                                        });
                              }, function() {
                                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isString, church_a), function() {
                                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isString, church_b), function() {
                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa431", address), store, BgL_sc_churchzd2stringzd2levenshteinzf2predicateza2_108z50, arglist(church_a, church_b, church_pred));
                                                  }, function() {
                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa432", address), store, church_foo, arglist(church_a, church_b, church_pred, BgL_sc_churchzd2stringzd2emptyzf3za2_99z51, BgL_churchzd2stringzd2lengthz00, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41));
                                                  });
                                        }, function() {
                                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isList, church_a), function() {
                                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isList, church_b), function() {
                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa433", address), store, BgL_sc_churchzd2listzd2levenshteinzf2predicate_106zf2, arglist(church_a, church_b, church_pred));
                                                            }, function() {
                                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa434", address), store, church_foo, arglist(church_a, church_b, church_pred, BgL_churchzd2nullzf3z21, BgL_churchzd2lengthzd2, BgL_churchzd2listzd2ze3vectorze3));
                                                            });
                                                  }, function() {
                                                    return BgL_primzb2provzb2(sc_error, BgL_provzd2initzd2(BgL_sc_const_3z00_citation_structural_dynamic2_prog_tmp), church_a);
                                                  });
                                        });
                              });
                    });
          }), arglist(BgL_provzd2initzd2(function(address, store, church_a, church_b, church_pred, church_a_emp, church_a_len, church_a_vec) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa435", address), store, BgL_provzd2initzd2(function(address, store, church_bar) {
                          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isVector, church_b), function() {
                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa436", address), store, church_bar, arglist(BgL_sc_churchzd2vectorzd2emptyzf3za2_100z51, BgL_churchzd2vectorzd2lengthz00, BgL_sc_churchzd2identityza2_98z70));
                                  }, function() {
                                    return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isString, church_b), function() {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa437", address), store, church_bar, arglist(BgL_sc_churchzd2stringzd2emptyzf3za2_99z51, BgL_churchzd2stringzd2lengthz00, BgL_sc_churchzd2stringzd2ze3vectorza2_101z41));
                                            }, function() {
                                              return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isList, church_b), function() {
                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa438", address), store, church_bar, arglist(BgL_churchzd2nullzf3z21, BgL_churchzd2lengthzd2, BgL_churchzd2listzd2ze3vectorze3));
                                                      }, function() {
                                                        return BgL_primzb2provzb2(sc_error, BgL_provzd2initzd2(const_citation_structural_dynamic2_prog_tmp), church_b);
                                                      });
                                            });
                                  });
                        }), arglist(BgL_provzd2initzd2(function(address, store, church_b_emp, church_b_len, church_b_vec) {
                            return BgL_ifzb2provzb2(store, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa439", address), store, church_b_emp, arglist(church_b)), function() {
                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa440", address), store, church_a_len, arglist(church_a));
                                    }, function() {
                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa441", address), store, BgL_sc_churchzd2vectorzd2levenshteinzf2predicate_103zf2, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa442", address), store, church_a_vec, arglist(church_a)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa443", address), store, church_b_vec, arglist(church_b)), church_pred));
                                    });
                          })));
            })));
    church_levenshtein = BgL_provzd2initzd2(function(address, store, church_a, church_b) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_isString, church_a), BgL_primzb2provzb2(sc_isString, church_b)), function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa444", address), store, church_string_levenshtein, arglist(church_a, church_b));
                  }, function() {
                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa445", address), store, BgL_sc_churchzd2levenshteinzf2predicate_109z20, arglist(church_a, church_b, BgL_churchzd2equalzf3z21));
                  });
        });
    church_make_author_as_cited = BgL_churchzd2listzd2;
    BgL_sc_churchzd2authorzd2aszd2citedzd2ze3firstname_110ze3 = BgL_churchzd2firstzd2;
    BgL_sc_churchzd2authorzd2aszd2citedzd2ze3middlename_111ze3 = BgL_churchzd2secondzd2;
    BgL_sc_churchzd2authorzd2aszd2citedzd2ze3lastname_112ze3 = BgL_churchzd2thirdzd2;
    church_parse_author = BgL_provzd2initzd2(function(address, store, church_author) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa446", address), store, BgL_provzd2initzd2(function(address, store, church_firstname) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa447", address), store, BgL_provzd2initzd2(function(address, store, church_middlename) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa448", address), store, BgL_provzd2initzd2(function(address, store, church_lastname) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa449", address), store, church_make_author_as_cited, arglist(church_firstname, church_middlename, church_lastname));
                                            }), arglist(BgL_primzb2provzb2(third, church_author)));
                                }), arglist(BgL_primzb2provzb2(second, church_author)));
                    }), arglist(BgL_primzb2provzb2(first, church_author)));
        });
    church_parse_authors = BgL_provzd2initzd2(function(address, store, church_authors_as_cited) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa450", address), store, church_map, arglist(church_parse_author, church_authors_as_cited));
        });
    church_make_paper = BgL_churchzd2listzd2;
    BgL_sc_churchzd2paperzd2ze3title_113ze3 = BgL_provzd2initzd2(function(address, store, church_p) {
          return BgL_primzb2provzb2(sc_car, BgL_primzb2provzb2(third, church_p));
        });
    church_make_citation = BgL_churchzd2listzd2;
    BgL_sc_churchzd2citationzd2ze3numzd2obszd2authors_114ze3 = BgL_churchzd2firstzd2;
    BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31 = BgL_churchzd2secondzd2;
    BgL_sc_churchzd2citationzd2ze3obszd2title_116z31 = BgL_provzd2initzd2(function(address, store, church_c) {
          return BgL_primzb2provzb2(sc_car, BgL_primzb2provzb2(third, church_c));
        });
    church_parse_citation = BgL_provzd2initzd2(function(address, store, church_obs_citation, church_default_id) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa451", address), store, BgL_provzd2initzd2(function(address, store, church_obs_authors) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa452", address), store, BgL_provzd2initzd2(function(address, store, church_obs_title) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa453", address), store, BgL_provzd2initzd2(function(address, store, church_obs_pub_type) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa454", address), store, BgL_provzd2initzd2(function(address, store, church_num_obs_authors) {
                                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa455", address), store, BgL_provzd2initzd2(function(address, store, church_paper_id) {
                                                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa456", address), store, church_make_citation, arglist(church_num_obs_authors, church_obs_authors, church_obs_title, church_obs_pub_type, BgL_provzd2initzd2(null), church_paper_id));
                                                                    }), arglist(church_default_id));
                                                        }), arglist(BgL_primzb2provzb2(sc_length, church_obs_authors)));
                                            }), arglist(BgL_provzd2initzd2(new sc_Pair("default", null))));
                                }), arglist(BgL_primzb2provzb2(second, church_obs_citation)));
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa457", address), store, church_parse_authors, arglist(BgL_primzb2provzb2(first, church_obs_citation)))));
        });
    church_all_citations = BgL_provzd2initzd2(BgL_sc_const_4z00_citation_structural_dynamic2_prog_tmp);
    church_author_sets = BgL_primzb2provzb2(BgL_deletezd2duplicateszd2, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa458", address), store, church_map, arglist(BgL_churchzd2carzd2, church_all_citations)));
    church_title_sets = BgL_primzb2provzb2(BgL_deletezd2duplicateszd2, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa459", address), store, church_map, arglist(BgL_churchzd2cadrzd2, church_all_citations)));
    church_initialization = BgL_provzd2initzd2(function(address, store, church_all_citations) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa460", address), store, church_map, arglist(church_parse_citation, church_all_citations, BgL_primzb2provzb2(iota, BgL_primzb2provzb2(sc_length, church_all_citations))));
        });
    church_citations = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa461", address), store, church_initialization, arglist(church_all_citations));
    BgL_provzd2initzd2(function(address, store, church_low, church_high) {
        return BgL_primzb2provzb2(sc_plus, church_low, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa462", address), store, church_sample_integerS, arglist(BgL_primzb2provzb2(sc_minus, church_high, church_low))));
      });
    BgL_provzd2initzd2(function(address, store, church_low, church_high) {
        return BgL_primzb2provzb2(sc_plus, church_low, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa463", address), store, church_sample_integer, arglist(BgL_primzb2provzb2(sc_minus, church_high, church_low))));
      });
    church_distance_string = BgL_provzd2initzd2(function(address, store, church_s1, church_s2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa464", address), store, church_levenshtein, arglist(church_s1, church_s2));
        });
    church_distance_string_case_insensitive = BgL_provzd2initzd2(function(address, store, church_s1, church_s2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa465", address), store, church_levenshtein, arglist(BgL_primzb2provzb2(sc_string_downcase, church_s1), BgL_primzb2provzb2(sc_string_downcase, church_s2)));
        });
    church_score_affinity = BgL_provzd2initzd2(function(address, store, church_c1, church_c2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa466", address), store, BgL_provzd2initzd2(function(address, store, church_dist) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa467", address), store, church_norm_eq_log, arglist(church_dist, BgL_provzd2initzd2(0), BgL_provzd2initzd2(5)));
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa468", address), store, church_distance_citation, arglist(church_c1, church_c2))));
        });
    church_score_repulsion = BgL_provzd2initzd2(function(address, store, church_c1, church_c2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa469", address), store, BgL_provzd2initzd2(function(address, store, church_dist) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa470", address), store, church_greater_log, arglist(BgL_provzd2initzd2(20), church_dist, BgL_provzd2initzd2(3)));
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa471", address), store, church_distance_citation, arglist(church_c1, church_c2))));
        });
    church_factor_repulsion = BgL_churchzd2applyzd2(new sc_Pair("\uEBACa472", address), store, BgL_churchzd2makezd2factorzb2provenancezb2, arglist(BgL_provzd2initzd2(function(address, store, church_c1, church_c2) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa473", address), store, church_score_repulsion, arglist(church_c1, church_c2));
            })));
    church_factor_citation_paper = BgL_churchzd2applyzd2(new sc_Pair("\uEBACa474", address), store, BgL_churchzd2makezd2factorzb2provenancezb2, arglist(BgL_provzd2initzd2(function(address, store, church_c1, church_p1) {
              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa475", address), store, church_score_affinity, arglist(church_c1, church_p1));
            })));
    church_get_initial = BgL_provzd2initzd2(function(address, store, church_s1) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isZero, BgL_primzb2provzb2(sc_stringLength, church_s1)), function() {
                    return BgL_provzd2initzd2("");
                  }, function() {
                    return BgL_primzb2provzb2(sc_car, BgL_primzb2provzb2(sc_string2list, church_s1));
                  });
        });
    church_distance_firstname = BgL_provzd2initzd2(function(address, store, church_n1, church_n2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa476", address), store, BgL_provzd2initzd2(function(address, store, church_length_n1, church_length_n2) {
                      return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2andzd2, BgL_primzb2provzb2(sc_isZero, church_length_n1), BgL_primzb2provzb2(sc_isZero, church_length_n2)), function() {
                                return BgL_provzd2initzd2(0);
                              }, function() {
                                return BgL_ifzb2provzb2(store, BgL_primzb2provzb2addrz00(address, store, BgL_churchzd2orzd2, BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(1), church_length_n1), BgL_primzb2provzb2(sc_equal, BgL_provzd2initzd2(1), church_length_n2)), function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa477", address), store, BgL_provzd2initzd2(function(address, store, church_initial_n1, church_initial_n2) {
                                                      return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_isEq, church_initial_n1, church_initial_n2), function() {
                                                                return BgL_provzd2initzd2(0);
                                                              }, function() {
                                                                return BgL_primzb2provzb2(sc_max, BgL_primzb2provzb2(sc_stringLength, church_n1), BgL_primzb2provzb2(sc_stringLength, church_n2), BgL_provzd2initzd2(5));
                                                              });
                                                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa478", address), store, church_get_initial, arglist(church_n1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa479", address), store, church_get_initial, arglist(church_n2))));
                                        }, function() {
                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa480", address), store, church_distance_string, arglist(church_n1, church_n2));
                                        });
                              });
                    }), arglist(BgL_primzb2provzb2(sc_stringLength, church_n1), BgL_primzb2provzb2(sc_stringLength, church_n2)));
        });
    church_distance_middlename = BgL_provzd2initzd2(function(address, store, church_n1, church_n2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa481", address), store, church_distance_firstname, arglist(church_n1, church_n2));
        });
    church_distance_lastname = BgL_provzd2initzd2(function(address, store, church_n1, church_n2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa482", address), store, church_distance_string, arglist(church_n1, church_n2));
        });
    church_distance_author = BgL_provzd2initzd2(function(address, store, church_a1, church_a2) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa483", address), store, BgL_provzd2initzd2(function(address, store, church_dist_firstname) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa484", address), store, BgL_provzd2initzd2(function(address, store, church_dist_middlename) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa485", address), store, BgL_provzd2initzd2(function(address, store, church_dist_lastname) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa486", address), store, BgL_provzd2initzd2(function(address, store, church_ans) {
                                                          return church_ans;
                                                        }), arglist(BgL_primzb2provzb2(sc_plus, church_dist_firstname, church_dist_middlename, church_dist_lastname)));
                                            }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa487", address), store, church_distance_lastname, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa488", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3lastname_112ze3, arglist(church_a1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa489", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3lastname_112ze3, arglist(church_a2))))));
                                }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa490", address), store, church_distance_middlename, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa491", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3middlename_111ze3, arglist(church_a1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa492", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3middlename_111ze3, arglist(church_a2))))));
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa493", address), store, church_distance_firstname, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa494", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3firstname_110ze3, arglist(church_a1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa495", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3firstname_110ze3, arglist(church_a2))))));
        });
    church_string_length_author = BgL_provzd2initzd2(function(address, store, church_author) {
          return BgL_primzb2provzb2(sc_plus, BgL_primzb2provzb2(sc_stringLength, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa496", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3firstname_110ze3, arglist(church_author))), BgL_primzb2provzb2(sc_stringLength, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa497", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3middlename_111ze3, arglist(church_author))), BgL_primzb2provzb2(sc_stringLength, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa498", address), store, BgL_sc_churchzd2authorzd2aszd2citedzd2ze3lastname_112ze3, arglist(church_author))));
        });
    church_string_length_authors = BgL_provzd2initzd2(function(address, store, church_authors) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa499", address), store, church_sum, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa500", address), store, church_map, arglist(church_string_length_author, church_authors))));
        });
    church_distance_citation = BgL_provzd2initzd2(function(address, store, church_c1, church_c2) {
          return BgL_ifzb2provzb2(store, BgL_primzb2provzb2(sc_not, BgL_primzb2provzb2(sc_equal, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa501", address), store, BgL_sc_churchzd2citationzd2ze3numzd2obszd2authors_114ze3, arglist(church_c1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa502", address), store, BgL_sc_churchzd2citationzd2ze3numzd2obszd2authors_114ze3, arglist(church_c2)))), function() {
                    return BgL_primzb2provzb2(sc_max, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa503", address), store, church_string_length_authors, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa504", address), store, BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31, arglist(church_c1)))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa505", address), store, church_string_length_authors, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa506", address), store, BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31, arglist(church_c2)))));
                  }, function() {
                    return BgL_primzb2provzb2(sc_plus, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa507", address), store, church_sum, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa508", address), store, church_map, arglist(church_distance_author, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa509", address), store, BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31, arglist(church_c1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa510", address), store, BgL_sc_churchzd2citationzd2ze3obszd2authors_115z31, arglist(church_c2)))))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa511", address), store, church_distance_string_case_insensitive, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa512", address), store, BgL_sc_churchzd2citationzd2ze3obszd2title_116z31, arglist(church_c1)), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa513", address), store, BgL_sc_churchzd2citationzd2ze3obszd2title_116z31, arglist(church_c2)))));
                  });
        });
    church_sample_paper_title = BgL_provzd2initzd2(function(address, store) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa514", address), store, BgL_provzd2initzd2(function(address, store, church_total_length) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa515", address), store, BgL_provzd2initzd2(function(address, store, church_sampled_id) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa516", address), store, BgL_provzd2initzd2(function(address, store, church_selected_title) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa517", address), store, BgL_provzd2initzd2(function(address, store, church_obs_citation_title) {
                                                          return church_obs_citation_title;
                                                        }), arglist(church_selected_title));
                                            }), arglist(BgL_primzb2provzb2(sc_listRef, church_title_sets, church_sampled_id)));
                                }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa518", address), store, church_sample_integer, arglist(church_total_length))));
                    }), arglist(BgL_primzb2provzb2(sc_length, church_title_sets)));
        });
    church_sample_paper_authors = BgL_provzd2initzd2(function(address, store) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa519", address), store, BgL_provzd2initzd2(function(address, store, church_total_length) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa520", address), store, BgL_provzd2initzd2(function(address, store, church_sampled_id) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa521", address), store, BgL_provzd2initzd2(function(address, store, church_selected_authors) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa522", address), store, BgL_provzd2initzd2(function(address, store, church_obs_citation_authors) {
                                                          return church_obs_citation_authors;
                                                        }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa523", address), store, church_map, arglist(church_parse_author, church_selected_authors))));
                                            }), arglist(BgL_primzb2provzb2(sc_listRef, church_author_sets, church_sampled_id)));
                                }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa524", address), store, church_sample_integer, arglist(church_total_length))));
                    }), arglist(BgL_primzb2provzb2(sc_length, church_author_sets)));
        });
    church_sample_paper = BgL_provzd2initzd2(function(address, store) {
          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa525", address), store, BgL_provzd2initzd2(function(address, store, church_authors) {
                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa526", address), store, BgL_provzd2initzd2(function(address, store, church_title) {
                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa527", address), store, BgL_provzd2initzd2(function(address, store, church_pub_type) {
                                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa528", address), store, BgL_provzd2initzd2(function(address, store, church_num_authors) {
                                                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa529", address), store, church_make_paper, arglist(church_num_authors, church_authors, church_title, church_pub_type, BgL_provzd2initzd2(null)));
                                                        }), arglist(BgL_primzb2provzb2(sc_length, church_authors)));
                                            }), arglist(BgL_provzd2initzd2(new sc_Pair("default", null))));
                                }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa530", address), store, church_sample_paper_title, arglist())));
                    }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa531", address), store, church_sample_paper_authors, arglist())));
        });
    BgL_provzd2initzd2(function(address, store) {
        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa532", address), store, church_sample_integerS, arglist(BgL_provzd2initzd2(20)));
      });
    BgL_provzd2initzd2(function(address, store, church_x) {
        return BgL_provzd2initzd2(null);
      });
    BgL_primzb2provzb2(BgL_enablezd2larjzd2debugz00);
    BgL_primzb2provzb2(BgL_enablezd2provzd2debugz00);
    stmp = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa533", address), store, church_for_each, arglist(BgL_churchzd2displayzd2, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa534", address), store, church_larj_mh_query_proposal_count, arglist(BgL_provzd2initzd2(100), BgL_provzd2initzd2(1), BgL_provzd2initzd2(5), BgL_provzd2initzd2(function(address, store) {
                  var proc;
                  var church_paper_id_distribution;
                  var BgL_sc_churchzd2citationzd2ze3paperzd2idzd2mem_118ze3;
                  var church_unique_paper_ids;
                  var church_x;
                  church_paper_id_distribution = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa535", address), store, church_DPmem, arglist(BgL_provzd2initzd2(1.2), church_gensym));
                  proc = BgL_provzd2initzd2(function(address, store, church_o) {
                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa536", address), store, church_paper_id_distribution, arglist());
                      });
                  BgL_sc_churchzd2citationzd2ze3paperzd2idzd2mem_118ze3 = BgL_provzd2initzd2(function(address_268, store) {
                        var args = null;
                        for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
                          args = sc_cons(arguments[sc_tmp], args);
                        }
                        return BgL_applyzd2fnzb2provz60(new sc_Pair(BgL_extractzd2valszd2(args), address), store, proc, args);
                      });
                  church_unique_paper_ids = BgL_trzd2deletezd2duplicateszb2provenancezb2(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa537", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_x) {
                              return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa538", address), store, BgL_sc_churchzd2citationzd2ze3paperzd2idzd2mem_118ze3, arglist(church_x));
                            }), church_citations)));
                  church_x = BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa539", address), store, BgL_provzd2initzd2(function(address, store, church_papers) {
                          return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa540", address), store, BgL_provzd2initzd2(function(address, store, BgL_sc_churchzd2citationzd2ze3paper_119ze3) {
                                      return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa541", address), store, BgL_provzd2initzd2(function(address, store, church_paper_citation_factors) {
                                                  return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa542", address), store, BgL_provzd2initzd2(function(address, store, church_paper_paper_factors) {
                                                              return BgL_primzb2provzb2(sc_list, BgL_primzb2provzb2(sc_length, church_unique_paper_ids), BgL_trzd2listzd2ze3listzb2provenancez51(church_papers), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa543", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c1, church_score1) {
                                                                              return BgL_primzb2provzb2(sc_list, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa544", address), store, BgL_sc_churchzd2citationzd2ze3paperzd2idzd2mem_118ze3, arglist(church_c1)), BgL_primzb2provzb2(sc_list, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa545", address), store, BgL_sc_churchzd2paperzd2ze3title_113ze3, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa546", address), store, BgL_sc_churchzd2citationzd2ze3paper_119ze3, arglist(church_c1))))), BgL_primzb2provzb2(sc_list, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa547", address), store, BgL_sc_churchzd2citationzd2ze3obszd2title_116z31, arglist(church_c1))), church_score1);
                                                                            }), church_citations, BgL_trzd2listzd2ze3listzb2provenancez51(church_paper_citation_factors))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa548", address), store, church_sum, arglist(BgL_trzd2listzd2ze3listzb2provenancez51(church_paper_citation_factors))), BgL_trzd2listzd2ze3listzb2provenancez51(church_paper_paper_factors), BgL_primzb2provzb2(sc_plus, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa549", address), store, church_sum, arglist(BgL_trzd2listzd2ze3listzb2provenancez51(church_paper_citation_factors))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa550", address), store, church_sum, arglist(BgL_trzd2listzd2ze3listzb2provenancez51(church_paper_paper_factors)))));
                                                            }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa551", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_p1p2) {
                                                                    return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa552", address), store, church_factor_repulsion, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa553", address), store, church_tr_second, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa554", address), store, church_tr_first, arglist(church_p1p2)))), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa555", address), store, church_tr_second, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa556", address), store, church_tr_second, arglist(church_p1p2))))));
                                                                  }), BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa557", address), store, church_tr_pairs, arglist(church_papers))))));
                                                }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa558", address), store, church_map, arglist(BgL_provzd2initzd2(function(address, store, church_c1) {
                                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa559", address), store, church_factor_citation_paper, arglist(church_c1, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa560", address), store, BgL_sc_churchzd2citationzd2ze3paper_119ze3, arglist(church_c1))));
                                                      }), church_citations))));
                                    }), arglist(BgL_provzd2initzd2(function(address, store, church_c1) {
                                        return BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa561", address), store, church_tr_second, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa562", address), store, church_tr_assoc, arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa563", address), store, BgL_sc_churchzd2citationzd2ze3paperzd2idzd2mem_118ze3, arglist(church_c1)), church_papers))));
                                      })));
                        }), arglist(BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa564", address), store, church_tr_map, arglist(BgL_provzd2initzd2(function(address, store, church_id) {
                                return BgL_trzd2listzb2provenancez60(church_id, BgL_applyzd2fnzb2provz60(new sc_Pair("\uEBACa565", address), store, church_sample_paper, arglist()));
                              }), church_unique_paper_ids))));
                  return BgL_primzb2provzb2(pair, BgL_primzb2provzb2(sc_greaterEqual, BgL_primzb2provzb2(sc_length, church_unique_paper_ids), BgL_provzd2initzd2(2)), BgL_provzd2initzd2(function(address, store) {
                              return church_x;
                            }));
                })))));
    return erase(stmp);
  };
sc_display(BgL_churchzd2mainzd2(new sc_Pair("\uEBACtop", null), BgL_makezd2emptyzd2storez00()));
