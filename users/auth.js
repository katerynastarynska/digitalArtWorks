const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const cookies = req.cookies;
    console.log(cookies);
    if (cookies.token) {
        try {
            const verifiedToken = await jwt.verify(cookies.token, "SECRET_KEY")
            console.log(verifiedToken)
            if (verifiedToken && verifiedToken.userId) {
                req.userId = verifiedToken.userId
                next()
            } else {
                res.status(401).redirect('/login')
                res.end()
            }
        } catch (error) {
            res.status(401).redirect('/login')
            res.end()
            return;
        }
    } else {
        res.status(401).redirect('/login')
        res.end()
    }
}

async function createToken(userId) {
    return await jwt.sign(
        { userId: userId },
        "SECRET_KEY",
        { expiresIn: "1h" }
    )
}

module.exports = {
    auth,
    createToken
}