const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();
const courseRoutes = require("./routes/courses");
// Enable gzip compression
app.use(compression());

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));


app.use(courseRoutes);
app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

