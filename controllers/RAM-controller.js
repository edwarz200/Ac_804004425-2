'use strict'

var ACModel = require('../models/RAM-model'),
    // algoliasearch = require('algoliasearch'),
    // algolia = require('../models/RAM-Algolia'),
    ACController = () => {}
ACController.push = (req, res, next) => {
    let id = req.body.acuerdo_id,
        idmongo = id,
        AC = {
            acuerdo_id: req.body.acuerdo_id,
            nro_acuerdo: req.body.nro_acuerdo,
            fecha: req.body.fecha,
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
            GETALL(":guardado","",res,req)
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
            GETALL(":actualizado","",res,req)
        }
    })
}

ACController.getAll = (req, res, next) => {
    let H_D = req.params.value,
        savee
        GETALL(savee,H_D,res,req)
}
ACController.close_reset = (req, res, next) => {
    let closeORreset = req.params.CoR,
        id

    if (closeORreset == ":Close") {
        id = "Close"
    } else if (closeORreset == ":Restart") {
        id = "Restart"
    }
    ACModel.close_reset(id, (err, stdout, stderr) => {
        // return (err) ? console.log(`Archivo no encontrado ${err.stack}`) : console.log(`Archivo encontrado: stdout ${stdout}, stderr ${stderr} `)
    })
    res.redirect('/')
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
            res.redirect('/S_E:Habilitar2')
        }
    })
}

ACController.addForm = (req, res, next) => {
    // ACModel.getOneAC((err, rows) => {
    var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        cant = req.params.cant,
        c = 0,
        m_idarray = []
        // if (err) {} else {
        //     if (err) {
        //         let locals = {
        //             title: 'Error al consultar la base de datos',
        //             description: 'Error de Sintaxis SQL',
        //             error: err
        //         }
        //         res.render('error', locals)
        //     } else {
    if (cant == ":nums=1") {
        c = 0
    } else if (cant == ":nums=2") {
        c = 1
    } else if (cant == ":nums=3") {
        c = 2
    } else if (cant == ":nums=4") {
        c = 3
    } else if (cant == ":nums=5") {
        c = 4
    }
    ACModel.getAll((err, rows) => {
        for (var i = 0; i <= c; i++) {
            var m_id = "AC_"
            for (var j = 0; j < 3; j++) {
                m_id += letras_a[Math.round(Math.random() * 26)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 26)]
            }
            rows.forEach((ram)=>{
                while (m_id == ram.acuerdo_id) {
                    for (var k = 0; k < 3; k++) {
                        m_id += letras_a[Math.round(Math.random() * 26)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 26)]
                    }
                }
            })
            m_idarray[i] = m_id
                // console.log(m_idarray)
        }
        var locals = {
            title: 'Agregar Acuerdo Municipal',
            data: m_idarray,
            nums: c,
            op: 'search_ag'
        }
        res.render('add', locals)
    })
        // }
        // }
        // })
}

ACController.searchForm = (req, res, next) => {
    let sr = req.params.value_search,
        search = "",
        po = "",num
    if (sr != ":") {
        var arrayDeCadenas = sr.split("=")
        search = arrayDeCadenas[arrayDeCadenas.length - 1]
        po = arrayDeCadenas[0]
    }
    if (po==":Palabra") {
        num = 1
    }else if(po==":Numero de acuerdo"){
        num = 2
    }else if(po==":Fecha del acuerdo"){
        num = 3
    }else{
        num= 0
    }
    if(num != 0){
                console.log("entro")
        ACModel.search(num,search,async (err, bb) => {
            for(var i = 0; i<bb.length ; i++){
                console.log(bb[i])
            }
        })
    }
    console.log("sr= " + sr + " po= " + po + "search= "+ search)
    let locals = {
        title: 'Buscar Acuerdo Municipal',
        op: 'search',
        search: search,
        input: po
    }
    res.render('search', locals)

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

function GETALL(savee, H_D,res,req){
    let childKey = "no paso",c,save,num = 0
    ACModel.getAll((err, rows) => {
        if (err) {
            var locals = {
                title: `Error al obtener los datos`,
                description: "Error de Sintaxis",
                error: err
            }
            res.render('error', locals)
        } else {
            // ACModel.sync()
                // var childKey = {},
                //     rows, isss = 0
                // snapshot.forEach(function(childSnapshot) {
                //     childKey[isss] = childSnapshot.key
                //     rows = snapshot.val()
                //     console.log(childKey[isss])
                //     rows.objectID = childKey
                //     isss++
                // });
            if (H_D == ":Habilitar") {
                c = 'false'
            } else if (H_D == ":Habilitar2") {
                c = 'false'
                save = "Acuerdo eliminado con exito"
            } else if (H_D == ":Varios") {
                c = 'false_v'
            } else {
                c = 'true_defect'
            }
            if (savee == ":guardado") {
                save = "Acuerdo guardado con exito"
                num = 1

            } else if (savee == ":actualizado") {
                save = "Acuerdo actualizado con exito"
                num = 2
            }
            var locals = {
                title: 'Acuerdos Municipales',
                disables: c,
                data: rows,
                data_save: save
            }
        }
        // console.log(locals)
        res.render('index', locals)
    })
}

module.exports = ACController