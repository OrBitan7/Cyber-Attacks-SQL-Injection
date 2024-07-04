const path = require('path');
const connection = require('../DB/SQLDB');
const {UserOrPassNotProvided, UsernameNotFound, IncorrectPassword} = require("../errors/errors");
const getLogin = async (req, res) => {
    const {file} = req.params;

    res.sendFile(path.join(__dirname, '..', 'public', `${file}.html`)); // todo not safe
}

const getProductsList = async (req, res) => {
    const {search} = req.query;
    const decodedSearch = decodeURIComponent(search);
    if (decodedSearch === "") {
        const query = `SELECT id, product_name, price
                       FROM defaultdb.un_protected_products ;`;
        connection.query(query, (err, results) => {
            if (err) throw err;
            return res.status(200).json({results});
        });
    }
    else{
        const query = `SELECT id, product_name, price
                       FROM defaultdb.un_protected_products 
                        WHERE product_name LIKE '${decodedSearch}';`;
        console.log(query);
        connection.query(query, (err, results) => {
            if (err) throw err;
            return res.status(200).json({results});
        });
    }
}
const login = async (req, res, next) => {
    const { username, password } = req.query;
    if (!username || !password) return next(new UserOrPassNotProvided());
    const query=`SELECT * FROM defaultdb.un_protected_users WHERE username = '${username}' AND password = '${password}';`;
    connection.query(query, (err, results) => {
        if (err) return next( new Error("you hackin'?"));
        if(results.length === 0){
            const query_username=`SELECT * FROM defaultdb.un_protected_users WHERE username = '${username}';`;
            connection.query(query_username, (errUserName, resUserName) => {
                if(resUserName.length === 0) return next(new UsernameNotFound(username));
                else return next(new IncorrectPassword());
            });
        } else return res.status(200).json({ message: results });
    });


}
module.exports = { getLogin ,login,getProductsList};
