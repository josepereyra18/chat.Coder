const express = require('express');
const handlebars = require('express-handlebars');
import path from 'path';
const ProductRouter = require('./routes/products.router.js');
const CartRouter = require('./routes/cart.router.js');
const ViewsRouter = require('./routes/views.router.js');
const { Server } = require('socket.io') 

const ProductManager = require('./ProductManager.js');
const productManager = new ProductManager(path.join(__dirname, './mocks/products.json'));

const app = express();
const port = 8080 || process.env.PORT;

//motor de plantillas -- handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname +'/public'));

app.use('/api/productos', ProductRouter);
app.use('/api/carrito', CartRouter);
app.use('', ViewsRouter);





app.get('/api/productos', (req, res) => {
    res.send('get productos');
});

app.post('/api/productos', (req, res) => {
    res.send('post productos');
});

app.put('/api/productos', (req, res) => {
    res.send('put productos');
});

app.delete('/api/productos', (req, res) => {
    res.send('delete productos');
})

app.get('/api/carrito', (req, res) => {
    res.send('get productos');
});

app.post('/api/carrito', (req, res) => {
    res.send('post productos');
});

//express 
const serverHTTP = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

async function updateProductList() {
    const products = await productManager.getProducts();
    socket.emit('actualizar-lista-productos', products);
}



//socket.io
const io = new Server(serverHTTP);

io.on('connection', socket =>{
    console.log('cliente conectado')

    async function updateProductList() {
        const products = await productManager.getProducts();
        socket.emit('actualizar-lista-productos', products);
    }

    updateProductList();

    socket.on('enviar-mensajes-servidor-agregar', data => {
        productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock);
        // Emite la lista de productos actualizada a todos los clientes
        updateProductList();
    });

    socket.on('enviar-mensajes-servidor-borrar', data => {
        productManager.deleteProduct(data);
        // Emite la lista de productos actualizada a todos los clientes
        updateProductList()
    });
})

