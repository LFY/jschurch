var __codeCache = {};

var safeDelayedEval = function(jsCode, errHandler, resultHandler, delay){
  var safeEval = function() {
    try {
      //var res = eval(jsCode);
      //console.log("in jschurch-all");
      //console.log(res);
      resultHandler(eval(jsCode));
    } catch (err) {
      errHandler(err);
    }};
  setTimeout(safeEval, 100);
};


var scheme2jsURL = function(schemeExpr){
  return "http://mcpr.stanford.edu/scheme2js/scheme2js.php?code=" + encodeURIComponent(schemeExpr);
};


var setScheme2jsPorts = function(outHandler){
  SC_DEFAULT_OUT = new sc_GenericOutputPort(outHandler);
  SC_ERROR_OUT = SC_DEFAULT_OUT;
};

var scheme2jsPOSTURL = "http://mcpr.stanford.edu/scheme2js/scheme2js.php";
var evalChurchCodeSaveResult = function(churchCode, errHandler, resultHandler){

  var key = hex_md5(churchCode);

  if (__codeCache[key]) {

    console.log("running from client-side cache");
    setScheme2jsPorts(errHandler);
    setScheme2jsPorts(resultHandler);
    safeDelayedEval(__codeCache[key], errHandler, resultHandler, 100);

  } else {

    // Compile Church to Scheme
    var churchInputExpr = "";
    var schemeExpr = "";
    var compilationSuccess = true;
    try {
      churchInputExpr = sc_read(new sc_StringInputPort("(" + churchCode + ")"));
      schemeExpr = compile(churchInputExpr, null);
      var wrappedSchemeExpr = scheme2jsTemplate.supplant(
        { churchprogram : String(schemeExpr).slice(1,-1) });
    } catch (err) {
      compilationSuccess = false;
      errHandler(err);
    }
    if (!(compilationSuccess)) {
      return false;
    }

    console.log("submitting to scheme2js server");
    jQuery.post( scheme2jsPOSTURL, { "code" : wrappedSchemeExpr },
            function(compiledCode) {
                console.log(compiledCode);
                __codeCache[key] = compiledCode;
                setScheme2jsPorts(errHandler);
                setScheme2jsPorts(resultHandler);
                safeDelayedEval(compiledCode, errHandler, resultHandler, 0);
            });
  }
};
 


var evalChurchCode = function(churchCode, returnValueHandler){

  var key = hex_md5(churchCode);

  if (__codeCache[key]) {

    console.log("running from client-side cache");
    setScheme2jsPorts(returnValueHandler);
    safeDelayedEval(__codeCache[key], returnValueHandler, function(data){return data;}, 100);

  } else {

    // Compile Church to Scheme
    var churchInputExpr = "";
    var schemeExpr = "";
    var compilationSuccess = true;
    try {
      churchInputExpr = sc_read(new sc_StringInputPort("(" + churchCode + ")"));
      schemeExpr = compile(churchInputExpr, null);
      var wrappedSchemeExpr = scheme2jsTemplate.supplant(
        { churchprogram : String(schemeExpr).slice(1,-1) });
    } catch (err) {
      compilationSuccess = false;
      returnValueHandler(err);
    }
    if (!(compilationSuccess)) {
      return false;
    }

    console.log("submitting to scheme2js server");
    jQuery.post( scheme2jsPOSTURL, { "code" : wrappedSchemeExpr },
            function(compiledCode) {
                console.log(compiledCode);
                __codeCache[key] = compiledCode;
                setScheme2jsPorts(returnValueHandler);
                safeDelayedEval(compiledCode, returnValueHandler, function(data){return data;}, 0);
            });


   //  jQuery.getJSON(
   //    scheme2jsURL(wrappedSchemeExpr),
   //    null,
   //    function(compiledCode){
   //      __codeCache[key] = compiledCode;
   //      setScheme2jsPorts(returnValueHandler);
   //      safeDelayedEval(compiledCode, returnValueHandler, 0);
   //    });
  }
};
