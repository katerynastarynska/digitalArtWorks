console.log("products");
const productsList = document.querySelector('.products__list')
console.log(productsList);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const categoryId = urlParams.get('categoryId');
console.log(categoryId);

async function fetchProductsByCategoryId() {
    const response = await fetch(`/data/${categoryId}`);

    if (response.status !== 200) {
        Notiflix.Notify.failure('Product was not found')
        return;
    }
    const products = await response.json();
    console.log('>>>>> found products by id in ui >>>>', products);

    products.map((product) => {
        productsList.insertAdjacentHTML('beforeend', productsMarkUp(product))
    })
}
fetchProductsByCategoryId()

function productsMarkUp(product) {
    return `
    <a class="products__item" href="#">
    <div class="card product-card" style="width: 24rem">
      <img src="${product.image}" class="card-img-top" alt="product image" />
      <div class="card-body best-sellers__card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">From $ ${product.price} CAD</p>
      </div>
    </div>
  </a>
    `
}