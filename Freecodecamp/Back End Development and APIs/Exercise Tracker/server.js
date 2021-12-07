const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const userSchema = mongoose.Schema({
  username:{type: String, required:true},
});

const exerciseSchema = mongoose.Schema({
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: Date
});

const logSchema = mongoose.Schema({
  username: String,
  count: { type: Number, default: 0 },
  log: [{
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: Date
  }]
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Log = mongoose.model("Log", logSchema);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.post("/api/users", (req, res) => {
  User.findOne({ username: req.body.username }, (err, data) => {
    if (err) res.send(err);
    else if(data==null) {
      let newUser = new User({ username: req.body.username });
      newUser.save((err, data) => {
        if (err) res.send(err.message);
        else {
          const { username, _id } = data;
          res.json({ username, _id });
        }
      })
    }
    else {
      res.json({ username: data.username, _id: data._id });
    }
  })

})

app.get("/api/users", (req, res) => {
  User.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err))
})

app.post("/api/users/:_id/exercises", (req, res) => {
  User.findById(req.params._id, (err, data) => {
    if (err) res.send(err.message);
    else if(data==null) res.send("Invalid user ip");
    else {
      let { description, duration, date } = req.body;
      if (!date) date = new Date();

      let newExercise = new Exercise({
        username: data.username,
        date: date,
        duration,
        description
      });

      newExercise.save((err, data) => {
        if (err) res.send(err.message);
        else {
          let { username, date, duration, description } = data;
          date = date.toDateString();
          res.json({
            _id: req.params._id,
            username, date, duration, description
          });
        }
      })
    }
  })
})

app.get("/api/users/:_id/logs", (req, res) => {
  let query={};
  if(req.query.hasOwnProperty("from")) query["$gte"]=req.query.from;
  if(req.query.hasOwnProperty("to")) query["$lte"]=req.query.to;

  User.findById(req.params._id, (err, data) => {
    let optionObj={limit:200};
   let queryObj={username:data.username};
   if(Object.keys(query).length>0) queryObj["date"]=query;
   if(req.query.hasOwnProperty("limit")) optionObj["limit"]=Number.parseInt(req.query.limit);

    if (err) res.send(err.message);
    else {
      Exercise.find( queryObj,"description duration date",optionObj, (err, exercises) => {
        if (err) res.send(err.message);
        else {
          res.json({
            _id:req.params._id,
            username: data.username,
            count: exercises.length,
            log: exercises.map(el=>{
              let date=el.date.toDateString();
              return {
                description:el.description,
                duration:el.duration,
                date
              }
            })
          });
        }
      })
    }
  });
})


