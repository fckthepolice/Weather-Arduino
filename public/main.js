const encenderBtn = document.getElementById('encender');
const apagarBtn = document.getElementById('apagar');
const imagenPlaca = document.getElementById('imagen-placa');
const textoPlaca = document.getElementById('texto-placa');

encenderBtn.addEventListener('click', () =>{
    verificarPlacaArduino(() =>{
        fetch('/encender', { method: 'POST' })
            .then(() => mostrarEstadoPlaca(true))
            .catch(error => console.error('Error al encender el LED: ', error));
    });
});

apagarBtn.addEventListener('click', () =>{
    verificarPlacaArduino(() =>{
        fetch('/apagar', { method: 'POST' })
            .then(() => mostrarEstadoPlaca(false))
            .catch(error => console.error('Error al apagar el LED: ', error));
    });
});

function verificarPlacaArduino(callback){
    fetch('/verificarPlaca')
        .then(response => response.json())
        .then(data =>{
            if(data.arduinoConectado){
                callback();
            }else{
                console.log('No se encontró ninguna placa Arduino conectada');
            }
        })
        .catch(error =>{
            console.error('Error al verificar la placa Arduino', error);
        });
}

function mostrarEstadoPlaca(encendido){
    if(encendido){
        imagenPlaca.classList.add('remove-filter');
        textoPlaca.textContent = 'LED Encendido';
    }else{
        imagenPlaca.classList.remove('remove-filter');
        textoPlaca.textContent = 'LED Apagado'
    }
}
mostrarEstadoPlaca(false);