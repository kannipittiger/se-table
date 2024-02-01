const express = require('express');
const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: '10.6.38.130',
  user: 'root',
  password: 'root',
  database: 'se',
});

//read
app.get('/data', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});