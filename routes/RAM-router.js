'use strict'

var ACController = require('../controllers/RAM-controller'),
    express = require('express'),
    router = express.Router()
router
    .get('/', ACController.getAll)
    .get('/C_R:CoRoS', ACController.close_reset_sync)
    .get('/S_U_E:value', ACController.getAll)
    .get('/a_pag=:page', ACController.getAll)
    .get('/S_U_E:value/a_pag=:page', ACController.getAll)
    .get('/search/SR:value_search', ACController.searchForm)
    .post('/save', ACController.push)
    // .get('/save:guardado', ACController.getAll)
    // .post('/save:guardado', ACController.getAll)
    .get('/editar/:_id', ACController.getOne)
    .put('/actualizar/:_id', ACController.update)
    .delete('/eliminar/:acuerdo_id', ACController.delete)
    .use(ACController.error404)

module.exports = router