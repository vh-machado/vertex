class Vertice {
  constructor(novoId, label) {
    this.id = novoId;
    this.label = label;
  }
}

class Aresta {
  constructor(novoId, origem, destino, peso) {
    this.id = novoId;
    this.to = origem;
    this.from = destino;
    this.label = peso;
  }
}

export default class Grafo {
  constructor(orientado) {
    this.orientado = orientado;
    this.counter = 0;
    this.graph = {
      nodes: [],
      edges: [],
    };
  }

  adicionaVertice(novoId, label) {
    this.graph.nodes.push(new Vertice(novoId, label));
    this.graph.counter++;
  }

  adicionaAresta(novoId, origem, destino, peso) {
    this.graph.edges.push(new Aresta(novoId, origem, destino, peso));
  }

  removeVertice(id) {
    this.graph.nodes.filter(v => v.id === id);
  }

  removeAresta(from, to) {
    this.graph.edges.filter(a => a.from === from && a.to === to);
  }
}
