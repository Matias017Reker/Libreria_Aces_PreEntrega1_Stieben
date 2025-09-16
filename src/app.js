import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

// Software intermedio
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Servidor
const PORT = 8080;
app.listen(PORT, () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
});