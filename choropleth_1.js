var myMap = L.map("map", {
	center: [39.8283, -98.5795],
	zoom: 4
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NvdHRtY2FsaXN0ZXIxMyIsImEiOiJjamlhdWd2bzMxYjU1M3Ztcm54N2kxaDQ2In0.mGtR6lttrtiEpIqHVEIAtQ").addTo(myMap)



var GEOLINK = "https://raw.githubusercontent.com/scottmcalister/Project_2_Infectious_Disease_Visualizations/master/state_data_modified.json";

var geojson_0;
var geojson_1;
var geojson_2;
var geojson_3;
var geojson_4;
var geojson_5;
var geojson_6;
var geojson_7;

d3.json(GEOLINK, function(data){
	geojson_0=L.choropleth(data, {
		valueProperty: "Rate_2010",
		scale: ['white', 'red'],
		steps:24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2010 + "<br>Case Rate: " + feature.properties.Rate_2010)}
		});
	geojson_1=L.choropleth(data, {
		valueProperty: "Rate_2011",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2011 + "<br>Case Rate: " + feature.properties.Rate_2011)}
		});
	geojson_2=L.choropleth(data, {
		valueProperty: "Rate_2011",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2012 + "<br>Case Rate: " + feature.properties.Rate_2012)}
		});
	geojson_3=L.choropleth(data, {
		valueProperty: "Rate_2013",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2013 + "<br>Case Rate: " + feature.properties.Rate_2013)}
		});
	geojson_4=L.choropleth(data, {
		valueProperty: "Rate_2014",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2014 + "<br>Case Rate: " + feature.properties.Rate_2014)}
		});
	geojson_5=L.choropleth(data, {
		valueProperty: "Rate_2015",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2015 + "<br>Case Rate: " + feature.properties.Rate_2015)}
		});
	geojson_6=L.choropleth(data, {
		valueProperty: "Rate_2016",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2016 + "<br>Case Rate: " + feature.properties.Rate_2016)}
		});
		geojson_7=L.choropleth(data, {
		valueProperty: "Rate_2017",
		scale: ['white', 'red'],
		steps: 24,
		mode: "q",
		style:{
			color:'#fff',
			weight: 1,
			fillOpacity: .8
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.NAME + "<br>Number of cases: " + feature.properties.Cases_2017 + "<br>Case Rate: " + feature.properties.Rate_2017)}
	});

	var overlayMaps = {
		"2010": geojson_0,
		"2011": geojson_1,
		"2012": geojson_2,
		"2013": geojson_3,
		"2014": geojson_4,
		"2015": geojson_5,
		"2016": geojson_6,
		"2017": geojson_7
	};

	L.control.layers('', overlayMaps).addTo(myMap);

	var legend = L.control({ position: "bottomright" });
  	legend.onAdd = function() {
    	var div = L.DomUtil.create("div", "info legend");
    	var limits = geojson_4.options.limits;
    	var colors = geojson_4.options.colors;
    	var labels = [];

    // Add min & max
    var legendInfo = "<h1>Case Rate per 100,000 people Reported Per Year</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

	legend.addTo(myMap);

});

	