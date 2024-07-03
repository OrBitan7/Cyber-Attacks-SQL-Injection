const express = require('express');
const app = express();
const {unprotectedSqlRouter} = require('./routers/unprotectedRouters/sql_router');
const {join} = require("path");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/unprotectedSQL', unprotectedSqlRouter);
app.use('/static', express.static(join(__dirname, 'public')));




app.listen(port, () => console.log(`Listening on port ${port}`));


