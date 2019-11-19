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
    var date = req.body.fecha
    let id = req.params._id,
        miFechaPasada = new Date(date),
        dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
        idmongo = req.body.acuerdo_id,
        dia_semana = dias[miFechaPasada.getUTCDay()],
        AC = {
            acuerdo_id: req.body.acuerdo_id,
            nro_acuerdo: req.body.nro_acuerdo,
            fecha: date,
            dia_sem: dia_semana,
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
        dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
        search = "",
        search_ant="",
        po = "",
        num,
        tooltip = "Puedes escribir el dia de la semana(lunes, martes, etc..), el dia en numero (1,2... 22), el nombre del mes (enero, febrero, etc..) o el numero del mes con un cero antecediendolo (01, 02... 010) como parametros de busqueda"
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
        search_ant = search
        search = dia_sem(search_ant)
        console.log('search2 ' + search)
        num = 4
    } else{
        num = 0
        search_ant = search
    }
    console.log("sr= " + sr + " po= " + po + " search= " + search_ant)
    let locals = {
        title: 'Buscar Acuerdo Municipal',
        op: 'search',
        search: search_ant,
        data_save: tooltip,
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
                data_save: tooltip,
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
    var split,param1,param1_ant,param2,param2_ant,param3,paramUlt,paramUlt_ant,mes,dias,cero="", indicador_dia=0, indicador_mes=0,ninguno=[],i=0,
        dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
        meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        meses_num = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "010", "011", "012"],
        dias_mes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","13", "14", "15", "16", "17", "18", "19", "20", "21", "22","23", "24", "25", "26", "27", "28", "29", "30", "31"],
        numeros = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    if(search.indexOf(" ")!=-1){
        split = search.split(" ")
        console.log("1",split)
    }else if(search.indexOf("-")!=-1){
        split = search.split("-")
        console.log("2",split)
    }

    if(split!= undefined){
        param1 = split[0]
        paramUlt = split[split.length - 1]
        if (split.length==3) {
            param2 = split[1]
        }
            console.log("entro split1 = " + param1 + " " + param2 + " " + paramUlt)
    }else{
        param1 = search
        console.log(param1)
    }

    // dias de la semana
    
    if(dias.includes(param1)){
        param1 = param1
        indicador_dia = 1
        console.log("param1 = ", param1)
    }else if(dias.includes(param2)){
        param2 = param2
        indicador_dia = 2
        console.log("param2 = ", param2)
    }else if(dias.includes(paramUlt)){
        paramUlt = paramUlt
        indicador_dia = 3
        console.log("param3 = ", paramUlt)
    }else{
       console.log("ninguno")
       ninguno[i]=1
       i++
    }

    //meses

    if(meses.indexOf(param1) != -1 && indicador_dia != 1 && param1!=undefined){
        param1_ant = param1
        mes = numeros[meses.indexOf(param1_ant)]
        param1 = "-"+mes+"-"
        indicador_mes = 1
        console.log("param1 a= ", param1)
    }else if(meses.indexOf(param2) != -1 && indicador_dia != 2 && param2!=undefined){
        param2_ant = param2
        mes = numeros[meses.indexOf(param2_ant)]
        param2 = "-"+mes+"-"
        indicador_mes = 2
        console.log("param2 = ", param2)
    }else if(meses.indexOf(paramUlt) != -1 && indicador_dia != 3 && paramUlt!=undefined){
        paramUlt_ant = paramUlt
        mes = numeros[meses.indexOf(paramUlt_ant)]
        paramUlt = "-"+mes+"-"
        indicador_mes = 3
        console.log("param3 = ", paramUlt)
    }else if(meses_num.includes(param1) && indicador_dia != 1 && param1!=undefined){
        param1_ant = param1
        mes = numeros[meses_num.indexOf(param1_ant)]
        param1 = "-"+mes+"-"
        indicador_mes = 1
        console.log("param1 b= ", param1)
    }else if(meses_num.includes(param2) && indicador_dia != 2 && param2!=undefined){
        param2_ant = param2
        mes = numeros[meses_num.indexOf(param2_ant)]
        param2 = "-"+mes+"-"
        indicador_mes = 2
        console.log("param2 = ", param2)
    }else if(meses_num.includes(paramUlt) && indicador_dia != 3 && paramUlt!=undefined){
        paramUlt_ant = paramUlt
        mes = numeros[meses_num.indexOf(paramUlt_ant)]
        paramUlt = "-"+mes+"-"
        indicador_mes = 3
        console.log("param3 = ", paramUlt)
    }else{
       console.log("ninguno")
       ninguno[i]=2
       console.log(ninguno)
       i++
    }

    //dias en numero

    if(dias_mes.includes(param1) && indicador_dia != 1 && indicador_mes != 1 && param1!=undefined){
        param1_ant = param1
        dias = dias_mes[dias_mes.indexOf(param1_ant)]
        if(dias<10){
            cero = "0"
        }
        param1 = "-"+cero+dias
        console.log("param1 = ", param1)
    }else if(dias_mes.includes(param2) && indicador_dia != 2 && indicador_mes != 2 && param2!=undefined){
        param2_ant = param2
        dias = dias_mes[dias_mes.indexOf(param2_ant)]
        if(dias<10){
            cero = "0"
        }
        param2 = "-"+cero+dias
        console.log("param2 = ", param2)
    }else if(dias_mes.includes(paramUlt) && indicador_dia != 3 && indicador_mes != 3 && paramUlt!=undefined){
        paramUlt_ant = paramUlt
        dias = dias_mes[dias_mes.indexOf(paramUlt_ant)]
        if(dias<10){
            cero = "0"
        }
        paramUlt = "-"+cero+dias
        console.log("param3 = ", paramUlt)
    }else{
       console.log("ninguno")
        ninguno[i]=3
        i++
    }
    if(i>=3){
        return param1
    }else if(i==2){

    }else if(i==1){
        console.log(param1,paramUlt)
        param3 = param1+paramUlt
        return param3
    }else if(i=0){

    }
}

module.exports = ACController