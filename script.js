const cities = {
    2643743: "London",
    2990968: "Nantes",
    324190: "Alanya",
    706483: "Kharkiv",
    6173331: "Vancouver"
};

const wrap = document.querySelector('.wrap-city');
const select = document.createElement('select');
select.classList.add('form-select', 'mb-3');
select.id = 'city';
wrap.append(select);

function createOptoins() {
    for (key in cities) {
        const option = document.createElement('option');
        option.value = key
        option.innerHTML = cities[key];
        select.append(option);
    }

};


//функцию получение прогноза погоды
function getWeather() {
    //получаем из select id города                                  
    const cityId = document.querySelector('#city').value;
    const param = {
        "url": "https://api.openweathermap.org/data/2.5/",
        "appid": "193fcd3135d2f99601c954ab1da9c92e"
    };

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(response => response.json())
        .then(showWeather);
};


function showWeather(data) {
    let cityName = document.getElementById('city-name');
    let temp = document.getElementById('temp');
    let weather = document.getElementById('weather');
    let icon = document.getElementById('features');
    let windSpeed = document.getElementById('windSpeed');
    let windWay = document.getElementById('windWay');
    let pressure = document.getElementById('pressure');

    cityName.textContent = data.name;
    temp.innerHTML = Math.round(data.main.temp) + '&deg;';
    weather.textContent = data.weather[0]['description'];
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    windSpeed.textContent = data.wind.speed + ' Km/h';
    windWay.textContent = data.wind.deg + ' deg';
    pressure.textContent = data.main.pressure + ' hPa';
};

createOptoins();
getWeather(); //При загрузке страницы, запускаю функцию getWeather
document.querySelector('#city').onchange = getWeather; //функция запускаеться при изменении select