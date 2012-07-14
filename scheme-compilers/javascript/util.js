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
    }else{
        return false;
    }
}

function argv_lookup(p) {
    return process.argv[argv_dict[p]];
}

function run_church_main() {
    return BgL_churchzd2mainzd2(new sc_Pair("\uEBACtop", null), BgL_makezd2emptyzd2storez00());
}

if(in_node()) {
    module.exports = {
        run_church_main : run_church_main,
        church_params : church_params
    };
}
