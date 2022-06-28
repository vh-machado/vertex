import { criaListaAdjacencia } from './criaListaAdjacencia'

var ciclo = false

export class algoritmosGrafos {
    

    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele !== value;
        });
    }

    procuraAresta(origem, destino, grafo) {
        var resposta = "Não existe a aresta"
        grafo.edges.forEach(teste)
        function teste(item) {
            if (item.from === origem && item.to === destino) {
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


    
    eCiclo(grafo, origem, empilhados) {
        empilhados.push(origem)
        const arestas = this.recuperarArestas(grafo, origem)
        for (var i = 0; i < arestas.length; i++) {
            console.log('teste ciclo orientado'+ arestas[i], empilhados, this.eCicloOrientado(grafo, arestas[i].to, empilhados))
            if (arestas[i].to in empilhados && this.eCiclo(grafo, arestas[i].to, empilhados)) {
                return true
            } else if (arestas[i].to in empilhados) {
                return true
            }
        }
        this.arrayRemove(empilhados, origem)
        return false
    }



    /*eCicloNaoOrientado(listaAdjacencia, origem, destino, visitados = new Set()) {
        visitados.add(origem)
        const atual = listaAdjacencia[origem]
        atual.find(vertice => {
            if (visitados.has(vertice)) {
                ciclo = true
            }
            !visitados.has(vertice) && !visitados.has(destino) && this.eCicloNaoOrientado(listaAdjacencia, vertice, destino, visitados)
        })
        return ciclo
    }*/

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
            verticesExpandidos: Array.from(visitados), caminho
        }
    }


    eConexo(grafo) {
        if (grafo.nodes.length > 0) {
            const primeiroVertice = grafo.nodes[0].id
            const ultimoVertice = grafo.nodes[grafo.nodes.length - 1].id
            const visitados = this.buscaEmLargura(grafo, primeiroVertice, ultimoVertice).verticesExpandidos
            for (var i = 0; i < grafo.nodes.length; i++) {
                if (!visitados.includes(grafo.nodes[i].id)) {
                    return 'Não'
                }
            }
        }
        return 'Sim'
    }

    possuiCiclo(grafo, origem, destino) {
        const listaAdjacencias = criaListaAdjacencia(grafo.nodes, grafo.edges)
        const resultado = this.eCiclo(listaAdjacencias, origem, destino)
        return resultado
    }

}