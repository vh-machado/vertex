//function that receives an adjacency list and returns how many edges enter and leave each vertex
function Graph(graph) {
    this.graph = graph;
    this.vertices = Object.keys(graph);
  
    this.getEdges = function() {
      let edges = {};
      this.vertices.forEach(v => {
        edges[v] = { in: 0, out: 0 };
      });
      this.vertices.forEach(v => {
        this.graph[v].forEach(w => {
          edges[v].out++;
          edges[w].in++;
        });
      });
      return edges;
    }
  }
  
  const graph3 = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: ['f'],
    f: []
  };
  
  const g = new Graph(graph3);
  console.log(g.getEdges());