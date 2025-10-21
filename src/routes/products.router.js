import { Router } from "express";
import { ProductModel } from "../dao/models/product.model.js";

const router = Router();

// GET todos los productos
router.get("/", async (req, res) => {
try {
    const { limit = 10, page = 1, sort, category } = req.query;
    const filter = category ? { category } : {};

    const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const products = await ProductModel.paginate(filter, {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sortOption,
    });

    res.json({
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo productos" });
}
});

// GET producto por id
router.get("/:pid", async (req, res) => {
try {
    const product = await ProductModel.findById(req.params.pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
} catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
}
});

// POST agregar producto
router.post("/", async (req, res) => {
try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
} catch (error) {
    res.status(400).json({ error: "Error al crear producto", details: error.message });
}
});

// PUT actualizar producto
router.put("/:pid", async (req, res) => {
try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
} catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
}
});

// DELETE eliminar producto
router.delete("/:pid", async (req, res) => {
try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.pid);
    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado con éxito" });
} catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
}
});

export default router;