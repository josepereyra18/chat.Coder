const fs = require('fs'); 

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si hay un error al leer el archivo (por ejemplo, si el archivo no existe), inicializa products como un array vacío.
            return [];
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    async getProducts(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (title === undefined || description === undefined || price === undefined || code === undefined || stock === undefined) {
            throw new Error("Todos los parámetros son obligatorios.");
        }
        const codeExists =  this.products.some(product => product.code === code);

        if (codeExists) {
            throw new Error("El código de producto está repetido.");
        }
        const id = this.generateUniqueId();
        const newProduct = new Product(title, description, price, thumbnail, code, stock);
        newProduct.id = id;

        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }

    async updateProduct(id, newData) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...newData };
        await this.saveProducts();

        return this.products[productIndex];
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        const deletedProduct = this.products.splice(productIndex, 1)[0];
        await this.saveProducts();
        return deletedProduct;
    }

    generateUniqueId() {
        return Math.random().toString(36);
    }
}


module.exports = ProductManager;
