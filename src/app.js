import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

// ---------------- CONFIG. BASE ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app); // Necesario para Socket.io
const io = new Server(httpServer);

// ---------------- CONFIG. EXPRESS ----------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // archivos estáticos

// ---------------- HANDLEBARS ----------------
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ---------------- RUTAS API ----------------
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// ---------------- WEBSOCKETS ----------------

const productManager = new ProductManager("./src/data/products.json");

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.emit("updateProducts", await productManager.getProducts());

    socket.on("newProduct", async (data) => {
        await productManager.addProduct(data);
        io.emit("updateProducts", await productManager.getProducts());
    });

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        io.emit("updateProducts", await productManager.getProducts());
    });
});

// ---------------- SV ----------------
const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Mas adelante lo quiero estilizar con Css