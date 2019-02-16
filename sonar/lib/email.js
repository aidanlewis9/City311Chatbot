'use strict';
//const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

//module.exports = function email311() {

email311();

function email311() {

    // var the_words = "moo";
    //
    // nodemailer.createTestAccount((err, account) => {
    // // create reusable transporter object using the default SMTP transport
    //
    //     let transporter = nodemailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 465,
    //         auth: {
    //             user: "sbelitestpage@gmail.com", // generated ethereal user
    //             pass: "Aidanlewis7$" // generated ethereal password
    //         }
    //     });
    //
    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //         from: 'sbelitestpage@gmail.com', // sender address
    //         to: 'alewis9@nd.edu', // list of receivers
    //         subject: 'Hello', // Subject line
    //         text: 'Hello world?', // plain text body
    //         html: '<b>Hello world?</b>' // html body
    //     };
    //
    //     // send mail with defined transport object
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message sent: %s', info.messageId);
    //         // Preview only available when sending through an Ethereal account
    //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //
    //         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    //     });
    // });
    //
    // return the_words


    var nodemailer = require("nodemailer");

    //return return_text;

    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
           user: "sbelitestpage@gmail.com",
           pass: "Aidanlewis7$"
       }
    });

    smtpTransport.sendMail({  //email options
       from: "Sender Name <sbelitestpage@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
       to: "Receiver Name <alewis9@nd.edu>", // receiver
       subject: "Emailing with nodemailer", // subject
       text: "Email Example with nodemailer" // body
    }, function(error, response){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }

       smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
}
