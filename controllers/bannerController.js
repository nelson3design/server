

const Banner = require('../models/bannerModel')
const fs = require('fs')

module.exports = {

    // criar banner


    async createBanner(req, res) {
         console.log(req.body)
        try {
           const { tipo, link } = req.body
            const file = req.file.filename
           
            const banner = await Banner.create({ tipo, file, link })
            res.status(200).json({ msg: 'Banner registrado com sucesso' })

        } catch (error) {
            res.status(400).send(error);

        }

    },
    // lista todos os banners
    async allBanner(req, res) {
        try {
            const banner = await Banner.find()
            return res.status(200).json(banner)
            
        } catch (error) {
            console.log(error)
        }
    },
    async oneBanner(req, res) {
        try {
            const { id } = req.params
            const banner = await Banner.findById(id)
            return res.status(200).json(banner)
            // res.render('index', { products })

        } catch (error) {
            console.log(error)
        }
    },

    async desktop(req, res) {
        try {

            const banners = await Banner.find({ tipo: { $in: ['desktop'] } })

            res.status(200).json(banners)

        } catch (error) {
            console.log(error)
        }

    },
    async mobile(req, res) {
        try {

            const banners = await Banner.find({ tipo: { $in: ['mobile'] } })

            res.status(200).json(banners)

        } catch (error) {
            console.log(error)
        }

    },
    

    // excluir banner
    async deleteBanner(req, res) {
        try {
            const { id } = req.params

            const banner = await Banner.findById(id)
            if (!banner) {
                res.status(400).json({ msg: "Banner não esta resgistrado no nosso banco de dados" })
            }

            var oldImage = banner.file

            fs.unlink('upload/' + oldImage, (error) => {
                if (error) {

                } else {
                    banner.deleteOne()
                }
            })
           
            res.status(200).json({ msg: 'banner excluido com sucesso!' })

        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },



}




