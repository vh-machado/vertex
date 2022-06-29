export function verificaBiconexo(listaVertices, listaArestas) {
  // This class represents a directed graph using adjacency
  // list representation
  class Graph {
    // Constructor
    constructor(v) {
      this.V = v;
      this.adj = new Array(v);

      this.NIL = -1;
      this.time = 0;
      for (let i = 0; i < v; ++i) this.adj[i] = [];
    }

    //Function to add an edge into the graph
    addEdge(v, w) {
      this.adj[v].push(w); //Note that the graph is undirected.
      this.adj[w].push(v);
    }

    // A recursive function that returns true if there is an articulation
    // point in given graph, otherwise returns false.
    // This function is almost same as isAPUtil() @ http://goo.gl/Me9Fw
    // u --> The vertex to be visited next
    // visited[] --> keeps track of visited vertices
    // disc[] --> Stores discovery times of visited vertices
    // parent[] --> Stores parent vertices in DFS tree
    isBCUtil(u, visited, disc, low, parent) {
      // Count of children in DFS Tree
      let children = 0;

      // Mark the current node as visited
      visited[u] = true;

      // Initialize discovery time and low value
      disc[u] = low[u] = ++this.time;

      // Go through all vertices adjacent to this

      for (let i of this.adj[u]) {
        let v = i; // v is current adjacent of u

        // If v is not visited yet, then make it a child of u
        // in DFS tree and recur for it
        if (!visited[v]) {
          children++;
          parent[v] = u;

          // check if subgraph rooted with v has an articulation point
          if (this.isBCUtil(v, visited, disc, low, parent)) {
            return true;
          }

          // Check if the subtree rooted with v has a connection to
          // one of the ancestors of u
          low[u] = Math.min(low[u], low[v]);

          // u is an articulation point in following cases

          // (1) u is root of DFS tree and has two or more children.
          if (parent[u] == this.NIL && children > 1) {
            return true;
          }

          // (2) If u is not root and low value of one of its
          // child is more than discovery value of u.
          if (parent[u] != this.NIL && low[v] >= disc[u]) {
            return true;
          }
        }
        // Update low value of u for parent function calls.
        else if (v != parent[u]) {
          low[u] = Math.min(low[u], disc[v]);
        }
      }
      return false;
    }

    // The main function that returns true if graph is Biconnected,
    // otherwise false. It uses recursive function isBCUtil()
    isBC() {
      // Mark all the vertices as not visited
      let visited = new Array(this.V);
      let disc = new Array(this.V);
      let low = new Array(this.V);
      let parent = new Array(this.V);

      // Initialize parent and visited, and ap(articulation point)
      // arrays
      for (let i = 0; i < this.V; i++) {
        parent[i] = this.NIL;
        visited[i] = false;
      }

      // Call the recursive helper function to find if there is an
      // articulation/ point in given graph. We do DFS traversal
      // starting from vertex 0
      if (this.isBCUtil(0, visited, disc, low, parent) == true) {
        return false;
      }

      // Now check whether the given graph is connected or not.
      // An undirected graph is connected if all vertices are
      // reachable from any starting point (we have taken 0 as
      // starting point)
      for (let i = 0; i < this.V; i++)
        if (visited[i] == false) {
          return false;
        }

      return true;
    }
  }

  // Driver method
  let g = new Graph(listaVertices.length);
  listaArestas.forEach(aresta => {
    g.addEdge(aresta.from - 1, aresta.to - 1);
  });
  if (g.isBC()) {
    console.log('É biconexo');
    return true;
  } else {
    console.log('Não é biconexo');
    return false;
  }

}
