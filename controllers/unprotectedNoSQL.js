const model = require('../models/users.model');
const {UsernameNotFound} = require("../errors/errors");
//GET Findone:
// const login = async (req, res, next) => {
//
//     const {username, password} = req.query;
//     console.log(req.query);
//
//     // const users = await model.findOne({username, password});
//     const users = await model.find({username, password});
//     console.log(users);
//     if(!users) {
//         return next(new UsernameNotFound(username));
//     }
//     else {
//         res.status(200).json({message: "Success"});
//         res.send();
//     }


//// GET: find }
const login = async (req, res, next) => {

    const {username, password} = req.query;
    console.log(req.query);

    const users = await model.find({username, password});
    console.log(users);
    if(users && users.length === 0) {
        return next(new UsernameNotFound(username));
    }
    else res.status(200).json({message: "Success"});

}
// POST:
// const login = async (req, res, next) => {
//
//     const {username, password} = req.body;
//
//     const users = await model.findOne({username, password});
//     console.log(req.body);
//     console.log(users);
//     if(!users) {
//         return next(new UsernameNotFound(username));
//     }
//     else {
//         res.status(200).json({message: "Success"});
//         res.send();
//     }
// }
module.exports = { login };
