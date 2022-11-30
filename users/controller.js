const service = require('./service');
const path = require('path');
const { auth } = require('./auth')

async function loginPost(req, res) {
    const body = req.body;
    if (!body.email || !body.password || body.length === 0) {
        res.status(400).json({
            error: "Please check your information"
        })
        return;
    }
    try {
        const { userId, token, userName, userEmail, userAddress } = await service.loginUser(body);
        console.log('>> user log in >>>');
        if (userId && token) {
            res.cookie('token', token, { maxAge: 1800000 })
            res.status(200).json({
                userId,
                userName,
                userEmail,
                userAddress,
                token
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
}

async function signupPost(req, res) {
    try {
        await service.saveUser(req.body)
        console.log(req.body);
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
    res.status(200).json({
        message: 'User created successfully'
    })
}

async function getOneUserById(req, res) {
    try {
        const user = await service.getUserById(req.params.id);
        console.log('>>> found user by id >>>> ', user);
        res.json(user);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
}

async function renderUser(req, res) {
    try {
        const user = await service.getUserById(req.userId);
        res.sendFile(path.join(__dirname, '../client/user.html'));
    } catch (error) {
        res.redirect('/login')
        res.end()
        return
    }
}

async function renderLogin(req, res) {
    res.sendFile(path.join(__dirname, '../client/login.html'));
}

async function renderSignup(req, res) {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
}

module.exports = {
    loginPost,
    signupPost,
    getOneUserById,
    renderUser,
    renderLogin,
    renderSignup
}