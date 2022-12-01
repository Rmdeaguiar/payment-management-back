const { encryptPasswordValue, comparePasswords } = require('../utils/handlePassword');
const knex = require('../database/connection');
const schemaVerifyInfo = require('../middlewares/schemaVerifyInfo');
const schemaVerifyLogin = require('../middlewares/schemaVerifyLogin');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await schemaVerifyInfo.validate(req.body)

        const userInfo = await knex('users').where({ email }).first();

        if (userInfo) return res.status(400).json("O email já existe");

        const passwordHash = await encryptPasswordValue(password);

        const user = await knex('users').insert({
            name,
            email,
            password: passwordHash,
        });

        if (!user) return res.status(400).json("Não foi possível cadastrar o usuário");

        return res.status(201).json("O usuário foi cadastrado");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await schemaVerifyLogin.validate(req.body)

        const user = await knex('users').where({ email }).first();

        if (!user) return res.status(404).json('O usuario não foi encontrado');

        const correctPassword = await comparePasswords(password, user.password);

        if (!correctPassword) return res.status(400).json("Email e senha não conferem");

        const token = jwt.sign({ id: user.id },
            process.env.JWTSECRET_PASSWORD,
            { expiresIn: '2h' });

        const { password: _, ...infoUser } = user;

        return res.status(200).json({
            user: infoUser,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getUser = async (req, res) => {
    const { id } = req.user

    try {
        const getUser = await knex('users').where({ id }).first()

        if (!getUser) return res.status(404).json("Usuario não encontrado")

        const { password, ...user } = getUser

        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const updateUser = async (req, res) => {
    const { name, email, cpf = null, phone = null, password } = req.body;
    const { id } = req.user

    try {
        await schemaVerifyInfo.validate(req.body)

        const passwordHash = await encryptPasswordValue(password);

        const user = await knex('users')
            .update({ name, email, cpf, phone, password: passwordHash })
            .where({ id });

        if (!user) return res.status(400).json("Usuário não foi atualizado");

        return res.status(200).json("Usuário atualizado com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    signUp,
    login,
    getUser,
    updateUser
}