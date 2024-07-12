const { PasswordNotProvided, UsernameNotProvided, UserAndPassNotProvided, IncorrectPassword } = require('./error400')
const {UsernameNotFound, Unauthorized} = require('./error404')

module.exports = {PasswordNotProvided, UsernameNotProvided, UserOrPassNotProvided: UserAndPassNotProvided, UsernameNotFound, IncorrectPassword, Unauthorized }