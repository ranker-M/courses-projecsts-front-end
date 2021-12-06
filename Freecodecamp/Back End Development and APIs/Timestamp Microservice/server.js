// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


// Mycode
app.get("/api/:date", (req, res) => {
  let utc = new Date(req.params.date);
  if (utc == "Invalid Date") {
    utc = new Date(Number.parseInt(req.params.date));
    if (utc == "Invalid Date") { res.json({ error: "Invalid Date" }); }
    else {
      let unix = Number.parseInt(req.params.date);
      res.json({ unix: unix, utc: utc.toUTCString() });
    }
  } else {
    utc = utc.toUTCString();
    let unix = Date.parse(utc);
    res.json({ unix, utc });
  }
})

app.get("/api/",(req,res)=>{
    let utc = new Date().toUTCString();
    let unix = Date.parse(utc);
    res.json({ unix, utc });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


