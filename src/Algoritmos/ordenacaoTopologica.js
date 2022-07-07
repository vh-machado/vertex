import converteGrafo from './converteGrafo';

export const ordenacaoTopologica = grafo => {
  var ordem = [];

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
    grafo.nodes.forEach(v => g.addVertex(v.id));
    grafo.edges.forEach(a => g.addEdge(a.from, a.to));

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

    vertices.forEach(v => {
      var vertice = grafo.nodes.find(vert => vert.id == v);
      ordem[topNums[v]] = vertice.label;
    });
    //return topNums;
  }

  dfsTopSort(graph);

  //console.log(ordem);
  return ordem.join(' - ');
};
