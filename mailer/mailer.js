const nodemailer = require('nodemailer');
 
 //Configurar cuenta de https://ethereal.email  
 const mailConfig = {
     host: 'smtp.ethereal.email',
     port: 587,
     auth: {
         user: '',
         pass: ''
     }
 };

module.exports = nodemailer.createTransport(mailConfig);