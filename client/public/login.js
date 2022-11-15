console.log('login');

const loginEl = document.querySelector('.login-form')
console.log(loginEl);
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
        // formEl.reset();
        console.log(response);
        if (response.status === 200) {
            window.location = '/user';
        } else if (response.status !== 200) {
            const resBody = await response.json()
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