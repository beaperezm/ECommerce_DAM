import { accediendoApiCarro } from './productosCarro.js';

'use strict'

//Haciendo la llamada a la API
const accediendoApi = fetch("https://dummyjson.com/products")
.then((response) => { return response.json() }) //Convierto en Json los productos que vienen de la URL para trabajar con ellos
.then((json) => listaConProductos(json)) //listaConProductos es la función que va a pintar las cartas con los productos - le paso como parámetro el json con los datos obtenidos
.catch()

const cardsProducts = document.querySelector('#cardsProducts');

//Esta función crea e inserta en el DOM los elementos necesarios para que se pinten las "cartas" con los productos que vienen de la API
function listaConProductos(datosJson) {
    datosJson.products.forEach(element => {
      let getId = element.id;

      //Creando los elementos del DOM
      const creandoDivParaCard = document.createElement('div');
      const imagen = document.createElement('img');
      const creandoDivParaBody = document.createElement('div');
      const categoria = document.createElement('p');
      const precio = document.createElement('p');
      const creandoBoton = document.createElement('button');

      //Añadiendo clases a los elementos
      creandoDivParaBody.classList.add('card-body');
      categoria.classList.add('card-text');
      precio.classList.add('card-text');
      creandoBoton.classList.add('btn');
      creandoBoton.classList.add('btn-primary');
      creandoDivParaCard.classList.add('card');
      creandoDivParaCard.classList.add('col-7');
      creandoDivParaCard.classList.add("animate__animated");
      creandoDivParaCard.classList.add("animate__zoomIn");
      imagen.classList.add('card-img-top');

      //Añadiendo textos o imágenes a los elementos
      creandoBoton.textContent = "Añadir a carrito";
      imagen.setAttribute('src', element.images[0]);
      categoria.textContent = element.category;
      precio.innerHTML = `${element.price}€`;
  

      //Insertando los elementos
      cardsProducts.appendChild(creandoDivParaCard);
      creandoDivParaCard.appendChild(creandoDivParaBody);
      creandoDivParaCard.insertBefore(imagen, creandoDivParaBody);
      creandoDivParaBody.appendChild(categoria);
      creandoDivParaBody.appendChild(precio);
      creandoDivParaBody.appendChild(creandoBoton);

      creandoBoton.addEventListener("click", () => {
        accediendoApiCarro(getId);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto añadido al carrito",
          showConfirmButton: false,
          timer: 1500
        });
      })
    });
}

export { listaConProductos, accediendoApi }






