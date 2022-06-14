import TableCsv from "./TableCsv.js";
const mainCsvTable = document.querySelector("#maincsv");
const sideCsvTable = document.querySelector("#sidecsv");
const tableCsv = new TableCsv(mainCsvTable);
const sideCsv = new TableCsv(sideCsvTable);

function start(){
    fetch('master.csv')
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        // console.log(data);
        Papa.parse(data, {
            delimiter: ",",
            skipEmptyLines: true,
            complete: results => {
                // console.log(results);
                tableCsv.update(results.data, ["Number", "Data"])
            }
        });
        for(var i = 1; i<10;i++){
            const button = document.getElementById("000"+`${i}`);
            button.addEventListener("click", showtwo);
        }
        const button = document.getElementById("0010");
        button.addEventListener("click", showtwo);
    })
    .catch(function(error) {
        console.log(error);
    })
};
start();

function showtwo(e){
    console.log(e.path[1].id);
    fetch(`${e.path[1].id}.csv`)
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        Papa.parse(data, {
            delimiter: ",",
            skipEmptyLines: true,
            complete: results => {
                // console.log(results);
                sideCsv.updateOther(results.data, ["Timestamp", "Latitude", "Longitude"]);
                initTrajectory(results.data);
            }
        });
    })
    .catch(function(error){
        console.log(error);
    })
};

function initTrajectory(data){
    // console.log(data);
    const trajectory = new google.maps.Map(document.getElementById("right_upper"),{
        zoom: 3,
        center: {lat:0, lng:-180},
        mapTypeId: "terrain",
        streetViewControl: false,
    });
    var latLngBounds = new google.maps.LatLngBounds();
    let trajCoordinates=[];
    for(var i=0;i<100;i++){
        let curr = {lat: Number(data[i][1]), lng: Number(data[i][2])}
        trajCoordinates.push(curr);
        latLngBounds.extend(curr);
    }
    trajectory.fitBounds(latLngBounds);
    const trajPolyline = new google.maps.Polyline({
        path: trajCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
    });
    trajPolyline.setMap(trajectory);
}