import formataVertices from './formataVertices';
import geraListaAdjacencia from './geraListaAdjacencia';

function encontraLabel(nodes, verticeId) {
  let verticeBuscado = nodes.find(v => v.id === Number(verticeId));

  return verticeBuscado?.label;
}

class Fila {
  constructor() {
    this.elements = new Array();
  }
  enfileirar(e) {
    this.elements.push(e);
  }
  desenfileirar() {
    return this.elements.shift();
  }
  seVazio() {
    return this.elements.length === 0;
  }
}

class BuscaEmLargura {
  constructor() {
    this.d = {};
    this.antecessor = {};
    this.listaAdjacencia = {};
    this.solucao = [];
  }

  construirCaminho(nodes, origem, destino) {
    let caminhoReverso = [];
    caminhoReverso.push(Number(destino));

    let u = this.antecessor[destino];

    while (u !== Number(origem) && u !== -1) {
      caminhoReverso.push(u);
      u = this.antecessor[u];
    }

    if (u === Number(origem)) {
      caminhoReverso.push(Number(origem));
      let caminho = formataVertices(nodes, caminhoReverso.reverse()).join(
        ' - '
      );

      return caminho;
    }

    return 'Não existe caminho';
  }

  BuscaEmLargura(listaAdjacencia) {
    this.listaAdjacencia = listaAdjacencia;
    this.d = {};
    this.antecessor = {};
  }

  realizarBuscaEmlargura(origem) {
    let vertices = Object.keys(this.listaAdjacencia);
    let cor = {};
    vertices.forEach(u => {
      cor[u] = 'branco';
      this.d[u] = Infinity;
      this.antecessor[u] = -1;
    });

    this.visitaBfs(origem, cor);
    vertices.forEach(u => {
      if (cor[u] === 'branco') {
        this.visitaBfs(u, cor);
      }
    });

    //console.log('antecessor', this.antecessor);
    //console.log('d', this.d);
    //console.log('solucao', this.solucao);
  }

  visitaBfs(u, cor) {
    //console.log('u inicio', u);
    cor[u] = 'cinza';
    this.d[u] = 0;
    //let index = 0 // ?
    let fila = new Fila();
    fila.enfileirar(u);

    while (!fila.seVazio()) {
      u = Number(fila.desenfileirar());
      this.solucao.push(u);

      console.log(u);
      if (this.listaAdjacencia[u].length > 0) {
        this.listaAdjacencia[u].forEach(a => {
          let v = a.idVertice;
          if (cor[v] === 'branco') {
            cor[v] = 'cinza';
            this.d[v] = this.d[u] + 1;
            this.antecessor[v] = u;
            fila.enfileirar(v);
          }
        });
      }
      cor[u] = 'preto';
    }
  }
}

export default function aplicaBuscaLargura(grafo, origem, destino, orientado) {
  let { graph } = grafo;
  let listaAdjacencia = geraListaAdjacencia(graph, orientado);

  let bfs = new BuscaEmLargura();
  bfs.BuscaEmLargura(listaAdjacencia);
  bfs.realizarBuscaEmlargura(origem);

  let { nodes } = graph;
  let caminho = bfs.construirCaminho(nodes, origem, destino);

  let { d } = bfs;
  let descobertas = [];
  Object.keys(d).forEach(vertice => {
    descobertas.push(`${encontraLabel(nodes, vertice)} ( ${d[vertice]} )`);
  });
  
  console.log('Busca em largura: ')
  console.log('antecessor', bfs.antecessor);
  console.log('Descobertas largura:', descobertas)
  console.log('Caminho mais curto: ', caminho);
  return { caminho, descobertas };
}
