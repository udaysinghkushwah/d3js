var app = angular.module("myApp");
app.controller("MainCtrl", ['$scope', function($scope) {
    $scope.d3obj = "Main Controller";
    console.log(d3);
    var svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data.tsv", function(d) {
        d.frequency = +d.frequency;
        return d;
    }, function(error, data) {
        if (error) throw error;

        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.frequency); });
    });

    //for selecting paragraphs
    // var paragraphs = document.getElementsByTagName("p")
    // for (var index = 0; index < paragraphs.length; index++) {
    //     var paragraph = paragraphs.item(index);
    //     paragraph.style.setProperty("color", "white", null);
    // }
    //equavelent to this code in d3
    // d3.selectAll("p").style("color", "white");
    // d3.select('body').style("background-color", "black");

    //dynamic properties set in d3 
    // d3.selectAll("p").style("color", function(d, i) {
    //     return i % 2 ? "#fff" : "#eee";
    // });

    //compute dynamic font sizes
    // d3.selectAll("p")
    //     .data([4, 8, 15, 16, 23, 42])
    //     .style("font-size", function(d) { return d + "px"; });

    //enter and exit

    // d3.select('body')
    //     .selectAll('p')
    //     .data([4, 8, 15, 16, 23, 42])
    //     .enter().append("p")
    //     .text(function(d) { return "I 'm number" + d + "!" });

    //handling all these case sepratly
    //update
    // var p = d3.select('body')
    //     .selectAll('p')
    //     .data([4, 8, 15, 16, 23, 42])
    //     .text(function(d) { return "sdfdsf" + d });
    // //enter
    // p.enter().append("p")
    //     .text(function(d) { return d });

    // //exit
    // p.exit().remove();

    //Transitions
    // d3.select('body').transition()
    //     .duration(750)
    //     .delay(function(d, i) { return i * 10; })
    //     .style("background-color", "black");
}]);