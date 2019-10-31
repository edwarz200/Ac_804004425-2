// // for (var i = 0; i <= 100; i++) {	
// // 	var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
// // 	    letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// // 	var m_id = "AC_"
// // 	for (var j = 0; j < 3; j++) {
// // 		m_id += letras_a[Math.round(Math.random() * 3)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 26)]
// // 	}
// const	loki = require ('lokijs'),
// 	db = new loki ('db/db'+m_id+'.json')

// var select = db.addCollection('RAM', { disableChangesApi: false })
// 	// var s2 = db.getCollection('RAM')
// 	// doctors.insert ({nombre: 'Matt Smith', doctorNumber: 11})
// 	// if(select==null){
// 	// 	console.log("no existe")
// 	// }else{
// 	// 	console.log("existe")
// 	// }
// 	// console.log(s2)
// 	select.insert({nombre: 'r gpennkkant', doctorNumber: 10})
// 	db.throttledSaveDrain(function(success){
// 	       	if (success) {
// 	        	console . log ( "Exito" );
// 			} else {
// 	       		console . log ( " tarda demasiado, inténtalo de nuevo más tarde " );
// 	      	}
// 	}, {recursiveWaitLimit : true , recursiveWaitLimitDuration : 2000 });


// 	// // module.exports = db
// 	db.saveDatabase()
// }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Ac_Schema = new Schema({
	acuerdo_id: {type: String,required:true},
	nro_acuerdo: {type:String,required:true},
	fecha: {type:String,require:true},
	detalle: {type:String,require:true},
	date_ag:{type:String,default:Date.now}
})

module.exports = mongoose.model('RAM',Ac_Schema)