const socket = io();
let user

socket.on ('enviar-mensajes-cliente', data =>{
    console.log(data)
})

const input = document.querySelector('#textInput')
const mensajesDiv = document.querySelector('#mensajesDiv')

Swal.fire({
    title: 'Bienvenido!',
    text: 'Ingrese su nombre',
    input: 'text',
    inputLabel: 'Nombre',
    inputPlaceholder: 'Ingrese su nombre',
    allowOutsideClick: false,
    showCancelButton: false,
    inputValidator: (value) => {
        if (!value) {
            return 'Debe ingresar su nombre!'
        }
    }
}).then((result) => {
    user = result.value
})


input.addEventListener('keyup', (event) =>{
    if (event.key === 'Enter'){
        if (input.value.trim().length > 0){
            socket.emit('enviar-mensajes-servidor', input.value)
            console.log(user, input.value)
            input.value = ''
            
        }
    }
    // console.log(user, input.value)
})

socket.on ('mensaje-recibido-cliente',arrayMensajes =>{
    // console.log(arrayMensajes)
    let mensajes = ''
    arrayMensajes.forEach(mensaje => {
        mensajes += `<div>
                        <strong>${user} :</strong>
                        <span>${mensaje.mensaje}</span>
                    </div>`
    });
    mensajesDiv.innerHTML = mensajes
})

