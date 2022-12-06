console.log("product");

const productEl = document.querySelector(".product-wrap")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('productId');

async function fetchCategoriesById() {

  const categoriesMenu = document.querySelector('.dropdown-menu');

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

  productEl.insertAdjacentHTML('beforeend', productMarkUp(product));

  const ORDER_KEY = 'product-order';
  let formOrderData = {};

  const formEl = document.querySelector('.order-options');

  formEl.addEventListener('change', onFormSelect);
  formEl.addEventListener('submit', handleSubmit);

  function onFormSelect(event) {
    formOrderData.title = product.title;
    formOrderData[event.target.name] = event.target.value;
    console.log(formOrderData);
    localStorage.setItem(ORDER_KEY, JSON.stringify(formOrderData));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('data', formOrderData);
    const validatedOrderForm = isformOrderDataValid(formOrderData)
    console.log(validatedOrderForm);
    if (validatedOrderForm) {
      window.location = '/checkout';
    }

    //   event.currentTarget.reset();
    //   localStorage.removeItem(ORDER_KEY);
    //   formOrderData = {};
    // }
  }
  console.log('data', formOrderData);
  function isformOrderDataValid(formOrderData) {
    if (!formOrderData.title || formOrderData.title === "") {
        Notiflix.Notify.failure('Please select a product');
        return false;
    }
    if (!formOrderData.option || formOrderData.option === "") {
      Notiflix.Notify.failure('Please select an option');
      return false;
    }
    if (!formOrderData.quantity || formOrderData.quantity === 0) {
      Notiflix.Notify.failure('Please select a quantity');
      return false;
    }
    return true;
  }

}

fetchProductsByProductId()

function productMarkUp(product) {
  let res = '';
  res += `
<div class="product-description">
  <img
    src="${product.image}"
    class="product-image img-fluid rounded"
    alt="product picture"
    width="500px"
    height="auto"
  />
  <div class="product-text">
    <div class="card-body product-order">
      <form class="order-options">
        <h4 class="product-title">${product.title}</h4>
        <h2 class="product-price">CAD $${product.price}+</h2>

        <label for="option-name" class="product-options__text"
          >Size and shape</label>
        <div class="product-options__wrap">
          <select
            class="product-options__input"
            required="required"
            id="option-name"
            name="option"
          >
            <option selected>Selest size and shape</option>
            `
  product.options.forEach((option) => {
    res += `
            <option value="${option}">${option}</option>
            `
  })
  res += `
          </select>
        </div>

        <label for="option-name" class="product-options__text">Quantity</label>
        <div class="product-options__wrap">
          <select
            class="product-options__input"
            required="required"
            id="option-quantity"
            name="quantity"
          >
            `
  Array.from({ length: product.quantity }, (key, value) => value +
    1).forEach((num) => {
      res += `
            <option value="${num}">${num}</option>
            `
    })
  res += `
          </select>
        </div>
     
      
      <div class="product-options">
        <label for="option-comment" class="product-options__text"
          >${product.personalization}</label
        >
        <p class="product-options__option">
          If you would like to add a name or some text, please enter below.
          Thank you!
        </p>
        <textarea
          name="comment"
          id="option-comment"
          class="product-options__comment"
          placeholder="Please enter your text"
        ></textarea>
      </div>

      <div class="d-grid">
        <a class="checkout-link" href="/checkout">
          <button class="btn btn-secondary product-btn btn-lg" type="submit">
            Add to cart
          </button>
        </a>
      </div>
      </form>
      <h5>Description</h5>
      <p class="card-text">${product.description}</p>
    </div>
  </div>
</div>
`
  return res;
}

