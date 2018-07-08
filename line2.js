makePlot();

function makePlot() {
  d3.csv('line_dataset.csv', function(data){makeLine(data)});
};

function makeLine(dataset) {
  var x = [];
  var y = [];

  for (var i = 0; i < dataset.length - 1; i++) {
    row = dataset[i];
    x.push(row['Year']);
    y.push(row['Total']);
  }

  var trace = {
    x: x, 
    y: y,
    type: "line",
    marker: {color: 'skyblue'}
  };

  var data = [trace];

  var layout = {
    title: "Total Number of Cases In U.S. by Year",
    xaxis: {title: "Year"},
    yaxis: {title: "Number of Cases"}
    // font: {size: 10}
  };

  Plotly.newPlot('line', data, layout);
};