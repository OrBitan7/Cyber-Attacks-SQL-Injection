const { Router } = require('express');
const { getLogin } = require('../../controllers/unprotectedNoSQL');

const unprotectedNoSqlRouter = new Router();
unprotectedNoSqlRouter.get('/', getLogin)


module.exports = { unprotectedNoSqlRouter };