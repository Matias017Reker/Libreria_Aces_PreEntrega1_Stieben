import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((c) => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };

    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);

    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((p) => p.product === productId);

    if (productIndex !== -1) {
      // ya existe el producto → aumentar cantidad
      cart.products[productIndex].quantity += 1;
    } else {
      // agregar nuevo producto
      cart.products.push({ product: productId, quantity: 1 });
    }

    carts[cartIndex] = cart;

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}
