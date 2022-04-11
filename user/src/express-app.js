const express = require('express');
const cors  = require('cors');
const { user } = require('./api');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    //api
    user(app);

    //error handling
    app.use(HandleErrors);
}