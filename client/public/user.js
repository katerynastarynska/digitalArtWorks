const userInfo = document.querySelector('.user-info')

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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('userId');

async function fetchUser() {
    const response = await fetch(`/user/${userId}`);

    if (response.status !== 200) {
        Notiflix.Notify.failure('User was not found')
        return;
    }
    const user = await response.json();

    console.log('>>>>> found user by id in ui >>>>', user);
    userInfo.insertAdjacentHTML('beforeend', userMarkUp(user))

}
fetchUser()

function userMarkUp(user) {
    return `
    <h2 class="user-title">Hello, ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
    <p class="text-white-50"></p>
    <div class="card-body p-4">
      <h6>Your Information</h6>
      <hr class="mt-0 mb-4" />
      <div class="row pt-1">
        <div class="col-6 mb-3">
          <h6>Email</h6>
          <p class="text-muted">${user.email}</p>
        </div>
        <div class="col-6 mb-3">
          <h6>Address</h6>
          <p class="text-muted">${user.address}</p>
        </div>
      </div>
    </div>
    `
}
