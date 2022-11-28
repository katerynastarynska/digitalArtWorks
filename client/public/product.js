console.log("product");

const productEl = document.querySelector(".product-wrap")
console.log(productEl);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const productId = urlParams.get('productId');
console.log(productId);

async function fetchCategoriesById() {

  const categoriesMenu = document.querySelector('.dropdown-menu');
  console.log(categoriesMenu);

  const response = await fetch('/categories-data')
  console.log('>>>>> found categories by id in ui INDEX >>>>', response);

  if (response.status !== 200) {
    Notiflix.Notify.failure('Category was not found')
    return;
  }
  const categories = await response.json()
  console.log(categories);

  categories.map((category) => {
    categoriesMenu.insertAdjacentHTML('beforeend', categoryItemMarkUp(category))
  })
}

function categoryItemMarkUp(category) {
  const categoryLink = `/categories/products?categoryId=${category._id}`;
  console.log(categoryLink);
  return `
    <li><a class="dropdown-item" href="${categoryLink}">${category.title}</a></li>
    `
}

fetchCategoriesById()

async function fetchProductsByProductId() {
  const response = await fetch(`/data-product/${productId}`);
  console.log(response);

  if (response.status !== 200) {
    Notiflix.Notify.failure('Product was not found')
    return;
  }
  const product = await response.json();
  console.log('>>>> product from ui >>>> ', product);

  productEl.insertAdjacentHTML('beforeend', productMarkUp(product))
}
fetchProductsByProductId()

function productMarkUp(product) {
  let res = '';
  res += `
    <div class="product-description">
        <img src=${product.image} class="product-image img-fluid rounded" alt="product picture" width="500px" height="auto"/>
          <div class="product-text">
            <div class="card-body">
            <h4 class="product-title">${product.title}</h4>
            <h2 class="product-price">CAD $${product.price}+</h2>
            <div class="product-options">
                <label for="option-name" class="product-options__text">Size and shape</label>
                <div class="product-options__wrap">
                    <select class="product-options__input" required="required" id="option-name">
                    <option selected>Selest size and shape</option>`

  product.options.forEach((option, index) => {
    res += `<option value=${index + 1}>${option}</option>`
  })

  res += ` </select>
            </div>
          </div>
    
          <div class="product-options">
            <label for="option-name" class="product-options__text">Quantity</label>
            <div class="product-options__wrap">
              <select class="product-options__input" required="required" id="option-name">`

  Array.from({ length: product.quantity }, (key, value) => value + 1).forEach((num) => {
    res += `<option value=${num}>${num}</option>`
  })

  res += `</select>
            </div>
          </div>
    
          <div class="product-options">
            <label for="option-comment" class="product-options__text">${product.personalization}</label>
            <p class="product-options__option">
              If you would like to add a name or some text, please enter
              below. Thank you!
            </p>
            <textarea name="option-comment"
              id="option-comment"
              class="product-options__comment"
              placeholder="Please enter your text"></textarea>
            <a class="checkout-link" href="./checkout.html">
              <div class="d-grid gap-2 col-12">
                <button class="btn btn-secondary product-btn" type="button">Add to cart
                </button>
              </div>
            </a>
          </div>
    
          <h5>Description</h5>
          <p class="card-text">${product.description}</p>
        </div>
      </div>
    </div>`
  return res;
}