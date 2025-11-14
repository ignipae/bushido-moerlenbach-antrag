// const sgMail = require("@sendgrid/mail");
const nodemailer = require('nodemailer');
const path = require('path');
const { CostsConfig, CostCalculator } = require('./config/costs.config');
const viewPath = path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');

const hbs = require('nodemailer-express-handlebars');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.gmail_mail,
    pass: process.env.gmail_pass
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extName: '.handlebars',
    // partialsDir: viewPath,
    layoutsDir: viewPath,
    defaultLayout: false,
    partialsDir: partialsPath
  },
  viewPath: viewPath,
  extName: '.handlebars',
}));

const sendMail = (mailOptions, callback) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      callback()
    }
  });
}


const from = "Bushido Moerlenbach <bushidomoerlenbachformular@gmail.com>";

const test = (callback) => {

  var mailOptions = {
    to: 'julian.breuksch@gmail.com', // Change to your recipient
    from: from,
    replyTo: "mitglied@hellmann.club",
    subject: 'Mitgliedschaftsantrag - Bushido Moerlenbach',
    template: 'kuendigung',
    context: {
      email: "max.mustermann@example.com",
      vorname: "Max",
      nachname: "Mustermann",
      geb_jahr: "1990",
      geb_monat: "01", // Monatszahl für Januar
      geb_tag: "15",
      zahler_vorname: "Maria",
      zahler_nachname: "Mustermann",
      zahler_geb_jahr: "1965",
      zahler_geb_monat: "03", // Monatszahl für März
      zahler_geb_tag: "8",
      wechsel_passiv: true,
      effectiveDate: "10.03.1991",
      passiveAnnualFee: CostsConfig.annual.passive
    }

  };

  sendMail(mailOptions, callback);

}

const sendRegistrationMail = (formData, callback) => {
  // Add cost information to the email context
  const emailContext = {
    ...formData,
    registrationFee: CostCalculator.getRegistrationFee(),
    passiveAnnualFee: CostsConfig.annual.passive
  };

  var mailOptions = {
    to: ["mitglied@hellmann.club", formData.email],
    from,
    replyTo: "mitglied@hellmann.club",
    subject: 'Mitgliedschaftsantrag - Bushido Moerlenbach',
    template: 'antrag',
    context: emailContext

  };

  sendMail(mailOptions, callback);
};

const sendUnregistrationMail = (formData, callback) => {
  // Add cost information to the email context
  const emailContext = {
    ...formData,
    passiveAnnualFee: CostsConfig.annual.passive
  };

  var mailOptions = {
    to: ["mitglied@hellmann.club"],
    from,
    replyTo: "mitglied@hellmann.club",
    subject: 'Mitgliedschaftskündigung - Bushido Moerlenbach', 
    template: 'kuendigung', 
    context: emailContext

  };

  sendMail(mailOptions, callback);
};

// ################# legacy ################

const _test = (callback) => {
  const msg = {
    to: 'julian.breuksch@gmail.com', // Change to your recipient
    from: 'julian.breuksch@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',

    text: "Please enable HTML to show the content",

  }
  sgMail
    .send(msg)
    .then((res) => {
      console.log('Email sent')
      callback();
    })
    .catch((error) => {
      console.error(error)
    })
}


const _sendRegistrationMail = (formData, callback) => {
  const msg = {
    to: ["mitglied@hellmann.club", formData.email],
    from,
    templateId: "d-3fcbde5fc0ad47af8930a9e51378712c",
    dynamic_template_data: formData,
    text: "Please enable HTML to show the content",
    html: "&nbsp;"
  };
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
      callback();
    })
    .catch((error) => {
      console.error(error)
    })
};

const _sendUnregistrationMail = (formData, callback) => {
  const msg = {
    to: ["mitglied@hellmann.club"],
    from,
    templateId: "d-bdcc808309d74cbf87e0e04191ae114a",
    dynamic_template_data: formData,
    text: "Please enable HTML to show the content",
    html: "&nbsp;"
  };
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
      callback();
    })
    .catch((error) => {
      console.error(error)
    })
};

// ################# legacy ################

module.exports = {
  sendRegistrationMail,
  sendUnregistrationMail,
  test
};
