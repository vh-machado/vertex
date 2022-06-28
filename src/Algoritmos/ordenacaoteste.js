
const ordenacaoteste = graphData => {
  // This class represents a directed graph
  // using adjacency list representation
  

  var sortGraph = {
    counter: 0,
    graph: { nodes: [], edges: [] },
  };

  class Graph {
    // Constructor
    constructor(v) {
      // Number of vertices
      this.V = v;

      this.vertices = new Array(this.V);

      // Adjacency List as ArrayList of ArrayList's
      this.adj = new Array(this.V);
      this.vertices.forEach(vertice => {
        this.adj = [...this.adj, {id: vertice, adjacente: []}];
      })

      console.log('lista adj ' + this.adj);
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
      var indice = this.adj.find(vertice => v === vertice.id)
      this.adj[indice].adjacente.push(w);
      alert(this.adj[indice])
    }

    // A recursive function used by topologicalSort
    topologicalSortUtil(vertice, visited, stack) {
      // Mark the current node as visited.
      vertice.visitado = true;
      //let i = 0;

      // Recur for all the vertices adjacent
      // to thisvertex
      var indice = this.adj.find(v => v.id === vertice.id);

      this.adj[indice].forEach(v => {
        var visita = visited.find(vis => vis.id === v.id);
        if(!visita){
          this.topologicalSortUtil(v, visited, stack);
        }
      })

      // Push current vertex to stack
      // which stores result
      
      stack.push(vertice.id);
    }

    // The function to do Topological Sort.
    // It uses recursive topologicalSortUtil()
    topologicalSort() {
      let stack = new Array();

      // Mark all the vertices as not visited
      var visited = new Array(this.V);
      this.vertices.forEach(vertice => {
        visited = [...visited, {id: vertice, visitado: false}];
      });

      // Call the recursive helper
      // function to store
      // Topological Sort starting
      // from all vertices one by one
      visited.forEach(vertice => {
        if (vertice.visitado === false) {
          console.log("teste")
          this.topologicalSortUtil(vertice, visited, stack);
        }
      });

      var ordem = 0;
      sortGraph.counter = 0;
      console.log(stack)
      // Cria o grafo ordenado para exibição
      while (stack.length !== 0) {
        var ordenado = stack.pop();
        sortGraph.counter += 1;
        for (let i = 0; i < graphData.graph.nodes.length; i++) {
          if (ordenado === graphData.graph.nodes[i].id) {
            // Adição dos vértices no grafo ordenado
            sortGraph.graph.nodes = [
              ...sortGraph.graph.nodes,
              {
                id: ordem,
                idCriacao: ordenado,
                label: graphData.graph.nodes[i].label,
                x: graphData.graph.nodes[i].x,
                y: graphData.graph.nodes[i].y,
              },
            ];
          }
        }
        ordem += 1;

        //console.log(stack.pop() + ' ');
      }
      // Adição das arestas no grafo ordenado
      graphData.graph.edges.forEach(aresta => {
        sortGraph.graph.edges = [
          ...sortGraph.graph.edges,
          {
            fromAnterior: aresta.from,
            toAnterior: aresta.to,
            from: null,
            to: null,
            label: aresta.label,
          },
        ];
      });

      sortGraph.graph.edges.forEach(aresta => {
        sortGraph.graph.nodes.forEach(vertice => {
          if (vertice.idCriacao === aresta.fromAnterior) {
            aresta.from = vertice.id;
          }
          if (vertice.idCriacao === aresta.toAnterior) {
            aresta.to = vertice.id;
          }
        });
      });
    }
  }


  var state = {
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: 'Node 1', x: 200, y: 0 },
        { id: 2, label: 'Node 2', x: 50, y: 250 },
        { id: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, label: 'Node 4', x: 90, y: 100 },
        { id: 5, label: 'Node 5', x: 0, y: 10 },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
  };

  // Passagem de dados do grafo da visualização para lista de adjacência
  var g = new Graph(graphData.counter);

  graphData.graph.nodes.forEach(vertice => {
    g.vertices.push(vertice.id) ;
  });
  
  graphData.graph.edges.forEach(aresta => {
    g.addEdge(aresta.from, aresta.to);
    alert('socorro')
  });

  console.log('Following is a Topological sort of the given graph');

  // Function Call
  g.topologicalSort();
  console.log(sortGraph);

  /*
  var state = {
    counter: 5,
    graph: {
      nodes: [
        { id: 1, idCriacao: 5, label: 'Node 1', x: 200, y: 0 },
        { id: 2, idCriacao: 4, label: 'Node 2', x: 50, y: 250 },
        { id: 3, idCriacao: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, idCriacao: 2, label: 'Node 4', x: 90, y: 100 },
        { id: 5, idCriacao: 1, label: 'Node 5', x: 0, y: 10 },
      ],
      edges: [
        { fromAnterior: 5, toAnterior: 4, from: 1, to: 2 },
        { fromAnterior: 5, toAnterior: 3, from: 1, to: 3 },
        { fromAnterior: 4, toAnterior: 2, from: 2, to: 4 },
        { fromAnterior: 4, toAnterior: 1, from: 2, to: 5 },
      ],
    },
  };*/

  return sortGraph;
};

export default ordenacaoteste;
