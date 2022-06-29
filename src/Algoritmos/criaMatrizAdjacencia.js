export function criaMatrizAdjacencia(listaVertices, listaArestas) {
  var graph = {
    nodes: listaVertices,
    edges: listaArestas
    }
  const matriz = {}
  var vertices = graph.nodes
  var labels = vertices.label
  var arestas = graph.edges
  
  function converteListaVertices(listaVertices){
      for(var i = 0; i<listaVertices.length; i++){
            if(i===0){
              listaVertices[i].label = 'start'
            }else if (i===listaVertices.length-1){
              listaVertices[i].label = 'finish'  
            }
      }
      return listaVertices
  }
  
  var verticesConvertidos = converteListaVertices(vertices)
  
  function converteIdLabel(listaVertices, listaArestas){
      var listaArestasLabel = []
      for(var i = 0; i<listaVertices.length; i++){
          for(var j = 0; j<listaArestas.length; j++){
              if(listaVertices[i].id === listaArestas[j].from){
                  if(i===0){
                      listaArestas[j].from = 'start'
                  }else if (i===listaVertices.length-1){
                      listaArestas[j].from = 'finish'
                  }else{
                      listaArestas[j].from = listaVertices[i].label
                  }
              }else if(listaVertices[i].id === listaArestas[j].to){
                  if(i===0){
                      listaArestas[j].to = 'start'
                  }else if (i===listaVertices.length-1){
                      listaArestas[j].to = 'finish'
                  }else{
                      listaArestas[j].to = listaVertices[i].label
                  }
              }
           }
      }
      listaArestasLabel = listaArestas
      return listaArestasLabel
  }
  var listaConvertida = converteIdLabel(verticesConvertidos, arestas)
  
  
  for(var j = 0; j<listaConvertida.length; j++){
      var from = listaConvertida[j].from
      var to = listaConvertida[j].to
      var peso = parseInt(listaConvertida[j].label)
  }
  
  for(var i = 0; i<vertices.length; i++){
      var label = vertices[i].label
      matriz[label] = {}
  }
      
  for(var i = 0; i<vertices.length; i++){
      var label = vertices[i].label
      matriz[label] = {}
  }
  
  for(var i = 0; i<vertices.length; i++){
      for(var j = 0; j<listaConvertida.length; j++){
          var label = vertices[i].label
          var to = listaConvertida[j].to
          var from = listaConvertida[j].from
          var peso = listaConvertida[j].label
          if(label===from){
              matriz[label][to] = peso
          }
      }
  }
  return matriz
}
