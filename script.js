const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#input');
const fetchButton = document.querySelector('#search-button');
const historyResults = document.querySelector('#history');
const todayResults = document.querySelector('#today-results');
const forecastResults = document.querySelector('#forecast');


const weatherApiUrl = 'https://api.openweathermap.org';
const weatherApiKey = '07bc448bc60a7659ade54c0e0e3fc438';
let history = [];

dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)



function getApi(search) {
    search.preventDefault();
    const cityName = searchInput.value;
    console.log(cityName)
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=07bc448bc60a7659ade54c0e0e3fc438`

    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (object) {
            console.log(object);
            displayWeather(object)
            appendToHistory(search)
        })
}

fetchButton.addEventListener('click', getApi);


function displayWeather(object) {
    for (object of objects) {
    const date = dayjs().format('M/D/YYYY')
    const temperature = object.main.temp;
    const humidity = object.main.humidity;
    const windSpeed = object.wind.speed;


    const header = document.createElement('h2')
    const card = document.createElement('div')
    const cardBody = document.createElement('div')
    const tempEl = document.createElement('p')
    const humidityEl = document.createElement('p')
    const windEl = document.createElement('p')

    card.setAttribute('class', 'card')
    cardBody.setAttribute('class', 'card-body')
    card.append(cardBody)

    header.setAttribute('class', 'h3 card-title')
    tempEl.setAttribute('class', 'card-text')
    humidityEl.setAttribute('class', 'card-text')
    windEl.setAttribute('class', 'card-text')

    header.textContent = `${city} (${date})`

    tempEl.textContent = `Temp: ${tempF}`
    humidityEl.textContent = `Humidity: ${humidity}`
    windEl.textContent = `wind: ${windMph}`
    cardBody.append(header, tempEl, humidityEl, windEl)

    todayResults.innerHTML = " "
    todayResults.append(card)
}
}



function renderForecast(forecast) {
    const tempF = object.main.temp;
    console.log(tempF)
    const windMph = object.wind.speed;
    console.log(windMph)
    const humidity = object.main.humidity;
    console.log(humidity)

    const column = document.createElement('div')
    const card = document.createElement('div')
    const cardBody = document.createElement('div')
    const cardTitle = document.createElement('h3')
    const tempEl = document.createElement('p')
    const windEl = document.createElement('p')
    const humidityEl = document.createElement('p')

    column.append(card)
    card.append(cardBody)
    cardBody.append(cardTitle, tempEl, windEl, humidityEl)

    column.setAttribute('class', 'col-md')
    column.classList.add('five-day')
    card.setAttribute('class', 'card-info')
    cardBody.setAttribute('class', 'card-body-2')
    cardTitle.setAttribute('class', 'card-title')
    windEl.setAttribute('class', 'card-text')
    tempEl.setAttribute('class', 'card-text')
    humidityEl.setAttribute('class', 'card-text')


    cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY')
    windEl.textContent = `wind: ${windMph} MPH`;
    tempEl.textContent = `Temp: ${tempF} F`;
    humidityEl.textContent = `Humidity: ${humidity} %`;

    forecatContainer.append(column)
}




function renderForecastDaily(dailyForecast) {
    const firstDay = dayjs().add(1, 'day').startOf('day').unix();
    const lastDay = dayjs().add(5, 'day').startOf('day').unix();

    const headingDay = document.createElement('div');
    const headingMain = document.createElement('h3');

    headingDay.setAttribute('class', 'heading-day');
    headingMain.textContent = '5-Day Weather Forecast: ';
    headingDay.append(headingMain);

    forecastContainer.innerHTML = " ";
    forecastContainer.append(headingDay);


    for (let i = 0; i < dailyForecast.length; i++) {
        if (dailyForecast[i].dt >= firstDay && dailyForecast[i].dt < lastDay) {
            if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
                renderForecast(dailyForecast[i]);
            }
        }
    }

}





function renderHistory() {
    historyResults.innerHTML = " ";

    for (let i = searchHistory.length - 1; i >= 0; i--) {
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button')
        btn.classList.add('history-btn', 'btn-history')
        btn.setAttribute('aria-controls', 'today forecast')

        btn.setAttribute('data-search', searchHistory[i])
        btn.textContent = searchHistory[i]
        historyResults.append(btn)
    }
}

function appendToHistory(search) {
    if (searchHistory.indexof(search) !== -1) {
        return;
    }
    searchHistory.push(search);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderHistory();
}


function getSearchHistory() {
    const savedHistory = localStorage.getItem('search-history')
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
    }
    renderHistory();
}
