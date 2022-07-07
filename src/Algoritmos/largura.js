export function largura(grafo, origem, destino) {
  function converteIdLabel(listaVertices, listaArestas) {
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

  class Graph {
    constructor() {
      this.vertices = [];
      this.adjacent = {};
      this.edges = 0;
    }

    addVertex(v) {
      this.vertices.push(v);
      this.adjacent[v] = [];
    }

    addEdge(v, w) {
      this.adjacent[v].push(w);
      this.adjacent[w].push(v);
      this.edges++;
    }

    bfs(goal, root = this.vertices[0]) {
      let cost = 0;

      let adj = this.adjacent;

      const queue = [];
      queue.push(root);

      const discovered = [];
      discovered[root] = true;

      const edges = [];
      edges[root] = 0;

      const predecessors = [];
      predecessors[root] = null;

      const buildPath = (goal, root, predecessors) => {
        const stack = [];
        stack.push(goal);

        let u = predecessors[goal];

        while (u != root) {
          stack.push(u);
          u = predecessors[u];
        }

        stack.push(root);

        for (let i = 0; i < stack.length; i++) {
          var aresta = listaArestasLabels.find(
            a =>
              (a.from === stack[i] && a.to === stack[i + 1]) ||
              (a.to === stack[i] && a.from === stack[i + 1])
          );
          if (aresta !== undefined) {
            if(aresta.label !== ''){
              cost += parseInt(aresta.label);
            } else {
              cost += 1;
            }
          }
          console.log(cost);
        }

        let path = stack.reverse().join(' - ');

        return path;
      };

      while (queue.length) {
        let v = queue.shift();

        if (v === goal) {
          return {
            distance: edges[goal],
            path: buildPath(goal, root, predecessors),
            cost: cost,
          };
        }

        console.log('largura=',adj[v])
        
        for (let i = 0; i < adj[v].length; i++) {
          if (!discovered[adj[v][i]]) {
            discovered[adj[v][i]] = true;
            queue.push(adj[v][i]);
            edges[adj[v][i]] = edges[v] + 1;
            predecessors[adj[v][i]] = v;
          }
        }
      }

      return false;
    }
  }
  /*
  const stateOriginal = {
    counter: 6,
    graph: {
      nodes: [
        { id: 1, label: 'A', x: 200, y: 0 },
        { id: 2, label: 'B', x: 50, y: 250 },
        { id: 3, label: 'C', x: 300, y: 0 },
        { id: 4, label: 'D', x: 90, y: 100 },
        { id: 5, label: 'E', x: 0, y: 10 },
        { id: 6, label: 'F', x: 0, y: 10 },
      ],
      edges: [
        { from: 1, to: 2, label: '3' },
        { from: 1, to: 3, label: '5' },
        { from: 3, to: 2, label: '3' },
        { from: 3, to: 4, label: '9' },
        { from: 4, to: 5, label: '4' },
        { from: 5, to: 6, label: '6' },
        { from: 2, to: 6, label: '11' },
      ],
    },
  };*/

  const g = new Graph();

  grafo.nodes.forEach(vertice => {
    g.addVertex(vertice.label);
  });

  var listaArestasLabels = converteIdLabel(grafo.nodes, grafo.edges);

  listaArestasLabels.forEach(aresta => {
    g.addEdge(aresta.from, aresta.to);
  });

  console.log(origem, destino);
  console.log(g.bfs(destino, origem));

  return g.bfs(destino, origem);
}
