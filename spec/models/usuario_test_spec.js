const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
const Usuario = require('../../models/usuario');
const Reserva = require('../../models/reserva');

describe('Testing Usuarios', function() {

    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect( mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true } );

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('we are connected to test database!');
            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, function(err, success){
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err, success){
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success){
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('Cuando un Usuario reserva una bici',() => {
        it('debe existir la reserva', (done) => {
            var usuario = new Usuario({nombre: 'Ariel'});
            usuario.save(function(err, user){
                const bicicleta = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                bicicleta.save();

                    let hoy = new Date();
                    let mañana = new Date();
                    mañana.setDate(hoy.getDate()+1); 
                    user.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
                        /*para acceder directamente al modelo usar find y populate, pasar por string el nombre de la propiedad
                        (bicicleta), se ejecuta la busqueda "devuelve un objeto intermedio"(promesa) y luego el callback */
                        Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                            console.log(reservas[0]);
                            expect(reservas.length).toBe(1);
                            expect(reservas[0].diasDeReserva()).toBe(2);
                            expect(reservas[0].bicicleta.code).toBe(1);
                            expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                            done();
                        });
                    });
                });
        });
    });
});