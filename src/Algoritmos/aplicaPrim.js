import geraListaAdjacencia from './geraListaAdjacencia';
import formataVertices from './formataVertices';

class Vertice {
  constructor(idVertice, peso) {
    this.idVertice = idVertice;
    this.peso = peso;
  }
}

class HeapMin {
  constructor() {
    this.vertices = [];
  }
  inserir(idVertice, peso) {
    let novoVertice = new Vertice(idVertice, peso);
    this.vertices.push(novoVertice);
    let indice = this.vertices.length - 1;
    const atual = this.vertices[indice];

    while (indice > 0) {
      let paiIndice = Math.floor((indice - 1) / 2);
      let pai = this.vertices[paiIndice];

      if (pai.peso >= atual.peso) {
        this.vertices[paiIndice] = atual;
        this.vertices[indice] = pai;
        indice = paiIndice;
      } else break;
    }
  }
  extrairMin() {
    if (this.vertices.length === 1) {
      return this.vertices.pop();
    }

    const menor = this.vertices[0];
    const ultimo = this.vertices.pop();
    this.vertices[0] = ultimo;

    let indice = 0;
    const tamanho = this.vertices.length;
    let atual = this.vertices[0];

    while (true) {
      let filhoEsquerdaIndice = 2 * indice + 1;
      let filhoDireitaIndice = 2 * indice + 2;
      let filhoEsquerda, filhoDireita;
      let troca = null;

      if (filhoEsquerdaIndice < tamanho) {
        filhoEsquerda = this.vertices[filhoEsquerdaIndice];

        if (filhoEsquerda.peso < atual.peso) {
          troca = filhoEsquerdaIndice;
        }
      }
      if (filhoDireitaIndice < tamanho) {
        filhoDireita = this.vertices[filhoDireitaIndice];

        if (
          (troca === null && filhoDireita.peso < atual.peso) ||
          (troca !== null && filhoDireita.peso < filhoEsquerda.peso)
        ) {
          troca = filhoDireitaIndice;
        }
      }

      if (troca === null) {
        break;
      }
      this.vertices[indice] = this.vertices[troca];
      this.vertices[troca] = atual;
      indice = troca;
    }
    return menor;
  }
}

function prim(listaAdjacencia, origem) {
  let vertices = Object.keys(listaAdjacencia);

  let antecessores = {};
  let solucao = [];
  let pesos = {};
  vertices.forEach(v => {
    pesos[v] = Infinity;
    antecessores[v] = -1;
  });

  pesos[origem] = 0;
  let filaPrioridade = new HeapMin();
  vertices.forEach(v => {
    filaPrioridade.inserir(Number(v), pesos[v]);
  });

  while (filaPrioridade.vertices.length > 0) {
    let u = filaPrioridade.extrairMin();
    solucao.push(u.idVertice);

    listaAdjacencia[u.idVertice].forEach(v => {
      if (!solucao.includes(v.idVertice) && pesos[v.idVertice] > v.pesoAresta) {
        pesos[v.idVertice] = v.pesoAresta;
        antecessores[v.idVertice] = u.idVertice;

        filaPrioridade.vertices = filaPrioridade.vertices.filter(
          vertice => vertice.idVertice !== v.idVertice
        );
        filaPrioridade.inserir(v.idVertice, pesos[v.idVertice]);
      }
    });
  }
  return { solucao, antecessores, pesos };
}

export default function aplicaPrim(grafo, origem, orientado) {
  let { counter, graph } = grafo;
  let listaAdjacencia = geraListaAdjacencia(graph, orientado);

  console.log(prim(listaAdjacencia, origem));
  let { solucao, antecessores, pesos } = prim(listaAdjacencia, origem);

  // Nova lista de adjacências após Prim
  let novaListaAdjacencia = {};
  let vertices = Object.keys(listaAdjacencia);
  vertices.forEach(vertice => {
    if (orientado) {
      novaListaAdjacencia[vertice] = listaAdjacencia[vertice].filter(
        adjacente => antecessores[adjacente.idVertice] == vertice
      );
    } else {
      novaListaAdjacencia[vertice] = listaAdjacencia[vertice].filter(
        adjacente =>
          antecessores[adjacente.idVertice] == vertice ||
          antecessores[vertice] == adjacente.idVertice
      );
    }
  });

  let { nodes, edges } = graph;
  let arestasPrim = [];

  vertices.forEach(vertice => {
    novaListaAdjacencia[vertice].forEach(v => {
      let busca = edges.find(
        aresta => aresta.from == vertice && aresta.to == v.idVertice
      );
      if (busca) {
        arestasPrim.push(busca);
      }
    });
  });

  let grafoPrim = {
    counter,
    graph: {
      nodes,
      edges: [...arestasPrim],
    },
  };

  let somaArvore = 0;
  nodes.forEach(vertice => {
    somaArvore += pesos[vertice.id];
  });

  let solucaoFormatada = `S = { ${formataVertices(nodes, solucao).join(
    ', '
  )} }\n`;
  let somaArvoreFormatada = `Total = ${somaArvore}`;

  return {
    grafoPrim,
    solucao:
      somaArvore === Infinity
        ? ['Não há caminho para todos os vértices']
        : [solucaoFormatada, somaArvoreFormatada],
    pesos,
  };
}
