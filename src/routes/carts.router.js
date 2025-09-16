import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

// POST crear carrito
router.post("/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

// GET productos de un carrito
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(cart.products);
});

// POST agregar producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cartId, productId);

    if (!updatedCart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(updatedCart);
});

export default router;