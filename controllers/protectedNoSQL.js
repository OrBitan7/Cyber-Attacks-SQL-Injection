const model = require('../models/users.model');
const {UsernameNotFound} = require("../errors/errors");



const P_login = async (req, res, next) => {
        const {username, password} = req.query;

        const users = await model.find({username, password});
        if(users && users.length === 0) {
            return next(new UsernameNotFound(username));
        }
        else res.redirect('/protectedNoSQL/prod.html');
}
module.exports = { P_login };
