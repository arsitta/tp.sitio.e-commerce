const db = require("../database/models");
const sequelize = require("sequelize");
const { where } = require("sequelize");


const controller = {
    usersList: (req, res) => {
        db.usuario.findAll({ attributes: ["id", "nombre", "apellido", "email"] })
            .then(usuarios => {
                return res.status(200).json({
                    count: usuarios.length,
                    users: usuarios,
                    status: 200
                })
            })
    },
    user: (req, res) => {
        db.usuario.findByPk(req.params.id, { attributes: ["id", "nombre", "apellido", "email"] })
            .then(usuario => {
                if (usuario !== null) {
                    return res.json({
                        data: usuario,
                        status: 200

                    })
                } else {
                    return res.status(404).json({
                        error: "no se encontro el usuario",
                        status: 404
                    })
                }
            })
    },
    productsList: async (req, res) => {
        try {
            const database = await db.producto.findAll()
            res.status(200).json({
                count: database.length,
                products: database,
                status: 200
            })

        } catch (error) {
            res.status(404)
        }
    },
    product: (req, res) => {
        db.producto.findByPk(req.params.id)
            .then(producto => {
                if (producto !== null) {
                    return res.json({
                        data: producto,
                        status: 200
                    })
                } else {
                    return res.status(404).json({
                        error: "no se encontro el producto",
                        status: 404
                    })
                }
            })
    },
    lastProduct: (req, res) => {
        db.producto.findAll({include: [{ model: db.genero }, { model: db.marca }, { model: db.categoria }, { model: db.imagen }],   
                            limit: 1,
                            order: [["created_at", "DESC"], ["id", "DESC"]]
        })
        .then(ultimoProducto => {
            if (ultimoProducto !== null) {
                return res.json({
                    data: ultimoProducto[0],
                    status: 200

                })
            } else {
                return res.status(404).json({
                    error: "no se encontro el producto",
                    status: 404
                })
            }
        })
    },
    categories: (req, res) => {
        db.categoria.findAll()
            .then(categorias => {
                return res.status(200).json({
                    data: categorias,
                    status: 200
                })
            })
    }
}

module.exports = controller;