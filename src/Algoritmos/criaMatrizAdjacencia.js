export function criaMatrizAdjacencia(listaVertices, listaArestas, origem, destino) {
  var graph = {
    nodes: listaVertices,
    edges: listaArestas,
  };
  const matriz = {};
  var vertices = graph.nodes;
  var labels = vertices.label;
  var arestas = graph.edges;

  function converteListaVertices(listaVertices) {
    for (var i = 0; i < listaVertices.length; i++) {
      if (listaVertices[i].label === origem) {
        listaVertices[i].label = 'start';
      }
      if (listaVertices[i].label === destino) {
        listaVertices[i].label = 'finish';
      }
    }
    //console.log(listaVertices);
    return listaVertices;
  }

  converteListaVertices(vertices);

  function converteIdLabel(listaVertices, listaArestas, origem, destino) {
    var listaArestasLabel = [];
    for (var i = 0; i < listaVertices.length; i++) {
      for (var j = 0; j < listaArestas.length; j++) {
        if (listaVertices[i].id === listaArestas[j].from) {
          if (listaVertices[i].label === origem) {
            listaArestas[j].from = 'start';
          } else if (listaVertices[i].label === destino) {
            listaArestas[j].from = 'finish';
          } else {
            listaArestas[j].from = listaVertices[i].label;
          }
        } else if (listaVertices[i].id === listaArestas[j].to) {
          if (listaVertices[i].label === origem) {
            listaArestas[j].to = 'start';
          } else if (listaVertices[i].label === destino) {
            listaArestas[j].to = 'finish';
          } else {
            listaArestas[j].to = listaVertices[i].label;
          }
        }
      }
    }
    listaArestasLabel = listaArestas;
    return listaArestasLabel;
  }
  var listaConvertida = converteIdLabel(vertices, arestas, origem, destino);

  for (let i = 0; i < listaConvertida.length; i++) {
    if (
      listaConvertida[i].label === '' ||
      listaConvertida[i].label === null ||
      listaConvertida[i].label === undefined
    ) {
      listaConvertida[i].label = '1';
    }
  }

  for (var j = 0; j < listaConvertida.length; j++) {
    var from = listaConvertida[j].from;
    var to = listaConvertida[j].to;
    var peso = parseInt(listaConvertida[j].label);
    //console.log(from, to, peso)
  }

  for (var i = 0; i < vertices.length; i++) {
    var label = vertices[i].label;
    matriz[label] = {};
  }

  for (var i = 0; i < vertices.length; i++) {
    var label = vertices[i].label;
    matriz[label] = {};
  }

  for (var i = 0; i < vertices.length; i++) {
    for (var j = 0; j < listaConvertida.length; j++) {
      var label = vertices[i].label;
      var to = listaConvertida[j].to;
      var from = listaConvertida[j].from;
      var peso = parseInt(listaConvertida[j].label);
      if (label === from) {
        matriz[label][to] = peso;
      }
    }
  }

  console.log('matrizAdj pro Dijkstra=')
  console.log(matriz);
  return matriz;
}
