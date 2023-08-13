const API_KEY = '11c16b180032404eb6f65915231308'
const lat = -34.71390790258611
const lon = -58.38588611640439

const socket = io();

const fetchData = () =>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=yes&lang=es`)
        .then(response => response.json())
        .then(data => {
            const {current:{condition:{text: info_clima }}} = data
            const {location:{country: pais, name: ciudad, region: provincia}} = data
            document.getElementById('clima').textContent = `${info_clima}`
            document.getElementById('localidad').textContent = `${pais}, ${provincia}, ${ciudad}`
        })
}
fetchData()

socket.on('data', data => {
    const { pressure, temperature, humidity, date } = data;
    document.getElementById('hpa').textContent = `Presión atmosférica: ${pressure} hPa`;
    document.getElementById('temperature').textContent = temperature, 'C'
    document.getElementById('humidity').textContent = `Humedad: ${humidity}%`
    document.getElementById('date').textContent = `${date}`
});