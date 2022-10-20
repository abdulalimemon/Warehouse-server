const express = require('express');
const cors = require('cors');
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


// Listing Port
app.listen(port, ()=> {
    console.log('Listening to port', port);
})
