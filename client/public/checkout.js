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
  return `
    <li><a class="dropdown-item" href="${categoryLink}">${category.title}</a></li>
    `
}

fetchCategoriesById()

let signUpBtn = document.querySelector('.signup-btn');

async function getUserByName() {

  const userName = await JSON.parse(window.localStorage.getItem('user'));
  signUpBtn.innerHTML = `Hello, ${userName.userName}`;

}
getUserByName()

const orderDetails = document.querySelector('.order-details')
console.log(orderDetails);
const order = JSON.parse(window.localStorage.getItem('product-order'))
console.log(order);
orderDetails.insertAdjacentHTML('beforeend', orderMarkUp(order))

function orderMarkUp(order) {
  let price = parseFloat(order.option.substring(order.option.indexOf('$') + 1, order.option.lastIndexOf(')'))).toFixed(2);

  let orderTotal = document.querySelector('.order-total')
  orderTotal.innerText = `$${price * parseFloat(order.quantity).toFixed(2)}`
  console.log(orderTotal);

  let checkoutBtn = document.querySelector('.checkout-btn')
  console.log(checkoutBtn);
  let orderSummary = document.querySelector('.checkout')
  orderSummary.textContent = `Checkout: ${orderTotal.innerText}`
  console.log(orderSummary);

  return `
<th scope="row">
  <div class="flex-column ms-2">
    <p class="mb-2">Title: ${order.title}</p>
    <p class="mb-2">Size and shape: ${order.option}</p>
    <p class="mb-2">Your comment: ${order.comment || ''}</p>
  </div>
</th>
<td class="align-middle">
  <p class="mb-0" style="font-weight: 500">Digital</p>
</td>
<td class="align-middle">
  <div class="d-flex flex-row">
    <input
      id="form1"
      min="0"
      name="quantity"
      value="${order.quantity}"
      type="number"
      class="form-control form-control-sm"
      style="width: 50px"
    />
  </div>
</td>
<td class="align-middle">
  <p class="mb-0" style="font-weight: 500">$${price}</p>
</td>
`
}

let customerName = document.getElementById('typeName');
customerName.value = await JSON.parse(window.localStorage.getItem('user'))?.userName;

let customerEmail = document.getElementById('typeExp');
customerEmail.value = await JSON.parse(window.localStorage.getItem('user'))?.userEmail;