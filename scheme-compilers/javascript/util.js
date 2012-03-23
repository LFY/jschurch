var command_line = function () { 
    var ans = process.argv;
    var res = null;
    for (var i = ans.length-1; i >= 0; i--)
	res = sc_cons(ans[i], res);
    return res;
}
