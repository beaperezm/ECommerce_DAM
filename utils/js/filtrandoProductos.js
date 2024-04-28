import { accediendoApiCarro } from "./productosCarro.js";

"use strict";

const accediendoApiFiltros = fetch("https://dummyjson.com/products")
  .then((response) => {
    return response.json();
  }) //Convierto en Json los productos que vienen de la URL para trabajar con ellos
  .then((json) => filtrandoProductos(json))
  .catch();


const select = document.querySelector("#select");
const selectOpcion = document.querySelector("#selectOptions");
const button = document.querySelector("#bttn");
const cardsProducts = document.querySelector('#cardsProducts');

select.classList.add('selectHidden');

function filtrandoProductos(datosJson2) {
  const filterCategoryArray = [];
  const filterBrandArray = [];

  //Cambiando las opciones del segundo select dependiendo del filtro que se quiera hacer
  selectOpcion.addEventListener("change", () => {
    let opcion = selectOpcion.value;
    if (opcion === "1") {
      select.innerHTML = "";
      select.classList.add('selectHidden');
      select.classList.remove('selectShow');
    }
    if (opcion === "2") {
      select.innerHTML = "";
      select.classList.add('selectHidden');
      select.classList.remove('selectShow');
    }
    if (opcion === "3") {
      select.innerHTML = "";
      select.classList.add('selectShow');
      select.classList.remove('selectHidden');
      //Filtro las catergorías para que me las meta en el array sin repetir
      datosJson2.products.forEach((element) => {
        if (!filterCategoryArray.includes(element.category)) {
          filterCategoryArray.push(element.category);
        }
      });
      //Creo los option con las categorías sin repetir
      filterCategoryArray.forEach((element) => {
        const option1 = document.createElement("option");
        option1.innerHTML = element;
        select.appendChild(option1);
      });
    }
    if (opcion === "4") {
      select.innerHTML = "";
      select.classList.add('selectShow');
      select.classList.remove('selectHidden');
      //Filtro las marcas para que me las meta en el array sin repetir
      datosJson2.products.forEach((element) => {
        if (!filterBrandArray.includes(element.brand)) {
          filterBrandArray.push(element.brand);
        }
      });
      //Creo los option con las categorías sin repetir
      filterBrandArray.forEach((element) => {
        const option = document.createElement("option");
        option.innerHTML = element;
        select.appendChild(option);
      });
    }

    //Escuchando al botón cuando hace click
    button.addEventListener("click", (event) => {
      event.preventDefault();
      switch (opcion) {
        case "1":
          let todosProductos = datosJson2.products.sort(function (a, b)  {
            return a.brand.length - b.brand.length;
          });
          mostrandoCategorias(todosProductos);
          break;

        case "2":
          let listaPreciosOrdenados = datosJson2.products.sort(function (a, b) {
            return a.price - b.price;
          });
          mostrandoCategorias(listaPreciosOrdenados);
          break;

        case "3":
          let listaFiltradaCategoria = datosJson2.products.filter((item) => {
            return item.category == select.value.toLowerCase();
          });
          mostrandoCategorias(listaFiltradaCategoria);
          break;

        case "4":
          let listaFiltradaMarca = datosJson2.products.filter((item) => {
            return item.brand == select.value;
          });
          mostrandoCategorias(listaFiltradaMarca);
          break;
      }
    });
  });
}


function mostrandoCategorias(listado) {
  cardsProducts.innerHTML = "";
  listado.forEach((element) => {
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
      console.log(creandoBoton);
      console.log(element);
      accediendoApiCarro(getId);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto añadido al carrito",
        showConfirmButton: false,
        timer: 1500
      });
    });
  });
}


export { filtrandoProductos };