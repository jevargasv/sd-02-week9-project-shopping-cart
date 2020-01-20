window.onload = function onload() {
  const inputName = document.querySelector('.input-name');
  if (this.localStorage.getItem('nome')) inputName.value = this.localStorage.getItem('nome');
  inputName.addEventListener('change', () => localStorage.setItem('nome', inputName.value));

  const seletorAceitaCookies = this.document.getElementsByClassName('input-terms')[0];
  if (localStorage.getItem('aceitaCookies') === 'true') seletorAceitaCookies.checked = this.localStorage.getItem('aceitaCookies');
  seletorAceitaCookies.addEventListener('click', () => this.localStorage.setItem('aceitaCookies', seletorAceitaCookies.checked));
};

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

function createProductItemElement({sku, name, image}) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

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

const pesquisa = 'computador';
const headers = {
  headers: { Accept: 'application/json' }
}
const fetchPesquisa = (URL, header) => {
  fetch(URL, header)
    .then(resposta => resposta.json())
    .then(respJson => {
      this.console.log(respJson['results'])
      respJson['results'].forEach(({ id, title, thumbnail }) => {
        this.console.log(id, title, thumbnail)
        this.document.getElementsByClassName('items')[0].appendChild(createProductItemElement({sku: id, name: title, image: thumbnail}))
      });
    })
}
fetchPesquisa("https://api.mercadolibre.com/sites/MLB/search?q=patos", headers)

