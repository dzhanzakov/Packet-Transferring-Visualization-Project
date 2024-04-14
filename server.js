const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/save-graph', (req, res) => {
    const graphData = req.body;
    // Save the graph data to the database or any other storage system
    // Example: saveGraphToDatabase(graphData);
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
