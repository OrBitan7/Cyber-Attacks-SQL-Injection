const { Router, } = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const {P_login} = require("../../controllers/protectedNoSQL");
const protectedNoSqlRouter = new Router();

const express = require("express");
const {join} = require("path");

protectedNoSqlRouter.use('/', express.static(join(__dirname, '../../public/protectedNoSQL')));
protectedNoSqlRouter.use(mongoSanitize({
    onSanitize: ({ req , key }) => {
        throw new Error(`SanitizationError: Invalid input in ${key}`);
    }
}));
protectedNoSqlRouter.get('/login', P_login);


module.exports = { protectedNoSqlRouter };