const express = require('express');
const app = express();
const port = 3000;

const config = require('./config/key');

const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongDB Connected...'))
  .catch(err => console.log(err) )

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  // Instantiate a new user object with the data from req.body
  const user = new User(req.body);

  // Attempt to save the new user to the database
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err
      });
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})