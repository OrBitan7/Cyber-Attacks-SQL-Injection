const { PasswordNotProvided, UsernameNotProvided, UserAndPassNotProvided, IncorrectPassword } = require('./error400')
const {UsernameNotFound} = require('./error404')

module.exports = {PasswordNotProvided, UsernameNotProvided, UserOrPassNotProvided: UserAndPassNotProvided, UsernameNotFound, IncorrectPassword }