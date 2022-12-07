export default function geraListaAdjacencia(grafo, orientado) {
    var { nodes: listaVertices, edges: listaArestas } = grafo;
    var listaAdjacencia = {};
  
    // Adiciona os vértices
    listaVertices.forEach(vertice => {
      if (!listaAdjacencia[vertice.id]) {
        listaAdjacencia[vertice.id] = [];
      }
    });
  
    // Adiciona as arestas
    listaArestas.forEach(aresta => {
      listaAdjacencia[aresta.from].push({
        idVertice: aresta.to,
        pesoAresta: Number(aresta.label),
      });
      if (!orientado) {
        listaAdjacencia[aresta.to].push({
          idVertice: aresta.from,
          pesoAresta: Number(aresta.label),
        });
      }
    });
  
    return listaAdjacencia;
  }