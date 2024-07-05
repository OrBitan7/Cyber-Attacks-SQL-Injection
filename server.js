const express = require('express');
const app = express();
const {unprotectedSqlRouter} = require('./routers/unprotectedRouters/sql_router');
const {unprotectedNoSqlRouter} = require("./routers/unprotectedRouters/noSql_router");
const {protectedNoSqlRouter} = require("./routers/protectedRouters/noSql_router");
const {protectedSqlRouter} = require('./routers/protectedRouters/sql_router');
const {join} = require("path");
const {errorHandler} = require("./middleware/errorHandler");
require('express-async-errors');
const connectNoSQL = require("./DB/noSQLDB");
const port = process.env.PORT || 3000;

connectNoSQL();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(join(__dirname, 'public')));
app.use('/unprotectedSQL', unprotectedSqlRouter);
app.use('/protectedSQL', protectedSqlRouter);
app.use('/unprotectedNoSQL', unprotectedNoSqlRouter);
app.use('/protectedNoSQL', protectedNoSqlRouter);
app.all('*',(req, res,next) => {// todo fix this

});




app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));


