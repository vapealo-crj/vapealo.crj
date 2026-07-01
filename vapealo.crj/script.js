let productos =
JSON.parse(localStorage.getItem("productos")) || [
    {
        nombre: "5K Ignite",
        precio: 35,
        imagen: "imagenes/ignite.png"
    },
    {
        nombre: "5.1K Yocco",
        precio: 37,
        imagen: "imagenes/yocco.png"
    },
    {
        nombre: "5K Death Row",
        precio: 35,
        imagen: "imagenes/deathrow.png"
    },
    {
        nombre: "7K Mike Tyson",
        precio: 40,
        imagen: "imagenes/miketyson.png"
    }
];

function renderProductos(){

    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    productos.forEach(producto => {

        cards.innerHTML += `
        <div class="card">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <button class="precio"
            onclick="agregarCarrito('${producto.nombre}',${producto.precio})">
                S/ ${producto.precio}.00
            </button>

        </div>
        `;
    });

}

// ===========================
// VAPEALO.CRJ - VERSION 2.1
// ===========================

// Elementos
const ageModal = document.getElementById("ageModal");
const enterBtn = document.getElementById("enterBtn");
const exitBtn = document.getElementById("exitBtn");
const searchInput = document.getElementById("searchInput");

// Botón entrar
enterBtn.addEventListener("click", () => {
    ageModal.style.display = "none";
});

// Botón salir
exitBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
});

// Buscador en tiempo real
searchInput.addEventListener("keyup", () => {

    const texto = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (card.textContent.toLowerCase().includes(texto)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});

// Header dinámico
window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,.85)";
    } else {
        header.style.background = "rgba(0,0,0,.55)";
    }

});

// Buscar y llevar al producto con Enter
searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        let valor = searchInput.value.toLowerCase();

        if (valor.includes("ignite")) {
            document.getElementById("ignite").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        if (valor.includes("yocco")) {
            document.getElementById("yocco").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        if (valor.includes("death")) {
            document.getElementById("deathrow").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        if (valor.includes("mike")) {
            document.getElementById("miketyson").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    }

});

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

renderCarrito();

function agregarCarrito(nombre, precio){

    let producto = carrito.find(
        p => p.nombre === nombre
    );

    if(producto){

        producto.cantidad++;

    }else{

        carrito.push({
            nombre:nombre,
            precio:precio,
            cantidad:1
        });

    }

    renderCarrito();
}

    function renderCarrito(){

    let panel =
    document.getElementById("cartItems");

    let total = 0;
    let totalSoles = 0;

    panel.innerHTML = "";

    carrito.forEach((producto,index)=>{

        totalSoles += producto.precio * producto.cantidad;
        total += producto.cantidad;

        panel.innerHTML += `

        <div class="cart-item">

            <strong>${producto.nombre}</strong>

            <div class="cart-controls">

                <button onclick="cambiarCantidad(${index},-1)">-</button>

                <span>${producto.cantidad}</span>

                <button onclick="cambiarCantidad(${index},1)">+</button>

                <div class="precioCarrito">
                    S/ ${producto.precio * producto.cantidad}
                </div>

            </div>

        </div>

        `;

    });

    panel.innerHTML += `

<div class="totalCarrito">
    S/ ${totalSoles}
</div>

<div class="accionesCarrito">

    <button class="btnComprarFinal"
    onclick="comprarWhatsApp()">
        COMPRAR
    </button>

    <button class="btnVaciar"
    onclick="vaciarCarrito()">
        🗑️
    </button>

</div>

`;

    document.getElementById("cartCount")
    .textContent = total;
}
function cambiarCantidad(index,cambio){

    carrito[index].cantidad += cambio;

    if(carrito[index].cantidad <= 0){
        carrito.splice(index,1);
    }
    
    localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
);
    renderCarrito();
}

document.getElementById("cartBtn")
.addEventListener("click",(e)=>{

    e.preventDefault();

    let panel =
    document.getElementById("cartPanel");

    if(panel.style.display === "block"){

        panel.style.display = "none";

    }else{

        panel.style.display = "block";

    }

});

function comprarWhatsApp(){

    let mensaje =
    "Hola, vi sus productos en Vapealo.CRJ.%0A%0ADeseo pedir:%0A";

    let total = 0;

    carrito.forEach(producto => {

        mensaje +=
        `• ${producto.nombre} x${producto.cantidad}%0A`;

        total += producto.precio * producto.cantidad;

    });

    mensaje += `%0ATotal: S/ ${total}`;

    let numero = "51910538239";

    window.open(
        `https://wa.me/${numero}?text=${mensaje}`,
        "_blank"
    );
}
const wsp = document.getElementById("wspFloat");

let moviendo = false;

wsp.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

wsp.addEventListener("mousedown", (e) => {
    moviendo = true;
    e.preventDefault();
});                 

document.addEventListener("mouseup", () => {
    moviendo = false;
});

document.addEventListener("mousemove", (e) => {

    if (!moviendo) return;

    wsp.style.left = e.clientX - 35 + "px";
    wsp.style.top = e.clientY - 35 + "px";

    wsp.style.right = "auto";
    wsp.style.bottom = "auto";
});

wsp.addEventListener("touchstart", () => {
    moviendo = true;
});

document.addEventListener("touchend", () => {
    moviendo = false;
});

document.addEventListener("touchmove", (e) => {

    if (!moviendo) return;

    let touch = e.touches[0];

    wsp.style.left = touch.clientX - 35 + "px";
    wsp.style.top = touch.clientY - 35 + "px";

    wsp.style.right = "auto";
    wsp.style.bottom = "auto";
});
function vaciarCarrito(){

    carrito = [];

    localStorage.removeItem("carrito");

    renderCarrito();

}
adminBtn.onclick = () => {

    let clave = prompt("Ingrese contraseña");

    if(clave !== "vapo400"){
        alert("Contraseña incorrecta");
        return;
    }

    let opcion = prompt(
`PANEL ADMIN

1 = Agregar producto
2 = Cambiar precio
3 = Ver productos`
    );

    if(opcion === "2"){

    let indice = Number(
        prompt("Número del producto a eliminar (empieza en 0)")
    );

    productos.splice(indice, 1);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    renderProductos();

    alert("Producto eliminado");
}

    if(opcion === "1"){

        let nombre = prompt("Nombre del producto");
        let precio = Number(prompt("Precio"));
        let imagen = prompt("URL de la imagen");

        productos.push({
            nombre,
            precio,
            imagen
        });

        localStorage.setItem(
    "productos",
    JSON.stringify(productos)
);

        renderProductos();

        alert("Producto agregado");
    }

    if(opcion === "3"){

    alert(
        productos
        .map((p,i) => `${i} - ${p.nombre}`)
        .join("\n")
    );

}

};

renderProductos();
