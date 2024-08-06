import getWeather from './weatherAPI.js';
const getWeatherBtn = document.getElementById( 'getWeather' );
const weatherInfo = document.getElementById( 'weatherInfo' );
const errorMessage = document.getElementById( 'errorMessage' );
const cityInput = document.getElementById( 'city' );
const weatherDescription = document.getElementById( 'weatherDescription' );
const temperature = document.getElementById( 'temperature' );
const humidity = document.getElementById( 'humidity' );
const timezone = document.getElementById( 'timezone' );
const cityName = document.getElementById( 'cityName' );
const clouds = document.getElementById( 'clouds' );
const wind = document.getElementById( 'wind' );
const sunsight = document.getElementById( 'sunsight' );
const rain = document.getElementById( 'rain' );
const weatherDiv = document.getElementById( 'weather' );
const forecast = document.createElement( 'p' );
forecast.id = 'forecast';

function displayWeather ( weatherData ) {
    weatherDescription.innerHTML = `Weather : ${ weatherData.weather[ 0 ].main }<br>
    Weather Description: ${ weatherData.weather[ 0 ].description }`;
    temperature.innerHTML = `Temperature : ${ weatherData.main.temp }°C`;
    clouds.textContent = `Clouds : ${ weatherData.clouds.all }%`;
    humidity.textContent = `Humidity: ${ weatherData.main.humidity }%`;
    wind.textContent = `Wind : ${ weatherData.wind.speed }m/s`;
    cityName.textContent = `City : ${ weatherData.name }, ${ weatherData.sys.country }`;
    timezone.textContent = `Timezone : ${ new Date( weatherData.timezone * 1000 ).toString() }`;
    sunsight.innerHTML = `Sunrise : ${ new Date( weatherData.sys.sunrise * 1000 ).toString() }<br>
    Sunset : ${ new Date( weatherData.sys.sunset * 1000 ).toString() }`;
    forecast.textContent = `Forecast : ${ new Date( weatherData.dt * 1000 ).toString() }`;
    rain.textContent = `Rain : ${ weatherData.hasOwnProperty( 'rain' ) ? weatherData.rain[ '1h' ] + 'mm' : 'No Rain' }`
    weatherInfo.appendChild( forecast );
}


cityInput.addEventListener( 'click', () => {
    weatherDiv.classList.add( 'hidden' );
} )
getWeatherBtn.addEventListener( 'click', async () => {
    const weatherData = ( Boolean( cityInput.value ) ) ? await getWeather( cityInput.value ) : '';
    console.log( weatherData );
    if ( weatherData.cod == 200 ) {
        displayWeather( weatherData );
        
        weatherDiv.contains( errorMessage ) ? weatherDiv.removeChild( errorMessage ) : '';
        weatherDiv.appendChild( weatherInfo );
        weatherDiv.classList.remove( 'hidden' );
        weatherDiv.style.backgroundImage = `url(../pictures/${ weatherData.weather[ 0 ].main.toLowerCase() }.png)`;
    }
    if ( weatherData.cod == 404 ) {
        errorMessage.textContent = 'City Not Found';
        weatherDiv.contains( weatherInfo ) ? weather.removeChild( weatherInfo ) : '';
        weatherDiv.style.removeProperty( 'backgroundImage' )
        weatherDiv.appendChild( errorMessage );
        weatherDiv.classList.remove( 'hidden' );
    }

    if ( weatherData === '' ) {
        errorMessage.textContent = 'Please Enter City Name';
        weatherDiv.contains( weatherInfo ) ? weatherDiv.removeChild( weatherInfo ) : '';
        weatherDiv.style.removeProperty( "backgroundImage" )
        weatherDiv.appendChild( errorMessage );
        weatherDiv.classList.remove( 'hidden' );
    }
} )

window.addEventListener( 'keydown', async ( e ) => {
    const keyEvent = e.key;
    const weatherData = ( Boolean( cityInput.value && keyEvent==='Enter' ) ) ? await getWeather( cityInput.value ) : '';
    console.log( weatherData );
    if ( weatherData.cod == 200  ) {
        displayWeather( weatherData );
        weatherDiv.contains( errorMessage ) ? weatherDiv.removeChild( errorMessage ) : '';
        weatherDiv.appendChild( weatherInfo );
        weatherDiv.classList.remove( 'hidden' );
        weatherDiv.style.backgroundImage = `url(../pictures/${ weatherData.weather[ 0 ].main.toLowerCase() }.png)`;
    }
    if ( weatherData.cod == 404 ) {
        errorMessage.textContent = 'City Not Found';
        weatherDiv.contains( weatherInfo ) ? weather.removeChild( weatherInfo ) : '';
        weatherDiv.style.removeProperty( 'backgroundImage' )
        weatherDiv.appendChild( errorMessage );
        weatherDiv.classList.remove( 'hidden' );
    }

    if ( weatherData === '' && keyEvent==='Enter' ) {
        errorMessage.textContent = 'Please Enter City Name';
        weatherDiv.style.removeProperty( "backgroundImage" )
        weatherDiv.appendChild( errorMessage );
        weatherDiv.contains( weatherInfo ) ? weatherDiv.removeChild( weatherInfo ) : '';
        weatherDiv.classList.remove( 'hidden' );
    }
} )

