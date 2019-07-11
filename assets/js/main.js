
<script>
    
var x = document.getElementsByClassName("barchart");
var i;
for (i = 0; i < x.length; i++) {
    
   
x[i].id = "tempID";
    
// Parse the Data
d3.csv(x[i].dataset.link, function(data) {
    
    var numberOfRows = data.length;
    
    
// set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 70, left: 60},
    width = numberOfRows*45,
    height = 400 - margin.top - margin.bottom;
    
    
document.body.style.minWidth =  String(width + margin.left + margin.right + 2*30 + 2*20 + 2*20)+ "px";
d3.select("#tempID")
    .style("width",  width + margin.left + margin.right + "px")
    .style("margin", "auto");
    
// append the svg object to the body of the page
var svg = d3.select("#tempID")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  // sort data
  data.sort(function(b, a) {
    return a.Value - b.Value;
  });
    
    var headings = data.columns;
    
    data.forEach(function(d) {
        d[headings[1]] = +d[headings[1]];
    });
    
    var max = d3.max(data, function(d) { return d[headings[1]]; });
    var i = 0;
    while (max > 10) {
        max = max/10;
        i++;
    }
    max = Math.floor(max) + 1;
    while (i > 0) {
        max = max*10;
        i--;
    }
    
    
  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d[headings[0]]; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .call(wrap, margin.bottom*1.4);
    
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, max])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d[headings[0]]); })
      .attr("y", function(d) { return y(d[headings[1]]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[headings[1]]); })
      .attr("fill", "#69b3a2")
    
    
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width/2)
    .attr("y", -30)
    .text("Number of Deaths per Leading Cause, United States 2017")
    .call(titlewrap, width);
});
    
    
}
    
    
    
var x = document.getElementsByClassName("source");
var i;
for (i = 0; i < x.length; i++) {
var sourceString = x[i].innerHTML;
x[i].innerHTML = "";
var span = document.createElement("span");
span.innerHTML = "Source (+) : ";
span.className = "sourceButton";
span.setAttribute( "onclick", "toggleSource(this)");
x[i].append(span);
var span = document.createElement("span");
span.innerHTML = sourceString;
span.className = "sourceText";
span.style.display = "none";
x[i].append(span);
}
function toggleSource(x) {
  if (x.parentElement.children[1].style.display === "none") {
    x.parentElement.children[1].style.display = "inline";
    x.innerHTML = "Source (-) : ";
  } else {
    x.parentElement.children[1].style.display = "none";
    x.innerHTML = "Source (+) : ";
  }
}
    
    
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
    
    
    
    
function titlewrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
    
    
    
</script>
