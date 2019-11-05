'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    db = require('./db.js'),
    ACModel = () => {}

// if (conn == "null") {
//     console.log('aqui en null')
// } else {
//     console.log('aqui en otro lado')
// }

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => {
    db.find(cb)
        // conn.ref('RAM/').once('value', cb)
}



ACModel.sync = () => {
    conn.ref('RAM/').orderByChild('fecha').once('value', snapshot => {
        // if (err) {
        //     console.log(err)
        // } else {
        var id, nro_acuerdo, fecha, detalle, data
        db.find((err, c) => {
                if (err) {
                    console.log(err)
                } else {
                    var childKey = {},
                        childSnapshot, isss = 0,
                        iss = 0
                    c.forEach(function(cc) {
                        let numsnapshot = 0,num = 0
                        id = cc.acuerdo_id
                        nro_acuerdo = cc.nro_acuerdo
                        fecha = cc.fecha
                        detalle = cc.detalle
                        data = { nro_acuerdo, fecha, detalle }
                        if(snapshot.exists()){
                            snapshot.forEach((childSnapshot) => {
                                childKey[isss] = childSnapshot.key
                                childSnapshot = snapshot.val()
                                    // childKey.objectID = childKey
                                if (childKey[isss] == cc.acuerdo_id) {
                                    var updates = {}
                                    updates['/RAM/' + id] = data
                                    conn.ref().update(updates, (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log("actualizado")
                                        }
                                    })
                                    console.log('entr00000o', childKey[isss], " cccccccc", cc.acuerdo_id)
                                    numsnapshot = 1
                                }
                                var vuelta = "vuelta numero " + num
                                console.log(vuelta)
                                num++
                            });
                            if(numsnapshot == 0){
                                conn.ref('RAM').child(id).set(data, async(err) => {
                                    if (err) {
                                        console.log('error al guardar el dato con el id: ' + id + ' en la nube')
                                    } else {
                                        console.log('exito')
                                    }
                                    numsnapshot = 0
                                })
                                console.log('no', childKey[isss], '  odsmosmdso', cc.acuerdo_id)
                            }
                            isss++
                        } else {
                            conn.ref('RAM').child(id).set(data, async(err) => {
                                if (err) {
                                    console.log('error al guardar el dato con el id: ' + id + ' en la nube')
                                } else {
                                    console.log('La base de datos estaba vacia')
                                    console.log('Contacto guardado con el id '+ id)
                                }
                            })

                        }

                        });
                }
            })
            // }
    }, function(error) {
        console.log('no entro error'+error);
    })

}

ACModel.syncMongo = () => {
    conn.ref('RAM/').orderByChild('fecha').once('value', snapshot => {
        // if (err) {
        //     console.log(err)
        // } else {
        var id, nro_acuerdo, fecha, detalle, data
        db.find((err, c) => {
                if (err) {
                    // console.log(err)
                } else {
                    console.log('entro')
                    var childKey = {},
                        childSnapshot, isss = 0,
                        iss = 0
                    snapshot.forEach(function(childSnapshot) {
                        childKey[isss] = childSnapshot.key
                        childSnapshot = snapshot.val()
                            // childKey.objectID = childKey
                        c.forEach(function(cc) {
                            id = cc.acuerdo_id
                            nro_acuerdo = cc.nro_acuerdo
                            fecha = cc.fecha
                            detalle = cc.detalle
                            data = { nro_acuerdo, fecha, detalle }
                            if (childKey[isss] == cc.acuerdo_id) {
                                var updates = {}
                                updates['/RAM/' + id] = data
                                conn.ref().update(updates, (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log("actualizado")
                                    }
                                })
                                console.log('entr00000o', childKey[isss], " cccccccc", cc.acuerdo_id)
                            } else {
                                conn.ref('RAM').child(id).set(data, async(err) => {
                                    if (err) {
                                        console.log('error al guardar el dato con el id: ' + id + ' en la nube')
                                    } else {
                                        console.log('exito')
                                    }
                                })
                                console.log('no', childKey[isss], '  odsmosmdso', cc.acuerdo_id)

                            }
                        })
                        isss++
                    })
                }
            })
            // }
    })

}



ACModel.getOne = (id, cb) => {
    db.findById(id).exec(cb)
        // conn.ref('RAM/' + id).once('value', cb)
}

ACModel.push = (idmongo, id, data, cb) => {

    // console.log(data.nro_acuerdo)
            db.findOne({ acuerdo_id: idmongo }).exec((err, bb) => {
                if (err) {
                } else {
                    if(bb==null){
                        console.log('entro al null')
                        conn.ref('RAM').child(id).set(data,(err) => {
                            if (err) {
                                console.log('error al guardar el dato con el id: ' + id + ' en la nube')
                            } else {
                                console.log('exito')
                                const newAc = new db(data)
                                newAc.save(cb)
                            }
                        })
                    }else{
                        console.log('no entro al null')
                        var updates = {}
                        updates['/RAM/' + id] = data
                        conn.ref().update(updates, (err) => {
                            if (err) {
                                console.log('error al actualizar el dato con el id: ' + id + ' en la nube')
                            } else {
                                console.log('actualizado')
                                db.findByIdAndUpdate(idmongo, data, cb)
                            }
                        })
                    }
                }
            })
            db.find({ acuerdo_id: idmongo }).exec(async(err, bb) => {
                if (err) {
                    const newAc =  new db(data)
                    newAc.save(cb)
                }else{
                     db.findByIdAndUpdate(idmongo, data, cb)
                }
            });
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