const formEl = document.querySelector(".signup-form");
formEl.addEventListener('submit', onFormSubmit);

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

async function onFormSubmit(evt) {
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;
    const name = formElements.nameId.value;
    const email = formElements.emailId.value;
    const password = formElements.passwordId.value;
    const passRepeat = formElements.passRepeatId.value;
    const address = formElements.addressId.value;
    const terms = formElements.checkbox.checked;
    const formData = {
        name,
        email,
        password,
        passRepeat,
        address,
        terms,
    }
    const validatedForm = isFormDataValid(formData);

    if (validatedForm) {
        console.log(formData);
        const response = await fetch('/signup', {
            method: "POST",
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                terms: formData.terms,
            }),

            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        });
        formEl.reset();
        console.log(response)
        if (response.status !== 200) {
            const resBody = await response.json()
            Notiflix.Notify.failure('Unable to create a new user, please check your information!');
        }
    }
}

function isFormDataValid(formData) {
    if (!formData.name || formData.name === "") {
        Notiflix.Notify.failure('Please provide your name');
        return false;
    }
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
    if (!formData.passRepeat || formData.passRepeat === "") {
        Notiflix.Notify.failure('Please confirm your password');
        return false;
    }
    if (formData.password.length < 8) {
        Notiflix.Notify.failure('Your passwords should be at least 8 symbols');
        return false;
    }
    if (formData.password != formData.passRepeat) {
        Notiflix.Notify.failure('Your passwords doesn`t match');
        return false;
    }
  
    if (!formData.terms) {
        Notiflix.Notify.failure('Please agree all statements in "Terms of service"');
        return false;
    }
    return true;
}
