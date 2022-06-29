export default function cicloEuleriano(listaVertices, listaArestas) {
  // An Undirected graph using
  // adjacency list representation
  class Graph {
    constructor(numOfVertices) {
      this.vertices = numOfVertices;
      this.adj = new Array(this.vertices);
      for (let i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
      }
    }

    // add edge u-v
    addEdge(u, v) {
      this.adj[u].push(v);
      this.adj[v].push(u);
    }

    // This function removes edge u-v from graph.
    removeEdge(u, v) {
      this.adj[u] = this.adj[u].filter(function (value, index, arr) {
        return value !== v;
      });
      this.adj[v] = this.adj[v].filter(function (value, index, arr) {
        return value !== u;
      });
    }

    /* The main function that print Eulerian Trail.
        It first finds an odd degree vertex (if there
        is any) and then calls printEulerUtil() to
        print the path */
    printEulerTour() {
      // Find a vertex with odd degree
      var u = 0;
      for (let i = 0; i < this.vertices; i++) {
        if (this.adj[i].length % 2 == 1) {
          u = i;
          break;
        }
      }

      // Print tour starting from oddv
      this.printEulerUtil(u);
      console.log('');
    }

    // Print Euler tour starting from vertex u
    printEulerUtil(u) {
      // Recur for all the vertices adjacent to this
      // vertex
      for (let i = 0; i < this.adj[u].length; i++) {
        var v = this.adj[u][i];
        // If edge u-v is a valid next edge
        if (this.isValidNextEdge(u, v)) {
          var vertice1 = listaVertices.find(vert => vert.id == u + 1);
          var vertice2 = listaVertices.find(vert => vert.id == v + 1);
          console.log(vertice1.label + ' - ' + vertice2.label + ' ');

          // This edge is used so remove it now
          this.removeEdge(u, v);
          this.printEulerUtil(v);
        }
      }
    }

    // The function to check if edge u-v can be
    // considered as next edge in Euler Tout
    isValidNextEdge(u, v) {
      // The edge u-v is valid in one of the
      // following two cases:

      // 1) If v is the only adjacent vertex of u
      // ie size of adjacent vertex list is 1
      if (this.adj[u].length == 1) {
        return true;
      }

      // 2) If there are multiple adjacents, then
      // u-v is not a bridge Do following steps
      // to check if u-v is a bridge
      // 2.a) count of vertices reachable from u
      var isVisited = new Array(this.vertices);
      var count1 = this.dfsCount(u, isVisited);

      // 2.b) Remove edge (u, v) and after removing
      // the edge, count vertices reachable from u
      this.removeEdge(u, v);
      isVisited = new Array(this.vertices);
      var count2 = this.dfsCount(u, isVisited);

      // 2.c) Add the edge back to the graph
      this.addEdge(u, v);
      return count1 > count2 ? false : true;
    }

    // A DFS based function to count reachable
    // vertices from v
    dfsCount(v, isVisited) {
      // Mark the current node as visited
      isVisited[v] = true;
      var count = 1;
      // Recur for all vertices adjacent to this vertex

      this.adj[v].forEach(adjacente => {
        if (!isVisited[adjacente]) {
          count = count + this.dfsCount(adjacente, isVisited);
        }
      });
      return count;
    }
  }

  let g = new Graph(listaVertices.length);
  listaArestas.forEach(aresta => {
    g.addEdge(aresta.from - 1, aresta.to - 1);
  });
  g.printEulerTour();

  /*
  let g1 = new Graph(4);
  g1.addEdge(0, 1);
  g1.addEdge(0, 2);
  g1.addEdge(1, 2);
  g1.addEdge(2, 3);
  g1.printEulerTour();
  
  let g2 = new Graph(3);
  g2.addEdge(0, 1);
  g2.addEdge(1, 2);
  g2.addEdge(2, 0);
  g2.printEulerTour();

  let g3 = new Graph(5);
  g3.addEdge(1, 0);
  g3.addEdge(0, 2);
  g3.addEdge(2, 1);
  g3.addEdge(0, 3);
  g3.addEdge(3, 4);
  g3.addEdge(3, 2);
  g3.addEdge(3, 1);
  g3.addEdge(2, 4);
  g3.printEulerTour();
  */
}
