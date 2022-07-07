export function caminhoBellmanFord(grafo, origem, destino) {
  function BellmanFord(graph, V, E, src, dest) {
    // Initialize distance of all vertices as infinite.
    var dis = new Array(V).fill(Infinity);
    var ant = new Array(V).fill(null);

    // initialize distance of source as 0
    dis[src] = 0;

    // Relax all edges |V| - 1 times. A simple
    // shortest path from src to any other
    // vertex can have at-most |V| - 1 edges
    for (var i = 0; i < V - 1; i++) {
      for (var j = 0; j < E; j++) {
        if (dis[graph[j][0]] + graph[j][2] < dis[graph[j][1]]) {
          ant[graph[j][1]] = graph[j][0];
          //console.log('ant = ',ant)
          dis[graph[j][1]] = dis[graph[j][0]] + graph[j][2];
        }
      }
    }

    // check for negative-weight cycles.
    // The above step guarantees shortest
    // distances if graph doesn't contain
    // negative weight cycle. If we get a
    // shorter path, then there is a cycle.
    for (var i = 0; i < E; i++) {
      var x = graph[i][0];
      var y = graph[i][1];
      var weight = graph[i][2];
      if (dis[x] != Infinity && dis[x] + weight < dis[y]) {
        return undefined;
      }
    }

    console.log('Distância/Custo da Origem até o Destino');
    for (var i = 0; i < V; i++) {
      console.log(i + '   ' + dis[i]);
    }
    console.log(ant);

    if (dis[dest] === Infinity) {
      return Infinity;
    }

    var caminho = [dest];
    var tracker = ant[dest];
    caminho.push(tracker);
    while (tracker !== src) {
      tracker = ant[tracker];
      caminho.push(tracker);
    }

    var distanciaCusto = dis[dest];
    var menorCaminho = caminho.reverse();

    return { distanciaCusto, menorCaminho };
  }

  /*
  A B
  A C
  A D
  B E
  B F
  C G
  C H
  D I
  */

  /*
  S U 10
  U V 1
  S X 5
  X U 3
  U X 2
  X Y 2
  X V 9
  Y S 7
  Y V 4
  V Y 6
  */

  var graph = [];
  grafo.edges.forEach(aresta => {
    var peso = aresta.label === '' ? 1 : parseInt(aresta.label);
    graph.push([aresta.from - 1, aresta.to - 1, peso]);
  });
  console.log(graph);

  // Roda o Algoritmo Bellman-Ford e retorna distancia/custo e o menor caminho
  var resultado = BellmanFord(
    graph,
    grafo.nodes.length,
    grafo.edges.length,
    grafo.nodes.find(v => v.label === origem).id - 1,
    grafo.nodes.find(v => v.label === destino).id - 1
  );

  if (resultado === Infinity) {
    console.log('Não existe caminho', resultado);
    return { distanciaCusto: Infinity, menorCaminho: 'Não existe caminho'};
  } else if (resultado === undefined) {
    console.log('Ciclo negativo', resultado);
    return { distanciaCusto: undefined, menorCaminho: 'Ciclo negativo'};
  }

  // Formatação do caminho
  for (let i = 0; i < resultado.menorCaminho.length; i++) {
    var vertice = grafo.nodes.find(v => v.id - 1 === resultado.menorCaminho[i]);
    resultado.menorCaminho[i] = vertice.label;
  }
  resultado.menorCaminho = resultado.menorCaminho.join(' - ');

  console.log(resultado);
  return resultado;
}