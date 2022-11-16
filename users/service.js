const User = require('./model');
const bcrypt = require('bcryptjs');
const { createToken } = require('./auth');

async function saveUser(userData) {
  try {
    const password = await bcrypt.hashSync(userData.password, 10)
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
    const token = await createToken(user.id)
    return {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userAddress: user.address,
      token
    }
  } catch (error) {
    throw error
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({
      _id: userId, 
    });
    return user
  } catch (error) {
    throw "User not found"
  }
}

module.exports = {
  saveUser,
  loginUser, 
  getUserById
}