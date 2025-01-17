class NotFound extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 404;
  }
}

  class UsernameNotFound extends NotFound {
  constructor(props) {
    super(`User '${props}' was not found`);
    this.name = this.constructor.name;
    this.prop = props;
  }
}
 class Unauthorized extends NotFound {
  constructor() {
    super(`User was Unauthorized`);
    this.name = this.constructor.name;
  }
}

module.exports = { UsernameNotFound, Unauthorized };
