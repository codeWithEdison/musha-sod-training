// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
   port: process.env.DB_PORT 
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
 
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      
      if (results.length > 0) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insert new user
      const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user', error: err.message });
        }
        
        // Return created user without password
        db.query(
          'SELECT * FROM users WHERE id = ?',
          [result.insertId],
          (err, rows) => {
            if (err) {
              return res.status(500).json({ message: 'Error retrieving created user', error: err.message });
            }
            
            res.status(201).json(rows[0]);
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'password  and password are required' });
    }
    
    // Find user by email
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      
      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const user = results[0];
      
      // Validate password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Create and assign token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );
      
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (protected route)
app.get('/api/users', authenticateToken, (req, res) => {
  try {
    db.query(
      'SELECT id, username, email, create_at, update_at FROM users',
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
        
        res.status(200).json(results);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID (protected route)
app.get('/api/users/:id', authenticateToken, (req, res) => {
  try {
    db.query(
      'SELECT id, username, email, create_at, update_at FROM users WHERE id = ?',
      [req.params.id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
        
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (protected route)
app.put('/api/users/:id', authenticateToken, (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = parseInt(req.params.id);
    
    // Ensure users can only update their own account
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Access denied: You can only update your own account' });
    }
    
    // Check if user exists
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Build update query based on provided fields
      const updates = [];
      const values = [];
      
      if (username) {
        updates.push('username = ?');
        values.push(username);
      }
      
      if (email) {
        updates.push('email = ?');
        values.push(email);
      }
      
      // If no fields to update
      if (updates.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
      
      // Add user ID to values array
      values.push(userId);
      
      // Update user
      const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
      
      db.query(updateQuery, values, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating user', error: err.message });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found or no changes made' });
        }
        
        // Return updated user
        db.query(
          'SELECT id, username, email, create_at, update_at FROM users WHERE id = ?',
          [userId],
          (err, rows) => {
            if (err) {
              return res.status(500).json({ message: 'Error retrieving updated user', error: err.message });
            }
            
            res.status(200).json(rows[0]);
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (protected route)
app.delete('/api/users/:id', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Ensure users can only delete their own account
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Access denied: You can only delete your own account' });
    }
    
    // Delete user
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting user', error: err.message });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Authentication API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


