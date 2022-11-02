const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

module.exports.checkUser = (req, res, next) => {
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
                    const user = await User.findById(decodedToken.id);
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

