function jsf_gauss_log(mean, val, variance){
    var log2 = Math.log(2);
    var logpi = Math.log(Math.PI);
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

function jsf_box_box_overlap(x1, y1, w1, h1, x2, y2, w2, h2, target_overlap_area, variance){
    var box1geom = box2jsts_bbox(x1, y1, w1, h1);
    var box2geom = box2jsts_bbox(x2, y2, w2, h2);
    var overlap_area = jsts_overlap_conservative(box1geom, box2geom);
    return jsf_norm_gauss_log(overlap_area, target_overlap_area, variance);
}
