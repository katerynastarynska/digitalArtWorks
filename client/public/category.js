console.log("category")
const categoryEl = document.querySelector('.categories')
console.log(categoryEl)

async function fetchCategories() {
    const data = await fetch('/categories-data')
    console.log('>>>> ui categories >>>>', data)
    const categories = await data.json()
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

// function categoryMarkUp(category) {
//     return `
// <h2>${category.title}</h2>
// <div class="category__list">
//     <a class="category__item" href="#">
//         <div class="card best-sellers__card" style="width: 24rem">
//         </div>
//     </a>
// </div>
// `
// } 