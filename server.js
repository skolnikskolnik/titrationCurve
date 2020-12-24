var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use(routes);

require("./routes/html-routes.js")(app);
// Start our server so that it can begin listening to client requests.

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});