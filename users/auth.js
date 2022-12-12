const jwt = require('jsonwebtoken');
const SECRECT_KEY = "SECRECT_KEY"

async function auth(req, res, next) {
    const cookies = req.cookies;
    console.log("cookies", cookies);
    if (cookies.token) {
        try {
            const verifiedToken = await jwt.verify(cookies.token, SECRECT_KEY)
            console.log("verifiedToken", verifiedToken)
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
        SECRECT_KEY,
        { expiresIn: "1h" }
    )
}

module.exports = {
    auth,
    createToken
}