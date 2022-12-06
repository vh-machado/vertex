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
  // converte o indice do Label
  converteIdLabel(listaVertices, listaArestas) {
    var listaArestasLabel = []; // vetor iniciado com vazio
    for (var i = 0; i < listaVertices.length; i++) { //percorre a lista de vertice
      for (var j = 0; j < listaArestas.length; j++) { // percorre a lista de arestas
        //verifica os vertices que tem o id procurado e substitui
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
  //busca em largura
  bfs(grafo, origem, destino) {
    //console.log(origin+' para '+ destination)
    const listaAdjacencia = this.criarMapGrafos(
      grafo.nodes,
      this.converteIdLabel(grafo.nodes, grafo.edges)
    );
    // console.log(adjacencyList)
    const visitado = new Set();
    const menorCaminho = new Set();

    visitado.add(origem);
    // Cria-se uma fila para BFS  
    const fila = [origem];

    let caminho = '';
    //Enquanto não terminar a fila e os vertices adjacentes naõ forem visitados  
    while (fila.length > 0 && visitado.size !== listaAdjacencia.size) {
      const node = fila.shift(); //Retira um vértice da fila e guarda em nodes

      const atual = listaAdjacencia.get(node);
      //verifica se o vertice de destino ainda nao foi
      //visitado
      if (!visitado.has(destino)) {
        menorCaminho.add(node); //se ainda nao foi, entao adiciona-o em menor caminho
      }
      //verifica se o vertice de destino esta incluido em atual 
      if (atual.includes(destino)) {
        menorCaminho.add(atual[atual.indexOf(destino)]); //se sim, adiciona em menor caminho
      }
      //se for diferente de atual, entao o algoritmo para
      if (!atual) break;

      caminho = atual.find(node => {
        visitado.add(node); //adiciona como visitado o vertice que foi retirado
        fila.push(node); //atualiza a fila

        return node === destino;
      });

      if (caminho) break;
    }

    return {
      expandedNodes: Array.from(visitado),
      menorCaminho: Array.from(menorCaminho),
      caminho,
    };
  }

  possuiCiclo(grafo) {
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
    
    // recebe vertice do grafo
    var nodes = grafo.nodes.length;
    var matriz = criaMatrizAdjacenciaNaoOrientado(grafo.nodes, grafo.edges);
    console.log(matriz);
    //função da buscaEmProfundidade  
    function dfs(vertice, visitado, parent) {
      visitado.add(vertice); //marca o vertice como visitado
      for (let v = 0; v < nodes; v++) { //percorre os vertices
        if (matriz[vertice][v]) {
          if (v == parent)
            //se v é o pai, não se mova nessa direção
            continue;
          if (visitado.has(v))
            //verifica se v foi visitado
            return true; // se sim, retorna true
          if (dfs(v, visitado, vertice)) return true;
        }
      }
      return false;
    }

    function hasCycle() {
      var visitado = new Set(); //conjunto visitado
      for (let v = 0; v < nodes; v++) {
        if (visitado.has(v))
          //quando v ja for visitado, pula para a próxima iteração
          continue;
        if (dfs(v, visitado, -1)) {
          //pai eh = -1 se vertice for a origem
          return true;
        }
      }
      return false;
    }

    return hasCycle();
  }
  //verifica se o grafo orientado possui ciclo
  possuiCicloOrientado(listaVertices, listaArestas) {
    let V = listaVertices.length; // recebe a lista de vertices do grafo
    let adj = new Array(V); // vetor de adjacentes
    for (let i = 0; i < V; ++i) { // percorre os vertices
      adj[i] = []; 
    }
    //percorre as arestas
    for (let i = 0; i < listaArestas.length; i++) {
      adicionarAresta(listaArestas[i].from - 1, listaArestas[i].to - 1);
    }
    //adiciona arestas se for adjacente
    function adicionarAresta(v1, v2) {
      adj[v1].push(v2);
    }
    //se possui ciclo retorna verdadeiro
    if (temCiclo()) return true;
    else return false; //senao, falso

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
        // verifica se nao foi visitado
        if (!visitados[v]) {
          pilha.push(v);
          visitados[v] = true;
          pilha_rec[v] = true;
        }
        //percorre os adjacentes
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
        //verifica se nao achou os vertices adjacentes
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
    var listaVertices = grafo.nodes; // recebe os vertices do grafo
    var listaArestas = grafo.edges; //recebe as arestas do grafo

    var grafo = new Graph(listaVertices.length);
    listaArestas.forEach(aresta => { //percorre as arestas
      grafo.adicionaAresta(aresta.from - 1, aresta.to - 1);
    });
    return grafo.isConnected(); // retorna se o grafo eh conectado

  }
}
