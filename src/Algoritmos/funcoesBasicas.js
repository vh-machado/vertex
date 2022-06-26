import { FilaPilha } from "./lixo/estruturas_auxiliares/filaPilha"

export class algoritmosGrafos {
    arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    procuraAresta(origem, destino, grafo) {
        var resposta
        function teste(item, index) {
            if (item.from == origem && item.to == destino) {
                resposta = 'ID:' + index + ":" + item.from + '-' + item.to
                return resposta
            } else {
                resposta = null
                return resposta
            }
        }
        grafo.edges.forEach(teste)
    }

    calcularGrau(grafo, vertice, tipoGrafo) {
        var contador = 0;
        if (tipoGrafo == 'digrafo') {
            for (var i = 0; i < grafo.edges.length; i++) {
                if (grafo.edges[i].from === vertice || grafo.edges[i].to === vertice) {
                    contador++;
                }
            }
            return contador
        } else {
            for (var i = 0; i < grafo.edges.length; i++) {
                if (grafo.edges[i].to === vertice) {
                    contador++;
                }
            }
            return contador
        }
    }

    recuperarAdjacencias(grafo, verticeEscolhido) {
        var resposta = []
        function teste(item) {
            if (item.from == verticeEscolhido) {
                resposta.push(item.to)
            }
        }
        grafo.edges.forEach(teste)
        return resposta
    }

    recuperarArestas(grafo, verticeEscolhido) {
        var resposta = []
        function teste(item) {
            if (item.from == verticeEscolhido) {
                resposta.push(item)
            }
        }
        grafo.edges.forEach(teste)
        return resposta
    }


    buscaEmLargura(grafo, origem) {
        const fila = new FilaPilha()
        const enfileirados = []
        const visitados = []

        fila.enfileirar(origem)
        enfileirados.push(origem)

        while (true) {
            const vertice = fila.desenfileirar()
            if (vertice != null) {
                visitados.push(vertice)    
                const arestas = this.recuperarArestas(grafo, vertice)
                for (var i = 0; i < arestas.length; i++) {
                    if (!visitados.includes(arestas[i].to)) {
                        fila.enfileirar(arestas[i].to)
                        enfileirados.push(arestas[i].to)
                    }
                }
            }else{
                break
            }
        }
        return visitados
    }

    eDesconexo(grafo) {
        if (grafo.nodes.length > 0) {
            const primeiroVertice = grafo.nodes[0]

            const visitados = this.buscaEmLargura(grafo, primeiroVertice)
            for(var i = 0; i < grafo.nodes; i++){
                if(!visitados.includes(grafo.nodes[i].id)){
                    
                }
            }
        }
        return false
    }

    possuiCiclo(grafo, origem){
        const empilhados = []
        return this.possuiCiclo(grafo, origem, empilhados)
    }

    possuiCiclo(grafo, origem, empilhados){
        empilhados.push(origem)
        const arestas = this.recuperarArestas(grafo, origem)
        for (var i = 0; i < arestas.length; i++) {
            if(arestas[i].to in empilhados && 
                this.possuiCiclo(grafo, arestas[i].to, empilhados)){
                    return true
            }else if (arestas[i].to in empilhados){
                return true
            }
        }
        this.arrayRemove(empilhados, origem)
        return false
    }
}