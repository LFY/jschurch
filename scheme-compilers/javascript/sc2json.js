function isAssocList(test_list){
    var input_jsArray = sc_list2vector(test_list);
    for(var i = 0; i < input_jsArray.length; i++){
        // console.log("is pair?");
        // console.log(sc_isPair(input_jsArray[i]));
        // console.log(i);
        // console.log(input_jsArray[i]);
        if (!sc_isPair(input_jsArray[i])){
            return false;
        }
    }

    // console.log("test_list is an assoc list");
    return true;
}

function displayJSON(j) {
    console.log(JSON.stringify(j));
}

function convert_sym(x) {
    if (sc_isSymbol(x)) {
        return sc_symbol2jsstring(x);
    } else {
        return x;
    }
}

function json(input){
    var res = new Object();
    if (!sc_isList(input)){
        return convert_sym(input);
    }else{
        var input_jsArray = sc_list2vector(input);
        if (isAssocList(input)){
            for(var i = 0; i < input_jsArray.length; i++){
                var key = convert_sym(sc_car(input_jsArray[i]));
                var intermed = json(sc_cadr(input_jsArray[i]));
                res[key] = intermed;
            }
            return res;
        }else{
            if(sc_isSymbol(input_jsArray[0]) && (sc_symbol2jsstring(input_jsArray[0]) == "list")){
                var res2 = new Array();
                for(var i = 1; i < input_jsArray.length; i++) {
                    res2.push(json(input_jsArray[i]));
                }
                return res2;
            }else{
                return "ERROR!!!"
            }
        }
    }
}
