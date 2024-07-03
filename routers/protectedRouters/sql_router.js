const { Router } = require('express');
const { P_getLogin, P_login, P_getProducts,P_getProductsList } = require('../../controllers/protectedSQL');

const protectedSqlRouter = new Router();
protectedSqlRouter.get('/login', P_login)
protectedSqlRouter.get('/products', P_getProductsList)
protectedSqlRouter.get('/:file', P_getLogin)



module.exports = { protectedSqlRouter };

