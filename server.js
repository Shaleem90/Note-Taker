
const express = require("express");
const path = require("path");
const fs = require("fs");

// Setting up Express
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Access to public folder
app.use(express.static(path.join(__dirname, 'public')));

//API routes
app.get("/api/notes", (req, res) => {

    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;

        let noteData = JSON.parse(data);
        res.json(noteData);
    })
});
// Post 
app.post("/api/notes", (req, res) => {

    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data)

        let newNote = {
            id: notes.length + 1,
            title: req.body.title,
            text: req.body.text,
        }

        notes.push(newNote)

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            res.json(notes)
        });
    });
});

// Get
app.get("/api/notes/:title", (req, res) => {

    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;

        let noteData = JSON.parse(data);

        notes = noteData.filter(data => {
            return data.title.toLowerCase() === req.params.title.toLowerCase()
        });
        res.json(notes);
    })
});

app.delete("/api/notes/:id", (req, res) => {

    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)

        const note = notes.find(n => n.id === parseInt(req.params.id));

        const index = notes.indexOf(note);

        notes.splice(index, 1);


        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
            if (err) throw err;

            res.json(notes)
        });
    });
});

//Routes
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));


app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/assets/css/styles.css"));


app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/assets/js/index.js"));






// Port Listening on server
app.listen(PORT, function () {
    console.log("SERVER IS LISTENING ON PORT: " + PORT);
});