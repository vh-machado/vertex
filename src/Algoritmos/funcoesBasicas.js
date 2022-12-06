import { criaListaAdjacencia } from './criaListaAdjacencia';
import { largura } from '../Algoritmos/largura';
import criaMatrizAdjacenciaNaoOrientado from './criaMatrizAdjacenciaNaoOrientado';
var ciclo = false;

export class algoritmosGrafos {
  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  //Função que verifica se existe uma aresta entre dois vertices
  procuraAresta(origem, destino, grafo, orientado) {
    var resposta = 'Não existe a aresta'; // variavel que retorna se existe ou nao uma aresta
    grafo.edges.forEach(teste); // percorre a aresta de um grafo
    function teste(item) {
      // verifica se a aresta do vertice de origem eh a mesma
      // do vertice de destino
      if (item.from === origem && item.to === destino) { 
        resposta = 'Existe a aresta'; // se sim, resposta recebe "Existe a aresta"
      // verifica se o grafo eh nao orientado e se a aresta de saida do vertice de origem
      //eh a mesma que a aresta de chegada no vertice de destino
      } else if (!orientado && item.to === origem && item.from === destino) {
        resposta = 'Existe a aresta';// se sim, resposta recebe "Existe a aresta"
      }
    }
    return resposta; //retorna a resposta
  }
  //Função que verifica o grau de um vertice
  calcularGrau(grafo, vertice, tipoGrafo) {
    var contador = 0; // variavel contador para contabilizar o grau
    if (tipoGrafo === 'orientado') { // verifica se o grafo eh orientado
      for (var i = 0; i < grafo.edges.length; i++) { //percorre as arestas do grafo
        if (grafo.edges[i].from === vertice) { // verifica se existem arestas que chegam no vertice
          contador++; // se sim, entao eh contabilizado
        }
        if (grafo.edges[i].to === vertice) { // verifica se existem arestas que saem do vertice
          contador++; // se sim, eh contabilizado
        }
      }
      return contador; // retorna o grau do vertice para grafo orientado
    } else if (tipoGrafo === 'nao_orientado') { // verifica se o grafo eh nao orientado
      for (var j = 0; j < grafo.edges.length; j++) { //percorre as arestas do grafo
        // verifica se existem arestas que chegam ou que saem do vertice
        if (grafo.edges[j].from === vertice || grafo.edges[j].to === vertice) {
          contador++; // sim, eh contabilizado
        }
      }

      return contador; // retorna o grau do vertice para grafo nao orientado
    }
  }
  //Ele recebe o grafo e o vértice escolhido para saber as adjacências.
  recuperarAdjacencias(grafo, verticeEscolhido) {
    const verticesAdjacentes = new Set();
    const arestas = grafo.edges; // recebe as arestas do grafo
    const vertices = grafo.nodes; // recebe os nós do grafo
    arestas.forEach(aresta => { // percorre as arestas do grafo
      vertices.forEach(vertice => { // percorre os vertices do grafo
        //Verifica as arestas que chegam no vértice escolhido
        // e as arestas que saem dele e adiciona em verticesAdjacentes.
        if (aresta.from === verticeEscolhido && aresta.to === vertice.id) { 
          verticesAdjacentes.add(vertice.label);
        }
        //verifica as arestas que saem do vértice escolhido
        //e as arestas que chegam nele e se não está incluso em verticesAdjacentes.
        // Se essa condição for satisfeita,
        // então é adicionado em verticesAdjacentes e retorna a lista de vertices adjacentes
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
  //função que recupera a aresta de um vertice
  recuperarArestas(grafo, verticeEscolhido) {
    var resposta = []; // variavel que vai receber as arestas do vertice escolhido
    function teste(item) {
      if (item.from === verticeEscolhido) { //verifica as arestas que chegam no vertice
        resposta.push(item); //adiciona a aresta recuperada no vetor
      }
    }
    grafo.edges.forEach(teste); // recebe as arestas do grafo
    return resposta; // retorna as arestas recuperadas
  }

  eCiclo(listaAdjacencia, origem, destino, visitados = new Set()) {
    console.log(origem);
    visitados.add(origem);
    const atual = listaAdjacencia[origem];
    var temCiclo = false;
    //var ciclo = false
    atual.find(vertice => {
      console.log('ciclo');
      console.log(visitados, vertice);
      if (visitados.has(vertice)) {
        ciclo = true;
        temCiclo = true;
      }
      !visitados.has(vertice) &&
        !visitados.has(destino) &&
        this.eCiclo(listaAdjacencia, vertice, destino, visitados);
    });
    console.log(atual);
    return temCiclo;
  }

  buscaEmProfundidade(listaAdjacencia, origem, destino, visitados = new Set()) {
    visitados.add(origem);
    const atual = listaAdjacencia[origem];
    atual.find(vertice => {
      console.log(visitados, vertice);
      if (visitados.has(vertice)) {
        console.log('entrou');
      }
      !visitados.has(vertice) &&
        !visitados.has(destino) &&
        this.buscaEmProfundidade(listaAdjacencia, vertice, destino, visitados);
    });

    return {
      verticesExpandidos: Array.from(visitados),
      caminho: visitados.has(destino),
    };
  }
  /*
    buscaEmLargura(grafo, origem, destino) {
        const listaAdjacencia = criaListaAdjacencia(grafo.nodes, grafo.edges)
        const visitados = new Set()

        visitados.add(origem)

        const fila = [origem]

        let caminho = ''

        while (fila.length > 0 && visitados.size !== listaAdjacencia.size) {
            const vertice = fila.shift()
            const atual = listaAdjacencia[vertice]
            if (!atual)
                break

            caminho = atual.find(vertice => {
                visitados.add(vertice)
                fila.push(vertice)

                return vertice === destino
            })

            if (caminho)
                break
        }

        return {
            verticesExpandidos: Array.from(visitados),
            caminho
        }
    }*/

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

  criarMapGrafos(nodes, edges) {
    const adjacencyList = new Map();
    nodes.forEach(vertice => adjacencyList.set(vertice.label, []));
    edges.forEach(aresta => adjacencyList.get(aresta.from).push(aresta.to));
    return adjacencyList;
  }

  bfs(grafo, origin, destination) {
    //console.log(origin+' para '+ destination)
    const adjacencyList = this.criarMapGrafos(
      grafo.nodes,
      this.converteIdLabel(grafo.nodes, grafo.edges)
    );
    // console.log(adjacencyList)
    const visited = new Set();
    const menorCaminho = new Set();

    visited.add(origin);

    const queue = [origin];

    let isPath = '';

    while (queue.length > 0 && visited.size !== adjacencyList.size) {
      const node = queue.shift();

      const current = adjacencyList.get(node);
      if (!visited.has(destination)) {
        menorCaminho.add(node);
      }
      if (current.includes(destination)) {
        menorCaminho.add(current[current.indexOf(destination)]);
      }

      if (!current) break;

      isPath = current.find(node => {
        visited.add(node);
        queue.push(node);

        return node === destination;
      });

      if (isPath) break;
    }

    return {
      expandedNodes: Array.from(visited),
      menorCaminho: Array.from(menorCaminho),
      isPath,
    };
  }

  possuiCiclo(grafo, origem, destino) {
    /*
    const listaAdjacencias = criaListaAdjacencia(
      grafo.nodes,
      grafo.edges,
      false
    );
    console.log('listaAdj=', listaAdjacencias);
    //console.log(listaAdjacencias)
    const resultado = this.eCiclo(listaAdjacencias, origem, destino);
    return resultado;*/

    var nodes = grafo.nodes.length;
    var matriz = criaMatrizAdjacenciaNaoOrientado(grafo.nodes, grafo.edges);
    console.log(matriz);

    function dfs(vertex, visited, parent) {
      visited.add(vertex);
      for (let v = 0; v < nodes; v++) {
        if (matriz[vertex][v]) {
          if (v == parent)
            //if v is the parent not move that direction
            continue;
          if (visited.has(v))
            //if v is already visited
            return true;
          if (dfs(v, visited, vertex)) return true;
        }
      }
      return false;
    }

    function hasCycle() {
      var visited = new Set(); //visited set
      for (let v = 0; v < nodes; v++) {
        if (visited.has(v))
          //when visited holds v, jump to next iteration
          continue;
        if (dfs(v, visited, -1)) {
          //-1 as no parent of starting vertex
          return true;
        }
      }
      return false;
    }

    return hasCycle();
  }

  possuiCicloOrientado(listaVertices, listaArestas) {
    let V = listaVertices.length;
    let adj = new Array(V);
    for (let i = 0; i < V; ++i) {
      adj[i] = [];
    }

    for (let i = 0; i < listaArestas.length; i++) {
      adicionarAresta(listaArestas[i].from - 1, listaArestas[i].to - 1);
    }

    function adicionarAresta(v1, v2) {
      adj[v1].push(v2);
    }

    if (temCiclo()) return true;
    else return false;

    function dfs(v) {
      var pilha = [];
      var visitados = new Array(V);
      var pilha_rec = new Array(V);

      // inicializa visitados e pilha_rec com false
      for (let i = 0; i < V; i++) {
        visitados[i] = false;
        pilha_rec[i] = false;
      }

      // faz uma DFS
      while (true) {
        var achou_vizinho = false;
        var vizinho_achado;

        if (!visitados[v]) {
          pilha.push(v);
          visitados[v] = true;
          pilha_rec[v] = true;
        }

        for (let i = 0; i < adj[v].length; i++) {
          if (pilha_rec[adj[v][i]]) {
            return true;
          } else if (!visitados[adj[v][i]]) {
            // se não está na pilha e não foi visitado, indica que achou
            achou_vizinho = true;
            vizinho_achado = adj[v][i];
            break;
          }
        }

        if (!achou_vizinho) {
          pilha_rec[pilha[pilha.length - 1]] = false; // marca que saiu da pilha
          pilha.pop(); // remove da pilha
          if (!pilha.length) break;
          v = pilha[pilha.length - 1];
        } else v = vizinho_achado;
      }

      return false;
    }

    function temCiclo() {
      for (let i = 0; i < V; i++) {
        if (dfs(i)) return true;
      }
      return false;
    }
  }
  //função que verifica se um grafo eh conexo
  verificaConexo(grafo) {

    class Graph {
      // Constructor
      constructor(v) {
        this.V = v;
        this.adj = new Array(v);
        for (let i = 0; i < v; ++i) {
          this.adj[i] = [];
        }
      }

      // Função para adicionar uma aresta ao grafo
      adicionaAresta(v, w) {
        this.adj[v].push(w); // Adicione w à lista de v.
        this.adj[w].push(v); //O gráfico é não direcionado
      }

      // Uma função usada pelo DFS
      DFSUtil(v, visitado) {
        // Marcar o nó atual como visitado
        visitado[v] = true;

        // Recuperar para todos os vértices adjacentes a este vértice
        for (let i of this.adj[v]) {
          let n = i;
          if (!visitado[n]) {
            this.DFSUtil(n, visitado);
          }
        }
      }

      // Método para verificar se todos os vértices de grau diferente de zero estão conectados.
      
      isConnected() {
        // Marque todos os vértices como não visitados
        let visitado = new Array(this.V);
        let i;
        for (i = 0; i < this.V; i++) {
          visitado[i] = false;
        }

        // Encontrar um vértice com grau zero
        for (i = 0; i < this.V; i++) {
          if (this.adj[i].length === 0) {
            return false;
          }
        }

        // Encontre um vértice com grau diferente de zero
        for (i = 0; i < this.V; i++) {
          if (this.adj[i].length != 0) {
            break;
          }
        }

        //Se não houver arestas no gráfico, retorne verdadeiro
        if (i == this.V) {
          return true;
        }


        // Inicie a pesquisa DFS a partir de um vértice com grau diferente de zero
        this.DFSUtil(i, visitado);

        // Verifique se todos os vértices de grau diferente de zero foram visitados
        for (i = 0; i < this.V; i++) {
          if (visitado[i] == false && this.adj[i].length > 0) {
            return false;
          }
          if (visitado[i] == false && this.adj[i].length == 0) {
            return false;
          }
        }
        console.log(visitado);

        return true;
      }

    }
    var listaVertices = grafo.nodes;
    var listaArestas = grafo.edges;

    var grafo = new Graph(listaVertices.length);
    listaArestas.forEach(aresta => {
      grafo.adicionaAresta(aresta.from - 1, aresta.to - 1);
    });
    return grafo.isConnected();

  }
}
