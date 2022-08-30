const express = require('express');
const port = process.env.PORT || 8080
app = express();
app.use(express.static(path.join(__dirname + "/dist/")));

// const serveStatic = require("serve-static")
// const path = require('path');



app.get(/.*/, function(req, res){
  res.sendfile(__dirname + "dist/index.html");
});
app.listen(port);

console.log("server started...");
