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
    console.log(categoryLink);
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