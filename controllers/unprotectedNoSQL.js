const model = require('../models/users.model');
const {UsernameNotFound} = require("../errors/errors");


const login = async (req, res, next) => {
    const name = req.query.username;
    const pass = req.query.password;
    console.log(name, pass);
    // const users = await model.find();

    const users = await model.find({username: name, password:pass});
    console.log(users);
    if(users.length === 0) return next(new UsernameNotFound(name));
    res.status(200).json({ message: users });
    res.send();
}

module.exports = { login };
