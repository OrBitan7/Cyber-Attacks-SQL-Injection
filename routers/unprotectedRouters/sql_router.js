const { Router } = require('express');
const { getLogin, login, getProducts, getFile } = require('../../controllers/unprotectedSQL');

const unprotectedSqlRouter = new Router();
unprotectedSqlRouter.get('/', getLogin)
unprotectedSqlRouter.get('/login', login)
unprotectedSqlRouter.get('/products', getProducts)


module.exports = { unprotectedSqlRouter };

