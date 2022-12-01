const express = require("express");
const { signUp, login, getUser, updateUser } = require('./controllers/user');
const {registerClient,getClients,getClient ,updateClient} = require('./controllers/client')
const {registerCharge,getCharges,getChargesOneClient,updateCollection,deleteCharges, getOneCharge} = require('./controllers/charges')
const verifyToken = require('./controllers/verifytoken')
const verifyLogin = require('./filters/verifyLogin');
const routes = express();

routes.post('/sign-up', signUp);
routes.post('/login', login);
routes.post('/verify-token', verifyToken)

routes.use(verifyLogin);

routes.get('/get-user', getUser)
routes.put('/update-user', updateUser)


routes.post('/charges', registerCharge)
routes.get('/get-onecharge/:id',getOneCharge)
routes.get('/get-charges', getCharges)
routes.get('/get-charges/:id',getChargesOneClient)
routes.put('/charges/:id',updateCollection)
routes.delete('/charges-delete/:id',deleteCharges)

routes.get('/get-clients', getClients)
routes.get('/get-client/:id', getClient)
routes.post('/clients',registerClient)
routes.put('/update-client/:id', updateClient)


module.exports = routes;
