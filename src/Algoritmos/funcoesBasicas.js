export class funcoesBasicas {

  constructor() {
    this.listaAdjacencia = {}
    this.orientado = false;
  }

  quantidadeVertices() {  
    return Object.keys(this.listaAdjacencia).length;
  }

  quantidadeArestas(){
    let quantidade = 0;
    Object.keys(this.listaAdjacencia).forEach(vertice => {
      quantidade += this.listaAdjacencia[vertice].length
    })
    
    if(!this.orientado){
      quantidade /= 2
    }

    return quantidade;
  }

  procuraAresta(origem, destino, grafo, orientado) {
    var resposta = 'Não existe a aresta';
    grafo.edges.forEach(teste);
    function teste(item) {
      if (item.from === origem && item.to === destino) {
        resposta = 'Existe a aresta';
      } else if (!orientado && item.to === origem && item.from === destino) {
        resposta = 'Existe a aresta';
      }
    }
    return resposta;
  }

  calcularGrau(grafo, vertice, tipoGrafo) {
    var contador = 0;
    if (tipoGrafo === 'orientado') {
      for (var i = 0; i < grafo.edges.length; i++) {
        if (grafo.edges[i].from === vertice) {
          contador++;
        }
        if (grafo.edges[i].to === vertice) {
          contador++;
        }
      }
      return contador;
    } else if (tipoGrafo === 'nao_orientado') {
      for (var j = 0; j < grafo.edges.length; j++) {
        if (grafo.edges[j].from === vertice || grafo.edges[j].to === vertice) {
          contador++;
        }
      }

      return contador;
    }
  }

  recuperarAdjacencias(grafo, verticeEscolhido) {
    const verticesAdjacentes = new Set();
    const arestas = grafo.edges;
    const vertices = grafo.nodes;
    arestas.forEach(aresta => {
      vertices.forEach(vertice => {
        if (aresta.from === verticeEscolhido && aresta.to === vertice.id) {
          verticesAdjacentes.add(vertice.label);
        }
        if (
          aresta.to === verticeEscolhido &&
          aresta.from === vertice.id &&
          !verticesAdjacentes.has(vertice.label)
        ) {
          verticesAdjacentes.add(vertice.label);
        }
      });
    });
    return [...verticesAdjacentes].join(', ');
  }

  recuperarArestas(grafo, verticeEscolhido) {
    var resposta = [];
    function teste(item) {
      if (item.from === verticeEscolhido) {
        resposta.push(item);
      }
    }
    grafo.edges.forEach(teste);
    return resposta;
  }

  converteIdLabel(listaVertices, listaArestas) {
    var listaArestasLabel = [];
    for (var i = 0; i < listaVertices.length; i++) {
      for (var j = 0; j < listaArestas.length; j++) {
        if (listaVertices[i].id === listaArestas[j].from) {
          listaArestas[j].from = listaVertices[i].label;
        } else if (listaVertices[i].id === listaArestas[j].to) {
          listaArestas[j].to = listaVertices[i].label;
        }
      }
    }
    listaArestasLabel = listaArestas;
    return listaArestasLabel;
  }

}
