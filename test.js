const axios = require('axios');

const graphData = {
    edges: [],
    vertices: ['T', 'O', 'I', 'L', 'Y' , 'B', 'A', 'Y']
};

// axios.post('http://localhost:3000/save-graph', graphData)
//     .then(response => {
//         console.log('Graph data saved:', response.data);
//     })
//     .catch(error => {
//         console.error('Error saving graph data:', error);
//     });

axios.get('http://localhost:3000/get-graph')
    .then(response => {
        console.log('Retrieved graph data:', response.data);
    })
    .catch(error => {
        console.error('Error retrieving graph data:', error);
    });
