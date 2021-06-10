const Bicicleta = require('../../models/bicicleta');

beforeEach(() => {Bicicleta.allBicis = [] ;});

describe('Bicicleta.allbicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    } );
});

describe('Bicicleta.add', () => {
    it('agregarmos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let a = new Bicicleta(1, 'rojo', 'urbana', [51.50332, -0.082998]);
        Bicicleta.add(a);
        
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    })
})

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let aBici = new Bicicleta(1, 'verde', 'urbana');
        let aBici2 = new Bicicleta(2, 'amarilla', 'urbana');

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        let targetBici = Bicicleta.findById(1);

        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    })
})

describe('Bicicleta.removeById', () => {
    it('debe eliminar la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let aBici = new Bicicleta(1, 'verde', 'urbana');
        let aBici2 = new Bicicleta(2, 'amarilla', 'urbana');

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        Bicicleta.removeById(1);

        expect(Bicicleta.allBicis.length).toBe(1);
    })
})


