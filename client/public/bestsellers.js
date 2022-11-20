console.log("bestsellers");

const bestsellersList = document.querySelector('.best-sellers__list')
console.log(bestsellersList);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const isBestseller = urlParams.get('isBestseller');
console.log(isBestseller);

async function fetchBestsellers() {
    const response = await fetch('/products-data/bestsellers');

    if (response.status !== 200) {
        Notiflix.Notify.failure('Product was not found')
        return;
    }
    console.log('>>>>> found products by isBestseller in ui >>>>', response);
    const bestsellers = await response.json();

    bestsellers.map((bestseller) => {
        bestsellersList.insertAdjacentHTML('beforeend', bestsellersMarkUp(bestseller))
    })
}
fetchBestsellers()

function bestsellersMarkUp(bestseller) {

    return `
    <a class="products__item" href="#">
    <div class="card product-card" style="width: 24rem">
      <img src="${bestseller.image}" class="card-img-top" alt="product image" />
      <div class="card-body best-sellers__card-body">
        <h5 class="card-title">${bestseller.title}</h5>
        <p class="card-text">From $ ${bestseller.price} CAD</p>
      </div>
    </div>
  </a>  `
}