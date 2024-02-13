const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'stronger',
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

app.get('/subjectid', (req, res) => {
  const sqlQuery = 'SELECT * FROM subject;';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('An error occurred in the query :', err);
      res.status(500).send('An error occurred fetching data');
      return;
    }
    res.json(results);
  });
});

app.post('/sendtemp', (req, res) => {
  const subject_id = req.body.subject_id;
  const subject_year = req.body.subject_year;
  const subject_name = req.body.subject_name;
  const subject_major_id = req.body.subject_major_id;
  const subject_credit = req.body.subject_credit

  connection.query("INSERT INTO subject (subject_id,subject_year,subject_name,subject_major_id,subject_credit) VALUES(?,?,?,?,?)",
      [subject_id,subject_year,subject_name,subject_major_id,subject_credit],
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send("Values inserted")
          }
      }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});