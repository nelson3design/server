const UserAdmin = require('../models/userAdminModel')
require('dotenv').config()
const express = require('express')
const Pedido = require('../models/orderModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.secret
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge,
    });
};


module.exports = {

  
    async privateLogin(req, res) {
        const id = req.params.id

        const user = await UserAdmin.findById(id, '-password') // excluir a senha ('-password')

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }
       
        res.status(200).json({ user })
    },

    async userAdmin(req, res) {
        const id = req.body.id

        const user = await UserAdmin.findById(id)

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }

        res.status(200).json({ user })
    },

    // criar os usuarios add-user
    async userAdminRegister(req, res) {

        const { nome, email, password, confirmPassword } = req.body


        if (!nome) {
            res.status(422).json({ msg: 'o nome é obrigatório!' })
        }
        if (!email) {
            res.status(422).json({ msg: 'o email é obrigatório!' })
        }
        if (!password) {
            res.status(422).json({ msg: 'a senha é obrigatório!' })
        }

        if (password !== confirmPassword) {
            res.status(422).json({ msg: 'as senhaa não conferem!' })
        }


        // check if user exist

        const userExist = await UserAdmin.findOne({ email: email })

        if (userExist) {
            res.status(422).json({ msg: 'email já existe, por favor utilize outro email!' })
        }

        // create password

        const salt = await bcrypt.genSalt(12)

        const passwordHash = await bcrypt.hash(password, salt)


        // create user

        const user = new UserAdmin({
            nome,
            email,
            password: passwordHash
        })


        try {

            await user.save()

            const token = createToken(user._id);

            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            res.status(200).json({ msg: 'Usuário criado com sucesso!' })

        } catch (error) {
            res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })

        }


    },

    async userAdminLogin(req, res) {
        const { nome, password } = req.body


        if (!nome) {
            res.status(422).json({ msg: 'o email é obrigatório!' })
        }
        if (!password) {
            res.status(422).json({ msg: 'a senha é obrigatório!' })
        }

        // check if user exist

        const user = await UserAdmin.findOne({ nome: nome })

        if (!user) {
            res.status(422).json({ msg: 'Usuário não cadastrado!' })
        }

        // check if password match

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ msg: 'Senha inválida!' })
        }

        try {

           

            const token = createToken(user._id);
            res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user.nome, id: user._id, status: true, token });

            // res.redirect('/user')

        } catch (error) {
            res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })

        }

    }
}

