// Author: Max McCord
// Date:   Feb 26, 2017

module.exports = function (config, nodemailer) {
   // All emails will be sent via this transporter. For this to work, the
   // credentials must be updated in the configuration file!
   var smtpTransporter = nodemailer.createTransport({
      service: config.smtp.service,
      auth: {
         user: config.smtp.user,
         pass: config.smtp.pass
      }
   });

   // Prevent code injection by replacing various characters.
   function sanitize(content) {
      return content.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/\[/g, '&#91;')
                    .replace(/\]/g, '&#93;')
                    .replace(/\(/g, '&#40;')
                    .replace(/\)/g, '&#41;');
   };

   // Exported functions
   return {
      sendMail: function (name, email, message, callback) {
         var content = 'You got a new message!\n\n';
         content += '<b>Name:</b> ' + name + '\n';
         content += '<b>Email:</b> ' + email + '\n\n';
         content += sanitize(message);

         var mailOptions = {
            from:    '"Max McCord" <maxmccord93@gmail.com>',
            to:      'maxmccord93@gmail.com',
            subject: 'Portfolio Site: Message from ' + name,
            text:    content,
            html:    content.replace(/\n/g, '<br />')
         };

         smtpTransporter.sendMail(mailOptions, callback);
      }
   }
};
