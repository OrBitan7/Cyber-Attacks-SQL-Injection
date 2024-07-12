const model = require('../models/users.model');
const {UsernameNotFound} = require("../errors/errors");

const login = async (req, res, next) => {

    const {username, password} = req.query;
    const users = await model.find({username, password});
    if(users && users.length === 0) {
        return next(new UsernameNotFound(username));
    }
    else res.redirect('/unprotectedNoSQL/prod.html');



}

module.exports = { login };
