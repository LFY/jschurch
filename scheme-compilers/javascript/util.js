var command_line = function () { 
    var ans = process.argv;
    var res = null;
    for (var i = ans.length-1; i >= 0; i--)
	res = sc_cons(ans[i], res);
    return res;
}

// Just don't call church_main, no need to make a separate function

var church_params = {};

function inNode() {
    return !(window !== undefined && this == window);
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
   var res = argv_idx < process.argv.length;
   argv_dict[p] = argv_idx;
   argv_idx += 1;
   return res;
}

function argv_lookup(p) {
    return process.argv[argv_dict[p]];
}
