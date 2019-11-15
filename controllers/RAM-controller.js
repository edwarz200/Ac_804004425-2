'use strict'

var ACModel = require('../models/RAM-model'),
    // algoliasearch = require('algoliasearch'),
    // algolia = require('../models/RAM-Algolia'),
    ACController = () => {}
ACController.push = (req, res, next) => {
    var fecha = req.body.fecha
    console.log(fecha)
    let id = req.body.acuerdo_id,
        idmongo = id,
        miFechaPasada = new Date(fecha),
        dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
        dia_semana = dias[miFechaPasada.getUTCDay()],
        AC = {
            acuerdo_id: req.body.acuerdo_id,
            nro_acuerdo: req.body.nro_acuerdo,
            fecha: req.body.fecha,
            dia_sem: dia_semana,
            detalle: req.body.detalle
        }
    ACModel.push(idmongo, id, AC, (err, l) => {
        if (err) {
            let locals = {
                title: `Error al salvar el registro con el id: ${AC.acuerdo_id}`,
                description: "Error de Sintaxis",
                error: err
            }
            res.render('error', locals)
        } else {
            res.redirect("/S_U_E:guardado")
        }
    })
}

ACController.update = (req, res, next) => {
    let id = req.params._id,
        idmongo = req.body.acuerdo_id,
        AC = {
            acuerdo_id: req.body.acuerdo_id,
            nro_acuerdo: req.body.nro_acuerdo,
            fecha: req.body.fecha,
            detalle: req.body.detalle
        }
    console.log(id)

    ACModel.push(idmongo, id, AC, (err, l) => {
        if (err) {
            let locals = {
                title: `Error al salvar el registro con el id: ${AC.acuerdo_id}`,
                description: "Error de Sintaxis",
                error: err
            }

            res.render('error', locals)
        } else {
            res.redirect("/S_U_E:actualizado")
        }
    })
}

ACController.getAll = (req, res, next) => {
    var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        cant = req.params.cant,
        m_idarray = []
    let H_D = req.params.value,
        savee = req.params.guardado,
        childKey = "no paso",
        c, save, num = 0,
        cont
    ACModel.getAll((err, rows) => {
        // navigator.onLine ? console.log('online') : console.log('offline');
        if (err) {
            let locals = {
                title: `Error al obtener los datos`,
                description: "Error de Sintaxis",
                error: err
            }
            res.render('error', locals)
        } else {
            for (var i = 0; i < 1; i++) {
                // console.log('entro')
                var m_id = "AC_"
                for (var j = 0; j < 3; j++) {
                    m_id += letras_a[Math.round(Math.random() * 25)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 25)]
                }
                rows.forEach((ram) => {
                    while (m_id == ram.acuerdo_id) {
                        for (var k = 0; k < 1; k++) {
                            m_id += letras_a[Math.round(Math.random() * 25)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 25)]
                        }
                    }
                })
                m_idarray[i] = m_id
            }
            if (H_D == ":agregar") {
                cont = 'si'
                num = 1
            } else if (H_D == ":guardado") {
                save = "Acuerdo guardado con exito"
                cont = 'si'
                num = 1
            } else if (H_D == ":actualizado") {
                save = "Acuerdo actualizado con exito"
                num = 2
            } else if (H_D == ":sincro") {
                save = "Base de datos sincronizada con exito"
                num = 2
            }
            if (String(H_D).indexOf(":Habilitar") != -1) {
                c = 'false'
                if (H_D == ":Habilitar2")
                    save = "Acuerdo eliminado con exito"
            } else if (H_D == ":Varios") {
                c = 'false_v'
            } else {
                c = 'true_defect'
            }
            if (rows.length <= 0) {
                ACModel.getConection(err => {
                    if (err) {
                        console.log("No connection");
                        locals = {
                            title: `Error al obtener los datos`,
                            description: "Error de conexión",
                            errors: 'Asegurate de estar conectado a internet la primera vez que te conectas a la aplicación'
                        }
                        res.render('error', locals)
                    } else {
                        console.log("Connected");
                        ACModel.getAllFirebase(snapshot => {
                            if (snapshot.exists()) {
                                var locals = {
                                    title: 'Acuerdos Municipales',
                                    title2: 'Agregar Acuerdo Municipal',
                                    cont: cont,
                                    disables: c,
                                    data: rows,
                                    data_save: save,
                                    data_id: m_idarray,
                                    buttons: 'si'
                                }
                            } else {
                                var locals = {
                                    title: 'Acuerdos Municipales',
                                    title2: 'Agregar Acuerdo Municipal',
                                    cont: cont,
                                    disables: c,
                                    data: rows,
                                    data_save: save,
                                    data_id: m_idarray,
                                    buttons: 'no'
                                }
                            }
                            res.render('index', locals)
                        })
                    }
                })
            } else {
                var locals = {
                    title: 'Acuerdos Municipales',
                    title2: 'Agregar Acuerdo Municipal',
                    cont: cont,
                    disables: c,
                    data: rows,
                    data_save: save,
                    data_id: m_idarray,
                    buttons: 'si'
                }
                res.render('index', locals)

            }
        }
    })
}

ACController.close_reset_sync = (req, res, next) => {
    let closeORreset = req.params.CoRoS,
        id, num = 1

    if (closeORreset == ":Close") {
        id = "Close"
        num = 1
    } else if (closeORreset == ":Restart") {
        id = "Restart"
        num = 1
    } else if (closeORreset == ":Firebase") {
        num = 0
    } else if (closeORreset == ":Syncfirebase") {
        num = 2
    } else if (closeORreset == ":SyncMongo") {
        num = 2
    }
    if (num == 1) {
        ACModel.close_reset(id, (err, stdout, stderr) => {
            // return (err) ? console.log(`Archivo no encontrado ${err.stack}`) : console.log(`Archivo encontrado: stdout ${stdout}, stderr ${stderr} `)
        })
        res.redirect('/')
    } else if (num == 2) {
        console.log('entroooooooo')
        ACModel.SyncMongo((err, cc) => {
                if (err) {
                    console.log('error ' + err)
                } else {
                    console.log('guardado')
                    res.redirect('/S_U_E:sincro')
                }
            })
            // res.redirect('/')
    } else {
        let H_D = "no",
            save,
            childKey = "no paso",
            c = "no"
        ACModel.getAllFirebase(snapshot => {
            var childKey = {},
                rows, isss = 0
            snapshot.forEach(function(childSnapshot) {
                rows = snapshot.val()
                isss++
            });
            if (H_D == ":Habilitar") {
                c = 'false'
            }
            if (H_D == ":Habilitar2") {
                c = 'false'
                save = "Acuerdo eliminado con exito"
            } else if (H_D == ":Varios") {
                c = 'false_v'
            } else {
                c = 'true_defect'
            }
            let locals = {
                title: 'Acuerdos Municipales',
                disables: c,
                data: rows,
                data_save: save
            }
            console.log(locals)
            res.render('index_firebase', locals)
        })
    }
}

ACController.getOne = (req, res, next) => {
    let acuerdo_id = req.params._id
    console.log(acuerdo_id)

    ACModel.getOne(acuerdo_id, (err, rows) => {
        // let rows = snapshot.val(),
        let locals = {
                title: 'Acuerdos Municipales',
                // id: acuerdo_id,
                data: rows,
                op: 'search',
                data_save: 'heloowda'
            }
            // console.log(rows)
        res.render('edit', locals)
    })
}

ACController.searchForm = (req, res, next) => {
    let sr = req.params.value_search,
        search = "",
        search_ant="",
        po = "",
        num
    if (sr != ":") {
        var arrayDeCadenas = sr.split("=")
        search = arrayDeCadenas[arrayDeCadenas.length - 1]
        po = arrayDeCadenas[0]
    }
    if (po == ":Todo") {
        num = 1
        search_ant = search
    } else if (po == ":Palabra") {
        num = 2
        search_ant = search
    } else if (po == ":  de acuerdo") {
        num = 3
        search_ant = search
    } else if (po == ":Fecha del acuerdo") {
        num = 4
        search_ant = search
        search = dia_sem(search)
        console.log('search2 ' + search)
    } else {
        num = 0
        search_ant = search
    }
    console.log("sr= " + sr + " po= " + po + " search= " + search_ant)
    let locals = {
        title: 'Buscar Acuerdo Municipal',
        op: 'search',
        search: search_ant,
        data: '',
        image1: '/img/lupa_busqueda.png',
        txt1: 'Realiza una busqueda',
        input: po
    }
    if (num != 0) {
        console.log("entro")
        ACModel.search(num, search, async(err, bb) => {
            for (var i = 0; i < bb.length; i++) {
                console.log(bb[i])
            }
            let locals = {
                title: 'Buscar Acuerdo Municipal',
                op: 'search',
                data: bb,
                image1: '/img/no_se_encontraron.png',
                txt1: 'No se encontro ningun resultado coincidente',
                search: search_ant,
                input: po
            }
            res.render('search', locals)
        })
    } else {
        res.render('search', locals)
    }

}

ACController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        }

    error.status = 404

    res.render('error', locals)

    next()
}

ACController.delete = (req, res, next) => {
    let idmongo = req.params.acuerdo_id,
        id = req.body.acuerdo_id
        // console.log(acuerdo_id)

    ACModel.delete(idmongo, id, function(err) {
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${id}`,
                description: "Error de Sintaxis",
                error: err
            }
            res.render('error', locals)
        } else {
            res.redirect('/S_U_E:Habilitar2')
        }
    })
}

function dia_sem(search){
        if (!search.toLowerCase().indexOf('en') || search == '01' ) {
            console.log(search.toLowerCase())
            console.log('enero')
            return search = "-01-"
        } else if (!search.toLowerCase().indexOf('feb') || search == '02' ) {
            console.log(search.toLowerCase())
            console.log('febrero')
            return search = "-02-"
        } else if (!search.toLowerCase().indexOf('mar') || search == '03' ) {
            console.log(search.toLowerCase())
            console.log('marzo')
            return search = "-03-"
        } else if (!search.toLowerCase().indexOf('abr') || search == '04' ) {
            console.log(search.toLowerCase())
            console.log('abril')
            return search = "-04-"
        } else if (!search.toLowerCase().indexOf('may') || search == '05' ) {
            console.log(search.toLowerCase())
            console.log('mayo')
            return search = "-05-"
        } else if (!search.toLowerCase().indexOf('jun') || search == '06' ) {
            console.log(search.toLowerCase())
            console.log('junio')
            return search = "-06-"
        } else if (!search.toLowerCase().indexOf('jul') || search == '07' ) {
            console.log(search.toLowerCase())
            console.log('julio')
            return search = "-07-"
        } else if (!search.toLowerCase().indexOf('agos') || search == '08' ) {
            console.log(search.toLowerCase())
            console.log('agosto')
            return search = "-08-"
        } else if (!search.toLowerCase().indexOf('sep') || search == '09' ) {
            console.log(search.toLowerCase())
            console.log('septiembre')
            return search = "-09-"
        } else if (!search.toLowerCase().indexOf('oct') || search == '010' ) {
            console.log(search.toLowerCase())
            console.log('octubre')
            return search = "-10-"
        } else if (!search.toLowerCase().indexOf('nov') || search == '011' ) {
            console.log(search.toLowerCase())
            console.log('noviembre')
            return search = "-11-"
        } else if (!search.toLowerCase().indexOf('dic') || search == '012' ) {
            console.log(search.toLowerCase())
            console.log('diciembre')
            return search = "-12-"
        }
}

module.exports = ACController