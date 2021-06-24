const mongoose = require("mongoose");

const bicicletaSchema = new mongoose.Schema({
	code: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	modelo: {
		type: String,
		required: true,
	},
	ubicacion: {
		type: [Number],
		index: { type: "2dsphere", sparse: true }, // se crea un indice de tipo geografico (2dsphere)
	},
});

bicicletaSchema.methods.toString = function () {
	return "code: " + this.code + " color: " + this.color;
};

bicicletaSchema.statics.createInstance = function (
	code,
	color,
	modelo,
	ubicacion
) {
	return new this({
		code: code,
		color: color,
		modelo: modelo,
		ubicacion: ubicacion,
	});
};

bicicletaSchema.statics.allBicis = function (cb) {
	return this.find({}, cb);
};

bicicletaSchema.statics.add = function (aBici, cb) {
	this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function (aCode, cb) {
	return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
	return this.deleteOne({ code: aCode }, cb);
};

bicicletaSchema.statics.updateByCode = function (aBici, cb) {
	console.log("Estoy en el model:" + aBici.toString());
	this.updateOne(
		{ code: aBici.code },
		{
			modelo: aBici.modelo,
			color: aBici.color,
			ubicacion: aBici.ubicacion,
		},
		cb
	);
};

module.exports = mongoose.model("Bicicleta", bicicletaSchema);

// const Bicicleta = function (id, color, modelo, ubicacion) {
//     this.id = id;
//     this.color = color;
//     this.modelo = modelo;
//     this.ubicacion = ubicacion;
// }

// Bicicleta.prototype.toString = () => {
//     return `id: ${this.id} | color ${this.color}`;
// }

// Bicicleta.allBicis = [];
// Bicicleta.add = (newBici) => {
//     Bicicleta.allBicis.push(newBici);
// }

// Bicicleta.findById = (biciId) => {
//     const bici = Bicicleta.allBicis.find( b => b.id == biciId);
//     if(bici) return bici;
//     //else throw new Error(`No existe una bicicleta con el id ${biciId}`)
//     else return -202;
// };

// Bicicleta.removeById = (biciIdToDelete) => {
//     //Bicicleta.findById(biciIdToDelete); // Tira error sino existe
//     for (let index = 0; index < Bicicleta.allBicis.length; index++) {
//         if(Bicicleta.allBicis[index].id == biciIdToDelete) {
//             Bicicleta.allBicis.splice(index, 1);
//             break;
//         }
//     }
// };

// const a = new Bicicleta(1,'rojo','urbana',[-34.6012424,-58.3861497]);
// const b = new Bicicleta(2,'blanca','urbana',[-34.596932,-58.3808287]);

// Bicicleta.add(a);
// Bicicleta.add(b);

// module.exports = Bicicleta;
