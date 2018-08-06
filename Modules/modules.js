const nodeMailer = require('nodemailer');
/** Email Module Start**/

var transporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'Your Email',
    pass: 'Your Password'
  }
});

function sendVerificationMail(host, mail, token, callback) {
  host = host.split(".");
  transporter.sendMail({
    from: 'Demo User <demoUser@gmail.com>',
    to: mail,
    subject: 'Verification Mail',
    html: "<a href=\"http://" + host[1] + "/api/v1/verify/auth?token=" + token + "\" target=\"_blank\">Please click on this link</a>"
  });
  callback("Mail Sent");
}
exports.sendVerificationMail = sendVerificationMail;
