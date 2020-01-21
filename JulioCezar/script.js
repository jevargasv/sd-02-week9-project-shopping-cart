const criarCookie = (name, value, expire) => {
  const dtExpira = `expires=${expire}`;
  document.cookie = `${name}=${value}; ${dtExpira}`;
};

const mostrar = (event) => {
  const value = event.target.checked;
  criarCookie('termos', value, ' Tue, 01 Jan 2115 12:00:00 UTC ');
};

const salvarCookie = (target, value) => {
  const element = target;
  if (document.cookie !== '') {
    if (value === 'true') {
      element.checked = true;
    }
  }
};

const salvarName = (event) => {
  const key = event.keyCode;
  const name = event.target;
  if (key === 13) {
    sessionStorage.setItem('Name', name.value);
    name.value = '';
  }
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

function createProductItemElement({ sku, name, image }) {
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
  const ol = document.querySelector('ol');
  const li = event.target;
  const id = event.target.innerText.split(' ')[1].toString();
  storage('remove', id, event.target.text);
  ol.removeChild(li);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const fetchUrls = (url) => {
  const element = fetch(url);
  return element;
};

const appendItems = () => {
  const sectionItems = document.querySelector('.items');
  fetchUrls('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then(res => res.json())
    .then(data => data.results.forEach((el) => {
      sectionItems.appendChild(createProductItemElement({ sku: el.id, name: el.title, image: el.thumbnail }
        ))
    }))
    .then(() => {
      const button = document.querySelectorAll('.item__add');
      button.forEach((ele) => {
        ele.addEventListener('click', addProduto);
      })
    })    
};

const addProduto = (event) => {
  const element = event.target.previousSibling;
  const id = element.previousSibling.previousSibling.innerHTML;
  fetchUrls(`https://api.mercadolibre.com/items/${id}`)
    .then((result) => result.json())
    .then((el) => {
      document.querySelector('.cart__items').appendChild(createCartItemElement({ sku: el.id, name: el.title, salePrice: el.price }))
      storage('add', el.id, document.querySelector('ol').lastChild.innerHTML);
    })
    .then(() => {
      const carrinho = document.querySelector('li')
      carrinho.addEventListener('click', cartItemClickListener);
    })
};

const storage = (string, id, value) => {
  (string === 'add') ? localStorage.setItem(id, value)
  : localStorage.removeItem(id, value)
}


window.onload = function onload() {
  appendItems();
  const termos = document.querySelector('.input-terms');
  termos.addEventListener('change', mostrar);
  const name = document.querySelector('.input-name');
  name.addEventListener('keyup', salvarName);
  salvarCookie(termos, document.cookie.split('=')[1]);
};
