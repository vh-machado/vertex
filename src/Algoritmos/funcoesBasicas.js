import { FilaPilha } from "./filaPilha"

export class algoritmosGrafos {
    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele !== value;
        });
    }

    procuraAresta(origem, destino, grafo) {
        var resposta = "Não existe a aresta"
        /*console.log("teste aresta origem", origem)
        console.log("teste aresta destino", destino)*/
        grafo.edges.forEach(teste)
        function teste(item) {
            if (item.from === origem && item.to === destino) {
                //console.log(item.from, item.to)
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


    recuperarAdjacencias(grafo, verticeEscolhido, tipoGrafo){
        const verticesAdjacentes = []
        const arestas = grafo.edges
        const vertices = grafo.nodes 
        if(tipoGrafo === 'nao_orientado'){
            arestas.forEach(aresta =>{
                vertices.forEach(vertice =>{
                    if(aresta.from === verticeEscolhido && aresta.to === vertice.id){
                        verticesAdjacentes.push(vertice.label)
                    }
                    if(aresta.to === verticeEscolhido && aresta.from === vertice.id && !verticesAdjacentes.includes(vertice.label)){
                        verticesAdjacentes.push(vertice.label)
                    }
                })
            })
            return verticesAdjacentes
        }
        if(tipoGrafo === 'orientado'){
            arestas.forEach(aresta =>{
                vertices.forEach(vertice =>{
                    if(aresta.from === verticeEscolhido && aresta.to === vertice.id){
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


    /*buscaEmLargura(grafo, origem) {
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

    TesteCiclo(grafo, origem, empilhados){
        empilhados.push(origem)
        const arestas = this.recuperarArestas(grafo, origem)
        for (var i = 0; i < arestas.length; i++) {
            if(arestas[i].to in empilhados && 
                this.TesteCiclo(grafo, arestas[i].to, empilhados)){
                    return true
            }else if (arestas[i].to in empilhados){
                return true
            }
        }
        this.arrayRemove(empilhados, origem)
        return false
    }

    possuiCiclo(grafo, origem){
        const empilhados = []
        return this.TesteCiclo(grafo, origem, empilhados)
    }*/


}