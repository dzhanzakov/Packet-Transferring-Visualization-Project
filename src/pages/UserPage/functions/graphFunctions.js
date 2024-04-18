export function createWeightElement(edgeData, latestGraphData) {
    const weightElement = document.createElement('div');
    weightElement.className = 'weight';
    weightElement.textContent = parseInt(edgeData.body.width.slice(0, -2) * 10) / 10;

    weightElement.style.position = 'absolute';

    const weightLeft = (latestGraphData.vertices[edgeData.source].offsetLeft + latestGraphData.vertices[edgeData.target].offsetLeft) / 2;
    const weightTop = (latestGraphData.vertices[edgeData.source].offsetTop + latestGraphData.vertices[edgeData.target].offsetTop) / 2;

    weightElement.style.left = `${weightLeft}px`;
    weightElement.style.top = `${weightTop}px`;

    return weightElement;
}

export function createVertexElement(index, vertexData) {
    const vertexElement = document.createElement('div');
    vertexElement.className = 'vertex';
    vertexElement.style.left = vertexData.offsetLeft + 'px';
    vertexElement.style.top = vertexData.offsetTop + 'px';
    vertexElement.textContent = index;
    return vertexElement;
}

export function createEdgeElement(edgeData) {
    const edgeElement = document.createElement('div');
    edgeElement.className = 'edge';
    edgeElement.style.left = edgeData.body.left;
    edgeElement.style.top = edgeData.body.top;
    edgeElement.style.width = edgeData.body.width;
    edgeElement.style.transform = edgeData.body.transform;
    return edgeElement;
}

export function populateSenderReceiverOptions(verticesCount) {
    const senderSelect = document.getElementById('sender');
    const receiverSelect = document.getElementById('receiver');

    senderSelect.innerHTML = '';
    receiverSelect.innerHTML = '';

    for (let i = 0; i < verticesCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        senderSelect.appendChild(option.cloneNode(true));
        receiverSelect.appendChild(option.cloneNode(true));
    }
}

export function drawGraph(graphData) {
    const graphContainer = document.getElementById('graph');
    graphContainer.innerHTML = '';
  
    graphData.vertices.forEach((vertexData, index) => {
      const vertexElement = createVertexElement(index, vertexData);
      graphContainer.appendChild(vertexElement);
    });
  
    graphData.edges.forEach(edgeData => {
      const edgeElement = createEdgeElement(edgeData);
      graphContainer.appendChild(edgeElement);
      const weightElement = createWeightElement(edgeData, graphData);
      graphContainer.appendChild(weightElement);
    });
  
    populateSenderReceiverOptions(graphData.vertices.length);
  }
  
export function visualizeShortestPath(shortestPath) {
    let index = 0;
  
    function clearRedEdges() {
      const edges = document.querySelectorAll('.edge');
      edges.forEach(edgeElement => {
        edgeElement.style.backgroundColor = 'purple';
        edgeElement.style.transition = 'background-color 0.5s ease-in-out';
      });
    }
  
    function highlightEdge() {
      if (index < shortestPath.length - 1) {
        const source = shortestPath[index];
        const target = shortestPath[index + 1];
        const edgeId = `edge-${Math.min(source, target)}-${Math.max(source, target)}`;
        const edgeElement = document.getElementById(edgeId);
  
        if (edgeElement) {
          edgeElement.style.backgroundColor = 'red';
          edgeElement.style.transition = 'background-color 0.5s ease-in-out';
        }
  
        index++;
        setTimeout(highlightEdge, 1000);
      }
    }
    clearRedEdges();
    highlightEdge();
  }
  
export function transformDataToGraph(graphData) {
    const graph = {};
  
    graphData.edges.forEach(edge => {
      const sourceVertex = parseInt(edge.source);
      const targetVertex = parseInt(edge.target);
      const weight = parseFloat(edge.body.width);
  
      if (!graph[sourceVertex]) {
        graph[sourceVertex] = {};
      }
  
      if (!graph[targetVertex]) {
        graph[targetVertex] = {};
      }
  
      graph[sourceVertex][targetVertex] = weight;
      graph[targetVertex][sourceVertex] = weight;
    });
  
    return graph;
  }