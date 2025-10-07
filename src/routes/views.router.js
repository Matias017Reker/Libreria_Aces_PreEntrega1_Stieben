import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// Vista home
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

// Vista RT
router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});

export default router;