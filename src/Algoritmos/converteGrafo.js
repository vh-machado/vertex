const converteGrafo = (lista, graphData) => {
  var grafoOrdenado = {
    counter: 0,
    graph: {
      nodes: [],
      edges: [],
    },
  };

  graphData.graph.nodes.forEach(vertice => {
    grafoOrdenado.counter += 0;
    grafoOrdenado.graph.nodes.push({
      id: lista[vertice.id] + 1,
      idAnterior: vertice.id,
      label: vertice.label,
      x: vertice.x,
      y: vertice.y,
    });
  });

  graphData.graph.edges.forEach(aresta => {
    grafoOrdenado.graph.edges.push({
      fromAnterior: aresta.from,
      toAnterior: aresta.to,
      from: lista[aresta.from]+1,
      to: lista[aresta.to]+1,
    });
  });

  console.log('grafo:'+grafoOrdenado)
  return grafoOrdenado;
};

export default converteGrafo;
