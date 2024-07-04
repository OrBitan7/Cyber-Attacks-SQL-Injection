const { Router } = require('express');
const { P_login,P_getProductsList } = require('../../controllers/protectedSQL');
const express = require("express");
const {join} = require("path");

const protectedSqlRouter = new Router();
protectedSqlRouter.use('/', express.static(join(__dirname, '../../public/protectedSQL')));
protectedSqlRouter.get('/login', P_login)
protectedSqlRouter.get('/products', P_getProductsList)



module.exports = { protectedSqlRouter };

