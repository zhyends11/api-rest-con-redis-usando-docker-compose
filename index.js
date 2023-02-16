const express = require('express');
const redis = require('redis');

const client = redis.createClient({
    host: 'redis'
});

const app = express();

app.get('/get/:key', (req, res) => {
    const key = req.params.key;
    client.get(key, (err, value) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(value);
        }
    });
});

app.post('/set/:key/:value', (req, res) => {
    const key = req.params.key;
    const value = req.params.value;
    client.set(key, value, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(`Successfully set ${key} to ${value}`);
        }
    });
});

app.listen(8080, () => {
    console.log('API listening on port 8080');
});