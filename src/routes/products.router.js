const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('./mocks/products.json');


//configuracion 

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    res.status(200).json(await productManager.getProducts(limit));
});

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const encontrado = await productManager.getProductById(id);
        res.status(200).json(encontrado);
    } catch (error) {
        res.status(404).send({message: "no se econtro el producto"});
    }
});

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const nuevoProducto = await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).send({message: "no se pudo agregar el producto"});
    }
});

router.put('/:pid', async (req, res) => {
    const id = req.params.pid;
    const data = req.body;
    try {
        const productoModificar = await productManager.updateProduct(id, data);
        res.status(201).send({message: `producto modificado ${productoModificar}`});
    } catch (error) {
        res.status(400).send({message: "no se pudo actualizar el producto"});
    }
});

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const productoBorrrar = await productManager.deleteProduct(id);
        res.status(201).send({message: `producto borrado ${productoBorrrar}`});
    } catch (error) {
        res.status(400).send({message: "no se pudo borrar el producto"});
    }
})

module.exports = router;