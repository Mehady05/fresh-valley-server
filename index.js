const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Mehedi World!')
})


require('dotenv').config()

const ObjectID = require('mongodb').ObjectID

const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j5hxn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("freshValley").collection("products");

  app.post('/addProduct', (req, res) => {
      const newProduct = req.body;
      productCollection.insertOne(newProduct)
      .then(result => {
        console.log(res)
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/collect', (req, res) => {
    productCollection.find()
    .toArray((err, products)=>{
      res.send(products)
      console.log(products)
    })
  })


  app.delete('deleteProduct/:id',(req, res)=>{
    const id = ObjectID(req.params.id);
    console.log(id);
    productCollection.findOneAndDelete({_id: id})
    .then(documents = res.send(!! documents.value))
  })











});


app.listen(port)