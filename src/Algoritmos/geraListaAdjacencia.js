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
    let busca = listaAdjacencia[aresta.from].find(
      v => v.idVertice === aresta.to
    );

    if (!busca) {
      listaAdjacencia[aresta.from].push({
        idVertice: aresta.to,
        pesoAresta: aresta.label === '' ? 1 : Number(aresta.label),
      });
    }

    if (!orientado) {
      let busca = listaAdjacencia[aresta.to].find(
        v => v.idVertice === aresta.from
      );

      if (!busca) {
        listaAdjacencia[aresta.to].push({
          idVertice: aresta.from,
          pesoAresta: aresta.label === '' ? 1 : Number(aresta.label),
        });
      }
    }
  });

  console.log('listaAdjacencia=', listaAdjacencia);

  return listaAdjacencia;
}
