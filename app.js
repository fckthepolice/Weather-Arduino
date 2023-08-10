import http from 'node:http'
import express from 'express';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'
import { Socket } from 'socket.io';

const app = express()
const server = http.createServer(app)
const io = Socket.listen(server)

server.listen(3000, () =>{
    console.log('Servidor escuchando en puerto:', 3000)
})


//COMUNICACION SERIAL
const arduinoPort = new SerialPort({ path: 'COM3', baudRate: 9600 }) 

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('open', () =>{
    console.log('Conexión con arduino establecida')
})

parser.on('data', data =>{
    console.log(data)
    io.emit(data)
})

arduinoPort.on('error', err =>{
    console.log(err)
})

app.use(express.static(__dirname + '/public'));
