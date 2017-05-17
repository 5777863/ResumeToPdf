var mysql = require("mysql");

var setting = {
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : '12345',
	database : 'nodejstest'
};

/*
 * var connection = mysql.createConnection({ host : 'localhost', user : 'root',
 * password : '12345', database : 'nodejstest' });
 */

var pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : '12345',
	database : 'nodejstest'
});

// insert to DB
function creat(req) {
	var buffPhoto = req.file.buffer;
	pool
			.query(
					"insert into nyblecraft (name, position, email, skype, phone, linkedin, github, old, educat, course, exper, lang, dop, photo)"
							+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
					[ req.body.fio, req.body.position, req.body.email,
							req.body.skype, req.body.phone, req.body.linkedin,
							req.body.github, req.body.old, req.body.eduk,
							req.body.cours, req.body.exper, req.body.lang,
							req.body.dop, buffPhoto ], function(error, results,
							fields) {
						console.log(results);
						console.log(error);
					});
}

// insert pdf to DB
function savePdf(idUser, buffPdf) {
	pool.query("update nyblecraft set pdf=? where id=?", [ buffPdf, idUser ],
			function(error, results, fields) {
				console.log(results);
				console.log(error);
			});
	console.log('**************');
}

// update
function update(id, req) {
	var buffPhoto = req.file.buffer;
	pool
			.query(
					"update nyblecraft set name=?, position=?, skype=?, phone=?, linkedin=?, github=?, old=?, educat=?,"
							+ " course=?, exper=?, lang=?, dop=?, photo=? where id=?",
					[ req.body.fio, req.body.position, req.body.skype,
							req.body.phone, req.body.linkedin, req.body.github,
							req.body.old, req.body.eduk, req.body.cours,
							req.body.exper, req.body.lang, req.body.dop,
							buffPhoto, id ], function(error, results, fields) {
				//		console.dir(results.length);
						console.log(error);
					});
}

// exists row by email return id
function readByEmailId(req, call) {
	pool.query("select id from nyblecraft where email=?", [ req.body.email ],
			function(error, results, fields) {
				if (results.length === 0) {
					creat(req);
					console.log('new row to DB******');
				}
				if (results.length === 1) {
					update(results[0].id, req);
					console.log('update row in DB******');
				}
			//	console.dir(results.length);
				console.log(error);
			});
}

// exists row by email return all date from row
function readByEmailAll(req, call) {
	pool.query("select * from nyblecraft where email=?", [ req.body.email ],
			function(error, results, fields) {
				call(error, results, fields);
			});
}

module.exports.readByEmailId = readByEmailId;
module.exports.readByEmailAll = readByEmailAll;
module.exports.savePdf = savePdf;
