class DataError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class PasswordNotProvided extends DataError {
  constructor() {
    super(`Password not provided`);
    this.name = this.constructor.name;
  }
}

class UsernameNotProvided extends DataError {
  constructor() {
    super(`Username not provided`);
    this.name = this.constructor.name;
  }
}

class IncorrectPassword extends DataError {
  constructor() {
    super(`Incorrect password`);
    this.name = this.constructor.name;
  }
}

class UserAndPassNotProvided extends DataError {
  constructor() {
    super(`Username and password are not provided`);
    this.name = this.constructor.name;
  }
}
module.exports = { PasswordNotProvided, UsernameNotProvided, UserAndPassNotProvided, IncorrectPassword};