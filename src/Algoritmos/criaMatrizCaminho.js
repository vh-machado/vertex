import criaMatrizAdjacenciaOrientado from './criaMatrizAdjacenciaOrientado';

export default function criaMatrizCaminho(listaVertices, listaArestas) {
  //var listaVertices = grafo.nodes;
  //var listaArestas = grafo.edges;
  /*
  function multiplicaMatrizes(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }*/
  let MatrixProd = (A, B) =>
    A.map((row, i) =>
      B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0))
    );

  const matrizAdjacencia = criaMatrizAdjacenciaOrientado(
    listaVertices,
    listaArestas,
  );
  var matrizA = [];
  var matrizB = [];
  matrizA = matrizAdjacencia;
  matrizB = matrizAdjacencia;

  var matrizCaminho = [];
  matrizCaminho = MatrixProd(matrizA, matrizB);

  for (let i = 0; i < matrizCaminho.length; i++) {
    for (let j = 0; j < matrizCaminho[i].length; j++) {
      matrizCaminho[i][j] = matrizCaminho[i][j] + matrizAdjacencia[i][j];
      if (matrizCaminho[i][j] > 1) {
        matrizCaminho[i][j] = 1;
      }
    }
  }

  //console.log(matrizCaminho);
  return matrizCaminho;
}
