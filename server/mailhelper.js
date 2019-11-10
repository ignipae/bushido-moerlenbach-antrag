const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = {
  email: 'no-reply@bushido-moerlenbach.de',
  name: 'Bushido Moerlenbach'
};

const greetings = '<div style="color: black"><h4>Vielen Dank für Ihre Anfrage!</h4><br>';
const goodbye = '<br><br><br><strong>Mit freundlichen Grüßen</strong></div>';

const sendMail = (formData, callback) => {
  const msg = {
    to: ['julian.breuksch@gmail.com', formData.email],
    from,
    templateId: 'd-3fcbde5fc0ad47af8930a9e51378712c',
    dynamic_template_data: formData,
    text: 'Please enable HTML to show the content'
  };
  sgMail.send(msg, callback);
};

module.exports = {
  sendMail
};
