import converteGrafo from './converteGrafo';

const ordenacaoTopologica = graphData => {
  class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    addEdge(v1, v2) {
      this.adjacencyList[v1].push(v2);
    }
  }

  const graph = (function () {
    
    const g = new Graph();
    graphData.graph.nodes.forEach(v => g.addVertex(v.id));
    graphData.graph.edges.forEach(a => g.addEdge(a.from, a.to));
    
    return g;
  })();

  function dfsTopSortHelper(v, n, visited, topNums) {
    visited[v] = true;
    const neighbors = graph.adjacencyList[v];
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        n = dfsTopSortHelper(neighbor, n, visited, topNums);
      }
    }
    topNums[v] = n;
    return n - 1;
  }

  function dfsTopSort(graph) {
    const vertices = Object.keys(graph.adjacencyList);
    const visited = {};
    const topNums = {};
    let n = vertices.length - 1;
    for (const v of vertices) {
      if (!visited[v]) {
        n = dfsTopSortHelper(v, n, visited, topNums);
      }
    }
    return topNums;
  }

  console.log(dfsTopSort(graph));
  //console.log(converteGrafo(dfsTopSort(graph), graphData));

  return converteGrafo(dfsTopSort(graph), graphData);
};

export default ordenacaoTopologica;
