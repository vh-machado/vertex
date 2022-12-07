class Graph {
  constructor(v) {
    this.time = 0;
    this.array_aux = [];
    this.vertices = v;
    this.arestas = geraAleatorio(9, 45);
    this.lista_grafo = [];
    this.matriz_grafo = [[]];
  }

  geraAleatorio(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getNumeroArestas() {
    return this.arestas;
  }
  geraGrafoAleatorio() {
    for (let i in this.arestas) {
      let origem = geraAleatorio(0, this.vertices);
      let destino = geraAleatorio(0, this.vertices);

      while (origem === destino && this.matriz_grafo[origem][destino] == 1) {
        origem = geraAleatorio(0, this.vertices);
        destino = geraAleatorio(0, this.vertices);
      }
      this.lista_grafo[origem].push(destino);
      this.matriz_grafo[origem][destino] = 1;
    }
  }

  profundidade() {
    this.vertices_visitados = [false] * this.vertices;
    this.tempo_inicio = [0] * this.vertices;
    this.tempo_arestas = [0] * this.vertices;
  }

  traverse_profundidade(node) {
    this.vertices_visitados[node] = true;
    this.array_aux.push(node);
    this.tempo_inicio[node] = this.time;
    this.time += 1;

    for (let vizinho in this.lista_grafo[node]) {
      if (!this.visitado[vizinho]) {
        console.log('Arvore aresta: ', node, '-->', vizinho);
        this.traverse_profundidade(vizinho);
      } else {
        if (
          this.tempo_inicio[node] > this.tempo_inicio[vizinho] &&
          this.tempo_arestas[node] < this.tempo_arestas[vizinho]
        ) {
          console.log('Retorno aresta: ', node, '-->', vizinho);
        } else if (
          this.tempo_inicio[node] < this.tempo_inicio[vizinho] &&
          this.tempo_arestas[node] > this.tempo_arestas[vizinho]
        ) {
          console.log('Avanco aresta: ', node, '-->', vizinho);
        } else if (
          this.tempo_inicio[node] > this.tempo_inicio[vizinho] &&
          this.tempo_arestas[node] > this.tempo_arestas[vizinho]
        ) {
          console.log('Cruzamento aresta:', node, '-->', vizinho);
        }
      }
      this.tempo_arestas[node] = this.time;
      this.time += 1;
    }
  }
}

let n = 10;
let g = new Graph(n);
