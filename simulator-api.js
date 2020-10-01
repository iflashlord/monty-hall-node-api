const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/simulate', (req, res) => {
    // We will be coding here
    const body = req.body;

    // Output body
    console.log(body);
});

app.get('/simulate', (req, res) => {
    // We will be coding here
    let obj = {
        hi: "hi"
    }
    res.send(obj);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));