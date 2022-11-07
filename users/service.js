const User = require('./model');
async function saveUser(userData) {
  const user = new User(userData)
  try {
    await user.save()
  } catch (error) {
    throw 'unable to create a new user, please check your information'
  }}

module.exports = {
  saveUser
}