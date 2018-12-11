// Connecting using Mongoose

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const User = require('./models/User');

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
]);

// Adding promises to mongoose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose-demo')
  .then((db) => {
    console.log('Mongo DB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

// Creating data
app.post('/users', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isActive: req.body.isActive,
  });

  newUser.save()
    .then((response) => {
      console.log(response);
      res.status(201).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

// Reading data
app.get('/users', (req, res) => {
  User.find({})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});


// Updating data with patch
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName } = req.body;

  User.findOneAndUpdate(
    {
      _id: id,
    }, {
      $set: {
        firstName,
      },
    },
    {
      new: true,
    },
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Updating data with put
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        firstName,
        lastName,
      },
    },
    {
      new: true,
    },
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Alternative put
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  User.findOne({ _id: id })
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;

      user.save()
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Deleting data
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

const port = process.env.PORT || 9111;

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
