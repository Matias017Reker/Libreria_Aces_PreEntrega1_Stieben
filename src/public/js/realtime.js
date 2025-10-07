const socket = io();

// Escucha cuando el servidor envía la lista actualizada de productos
socket.on("updateProducts", (products) => {
    renderProducts(products);
});

// Manejo del formulario para agregar productos
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = parseFloat(document.getElementById("price").value);

    if (!title || !description || isNaN(price)) {
    alert("Por favor completa todos los campos.");
    return;
    }

    socket.emit("newProduct", { title, description, price });
    form.reset();
});

// Eliminar producto
function deleteProduct(id) {
    socket.emit("deleteProduct", id);
}

// Renderizar productos en pantalla
function renderProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((p) => {
    const li = document.createElement("li");
    li.id = `product-${p.id}`;
    li.innerHTML = `
        <strong>${p.title}</strong> - $${p.price} <br>
        <em>${p.description}</em>
        <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;
    productList.appendChild(li);
    });
}