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

fetchCategoriesById();

let signUpBtn = document.querySelector('.signup-btn');

async function getUserByName() {

  const userName = await JSON.parse(window.localStorage.getItem('user'));
  signUpBtn.innerHTML = `Hello, ${userName.userName}`;

}
getUserByName() 

const bestsellersList = document.querySelector('.best-sellers__list');

async function fetchBestsellers() {
    const response = await fetch('/products-data/bestsellers');

    if (response.status !== 200) {
        Notiflix.Notify.failure('Product was not found')
        return;
    }
    const bestsellers = await response.json();

    const mainBestsellers = bestsellers.slice(0, 8);

    mainBestsellers.map((bestseller) => {
        bestsellersList.insertAdjacentHTML('beforeend', bestsellersMarkUp(bestseller))
    })
}
fetchBestsellers()

function bestsellersMarkUp(bestseller) {
  const url = `/product?productId=${bestseller._id}`;

    return `
    <a class="products__item" href=${url}>
    <div class="card product-card" style="width: 24rem">
      <img src="${bestseller.image}" class="card-img-top" alt="product image" />
      <div class="card-body best-sellers__card-body">
        <h5 class="card-title">${bestseller.title}</h5>
        <p class="card-text">From $ ${bestseller.price} CAD</p>
      </div>
    </div>
  </a>`
}

