const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendBookingConfirmation(booking) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.student_email,
      subject: 'Confirmación de Tutoría - Pasa Sin Copiar',
      html: `
        <h2>¡Tu tutoría ha sido confirmada!</h2>
        <p>Hola ${booking.student_name},</p>
        <p>Tu tutoría ha sido agendada exitosamente con los siguientes detalles:</p>
        <ul>
          <li><strong>Tutor:</strong> ${booking.tutor_name}</li>
          <li><strong>Materia:</strong> ${booking.subject}</li>
          <li><strong>Fecha:</strong> ${booking.date}</li>
          <li><strong>Hora:</strong> ${booking.time}</li>
          <li><strong>Duración:</strong> ${booking.duration} minutos</li>
        </ul>
        <p>Recibirás un recordatorio antes de tu sesión.</p>
        <p>¡Nos vemos pronto!</p>
        <p><em>Equipo Pasa Sin Copiar</em></p>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending booking confirmation email:', error);
      throw error;
    }
  }

  async sendEnrollmentConfirmation(enrollment, course) {
    const paymentLink = `${process.env.PAYMENT_BASE_URL}?course=${course.id}&email=${enrollment.student_email}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enrollment.student_email,
      subject: `Inscripción a ${course.title} - Pasa Sin Copiar`,
      html: `
        <h2>¡Bienvenido al curso!</h2>
        <p>Hola ${enrollment.student_name},</p>
        <p>Te has inscrito exitosamente al curso: <strong>${course.title}</strong></p>
        <p><strong>Descripción:</strong> ${course.description}</p>
        <p><strong>Duración:</strong> ${course.duration}</p>
        <p><strong>Precio:</strong> $${course.price}</p>
        <h3>Completa tu inscripción</h3>
        <p>Para finalizar tu inscripción, por favor completa el pago en el siguiente enlace:</p>
        <p><a href="${paymentLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Ir al pago</a></p>
        <p>O copia este enlace en tu navegador: ${paymentLink}</p>
        <p>Una vez completado el pago, recibirás acceso completo al curso.</p>
        <p><em>Equipo Pasa Sin Copiar</em></p>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Enrollment confirmation email sent:', info.messageId);
      return { info, paymentLink };
    } catch (error) {
      console.error('Error sending enrollment email:', error);
      throw error;
    }
  }

  async sendGuidePurchaseEmail(purchase, guide) {
    const downloadLink = `${process.env.APP_URL}/api/guides/${guide.id}/download?email=${purchase.buyer_email}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: purchase.buyer_email,
      subject: `Tu guía: ${guide.title} - Pasa Sin Copiar`,
      html: `
        <h2>¡Gracias por tu compra!</h2>
        <p>Hola ${purchase.buyer_name},</p>
        <p>Has adquirido la guía: <strong>${guide.title}</strong></p>
        <p>${guide.description}</p>
        <h3>Descarga tu guía</h3>
        <p>Puedes descargar tu guía en el siguiente enlace:</p>
        <p><a href="${downloadLink}" style="background-color: #2196F3; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Descargar Guía</a></p>
        <p>O copia este enlace en tu navegador: ${downloadLink}</p>
        <p>Este enlace estará disponible durante los próximos 30 días.</p>
        <p><em>Equipo Pasa Sin Copiar</em></p>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Guide purchase email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending guide purchase email:', error);
      throw error;
    }
  }

  async sendAdminNotification(type, data) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nueva actividad: ${type} - Pasa Sin Copiar`,
      html: `
        <h2>Nueva actividad en la plataforma</h2>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Detalles:</strong></p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Admin notification sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending admin notification:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();
