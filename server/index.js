const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config()

// MySQL connection configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aircraft_spotter',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// API endpoints
app.get('/api/aircraft', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM aircraft_logs');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching aircraft logs:', error);
    res.status(500).send('Error fetching aircraft logs');
  }
});

app.post('/api/aircraft', async (req, res) => {
  try {
    const { registration, type, location } = req.body;
    const [result] = await pool.query(
      'INSERT INTO aircraft_logs (registration, type, location) VALUES (?, ?, ?)',
      [registration, type, location]
    );
    res.status(201).send({ id: result.insertId });
  } catch (error) {
    console.error('Error creating aircraft log:', error);
    res.status(500).send('Error creating aircraft log');
  }
});

app.put('/api/aircraft/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { registration, type, location } = req.body;
    const [result] = await pool.query(
      'UPDATE aircraft_logs SET registration = ?, type = ?, location = ? WHERE id = ?',
      [registration, type, location, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).send('Aircraft log not found');
    } else {
      res.status(200).send('Aircraft log updated');
    }
  } catch (error) {
    console.error('Error updating aircraft log:', error);
    res.status(500).send('Error updating aircraft log');
  }
});

app.delete('/api/aircraft/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM aircraft_logs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Aircraft log not found');
    } else {
      res.status(200).send('Aircraft log deleted');
    }
  } catch (error) {
    console.error('Error deleting aircraft log:', error);
    res.status(500).send('Error deleting aircraft log');
  }
});

app.get('/api/health', async (req, res) => {
  try {
    console.log("health endpoint pinged!!!")
    res.status(200).send('Health status OK!!');
  } catch (error) {
    console.error('Error in health endpoint:', error);
    res.status(500).send('Error at health endpoint');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});