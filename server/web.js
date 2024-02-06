const express = require('express');
const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: '10.6.38.137',
  user: 'root',
  password: 'root',
  database: 'se',
});

//read
app.get('/teacher', (req, res) => {
  const sqlQuery = 'SELECT * FROM teacher;';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('An error occurred in the query :', err);
      res.status(500).send('An error occurred fetching data');
      return;
    }
    res.json(results);
  });
});

app.get('/user', (req, res) => {
  const sqlQuery = 'SELECT * FROM users;';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('An error occurred in the query :', err);
      res.status(500).send('An error occurred fetching data');
      return;
    }
    res.json(results);
  });
});

app.get('/notification', (req, res) => {
  const sqlQuery = 'SELECT * FROM notification;';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('An error occurred in the query :', err);
      res.status(500).send('An error occurred fetching data');
      return;
    }
    res.json(results);
  });
});

app.get('/role', (req, res) => {
  const sqlQuery = 'SELECT user_role FROM users WHERE user_email="kannipit.p@ku.th"';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('An error occurred in the query :', err);
      res.status(500).send('An error occurred fetching data');
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});