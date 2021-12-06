require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

let urlList = {};

app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// My codes
app.post('/api/shorturl', (req, res) => {
  const regex = /(^https:\/\/|^http:\/\/)(www\.)?.{4,}(\.com|\.org|\.co)/gm;
  if (req.body.url.search(regex) == -1) res.json({ "error": "Invalid URL" });
  else {
    let key = Object.values(urlList).indexOf(req.body.url);
    if (key != -1) {
      res.json({
        original_url: req.body.url,
        short_url: key + 1
      });
    } else {
      key = Object.keys(urlList).length + 1;
      urlList[key] = req.body.url;
      res.json({
        original_url: req.body.url,
        short_url: key
      });
    }
  }
})

app.get("/api/shorturl/:short", (req, res) => {
  let key = Object.keys(urlList).indexOf(req.params.short);
    if (key != -1) {
    res.redirect(urlList[req.params.short]);
  }else{
    res.json({"error":"No short URL found for the given input"});
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
