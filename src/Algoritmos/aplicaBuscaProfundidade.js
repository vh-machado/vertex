import formataVertices from './formataVertices';
import geraListaAdjacencia from './geraListaAdjacencia';

function encontraLabel(nodes, verticeId) {
  let verticeBuscado = nodes.find(v => v.id === Number(verticeId));

  return verticeBuscado?.label;
}

function GrafoT(lista) {
  let listaT = {};
  Object.keys(lista).forEach(vertice => {
    listaT[vertice] = [];
  });
  Object.keys(lista).forEach(vertice => {
    let adjacencias = lista[vertice];
    adjacencias.forEach(aresta => {
      listaT[aresta.idVertice].push({
        idVertice: vertice,
        pesoAresta: aresta.pesoAresta,
      });
    });
  });
  return listaT;
}

class TempoTermino {
  constructor() {
    this.t = {};
    this.restantes = {};
    this.numRestantes = 0;
  }
  TempoTermino(numVertices) {
    this.t = {};
    this.restantes = {};
    this.numRestantes = numVertices;
  }

  maxTT() {
    let vMax = 1;
    while (!this.restantes[vMax]) {
      vMax++;
    }
    for (let i = 0; i < this.numRestantes; i++) {
      if (this.restantes[i]) {
        if (this.t[i] > this.t[vMax]) {
          vMax = i;
        }
      }
      return vMax;
    }
  }
}

class Cfc {
  constructor(nodes) {
    this.nodes = nodes;
    this.numRestantes = 0;
    this.t = {};
    this.restantes = {};
    this.listaAdjacencia = {};
    this.resultado = '';
  }

  obterCfc(listaAdjacencia) {
    this.resultado = '';
    this.listaAdjacencia = listaAdjacencia;
    const dfs = new BuscaEmProfundidade();
    dfs.BuscaEmProfundidade(this.listaAdjacencia);
    dfs.realizaBuscaEmProfundidade();
    let n = Object.keys(this.listaAdjacencia).length;
    let tt = new TempoTermino();
    tt.TempoTermino(n);
    for (let u = 1; u <= n; u++) {
      tt.t[u] = dfs.t[u];
      tt.restantes[u] = true;
    }
    let listaT = GrafoT(this.listaAdjacencia);
    while (tt.numRestantes > 0) {
      let vRaiz = tt.maxTT();
      this.resultado = `${this.resultado}|`;
      this.visitaDfs(listaT, vRaiz, tt);
    }
    this.resultado = `${this.resultado}|`;
    return this.resultado;
  }

  visitaDfs(listaT, u, tt) {
    tt.restantes[u] = false;
    tt.numRestantes--;
    let index = 0;
    this.resultado = `${this.resultado} ${encontraLabel(this.nodes, u)} `;
    if (listaT[u].length > 0) {
      let a = u;
      while (a != undefined) {
        let v = listaT[u][index].idVertice;
        if (tt.restantes[v]) {
          this.visitaDfs(listaT, v, tt);
        }
        index = index + 1;
        try {
          a = listaT[u][index].idVertice;
        } catch {
          a = undefined;
        }
      }
    }
    return 'fim';
  }
}

class BuscaEmProfundidade {
  constructor() {
    this.branco = 'branco';
    this.cinza = 'cinza';
    this.preto = 'preto';
    this.d = {};
    this.t = {};
    this.antecessor = {};
    this.listaAdjacencia = {};
    this.n = Object.keys(this.listaAdjacencia).length;
    this.ciclo = false;
    this.orientado = false;
    this.ordTopologica = new Array();
    this.resultados = {};
  }

  imprimeDados() {
    console.log('descoberta:', this.d);
    console.log('término:', this.t);
    console.log('antecessor:', this.antecessor);
    console.log('Grafo:', this.listaAdjacencia);
  }

  ordenaTopologica(u) {
    if (!this.ciclo && this.orientado) {
      this.ordTopologica.unshift(u);
    } else if (this.ciclo && !this.orientado) {
      this.ordTopologica = 'Grafo não orientado e com ciclo';
    } else if (!this.orientado) {
      this.ordTopologica = 'Grafo não orientado';
    } else {
      this.ordTopologica = 'Grafo com ciclo';
    }
  }

  BuscaEmProfundidade(listaAdjacencia, origem, orientado) {
    this.listaAdjacencia = listaAdjacencia;
    this.d = {};
    this.c = {};
    this.antecessor = {};
    this.t = {};
    this.orientado = orientado;
    this.origem = origem;
    this.n = Object.keys(this.listaAdjacencia).length;
  }

  realizaBuscaEmProfundidade() {
    let tempo = 1;
    let cor = {};
    for (let i = 0; i < this.n; i++) {
      let u = Object.keys(this.listaAdjacencia)[i];
      cor[u] = this.branco;
      this.antecessor[u] = -1;
    }
    for (let i = 0; i < this.n; i++) {
      let u = Object.keys(this.listaAdjacencia)[i];
      if (cor[this.origem] == this.branco) {
        tempo = this.visitaDfs(Number(this.origem), tempo, cor)
      }
      if (cor[u] == this.branco) {
        tempo = this.visitaDfs(Number(u), tempo, cor);
      }
    }
    this.resultados['descoberta'] = this.d;
    this.resultados['termino'] = this.t;
    this.resultados['antecessor'] = this.antecessor;
    this.resultados['ciclo'] = this.ciclo;
    this.resultados['classificacao'] = this.listaAdjacencia;
    this.resultados['ordenacaoTopologica'] = this.ordTopologica;
  }

  visitaDfs(u, tempo, cor) {
    cor[u] = this.cinza;
    this.d[u] = tempo++;
    let index = 0;
    if (this.listaAdjacencia[u].length > 0) {
      let a = u;
      while (a != undefined) {
        let v = this.listaAdjacencia[u][index].idVertice;
        this.classificaAresta(u, v, cor, this.orientado);
        if (cor[v] == this.branco) {
          this.antecessor[v] = u;
          tempo = this.visitaDfs(v, tempo, cor);
        }
        index = index + 1;
        try {
          a = this.listaAdjacencia[u][index].idVertice;
        } catch {
          a = undefined;
        }
      }
    }
    cor[u] = this.preto;
    this.t[u] = tempo++;
    this.ordenaTopologica(u);
    return tempo;
  }

  classificaAresta(u, v, cor, orientado) {
    this.listaAdjacencia[u].forEach(aresta => {
      if (aresta.idVertice === v && !aresta.classificacao) {
        if (cor[v] === this.branco) {
          aresta['classificacao'] = 'árvore';
          if (!orientado) {
            let busca = this.listaAdjacencia[v].find(a => a.idVertice === u);
            busca['classificacao'] = 'árvore';
          }
        } else if (cor[v] === this.cinza) {
          aresta['classificacao'] = 'retorno';
          if (!orientado) {
            let busca = this.listaAdjacencia[v].find(a => a.idVertice === u);
            busca['classificacao'] = 'retorno';
          }
          this.ciclo = true;
        } else if (cor[v] === this.preto) {
          if (this.d[u] < this.d[v]) {
            aresta['classificacao'] = 'avanço';
            if (!orientado) {
              let busca = this.listaAdjacencia[v].find(a => a.idVertice === u);
              busca['classificacao'] = 'avanço';
            }
          } else if (this.d[u] > this.d[v]) {
            aresta['classificacao'] = 'cruzamento';
            if (!orientado) {
              let busca = this.listaAdjacencia[v].find(a => a.idVertice === u);
              busca['classificacao'] = 'cruzamento';
            }
          }
        }
      }
    });
  }
}

export default function aplicaBuscaProfundidade(
  grafo,
  origem,
  orientado = true
) {
  let { counter, graph } = grafo;
  let { nodes, edges } = graph;
  let listaAdjacencia = geraListaAdjacencia(graph, orientado);

  let dfs = new BuscaEmProfundidade();
  let cfc = new Cfc(nodes);

  dfs.BuscaEmProfundidade(listaAdjacencia, origem, orientado);
  dfs.realizaBuscaEmProfundidade();
  cfc.obterCfc(listaAdjacencia);

  console.log('Busca em profundidade resultados:\n', dfs.resultados);
  console.log('Componentes Fortemente Conexos:', cfc.resultado);

  let {
    antecessor,
    ciclo,
    classificacao,
    descoberta,
    ordenacaoTopologica,
    termino,
  } = dfs.resultados;

  let classificacaoArestas = [];

  edges.forEach(aresta => {
    let busca = classificacao[aresta.from].find(a => aresta.to === a.idVertice);

    classificacaoArestas.push({
      id: aresta.id,
      from: aresta.from,
      to: Number(busca.idVertice),
      label: busca.classificacao,
    });
  });

  let grafoClassificacaoArestas = {
    counter,
    graph: {
      nodes,
      edges: [...classificacaoArestas],
    },
  };

  let descobertasTerminos = [];
  nodes.forEach(vertice => {
    descobertasTerminos.push(`${vertice.label} ( ${descoberta[vertice.id]} / ${termino[vertice.id]} )`)
  })

  let ordenacaoTopologicaFormatado = ordenacaoTopologica;
  if (!ciclo && orientado) {
    ordenacaoTopologicaFormatado = formataVertices(
      nodes,
      ordenacaoTopologica
    ).join(' - ');
  }

  return {
    antecessor,
    ciclo,
    descobertasTerminos,
    ordenacaoTopologicaFormatado,
    grafoClassificacaoArestas,
    cfc: cfc.resultado,
  };
}
