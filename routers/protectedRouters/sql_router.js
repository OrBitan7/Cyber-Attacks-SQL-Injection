const { Router } = require('express');


const protectedSqlRouter = new Router();
protectedSqlRouter.get('/', (req, res) => {