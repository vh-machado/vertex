export default function criaMatrizAdjacenciaNaoOrientado(listaVertices, listaArestas, possuiPeso){
    var matrizAdjacencia = [];

    for(let i = 0; i < listaVertices.length; i++){
        matrizAdjacencia[i] = [];
        for(let j = 0; j < listaVertices.length; j++){
            matrizAdjacencia[i][j] = 0;
        }
    }

    if(possuiPeso){
        listaArestas.forEach(aresta => {
            matrizAdjacencia[aresta.to - 1][aresta.from - 1] = parseInt(aresta.label);
            matrizAdjacencia[aresta.from - 1][aresta.to - 1] = parseInt(aresta.label);
        });
    } else {
        listaArestas.forEach(aresta => {
            matrizAdjacencia[aresta.to - 1][aresta.from - 1] = 1;
            matrizAdjacencia[aresta.from - 1][aresta.to - 1] = 1;
        }); 
    }
    

    console.log('matrizAdj=');
    console.log(matrizAdjacencia)
    return matrizAdjacencia;
}