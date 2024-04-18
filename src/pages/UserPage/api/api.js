import axios from 'axios';

export async function receiveGraph() {
    try {
        const response = await axios.get('http://localhost:4000/get-graph');
        if (!response.status === 200) {
            throw new Error('Failed to receive graph data');
        }
        return response.data;
    } catch (error) {
        console.error('Error receiving graph data:', error);
        throw error;
    }
}

export async function receiveShortestPath(requestData) {
    try {
        const response = await fetch('http://localhost:4000/shortest-path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch shortest path');
        }

        const shortestPath = await response.json();
        localStorage.setItem('shortestPath', JSON.stringify(shortestPath));
        return shortestPath;
    } catch (error) {
        console.error('Error:', error);
    }
}
