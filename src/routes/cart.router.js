const { Router } = require('express')
const router = Router()

const CartManager = require('../CartManager.js');
const cartManager = new CartManager('./mocks/carts.json');

// router.get('/', async (req, res) => {
//     const limit = req.query.limit;
//     res.status(200).json(await productManager.getProducts(limit));
// });

router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await cartManager.createCart();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(401).send({message: "no se pudo crear el carrito"});
    }
});

router.post('/:Cid/producto/:Pid', async (req, res) => {
    const Cid = req.params.Cid;
    const Pid = req.params.Pid;
    const quantity = req.body.quantity;
    try {
        const productoAgregado = await cartManager.addProductToCart(Cid, Pid, quantity);
        res.status(201).json(productoAgregado);
    } catch (error) {
        res.status(400).send({message: "no se pudo agregar el producto"});
    }
})

router.get('/:Cid', async (req, res) => {
    const Cid = req.params.Cid;
    try {
        const allCarts = await cartManager.getCart(Cid);
        res.status(200).json(allCarts);
    } catch (error) {
        res.status(400).send({message: "no se pudo agregar el producto"});
    }
})

module.exports = router;