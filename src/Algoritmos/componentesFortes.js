export default function componentesFortes(listaVertices, listaArestas) {
  // Javascript program to find strongly connected
  // components in a given directed graph
  // using Tarjan's algorithm (single DFS)

  // This class represents a directed graph
  // using adjacency list representation
  class Graph {
    // Constructor
    constructor(v) {
      this.V = v;
      this.adj = new Array(v);

      for (let i = 0; i < v; ++i) {
        this.adj[i] = [];
      }

      this.Time = 0;
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
      this.adj[v].push(w);
    }

    // A recursive function that finds and prints strongly
    // connected components using DFS traversal
    // u --> The vertex to be visited next
    // disc[] --> Stores discovery times of visited vertices
    // low[] -- >> earliest visited vertex (the vertex with
    //			 minimum discovery time) that can be reached
    //			 from subtree rooted with current vertex
    // st -- >> To store all the connected ancestors (could be
    //		 part of SCC)
    // stackMember[] --> bit/index array for faster check
    //				 whether a node is in stack
    SCCUtil(u, low, disc, stackMember, st) {
      // Initialize discovery time and low value
      disc[u] = this.Time;
      low[u] = this.Time;
      this.Time += 1;
      stackMember[u] = true;
      st.push(u);

      let n;

      // Go through all vertices adjacent to this
      for (let i of this.adj[u]) {
        n = i;

        if (disc[n] == -1) {
          this.SCCUtil(n, low, disc, stackMember, st);

          // Check if the subtree rooted with v
          // has a connection to one of the
          // ancestors of u
          // Case 1 (per above discussion on
          // Disc and Low value)
          low[u] = Math.min(low[u], low[n]);
        } else if (stackMember[n] == true) {
          // Update low value of 'u' only if 'v' is
          // still in stack (i.e. it's a back edge,
          // not cross edge).
          // Case 2 (per above discussion on Disc
          // and Low value)
          low[u] = Math.min(low[u], disc[n]);
        }
      }

      // Head node found, pop the stack and print an SCC
      // To store stack extracted vertices
      let w = -1;
      if (low[u] == disc[u]) {
        while (w != u) {
          w = st.pop();
          //document.write(w+1 + ' ');
          console.log(w + 1 + ' ');

          stackMember[w] = false;
        }
        console.log('-------');
        //document.write('<br>');
      }
    }

    // The function to do DFS traversal.
    // It uses SCCUtil()
    SCC() {
      // Mark all the vertices as not visited
      // and Initialize parent and visited,
      // and ap(articulation point) arrays
      let disc = new Array(this.V);
      let low = new Array(this.V);
      for (let i = 0; i < this.V; i++) {
        disc[i] = -1;
        low[i] = -1;
      }

      let stackMember = new Array(this.V);
      let st = [];

      // Call the recursive helper function
      // to find articulation points
      // in DFS tree rooted with vertex 'i'
      for (let i = 0; i < this.V; i++) {
        if (disc[i] == -1) this.SCCUtil(i, low, disc, stackMember, st);
      }
    }
  }

  // Driver code

  // Create a graph given in the above diagram

  var teste = {
    counter: 5,
    graph: {
      nodes: [
        { id: 0, label: 'Node 0', x: 200, y: 0 },
        { id: 1, label: 'Node 1', x: 50, y: 250 },
        { id: 2, label: 'Node 2', x: 300, y: 0 },
        { id: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, label: 'Node 4', x: 300, y: 0 },
      ],
      edges: [
        { from: 0, to: 4, label: '' },
        { from: 1, to: 0, label: '' },
        { from: 1, to: 2, label: '' },
        { from: 3, to: 4, label: '' },
        { from: 3, to: 2, label: '' },
        { from: 4, to: 2, label: '' },
      ],
    },
  };

  let g1 = new Graph(listaVertices.length);
  listaArestas.forEach(aresta => {
    g1.addEdge(aresta.from - 1, aresta.to - 1);
  });
  g1.SCC();

  /*
  g1.addEdge(1, 0);
  g1.addEdge(0, 2);
  g1.addEdge(2, 1);
  g1.addEdge(0, 3);
  g1.addEdge(3, 4);
  document.write('SSC in first graph <br>');
  g1.SCC();
  
  let g2 = new Graph(4);
  g2.addEdge(0, 1);
  g2.addEdge(1, 2);
  g2.addEdge(2, 3);
  document.write('\nSSC in second graph<br> ');
  g2.SCC();

  let g3 = new Graph(7);
  g3.addEdge(0, 1);
  g3.addEdge(1, 2);
  g3.addEdge(2, 0);
  g3.addEdge(1, 3);
  g3.addEdge(1, 4);
  g3.addEdge(1, 6);
  g3.addEdge(3, 5);
  g3.addEdge(4, 5);
  document.write('\nSSC in third graph <br>');
  g3.SCC();

  let g4 = new Graph(11);
  g4.addEdge(0, 1);
  g4.addEdge(0, 3);
  g4.addEdge(1, 2);
  g4.addEdge(1, 4);
  g4.addEdge(2, 0);
  g4.addEdge(2, 6);
  g4.addEdge(3, 2);
  g4.addEdge(4, 5);
  g4.addEdge(4, 6);
  g4.addEdge(5, 6);
  g4.addEdge(5, 7);
  g4.addEdge(5, 8);
  g4.addEdge(5, 9);
  g4.addEdge(6, 4);
  g4.addEdge(7, 9);
  g4.addEdge(8, 9);
  g4.addEdge(9, 8);
  document.write('\nSSC in fourth graph<br> ');
  g4.SCC();

  let g5 = new Graph(5);
  g5.addEdge(0, 1);
  g5.addEdge(1, 2);
  g5.addEdge(2, 3);
  g5.addEdge(2, 4);
  g5.addEdge(3, 0);
  g5.addEdge(4, 2);
  document.write('\nSSC in fifth graph <br>');
  g5.SCC();
  */
  // This code is contributed by avanitrachhadiya2155
}
