import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Mail from '../../lib/Mail';

class CancellationMail {
  // Avoid the neccessity to call this method like a function
  // It can be called like: obj.key
  get key() {
    // For every job we need an unique key
    return 'CancellationMail';
  }

  // Method responsable to process and sent one email
  async handle({ data }) {
    // Retrieve the appointment data
    const { appointment } = data;

    // Send an email to the provider, informing him, that this appointment is available again
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment cancelled',
      // html: ''
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'day' dd 'of' MMMM', at' H:mm'h'",
          {
            locale: en,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
