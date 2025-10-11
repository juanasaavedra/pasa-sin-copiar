const db = require('../config/database');
const googleCalendar = require('../services/googleCalendar');
const emailService = require('../services/email');

class BookingController {
  // Get all bookings (admin)
  getAllBookings(req, res) {
    db.all('SELECT * FROM bookings ORDER BY date DESC, time DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ bookings: rows });
    });
  }

  // Get availability for a specific date
  async getAvailability(req, res) {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    try {
      // Get booked slots for the date
      db.all(
        'SELECT time, duration FROM bookings WHERE date = ? AND status != ?',
        [date, 'cancelled'],
        async (err, bookedSlots) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Get tutor availability from database
          const dayOfWeek = new Date(date).toLocaleDateString('es-ES', { weekday: 'long' });
          
          db.all(
            'SELECT * FROM availability WHERE day_of_week = ? AND is_available = 1',
            [dayOfWeek],
            (err, availableSlots) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              // Filter out booked slots
              const availability = this.calculateAvailableSlots(availableSlots, bookedSlots);
              res.json({ date, dayOfWeek, availability });
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new booking
  async createBooking(req, res) {
    const { student_name, student_email, tutor_name, date, time, duration, subject } = req.body;

    if (!student_name || !student_email || !tutor_name || !date || !time || !duration || !subject) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Create Google Calendar event
      let calendarEventId = null;
      try {
        const calendarEvent = await googleCalendar.createEvent({
          student_name,
          student_email,
          tutor_name,
          date,
          time,
          duration,
          subject
        });
        calendarEventId = calendarEvent.id;
      } catch (calError) {
        console.warn('Could not create calendar event:', calError.message);
      }

      // Insert booking into database
      db.run(
        `INSERT INTO bookings (student_name, student_email, tutor_name, date, time, duration, subject, status, google_calendar_event_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [student_name, student_email, tutor_name, date, time, duration, subject, 'confirmed', calendarEventId],
        async function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const bookingId = this.lastID;

          // Send confirmation email
          try {
            await emailService.sendBookingConfirmation({
              student_name,
              student_email,
              tutor_name,
              date,
              time,
              duration,
              subject
            });

            // Send admin notification
            await emailService.sendAdminNotification('Nueva Reserva', {
              bookingId,
              student_name,
              student_email,
              tutor_name,
              date,
              time,
              subject
            });
          } catch (emailError) {
            console.warn('Could not send email:', emailError.message);
          }

          res.status(201).json({
            message: 'Booking created successfully',
            bookingId,
            calendarEventId
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cancel a booking
  async cancelBooking(req, res) {
    const { id } = req.params;

    db.get('SELECT * FROM bookings WHERE id = ?', [id], async (err, booking) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      try {
        // Delete from Google Calendar if event ID exists
        if (booking.google_calendar_event_id) {
          try {
            await googleCalendar.deleteEvent(booking.google_calendar_event_id);
          } catch (calError) {
            console.warn('Could not delete calendar event:', calError.message);
          }
        }

        // Update booking status
        db.run(
          'UPDATE bookings SET status = ? WHERE id = ?',
          ['cancelled', id],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.json({ message: 'Booking cancelled successfully' });
          }
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  // Helper method to calculate available slots
  calculateAvailableSlots(availableSlots, bookedSlots) {
    const available = [];

    availableSlots.forEach(slot => {
      const startTime = this.timeToMinutes(slot.start_time);
      const endTime = this.timeToMinutes(slot.end_time);
      const slotDuration = 60; // 1 hour slots

      for (let time = startTime; time < endTime; time += slotDuration) {
        const timeStr = this.minutesToTime(time);
        
        // Check if this slot is booked
        const isBooked = bookedSlots.some(booked => {
          const bookedStart = this.timeToMinutes(booked.time);
          const bookedEnd = bookedStart + booked.duration;
          return time >= bookedStart && time < bookedEnd;
        });

        if (!isBooked) {
          available.push({
            tutor: slot.tutor_name,
            time: timeStr,
            duration: slotDuration
          });
        }
      }
    });

    return available;
  }

  timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}

module.exports = new BookingController();
