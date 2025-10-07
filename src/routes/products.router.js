import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("../src/data/products.json");

// GET todos los productos
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

// GET producto por id
router.get("/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
});

// POST agregar producto
router.post("/", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

// PUT actualizar producto
router.put("/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const updated = await productManager.updateProduct(productId, req.body);

    if (!updated) {
    return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(updated);
});

// DELETE eliminar producto
router.delete("/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const deleted = await productManager.deleteProduct(productId);

    if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado con éxito" });
});

export default router;