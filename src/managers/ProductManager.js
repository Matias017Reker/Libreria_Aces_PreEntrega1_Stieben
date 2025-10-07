import fs from "fs";

export default class ProductManager {
    constructor(path) {
    this.path = path;
    }

  // Lectura de productos
    async getProducts() {
    try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
    }

  // Producto por id
    async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
    }

  // Agrega un producto
    async addProduct(productData) {
    const products = await this.getProducts();

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
        id: newId,
        title: productData.title || "Sin título",
        description: productData.description || "Sin descripción",
        code: productData.code || `CODE-${newId}`,
        price: productData.price || 0,
        status: true,
        stock: productData.stock || 10,
        category: productData.category || "general",
        thumbnails: productData.thumbnails || [],
    };

    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
    }

  // Actualizar producto
    async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields, id };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return products[index];
    }

  // Eliminar un producto por ID
    async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) return false;

    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
    return true;
    }
}