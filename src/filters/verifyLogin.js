const knex = require("../database/connection");
const jwt = require('jsonwebtoken')

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json('Não autorizado');

    try {
        const token = authorization.replace('Bearer ', '');

        const { id } = jwt.verify(token, process.env.JWTSECRET_PASSWORD);

        const userExists = await knex('users').where({ id }).first();

        if (!userExists) return res.status(404).json('Usuario não encontrado');

        const { password, ...user } = userExists;

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verifyLogin