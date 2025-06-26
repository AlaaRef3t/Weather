"use strict"

// VARIABLES
let apiKey = "2b3202b068b44b88942160927252206";
let searchInput = document.querySelector("#searchInput");
let submitBtn = document.querySelector("#submitBtn");
let weatherInner = document.querySelector(".weather-inner")
let globalSearch = "";


// Function to get Weather from WeatherApi
async function getWeather(cityName) {
    try {
        var result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`);
        var final = await result.json();
        console.log(final);

        displayWeather(final);
    } catch (error) {
        weatherInner.innerHTML = `<p class="alert alert-danger "> Failed To Fetch , please enter a valid data </p>`
    }


}

// Function to display Weather i got from getWeather function
function displayWeather(apiData) {

    function getDayName(theDAy) {
        let date = new Date(theDAy);
        return date.toLocaleDateString("en-US", { weekday: "long" })
    }
    function getMonthName(theMonth) {
        let date = new Date(theMonth);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    }



    let forecastDays = apiData.forecast.forecastday;
    let current = apiData.current;
    let day1Data = forecastDays[0];
    let day2Data = forecastDays[1];
    let day3Data = forecastDays[2];

    let data = `
    
        <div class="today-weather col-md-12 col-lg-4 ">
            <div class="header d-flex justify-content-between align-items-center">
                <p class="day1 mb-0">${getDayName(day1Data.date)}</p>
                <p  class="date mb-0">${getMonthName(day1Data.date)}</p>
            </div>
            <div class="day-content">
                <p  class="city">${apiData.location.name}</p>
                <div class="degree d-flex flex-column ">
                    <h1  class="number1">
                        ${current.temp_c}°C
                    </h1>
                    <div class="day-icon mb-4">
                        <img  class="w-25 mx-3" src="https:${current.condition.icon}" alt="">
                    </div>
                    <p  class="day-status1">${current.condition.text}</p>
                    <div class="icons d-flex gap-4">
                        <span ><img src="images/icon-umberella@2x.png" alt=""> ${day1Data.day.daily_chance_of_rain}%</span>
                        <span ><img src="images/icon-compass@2x.png" alt=""> ${current.wind_dir}</span>
                        <span ><img src="images/icon-wind@2x.png" alt=""> ${current.wind_kph}k/h</span>
                    </div>
                </div>
            </div>
        </div>


        
        <div class="today-weather col-md-12 col-lg-4 ">
            <div class="header text-center">
                <p class=" mb-0">${getDayName(day2Data.date)}</p>
            </div>
            <div class="day-content  mt-5">
                <p class="other-day-icon text-center">
                    <img  src="https:${day2Data.day.condition.icon}" alt="">
                </p>
                <div class="degree text-center ">
                    <h2  class="number2 fs-3">
                        ${day2Data.day.maxtemp_c}°C
                    </h2>
                    <small >${day2Data.day.mintemp_c}°C</small>
                </div>
                <p id="status2" class="day-status2 text-center">${day2Data.day.condition.text}</p>
            </div>
        </div>

        <div class="today-weather col-md-12 col-lg-4 ">
            <div class="header text-center">
                <p  class="day3 mb-0">${getDayName(day3Data.date)}</p>
            </div>
            <div class="day-content mt-5">
                <p class="other-day-icon text-center">
                    <img  src="https:${day3Data.day.condition.icon}" alt="">
                </p>
                <div class="degree text-center ">
                    <h2 id="temp3" class="number3 fs-3">
                        ${day3Data.day.maxtemp_c}°C
                    </h2>
                    <small >${day3Data.day.mintemp_c}°C</small>
                </div>
                <p id="status3" class="day-status3 text-center">${day3Data.day.condition.text}</p>
            </div>
        </div>
    `;

    weatherInner.innerHTML = data;
}


// to set default location but i prefer to get the user location so i wrote 2 ways

let StaticTown = "31.2001,29.9187"
getWeather(StaticTown);


// to get user location 

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (loc) {
            let lat = loc.coords.latitude;
            let lon = loc.coords.longitude;
            let coords = lat + "," + lon;
            getWeather(coords);
        });
    }
})




// Event when user search
searchInput.addEventListener("input", function () {
    globalSearch = searchInput.value.trim();
    if (globalSearch.length > 2) {
        getWeather(globalSearch);

    }
    console.log(globalSearch);
})




