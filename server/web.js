const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "10.64.194.236", // ตาม ip server
  port: "3306",
  user: "root",
  password: "root",
  database: "se", // แก้เป็น se
});

// app.get("/alert", (req, res) => {
//   const sqlQuery = "SELECT subject_name, subject_day, subject_start, subject_end, user_name FROM table_subject WHERE (subject_day, subject_start, subject_end) IN (SELECT subject_day, subject_start, subject_end FROM table_subject GROUP BY subject_day, subject_start, subject_end HAVING COUNT(*) > 1);"

//   connection.query(sqlQuery, (err, results) => {

//     if (err) {
//       console.error("An error occurred in the query :", err);
//       res.status(500).send("An error occurred fetching data");
//       return;
//     }
//     res.json(results);
//   });
// });


app.get("/alert", (req, res) => {
  const sqlQuery = `SELECT subject_day, subject_start, subject_end, JSON_ARRAYAGG(
      JSON_OBJECT(
        'user_name', user_name,
        'subject_id', subject_id,
        'subject_name', subject_name,
        'subject_year', subject_year,
        'subject_sec', subject_sec,
        'subject_required', subject_required,
        'user_email',  user_email
      )) 
      AS subjects FROM table_subject WHERE (subject_day, subject_start, subject_end) IN (
      SELECT subject_day, subject_start, subject_end FROM table_subject
      GROUP BY subject_day, subject_start, subject_end
      HAVING COUNT(*) > 1)
    GROUP BY subject_day, subject_start, subject_end;`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query:", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }

    const formattedResults = results.map((row) => {
      return {
        subject_day: row.subject_day,
        subject_start: row.subject_start,
        subject_end: row.subject_end,
        subjects: JSON.parse(row.subjects),
      };
    });

    res.json(formattedResults);
  });
});

app.get("/overlap", (req, res) => {
  const sqlQuery = `
    SELECT subject_day,
           JSON_ARRAYAGG(
               JSON_OBJECT(
                   'user_email', user_email,
                   'user_name', user_name,
                   'subject_sec', subject_sec,
                   'subject_year', subject_year,
                   'subject_required', subject_required,
                   'subject_start', subject_start,
                   'subject_end', subject_end,
                   'subject_id', subject_id,
                   'subject_name', subject_name
               )
           ) AS overlap_subjects
    FROM (
        SELECT DISTINCT s1.subject_day, 
                        s1.subject_name,
                        s1.user_id,
                        s1.subject_sec,
                        s1.subject_year,
                        s1.subject_required,
                        s1.subject_start,
                        s1.subject_end,
                        s1.subject_id,
                        s1.user_email,
                        s1.user_name
        FROM table_subject s1, table_subject s2
        WHERE s1.subject_day = s2.subject_day
          AND s1.subject_start < s2.subject_end
          AND s2.subject_start < s1.subject_end
          AND s1.subject_name != s2.subject_name
    ) AS overlap_query
    GROUP BY subject_day;
  `;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query:", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }

    const formattedResults = results.map((row) => {
      return {
        subject_day: row.subject_day,
        overlap_subjects: JSON.parse(row.overlap_subjects),
      };
    });

    res.json(formattedResults);
  });
});




app.get("/timetable", (req, res) => {
  const sqlQuery = `SELECT subject_day, JSON_ARRAYAGG(
      JSON_OBJECT(
        'instructor', user_name,
        'subject_id', subject_id,
        'subject_year', subject_year,
        'subject_name', subject_name,
        'subject_sec', subject_sec,
        'room' , room,
        'startTime', subject_start,
        'endTime', subject_end
      )) AS subjects FROM table_subject GROUP BY subject_day`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("An error occurred in the query:", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }

    const formattedResults = results.map((row) => {
      return {
        subject_day: row.subject_day,
        subjects: JSON.parse(row.subjects),
      };
    });

    res.json(formattedResults);
  });
});

app.get("/teacher_input", (req, res) => {
  const name = req.query.name; // รับค่า year จาก query string
  const sqlQuery = 'SELECT * FROM table_subject WHERE user_name = ?';
  connection.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
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
app.get("/table_subject_edu", (req, res) => {
  const sqlQuery = "SELECT * FROM table_subject;";
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
  const sqlQuery = "SELECT * FROM course;";
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
  const { user_id, user_name, user_email, note, note_time } = req.body;

  if (!user_id || !user_name || !user_email || !note_time) {
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
  const { note_id, user_email, noti, status } = req.body;

  connection.query(
    "INSERT INTO notification (note_id, user_email, noti, status) VALUES (?,?,?,?)",
    [[note_id], user_email, noti, status],
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

app.put("/updatenote", (req, res) => {
  const note_id = req.body.note_id;
  const status = req.body.status;

  connection.query(
    "UPDATE note SET status = ? WHERE note_id = ?",
    [status, note_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while inserting values");
      } else {
        return res.send(result);
      }
    }
  );
});

app.post("/table_subject", (req, res) => {
  const { user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room } = req.body;
  console.log(req.body)
  // แทรกข้อมูลลงในฐานข้อมูล

  connection.query(
    "INSERT INTO table_subject (user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room],
    (err, result) => {
      if (err) {
        console.error("An error occurred in the query:", err);
        return res.status(500).send("An error occurred inserting data");
      }
      console.log(
        "Data inserted successfully:",
        subject_name,
        subject_sec,
        subject_major,
        subject_required
      );
      return res.status(200).send("Data inserted successfully");
    }
  );
});

app.post("/updateRole", (req, res) => {
  const { username, role } = req.body;
  console.log(username, role);
  const sql = "UPDATE users SET user_role = ? WHERE user_name = ?";

  connection.query(sql, [role, username], (err, result) => {
    // if (err) {
    //   // console.error(`เกิดข้อผิดพลาดในการอัปเดตข้อมูลของผู้ใช้ ${username}:`, err);
    //   res.status(500).json({message:"ล้มเหลว"})
    // } else {
    //   // console.log(`อัปเดตข้อมูลของผู้ใช้ ${username} ให้เป็น ${role} สำเร็จ`);
    //   res.status(200).json({message:"สำเร็จ"})
    // }
    console.log(result);
    res.status(200).json({ message: "สำเร็จ" });
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

app.get("/render", (req, res) => {
  const id = req.query.id; // รับค่า id จาก query string
  const year = req.query.year; // รับค่า year จาก query string
  console.log(id, year);
  const sqlQuery =
    "SELECT * FROM COURSE WHERE subject_id = ? AND subject_year = ?";
  connection.query(sqlQuery, [id, year], (err, results) => {
    if (err) {
      console.error("An error occurred in the query :", err);
      res.status(500).send("An error occurred fetching data");
      return;
    }
    res.json(results);
  });
});

app.post("/sendtemp", (req, res) => {
  const subject_id = req.body.subject_id;
  const subject_year = req.body.subject_year;
  const subject_name = req.body.subject_name;
  const subject_major_id = req.body.subject_major_id;
  const subject_credit = req.body.subject_credit;
  const subject_is_require = req.body.subject_is_require;

  connection.query(
    "INSERT INTO course (subject_id,subject_year,subject_name,subject_credit,subject_is_require) VALUES(?,?,?,?,?,?)",
    [
      subject_id,
      subject_year,
      subject_name,
      subject_major_id,
      subject_credit,
      subject_is_require,
    ],
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

app.delete("/deletenotifi/:noti_id", (req, res) => {
  const noti_id = req.params.noti_id;
  console.log(noti_id);
  const sqlQuery = "DELETE FROM notification WHERE noti_id = ?";
  connection.query(sqlQuery, [noti_id], (err, results) => {
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

app.post("/updateRoom", (req, res) => {
  const subject_id = req.body.subject_id;
  const subject_year = req.body.subject_year;
  const room = req.body.room;
  const subject_sec = req.body.subject_sec;
  const subject_day = req.body.subject_day;
  const subject_start = req.body.subject_start;
  const subject_end = req.body.subject_end;
  
  console.log(room);
  const sql = "UPDATE table_subject SET room = ? WHERE subject_id = ? AND subject_year =? AND subject_sec=? AND subject_day=? AND subject_start=? AND subject_end=?";

  connection.query(sql, [room, subject_id,subject_year,subject_sec,subject_day,subject_start,subject_end], (err, result) => {
    if (err) {
      console.error("Error updating room:", err);
      res.status(500).json({ error: "มีข้อผิดพลาดในการอัปเดตห้อง" });
    } else {
      console.log(result);
      res.status(200).json({ message: "สำเร็จ" });
    }
  });
});
app.post("/time_table", (req, res) => {
  const { user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room } = req.body;
  console.log(req.body)
  // แทรกข้อมูลลงในฐานข้อมูล

  connection.query(
    "INSERT INTO time_table (user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, user_name, user_email, subject_id, subject_year, subject_name, subject_sec, subject_major, subject_credit, subject_no, subject_required, subject_day, subject_start, subject_end, room],
    (err, result) => {
      if (err) {
        console.error("An error occurred in the query:", err);
        return res.status(500).send("An error occurred inserting data");
      }
      console.log(
        "Data inserted successfully:",
        subject_name,
        subject_sec,
        subject_major,
        subject_required
      );
      return res.status(200).send("Data inserted successfully");
    }
  );
});
app.delete("/time_table_delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log("testjame")
  // แทรกข้อมูลลงในฐานข้อมูล

  connection.query(
    "DELETE FROM table_subject WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.error("An error occurred in the query:", err);
        return res.status(500).send("An error occurred inserting data");
      }
      console.log(
        "Data Deleted successfully"
        ,id
      );
      return res.status(200).send("Data Deleted successfully");
    }
  );
});

