const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const database = client.db("warehouse-user")
        const inventorycollection = database.collection("InventoryItem");
        const brandcollection = database.collection("BrandImage");

        // Inventory API
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventorycollection.find(query);
            const inventoris = await cursor.toArray();
            res.send(inventoris);
        });

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventoryItem = await inventorycollection.findOne(query);
            res.send(inventoryItem);
        });

        app.get('/brand', async (req, res) => {
            const query = {};
            const cursor = brandcollection.find(query);
            const brandImages = await cursor.toArray();
            res.send(brandImages);
        });

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


// Listing Port
app.listen(port, () => {
    console.log('Listening to port', port);
})
