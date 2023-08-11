const socket = io();

socket.on('data', data => {
    const { pressure, temperature, humidity, date } = data;
    document.getElementById('hpa').textContent = `Presión atmosférica: ${pressure} hPa`;
    document.getElementById('temperature').textContent = temperature, 'C'
    document.getElementById('humidity').textContent = `Humedad: ${humidity}%`
    document.getElementById('date').textContent = `${date}`
});