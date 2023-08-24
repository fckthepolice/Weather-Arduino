const API_KEY = 'fa1550bb629b138ba6e49e79c35e768b'
const lat = -34.71390790258611
const lon = -58.38588611640439

const socket = io();

const fetchData = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=10`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const {city:{name: localidad}} = data
            document.getElementById('localidad').textContent = `${localidad}`
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
