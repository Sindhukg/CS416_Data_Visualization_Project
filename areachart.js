// set the dimensions and margins of the graph

var margin = {top: 20, right: 20, bottom: 110, left: 350},
    margin2 = {top: 330, right: 20, bottom: 30, left: 150},
    width = 1400 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom,
    height2 = 400 - margin2.top - margin2.bottom;

function displayChart(data){

  d3.selectAll('svg').remove();

// append the svg object to the body of the page

  var svg = d3.select("#dataviz")
      .append("svg")
          .attr("width", 1400)
          .attr("height", 550);

  var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var xAxis2 = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var yAxis = d3.axisLeft(y)
                .tickPadding(10)
                .tickFormat(d3.format("~s"));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.cases; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());
 
  d3.select("#overview")
    .append("svg")
    .attr("height",20)
    .append("g")
    .append('text')
    .attr("x", 0)
    .attr("y", 10)
    .attr("id","annotation")
    .text("Note : Hover over the graph for more details")
    .attr("font-size", "14px")
    .attr("font-weight","italic")
    .style("fill", "Black")
    .attr("font-weight","bold")
	
  d3.select("#continent")
    .append("svg")
    .attr("height",20)
    .append("g")
    .append('text')
    .attr("x", 0)
    .attr("y", 10)
    .attr("id","annotation")
    .text("Note : Hover over the graph for more details")
    .attr("font-size", "14px")
    .attr("font-weight","italic")
    .style("fill", "Black")
    .attr("font-weight","bold")
	
  d3.select("#country")
    .append("svg")
    .attr("height",20)
    .append("g")
    .append('text')
    .attr("x", 0)
    .attr("y", 10)
    .attr("id","annotation")
    .text("Note : Hover over the graph for more details")
    .attr("font-size", "14px")
    .attr("font-weight","italic")
    .style("fill", "Black")
    .attr("font-weight","bold")
    
  var rect = svg.append('rect')
         .attr("x", 700)
         .attr("y", 50)
         .attr("width", 310)
         .attr("id","anno")
         .attr("height", 100)
         .attr("fill","lightblue")
         .attr("stroke","black")

  svg.append('g')
  .append('text')
  .attr("x", 710)
  .attr("y", 65)
  .attr("id","anno")
  .text("Highest number of Global cases : 3828937")
  .attr("font-size", "14px")
  .attr("font-weight","italic")
  .style("fill", "Black")
  .attr("font-weight","bold")
  
  svg.append('g')
  .append('text')
  .attr("x", 710)
  .attr("y", 85)
  .attr("id","anno")
  .text("Date of Peak Covid Globally : 1/21/2022")
  .attr("font-size", "14px")
  .attr("font-weight","italic")
  .style("fill", "Black")
  
  svg.append('g')
  .append('text')
  .attr("x", 710)
  .attr("y", 105)
  .attr("id","anno")
  .text("Highest number of Cases in Africa : 60523")
  .attr("font-size", "14px")
  .attr("font-weight","italic")
  .style("fill", "Black")
  
  svg.append('g')
  .append('text')
  .attr("x", 710)
  .attr("y", 125)
  .attr("id","anno")
  .text("Highest number of Cases in Algeria : 2521")
  .attr("font-size", "14px")
  .attr("font-weight","italic")
  .style("fill", "Black")

  var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

  var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

  var area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.cases); });

  var area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.cases); });

  svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

  var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  focus.append("path")
    .datum(data)
    .attr("class", "area")
	.attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", area);

  focus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	 .append('text')
        .attr('class', 'axis-label')
		.attr('y', +60)
        .attr('x', 500)
        .attr('text-anchor', 'middle')
		.attr('fill', 'black')
        .text('Date');

  focus.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text('Cases');

  const bounds = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");
  const listeningRect = bounds
    .append("rect")
    .attr("class", "listening-rect")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", onMouseMove)
    .on("mousemover", onMouseMove)
    .on("mouseleave", onMouseLeave);

  const tooltipLine = bounds
    .append("g")
    .append("rect")
    .attr("class", "dotted")
    .attr("stroke-width", "1px")
    .attr("width", ".5px")
    .attr("height", height);

  const dateParser = d3.timeFormat("%-m/%-d/%y");

  function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; 
      var s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);
      svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
          .scale(width / (s[1] - s[0]))
          .translate(-s[0], 0));
   };

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; 
      var t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);
      context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    };


    function onMouseMove(){
      const mousePosition = d3.mouse(this);
      const hoveredDate = x.invert(mousePosition[0]);

      const closestIndex = data.findIndex(d => dateParser(d.date)===dateParser(hoveredDate));
      const closestDataPoint = data[closestIndex];

      const closestXValue = closestDataPoint.date;
      const closestYValue = data[closestIndex].cases;
      const closestZValue = closestDataPoint.deaths;

      const formatDate = d3.timeFormat("%-m/%-d/%y");

      tooltip.select("#date").text(formatDate(closestXValue));
      tooltip.select("#cases").html(closestYValue);
      tooltip.select("#deaths").html(closestZValue);

      tooltip.style("left", (d3.event.pageX-55) + "px")
              .style("top", (d3.event.pageY+10) + "px")


      tooltip.style("opacity", 1);
      tooltipLine.style("opacity", 1);
      tooltipLine.attr("x", x(closestXValue));

    };

    function onMouseLeave(){
      tooltip.style("opacity", 0);
      tooltipLine.style("opacity", 0);
    };

  const tooltip = d3.select("#tooltip");
};


export {displayChart};

