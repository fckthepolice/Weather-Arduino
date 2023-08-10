const socket = io()

socket.on('temp', data =>{
    console.log(data)
})