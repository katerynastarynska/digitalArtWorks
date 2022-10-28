console.log("hello")

const formEl = document.querySelector(".signup-form");
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;
    const name = formElements.nameId.value
    const email = formElements.emailId.value;
    const password = formElements.passwordId.value;
    const passRepeat = formElements.passRepeatId.value;
    const terms = formElements.checkbox.checked;
    const formData = {
        name, email, password, passRepeat, terms
    }
    console.log(formData)
}
