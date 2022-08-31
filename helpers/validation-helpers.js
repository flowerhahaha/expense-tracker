const validator = require('validator')

function emailValidator (email, errors = []) {
  if (!validator.isEmail(email)) {
    errors.push({ message: 'Email address is invalid.' })
  }
  return errors
}

function passwordValidator (password, confirmPassword, errors = []) {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,20}$/
  if (!passwordReg.test(password)) {
    errors.push({ message: 'The password must be 8-20 characters long, contain letters and numbers.' })
    password = ''
    confirmPassword = ''
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'The password confirmation does not match.' })
  }
  return errors
}

module.exports = {
  emailValidator,
  passwordValidator
}