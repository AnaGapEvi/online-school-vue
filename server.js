const express = require('express');
const port = process.env.PORT || 3000



const serveStatic = require("serve-static")
const path = require('path');

app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));
app.listen(port);
