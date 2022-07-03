import { criaListaAdjacencia } from './criaListaAdjacencia'
import { largura } from '../Algoritmos/largura';
var ciclo = false


export class algoritmosGrafos {

    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele !== value;
        });
    }

    procuraAresta(origem, destino, grafo, orientado) {
        var resposta = "Não existe a aresta"
        grafo.edges.forEach(teste)
        function teste(item) {
            if (item.from === origem && item.to === destino) {
                resposta = "Existe a aresta"
            } else if (!orientado && item.to === origem && item.from === destino) {
                resposta = "Existe a aresta"
            }
        }
        return resposta
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
            return contador
        } else if (tipoGrafo === 'nao_orientado') {
            for (var j = 0; j < grafo.edges.length; j++) {
                if (grafo.edges[j].from === vertice || grafo.edges[j].to === vertice) {
                    contador++;
                }
            }

            return contador
        }
    }


    recuperarAdjacencias(grafo, verticeEscolhido, tipoGrafo) {
        const verticesAdjacentes = []
        const arestas = grafo.edges
        const vertices = grafo.nodes
        if (tipoGrafo === 'nao_orientado') {
            arestas.forEach(aresta => {
                vertices.forEach(vertice => {
                    if (aresta.from === verticeEscolhido && aresta.to === vertice.id) {
                        verticesAdjacentes.push(vertice.label)
                    }
                    if (aresta.to === verticeEscolhido && aresta.from === vertice.id && !verticesAdjacentes.includes(vertice.label)) {
                        verticesAdjacentes.push(vertice.label)
                    }
                })
            })
            return verticesAdjacentes
        }
        if (tipoGrafo === 'orientado') {
            arestas.forEach(aresta => {
                vertices.forEach(vertice => {
                    if (aresta.from === verticeEscolhido && aresta.to === vertice.id) {
                        verticesAdjacentes.push(vertice.label)
                    }
                })
            })
            return verticesAdjacentes
        }
    }



    recuperarArestas(grafo, verticeEscolhido) {
        var resposta = []
        function teste(item) {
            if (item.from === verticeEscolhido) {
                resposta.push(item)
            }
        }
        grafo.edges.forEach(teste)
        return resposta
    }


    eCiclo(listaAdjacencia, origem, destino, visitados = new Set()) {
        visitados.add(origem)
        const atual = listaAdjacencia[origem]
        atual.find(vertice => {
            console.log(visitados, vertice)
            if (visitados.has(vertice)) {
                ciclo = true
            }
            !visitados.has(vertice) && !visitados.has(destino) && this.eCiclo(listaAdjacencia, vertice, destino, visitados)
        })
        return ciclo
    }

    buscaEmProfundidade(listaAdjacencia, origem, destino, visitados = new Set()) {
        visitados.add(origem)
        const atual = listaAdjacencia[origem]
        atual.find(vertice => {
            console.log(visitados, vertice)
            if (visitados.has(vertice)) {
                console.log('entrou')
            }
            !visitados.has(vertice) && !visitados.has(destino) && this.buscaEmProfundidade(listaAdjacencia, vertice, destino, visitados)
        })

        return {
            verticesExpandidos: Array.from(visitados),
            caminho: visitados.has(destino)
        }
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
        var listaArestasLabel = []
        for (var i = 0; i < listaVertices.length; i++) {
            for (var j = 0; j < listaArestas.length; j++) {
                if (listaVertices[i].id === listaArestas[j].from) {
                    listaArestas[j].from = listaVertices[i].label
                } else if (listaVertices[i].id === listaArestas[j].to) {
                    listaArestas[j].to = listaVertices[i].label
                }
            }
        }
        listaArestasLabel = listaArestas
        return listaArestasLabel
    }

    criarMapGrafos(nodes, edges) {
        const adjacencyList = new Map()
        nodes.forEach(vertice => adjacencyList.set(vertice.label, []));
        edges.forEach(aresta =>
            adjacencyList.get(aresta.from).push(aresta.to));
        return adjacencyList
    }


    bfs(grafo, origin, destination) {
        //console.log(origin+' para '+ destination)
        const adjacencyList = this.criarMapGrafos(grafo.nodes, this.converteIdLabel(grafo.nodes, grafo.edges))
        // console.log(adjacencyList)
        const visited = new Set()
        const menorCaminho = new Set()

        visited.add(origin)

        const queue = [origin]

        let isPath = ''

        while (queue.length > 0 && visited.size !== adjacencyList.size) {


            const node = queue.shift()

            const current = adjacencyList.get(node)
            if (!visited.has(destination)) {
                menorCaminho.add(node)
            }
            if (current.includes(destination)) {
                menorCaminho.add(current[current.indexOf(destination)])
            }

            if (!current)
                break

            isPath = current.find(node => {
                visited.add(node)
                queue.push(node)

                return node === destination
            })
            


            if (isPath)
                break


        }



        return {
            expandedNodes: Array.from(visited),
            menorCaminho: Array.from(menorCaminho),
            isPath
        }

    }

    possuiCiclo(grafo, origem, destino) {
        /*console.log(grafo)
        console.log(origem)
        console.log(destino)
        console.log(grafo.nodes)
        console.log(grafo.edges)*/
        const listaAdjacencias = criaListaAdjacencia(grafo.nodes, grafo.edges, false)
        console.log('listaAdj=',listaAdjacencias);
        //console.log(listaAdjacencias)
        const resultado = this.eCiclo(listaAdjacencias, origem, destino)
        return resultado
    }

    possuiCicloOrientado(listaVertices, listaArestas) {
    
        let V = listaVertices.length 
        let adj = new Array(V);
         for (let i = 0; i < V; ++i) {
              adj[i] = [];
            }
            
          for(let i = 0; i<listaArestas.length; i++){
              adicionarAresta(listaArestas[i].from-1, listaArestas[i].to-1);
          }
          
          function adicionarAresta(v1, v2){
              adj[v1].push(v2);
          }
      
          
          if(temCiclo())
              return true;
          else
              return false;
          
          
          
          function dfs(v){
              var pilha = [];
              var visitados = new Array(V)
              var pilha_rec = new Array(V);
          
              // inicializa visitados e pilha_rec com false
              for(let i = 0; i < V; i++){
                  visitados[i] = false;
                  pilha_rec[i] = false;
              }
          
              // faz uma DFS
              while(true){
                  var achou_vizinho = false;
                  var vizinho_achado;
                  
                  if(!visitados[v]){
                      pilha.push(v);
                      visitados[v] = true
                      pilha_rec[v] = true;
                  }
                  
                  for(let i = 0; i < adj[v].length; i++){
                      if(pilha_rec[adj[v][i]]){
                          return true;
                      }else if(!visitados[adj[v][i]]){
                          // se não está na pilha e não foi visitado, indica que achou
                          achou_vizinho = true;
                          vizinho_achado = adj[v][i];
                          break;
                      }
                  }
          
                  if(!achou_vizinho){
                      pilha_rec[pilha[pilha.length - 1]] = false; // marca que saiu da pilha
                      pilha.pop(); // remove da pilha
                      if(!pilha.length)
                          break;
                      v = pilha[pilha.length - 1]
                  }
                  else
                      v = vizinho_achado
              }
          
              return false;
          }
          
          function temCiclo(){
              for(let i = 0; i < V; i++){
                  if(dfs(i))
                      return true;
              }
              return false;
          }
        }

    verificaConexo(grafo, n, orientacao) {
        console.log(grafo, n, orientacao)
        if (orientacao) {
            var vertices = n;
            var adjacencyList = [];
            for (let i = 0; i < vertices; i++) {
                adjacencyList[i] = [];
            }
            // Function for adding edges
            function addEdgeOrientado(source, dest) {
                adjacencyList[source].unshift(dest);
            }


            for (let i = 0; i < grafo.edges.length; i++) {
                addEdgeOrientado(grafo.edges[i].from - 1, grafo.edges[i].to - 1)
            }
            
            console.log('lista de adj=',adjacencyList)
            for(let i = 0; i < adjacencyList.length; i++){
                var presente = false;
                for(let j = 0; j < adjacencyList.length; j++){
                    for(let k = 0; k < adjacencyList[j].length; k++){
                        if(adjacencyList[j][k] === i && j !== i){
                            presente = true;
                            break;
                        }
                    }
                    if(presente){
                        break;
                    }
                }
                if(!adjacencyList[i].length && !presente){
                    console.log('Vértice desconexo detectado')
                    return false
                }
            }
            return true;
        } else if (!orientacao) {
            var vertices = n;
            var adjacencyList = [];
            for (let i = 0; i < vertices; i++) {
                adjacencyList[i] = [];
            }
            
            // Function for adding edges
            function addEdgeNaoOrientado(source, dest) {
                adjacencyList[source].unshift(dest);
                adjacencyList[dest].unshift(source);
            }


            for (let i = 0; i < grafo.edges.length; i++) {
                addEdgeNaoOrientado(grafo.edges[i].from - 1, grafo.edges[i].to - 1)
            }
            
            console.log('lista de adj=',adjacencyList)
            for(let i = 0; i < adjacencyList.length; i++){
                if(!adjacencyList[i].length){
                    console.log('Vértice desconexo detectado')
                    return false
                }
            }
            
            return true;
        }
    }



}