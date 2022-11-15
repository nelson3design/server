

const Order = require('../models/orderModel')



module.exports = {

    // criar product


    async order(req, res) {
       
        const { costumer, idCliente, status, itemComprado,itemAdicional,valorTotal, rua, cep,numero,bairro,cidade,estado,complemento } = req.body

        const entrega = [{
            "rua": rua,
            "cep": cep,
            "numero": numero,
            "complemento": complemento,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado
        }]
        const pedido = { itemComprado, itemAdicional, entrega, valorTotal }
      
        try {
           
   
            await Order.create({ costumer,idCliente, status, pedido })
            res.status(200).json({ msg: 'Product registrado com sucesso' })

         

        } catch (error) {
            res.status(400).send(error);

        }

    },
    async allOrder(req, res) {
        try {
            const orders = await Order.find()
            return res.status(200).json(orders)
          
        } catch (error) {
            console.log(error)
        }
    },
    async customerOrder(req, res) {
        const idCliente = req.params.idCliente

        const order = await Order.find({ idCliente: idCliente })

        if (!order) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }

        res.status(200).json({ order })
    },

    // confrimar pedido
 
    async confirmar(req, res) {
        try {
            const { id } = req.body
            const confirmar="on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ confirmar })
            return res.status(200).json({ msg: 'Pedido confirmado com sucesso!' })
           
        } catch (error) {
            console.log(error)
        }
    },
    // cancelar pedido

    async cancelar(req, res) {
        try {
            const { id } = req.body
            const cancelar = "on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ cancelar })
            return res.status(200).json({ msg: 'Pedido cancelado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },

    // preparar pedido

    async preparar(req, res) {
        try {
            const { id } = req.body
            const preparar = "on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ preparar })
            return res.status(200).json({ msg: 'Pedido preparado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },
    // terminar pedido

    async terminar(req, res) {
        try {
            const { id } = req.body
            const terminar = "on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ terminar })
            return res.status(200).json({ msg: 'Pedido terminado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },
    // entregar pedido

    async entregar(req, res) {
        try {
            const { id } = req.body
            const entregar = "on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ entregar })
            return res.status(200).json({ msg: 'Pedido entregado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },
    // finalizar pedido

    async finalizar(req, res) {
        try {
            const { id } = req.body
            const finalizar = "on"

            const order = await Order.findById(id)
            if (!order) {
                res.status(400).json({ msg: "Pedido não esta resgistrado no nosso banco de dados" })
            }

            await order.updateOne({ finalizar })
            return res.status(200).json({ msg: 'Pedido finalizado com sucesso!' })

        } catch (error) {
            console.log(error)
        }
    },


    //listar os pedidos ativo
    async orderActive(req, res) {
        try {

            const order = await Order.find({ 
                confirmar: { $in: ['off'] },
                cancelar: { $in: ['off'] },
                preparar: { $in: ['off'] },
                terminar: { $in: ['off'] },
                entregar: { $in: ['off'] },
                finalizar: { $in: ['off'] },
               
                 })

            res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }

    },
    //listar os pedidos cancelado
    async orderCancelar(req, res) {
        try {

            const order = await Order.find({
                confirmar: { $in: ['off'] },
                cancelar: { $in: ['on'] },
                preparar: { $in: ['off'] },
                terminar: { $in: ['off'] },
                entregar: { $in: ['off'] },
                finalizar: { $in: ['off'] },

            })

            res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }

    },
    //listar os pedidos preparado
    async orderPreparar(req, res) {
        try {

            const order = await Order.find({
                confirmar: { $in: ['on'] },
                cancelar: { $in: ['off'] },
              //  preparar: { $in: ['off'] },
                terminar: { $in: ['off'] },
                entregar: { $in: ['off'] },
                finalizar: { $in: ['off'] },

            })

            res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }

    },
    async orderEntregar(req, res) {
        try {

            const order = await Order.find({
                confirmar: { $in: ['on'] },
                cancelar: { $in: ['off'] },
                preparar: { $in: ['on'] },
                terminar: { $in: ['on'] },
               // entregar: { $in: ['on'] },
                finalizar: { $in: ['off'] },

            })

            res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }

    },
    async orderFinalizar(req, res) {
        try {

            const order = await Order.find({
                confirmar: { $in: ['on'] },
                cancelar: { $in: ['off'] },
                preparar: { $in: ['on'] },
                terminar: { $in: ['on'] },
                entregar: { $in: ['on'] },
                finalizar: { $in: ['on'] },

            })

            res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }

    },

    
}




