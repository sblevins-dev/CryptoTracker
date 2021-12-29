const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('homepage')
})

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send({"msg": "this has cors enabled"})
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})