const knex = require('../../conexao')

const inadimplentClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await ('clientes').where({ id }).first();

        if (!client) { return res.status(400).json('Cliente não encontrado'); }

        const collection = await knex('cobrancas').select(
            "id",
            "descricao",
            "statuscobranca",
            "valor"
        ).where("cliente_id")

        client.cobrancas = cobrancas;

        collection.map((index) => {
            if (index[i].statuscobranca === "Vencida") { return client.statuscliente === 'Inadimplente' }
            else { client.statuscliente === 'Em dia' }
        })

    } catch (error) {
        return res.status(400).json(error.menssage)
    }
}


const statusCliente = async (req, res) => {
    const { id } = req.body;
    try {
        const cliente = await knex('cliente').where({ id }).fist();

        if (!cliente) return res.status(400).json('Cliente não encontrado')

        const cobrar = await knex('cobrancas').select(
            "id",
            "descricao",
            "statuscobranca",
            "valor",
        ).where('cliente_id', cliente.id);
        cliente.cobrancas = cobrar

    } catch (error) {
        return res.status(400).json(error.menssage)
    }
}

module.exports = {
    statusCliente,
    inadimplentClient
}