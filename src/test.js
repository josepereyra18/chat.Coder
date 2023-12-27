async function main() {
    
    const ProductManager = require('./ProductManager.js');
    const manager = new ProductManager('./products.json');


    await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234);

    await manager.addProduct("producto prueba", "Este es un producto prueba", 900, "Sin imagen", "3456", 1394);
    
    await manager.addProduct("producto prueba", "Este es un producto prueba", 260, "Sin imagen", "ñ09j5", 14); 
    
    await manager.addProduct("producto prueba", "Este es un producto prueba", 290, "Sin imagen", "ab", 34); 
    
    // await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234); // Debería arrojar una excepción pq esta repetido

    // await manager.getProductById(manager.getProducts()[0].id);

    // await manager.updateProduct(manager.getProducts()[0].id, { price: 250 });

    // await manager.deleteProduct(manager.getProducts()[0].id);
}

main();