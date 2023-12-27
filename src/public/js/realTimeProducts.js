const socket = io();
const productosDiv = document.querySelector('#productosDiv');

socket.on('actualizar-lista-productos', productos => {
    let mensajes = '';
    console.log('Productos actualizados:', productos);
    productos.map((producto) => {
        mensajes += `<div>
                        <strong>${producto.title} :</strong>
                        <p>"${producto.description}"</p>
                        <p>$ ${producto.price}</p>
                        <p>Codigo: ${producto.code}</p>
                        <p>Stock: ${producto.stock}</p>
                        <strong>ID: ${producto.id}</strong>
                        <hr>
                    </div>`;
    });
    productosDiv.innerHTML = mensajes;
});




const title = document.querySelector('#inputTitle');
const description = document.querySelector('#inputDescription');
const price = document.querySelector('#inputPrice');
const code = document.querySelector('#inputCode');
const stock = document.querySelector('#inputStock');
const id = document.querySelector('#inputId');

const btnAgregar = document.querySelector('#btnAgregar');
const btnBorrar = document.querySelector('#btnBorrar');

btnAgregar.addEventListener('click', () => {
    socket.emit('enviar-mensajes-servidor-agregar', {
        title: title.value,
        description: description.value,
        price: price.value,
        code: code.value,
        stock: stock.value,
    });
    // Limpia los campos del formulario
    title.value = '';
    description.value = '';
    price.value = '';
    code.value = '';
    stock.value = '';
});

btnBorrar.addEventListener('click', () => {
    socket.emit('enviar-mensajes-servidor-borrar', id.value);
    // Limpia el campo del formulario
    id.value = '';
});