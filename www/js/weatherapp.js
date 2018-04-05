var xmlhttp;
var weatherURL;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
};

function init() {  
    var location = "lethbridge";
    
    weatherURL = 
    "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
    
    // ADD YOUR CODE HERE

    $("#submit").on("click", function() {
        console.log("city updated"); 
        var location = $("input[name=city]").val();
        $("#current-city").text(location);

    weatherURL = 
    "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
    });
}

function weather() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', weatherURL, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeather;
}

function getWeather() { // when readystate changes
        
    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var json = JSON.parse(xmlhttp.responseText);

        function Forcast(Temp, Descrip, Wind, Max, Min, Humid) {          
            this.temp = Temp;
            this.descrip = Descrip;
            this.wind = Wind;
            this.max = Max;
            this.min = Min;
            this.humid = Humid;
            document.getElementById("temp").innerHTML = Math.round(this.temp) + '&deg;C';
            document.getElementById("description").innerHTML = this.descrip;
            document.getElementById("mintemp").innerHTML = this.min  + '&deg;C';
            document.getElementById("maxtemp").innerHTML = this.max  + '&deg;C';
            document.getElementById("wind").innerHTML = this.wind  + 'km/h';
            document.getElementById("humidity").innerHTML = this.humid + '&#37;';
        }

        var current = new Forcast(json.list[0].main.temp, json.list[0].weather[0].description, json.list[0].wind.speed, json.list[0].main.temp_max, json.list[0].main.temp_min, json.list[0].main.humidity );

        console.log("all info received from server");

    } else {
        console.log("no dice");
    }
}