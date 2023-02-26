let weather = {
    apiKey: "0b508b5bf0ebfe0490c4bef39eb231b3",
    fetchWeather: function (city) { //conecting to openweather API, and retrieving/displaying weather data
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid=" 
             + this.apiKey
          )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    //function for displaying weather information on web page
    displayWeather: function(data) {
       const { name } = data;
       const { icon, description } = data.weather[0];  //destructures the icon and description properties in the weather array 
       const { temp, humidity } = data.main;
       const { speed } = data.wind;
       document.querySelector(".city").innerText = "Weather in " + name; //sets the text of the element with class "city" to "Weather in " + name
       document.querySelector(".icon").src =  
       "https://openweathermap.org/img/wn/" + icon + ".png"; //sets the "src" attribute with class "icon" to a URL of weather icons
       //description, temperature, humidity, wind doc elements returned 
       document.querySelector(".description").innerText = description;
       document.querySelector(".temp").innerText = temp + "°C";
       document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
       //removing load class from weather element to hide loading message
       document.querySelector(".weather").classList.remove("load");
       //background image of app changes depending on name of location entered
       document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; 

      //search method defined for when a user searches for location's weather
      //selects search bar element using querySelector
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

//user can search by pressing the search button
    document
    .querySelector(".search button")
    .addEventListener("click", function( ) {
        weather.search();
    });

//user can search by clicking enter key after typing location
    document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    })

//initial loaded weather data for london
weather.fetchWeather("London"); //loads initial data for London when the user enters the site