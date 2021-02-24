// Dependencies //
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express Configuration //
const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

fs.readFile("db/db.json","utf8", (error, data) => {

    if (error) throw error;
    
    var notes = JSON.parse(data);

    // API Route to send notes saved in JSON format //
    app.get("/api/notes", (request, response) => response.json(notes));

    // API Route to grab notes with a particular ID //
    app.get("/api/notes/:id", (request, response) => response.json(notes[request.params.id]));

    // Updates & saves new note //
    app.post("/api/notes", (request, response) => {
        let newNote = request.body;
        notes.push(newNote);
        console.log("Adding new note tilted: " + newNote.title)
        updateDB();
        return response.json({});
    });

    // Deletes a note with a particular ID //
    app.delete("/api/notes/:id", (request, response) => {

        console.log("Deleting note ID: " + request.params.id);
      
        if (notes.length === 1) {
          notes = [];
        } else {
          const index = parseInt(request.params.id);

          for (i=0; i<notes.length; i++) {

            if(notes[i].id === index) {

              notes.splice(i, 1);

            }
          }
        };
      updateDB();
      return response.json({})
    })
      
    // Displays notes.html //
    app.get('/notes', (request,response) => response.sendFile(path.join(__dirname, "./public/notes.html")));

    // Displays index.html //
    app.get('*', (request,response) => response.sendFile(path.join(__dirname, "./public/index.html")));
 
    // Updates json file when a note is added or deleted //
    function updateDB() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'), error => {

            if (error) throw error;
            return true;

        });
    }
});

// Starts the server to begin listening //
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
