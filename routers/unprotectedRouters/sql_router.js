const { Router } = require('express');
const { getLogin, login, getProducts,getProductsList } = require('../../controllers/unprotectedSQL');

const unprotectedSqlRouter = new Router();
unprotectedSqlRouter.get('/login', login)
// unprotectedSqlRouter.get('/products', getProducts)
unprotectedSqlRouter.get('/products', getProductsList)
unprotectedSqlRouter.get('/:file', getLogin)



module.exports = { unprotectedSqlRouter };

