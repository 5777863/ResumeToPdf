var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
	service : 'Mail.ru',
	auth : {
		user : 'resume_to_pdf@mail.ru',
		pass : '90786anvg'
	}
});

function sendtoMail(email, buffPdf){
	// setup email data with unicode symbols
	var mess = {
		from : '"ResumeToPdf" <resume_to_pdf@mail.ru>', // sender address
		to : email, // list of receivers
		subject : 'Ваше резюме', // Subject line
		text : '', // plain text body
		html : '<b>Ваше рюземе в pdf формате</b>', // html body
		attachments : [ { // binary buffer as an attachment
			filename : 'MyResume.pdf',
			content : buffPdf
		}, ]
	};

	// send mail with defined transport object
	transporter.sendMail(mess, function(error, info) {
		if (error) {
			return false;
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
}

module.exports.sendtoMail = sendtoMail;
