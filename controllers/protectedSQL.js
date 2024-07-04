const path = require('path');
const connection = require('../DB/SQLDB');
const mysql = require('mysql2');
const {UserOrPassNotProvided, UsernameNotFound, IncorrectPassword} = require("../errors/errors");

const P_getProductsList = async (req, res, next) => {
    const {search} = req.query;
    const decodedSearch = decodeURIComponent(search);
    if (decodedSearch === "") {
        const query = `SELECT id, product_name, price FROM defaultdb.un_protected_products ;`;
        connection.query(query, (err, results) => {
            if (err) next(new Error());
            return res.status(200).json({results});
        });
    } else{
        const query = `SELECT id, product_name, price
                       FROM defaultdb.un_protected_products
                        WHERE product_name LIKE ?;`;
        const searchPattern = `%${decodedSearch}%`;
        console.log(query , searchPattern);
        connection.execute(query,[searchPattern], (err, results) => {
            if (err) return next( new Error("you hackin'?"));
            res.status(200).json({results});
        });
    }
}
const P_login = async (req, res, next) => {
    const { username, password } = req.query;
    if (!username || !password) return next(new UserOrPassNotProvided());
    const query=`SELECT * FROM defaultdb.protected_users WHERE username = ? AND password = ?;`;
    connection.execute(query,[username, password] ,(err, results) => {
        if (err) return next( new Error("you hackin'?"));
        if(results.length === 0){
            const query_username=`SELECT * FROM defaultdb.protected_users WHERE username = ?;`;
            connection.execute(query_username, [username], (errUserName, resUserName) => {
                if(resUserName.length === 0) next(new UsernameNotFound(username));
                else next(new IncorrectPassword());
            });
        } else res.status(200).json({ message: results });
    });


}

module.exports = { P_login,P_getProductsList};
