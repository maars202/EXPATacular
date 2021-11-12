// Rainfall map/ location/temp/humid/windspeed table

        // rainfall
    axios.get('https://api.data.gov.sg/v1/environment/rainfall')
    .then( response =>  {
        stations_list = response.data.metadata.stations
        unit = response.data.metadata.reading_unit
        datetime = response.data.items[0].timestamp
        readings_list = response.data.items[0].readings   
        d = new Date()
        time = d.getHours()
        for (station of stations_list){
            for (reading of readings_list){
                if(reading.station_id == station.id && (station.name.slice(0,2) != "S2")){
                    // console.log(station.name)
                    // console.log(station.location.latitude + ","+station.location.longitude)
                    // console.log(reading.value)
                    if (((reading.value == 0)) && (time>7) && (time<=18)){
                    var sunny = L.marker([station.location.latitude,station.location.longitude],{icon:sunicon}).addTo(mymap)
                    sunny.bindPopup("<b>It's sunny around "+ station.name +"!</b>")
                    }
                    else if (reading.value > 0 && (time>7) && (time<=18)){
                        var rainy = L.marker([station.location.latitude,station.location.longitude],{icon:rainicon}).addTo(mymap)
                        rainy.bindPopup("<b>It's rainy around "+ station.name +"!</b>")
                    }
                    else if (reading.value == 0 && (time>=18 || time<= 7)){
                        var night = L.marker([station.location.latitude,station.location.longitude],{icon:nighticon}).addTo(mymap)
                        night.bindPopup("<b>Moon's shining bright around "+ station.name +"!</b>")
                    }
                    else if (reading.value > 0 && (time>=18 || time<= 7)){
                        var nightrain =  L.marker([station.location.latitude,station.location.longitude],{icon:nightrainicon}).addTo(mymap)
                        nightrain.bindPopup("<b>It's a rainy night around "+ station.name +"!</b>")
                    }

                }
            }  
        }  
        
    } )
    .catch(error => {
        console.log(error.message)   
    });  
    // Map Settings
    var mymap = L.map('mapid').setView([1.3521, 103.8198], 11);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic29vbmhhbyIsImEiOiJja3VqdnNtMngwbWExMm9wOHN0czJ0aGhlIn0.c7Tlc8lswiBqtTd4CLNEHw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic29vbmhhbyIsImEiOiJja3VqdnNtMngwbWExMm9wOHN0czJ0aGhlIn0.c7Tlc8lswiBqtTd4CLNEHw'
}).addTo(mymap);
var sunicon = L.icon({
    iconUrl: './covidweatherresources/sunicon.png',
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var rainicon = L.icon({
    iconUrl: './covidweatherresources/rainicon.png',
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var nighticon = L.icon({
    iconUrl: './covidweatherresources/nighticon.png',
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var nightrainicon = L.icon({
    iconUrl: './covidweatherresources/rainnight.png',
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


let one = "https://api.data.gov.sg/v1/environment/air-temperature"
let two = "https://api.data.gov.sg/v1/environment/relative-humidity"
let three = "https://api.data.gov.sg/v1/environment/wind-speed"
const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
 
axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...response) => {
  datetime = response[0].data.items[0].timestamp
  temp_stations_list = response[0].data.metadata.stations
  temp_readings_list = response[0].data.items[0].readings 
  humid_stations_list = response[1].data.metadata.stations
  humid_readings_list = response[1].data.items[0].readings  
  wind_stations_list = response[2].data.metadata.stations
  wind_readings_list = response[2].data.items[0].readings  


   for (station of temp_stations_list){
            for (reading of temp_readings_list){
                if(reading.station_id == station.id){
                    // console.log(station.name)
                    // console.log(station.location.latitude + ","+station.location.longitude)
                    // console.log(reading.value)
                    // L.marker([station.location.latitude,station.location.longitude]).addTo(mymap)
                    th = document.createElement("th") 
                    td = document.createElement("td") 
                    if (station.name == "Woodlands Avenue 9"){
                        var textname = "North"
                        node = document.createTextNode(textname)
                        th.appendChild(node)
                        node2 = document.createTextNode(reading.value)
                        td.appendChild(node2)
                        document.getElementById("rowone").appendChild(th)
                        document.getElementById("rowone").appendChild(td)
                    }
                    if (station.name == "Clementi Road"){
                        var textname = "South"
                        node = document.createTextNode(textname)
                        th.appendChild(node)
                        node2 = document.createTextNode(reading.value)
                        td.appendChild(node2)
                        document.getElementById("rowtwo").appendChild(th)
                        document.getElementById("rowtwo").appendChild(td)
                    }
                    if (station.name == "Kim Chuan Road"){
                        var textname = "East"
                        node = document.createTextNode(textname)
                        th.appendChild(node)
                        node2 = document.createTextNode(reading.value)
                        td.appendChild(node2)
                        document.getElementById("rowthree").appendChild(th)
                        document.getElementById("rowthree").appendChild(td)
                    }
                    if (station.name == "Nanyang Avenue"){
                    var textname = "West"
                        node = document.createTextNode(textname)
                        th.appendChild(node)
                        node2 = document.createTextNode(reading.value)
                        td.appendChild(node2)
                        document.getElementById("rowfour").appendChild(th)
                        document.getElementById("rowfour").appendChild(td)
                    }
                    if (station.name == "West Coast Highway"){
                        var textname = "Central"
                        node = document.createTextNode(textname)
                        th.appendChild(node)
                        node2 = document.createTextNode(reading.value)
                        td.appendChild(node2)
                        document.getElementById("rowfive").appendChild(th)
                        document.getElementById("rowfive").appendChild(td)
                    }  
                }
            }  
        }  
  

        for (station of humid_stations_list){
            for (reading of humid_readings_list){
                if(reading.station_id == station.id){
                    // console.log(station.name)
                    // console.log(station.location.latitude + ","+station.location.longitude)
                    // console.log(reading.value)
                    td = document.createElement("td") 
                    if (station.name == "Woodlands Avenue 9"){
                        node = document.createTextNode(reading.value)
                        td.appendChild(node)
                        document.getElementById("rowone").appendChild(td)
                    }
                    if (station.name == "Clementi Road"){
                        node = document.createTextNode(reading.value)
                        td.appendChild(node)
                        document.getElementById("rowtwo").appendChild(td)
                    }
                    if (station.name == "Kim Chuan Road"){
                        node = document.createTextNode(reading.value)
                        td.appendChild(node)
                        document.getElementById("rowthree").appendChild(td)
                    }
                    if (station.name == "Nanyang Avenue"){
                    node = document.createTextNode(reading.value)
                        td.appendChild(node)
                        document.getElementById("rowfour").appendChild(td)
                    }
                    if (station.name == "West Coast Highway"){
                        var textname = "Central"
                        node = document.createTextNode(reading.value)
                        td.appendChild(node)
                        document.getElementById("rowfive").appendChild(td)
                    }  
                    
                }
            }  
        }  
        for (station of wind_stations_list){
            for (reading of wind_readings_list){
                if(reading.station_id == station.id){
                    // console.log(station.name)
                    // console.log(station.location.latitude + ","+station.location.longitude)
                    // console.log(reading.value)
                    td = document.createElement("td") 
                    if (station.name == "Woodlands Avenue 9"){
                        node = document.createTextNode((Math.round(reading.value * 100)/100))
                        td.appendChild(node)
                        document.getElementById("rowone").appendChild(td)
                    }
                    if (station.name == "Clementi Road"){
                        node = document.createTextNode((Math.round(reading.value * 100)/100))
                        td.appendChild(node)
                        document.getElementById("rowtwo").appendChild(td)
                    }
                    if (station.name == "Kim Chuan Road"){
                        node = document.createTextNode((Math.round(reading.value * 100)/100))
                        td.appendChild(node)
                        document.getElementById("rowthree").appendChild(td)
                    }
                    if (station.name == "Nanyang Avenue"){
                    node = document.createTextNode((Math.round(reading.value * 100)/100))
                        td.appendChild(node)
                        document.getElementById("rowfour").appendChild(td)
                    }
                    if (station.name == "West Coast Highway"){
                        var textname = "Central"
                        node = document.createTextNode((Math.round(reading.value * 100)/100))
                        td.appendChild(node)
                        document.getElementById("rowfive").appendChild(td)
                    }  
                    
                }
            }  
        }  
})).catch(errors => {
  // react on errors.
})   



