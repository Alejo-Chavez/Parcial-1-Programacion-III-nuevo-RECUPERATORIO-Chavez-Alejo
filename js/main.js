/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
• id
• nombre
• precio
• ruta de la imagen (correspondiente a la carpeta img).
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const frutas = [
    { id: 1, nombre: "anana", precio: 200, ruta_img: "img/anana.jpg" },
    { id: 2, nombre: "arandano", precio: 100, ruta_img: "img/arandano.jpg" },
    { id: 3, nombre: "banana", precio: 350, ruta_img: "img/banana.jpg" },
    { id: 4, nombre: "frambuesa", precio: 160, ruta_img: "img/frambuesa.png" },
    { id: 5, nombre: "frutilla", precio: 80, ruta_img: "img/frutilla.jpg" },
    { id: 6, nombre: "kiwi", precio: 190, ruta_img: "img/kiwi.jpg" },
    { id: 7, nombre: "mandarina", precio: 40, ruta_img: "img/mandarina.jpg" },
    { id: 8, nombre: "manzana", precio: 80, ruta_img: "img/manzana.jpg" },
    { id: 9, nombre: "naranja", precio: 25, ruta_img: "img/naranja.jpg" },
    { id: 10, nombre: "pera", precio: 200, ruta_img: "img/pera.jpg" },
    { id: 11, nombre: "pomelo amarillo", precio: 182, ruta_img: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo rojo", precio: 500, ruta_img: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "sandia", precio: 50, ruta_img: "img/sandia.jpg" }
];

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Modifica la función inicializadora  init()  para incluir una función que imprima tu nombre y apellido en el  <nav>  del HTML
y también en la consola.
Pasos:
• Crea un objeto alumno con tus datos (dni, nombre, apellido).
• Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.
• Imprimí tu nombre y apellido en el  <nav>  y en la consola.
• Todo esto debe ser parte de la funcion imprimirDatosAlumno() 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const alumno = {
    dni: "45926675",
    nombre: "Alejo",
    apellido: "Chavez"
};

let navBar = document.getElementById("nav_bar_alumno");
//Funcion para imprimir los datos del alumno


function imprimirDatosAlumno() {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido}, DNI: ${alumno.dni}`);
    navBar.innerText = `${alumno.nombre} ${alumno.apellido}`;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de
init() .
El HTML generado debe seguir esta estructura: 
    <div class="card-producto">
    <img src="" alt="">
    <h3></h3>
    <p>$</p>
    <button>Agregar al carrito</button>
    </div>
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

let productos = document.getElementById("contenedor_productos");

function mostrarFrutas(arrayFrutas) {

    // inicializamos un string vacio al que se le va a agregar la estructra de la carta fruta
    let cartaFruta = "";

    // Utilizamos un forEach para recorrer todas las frutas del array
    arrayFrutas.forEach(fruta => {
        cartaFruta += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarACarrito(${fruta.id})" class="boton-agregar-carrito">Agregar al carrito</button>
        </div>
        `;
    });

    // Una vez que ya tenemos en texto plano el html de todas las frutas, lo pasamos al HTML
    productos.innerHTML = cartaFruta;
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el
campo de texto.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

let barraDeBusqueda = document.getElementById("barra_busqueda");

// Le agregamos un escuchador de eventos al input con id= "barra_busqueda". El evento sera "keyup": o sea, que se capte la tecla cuando esta se deja de presionar
barraDeBusqueda.addEventListener(
    "keyup",
    filtrarFrutas
);

// Creamos una copia del array frutas como variable global para los productos visibles (servira para facilitar el ordenamiento luego)
let productosVisibles = frutas.slice(); // inicialmente todos

function filtrarFrutas() {
    // Obtenemos el valor ingresado en la barra de busqueda
    let valorBusqueda = barraDeBusqueda.value.toLowerCase();

    // Filtramos las frutas cuyo nombre incluya al texto captado
    // Reasignamos la copia de frutas creada anteriormente
    productosVisibles = frutas.filter(fruta =>
        fruta.nombre.includes(valorBusqueda)
    );

    // Mostramos en la seccion productos solo las frutas filtradas
    mostrarFrutas(productosVisibles);
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe
    mostrarse por  console.log()
2. Incorporar la funcion  mostrarCarrito()  asociada al boton de cada elemento del carrito El HTML generado debe
    seguir esta estructura:
        <li class="bloque-item">
            <p class="nombre-item">nombreProducto - precioProducto</p>
            <button class="boton-eliminar">Eliminar</button>
        </li>
3. Incorporar la funcion  eliminarProducto() . Este debe estar asociado al boton del carrito
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


// Creamos el carrito inicialmente vacío ---1---
let carrito = [];

// Colocamos el onclick en el texto html que pasamos en la funcion mostrarFrutas con la siguiente funcion:
function agregarACarrito(id) {
    // Buscamos la 1er fruta que sea igual al id del boton seleccionado luego la agregamos al carrito y mostramos por el console.log
    let frutaSeleccionada = frutas.find(f => f.id === id);

    carrito.push(frutaSeleccionada);

    console.log(carrito);

    // Mostramos el carrito cada vez que se agrega una fruta
    mostrarCarrito();

    // Mostramos la cantidad de productos del carrito actualizada. Y el total de $
    mostrarCantidadDeProductos();

    // Guardamos los cambios en el localStorage al agregar un producto
    actualizarLocalStorage(); 
}

//Creamos la funcion para mostrar el carrito en el HTML ----2----
let contenedorCarrito = document.querySelector("#contenedor_carrito")

function mostrarCarrito() {

    // Si el carrito esta vacío se lo decimos
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío </p>";
        return; // salimos de la funcion y retornamos el parrafo
    }

    // Si tiene al menos un producto, inicializamos un <ul> para que genere una lista, y dentro tenga todos los <li>
    let descripcionCarrito = "<ul>"; 

    // Utilizamos un forEach para recorrer todos los productos del carrito
    carrito.forEach(product => {
        descripcionCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">${product.nombre} - $${product.precio}</p>
                <button onclick="eliminarProducto(${product.id})" class="boton-eliminar">Eliminar</button> 
            </li>
        `; //me parece innecesario hacer un boton para eliminar productos porque luego hay que quitarlo y hacerle los botones de + y - según la imagen
    });

    // Luego de agregar todos los elementos del carrito, cerramos la etiqueta </ul> y lo cargamos al HTML
    descripcionCarrito +="</ul>";
    contenedorCarrito.innerHTML = descripcionCarrito;
}

// Funcion para eliminar un producto del carrito ----3----

function eliminarProducto(id) {
    // Filtramos el carrito, quitando el producto con el id dado y mostramos el carrito actualizado
    carrito = carrito.filter(product => product.id !== id);
    mostrarCarrito();

    // Mostramos la cantidad de productos del carrito actualizada. Y el total de $
    mostrarCantidadDeProductos();

    // Guardamos los cambios en el localStorage al eliminar un producto
    actualizarLocalStorage();
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
• Almacena los productos del carrito en  localStorage .
• Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan
eliminado del carrito
• Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */ 


// Funcion para almacer los datos del carrito actualizados
function actualizarLocalStorage() {
    // Convertimos el carrito a un string JSON 
    let jsonCarrito = JSON.stringify(carrito);

    // Guardamos ese json en el localStorage con la clave carrito
    localStorage.setItem("carrito", jsonCarrito);
}

// Funcion para recuperar el localStorage del carrito al recargar o abrir la pág de nuevo
function cargarCarritoLocalStorage() {
    // Obtenemos con getItem si hay algo en el localStorage con key="carrito", lo guardamos en un const porque nunca se va a querer redeclarar o redefinircada vez que se llame a esta función 
    const carritoGuardado = localStorage.getItem("carrito");

    if(carritoGuardado) { // Si no hay localStorge no hace nada
        // Convertimos el JSON a array de objetos y lo mostramos
        carrito = JSON.parse(carritoGuardado);
        
        mostrarCarrito();
    }
}

/*
• Implementa un contador de números de productos del carrito. Este contador debe estar almacenado en una variable.
• Implementa dos botones y un contador al lado de cada item en el carrito tipo  + 2 - . Pulsando  +  agregamos 1
producto mas de ese tipo y pulsando  -  reducimos un producto, si este numero llega a 0 debe desaparecer ese item
del carrito.
• Además, actualiza la cantidad de productos en el header, en la parte superior derecha en la parte de Carrito: 0
productos
• Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
• Asegurante de que este valor se actualiza con cada cambio en el carrito y que se conserva cuando recargamos la
pagina.
*/

let carrito_header = document.getElementById("carrito_header");
let contenedor_footer = document.getElementById("contenedor_footer");

function mostrarCantidadDeProductos() {
    const cantidadProductos = carrito.length; // obtenemos la cantidad de productos en el carrito y luego lo mostramos en el header
    carrito_header.innerText = `Carrito: ${cantidadProductos} productos`;
    // Mostramos el total del carrito si hay más de 1 producto
    if(cantidadProductos > 0){
        mostrarTotalDeProductos()

    }
    else{ // Si no hay productos, limpiamos el footer
        contenedor_footer.innerHTML = "";
    }
}

function mostrarTotalDeProductos() {
    const totalProductos = carrito.length;

    // Si el carrito esta tiene al menos un producto le calculamos el total
    if (totalProductos > 1) {
        // Calculamos el precio total
        const totalPrecio = carrito.reduce((suma, product) => suma + product.precio, 0)

        // Mostramos el precio total abajo del carrito
        let descripcionPrecioTotal = 
        `<p> Total: $${totalPrecio}</p>`;
        agregarBotonVaciarCarrito()

        // Agregamos el precio total al contenedor sin borrar los productos
        contenedor_footer.innerHTML = descripcionPrecioTotal;
    } else {
        // si no hay productos, borramos el total
        contenedor_footer.innerHTML = "";
    }
}

/*
• Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.
• Si no hay productos en el carrito incluye alguna imagen o gif tipo carrito vacio con un texto que diga, no hay productos
en el carrito.

*/

function agregarBotonVaciarCarrito() {
    let htmlBotonVaciarCarrito = `
        <button onclick="vaciarCarrito()" class="boton-eliminar">Vaciar carrito</button>
    `;

    contenedor_footer.innerHTML += htmlBotonVaciarCarrito;
}

function vaciarCarrito() {
    // Gracias al let podemos redefinir el contenido a un array vacío
    carrito = [];

    mostrarCarrito(); // Actualizamos la visualización
    mostrarCantidadDeProductos(); // Actualizamos contador y total
    actualizarLocalStorage(); // Guardamos cambios en localStorage
}














/* 
Pa los profes:
    Quería redactar mi humilde opinion sobre el enunciado al ser un confuso, ya que al seguir al pie de la letra lo que se pide
    hay momentos en el futuro donde se pide hacer algo, que hubiera sido más facil por ejemplo usar otro formato para listar los productos
    para hacer ciertas funcionalidades
    o tal vez solo soy malo programando y ni me di cuenta que podía hacerlo de otra forma jaja :p, lo intné aunque no llegué a hacer el
    css (odio css)
*/


//Funcion inicializadora
function init() {
    mostrarCantidadDeProductos()
    cargarCarritoLocalStorage()
    imprimirDatosAlumno();
    mostrarFrutas(frutas);
}
init();