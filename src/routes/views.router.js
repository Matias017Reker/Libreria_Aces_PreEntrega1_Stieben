import { Router } from "express";
import { ProductModel } from "../dao/models/product.model.js";

const router = Router();

// Home
router.get("/", async (req, res) => {
    const products = await ProductModel.find().lean();
    res.render("home", { products });
});

// RealTime
router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductModel.find().lean();
    res.render("realTimeProducts", { products });
});

export default router;