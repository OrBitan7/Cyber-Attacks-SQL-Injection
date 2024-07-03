const path = require('path');
const connection = require('../DB/SQLDB');
const getLogin = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'usLogin.html'));
}
const getProducts = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
}

const login = async (req, res) => {
    const { username, password } = req.query;
    console.log(username, password);
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }
    const query=`SELECT * FROM defaultdb.un_protected_users WHERE username = '${username}';`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        if(results.length === 0){
            res.status(401).json({ message: 'Invalid username' })
            return;
        }
        if(results[0].password === password){return res.status(200).json({ message: results })}
        else res.status(401).json({ message: 'Invalid password' })
        // console.log('Data fetched:', results);
        //     console.log(results[0].password);

    });


}
module.exports = { getLogin ,login, getProducts};
