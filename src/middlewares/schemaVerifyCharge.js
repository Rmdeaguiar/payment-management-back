const yup = require('./settings')

const schemaVerifyCharge = yup.object().shape({
    client_id: yup.number().required(),
    nameclient: yup.string().required(),
    description:yup.string().required(),
    statuscharge: yup.string().required(),
    value: yup.string().required(),
    due_date: yup.date().required()
})

module.exports = schemaVerifyCharge