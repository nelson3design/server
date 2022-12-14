

const Comment = require('../models/commentModel')
const Product = require('../models/productModel')
const fs = require('fs')

module.exports = {

    async createComment(req, res) {

        try {
            const { nome,email, text, idProduct,note } = req.body
            let file 
            if(req.file){
                file = req.file.filename
            }else{
                file 
            }

            const comment = await Comment.create({ idProduct,nome, email, text,file,note })
            res.status(200).json({ msg: 'Comentario adicionado com sucesso' })

        } catch (error) {
            res.status(400).send("error no servidor");

        }

    },

    async allComment(req, res) {
      
        try {

            const coments = await Comment.find()

            res.status(200).json(coments)

        } catch (error) {
            res.status(400).json(error)
        }
    },


    async oneComment(req, res) {
        try {
            const { id } = req.params
            const comment = await Comment.findById(id)
            return res.status(200).json(comment)
          
        } catch (error) {
            res.status(400).json(error)
        }
    },

    async productComments(req, res) {
        try {
            const { idProduct } = req.params
            const comment = await Comment.find({ idProduct: idProduct })
            return res.status(200).json(comment)

        } catch (error) {
            res.status(400).json(error)
        }
    },
    async commentProduct(req, res) {
        const result = await Product.aggregate(
            [
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'idProduct',
                        as: 'comment'
                    }
                },
                { $unwind: '$comment' }, // retorna um objeto
                // { $match: { title: 'iphone 12'} } // buscar um usuario especifico
            ]
        )
        res.status(200).json(result)
    },

}





