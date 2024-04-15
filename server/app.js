const express = require('express');
const { saveGraphData, getGraphData } = require('../database/graphData');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/save-graph', async (req, res) => {
    try {
        const graphData = req.body;
        await saveGraphData(graphData);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving graph data:', error);
        res.sendStatus(500);
    }
});

app.get('/get-graph', async (req, res) => {
    try {
        const graphData = await getGraphData();
        res.json(graphData); 
    } catch (error) {
        console.error('Error retrieving graph data:', error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
