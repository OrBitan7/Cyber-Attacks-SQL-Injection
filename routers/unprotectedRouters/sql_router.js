const { Router } = require('express');
const { login, getProductsList } = require('../../controllers/unprotectedSQL');
const express = require("express");
const {join} = require("path");

const unprotectedSqlRouter = new Router();
unprotectedSqlRouter.use('/', express.static(join(__dirname, '../../public/unprotectedSQL')));
unprotectedSqlRouter.get('/login', login)
unprotectedSqlRouter.get('/products', getProductsList)



module.exports = { unprotectedSqlRouter };

