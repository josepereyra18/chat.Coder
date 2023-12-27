const fs = require('fs');

class Product {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

class Cart {
    constructor() {
        this.products = [];
    }
}

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = this.loadCart();
    }

    loadCart() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // If there's an error reading the file, initialize carts as an empty array.
            return [];
        }
    }

    async saveCart() {
        const data = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.filePath, data, 'utf8');
    }

    generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    async getCart(id) {
        const cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            throw new Error("Cart not found.");
        }
        return cart;
    }

    async createCart() {
        const cartId = this.generateUniqueId();
        const newCart = new Cart();
        newCart.id = cartId;
        this.carts.push(newCart);
        await this.saveCart();
        return newCart;
    }

    async allCarts() {
        return this.carts;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = this.carts.find(cart => cart.id === cartId);

        if (!cart) {
            throw new Error("Cart not found.");
        }

        const product = cart.products.find(p => p.id === productId);

        if (product) {
            product.quantity += quantity;
        } else {
            const newProduct = new Product(productId, quantity);
            cart.products.push(newProduct);
        }

        await this.saveCart();
        return cart;
    }
}

module.exports = CartManager;



//     async addProduct(title, description, price, thumbnail, code, stock) {
//         if (title === undefined || description === undefined || price === undefined || code === undefined || stock === undefined) {
//             throw new Error("Todos los parámetros son obligatorios.");
//         }
//         const codeExists =  this.products.some(product => product.code === code);

//         if (codeExists) {
//             throw new Error("El código de producto está repetido.");
//         }
//         const id = this.generateUniqueId();
//         const newProduct = new Product(title, description, price, thumbnail, code, stock);
//         newProduct.id = id;

//         this.products.push(newProduct);
//         await this.saveProducts();
//         return newProduct;
//     }



//     async getProducts() {
//         return this.products;
//     }

//     async addProduct(Cid, Pid) {

//     }

//     async getProductById(id) {
//         const product = this.products.find(product => product.id === id);

//         if (!product) {
//             throw new Error("Producto no encontrado.");
//         }

//         return product;
//     }

//     async updateProduct(id, newData) {
//         const productIndex = this.products.findIndex(product => product.id === id);

//         if (productIndex === -1) {
//             throw new Error("Producto no encontrado.");
//         }

//         this.products[productIndex] = { ...this.products[productIndex], ...newData };
//         await this.saveCart();
        
//         return this.products[productIndex];
//     }

//     async deleteProduct(id) {
//         const productIndex = this.products.findIndex(product => product.id === id);

//         if (productIndex === -1) {
//             throw new Error("Producto no encontrado.");
//         }

//         const deletedProduct = this.products.splice(productIndex, 1)[0];
//         await this.saveCart();
//         return deletedProduct;
//     }

//     generateUniqueId() {
//         return Math.random().toString(36);
//     }
// }


