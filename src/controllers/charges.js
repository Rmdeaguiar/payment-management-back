const schemaVerifyCharge = require('../middlewares/schemaVerifyCharge')
const knex = require('../database/connection')

const registerCharge = async (req, res) => {
  const {
    client_id,
    nameclient,
    description,
    statuscharge,
    value,
    due_date,
  } = req.body

  if (statuscharge !== 'pago' && statuscharge !== 'pendente') {
    return res.status(400).json('Status de cobrança inválido')
  }

  try {
    await schemaVerifyCharge.validate(req.body)

    const charge = await knex('charges')
      .insert({
        client_id,
        nameclient,
        description,
        statuscharge,
        value,
        due_date,
      })
      .returning('*')

    if (charge.length === 0)
      return res.status(404).json('Cobrança não foi cadastrada')

    return res.status(201).json('Cobrança cadastrada com sucesso')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const getCharges = async (req, res) => {
  try {
    const data = new Date().getTime()

    const charges = await knex('charges')

    if (charges.length === 0)
      return res.satus(404).json('Nao existem cobranças pendentes')

    for (let charge of charges) {
      if (data > charge.due_date.getTime() && charge.statuscharge !== 'pago') {
        charge.statuscharge = 'Vencida'
      }
    }

    if (charges.length === 0)
      return res.status(404).json('Não existem cobranças vencidas')

    return res.status(200).json(charges)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const getChargesOneClient = async (req, res) => {
  const { id } = req.params

  try {
    const charges = await knex('charges').where('client_id', id)

    if (charges.length === 0)
      return res.status(404).json('Não existem cobranças para esse cliente')

   for (let charge of charges){
    if (data > charge.due_date.getTime() && charge.statuscharge !== 'pago'){
      charge.statuscharge = 'Vencida'
     } 
  }

   if (charges.length === 0) return res.status(404).json('Não existem cobranças para esse cliente')

  return res.status(200).json(charges)
} catch (error) {
  return res.status(400).json(error.message)
}

}
  
const deleteCharges = async (req, res) => {
  const { id } = req.params
  const data = new Date().getTime()

  try {
    const charge = await knex('charges').where({ id }).first()

    if (!charge) {
      return res.status(400).json('Não foi possível excluir a conta')
    }
    if (charge.statuscharge !== 'pendente' || charge.due_date < data) {
      return res.status(404).json("Esta cobrança não pode ser excluída!")
    }

    const deleteCharge = await knex('charges').where({ id }).del('*')

    if (!deleteCharge) {
      return res.status(404).json('Não foi possível excluir a cobrança')
    }

    return res.status(200).json('cobrança excluída com sucesso')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const updateCollection = async (req, res) => {
  const { id } = req.params
  const { nameclient, description, statuscharge, value, due_date } = req.body
  try {
    await schemaVerifyCharge.validate(req.body)
    const collectionUpdate = await knex('charges').where({ id }).update({
      description,
      statuscharge,
      value,
      due_date,
      nameclient,
    })
    if (!collectionUpdate) {
      return res.status(400).json('Não foi possível editar a cobrança')
    }
    return res.status(200).json('Cobrança atualizada com sucesso')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const getOneCharge = async (req, res) => {
  const { id } = req.params

  try {
    const charges = await knex('charges').where({ id }).first()
    if (!charges) return res.status(404).json('Essa cobrança não existe')

    return res.status(200).json(charges)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = {
  registerCharge,
  getCharges,
  getChargesOneClient,
  updateCollection,
  deleteCharges,
  getOneCharge
}


