// Connecting normally using core Mongo
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) throw err;

  console.log(ObjectId());

  const db = client.db('animals');

  // Creating data

  // db.collection('mammals').insertOne({
  //   name: 'horse',
  // }, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   console.log('Data inserted.');
  // });

  // Reading data

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
  });

  // Updating data

  db.collection('mammals').findOneAndUpdate({
    _id: new ObjectId('5c0a5a997daea26ca431a0b8'),
  }, {
      $set: { name: 'updated horse' },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  // Deleting data

  // db.collection('mammals').deleteOne({
  //   name: 'horse',
  // });

  // db.collection('mammals').deleteMany({
  //   name: 'horse',
  // });

  db.collection('mammals').findOneAndDelete({
    _id: new ObjectId('5c0f969342493741e150a714'),
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
