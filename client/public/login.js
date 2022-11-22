const loginEl = document.querySelector('.login-form')
console.log(loginEl);

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

loginEl.addEventListener('submit', loginUser);

async function loginUser(evt) {
    evt.preventDefault();

    const formData = {
        email: document.getElementById('emailId').value,
        password: document.getElementById('passwordId').value,
    }
    console.log(formData);

    const validatedLoginForm = isLoginFormDataValid(formData)
    if (validatedLoginForm) {
        console.log(formData);
        const response = await fetch('/login', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        });
        loginEl.reset();
        const userInfo = await response.json();
        console.log(userInfo);

        if (response.status === 200) {
            window.location = `/user?userId=${userInfo.userId}`;
            // window.location = '/user';
        } else if (response.status === 401) {
            const resBody = await response.json()
            Notiflix.Notify.failure('Unable to login, please check your information');
        } else if (response.status === 404) {
            const resBody = await response.json()
            Notiflix.Notify.failure('Unable to login, please check your information');
        } else {
            Notiflix.Notify.failure('Unable to login, please check your information');
        }
    }
}

function isLoginFormDataValid(formData) {
    if (!formData.email || formData.email === "") {
        Notiflix.Notify.failure('Please provide your email');
        return false;
    }
    if (!formData.email.includes('@')) {
        Notiflix.Notify.failure('Please provide a valid email');
        return false;
    }
    if (!formData.password || formData.password === "") {
        Notiflix.Notify.failure('Please provide your password');
        return false;
    }
    return true;
}


