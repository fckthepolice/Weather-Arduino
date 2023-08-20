## Estación meteorológica con Arduino
En este proyecto se realiza una estación meteorológica con Arduino, la cual es capaz de leer:
<ul>
  <li>Temperatura</li>
  <li>Presión atmosférica</li>
  <li>Humedad</li>
  <li>Dirección del viento</li>
  <li>Velocidad del viento</li>
</ul>

## ¿De que manera es capaz de obtener estos datos?

<ul>
  <li>Temperatura y humedad: <a href="https://www.hwlibre.com/dht11/">DHT11</a> </li>
  <li>Presión atmosférica: <a href="https://store.prometec.net/producto/sensor-bmp280-temp-presion-altitud/">BMP280</a> </li>
</ul>

## ¿Cómo se envian los datos de arduino al servidor?
Los datos se estan enviando a través de <a href="https://www.npmjs.com/package/socket.io">sockets</a> y <a href="https://www.npmjs.com/package/serialport">Puertos seriales</a>, los datos son recibidos en el servidor y se almacenan en un objeto de JS, el cuál se va actualizando cada 1s.

## ¿Que depencias se estan utilizando?
