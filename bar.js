makePlot();

function makePlot() {
  d3.csv('cleaned_dataset.csv', function(data){makeBar(data)});
};

function makeBar(dataset) {
  var x = [];
  var y = [];

  for (var i = 0; i < dataset.length - 1; i++) {
    row = dataset[i];
    x.push(row['State']);
    y.push(row['TotalByState']);
  }

  var trace = {
    x: x, 
    y: y,
    type: "bar",
    marker: {color: 'skyblue'}
  };

  var data = [trace];
  
  var layout = {
    title: "Total Number of Cases Since 2010 by State",
    xaxis: {title: "State", tickangle: -35},
    yaxis: {title: "Number of Cases"},
    font: {size: 10}
  };

  Plotly.newPlot('bar', data, layout);
};