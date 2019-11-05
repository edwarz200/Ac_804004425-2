'use strict'

var ACController = require('../controllers/RAM-controller'),
    express = require('express'),
    router = express.Router()
router
    .get('/', ACController.getAll)
    .get('/C_R:CoR', ACController.close_reset)
    .get('/S_E:value', ACController.getAll)
    .get('/agregar:cant', ACController.addForm)
    .get('/search/SR:value_search', ACController.searchForm)
    .post('/save', ACController.push)
    .get('/save:guardado', ACController.getAll)
    // .post('/save:guardado', ACController.getAll)
    .get('/editar/:_id', ACController.getOne)
    .put('/actualizar/:_id', ACController.update)
    .delete('/eliminar/:acuerdo_id', ACController.delete)
    .use(ACController.error404)

module.exports = router