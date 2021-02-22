// Dependencies //
const express = require("express");

// Express Configuration //
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route files //
require("./routes/apiRoutes")(app); 
require("./routes/htmlRoutes")(app); 

// Listener //
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  