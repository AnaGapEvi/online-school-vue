const express = require('express');
const port = process.env.PORT || 8080
app = express();
app.use(express.static(path.join(__dirname + "/dist/")));

// const serveStatic = require("serve-static")
// const path = require('path');



app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
