import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Confident@123",
    database: "form"
});

//registering new user 

app.post("/register", (req, res) => {
    const { name, email, address } = req.body; //data sent by the client in the body of the HTTP request

    db.query("INSERT INTO formtable (name, email, address) VALUES (?, ?, ?)", 
    [name, email, address], 

    (err, result) => {


        if (err) {
            console.error(err);
            res.json("error in registering the user");
        } else {
            res.json({ message: "user registered " });
        }
    });
});

//get req to get users 

app.get("/users", (req, res) => {

    db.query("SELECT * FROM formtable", (err, results) => {
        if (err) {
            console.error(err);
            res.json({ message: "error fetching users" });
        } else {
            res.json(results);
        }
    });
});

//put req for update 

app.put("/update/:id", (req, res) => {
    const userId = req.params.id;
    const { name, email, address } = req.body; 

    db.query("UPDATE formtable SET name=?, email=?, address=? WHERE id=?", 

    [name, email, address, userId], (err, result) => {
        if (err) {
            console.error(err);
            res.json({ message: "error in  updating user" })
        } else {
            res.json({ message: "user updated" })
        }
    });
});

// dlt user req by id

app.delete("/delete/:id", (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM formtable WHERE id=?",[userId],
         (err, result) => {

        if (err) {
            console.error(err);
            res.json({ message: "error in deleting user" });
        } else {
            res.json({ message: "user deleted" })
        }
    });
}); 

app.listen(3200, () => {
    console.log("Connected!");
});
