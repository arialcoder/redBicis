var server = require('../../bin/www');
var request = require('request');
var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');



var base_url = "http://localhost:3000/api/bicicletas";

describe ('Bicicleta API', () => {
    beforeAll(async ()=>{
        await mongoose.disconnect();
    });

<<<<<<< HEAD
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser: true })
=======

    beforeAll(function(done){
        mongoose.connection.close(done)});

    beforeAll(function(done) {

        
         var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        
>>>>>>> b7678b4bfdaa6a06f9e182c818ea2622bb4dc117
        const db = mongoose.connection;
        db.on('error', console.error.bind(console,'connection error'));
        db.once('open',function(){
            console.log('we are connected to test database');
            done();
        });    
    });

    afterEach(function(done){
        Bicicleta.deleteMany({},function( err, success){
            if (err) console.log(err);
            mongoose.disconnect(err); 
            done();
<<<<<<< HEAD
        });
    });
=======
        });  
    });   
>>>>>>> b7678b4bfdaa6a06f9e182c818ea2622bb4dc117
    

    describe ("GET BICICLETAS /", () => {
        it('Status 200', (done) => {
            request.get(base_url, function(error, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    

 describe ('POST BICICLETAS /delete', () => {
    it('Status 204', (done) => {
        var headers = {'content-type' : 'application/json'};
        var a = new Bicicleta({code: 10, color: 'rojo', modelo: 'urbana', ubicacion: [-34, -54]});
        var aBiciId = { "id": a.code };
        Bicicleta.add (a);
        
        expect(Bicicleta.allBicis.length).toBe(1);

        request.post({
            headers: headers,
            url: base_url + '/delete',
            body: JSON.stringify(aBiciId)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(204);
            Bicicleta.allBicis(function(err, doc) {
                expect(doc.length).toBe(0);
                done();
            });
        });
    });
});


    
});