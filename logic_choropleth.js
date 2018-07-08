var myMap = L.map('map', {
	center: [39.8283, -98.5795],
	zoom: 11
});

APIKEY = "pk.eyJ1Ijoic2NvdHRtY2FsaXN0ZXIxMyIsImEiOiJjamlhdWd2bzMxYjU1M3Ztcm54N2kxaDQ2In0.mGtR6lttrtiEpIqHVEIAtQ"

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=" + APIKEY).addTo(myMap)

**COMBINE GEOJSON file**

var apiLINK = "combined Geojson.file"

var geojson;

funciton getColor(d){
	return d > 200 ? '#80026':
		   d > 100 ? '#BD0026':
		   d > 75 ? '#E31A1C':
		   d > 50 ? '#FC4E2A':
		   d > 25 ? 'FD8D3C':
		   d > 10 ? 'FEB24C':
		   d > 1 ? 'FED976':
		   '#FFEDA0'
}

function style(feature){
	return {
		fillColor: getColor(feature.properites.SOEMTHING),
		weight: 2,
		opacity: .75,
		color: 'white',
		dashArray: '3',
		fillOpacity: .7
	};
}
L.geoJson(statesData, {style: style}).addTo(map);

function highlightFeature(e){
	var layer = e.target;
	layer.setStyle({
		weight: 5,
		color: "#666",
		dashArray: "",
		fillOpacity: .7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
		layer.bringToFront();
	}
}

function resetHighlight(e){
	geojson.resetStyle(e.target);
}

function zoomToFeature(e){
	map.fitBounds(e.target.getBounds());
}

function OnEachFeature(feature,layer){
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

geojson = L.geoJson(statesData, {
	style: style,
	OnEachFeature: OnEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map){
	this._div = L.DomUtil('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props){
	this._div.innerHTML = '<h4>West Nile Virus Case Density</h4>' + (props ? '<b>' + props.name + '</b><br />' + props.density + 'cases/state<sup>2</sup>':'Hover over a state');
};
info.addTo(map);


$getJSON("file.json", function(json){
	var testlayer = L.geoJson(json),
	sliderControl = L.control.sliderControl({
		position: "topright",
		layer: testlayer
	});

	sliderControl=L.control.sliderControl({
		position: "topright",
		layer: "testlayer",
		timeAttribute: "EndDate",
	});

	myMap.addControl(sliderControl);
	sliderControl.startSlider();
})

var legend = L.control({position: "bottomright"});
legend.onAdd = function(map){
	var div = L.DomUtil.create("div", "info legend"),
	grades = [1, 10, 25, 50, 75, 100, 200],
	labels = [];

	for (var i=0; i<grades.length; i++){
		div.innerHTML += '<i style=background:' + getColor(grades[i] + 1) + '"></i?' + grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : "+");
	}
	return div;
};
legend.addTo(map);





