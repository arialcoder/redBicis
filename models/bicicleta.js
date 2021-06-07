var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

//Redefino toString
Bicicleta.prototype.toString = function(){
    return 'id: ' + this.id + "| color:" + this.color;
}


//Array para guardar las bicis
Bicicleta.allBicis = [];

Bicicleta.add = function(unaBici){
    Bicicleta.allBicis.push(unaBici)
}


//Buscar una bici por id
Bicicleta.findById = function(unaBiciId){
   var unaBici = Bicicleta.allBicis.find(x => x.id == unaBiciId);
    if(unaBici)
        return unaBici;
    else
        throw new Error(`No existe una bicicleta con ese id ${unaBici}`
        );
    
}

//Eliminar una bici 
Bicicleta.removeById = function(unaBiciId){
    for (let i = 0; i < Bicicleta.allBicis.length; i++) {
        if(Bicicleta.allBicis[i].id==unaBiciId){
            Bicicleta.allBicis.splice(i,1);
            break;
        }
        
    }
}

let a = new Bicicleta(1,'rojo', 'urbana',[51.504201, -0.082483]);
let b = new Bicicleta(2,'blanca', 'urbana',[51.50332, -0.082998]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;