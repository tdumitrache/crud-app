const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "students_db",
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/meetings", (req, res) => {
  db.query(
    "SELECT meetings.id_meeting, meetings.id_student, meetings.id_department, students.first_name, students.last_name, meetings.date, meetings.nr_of_students FROM students INNER JOIN meetings ON students.id_student = meetings.id_student",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add/students", (req, res) => {
  const { firstName, lastName, age, email, country, yearOfStudy } = req.body;

  db.query(
    "INSERT INTO students(first_name, last_name, age, email, country, year_of_study) VALUES(?, ?, ?, ?, ?, ?)",
    [firstName, lastName, age, email, country, yearOfStudy],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/add/departments", (req, res) => {
  const { name, maxStudents } = req.body;

  db.query(
    "INSERT INTO departments(name, max_students) VALUES(?, ?)",
    [name, maxStudents],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/add/meetings", (req, res) => {
  const { idStudent, idDepartment, date, nrOfStudents } = req.body;

  db.query(
    "INSERT INTO meetings(id_student, id_department, date, nr_of_students) VALUES(?, ?, ?, ?)",
    [idStudent, idDepartment, date, nrOfStudents],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete/students/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id_student = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/departments/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM departments WHERE id_department = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/meetings/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM meetings WHERE id_meeting = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/students/:id", (req, res) => {
  const { firstName, lastName, age, email, country, yearOfStudy, idStudent } =
    req.body;
  console.log(firstName, lastName, age, email, country, yearOfStudy, idStudent);
  db.query(
    "UPDATE students SET first_name = ?, last_name = ?, age = ?, email = ?, country = ?, year_of_study = ? WHERE id_student = ?",
    [firstName, lastName, age, email, country, yearOfStudy, idStudent],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update/departments/:id", (req, res) => {
  const { name, maxStudents, idDepartment } = req.body;
  console.log(name, maxStudents, idDepartment);
  db.query(
    "UPDATE departments SET name = ?, max_students = ? WHERE id_department = ?",
    [name, maxStudents, idDepartment],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update/meetings/:id", (req, res) => {
  const { idStudent, idDepartment, date, nrOfStudents, idMeeting } = req.body;
  console.log(idStudent, idDepartment, date, nrOfStudents);
  db.query(
    "UPDATE meetings SET id_student = ?, id_department = ?, date = ?, nr_of_students = ? WHERE id_meeting = ?",
    [idStudent, idDepartment, date, nrOfStudents, idMeeting],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => console.log("Your express server runs on port 3001"));
