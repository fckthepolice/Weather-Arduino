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
    humidity: 0
}

parser.on('data', data =>{
    const lines = data.split(',');

    // console.log(lines)
    const presion = lines[0]
    const temperatura = lines[1]
    const humedad = lines[2]

    dataObject.pressure = presion
    dataObject.temperature = temperatura
    dataObject.humidity = humedad

    io.emit(data)
})

setInterval( () =>{
    console.log('Presión atmosférica: ', dataObject.pressure)
    console.log('Temperatura: ', dataObject.temperature, 'C')
    console.log('Humedad: ', dataObject.humidity, '%')
}, 2000)

arduinoPort.on('error', err =>{
    console.log(err)
})

app.use(express.static('public'));
