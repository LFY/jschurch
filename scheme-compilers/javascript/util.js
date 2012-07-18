var command_line = function () { 
    var ans = process.argv;
    var res = null;
    for (var i = ans.length-1; i >= 0; i--)
	res = sc_cons(ans[i], res);
    return res;
}

// Just don't call church_main, no need to make a separate function

var church_params = {};

function in_node() {
    if((typeof window) == 'undefined') {
        return true;
    } else if (window !== undefined && this == window) {
        return false;
    } else {
        return true;
    }
}

function param_exists(p) {
    return !(church_params[p] === undefined);
}

function param_lookup(p) {
    return church_params[p];
}

var argv_idx = 2;
var argv_dict = {};

function argv_exists(p) {
    if (in_node()){
        var res = argv_idx < process.argv.length;
        argv_dict[p] = argv_idx;
        argv_idx += 1;
        return res;
    } else {
        return false;
    }
}

function argv_lookup(p) {
    return process.argv[argv_dict[p]];
}

function run_church_main() {
    return BgL_scmzd2ze3jsonz31(BgL_churchzd2mainzd2(new sc_Pair("\uEBACtop", null), BgL_makezd2emptyzd2storez00()));
}


function is_main_module() {
    return in_node() && !module.parent;
}

var param_type_map = {
    "int" : function (val) { if (val instanceof Number) { return val; } else { return parseInt(val) ; } },
    "float" : function (val) { if (val instanceof Number) { return val; } else { return parseFloat(val) ; } },
    "string" : function (val) { if (not (val instanceof String)) { return val.toString; } else { return val; } },
}

function lookup_param(typename, name, default_value) {
    var desired_type = sc_symbol2jsstring(typename);

    var res = undefined;
    if (is_main_module()) {
        var exists = argv_idx < process.argv.length;
        if (exists) {
            res = process.argv[argv_idx];
        } else {
            res = default_value;
        }
        argv_idx += 1;
    } else {
        if(church_params[name] === undefined) {
            res = default_value;
        } else {
            res = church_params[name];
        }
    }
    return param_type_map[desired_type](res);
}

if(in_node()) {
    module.exports = {
        run_church_main : run_church_main,
        church_params : church_params
    };

}


var js_nil = [];
var js_cons = function (a, b) {
    return [a].concat(b);
}

function js_alist2js_dict(alist) {
    var res = {};
    for(var i = 0; i < alist.length; i++) {
        var curr_k = alist[i].car;
        var curr_v = alist[i].cdr;
        res[curr_k] = curr_v;
    }
    return res;
}

var ss_print = function (x) { console.log(sc_toDisplayString(x)); }
var js_print = function (x) { console.log(x); }
