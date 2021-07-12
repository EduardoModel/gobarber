export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Team GoBarber <noreply@gobarber.com',
  },
};

/*
  Mail senders:
  Amazon SES
  Mailgun
  Sparkpost
  Mandril (Mailchimp)

  Mailtrap (DEV only)
*/
