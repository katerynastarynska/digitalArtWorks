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

async function selectCategory() {
    const categoryContainer = document.querySelector("#selectCategory");
    const response = await fetch("/categories-data");
    if (response.status !== 200) {
        Notiflix.Notify.failure("Categories was not found");
        return;
    }
    const categories = await response.json();

    let categoriesInnerHtml = "";
    if (categories && categories[0]) {
        categories.unshift({ title: 'Select category' })

        categories.forEach((category) => {
            categoriesInnerHtml += `<option value=${category.title}>${category.title}</option>`;
        });
    }

    categoryContainer.innerHTML = categoriesInnerHtml;
    // const productSelectOptions = [
    //     { id: 1, title: "Square 10x10 inches (CAD $15.99)" },
    //     { id: 2, title: "Rectangle 10x12 inches (CAD $19.99)" },
    //     { id: 3, title: "Circle 10 inches (CAD $24.99)" },
    //     { id: 4, title: "Oval 10x14 inches (CAD $25.99)" },
    // ];
    // const addSelectOptionsBtn = document.querySelector(
    //     "#add-product-select-options"
    // );

    // const selectProductOptionsContainer = document.querySelector(
    //     "#select-production-options-container"
    // );
    // let productOptionItemHtml = `
    // <div class="input-group">
    // <select class="form-control" id="select-production-options">`;
    // if (productSelectOptions && productSelectOptions[0]) {
    //     productSelectOptions.push({ title: 'Select option' })
    //     productSelectOptions.forEach((option, index) => {
    //         if (index === 0) {
    //             productOptionItemHtml += `<option value="Select option">Select option</option>`;
    //         } else {
    //             productOptionItemHtml += `<option value=${option.title}>${option.title}</option>`;
    //         }
    //     });
    //     productOptionItemHtml += `</select>
    //     <div class="input-group-append">
    //         <button class="btn btn-primary" type="button">
    //             <i class="bi bi-trash"></i>
    //         </button>
    //     </div>
    //     </div>`;
    // } else {
    //     productOptionItemHtml += `</select>
    //     <div class="input-group-append">
    //         <button class="btn btn-primary" type="button">
    //             <i class="bi bi-trash"></i>
    //         </button>
    //     </div>
    // </div>
    //   `;
    // }

    // selectProductOptionsContainer.innerHTML = productOptionItemHtml;
    // // let productOptions = [productOptionItemHtml];

    // addSelectOptionsBtn.onclick = function (evt) {
    //     evt.preventDefault();
    //     //   productOptions.push(productOptionItemHtml);
    //     selectProductOptionsContainer.innerHTML += productOptionItemHtml;
    // };
}
selectCategory()

let imageUrl = '';

const firebaseConfig = {
    apiKey: "AIzaSyBgRVqyJZYhYV4BHYwUOGI_rX4A8FULz04",
    authDomain: "digitalartworks-e372a.firebaseapp.com",
    projectId: "digitalartworks-e372a",
    storageBucket: "digitalartworks-e372a.appspot.com",
    messagingSenderId: "14631068224",
    appId: "1:14631068224:web:5231c6effe77cc60e175a5",
    measurementId: "G-ZP2RH95FPV"
};

firebase.initializeApp(firebaseConfig);
const uploadImageBtn = document.querySelector('#upload');
uploadImageBtn.addEventListener('click', uploadImage)

const formEl = document.querySelector(".add-product-form");
formEl.addEventListener('submit', onFormSubmit);

async function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#productImage").files[0];
    const name = +new Date() + "-" + file.name;

    const metadata = {
        contentType: file.type
    };

    const uploadTaskSnapshot = await ref.child(name).put(file, metadata);
    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

    console.log('>>> url >>>>', downloadURL);
    imageUrl = downloadURL;
    return downloadURL;
}

async function onFormSubmit(evt) {
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;
    const title = formElements.productNameId.value;
    const price = formElements.productPriceId.value;
    const category = formElements.selectCategory.value;
    const quantity = formElements.productQuantityId.value;
    const options = formElements.productOptionId.value;
    const image = imageUrl;
    const isBestseller = formElements.checkbox.checked;
    const personalization = formElements.personalizationId.value;
    const description = formElements.descriptionId.value;

    const formData = {
        title,
        price,
        category,
        quantity,
        options,
        image,
        isBestseller,
        personalization,
        description
    }
    console.log(formData);
    const validatedProductForm = isFormDataValid(formData);

    if (validatedProductForm) {
        const response = await fetch('/add-product-data', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        })
        formEl.reset();

        if (response.status !== 200) {
            Notiflix.Notify.failure('Unable to add new product, please check your information!');
        }
    }
}

function isFormDataValid(formData) {
    if (!formData.image) {
        Notiflix.Notify.failure('Please add image');
        return false;
    }
    if (!formData.title || formData.title === "") {
        Notiflix.Notify.failure('Please provide product title');
        return false;
    }
    if (!formData.price || formData.price === "") {
        Notiflix.Notify.failure('Please provide product price');
        return false;
    }
    if (!formData.quantity || formData.quantity === "") {
        Notiflix.Notify.failure('Please provide product quantity');
        return false;
    }
    if (!formData.options || formData.options === "") {
        Notiflix.Notify.failure('Please provide product options');
        return false;
    }
    if (formData.category === 'Select category') {
        Notiflix.Notify.failure('Please provide category');
        return false;
    }
    return true;
}