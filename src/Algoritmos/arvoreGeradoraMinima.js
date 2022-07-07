import criaMatrizAdjacenciaNaoOrientado from './criaMatrizAdjacenciaNaoOrientado';

export function arvoreGeradoraMinima(graphData) {
  const listaVertices = graphData.graph.nodes;
  const listaArestas = graphData.graph.edges;
  // Number of vertices in the graph
  let V = graphData.counter;
  //console.log(graphData);
  var arestasArvore = [];
  var custo = 0;

  // A utility function to find the vertex with
  // minimum key value, from the set of vertices
  // not yet included in MST
  function minKey(key, mstSet) {
    // Initialize min value
    let min = Number.MAX_VALUE,
      min_index;

    for (let v = 0; v < V; v++) {
      if (mstSet[v] == false && key[v] < min) {
        min = key[v];
        min_index = v;
      }
    }

    return min_index;
  }

  // A utility function to print the
  // constructed MST stored in parent[]
  function printMST(parent, graph) {
    //console.log('Edge   Weight');
    //var vertice1;
    //var vertice2;
    for (let i = 1; i < V; i++) {
      var vertice1 = listaVertices.find(v => v.id == parent[i]+1);
      var vertice2 = listaVertices.find(v => v.id == i+1);
      //console.log(vertice1.label + ' - ' + vertice2.label + '  (' + graph[i][parent[i]]+')');
      arestasArvore.push(vertice1.label + ' - ' + vertice2.label + '  ( ' + graph[i][parent[i]]+' )');
      custo += graph[i][parent[i]];
      //console.log((parent[i]) + '  - ' + (i) + '  ' + graph[i][parent[i]]);

      /*
      var aresta;
      aresta = listaArestas.find(
        a => a.from === parent[i] + 1 && a.to === i + 1
      );
      if (aresta === undefined) {
        aresta = listaArestas.find(
          a => a.from === i + 1 && a.to === parent[i] + 1
        );
      }
      arestasArvore.push({
        from: aresta.from,
        to: aresta.to,
        label: aresta.label,
      });*/
      
    }
  }

  // Function to construct and print MST for
  // a graph represented using adjacency
  // matrix representation
  function primMST(graph) {
    // Array to store constructed MST
    let parent = [];

    // Key values used to pick minimum weight edge in cut
    let key = [];

    // To represent set of vertices included in MST
    let mstSet = [];

    // Initialize all keys as INFINITE
    for (let i = 0; i < V; i++) {
      key[i] = Number.MAX_VALUE;
      mstSet[i] = false;
    }

    // Always include first 1st vertex in MST.
    // Make key 0 so that this vertex is picked as first vertex.
    key[0] = 0;
    parent[0] = -1; // First node is always root of MST

    // The MST will have V vertices
    for (let count = 0; count < V - 1; count++) {
      // Pick the minimum key vertex from the
      // set of vertices not yet included in MST
      let u = minKey(key, mstSet);

      // Add the picked vertex to the MST Set
      mstSet[u] = true;

      // Update key value and parent index of
      // the adjacent vertices of the picked vertex.
      // Consider only those vertices which are not
      // yet included in MST
      for (let v = 0; v < V; v++)
        // graph[u][v] is non zero only for adjacent vertices of m
        // mstSet[v] is false for vertices not yet included in MST
        // Update the key only if graph[u][v] is smaller than key[v]
        if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
          parent[v] = u;
          key[v] = graph[u][v];
        }
    }

    // print the constructed MST
    printMST(parent, graph);
  }

  // Driver code
  
  let graph = criaMatrizAdjacenciaNaoOrientado(listaVertices, listaArestas);
  // Print the solution
  primMST(graph);

  var resultadoAGM = {};
  resultadoAGM['custo'] = custo;
  resultadoAGM['arestas'] = arestasArvore;
 /* console.log('agm=');
  console.log(resultadoAGM.arestas);
  console.log('custo agm=');
  console.log(resultadoAGM.custo);*/
  return resultadoAGM;
}
