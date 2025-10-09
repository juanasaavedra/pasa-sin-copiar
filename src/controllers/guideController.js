const db = require('../config/database');
const emailService = require('../services/email');
const path = require('path');
const fs = require('fs');

class GuideController {
  // Get all guides
  getAllGuides(req, res) {
    db.all('SELECT * FROM guides ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ guides: rows });
    });
  }

  // Get a single guide
  getGuide(req, res) {
    const { id } = req.params;
    
    db.get('SELECT * FROM guides WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!row) {
        return res.status(404).json({ error: 'Guide not found' });
      }
      
      res.json({ guide: row });
    });
  }

  // Create a new guide (admin)
  createGuide(req, res) {
    const { title, description, preview_url, file_url, price, category } = req.body;

    if (!title || !description || !file_url || price === undefined) {
      return res.status(400).json({ error: 'Title, description, file_url, and price are required' });
    }

    db.run(
      'INSERT INTO guides (title, description, preview_url, file_url, price, category) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, preview_url || null, file_url, price, category || null],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
          message: 'Guide created successfully',
          guideId: this.lastID
        });
      }
    );
  }

  // Update a guide (admin)
  updateGuide(req, res) {
    const { id } = req.params;
    const { title, description, preview_url, file_url, price, category } = req.body;

    db.run(
      'UPDATE guides SET title = ?, description = ?, preview_url = ?, file_url = ?, price = ?, category = ? WHERE id = ?',
      [title, description, preview_url, file_url, price, category, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Guide not found' });
        }

        res.json({ message: 'Guide updated successfully' });
      }
    );
  }

  // Delete a guide (admin)
  deleteGuide(req, res) {
    const { id } = req.params;

    db.run('DELETE FROM guides WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Guide not found' });
      }

      res.json({ message: 'Guide deleted successfully' });
    });
  }

  // Get guide preview
  getPreview(req, res) {
    const { id } = req.params;

    db.get('SELECT preview_url, title FROM guides WHERE id = ?', [id], (err, guide) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!guide) {
        return res.status(404).json({ error: 'Guide not found' });
      }

      if (!guide.preview_url) {
        return res.status(404).json({ error: 'Preview not available for this guide' });
      }

      res.json({ preview_url: guide.preview_url, title: guide.title });
    });
  }

  // Purchase a guide
  async purchaseGuide(req, res) {
    const { guide_id, buyer_name, buyer_email } = req.body;

    if (!guide_id || !buyer_name || !buyer_email) {
      return res.status(400).json({ error: 'Guide ID, buyer name, and email are required' });
    }

    // Get guide details
    db.get('SELECT * FROM guides WHERE id = ?', [guide_id], async (err, guide) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!guide) {
        return res.status(404).json({ error: 'Guide not found' });
      }

      // Create purchase record
      db.run(
        'INSERT INTO guide_purchases (guide_id, buyer_name, buyer_email, payment_status) VALUES (?, ?, ?, ?)',
        [guide_id, buyer_name, buyer_email, 'completed'],
        async function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const purchaseId = this.lastID;

          try {
            // Send purchase confirmation email with download link
            await emailService.sendGuidePurchaseEmail(
              { buyer_name, buyer_email },
              guide
            );

            // Send admin notification
            await emailService.sendAdminNotification('Nueva Compra de Guía', {
              purchaseId,
              guide: guide.title,
              buyer_name,
              buyer_email,
              price: guide.price
            });

            res.status(201).json({
              message: 'Purchase successful',
              purchaseId,
              downloadLink: `${process.env.APP_URL}/api/guides/${guide_id}/download?email=${buyer_email}`
            });
          } catch (emailError) {
            console.error('Error sending purchase email:', emailError);
            res.status(201).json({
              message: 'Purchase created but email could not be sent',
              purchaseId
            });
          }
        }
      );
    });
  }

  // Download a guide (requires purchase verification)
  downloadGuide(req, res) {
    const { id } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Verify purchase
    db.get(
      'SELECT gp.*, g.file_url, g.title FROM guide_purchases gp JOIN guides g ON gp.guide_id = g.id WHERE gp.guide_id = ? AND gp.buyer_email = ?',
      [id, email],
      (err, purchase) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!purchase) {
          return res.status(403).json({ error: 'Purchase not found or unauthorized' });
        }

        // In a real application, you would serve the actual file
        // For now, we'll redirect to the file URL
        res.json({
          message: 'Download authorized',
          file_url: purchase.file_url,
          title: purchase.title
        });
      }
    );
  }

  // Get all purchases (admin)
  getAllPurchases(req, res) {
    const query = `
      SELECT gp.*, g.title as guide_title, g.price as guide_price
      FROM guide_purchases gp
      JOIN guides g ON gp.guide_id = g.id
      ORDER BY gp.created_at DESC
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ purchases: rows });
    });
  }
}

module.exports = new GuideController();
