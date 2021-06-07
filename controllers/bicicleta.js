var Bicicleta = require('../models/bicicleta');


//bicis:Bicicleta.allbicis, bicis es un objeto que referencia a la lista de bicicletas, en el layout index.pug se lo llama para listar con una tabla las bicicletas en la ruta bicicletas/index.pug
exports.bicicleta_list = function(req,res){
    res.render('bicicletas/index',{bicis: Bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req,res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req,res){
   var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
   bici.ubicacion = [req.body.lat, req.body.lng];
   Bicicleta.add(bici);

   res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id);
    console.log(bici);

    res.render('bicicletas/update',{bici});
}

exports.bicicleta_update_post = function(req,res){
   var bici = Bicicleta.findById(req.params.id);
   bici.id = req.body.id;
   bici.color = req.body.color;
   bici.modelo = req.body.modelo;
   bici.ubicacion = [req.body.lat, req.body.lng];
   
   res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req,res){
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}