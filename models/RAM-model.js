'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    db = require('./db.js'),
    ACModel = () => {}

if (conn == "null") {
    console.log('aqui en null')
} else {
    console.log('aqui en otro lado')
}

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => {
    db.find(cb)
        // conn.ref('RAM/').orderByChild('fecha').once('value', cb)

}


ACModel.getOne = (id, cb) => {
    db.findById(id).exec(cb)
        // conn.ref('RAM/' + id).once('value', cb)
}

ACModel.push = (idmongo, id, data, cb) => {

    // console.log(data.nro_acuerdo)

    db.findById(idmongo).exec(async(err, bb) => {
            if (err) {
                conn.ref('RAM').child(id).set(data, async(err) => {
                    if (err) {
                        console.log('error al guardar el dato con el id: ' + id + ' en la nube')
                    } else {
                        console.log('exito')
                    }
                })
                const newAc = await new db(data)
                newAc.save(cb)
            } else {
                var updates = {}
                updates['/RAM/' + id] = data
                await conn.ref().update(updates, (err) => {
                    if (err) {
                        console.log('error al actualizar el dato con el id: ' + id + ' en la nube')
                    } else { console.log('') }
                })
            }
            await db.findByIdAndUpdate(idmongo, data, cb)
        })
        // if(db.where(id).exists()){
        //     // const newAc = new db(data)
        //     // newAc.save(cb)
        // }else{
        //     console.log('no entro')
        // }
        // conn.ref(`RAM/${id}`).once("value", snapshot => {
        //     if (snapshot.exists()) {
        //         var updates = {}
        //         updates['/RAM/' + id] = data
        //         conn.ref().update(updates, cb)
        //     } else {

    //         db.saveDatabase()
    //     }
    // })
}

ACModel.delete = (idmongo, id, cb) => {
    conn.ref('RAM/').child(id).remove((err) => {
        if (err) {
            console.log('error al eliminar el dato con el id: ' + id + ' en la nube')
        }
    })
    db.findByIdAndDelete(idmongo, cb)
}

module.exports = ACModel