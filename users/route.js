const { loginPost,
    signupPost,
    getOneUserById,
    renderUser,
    renderLogin,
    renderSignup 
} = require('./controller');

const { 
    LOGIN, 
    SIGN_UP,
    USER,  
    USER_BY_ID
} = require('./constants');

module.exports = (app) => {
    app.get(LOGIN, renderLogin),
    app.post(LOGIN, loginPost),
    app.get(SIGN_UP, renderSignup),
    app.post(SIGN_UP, signupPost),
    app.get(USER, renderUser),
    app.get(USER_BY_ID, getOneUserById)
}
