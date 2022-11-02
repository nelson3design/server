

const Product = require('../models/productModel')
const fs = require('fs')

module.exports = {

    // criar product


    async createProduct(req, res) {
        console.log(req.body)
       
        try {
            const { nome, description, preco, categoria, destaque } = req.body
             const file = req.file.filename       
          
            if (!nome) {
                res.status(422).json({ msg: 'o nome é obrigatorio' })
            }
           
            const productExist = await Product.findOne({ nome: nome })

            if (productExist) {
                res.status(422).json({ msg: 'Produto já existe, por favor use um outro Produto' })
            }
            const product = await Product.create({ file, nome, description, preco, categoria,destaque })
            res.status(200).json({ msg: 'Product registrado com sucesso' })

           // res.redirect('/')

        } catch (error) {
            res.status(400).send(error);

        }

    },
// lista todos os producto
    async allProduct(req, res) {
        try {
            const products = await Product.find()
            return res.status(200).json(products)
           //res.render('index', { products })
        } catch (error) {
            console.log(error)
        }
    },


    // lista 1 producto
    async oneProduct(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findById(id)
            return res.status(200).json(product)
            // res.render('index', { products })

        } catch (error) {
            console.log(error)
        }
    },

    // lista 1 producto
    async searchProduct(req, res) {
        try {
            const { q } = req.params
            const product = await Product.find({ nome: { $regex: q, $options: 'i' } });
            return res.status(200).json(product)
            // res.render('index', { products })

        } catch (error) {
            console.log(error)
        }
    },

// lista categoria hamburguer

    async hamburguer(req, res) {
        try {
           
            const products = await Product.find({ categoria: { $in: ['hamburguer']}})
           
            res.status(200).json(products)

        } catch (error) {
            console.log(error)
        }
       
    },

    // lista categoria bebida
    async bebidas(req, res) {
        try {

            const products = await Product.find({ categoria: { $in: ['bebida'] } })

            res.status(200).json(products)

        } catch (error) {
            console.log(error)
        }

    },
    // lista categoria pizza
    async pizza(req, res) {
        try {

            const products = await Product.find({ categoria: { $in: ['pizza'] } })

            res.status(200).json(products)

        } catch (error) {
            console.log(error)
        }

    },
    // lista categoria destaque
    async destaque(req, res) {
        try {

            const products = await Product.find({ destaque: { $in: ['sim'] } })

            res.status(200).json(products)

        } catch (error) {
            console.log(error)
        }

    },


    // edit produto
    async edit(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findById(id)
            res.status(200).json(product)
              //res.render('edit', { product })

        } catch (error) {
            console.log(error)
        }
    },

    async editAction(req, res) {
       
        try {
            //    const { id } = req.params
            const { id, nome, description, preco, categoria, destaque } = req.body

      
            const product = await Product.findById(id)
            if (!product) {
                res.status(400).json({ msg: "Produto não esta resgistrado no nosso banco de dados" })
            }

            var oldImage = product.file


            if (req.file == undefined) {


                await product.updateOne({ oldImage, nome, description, preco, categoria, destaque })
               return res.status(200).json({ msg: 'Produto editado com sucesso!' })
              //res.redirect('/')
            } else {


                fs.unlink('upload/' + oldImage, (error) => {

                    if (error) {

                    } else {
                        const file = req.file.filename

                        Promise.resolve(product.updateOne({ file, nome, description, preco, categoria, destaque }))
                        return res.status(200).json({ msg: 'Produto editado com sucesso!' })
                       // res.redirect('/')

                    }
                })

            }

           

            return res.status(200).json({ msg: 'Produto editado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },

    
// excluir produto
    async deleteProduct(req, res) {
        try {
            const { id } = req.params

            const product = await Product.findById(id)
            if (!product) {
                res.status(400).json({ msg: "Produto não esta resgistrado no nosso banco de dados" })
            }


            var oldImage = product.file

            fs.unlink('upload/' + oldImage, (error) => {
                if (error) {

                } else {
                    product.deleteOne()
                }
            })

            // await contact.deleteOne()
            //  res.status(200).json({ msg: 'contato excluido com sucesso!' })

            res.status(200).json({ msg: 'Produto excluido com sucesso!' })
          
           // res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    },

    // lista categoria hamburguer

   
    
}




