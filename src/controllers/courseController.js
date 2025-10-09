const db = require('../config/database');
const emailService = require('../services/email');

class CourseController {
  // Get all courses
  getAllCourses(req, res) {
    db.all('SELECT * FROM courses ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ courses: rows });
    });
  }

  // Get a single course
  getCourse(req, res) {
    const { id } = req.params;
    
    db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!row) {
        return res.status(404).json({ error: 'Course not found' });
      }
      
      res.json({ course: row });
    });
  }

  // Create a new course (admin)
  createCourse(req, res) {
    const { title, description, duration, price, image_url } = req.body;

    if (!title || !description || !duration || price === undefined) {
      return res.status(400).json({ error: 'Title, description, duration, and price are required' });
    }

    db.run(
      'INSERT INTO courses (title, description, duration, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [title, description, duration, price, image_url || null],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
          message: 'Course created successfully',
          courseId: this.lastID
        });
      }
    );
  }

  // Update a course (admin)
  updateCourse(req, res) {
    const { id } = req.params;
    const { title, description, duration, price, image_url } = req.body;

    db.run(
      'UPDATE courses SET title = ?, description = ?, duration = ?, price = ?, image_url = ? WHERE id = ?',
      [title, description, duration, price, image_url, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully' });
      }
    );
  }

  // Delete a course (admin)
  deleteCourse(req, res) {
    const { id } = req.params;

    db.run('DELETE FROM courses WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json({ message: 'Course deleted successfully' });
    });
  }

  // Enroll in a course
  async enrollInCourse(req, res) {
    const { course_id, student_name, student_email } = req.body;

    if (!course_id || !student_name || !student_email) {
      return res.status(400).json({ error: 'Course ID, student name, and email are required' });
    }

    // Get course details
    db.get('SELECT * FROM courses WHERE id = ?', [course_id], async (err, course) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Create enrollment
      db.run(
        'INSERT INTO enrollments (course_id, student_name, student_email) VALUES (?, ?, ?)',
        [course_id, student_name, student_email],
        async function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const enrollmentId = this.lastID;

          try {
            // Send enrollment email with payment link
            const { paymentLink } = await emailService.sendEnrollmentConfirmation(
              { student_name, student_email },
              course
            );

            // Update enrollment with payment link
            db.run(
              'UPDATE enrollments SET payment_link = ? WHERE id = ?',
              [paymentLink, enrollmentId],
              (err) => {
                if (err) {
                  console.error('Error updating payment link:', err);
                }
              }
            );

            // Send admin notification
            await emailService.sendAdminNotification('Nueva Inscripción', {
              enrollmentId,
              course: course.title,
              student_name,
              student_email
            });

            res.status(201).json({
              message: 'Enrollment successful',
              enrollmentId,
              paymentLink
            });
          } catch (emailError) {
            console.error('Error sending enrollment email:', emailError);
            res.status(201).json({
              message: 'Enrollment created but email could not be sent',
              enrollmentId
            });
          }
        }
      );
    });
  }

  // Get all enrollments (admin)
  getAllEnrollments(req, res) {
    const query = `
      SELECT e.*, c.title as course_title, c.price as course_price
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.created_at DESC
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ enrollments: rows });
    });
  }
}

module.exports = new CourseController();
