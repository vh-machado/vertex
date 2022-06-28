export default function isStrong(listaVertices, listaArestas) {
  class Graph {
    // Constructor
    constructor(v) {
      this.V = v;
      this.adj = new Array(v);
      for (let i = 0; i < v; ++i){
        this.adj[i] = [];
      }
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
      this.adj[v].push(w);
    }

    // A recursive function to print DFS starting from v
    DFSUtil(v, visited) {
      // Mark the current node as visited and print it
      visited[v] = true;

      let n;

      // Recur for all the vertices adjacent to this vertex

      for (let i of this.adj[v].values()) {
        n = i;
        if (!visited[n]) this.DFSUtil(n, visited);
      }
    }

    // Function that returns transpose of this graph
    getTranspose() {
      let g = new Graph(this.V);
      for (let v = 0; v < this.V; v++) {
        // Recur for all the vertices adjacent to this vertex

        for (let i of this.adj[v].values()) g.adj[i].push(v);
      }
      return g;
    }

    // The main function that returns true if graph is strongly
    // connected
    isSC() {
      // Step 1: Mark all the vertices as not visited
      // (For first DFS)
      let visited = new Array(this.V);
      for (let i = 0; i < this.V; i++) visited[i] = false;

      // Step 2: Do DFS traversal starting from first vertex.
      this.DFSUtil(0, visited);

      // If DFS traversal doesn't visit all vertices, then
      // return false.
      for (let i = 0; i < this.V; i++) if (visited[i] == false) return false;

      // Step 3: Create a reversed graph
      let gr = this.getTranspose();

      // Step 4: Mark all the vertices as not visited (For
      // second DFS)
      for (let i = 0; i < this.V; i++) visited[i] = false;

      // Step 5: Do DFS for reversed graph starting from
      // first vertex. Starting Vertex must be same starting
      // point of first DFS
      gr.DFSUtil(0, visited);

      // If all vertices are not visited in second DFS, then
      // return false
      for (let i = 0; i < this.V; i++) if (visited[i] == false) return false;

      return true;
    }
  }

  var g = new Graph(listaVertices.length);
  listaArestas.forEach(aresta => {
    g.addEdge(aresta.from-1, aresta.to-1);
  });
  console.log(g.isSC());

  /*
  let g1 = new Graph(3);
  g1.addEdge(0, 1);
  g1.addEdge(1, 2);
  g1.addEdge(2, 0);
  if (g1.isSC()) {
    document.write('1 Yes<br>');
  } else {
    document.write('1 No<br>');
  }

  // Create graphs given in the above diagrams
  let g2 = new Graph(4);
  g2.addEdge(0, 1);
  g2.addEdge(1, 2);
  g2.addEdge(2, 3);
  g2.addEdge(3, 1);
  if (g2.isSC()) {
    document.write('2 Yes<br>');
  } else {
    document.write('2 No<br>');
  }

  let g3 = new Graph(5);
  g3.addEdge(0, 4);
  g3.addEdge(0, 1);
  g3.addEdge(1, 4);
  g3.addEdge(2, 4);
  g3.addEdge(2, 3);
  g3.addEdge(3, 4);

  if (g3.isSC()) {
    document.write('3 Yes<br>');
  } else {
    document.write('3 No<br>');
  }
  */
}
