import weather_api_key from "./credentials.js";
async function getWeather ( city ) {
    const data = await fetch( ` https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ weather_api_key }&units=metric` )
        .then( response => {
            // console.log(response.json());
            return response.json();
        } ).catch( error => {
            console.log( 'Error at our side:', error );
        } );
    return data;
}
export default getWeather;