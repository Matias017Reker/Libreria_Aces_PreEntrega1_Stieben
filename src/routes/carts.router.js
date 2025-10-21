import { Router } from "express";
import { CartModel } from "../dao/models/cart.model.js";
import { ProductModel } from "../dao/models/product.model.js";

const router = Router();

// POST crear carrito
router.post("/", async (req, res) => {
try {
    const newCart = await CartModel.create({ products: [] });
    res.status(201).json(newCart);
} catch (error) {
    res.status(500).json({ error: "Error al crear carrito" });
}
});

// GET productos de un carrito
router.get("/:cid", async (req, res) => {
try {
    const cart = await CartModel.findById(req.params.cid).populate("products.product");
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart.products);
} catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
}
});

// POST agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
try {
    const { cid, pid } = req.params;
    const cart = await CartModel.findById(cid);
    const product = await ProductModel.findById(pid);

    if (!cart || !product) return res.status(404).json({ error: "Carrito o producto no encontrado" });

    const existingProduct = cart.products.find((p) => p.product.equals(pid));

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
} catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
}
});

export default router;