import cicloEuleriano from './cicloEuleriano';

export function verificaEuleriano(listaVertices, listaArestas) {
  // This class represents an undirected graph using adjacency list
  // representation
  class Graph {
    // Constructor
    constructor(v) {
      this.V = v;
      this.adj = new Array(v);
      for (let i = 0; i < v; ++i) {
        this.adj[i] = [];
      }
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
      this.adj[v].push(w); // Add w to v's list.
      this.adj[w].push(v); //The graph is undirected
    }

    // A function used by DFS
    DFSUtil(v, visited) {
      // Mark the current node as visited
      visited[v] = true;

      // Recur for all the vertices adjacent to this vertex
      for (let i of this.adj[v]) {
        let n = i;
        if (!visited[n]) {
          this.DFSUtil(n, visited);
        }
      }
    }

    // Method to check if all non-zero degree vertices are
    // connected. It mainly does DFS traversal starting from
    isConnected() {
      // Mark all the vertices as not visited
      let visited = new Array(this.V);
      let i;
      for (i = 0; i < this.V; i++) {
        visited[i] = false;
      }

      // Find a vertex with zero degree
      for (i = 0; i < this.V; i++) {
        if (this.adj[i].length === 0) {
          return false;
        }
      }

      // Find a vertex with non-zero degree
      for (i = 0; i < this.V; i++) {
        if (this.adj[i].length != 0) {
          break;
        }
      }

      // If there are no edges in the graph, return true
      if (i == this.V) {
        return true;
      }

      // Start DFS traversal from a vertex with non-zero degree
      this.DFSUtil(i, visited);

      
      for (i = 0; i < this.V; i++) {
        // Check if all non-zero degree vertices are visited
        if (visited[i] == false && this.adj[i].length > 0) {
          return false;
        }
        // Check if all zero degree vertices are visited
        if (visited[i] == false && this.adj[i].length == 0) {
          return false;
        }
      }

      return true;
    }

    /* The function returns one of the following values
	0 --> If graph is not Eulerian
	1 --> If graph has an Euler path (Semi-Eulerian)
	2 --> If graph has an Euler Circuit (Eulerian) */
    isEulerian() {
      // Check if all non-zero degree vertices are connected
      if (this.isConnected() == false) {
        return 0;
      }

      // Count vertices with odd degree
      let odd = 0;
      for (let i = 0; i < this.V; i++) {
        if (this.adj[i].length % 2 != 0) {
          odd++;
        }
      }

      // If count is more than 2, then graph is not Eulerian
      if (odd > 2) {
        return 0;
      }

      // If odd count is 2, then semi-eulerian.
      // If odd count is 0, then eulerian
      // Note that odd count can never be 1 for undirected graph
      return odd == 2 ? 1 : 2;
    }

    // Function to run test cases
    test() {
      let res = this.isEulerian();
      if (res == 0) {
        // console.log('O grafo não é euleriano');
        return false;
      } else if (res == 1) {
        // console.log('O grafo tem um caminho euleriano');
        return false;
      } else {
        // console.log('O grafo tem um ciclo euleriano');
        return true;
        //cicloEuleriano(listaVertices, listaArestas);
      }
    }
  }

  // Driver method
  let g = new Graph(listaVertices.length);
  listaArestas.forEach(aresta => {
    g.addEdge(aresta.from - 1, aresta.to - 1);
  });
  return g.test();
}
