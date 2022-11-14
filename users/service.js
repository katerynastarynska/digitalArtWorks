const User = require('./model');
const bcrypt = require('bcryptjs');

async function saveUser(userData) {
  try {
    const password = await bcrypt.hashSync(userData.password, 2)
    const user = new User({
      ...userData,
      password
    })

    await user.save()
  } catch (error) {
    throw 'Unable to create a new user, please check your information'
  }
}

async function loginUser(userData) {
  try {
    const user = await User.findOne({
      email: userData.email
    });
    if (!user) {
      throw {
        error: "Please check your login information",
        code: 404,
      }
    }
    const passMatch = await bcrypt.compareSync(userData.password, user.password)
    if (!passMatch) {
      throw {
        error: "Please check your login information",
        code: 401,
      }
    }
    return user.id
  } catch (error) {
    throw error
  }
}
module.exports = {
  saveUser,
  loginUser
}