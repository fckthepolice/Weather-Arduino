//asd
import http from 'node:http'
import express from 'express';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'
import { Server as SocketServer } from 'socket.io';

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)
const port = 3000

server.listen(port, () =>{
    console.log(`Servidor inicializado en http://localhost:${port}`)
})

//COMUNICACION SERIAL
const arduinoPort = new SerialPort({ path: 'COM5', baudRate: 9600 }) 

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '/' }))

parser.on('open', () =>{
    console.log('Conexión con arduino establecida')
})

const dataObject = {
    pressure: 0,
    temperature: 0,
    humidity: 0,
    date: ''
}

parser.on('data', data =>{
    const lines = data.split(',');

    const presion = lines[0]
    const temperatura = lines[1]
    const humedad = lines[2]
    
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentDate = new Date();
    const fechaFormateada = currentDate.toLocaleDateString('es-ES', opciones);


    dataObject.pressure = presion
    dataObject.temperature = temperatura
    dataObject.humidity = humedad
    dataObject.date = fechaFormateada;

    io.emit('data', dataObject);
})

arduinoPort.on('error', err =>{
    console.log(err)
})

app.use(express.static('public'));
