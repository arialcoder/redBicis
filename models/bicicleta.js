var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

/*cada Schema tiene una propiedad 'methods' de instancia, va a responder instancias de este schema(biciclea)   */

bicicletaSchema.methods.toString = function(){
    return 'code: ' + this.code + ' | color: ' + this.color;
};

//all Bicis
/* Schema statics lo agrega directamente al modelo */
bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

// create
bicicletaSchema.statics.add = function(aBici, cb){
    this.create(aBici, cb);
};

// find byCode
bicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

// remove ByCode
bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};

//updateByCode
bicicletaSchema.statics.updateByCode = function (aBici, cb) {
	console.log("Estoy en el model:" + aBici.toString());
	this.updateOne(	{ code: aBici.code }, { modelo: aBici.modelo, color: aBici.color, ubicacion: aBici.ubicacion, }, cb);
};


module.exports = mongoose.model('Bicicleta', bicicletaSchema);