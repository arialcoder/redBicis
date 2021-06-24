const Bicicleta = require("../models/bicicleta");

exports.bicicleta_list = (req, res) => {
	Bicicleta.allBicis((err, bicicletas) => {
		res.render("bicicletas/index", { bicis: bicicletas });
	});
};

exports.bicicleta_create_get = (req, res) => {
	res.render("bicicletas/create");
};

exports.bicicleta_create_post = (req, res) => {
	const ubicacion = [req.body.lat, req.body.lng];
	const bici = Bicicleta.createInstance(
		req.body.code,
		req.body.color,
		req.body.modelo,
		ubicacion
	);
	Bicicleta.add(bici);

	res.redirect("/bicicletas");
};

exports.bicicleta_update_get = (req, res) => {
	console.log("update get ===>"+ req.params);
	Bicicleta.findByCode(req.params.code, (err, bici) => {
		console.log("req.params", req.params)
		res.render("bicicletas/update", { bici });
	});
};

exports.bicicleta_update_post = (req, res) => {
	Bicicleta.findByCode(req.params.code, (err, bici) => {
		bici.code = req.body.code;
		bici.color = req.body.color;
		bici.modelo = req.body.modelo;
		bici.ubicacion = [req.body.lat, req.body.lng];

		Bicicleta.updateByCode(bici, (err, biciA) => {
			if (err) console.log(err);
			res.redirect("/bicicletas");
		});
	});
};

exports.bicicleta_delete_post = (req, res) => {
	
	Bicicleta.removeByCode(req.body.code, (err, bici) => {
		console.log("req.params.code" + req.params.code);
		if (err) console.log(err);
		res.redirect("/bicicletas");
	});
};

exports.bicicleta_detail_get = (req, res) => {
	console.log("req.params.code" + req.params.code);
	Bicicleta.findByCode(req.params.code, (err, bici) => {
		if (err) console.log(err);
		res.render("bicicletas/detail", { bici });
	});
};
