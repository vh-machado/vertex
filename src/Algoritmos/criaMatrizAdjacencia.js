import criaListaAdjacencia from './criaListaAdjacencia';

// Transforma o formato de dados do grafo em uma matriz de adjacência
export default function criaMatrizCaminho(listaVertices, listaArestas) {
  var caminhos = criaListaAdjacencia(listaVertices, listaArestas);

  listaVertices.forEach(vertice => {
    caminhos[vertice.id].forEach(vizinho => {
      console.log(caminhos[vertice.id] + ' U ' + caminhos[vizinho]);
      caminhos[vertice.id] = Array.from(
        new Set([...caminhos[vertice.id], ...caminhos[vizinho]])
      );
    });
  });

  /*
    var matrizAdjacencia = [];
    listaVertices.forEach(vertice => {
        matrizAdjacencia.push([]);
    })
    
    for(let i=0; i < matrizAdjacencia.length; i++){
        for(let j=0; j < matrizAdjacencia[i].length; j++){
            if(i === )
        }       
    }
    listaArestas.forEach(aresta => {
        matrizAdjacencia[aresta.from - 1][aresta.to - 1] = 1;
    });
    console.log(matrizAdjacencia);
    matrizAdjacencia.forEach(linha => {
        linha.forEach(item => {
            if(!item.length){
                item = 0;
            }
        })
    })
    */
  console.log('caminhos=');
  console.log(caminhos);
}
