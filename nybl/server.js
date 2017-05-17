var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var bodyParser = require("body-parser");

var sql = require("./sql");
var pdf = require("./pdf");
var sendmail = require("./mailsend");

var jsonParser = bodyParser.json();
app.use(express.static(__dirname + "/"));

app.post('/topdf', upload.single('photo'), function(req, res) {
	try {
		// crea or update user in db
		sql.readByEmailId(req);
	} catch (er) {
		console.log('error in topdf1 ' + er.message);
	}

	// creat and send to client pdf file
	pdf.toPDF(req.body, req.file.buffer, function(buff) {
		res.set('Content-Type', 'aplication/pdf');
		res.set('Content-Disposition', 'filename="filename.pdf"');
		res.send(buff);
		// res.end(buff);
		if (req.body.sendmail === 'on') {
			try {
				// send to client's mail pdf file
				sendmail.sendtoMail(req.body.email, buff);
			} catch (err) {
				console.log('error in topdf2 ' + err.message);
			}
		}
	});
});

app.post('/existsmail', jsonParser, function(req, res) {
	console.log(req.body);
	// get user from db
	sql.readByEmailAll(req, function(err, reslt, fiel) {
		try {
			console.dir('reslt.length == ' + reslt.length);
			if (reslt.length === 0) {
				res.json(false);
				console.log('return false');
			}
			if (reslt.length === 1) {
				console.log('return true*************');
				// if row exists creat pdf file, save it and send to client's
				// mail
				pdf.toPDF(reslt[0], reslt[0].photo, function(buffPdf) {
					sql.savePdf(reslt[0].id, buffPdf);
					try {
						sendmail.sendtoMail(reslt[0].email, buffPdf);
					} catch (err) {

					}
				});
				res.json(true);
				console.log('return true');
			}
		} catch (er) {
			res.json({
				error : 'Временные неполадки, попробуйте позже'
			});
			console.log('error in existsmail ' + er.message);
		}
	});

});

app.listen(8080);
