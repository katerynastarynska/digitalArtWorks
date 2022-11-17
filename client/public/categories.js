console.log("category")
const categoryEl = document.querySelector('.categories')
console.log(categoryEl)

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
    return `
<div class="card card-categories" style="width: 22rem">
    <a class="card-categories__link" href="#">
        <img src=${category.image} class="card-img-top" alt="choose a category">
        <div class="card-body">
            <h2 class="card-title">${category.title}</h2>
        </div>
</div>`
}
