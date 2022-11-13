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
    throw 'unable to create a new user, please check your information'
  }
}

module.exports = {
  saveUser
}