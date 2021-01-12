// Dependencies
const fs = require("fs");

// UUID npm package for unique id
const { v4: uuid4 } = require('uuid');

module.exports = function (app) {

    // GET Request   
    app.get("/api/notes", (req, res) => {

        console.log("\n Running GET notes request");

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        console.log("\n GET request for notes data:" + JSON.stringify(data));
        res.json(data);

    });

    // POST Request
    app.post("/api/notes", (req, res) => {

        const newNote = req.body;

        console.log("\n POST request new-note : " + JSON.stringify(newNote));

        newNote.id = uuid4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        data.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        console.log("\n Successfully added new note to 'db.json' file .");

        res.json(data);
    });

    // DELETE Request 
    app.delete("/api/notes/:id", (req, res) => {

        let noteId = req.params.id.toString();
        console.log(`\n DELETE note request for noteId : ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter(note => note.id !== noteId);
        fs.writeFileSync("./db/db.json", JSON.stringify(newData));

        console.log(`\n Successfully deleted note id: ${noteId} `);

        res.json(newData);

    });
};