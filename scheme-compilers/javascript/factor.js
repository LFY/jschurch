function jsf_gauss_log(mean, val, variance){
    var log2 = Math.log(2);
    var logpi = Math.log(pi);
    var diff = val - mean;
    return -diff * diff / (2.0 * variance) - 0.5 * (log2 + logpi + Math.log(variance));
}

function jsf_norm_gauss_log(mean, val, variance){
    var max_val = jsf_gauss_log(mean, mean, variance);
    return jsf_gauss_log(mean, val, variance) - max_val;
}

function jsf_box_width(w, target_width, variance){
    return jsf_norm_gauss_log(0, (w-target_width), variance);
}
