/** Formata o array de vertices para substituir o id pelo label dos vértices */
export default function formataVertices(nodes, listaVertices) {
  let verticesFormatados = [];

  listaVertices?.forEach(vertice => {
    var verticeBuscado = nodes.find(v => v.id === vertice);
    verticesFormatados.push(verticeBuscado.label);
  });

  return verticesFormatados;
}
