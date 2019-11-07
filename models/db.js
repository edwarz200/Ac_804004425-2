var mongoose = require('mongoose'),
    Schema = mongoose.Schema

const Ac_Schema = new Schema({
    acuerdo_id: { type: String, required: true },
    nro_acuerdo: { type: String, required: true },
    fecha: { type: Date, require: true },
    detalle: { type: String, require: true },
    date_ag: { type: String, default: Date.now }
})

module.exports = mongoose.model('RAM', Ac_Schema)