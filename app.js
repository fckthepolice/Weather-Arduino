import express from 'express';
import { SerialPort } from 'serialport';

const app = express();
const port = 3000;

const arduinoPort = new SerialPort({ path: 'COM3', baudRate: 9600 }) 

arduinoPort.on('open', () =>{
    console.log('Conexión con arduino establecida')
})

arduinoPort.on('data', (data) =>{
    const dataString = data.toString().trim(',')

    //Procesar los datos enviados por arduino
    const [presion, temperatura, humedad] = dataString.split(',');
    console.log('Presión atmosférica:', presion, 'Pa');
    console.log('Temperatura:', temperatura, '°C');
    console.log('Humedad:', humedad, '%');
})

app.use(express.static('public'));

app.listen(port, () =>{
    console.log(`Servidor inicializado en http://localhost:${port}`);
});

// app.get('/verificarPlaca', (req, res) =>{
//     const arduinoConectado = arduino.isOpen;
//     res.json({arduinoConectado});
// })

// app.post('/encender' ,(req, res) =>{
//     arduino.write('1')
//     res.send('Encendido')
// })

// app.post('/apagar' ,(req, res) =>{
//     arduino.write('0')
//     res.send('Apagado')
// })


// Otra prueba
// app.get('/data', (req, res) => {
//     let receivedData = '';

//     arduinoPort.on('data', (data) => {
//         receivedData = data.toString().trim();
//     });

//     setTimeout(() => {
//         const [presion, temperatura, humedad] = receivedData.split(',');
//         const data = {
//             presion,
//             temperatura,
//             humedad
//         };
//         res.json(data);
//     }, 1000); // Esperar un segundo para asegurarse de que los datos se hayan recibido completamente
// });