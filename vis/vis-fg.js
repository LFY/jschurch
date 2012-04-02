var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

//d3.json(url, callback)
d3.json("curr-out.json", function(json) {
  force
      .nodes(json.variablenodes.concat(json.factornodes))
      .links(json.links)
      .start();


  var link = svg.selectAll("line.link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll("circle.node")
      .data(json.variablenodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){return 10})
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  var squarenode = svg.selectAll("square.squarenode")
      .data(json.factornodes)
      .enter().append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  squarenode.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    squarenode.attr("x", function(d) { return d.x-7.5; })
              .attr("y", function(d) { return d.y-7.5; });


  });
});

