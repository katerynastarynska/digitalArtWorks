console.log("hello")

const formEl = document.querySelector(".signup-form");
formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;
    const name = formElements.nameId.value;
    const email = formElements.emailId.value;
    const password = formElements.passwordId.value;
    const passRepeat = formElements.passRepeatId.value;
    const terms = formElements.checkbox.checked;
    const formData = {
        name,
        email,
        password,
        passRepeat,
        terms,
    }
    const validatedForm = isFormDataValid(formData);

    if (validatedForm) {
        console.log(formData);
       const response = await fetch('/signup', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        });
        formEl.reset();
        console.log(response)
        if(response.status !==200) {
            const resBody = await response.json()
            console.log(resBody)
            Notiflix.Notify.failure('user with such email already exists');
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
    if (formData.password === !formData.passRepeat) {
        Notiflix.Notify.failure('Your passwords doesn`t math');
        return false;
    }
    if (!formData.terms) {
        Notiflix.Notify.failure('Please agree all statements in "Terms of service"');
        return false;
    }
    return true;
}
