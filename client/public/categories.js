const categoryEl = document.querySelector('.categories')

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

let signUpBtn = document.querySelector('.signup-btn')
async function getUserByName() {

  const userName = await JSON.parse(window.localStorage.getItem('user'));
  signUpBtn.innerHTML = `Hello, ${userName.userName}`;

}
getUserByName() 

async function fetchCategories() {
  const response = await fetch('/categories-data')

  if (response.status !== 200) {
    Notiflix.Notify.failure('Category was not found')
    return;
  }

  const categories = await response.json()
  console.log(categories);

  categories.map((category) => {
    categoryEl.insertAdjacentHTML('beforeend', categoryMarkUp(category))
  })
}
fetchCategories()

function categoryMarkUp(category) {
  const link = `/categories/products?categoryId=${category._id}`;
  console.log(link);
  return `
  <div class="card card-categories" style="width: 22rem">
    <a class="card-categories__link" href="${link}">
      <img src="${category.image}" class="card-img-top" alt="choose a category" />
      <div class="card-body">
        <h2 class="card-title">${category.title}</h2>
      </div>
    </a>
  </div> `
}
