const { Router } = require('express')
const router = Router()

const Products = require('../mocks/products.json');

// const hola= [
//     {title: "hello",description: "hola hola hola" ,price: 123},
// ]

router.get('/pruebaIndex', (req, res) => {
    res.render('home', { // index --> nombre del archivo
        title: 'probando 123', 
        name: 'lucas',
    }); // {} --> contexto
});

router.get('/', (req, res) => {
    res.render('index',{
        title: 'probando 123',
        name: 'lucas',
        products : Products
    })
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',{
        title: 'Real Time Products',
        products : Products
    })
});

module.exports = router;

