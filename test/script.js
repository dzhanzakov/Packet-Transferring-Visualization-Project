import PriorityQueue from './priorityQueue.js';

const graphData = {
    vertices: [
        { id: '1', x: 50, y: 50 },
        { id: '2', x: 200, y: 100 },
        { id: '3', x: 150, y: 200 },
        { id: '4', x: 50, y: 300 },
        { id: '5', x: 300, y: 250 }
    ],
    edges: [
        { from: '1', to: '2', weight: 3 },
        { from: '1', to: '3', weight: 5 },
        { from: '2', to: '3', weight: 2 },
        { from: '2', to: '4', weight: 6 },
        { from: '3', to: '4', weight: 1 },
        { from: '3', to: '5', weight: 4 },
        { from: '4', to: '5', weight: 2 }
    ]
};

function drawGraph() {
    const graphContainer = document.getElementById('graph');
    const senderSelect = document.getElementById('sender');
    const receiverSelect = document.getElementById('receiver');
    
    graphData.vertices.forEach(vertex => {
        const vertexElement = document.createElement('div');
        vertexElement.className = 'vertex';
        vertexElement.textContent = vertex.id;
        vertexElement.style.top = `${vertex.y}px`;
        vertexElement.style.left = `${vertex.x}px`;
        graphContainer.appendChild(vertexElement);
        
        const senderOption = document.createElement('option');
        senderOption.value = vertex.id;
        senderOption.textContent = vertex.id;
        senderSelect.appendChild(senderOption);
        
        const receiverOption = document.createElement('option');
        receiverOption.value = vertex.id;
        receiverOption.textContent = vertex.id;
        receiverSelect.appendChild(receiverOption);
    });

    graphData.edges.forEach(edge => {
        const fromVertex = graphData.vertices.find(v => v.id === edge.from);
        const toVertex = graphData.vertices.find(v => v.id === edge.to);
        if (fromVertex && toVertex) {
            const edgeElement = document.createElement('div');
            edgeElement.className = 'edge';
            edgeElement.setAttribute('data-from', edge.from); 
            edgeElement.setAttribute('data-to', edge.to);
            const deltaX = toVertex.x - fromVertex.x;
            const deltaY = toVertex.y - fromVertex.y;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            edgeElement.style.top = `${fromVertex.y + 10}px`; 
            edgeElement.style.left = `${fromVertex.x + 10}px`; 
            edgeElement.style.width = `${length}px`;
            edgeElement.style.transformOrigin = '0 0'; 
            edgeElement.style.transform = `rotate(${angle}deg)`;
            graphContainer.appendChild(edgeElement);
            
            const weightElement = document.createElement('div');
            weightElement.className = 'weight';
            weightElement.textContent = edge.weight;
            weightElement.style.position = 'absolute';
            weightElement.style.top = `${fromVertex.y + deltaY / 2}px`;
            weightElement.style.left = `${fromVertex.x + deltaX / 2}px`;
            graphContainer.appendChild(weightElement);
        }
    });
}

function sendMessage() {
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const shortestPath = dijkstra(graphData, sender, receiver);
    animateMessage(shortestPath);
}



function dijkstra(graph, source, target) {
    const queue = new PriorityQueue();
    const distances = {};
    const previous = {};

    graph.vertices.forEach(vertex => {
        distances[vertex.id] = vertex.id === source ? { distance: 0, weight: 0 } : { distance: Infinity, weight: 0 };
        previous[vertex.id] = null;
        queue.enqueue(vertex.id, distances[vertex.id].distance);
    });

    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().element;

        if (currentVertex === target) break;

        graph.edges.forEach(edge => {
            if (edge.from === currentVertex) {
                const distanceToNeighbor = distances[currentVertex].distance + edge.weight;
                if (distanceToNeighbor < distances[edge.to].distance) {
                    distances[edge.to] = { distance: distanceToNeighbor, weight: edge.weight };
                    previous[edge.to] = currentVertex;
                    queue.enqueue(edge.to, distanceToNeighbor);
                }
            }
        });
    }

    const shortestPath = [];
    let vertex = target;
    while (vertex !== null) {
        shortestPath.unshift({ vertex: vertex, weight: distances[vertex].weight });
        vertex = previous[vertex];
    }
    return shortestPath;
}



function animateMessage(shortestPath) {
    function animateEdge(index) {
        if (index >= shortestPath.length - 1) {
            return;
        }

        const fromVertex = shortestPath[index].vertex;
        const toVertex = shortestPath[index + 1].vertex;


        const edge = document.querySelector(`.edge[data-from="${fromVertex}"][data-to="${toVertex}"]`);
        
        if (edge) {
            edge.classList.add('shortest-path');
            const weight = shortestPath[index + 1].weight;

            const delay = weight * 500; 
            setTimeout(() => {
                edge.classList.remove('shortest-path');
                
                animateEdge(index + 1);
            }, delay);
        }
    }

    animateEdge(0);
}







// function animateMessage(shortestPath, message) {
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.className = 'message';
//     document.getElementById('graph').appendChild(messageElement);

//     // Recursive function to animate the message traversal
//     function animateStep(index) {
//         if (index >= shortestPath.length - 1) {
//             // If reached the end of the path, remove the message
//             messageElement.remove();
//             return;
//         }

//         const prevVertex = shortestPath[index];
//         const nextVertex = shortestPath[index + 1];

//         const fromVertex = document.querySelector(`.vertex[data-vertex="${prevVertex}"]`);
//         const toVertex = document.querySelector(`.vertex[data-vertex="${nextVertex}"]`);

//         if (fromVertex && toVertex) {
//             const fromPos = fromVertex.getBoundingClientRect();
//             const toPos = toVertex.getBoundingClientRect();

//             const deltaX = toPos.left - fromPos.left;
//             const deltaY = toPos.top - fromPos.top;
//             const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//             const duration = distance / 100;

//             // Animate the message movement
//             messageElement.style.transition = `transform ${duration}s linear`;
//             messageElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

//             // Move to the next step after the animation duration
//             setTimeout(() => {
//                 animateStep(index + 1);
//             }, duration * 1000);
//         }
//     }

//     // Start the animation
//     animateStep(0);
// }


document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});

drawGraph();