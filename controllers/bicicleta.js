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


// exports.bicicleta_create_post = function(req, res){
//   var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
//   bici.ubicacion = [req.body.lat, req.body.lng]
//   Bicicleta.add(bici)
//   res.redirect('/bicicletas')
// }
exports.bicicleta_create_post = function (req, res) {
  let bici = new Bicicleta({
   code: req.body.code,
   color: req.body.color,
   modelo: req.body.modelo,
   ubicacion: [req.body.lat || 0, req.body.lng || 0]
 });
 console.log("va a guardar las bicicletas" + bici);
 Bicicleta.add(bici)
 res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function (req, res) {
  console.log("req.params", req.params)
  Bicicleta.findById(req.params.id).exec((err, bici) => {
    res.render('bicicletas/update', {
      bici
    });
  })
}
// exports.bicicleta_update_get = function(req, res){
//    Bicicleta.findById(req.params.id, function(err,bicicleta){
//      console.log('code:'+ req.params.id);
//     res.render('bicicletas/update');
//   })
  
// }

exports.bicicleta_update_post = function(req, res){
  var bici = Bicicleta.findById(req.params.id)
  bici.id = req.body.id
  bici.color = req.body.color
  bici.modelo = req.body.modelo
  bici.ubicacion = [req.body.lat, req.body.lng]

  Bicicleta.findByIdAndUpdate(req.params.id,bici, function(err){
    if (err)
    next(err);
      else
      res.redirect('/bicicletas');
  });
  
}

exports.bicicleta_delete_post = function (req, res) {
  console.log("delete",req.body.id);
  Bicicleta.findByIdAndDelete (req.body.id, function(err){
    if (err)
    next(err);
      else
    res.redirect('/bicicletas');

  });
} 
