let allCity = [];
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const listContainer = document.getElementById('list-container');

const loadCountryData = async () => {
	const url = 'https://restcountries.com/v3.1/all';
	const response = await fetch(url);
	const data = await response.json();
	loadCityName(data);
};

const loadCityName = (allCountry) => {
	const allCityName = allCountry.map((country) => country?.capital);
	allCity = allCityName.filter((city) => city);
};

searchBtn.addEventListener('click', () => {
    loadWeatherData(searchField.value.toLowerCase());
    searchField.value = '';
    listContainer.textContent = '';
});
const loadWeatherData = async (city) => {
	const API_KEY = '6b7e99002707566efd190af318e9040d';
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
		const response = await fetch(url);
		const data = await response.json();
		displayWeatherData(data);
	}
	catch {
		alert(`${city} - doesn't exit in the world`)
	}
};
const displayWeatherData = (data) => {
	const { main, weather, name } = data;
	document.getElementById('city-name').innerText = name;
	document.getElementById('display-temp').innerText = main.temp;
	document.getElementById('lead').innerText = weather[0].main;
    document
        .getElementById('icon')
        .setAttribute('src', `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
};

searchField.addEventListener('keyup', (event) => {
	const value = event.target.value;
	const matchedCity = allCity.filter((city) =>
		city[0].toLowerCase().includes(value)
    );
	displaySearchedCity(matchedCity);
    if (event.key === 'Enter') {
        listContainer.textContent = '';
        loadWeatherData(event.target.value);
        searchField.value = ''
    }
});

const displaySearchedCity = (matchedCity) => {
	const firstFiveCity = matchedCity.splice(0, 5);
	listContainer.textContent = '';
	if (searchField.value.length > 0) {
		firstFiveCity.forEach((city) => {
			const list = document.createElement('li');
			list.classList.add('list-group-item', 'list-transparent');
			list.innerText = city[0];
			list.addEventListener('click', setTextSearchField);
			listContainer.appendChild(list);
		});
    }
};
const setTextSearchField = (event) => {
	searchField.value = event.target.innerText;
    listContainer.textContent = '';
    loadWeatherData(event.target.innerText.toLowerCase())
    searchField.value = '';
};
loadWeatherData('montevideo');
loadCountryData();
