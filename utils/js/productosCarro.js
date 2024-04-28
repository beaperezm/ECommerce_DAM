'use strict';

const accediendoApiCarro = async (id) => {
 return fetch("https://dummyjson.com/products/" + id)
.then((response) =>  response.json())
.then((json) => productosCarro(json))
.catch()
}

const cardsCart = document.querySelector("#cardsCart");

function productosCarro (datosJson3) {

  cardsCart.innerHTML += "";
  const set = new Set([datosJson3]);
  let array = Array.from(set);
  array.forEach((element) => {
  
    //Creando los elementos del DOM
    const creandoDivParaCard = document.createElement('div');
    const imagen = document.createElement('img');
    const creandoDivParaBody = document.createElement('div');
    const categoria = document.createElement('p');
    const precio = document.createElement('p');

    //Añadiendo clases a los elementos
    creandoDivParaBody.classList.add('card-body');
    categoria.classList.add('card-text');
    precio.classList.add('card-text');
    creandoDivParaCard.classList.add('card');
    creandoDivParaCard.classList.add('col-3');
    imagen.classList.add('card-img-top');

    //Añadiendo textos o imágenes a los elementos
    imagen.setAttribute('src', element.images[0]);
    categoria.textContent = element.category;
    precio.innerHTML = `${element.price}€`;


    //Insertando los elementos
    cardsCart.appendChild(creandoDivParaCard);
    creandoDivParaCard.appendChild(creandoDivParaBody);
    creandoDivParaCard.insertBefore(imagen, creandoDivParaBody);
    creandoDivParaBody.appendChild(categoria);
    creandoDivParaBody.appendChild(precio);
    
  })
  };


  export { productosCarro, accediendoApiCarro };