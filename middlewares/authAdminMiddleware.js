const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserAdmin = require('../models/userAdminModel')

module.exports.checkUserAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    const secret = process.env.secret
    if (token) {
        jwt.verify(
            token,
            secret,
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await UserAdmin.findById(decodedToken.id);
                    if (user) res.json({ status: true, user: user });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        // res.json({ status: false });
        // next();

        // res.redirect('/login')
        next();
    }
};

