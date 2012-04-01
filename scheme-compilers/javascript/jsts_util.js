function get_box_corners(x, y , width, height){
    var res = new Array(4);
    res[0] = [x, y];
    res[1] = [x+width, y];
    res[2] = [x+width, y+height];
    res[3] = [x, y+height];
    return res;
}

function jsts_coords(xypoints){
    var head_coord = new jsts.geom.Coordinate(xypoints[0][0], xypoints[0][1]);

    var res1 = xypoints.map(function(x){return new jsts.geom.Coordinate(x[0], x[1]);});
    var res = res1.concat([head_coord]);
    return res;
}

function jsts_bbox(poly_points){
    var geoFac = new jsts.geom.GeometryFactory();
    var a = geoFac.createPolygon(geoFac.createLinearRing(jsts_coords(poly_points)), null);
    return a; 
}

function box2jsts_bbox(x, y, width, height){
    return jsts_bbox(get_box_corners(x, y, width, height));
}

function jsts_overlap_conservative(jsts_geo1, jsts_geo2){
    var jsts_area1 = jsts_geo1.getArea();
    var jsts_area2 = jsts_geo2.getArea();
    var small_area = Math.min(jsts_area1, jsts_area2);
    var geo_intersect_area = jsts_geo1.intersection(jsts_geo2).getArea();
    return geo_intersect_area / small_area;
}


