export class algoritmosGrafos {
  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  procuraAresta(origem, destino, grafo, orientado) {
    var resposta = 'Não existe a aresta';
    grafo.edges.forEach(teste);
    function teste(item) {
      if (item.from === origem && item.to === destino) {
        resposta = 'Existe a aresta';
      } else if (!orientado && item.to === origem && item.from === destino) {
        resposta = 'Existe a aresta';
      }
    }
    return resposta;
  }

  calcularGrau(grafo, vertice, tipoGrafo) {
    var contador = 0;
    if (tipoGrafo === 'orientado') {
      for (var i = 0; i < grafo.edges.length; i++) {
        if (grafo.edges[i].from === vertice) {
          contador++;
        }
        if (grafo.edges[i].to === vertice) {
          contador++;
        }
      }
      return contador;
    } else if (tipoGrafo === 'nao_orientado') {
      for (var j = 0; j < grafo.edges.length; j++) {
        if (grafo.edges[j].from === vertice || grafo.edges[j].to === vertice) {
          contador++;
        }
      }

      return contador;
    }
  }

  recuperarAdjacencias(grafo, verticeEscolhido) {
    const verticesAdjacentes = new Set();
    const arestas = grafo.edges;
    const vertices = grafo.nodes;
    arestas.forEach(aresta => {
      vertices.forEach(vertice => {
        if (aresta.from === verticeEscolhido && aresta.to === vertice.id) {
          verticesAdjacentes.add(vertice.label);
        }
        if (
          aresta.to === verticeEscolhido &&
          aresta.from === vertice.id &&
          !verticesAdjacentes.has(vertice.label)
        ) {
          verticesAdjacentes.add(vertice.label);
        }
      });
    });
    return [...verticesAdjacentes].join(', ');
  }

  recuperarArestas(grafo, verticeEscolhido) {
    var resposta = [];
    function teste(item) {
      if (item.from === verticeEscolhido) {
        resposta.push(item);
      }
    }
    grafo.edges.forEach(teste);
    return resposta;
  }

  converteIdLabel(listaVertices, listaArestas) {
    var listaArestasLabel = [];
    for (var i = 0; i < listaVertices.length; i++) {
      for (var j = 0; j < listaArestas.length; j++) {
        if (listaVertices[i].id === listaArestas[j].from) {
          listaArestas[j].from = listaVertices[i].label;
        } else if (listaVertices[i].id === listaArestas[j].to) {
          listaArestas[j].to = listaVertices[i].label;
        }
      }
    }
    listaArestasLabel = listaArestas;
    return listaArestasLabel;
  }

  verificaConexo(grafo) {

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

        // Check if all non-zero degree vertices are visited
        for (i = 0; i < this.V; i++) {
          if (visited[i] == false && this.adj[i].length > 0) {
            return false;
          }
          if (visited[i] == false && this.adj[i].length == 0) {
            return false;
          }
        }
        console.log(visited);

        return true;
      }

    }
    var listaVertices = grafo.nodes;
    var listaArestas = grafo.edges;

    var g = new Graph(listaVertices.length);
    listaArestas.forEach(aresta => {
      g.addEdge(aresta.from - 1, aresta.to - 1);
    });
    return g.isConnected();

  }
}
