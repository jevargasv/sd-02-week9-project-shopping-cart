window.onload = function onload() { };

let inputName = document.getElementsByClassName('input-name')[0];

const caixaCookies = document.querySelector('.input-terms');

const buscaProduto = document.getElementsByClassName('input-item')[0];

caixaCookies.addEventListener('click', () => document.cookie = 'agree = yes; expires = Thu, 18 Dec 2021 12:00:00 UTC')

inputName.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    sessionStorage.setItem("fullname", `${inputName.value}`);
    inputName.value = null;
  }
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

buscaProduto.addEventListener('keyup', function (event) {
  const descreveProduto = document.querySelector('.items')
  if (event.keyCode === 13) {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${buscaProduto.value}`)
  .then((response) => response.json())
  .then(data => {const produto = {sku: data.id, name: data.title, salePrice: data.price}})
  buscaProduto.value = null;
  }
});


function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
