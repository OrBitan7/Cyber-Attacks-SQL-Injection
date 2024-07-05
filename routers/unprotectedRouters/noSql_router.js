const { Router } = require('express');
const { login } = require('../../controllers/unprotectedNoSQL');
const express = require("express");
const {join} = require("path");

const unprotectedNoSqlRouter = new Router();
unprotectedNoSqlRouter.use('/', express.static(join(__dirname, '../../public/unprotectedSQL')));
unprotectedNoSqlRouter.get('/login', login);
// unprotectedNoSqlRouter.post('/users', login);



module.exports = { unprotectedNoSqlRouter };