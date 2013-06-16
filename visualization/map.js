
// Some globals
var data;
var map;

/**
 * Calls for new data based on provided filters, and updates the global var data. Then calls to update the map.
 *
 * @param {filters} Options for filtering the data, e.g. by year.
 */
var update_data = function(filter) {
    console.log("update_data(): loading...");
    $.getJSON("http://localhost/~erickpeirson/visualization/data.json", function(data_response) {
        console.log("update_data(): data loaded.");
        data = data_response;
        update_map();
    })
    .fail(function(a, t, e) { console.log("update_data() failed: " + t + " " + e) });
}

/**
 * Produces a circle icon of a particular size.
 *
 * @param {size} The size of the circle.
 * @return {circle} A google maps CIRCLE symbol of a particular size.
 */
function getCircle(size) {
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: size*2,
        fillColor: 'orange',
        fillOpacity: .8,
        strokeColor: 'white',
        strokeWeight: 1
    };
    return circle
}

/**
 * Draws nodes. Node size is determined by datum.properties.size.
 *
 * @param {datum} A GeoJSON Feature object.
 */
function draw_node(datum) {
    var latLng = new google.maps.LatLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: getCircle(datum.properties.size),   // Circle is sized based on the number of researchers at the institution.
        title: datum.properties.name,
        size: datum.properties.size
    });
    
    google.maps.event.addListener(marker, 'click', function () {
        console.log(marker);
    });
}

/**
 * Draws lines. Width is determined by datum.properties.strength.
 *
 * @param {datum} A GeoJSON LineString object.
 */
function draw_line(datum) {
    var line_coords = [];
    for (var i = 0; i < datum.coordinates.length; i++) {    // For each point in the line...
        line_coords.push(new google.maps.LatLng(datum.coordinates[i][1], datum.coordinates[i][0]));
    }
    var line = new google.maps.Polyline({
        path: line_coords,
        geodesic: true,
        strokeColor: "black",
        strokeOpacity: 0.3,
        strokeWeight: datum.properties.strength,
        strength: datum.properties.strength,
        type: datum.properties.rel_type
    });

    line.setMap(map);
    
    google.maps.event.addListener(line, 'click', function() {
        console.log(line);
    });

}

/**
 * Draws data on the map. Passes data to handlers based on their type.
 *
 * @param {data} A GeoJSON dataset.
 */
function draw_data(data) {
    console.log("draw_data(): drawing "+ data.length + " data.");
    for (var i = 0; i < data.length; i++) {   // For each datum...
        if (data[i].type == 'Feature') {
            draw_node(data[i]);
        } else if (data[i].type == 'LineString') {
            draw_line(data[i]);
        }
    }
}

/**
 * Updates the map. Called when global var data is updated.
 */
function update_map() {
    draw_data(data);
}

/**
 * Starts the map visualization.
 */
function initialize() {
    console.log("initialize");
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(53.6,-3.4),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    map = new google.maps.Map(document.getElementById('map_div'), mapOptions);
    
    update_data(1965);
}