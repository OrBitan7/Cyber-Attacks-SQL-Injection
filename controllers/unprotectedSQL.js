const path = require('path');
const connection = require('../DB/SQLDB');
const {UserOrPassNotProvided, UsernameNotFound} = require("../errors/errors");
const getLogin = async (req, res) => {
    const {file} = req.params;

    res.sendFile(path.join(__dirname, '..', 'public', `${file}.html`)); // todo not safe
}
const getProducts = async (req, res) => {

    // const search = req.query;
    // console.log(search);
    // if (!search) {
    //     const query = `SELECT id, product_name, price
    //                    FROM defaultdb.un_protected_products ;`;
    //     connection.query(query, (err, results) => {
    //         if (err) throw err;
    //         return res.status(200).json({message: results});
    //     });
    // }
    // else{
    //     const query = `SELECT id, product_name, price
    //                    FROM defaultdb.un_protected_products
    //                     WHERE id LIKE '${search}';`;
    //     connection.query(query, (err, results) => {
    //         if (err) throw err;
    //         return res.status(200).json({message: results});
    //     });
    // }
}
const getProductsList = async (req, res) => {
    const {search} = req.query;
    const decodedSearch = decodeURIComponent(search);
    if (decodedSearch === "") {
        const query = `SELECT id, product_name, price
                       FROM defaultdb.un_protected_products ;`;
        // console.log(query);
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
const login = async (req, res) => {
    const { username, password } = req.query;
    console.log(username, password);
    if (!username || !password) return res.status(401).json({ message: 'Missing Username or password' });

    const query=`SELECT * FROM defaultdb.un_protected_users WHERE username = '${username}' AND password = '${password}';`;
    connection.query(query, (err, results) => {
        if (err) throw new err;
        if(results.length === 0){
            const query_username=`SELECT * FROM defaultdb.un_protected_users WHERE username = '${username}';`;
            connection.query(query_username, (errUserName, resUserName) => {
                if(resUserName.length === 0)  res.status(401).json({ message: 'Invalid username' });
                else res.status(401).json({ message: 'Invalid password' });
            });
            return;
        }
            return res.status(200).json({ message: results });
    });


}
module.exports = { getLogin ,login,getProductsList, getProducts};
