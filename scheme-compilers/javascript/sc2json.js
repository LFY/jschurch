function isAssocList(test_list){
    var input_jsArray = sc_list2vector(test_list);
    for(var i = 0; i < input_jsArray.length; i++){
        console.log("is pair?");
        console.log(sc_isPair(input_jsArray[i]));
        console.log(i);
        console.log(input_jsArray[i]);
        if (!sc_isPair(input_jsArray[i])){
            return false;
        }
    }

    console.log("test_list is an assoc list");
    return true;
}

function json(input){
    console.log("json");
    console.log(input);
    var res = new Object();
    if (!sc_isList(input)){
        return input;
    }else{
        var input_jsArray = sc_list2vector(input);
        console.log("input_length");
        console.log(input_jsArray.length);
        if (isAssocList(input)){
            for(var i = 0; i < input_jsArray.length; i++){
                console.log("curr_elem");
                res[sc_car(input_jsArray[i])] = json(sc_cadr(input_jsArray[i]));
            }
            console.log("final_result:");
            console.log(res);
            return res;
        }else{
            console.log("In is symbol branch");
            if(sc_isSymbol(input_jsArray[0]) && (sc_symbol2jsstring(input_jsArray[0]) == "list")){
                return Array(input_jsArray.slice(1, input_jsArray.length));
            }else{
                return "ERROR!!!"
            }
        }
    }
}
