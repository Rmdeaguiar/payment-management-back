const { json } = require('express/lib/response')
const knex = require('../database/connection')
const schemaVerifyClient = require('../middlewares/schemaVerifyClient')

const registerClient = async (req,res) => {
    const {name,email,cpf,phone,cep,publicplace,complement,district,city,state} = req.body

    try {
        await schemaVerifyClient.validate(req.body)

        const verifyEmail = await knex('clients').where({email}).first()
           if (verifyEmail) return res.status(400).json("Esse email já está cadastrado")

        const cpfJaExiste = await knex('clients').where({cpf}).first()
          if (cpfJaExiste) return res.status(404).json("O cpf já está cadastrado")

        const user = await knex('clients').insert({name,email,cpf,phone,cep,publicplace,complement,district,city,state}).returning('*')

        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const getClients = async (req,res) => {

    try {
        const clients = await knex('clients')
        
        if (!clients) return res.status(404).json("Nenhum cliente encontrado")
    
        return res.status(200).json(clients)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const getClient = async (req,res) => {
    const {id} = req.params

    try {
        const client = await knex('clients').where({id}).first()

        if (!client) return res.status(404).json("Nenhum cliente encontrado")

        return res.status(200).json(client)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const updateClient = async (req,res) => {
    const {name,email,cpf,phone,cep,publicplace,complement,district,city,state} = req.body
    const {id} = req.params

    const emailJaCadastrado = await knex('clients').where({email}).where('id','!=', id).first()
        if (emailJaCadastrado) return res.status(404).json("O email já está cadastrado")

    const cpfJaExiste = await knex('clients').where({cpf}).where('id','!=', id).first()
        if (cpfJaExiste) return res.status(404).json("O cpf já está cadastrado")

    try {
        await schemaVerifyClient.validate(req.body)

        const client = await knex('clients')
        .update({ name, email, cpf, phone, cep,publicplace,complement,district,city,state})
        .where({ id });

        if (!client) return res.status(404).json("Cliente não foi atualizado")
        
        return res.status(200).json("Cliente atualizado com sucesso");
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    registerClient,
    getClients,
    getClient,
    updateClient
}