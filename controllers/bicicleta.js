var Bicicleta = require('../models/bicicleta');


/*bicis:Bicicleta.allbicis, bicis es un objeto que referencia a la lista de bicicletas,
 en el layout index.pug se lo llama para listar con una tabla las bicicletas en la ruta bicicletas/index.pug */
 exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis().exec((err, bicis) => {
        res.render('bicicletas/index', {bicis});
    })
    
  }

exports.bicicleta_create_get = function(req,res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req,res){
   var bici = new Bicicleta({ code: req.body.code, color: req.body.color, modelo: req.body.modelo });
   bici.ubicacion = [req.body.lat, req.body.lng];
   Bicicleta.add(bici);

   res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req,res){
    Bicicleta.findById(req.params.id, function(err, bici){ console.log(bici);
        res.render('bicicletas/update', {bici});
    });
}

exports.bicicleta_update_post = function(req,res){
    var update_values = { 
        color : req.body.color,
        modelo: req.body.modelo,
        ubicacion : [req.body.lat, req.body.lng]
    };
    Bicicleta.findByIdAndUpdate(req.params.id, update_values,
      (err, bicicleta) => {
      //if there is a error we render the View with a error
      if (err) {
        console.log(err);
        res.render('bicicletas/update', {
          errors: err.errors,
          bicicleta
        })
      } else {
        //If everthing is Ok we render to bicicletas
        res.redirect('/bicicletas');
        return;
      }
    })
  }

exports.bicicleta_delete_post = function(req,res){
    Bicicleta.removeById(req.body.id, (err, raw) =>{
        res.redirect('/bicicletas');
    });   
}