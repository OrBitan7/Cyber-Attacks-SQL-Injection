const mongoose = require('mongoose');
require('dotenv').config();

const connectNoSQL = () => {
    mongoose
        .connect(process.env.NOSQLDB_URL)
        .then(() => {
            console.log('Mongoose connected 🍃');
        })
        .catch((error) => {
            console.log(error);
        });
}
module.exports = connectNoSQL;