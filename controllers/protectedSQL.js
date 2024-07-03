const path = require('path');
const connection = require('../DB/SQLDB');
const mysql = require('mysql2');
const {UserOrPassNotProvided, UsernameNotFound, IncorrectPassword} = require("../errors/errors");
const P_getLogin = async (req, res) => {
    const {file} = req.params;

    res.sendFile(path.join(__dirname, '..', 'public', `${file}.html`)); // todo not safe
}

const P_getProductsList = async (req, res) => {
    const {search} = req.query;
    const decodedSearch = decodeURIComponent(search);
    const searchSafe = mysql.escape(decodedSearch);
    if (decodedSearch === "") {
        const query = `SELECT id, product_name, price FROM defaultdb.protected_products ;`;
        connection.query(query, (err, results) => {
            if (err) throw err;
            return res.status(200).json({results});
        });
    } else{
        const query = `SELECT id, product_name, price
                       FROM defaultdb.un_protected_products
                        WHERE product_name LIKE ?;`;
        connection.execute(query,[searchSafe], (err, results) => {
            if (err) throw err;
            res.status(200).json({results});
        });
    }
}
const P_login = async (req, res) => {
    const { username, password } = req.query;
    // console.log(username, password);
    if (!username || !password) return res.status(401).json({ message: 'Missing Username or password' });
    const usernameSafe = mysql.escape(username);
    const passwordSafe = mysql.escape(password);
    const query=`SELECT * FROM defaultdb.un_protected_users WHERE username = ? AND password = ?;`;
    connection.execute(query,[usernameSafe, passwordSafe] ,(err, results) => {
        if (err) throw new err;
        if(results.length === 0){
            const query_username=`SELECT * FROM defaultdb.un_protected_users WHERE username = ?;`;
            connection.execute(query_username,[usernameSafe], (errUserName, resUserName) => {
                if(resUserName.length === 0) res.status(401).json({ message: 'Invalid username' });
                else res.status(401).json({ message: 'Invalid password' });
            });
            return;
        }
        return res.status(200).json({ message: results });
    });


}

module.exports = { P_getLogin ,P_login,P_getProductsList};
