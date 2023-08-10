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
const arduinoPort = new SerialPort({ path: 'COM4', baudRate: 9600 }) 

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

app.use(express.static('public'));
