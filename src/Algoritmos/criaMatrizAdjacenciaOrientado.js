export default function criaMatrizAdjacenciaOrientado(
  listaVertices,
  listaArestas,
) {
  var matrizAdjacencia = [];

  for (let i = 0; i < listaVertices.length; i++) {
    matrizAdjacencia[i] = [];
    for (let j = 0; j < listaVertices.length; j++) {
      matrizAdjacencia[i][j] = 0;
    }
  }

  //console.log(listaArestas);
  listaArestas.forEach(aresta => {
    if (aresta.label === '') {
      matrizAdjacencia[aresta.from - 1][aresta.to - 1] = 1;
    } else {
      matrizAdjacencia[aresta.from - 1][aresta.to - 1] = parseInt(aresta.label);
    }
  });

  /*console.log('matrizAdjOrientado=');
  console.log(matrizAdjacencia);*/
  return matrizAdjacencia;
}
