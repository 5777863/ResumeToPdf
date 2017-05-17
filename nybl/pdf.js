var PDFDocument = require('pdfkit');

function toPDF(body, buffphoto, callgood) {
	/*
	 * console.log(buffphoto); console.log(body);
	 */
	var doc = new PDFDocument();
	doc.registerFont('Cardo', 'fonts/TrixieCy.ttf');
	doc.fontSize(15);
	try {
		if (buffphoto.length > 10 * 1024 * 1024) {
			throw new Error('превышен размер файла');
		}
		doc.image(buffphoto, 25, 35, {
			fit : [ 150, 150 ]
		});
	} catch (err) {
		console.log(err.message);
	}

	if ((body.fio !== undefined) && (body.fio.length > 0)) {
		doc.font('Cardo');
		doc.text(body.fio, 190, 35, {
			width : 380
		});
		doc.moveDown(0.3);
	}

	if ((body.position !== undefined) && (body.position.length > 0)) {
		doc.text(body.position, {
			width : 380
		});
		doc.moveDown(0.3);
	}

	if ((body.email !== undefined) && (body.email.length > 0)) {
		doc.text('Email: ' + body.email, {
			width : 380
		});
		doc.moveDown(0.2);
	}
	if ((body.skype !== undefined) && (body.skype.length > 0)) {
		doc.text('Skype: ' + body.skype, {
			width : 380
		});
		doc.moveDown(0.2);
	}

	if ((body.phone !== undefined) && (body.phone.length > 0)) {
		doc.text('Телефон: ' + body.phone, {
			width : 380
		});
		doc.moveDown(0.2);
	}

	if ((body.linkedin !== undefined) && (body.linkedin.length > 0)) {
		doc.text('linkedIn: ' + body.linkedin, {
			width : 380
		});
		doc.moveDown(0.2);
	}

	if ((body.github !== undefined) && (body.github.length > 0)) {
		doc.text('GitHub: ' + body.github, {
			width : 380
		});
	}

	doc.text('Личная информация:', 25, 260);
	doc.moveDown(0.35);

	if ((body.old !== undefined) && (body.old.length > 0)) {
		doc.text('Возрраст: ' + body.old, {
			width : 570
		});
		doc.moveDown(0.2);
	}

	if ((body.eduk !== undefined) && (body.eduk.length > 0)) {
		doc.text('Образование: ' + body.eduk, {
			width : 570
		});
		doc.moveDown(0.2);
	}

	if ((body.course !== undefined) && (body.course.length > 0)) {
		doc.moveDown(0.9);
		doc.text('Курсы/сертификаты:');
		doc.moveDown(0.35);
		doc.text(body.cours, {
			width : 570
		});
	}

	if ((body.exper !== undefined) && (body.exper.length > 0)) {
		doc.moveDown(0.9);
		doc.text('Опыт работы/проекты:');
		doc.moveDown(0.35);
		doc.text(body.exper, {
			width : 570
		});
	}

	if ((body.lang !== undefined) && (body.lang.length > 0)) {
		doc.moveDown(0.9);
		doc.text('Знание языков:');
		doc.moveDown(0.35);
		doc.text(body.lang, {
			width : 570
		});
	}

	if ((body.dop !== undefined) && (body.dop.length > 0)) {
		doc.moveDown(0.9);
		doc.text('Дополнительно:');
		doc.moveDown(0.35);
		doc.text(body.dop, {
			width : 570
		});
	}

	// doc.pipe(res);
	// doc.pipe(fs.createWriteStream('file.pdf'));

	var buffers = [];
	doc.on('data', buffers.push.bind(buffers));
	doc.on('end', function() {
		var pdfData = Buffer.concat(buffers);
		callgood(pdfData);
	});

	doc.end();
}

module.exports.toPDF = toPDF;
