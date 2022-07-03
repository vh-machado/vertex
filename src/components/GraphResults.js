import React, { useEffect, useState } from 'react';
import {
  viewCard,
  viewCardSelectionAdj,
  viewCardSelectionAresta,
  viewCardSelectionGrau,
  viewCardSelectionMenorCaminhoNaoOrient,
  viewCardSelectionMenorCaminhoOrient,
} from '../components/CardInfo';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';
import { dijkstra } from '../Algoritmos/dijkstra';
import { criaMatrizAdjacencia } from '../Algoritmos/criaMatrizAdjacencia';
import { planarity_test } from '../Algoritmos/planarFunction';
import { arvoreGeradoraMinima } from '../Algoritmos/arvoreGeradoraMinima';
import { cicloEuleriano } from '../Algoritmos/cicloEuleriano';
import { componentesFortes } from '../Algoritmos/componentesFortes';
import { ordenacaoTopologica } from '../Algoritmos/ordenacaoTopologica';
import { verificaBiconexo } from '../Algoritmos/verificaBiconexo';
import { verificaConexidade } from '../Algoritmos/verificaConexidade';
import { verificaEuleriano } from '../Algoritmos/verificaEuleriano';
import { largura } from '../Algoritmos/largura';

//Grafo de teste
const stateOriginal = {
  counter: 6,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
      { id: 5, label: 'E', x: 0, y: 10 },
      { id: 6, label: 'F', x: 0, y: 10 },
    ],
    edges: [
      { from: 1, to: 2, label: '3' },
      { from: 1, to: 3, label: '5' },
      { from: 3, to: 2, label: '3' },
      { from: 3, to: 4, label: '9' },
      { from: 4, to: 5, label: '4' },
      { from: 5, to: 6, label: '6' },
      { from: 2, to: 6, label: '11' },
    ],
  },
};

const state = JSON.parse(JSON.stringify(stateOriginal));

/*
let state2 = {
  counter: 4,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
    ],
    edges: [
      { from: 1, to: 2, label: '3' },
      { from: 1, to: 3, label: '5' },
      { from: 3, to: 2, label: '3' },
      { from: 3, to: 4, label: '9' },
    ],
  },
};
*/

//Grafo K5 para teste de planaridade
var K5 = {
  nodes: [
    { id: 0, label: 'A', x: 200, y: 0 },
    { id: 1, label: 'B', x: 50, y: 250 },
    { id: 2, label: 'C', x: 300, y: 0 },
    { id: 3, label: 'D', x: 90, y: 100 },
    { id: 4, label: 'E', x: 0, y: 10 },
  ],
  edges: [
    { from: 0, to: 1, label: 3 },
    { from: 0, to: 2, label: 5 },
    { from: 0, to: 3, label: 1 },
    { from: 0, to: 4, label: 3 },
    { from: 1, to: 2, label: 9 },
    { from: 1, to: 3, label: 4 },
    { from: 1, to: 4, label: 6 },
    { from: 2, to: 3, label: 9 },
    { from: 2, to: 4, label: 4 },
    { from: 3, to: 4, label: 6 },
  ],
};

//Retorna os cards com os resultados
function GraphResults(props) {
  const teste = new algoritmosGrafos(); //Cria objeto da classe algoritmosGrafos para realizar os testes e gerar os resultados

  const origem = state.graph.edges[0].from; // Usado no resultado de existe aresta
  const destino = state.graph.edges[3].to; // Usado no resultado de existe aresta
  const vertice = state.graph.nodes[0]; // Usado nos resultados que se escolhe um vértice
  const vertices = state.graph.nodes;
  const arestas = state.graph.edges;
  const grafo = props.state.graph; //variável com o grafo para se pegar mais facilmente os nodes e as edges
  const tamanhoListavertices = state.graph.nodes.length; //tamanho da lista de vértices
  const origemBFS = state.graph.nodes[0].label;
  const destinoBFS = state.graph.nodes[3].label;

  const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  //Implementados
  const copia1 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia2 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia3 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia4 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia9 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  //console.log(grafo)
  //Implementados
  const resultadoConexo = teste.verificaConexo(copia8, props.state.counter, props.orientacao);
  console.log("Resultado conexo:", resultadoConexo)

  resultadoConexidade = verificaConexidade(vertices, arestas);

  var resultadoConexidade = '';
  var resultadoComponentesFortes = '';
  if (resultadoConexo) {
    resultadoConexidade = verificaConexidade(vertices, arestas);
    console.log('Teste conexidade');
    console.log(resultadoConexidade);
    if (resultadoConexidade !== 'Fortemente Conexo') {
      resultadoComponentesFortes = componentesFortes(grafo.nodes, grafo.edges);
    }
  }

  var resultadoCiclico = '';
  if (resultadoConexo && props.orientacao) {
    resultadoCiclico = teste.possuiCicloOrientado(copia9.nodes, copia9.edges)
  }else if(resultadoConexo && !props.orientacao){
    resultadoCiclico = teste.possuiCiclo(copia2, origem, destino);
  }

  var resultadoOrdenacaoTopologica = '';
  if (!resultadoCiclico && resultadoConexo) {
    resultadoOrdenacaoTopologica = ordenacaoTopologica(grafo);
  }

  var resultadoPlanar = '';
  var resultadoBiconexo = '';
  var resultadoEuleriano = '';
  var resultadoCicloEuleriano = '';

  if (resultadoConexo) {
    console.log('teste euleriano');
    console.log(grafo);
    resultadoPlanar = planarity_test(copia4.nodes, copia4.edges);
    resultadoBiconexo = verificaBiconexo(grafo.nodes, grafo.edges);
    resultadoEuleriano = verificaEuleriano(grafo.nodes, grafo.edges);
    if (resultadoEuleriano) {
      resultadoCicloEuleriano = cicloEuleriano(grafo.nodes, grafo.edges);
    }
  }

  const visibility = false;

  var resultadosAGM = '';
  var resultadoCustoAGM = '';
  var resultadoArestasAGM = '';
  if (resultadoConexo) {
    resultadosAGM = arvoreGeradoraMinima(props.state);
    resultadoCustoAGM = resultadosAGM.custo;
    resultadoArestasAGM = resultadosAGM.arestas;
  }

  /*
  if (tipoGrafo === 'orientado') {
    resultadoConexidade = verificaConexidade(vertices, arestas)
  } else {
    resultadoConexidade = 'Não cabe'
  }*/

  console.log('LOGS');
  console.log(resultadoConexo);
  console.log(resultadoPlanar);
  console.log(resultadoBiconexo);
  console.log(resultadoEuleriano);
  console.log(resultadoCicloEuleriano);
  console.log(resultadoCustoAGM);
  console.log(resultadoArestasAGM);


  
  const [existeAresta, setExisteAresta] = useState([]);
  const [selectGrauVertice, setSelectGrauVertice] = useState();
  const [selectVerticeAdj, setSelectVerticeAdj] = useState();
  const [selectMenorCaminhoOrient, setSelectMenorCaminhoOrient] = useState([]);
  const [selectMenorCaminhoNaoOrient, setSelectMenorCaminhoNaoOrient] =
    useState([])

  const resultadoAresta = teste.procuraAresta(
    existeAresta[0],
    existeAresta[1],
    copia5,
    props.orientacao
  );
  const grauVertice = teste.calcularGrau(
    copia6,
    selectGrauVertice,
    props.orientacao ? 'orientado' : 'nao_orientado'
  );
  const adjacenciasVertice = teste.recuperarAdjacencias(
    copia7,
    selectVerticeAdj,
    props.orientacao ? 'orientado' : 'nao_orientado'
  );

  

  const algDijkstra = new dijkstra(); //Cria objeto da classe dijkstra para aplicar o algoritmo

  var resulatdoDijkstra = algDijkstra.dijkstra(
    criaMatrizAdjacencia(
      copia1.nodes,
      copia1.edges,
      selectMenorCaminhoOrient[0],
      selectMenorCaminhoOrient[1]
    )
  );
  console.log(resulatdoDijkstra.distance);

  resulatdoDijkstra.path[0] = selectMenorCaminhoOrient[0];
  resulatdoDijkstra.path[resulatdoDijkstra.path.length - 1] =
    selectMenorCaminhoOrient[1];
  var resultadoMenorCaminho = ''
  resultadoMenorCaminho = resulatdoDijkstra.path.toString();
  console.log('origem, daestino');
  console.log(selectMenorCaminhoNaoOrient);
  console.log('menor caminho n orientado=');
  var MenorCaminhoNorientado = ''
  //MenorCaminhoNorientado = teste.bfs(copia3, selectMenorCaminhoNaoOrient[0], selectMenorCaminhoNaoOrient[1]);
  //MenorCaminhoNorientado = teste.buscaEmLargura(copia3, selectMenorCaminhoNaoOrient[0], selectMenorCaminhoNaoOrient[1]);
  MenorCaminhoNorientado = largura(copia3, selectMenorCaminhoNaoOrient[0], selectMenorCaminhoNaoOrient[1]).path;
  console.log(MenorCaminhoNorientado);


  const resultadoMenorCusto = resulatdoDijkstra.distance;

  return (
    <>
      {viewCardSelectionAresta(
        'Existe a Aresta ',
        resultadoAresta,
        grafo,
        existeAresta,
        setExisteAresta
      )}
      {viewCardSelectionGrau(
        'Grau do Vértice ',
        grauVertice,
        grafo,
        setSelectGrauVertice
      )}
      {viewCardSelectionAdj(
        'Adjacentes do Vértice ',
        adjacenciasVertice.toString(),
        grafo,
        setSelectVerticeAdj
      )}
      {!props.orientacao
        ? viewCard(
            'Grafo não-orientado Conexo?',
            resultadoConexo ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {props.orientacao && resultadoConexo
        ? viewCard('Conexidade do Dígrafo?', resultadoConexidade, visibility)
        : null}
      {resultadoConexidade !== 'Fortemente Conexo' && props.orientacao && resultadoConexo
        ? viewCard(
            'Componentes Fortes:',
            resultadoComponentesFortes,
            visibility
          )
        : null}
      {resultadoConexo
        ? viewCard(
            'Grafo Ciclico:',
            resultadoCiclico ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {props.orientacao && !resultadoCiclico && resultadoConexo
        ? viewCard(
            'Ordenação Topológica:',
            resultadoOrdenacaoTopologica,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard('Grafo Planar?', resultadoPlanar ? 'Sim' : 'Não', visibility)
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Biconexo?',
            resultadoBiconexo ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Euleriano?',
            resultadoEuleriano ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo && resultadoEuleriano
        ? viewCard(
            'Ciclo Euleriano?',
            resultadoCicloEuleriano.toString(),
            visibility
          )
        : null}
      {!props.orientacao
        ? viewCardSelectionMenorCaminhoNaoOrient(
            'Menor Caminho não orientado:',
            MenorCaminhoNorientado,
            grafo,
            selectMenorCaminhoNaoOrient,
            setSelectMenorCaminhoNaoOrient
          )
        : null}
      {props.orientacao
        ? viewCardSelectionMenorCaminhoOrient(
            'Menor Caminho:',
            resultadoMenorCaminho,
            grafo,
            selectMenorCaminhoOrient,
            setSelectMenorCaminhoOrient
          )
        : null}
      {props.orientacao
        ? viewCard('Menor Custo:', resultadoMenorCusto, visibility)
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Custo Árvore Geradora Mínima:',
            resultadoCustoAGM,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Arestas Árvore Geradora Mínima:',
            resultadoArestasAGM,
            visibility
          )
        : null}
    </>
  );
}
export default GraphResults;
