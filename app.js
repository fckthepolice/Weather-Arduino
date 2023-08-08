import express from 'express';
import { SerialPort } from 'serialport';

const app = express();
const port = 3000;

const arduino = new SerialPort({ path: 'COM3', baudRate: 9600 }, err =>{
    if(err){
        console.log('Error al abir el puerto serial: ', err);
    }else{
        console.log('Conectado al Arduino en el puerto COM3');
    }
});

app.get('/verificarPlaca', (req, res) =>{
    const arduinoConectado = arduino.isOpen;
    res.json({arduinoConectado});
})

app.use(express.static('public'));

app.post('/encender' ,(req, res) =>{
    arduino.write('1')
    res.send('Encendido')
})

app.post('/apagar' ,(req, res) =>{
    arduino.write('0')
    res.send('Apagado')
})

app.listen(port, () =>{
    console.log(`Servidor inicializado en http://localhost:${port}`);
});