const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// MiddleWare
app.use(cors());
app.use(express.json());

// APIs
app.get('/', (req, res) => {
    res.send('Running Ware House Server')
});

// MongoDb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8c46yf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Mongodb APIs
async function run() {
    try {
        await client.connect();
        const database = client.db("warehouse-user ")
        const collection = database.collection("devices");
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


// Listing Port
app.listen(port, ()=> {
    console.log('Listening to port', port);
})
