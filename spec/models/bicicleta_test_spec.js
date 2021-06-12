const mongoose = require('mongoose');

const Bicicleta = require('../../models/bicicleta');


describe ('Testing Bicicletas', function() {

    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology:true});
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('we are connected to test database!');
            done();
        });

    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
             mongoose.disconnect(err);
            done();
        });
    });


    describe ('Bicicleta.createInstance /create', () => {
        it('crea una instancia de Bicicleta', () => {
           var bici = Bicicleta.createInstance(1, "verde","urbana",[-34.5, -54.11] );
                
                expect(bici.code).toBe(1);
                expect(bici.color).toBe("verde");
                expect(bici.modelo).toBe("urbana");
                expect(bici.ubicacion[0]).toBe(-34.5);
                expect(bici.ubicacion[1]).toBe(-54.11);
            })
        });
    
    describe ("Bicicletas.allBicis", () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });                               
        });
     });

     describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            //expect(Bicicleta.allBicis.length).toBe(0);
    
            var aBici = new Bicicleta({code:1, color:'verde', modelo:'urbana'});
            Bicicleta.add(aBici, function(err, newBici){

                if(err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){

                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                }); 
            });                                      
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({ code: 2, color: "roja", modelo: "urbana" });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (err, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });

                });

            });
        });
    });


});
/*
exports.bicicleta_list = function(req,res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create = function(req,res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    })
}

exports.bicicleta_delete = function(req,res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}

exports.bicicletas_update = function(req,res){
	var bici = Bicicleta.findById(req.body.id);
	bici.id = req.body.id;
	bici.color = req.body.color;
	bici.modelo = req.body.modelo;
	bici.ubicacion = [req.body.lat,req.body.long];

	res.status(200).json({
		bicicleta: bici
	});
}
*/