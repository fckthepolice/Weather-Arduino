const API_KEY = 'fa1550bb629b138ba6e49e79c35e768b'
const lat = -34.71390790258611
const lon = -58.38588611640439
const formatearHora = (n) =>{
    const eliminarFecha = n.slice(10, n.length - 3);
    return eliminarFecha
}
const formatearFecha = (n) =>{
    const eliminarHora = n.slice(5, n.length-9)
    return eliminarHora
}
const capitalizarPalabras = (n) =>{
    const result = n.charAt(0).toUpperCase() + n.slice(1);
    return result
}

const socket = io();

const fetchData = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=33&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const {city:{name: localidad}} = data
            const {list} = data
            document.querySelector('.location').textContent = `${localidad}`

            //DATOS DE TEMPERATURA
            document.querySelector('.c-temperature').textContent = `${parseInt(list[0].main.temp)}°C`
            document.querySelector('.f-temp-01').textContent = `${parseInt(list[0].main.temp)}°C`
            document.querySelector('.f-time-01').textContent = `${formatearHora(list[0].dt_txt)}`
            document.querySelector('.f-day-01').textContent = `${formatearFecha(list[0].dt_txt)}`
            document.querySelector('.f-temp-02').textContent = `${parseInt(list[1].main.temp)}°C`
            document.querySelector('.f-time-02').textContent = `${formatearHora(list[1].dt_txt)}`
            document.querySelector('.f-day-02').textContent = `${formatearFecha(list[1].dt_txt)}`
            document.querySelector('.f-temp-03').textContent = `${parseInt(list[2].main.temp)}°C`
            document.querySelector('.f-time-03').textContent = `${formatearHora(list[2].dt_txt)}`
            document.querySelector('.f-day-03').textContent = `${formatearFecha(list[2].dt_txt)}`
            document.querySelector('.f-temp-04').textContent = `${parseInt(list[3].main.temp)}°C`
            document.querySelector('.f-time-04').textContent = `${formatearHora(list[3].dt_txt)}`
            document.querySelector('.f-day-04').textContent = `${formatearFecha(list[3].dt_txt)}`
            document.querySelector('.f-temp-05').textContent = `${parseInt(list[4].main.temp)}°C`
            document.querySelector('.f-time-05').textContent = `${formatearHora(list[4].dt_txt)}`
            document.querySelector('.f-day-05').textContent = `${formatearFecha(list[4].dt_txt)}`
            document.querySelector('.f-temp-06').textContent = `${parseInt(list[5].main.temp)}°C`
            document.querySelector('.f-time-06').textContent = `${formatearHora(list[5].dt_txt)}`
            document.querySelector('.f-day-06').textContent = `${formatearFecha(list[5].dt_txt)}`
            document.querySelector('.f-temp-07').textContent = `${parseInt(list[6].main.temp)}°C`
            document.querySelector('.f-time-07').textContent = `${formatearHora(list[6].dt_txt)}`
            document.querySelector('.f-day-07').textContent = `${formatearFecha(list[6].dt_txt)}`

            //INFORMACION
            document.querySelector('.info-day__day').textContent = `${capitalizarPalabras(list[0].weather[0].description)}`
            document.querySelector('.f-d-t-01').textContent = `${formatearFecha(list[0].dt_txt)}`
            document.querySelector('.f-d-i-01').textContent = `${capitalizarPalabras(list[0].weather[0].description)}`
            document.querySelector('.f-d-t-02').textContent = `${formatearFecha(list[8].dt_txt)}`
            document.querySelector('.f-d-i-02').textContent = `${capitalizarPalabras(list[8].weather[0].description)}`
            document.querySelector('.f-d-t-03').textContent = `${formatearFecha(list[16].dt_txt)}`
            document.querySelector('.f-d-i-03').textContent = `${capitalizarPalabras(list[16].weather[0].description)}`
            document.querySelector('.f-d-t-04').textContent = `${formatearFecha(list[24].dt_txt)}`
            document.querySelector('.f-d-i-04').textContent = `${capitalizarPalabras(list[24].weather[0].description)}`
            document.querySelector('.f-d-t-05').textContent = `${formatearFecha(list[32].dt_txt)}`
            document.querySelector('.f-d-i-05').textContent = `${capitalizarPalabras(list[32].weather[0].description)}`
        })
}
fetchData()

socket.on('data', data => {
    const { pressure, temperature, humidity, date } = data;
    const realTemp = parseInt(temperature)
    document.getElementById('hpa').textContent = `Presión atmosférica: ${pressure} hPa`;
    document.getElementById('temperature').textContent = `${realTemp}°C`
    document.getElementById('humidity').textContent = `Humedad: ${humidity}%`
    document.getElementById('date').textContent = `${date}`
});
