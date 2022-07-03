// Transforma o formato de dados do grafo em uma lista de adjacência
export function criaListaAdjacencia(listaVertices, listaArestas, orientacao) {
  var listaAdjacencia = {};

  // Adiciona os vértices
  listaVertices.forEach(vertice => {
    if (!listaAdjacencia[vertice.id]) {
      listaAdjacencia[vertice.id] = [];
    };
  });

  // Adiciona as arestas
  listaArestas.forEach(aresta => {
    listaAdjacencia[aresta.from].push(aresta.to);
    if(!orientacao){
      listaAdjacencia[aresta.to].push(aresta.from);
    }
    //console.log(aresta.from +'=>'+ aresta.to )
  });
  return listaAdjacencia;
}
