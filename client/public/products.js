const productsList = document.querySelector('.products__list')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('categoryId');

async function fetchCategoriesById() {

  const categoriesMenu = document.querySelector('.dropdown-menu');

  const response = await fetch('/categories-data')
  console.log('>>>>> found categories by id in ui>>>>', response);

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

async function fetchProductsByCategoryId() {
    const response = await fetch(`/data/${categoryId}`);

    if (response.status !== 200) {
        Notiflix.Notify.failure('Product was not found')
        return;
    }
    console.log('>>>>> found products by id in ui >>>>', response);
    const products = await response.json();

    products.map((product) => {
        productsList.insertAdjacentHTML('beforeend', productsMarkUp(product))
    })
}
fetchProductsByCategoryId()

function productsMarkUp(product) {
  const url = `/product?productId=${product._id}`;
  console.log(url);
    return `
    <a class="products__item" href=${url}>
    <div class="card product-card" style="width: 24rem">
      <img src=${product.image} class="card-img-top" alt="product image" />
      <div class="card-body best-sellers__card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">From $ ${product.price} CAD</p>
      </div>
    </div>
  </a>
    `
}

