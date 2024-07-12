const model = require('../models/users.model');
const {UsernameNotFound} = require("../errors/errors");



const P_login = async (req, res, next) => {
        const {username, password} = req.query;
        console.log(req.query);

        const users = await model.find({username, password});
        console.log(users);
        if(users && users.length === 0) {
            return next(new UsernameNotFound(username));
        }
        else {
            res.status(200).json({message: "Success"});
        }
}
module.exports = { P_login };
