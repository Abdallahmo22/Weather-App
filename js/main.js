//! today Data
let btnSearch = document.getElementById('search');
let todayName = document.getElementById('today_name_day')
let todayMonth = document.getElementById('today_name_months')
let nameLocation = document.getElementById('today_name_location')
let todayTemp = document.getElementById('today_num_temp');
let textTemp = document.getElementById('text_temp');
let todayConditionImg = document.getElementById('today_condition_img');
let umbrella = document.getElementById('umbrella');
let wind = document.getElementById('wind');
let wind_dir = document.getElementById('wind_dir');
let dateObj = new Date();

//! next data 
let nextDay = document.getElementsByClassName('nextDay')
let nextDay_temp = document.getElementsByClassName('nextDay_temp')
let small_nextDay_temp = document.getElementsByClassName('small_temp_nextDay')
let nextDay_condition = document.getElementsByClassName('nextDay_condition')
let tomorrow_condition_img = document.getElementsByClassName('tomorrow_condition_img')





// get api data of weather 
async function getWeatherDataApi(cityName){
    let https = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=45ac264e6b594023b8842629231308&q=${cityName}&days=3`);
    let response = await https.json()
    return response;
}

// display today data 
function displayTodayData(data) {
    
    todayName.innerHTML = dateObj.toLocaleDateString('en-US' ,{weekday:"long"});
    todayMonth.innerHTML = dateObj.getDate() + dateObj.toLocaleDateString('en-US', {month:'long'})
    nameLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c; 
    textTemp.innerHTML = data.current.condition.text;
    todayConditionImg.setAttribute("src",`https:${data.current.condition.icon}`);
    umbrella.innerHTML = data.current.humidity+'%';
    wind.innerHTML = data.current.wind_kph+"km/h";
    wind_dir.innerHTML = data.current.wind_dir;

}


// display next data 
function displayNextData(data){
    let forecastData = data.forecast.forecastday;
   
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString('en-US', {weekday:'long'})
        nextDay_temp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        small_nextDay_temp[i].innerHTML = forecastData[i+1].day.mintemp_c
        tomorrow_condition_img[i].setAttribute('src' , `https:${forecastData[i+1].day.condition.icon}`) 
        nextDay_condition[i].innerHTML = forecastData[i+1].day.condition.text
    }
    
}



// start App 
async function startApp(city='Cairo'){
    let weatherData = await getWeatherDataApi(city);
    if(!weatherData.error)
    {
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }
    
}
startApp();


//! ========================> search
btnSearch.addEventListener('input', function()
{
    if(btnSearch.value.length >= 3){
        startApp(btnSearch.value)
    }
})