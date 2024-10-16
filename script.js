'use strict';

const searchInput = document.querySelector(".input-city");
const searchBtn = document.querySelector(".search-btn");

const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity-text");
const humidityValue = document.querySelector(".humidity-value");
const windSpeed = document.querySelector(".wind-speed-text");
const windSpeedValue = document.querySelector(".wind-speed-value");
const kilo = document.querySelector(".kilo");
const weatherIcon = document.querySelector(".weather-condition-image");
const weatherGenCta = document.querySelector(".weather-general-info-container");
const country = document.querySelector(".country");
const errorMessage = document.querySelector(".error-message");

const apiKey = "a7850964864e4e3782cf24315d96ec46";
const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//ASNYC FUNCTION

const getWeatherData = async function (city) {
    try {
        //This retrieves the data from the server, and then stores it in the response variable
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        
        //Checking if the response gotten from the server is successful or not
        if(!response.ok){
            throw new Error('City not found');
        }
        
        const data = await response.json();//Converts the response to a javascript readable format, then stores it in the variable data

        console.log(data);

         
        //UpdateUI
        cityName.textContent = data.name;
        temp.textContent = Math.round(data.main.temp) + `°C`;
        humidityValue.textContent = data.main.humidity + '%';
        windSpeedValue.textContent = data.wind.speed + ' km/h';
        country.textContent = data.sys?.country ?? 'Country not found';

        //Checking different weather conditions
        switch (data.weather[0].main) {
            case 'Clear':
                weatherIcon.src = "clear.svg";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;  
                searchInput.value = '';
                break;

            case 'Rain':
                weatherIcon.src = "weather-images/icons8-rain-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1; 
                searchInput.value = '';
                break;

            case 'Snow':
                weatherIcon.src = "weather-images/icons8-snow-100.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;  
                searchInput.value = '';
                break;

            case 'Drizzle':
                weatherIcon.src = "weather-images/icons8-Drizzle-80.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;  
                searchInput.value = '';
                break;  
                
            case 'Clouds':
                weatherIcon.src = "weather-images/icons8-cloud-100.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;  
                searchInput.value = '';
                break; 

            case 'Fog':
                weatherIcon.src = "weather-images/icons8-fog-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;

            case 'Sun':
                weatherIcon.src = "weather-images/icons8-sun-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;    
                
            case 'Haze':
                weatherIcon.src = "weather-images/icons8-haze-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1; 
                searchInput.value = '';
                break; 

            case 'Thunderstorm':
                weatherIcon.src = "weather-images/thunderstorm-rain-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;  

            case 'Tornado':
                weatherIcon.src = "weather-images/icons8-tornado-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1; 
                searchInput.value = '';
                break; 

            case 'Humidity':
                weatherIcon.src = "weather-images/icons8-humidity-64.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;   
                
            case 'Lightning':
                weatherIcon.src = "weather-images/icons8-lightning-96.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;  
            case 'Storm':
                weatherIcon.src = "weather-images/storm.png";
                errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
                searchInput.value = '';
                break;
            default:
                weatherIcon.src = "clear.svg";
				errorMessage.style.opacity = 0;
                weatherGenCta.style.opacity = 1;
				searchInput.value = "";
                break;
        }

    }
    catch (error){
       errorMessage.style.opacity = 1;
       weatherGenCta.style.opacity = 0;
       searchInput.value = '';
    };
};




searchInput.addEventListener('click', (e) => {
   
    //Retrieving the user's input from the input field
   const city = searchInput.value.trim() !== '';
   

   if(e.key === 'Enter' && city !== ''){
      e.preventDefault();//Prevents from default submission
       getWeatherData(city);
       errorMessage.style.opacity = 0;
    }
    else{
        weatherGenCta.style.opacity = 0;
    }
});




searchBtn.addEventListener('click', (e) => {
	e.preventDefault(); //Prevents from default submission

	if (searchInput.value.trim() !== "") {
		getWeatherData(searchInput.value.trim());
		errorMessage.style.opacity = 0;
	} else {
		weatherGenCta.style.opacity = 0;
	}
});