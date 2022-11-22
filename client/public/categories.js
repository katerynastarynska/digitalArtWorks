import { fetchCategoriesById } from './util.m.js';

const categoryEl = document.querySelector('.categories')
console.log(categoryEl)

fetchCategoriesById();

async function fetchCategories() {
  const response = await fetch('/categories-data')
  console.log('>>>> ui categories >>>>', response)

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
