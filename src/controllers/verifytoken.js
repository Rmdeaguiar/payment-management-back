const jwt = require('jsonwebtoken');

const verifyToken = (req,res) => {
    const {token} = req.body

    try {
        if (token){
            jwt.verify(token,process.env.JWTSECRET_PASSWORD)
            ? res.status(200).json({status:true}) : res.status(404).json({status:false})
        } else {
            res.status(404).json({status:false})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = verifyToken