const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost", // ตาม ip server
  port: "3306",
  user: "root",
  password: "root",
  database: "se", // แก้เป็น se
});

//read
app.get("/teacher", (req, res) => {
  const sqlQuery = "SELECT * FROM teacher;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.get("/user", (req, res) => {
  const sqlQuery = "SELECT * FROM users;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.get("/notification", (req, res) => {
  const sqlQuery = "SELECT * FROM notification;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.get("/role", (req, res) => {
  const sqlQuery = "SELECT * FROM users;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});




app.get("/subjectid", (req, res) => {
  const sqlQuery = "SELECT * FROM subject;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.get("/getnote", (req, res) => {
  const sqlQuery = "SELECT * FROM note;";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.post("/sendnote", (req, res) => {
  const { user_id, user_name, user_email, note, note_time} = req.body;

  if (!user_id || !user_name || !user_email || !note || !note_time) {
    return res.status(400).send("Missing required fields");
  }

  connection.query(
    "INSERT INTO note (user_id, user_name, user_email, note, note_time) VALUES (?, ?, ?, ?,?)",
    [user_id, user_name, user_email, note, note_time],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while inserting values");
      } else {
        return res.send("Values inserted");
      }
    }
  );
});

app.post("/sendnoti", (req, res) => {
  const {user_id, user_name, user_email, noti} = req.body;

  connection.query(
    "INSERT INTO notification (user_id, user_name, user_email, noti) VALUES (?,?,?,?)",
    [user_id, user_name, user_email, noti],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while inserting values");
      } else {
        return res.send("Values inserted");
      }
    }
  );
});

app.post('/updateRole', (req, res) => {
  const { username, role } = req.body;
  console.log(username, role)
  const sql = "UPDATE users SET user_role = ? WHERE user_name = ?";

  connection.query(sql, [role, username], (err, result) => {
    // if (err) {
    //   // console.error(`เกิดข้อผิดพลาดในการอัปเดตข้อมูลของผู้ใช้ ${username}:`, err);
    //   res.status(500).json({message:"ล้มเหลว"})
    // } else {
    //   // console.log(`อัปเดตข้อมูลของผู้ใช้ ${username} ให้เป็น ${role} สำเร็จ`);
    //   res.status(200).json({message:"สำเร็จ"})
    // }
    console.log(result)
    res.status(200).json({ message: "สำเร็จ" })
  });
  //res.status(200).json({message:sql})

  //   // ตรวจสอบว่ามีข้อมูลที่ส่งมาหรือไม่
  //  // Check if receivedData is an array
  // if (!Array.isArray(receivedData)) {
  //   console.error('Received data is not an array');
  //   return res.status(400).json({ error: 'Received data is not an array' });
  // }

  //   // ทำการอัปเดตข้อมูลในฐานข้อมูล
  //   results.forEach(async (row) => {
  //     const { user_name, selectedRole } = row;
  //     const sql = "UPDATE users SET user_role = ? WHERE user_name = ?";
  //     connection.query(sql, [selectedRole, user_name], (err, result) => {
  //       if (err) {
  //         console.error(`เกิดข้อผิดพลาดในการอัปเดตข้อมูลของผู้ใช้ ${user_name}:`, err);
  //       } else {
  //         console.log(`อัปเดตข้อมูลของผู้ใช้ ${user_name} ให้เป็น ${selectedRole} สำเร็จ`);
  //       }
  //     });
  //   });


});

// app.post('/updateRole', (req, res) => {
//   let request = req.body
//   const query = 'SELECT * FROM users WHERE user_email = "' + request.user_email + '"';

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       // ไม่เจอให้สร้างใหม่
//       if (!results.length) {
//         console.log("Email : " + request.user_email + " not found in database")
//         res.status(500).json({ error: "Email : " + request.user_email + " not found in database" });
//       } else { // ถ้าเจอให้อัพเดทข้อมูล
//         console.log("Email : " + request.user_email + " found in database")
//         const query = 'UPDATE users SET user_role = "' + request.user_role + '" WHERE user_email = "' + results[0].user_email + '"';

//         db.query(query, (err, results) => {
//           if (err) {
//             console.error('Error querying MySQL:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//           } else {
//             // อัพเดทข้อมูลสำเร็จ
//             console.log("Email : " + request.user_email + " update Success")
//             res.status(200).json({ success: true });
//           }
//         });
//       }
//     }
//   });
// });

app.post("/sendtemp", (req, res) => {
  const subject_id = req.body.subject_id;
  const subject_year = req.body.subject_year;
  const subject_name = req.body.subject_name;
  const subject_major_id = req.body.subject_major_id;
  const subject_credit = req.body.subject_credit;

  connection.query(
    "INSERT INTO subject (subject_id,subject_year,subject_name,subject_major_id,subject_credit) VALUES(?,?,?,?,?)",
    [subject_id, subject_year, subject_name, subject_major_id, subject_credit],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});


app.delete("/deletenote/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sqlQuery = "DELETE FROM note WHERE note_id = ?";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});





app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
