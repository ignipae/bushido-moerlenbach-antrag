const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = {
  email: "no-reply@bushido-moerlenbach.de",
  name: "Bushido Moerlenbach"
};

const sendRegistrationMail = (formData, callback) => {
  const msg = {
    to: ["julian.breuksch@gmail.com", formData.email],
    from,
    templateId: "d-3fcbde5fc0ad47af8930a9e51378712c",
    dynamic_template_data: formData,
    text: "Please enable HTML to show the content",
    html: "&nbsp;"
  };
  sgMail.send(msg, callback);
};

const sendUnregistrationMail = (formData, callback) => {
  const msg = {
    to: ["julian.breuksch@gmail.com"],
    from,
    templateId: "d-bdcc808309d74cbf87e0e04191ae114a",
    dynamic_template_data: formData,
    text: "Please enable HTML to show the content",
    html: "&nbsp;"
  };
  sgMail.send(msg, callback);
};

module.exports = {
  sendRegistrationMail,
  sendUnregistrationMail
};
