const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = {
    email: 'no-reply@bushido-moerlenbach.de',
    name: 'Bushido Moerlenbach'
};

const greetings = '<div style="color: black"><h4>Vielen Dank für Ihre Anfrage!</h4><br>';
const goodbye = '<br><br><br><strong>Mit freundlichen Grüßen</strong></div>';

const sendMail = (mailOptions, callback) => {


    const subject = 'Mitgliedschaftsantrag';
    const content = `${greetings}<br>Please see the entered information here:<br>----<br>${goodbye}`;
    const msg = {
        to: "julian.breuksch@gmail.com",
        from,
        subject: subject,
        text: 'Please enable HTML to show the content',
        html: content
    };
    sgMail.send(msg, callback);
};



module.exports = {
    sendMail,
    sendNotificationMail
};
