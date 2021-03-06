import React, { useEffect, useState } from 'react';
import {
  viewCard,
  viewCardList,
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
import { caminhoBellmanFord } from '../Algoritmos/caminhoBellmanFord';

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

  const vertice = state.graph.nodes[0]; // Usado nos resultados que se escolhe um v??rtice
  const grafo = props.state.graph; //vari??vel com o grafo para se pegar mais facilmente os nodes e as edges
  const vertices = grafo.nodes;
  const arestas = grafo.edges;

  const origem = grafo.nodes[grafo.nodes.length - 1].id;
  const destino = grafo.nodes[0].id;
  const tamanhoListavertices = state.graph.nodes.length; //tamanho da lista de v??rtices
  const origemBFS = state.graph.nodes[0].label;
  const destinoBFS = state.graph.nodes[3].label;

  const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra

  //Implementados
  const copia1 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia2 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia3 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia4 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra
  const copia9 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para n??o ser referenciado no algoritmo de dijkstra

  // Algoritmos Implementados

  // Verifica se o grafo ?? conexo
  var resultadoConexo = false;

  resultadoConexo = teste.verificaConexo(copia8);
  console.log('Resultado conexo:', resultadoConexo);

  // Verifica se o  d??grafo ?? fortemente, unilateralmente ou fracamente conexo
  var resultadoConexidade = '';
  var resultadoComponentesFortes = '';

  if (resultadoConexo && props.orientacao) {
    resultadoConexidade = verificaConexidade(vertices, arestas);
    console.log('Teste conexidade:');
    console.log(resultadoConexidade);
    // Obt??m os componentes fortes, caso o d??grafo seja fortemente conexo
    if (resultadoConexidade !== 'Fortemente Conexo') {
      resultadoComponentesFortes = componentesFortes(grafo.nodes, grafo.edges);
    }
  }

  // Verifica se o grafo possui ciclo
  var resultadoCiclico = false;

  if (resultadoConexo && props.orientacao) {
    resultadoCiclico = teste.possuiCicloOrientado(copia9.nodes, copia9.edges);
  } else if (resultadoConexo && !props.orientacao) {
    resultadoCiclico = teste.possuiCiclo(copia2, origem, destino);
  }
  console.log('Possui ciclo? ', resultadoCiclico);

  // Realiza a ordena????o topol??gica, caso seja ac??clico e conexo
  var resultadoOrdenacaoTopologica = '';

  if (!resultadoCiclico && resultadoConexo && props.orientacao) {
    resultadoOrdenacaoTopologica = ordenacaoTopologica(grafo);
  }
  console.log('Ordena????o Topol??gica:');
  console.log(resultadoOrdenacaoTopologica);

  // Verifica se o grafo ?? planar, biconexo e euleriano,
  // retornando tamb??m o ciclo euleriano se houver
  var resultadoPlanar = false;
  var resultadoBiconexo = false;
  var resultadoEuleriano = false;
  var resultadoCicloEuleriano = '';

  if (resultadoConexo && !props.orientacao) {
    resultadoPlanar = planarity_test(copia4.nodes, copia4.edges);
    resultadoBiconexo = verificaBiconexo(grafo.nodes, grafo.edges);
    resultadoEuleriano = verificaEuleriano(grafo.nodes, grafo.edges);
    if (resultadoEuleriano) {
      resultadoCicloEuleriano = cicloEuleriano(grafo.nodes, grafo.edges);
    }
  }
  console.log('Planar?', resultadoPlanar);
  console.log('Biconexo?', resultadoBiconexo);
  console.log('Euleriano?', resultadoEuleriano);
  console.log('Ciclo Euleriano:');
  console.log(resultadoCicloEuleriano);

  const visibility = false;

  // Obt??m a ??rvore Geradora M??nima do grafo
  var resultadosAGM = '';
  var resultadoCustoAGM = '';
  var resultadoArestasAGM = '';

  if (resultadoConexo) {
    resultadosAGM = arvoreGeradoraMinima(props.state);
    resultadoCustoAGM = resultadosAGM.custo;
    resultadoArestasAGM = resultadosAGM.arestas;
  }

  console.log('Custo AGM:', resultadoCustoAGM);
  console.log('AGM:');
  console.log(resultadoArestasAGM);

  const [existeAresta, setExisteAresta] = useState(['','']);
  const [selectGrauVertice, setSelectGrauVertice] = useState();
  const [selectVerticeAdj, setSelectVerticeAdj] = useState();
  const [selectMenorCaminhoOrient, setSelectMenorCaminhoOrient] = useState(['','']);
  const [selectMenorCaminhoNaoOrient, setSelectMenorCaminhoNaoOrient] =
    useState(['','']);

  // Procura a exist??ncia da aresta
  var resultadoAresta = 'Informe dois v??rtices';
  if (existeAresta[0] !== '' && existeAresta[1] !== '') {
    resultadoAresta = teste.procuraAresta(
      existeAresta[0],
      existeAresta[1],
      copia5,
      props.orientacao
    );
  } else {
    resultadoAresta = 'Informe dois v??rtices';
  }

  // Verifica grau do v??rtice
  var grauVertice = 'Escolha um v??rtice';
  console.log(selectGrauVertice);
  if (selectGrauVertice !== '' && selectGrauVertice !== undefined) {
    grauVertice = "Grau "+ teste.calcularGrau(
      copia6,
      selectGrauVertice,
      props.orientacao ? 'orientado' : 'nao_orientado'
    );
  } else {
    grauVertice = 'Escolha um v??rtice';
  }

  // Verifica as adjac??ncias do v??rtice
  var adjacenciasVertice = 'Escolha um v??rtice';
  if (selectVerticeAdj !== '' && selectVerticeAdj !== undefined) {
    adjacenciasVertice = teste.recuperarAdjacencias(copia7, selectVerticeAdj);
  } else {
    adjacenciasVertice = 'Escolha um v??rtice';
  }

  // Verifica se o grafo possui peso em pelo menos uma aresta
  var possuiPeso = false;
  for (let i = 0; i < grafo.edges.length; i++) {
    if (grafo.edges[i].label != '') {
      possuiPeso = true;
      break;
    }
  }

  //const algDijkstra = new dijkstra(); //Cria objeto da classe dijkstra para aplicar o algoritmo

  // C??lculo do caminho mais curto para d??grafo ponderado
  //var resulatdoDijkstra = '';
  var resultadoBellmanFord = '';
  var resultadoMenorCaminho = '';
  var resultadoMenorCusto = '';

  if (props.orientacao) {
    console.log('origem, destino =');
    console.log(selectMenorCaminhoOrient[0], selectMenorCaminhoOrient[1]);
    if (
      selectMenorCaminhoOrient[0] !== undefined &&
      selectMenorCaminhoOrient[0] !== '' &&
      selectMenorCaminhoOrient[1] !== undefined &&
      selectMenorCaminhoOrient[1] !== '' &&
      selectMenorCaminhoOrient[0] !== selectMenorCaminhoOrient[1]
    ) {
      // Verifica se o v??rtice de destino ?? uma fonte (n??o pode)
      var verticeDestino = grafo.nodes.find(
        vertice => vertice.label === selectMenorCaminhoOrient[1]
      );
      var testaDestino = grafo.edges.find(
        aresta => aresta.to === verticeDestino.id
      );

      // O menor caminho s?? ser?? calculado se o destino n??o for uma fonte
      if (testaDestino !== undefined) {
        resultadoBellmanFord = caminhoBellmanFord(
          copia1,
          selectMenorCaminhoOrient[0],
          selectMenorCaminhoOrient[1]
        );
        console.log('Resultado Bellman Ford:');
        console.log(resultadoBellmanFord);

        // Menor Caminho / Caminho mais curto
        resultadoMenorCaminho = resultadoBellmanFord.menorCaminho;
        // Custo do menor caminho / Dist??ncia
        resultadoMenorCusto = resultadoBellmanFord.distanciaCusto;

        /*
        resulatdoDijkstra = algDijkstra.dijkstra(
          criaMatrizAdjacencia(
            copia1.nodes,
            copia1.edges,
            selectMenorCaminhoOrient[0],
            selectMenorCaminhoOrient[1]
          )
        );
        console.log('Resultado Dijkstra:');
        console.log(resulatdoDijkstra);
        */

        /*
        // V??rtice de origem selecionado
        resulatdoDijkstra.path[0] = selectMenorCaminhoOrient[0];
        // V??rtice de destino selecionado
        resulatdoDijkstra.path[resulatdoDijkstra.path.length - 1] =
          selectMenorCaminhoOrient[1];
        */

        // Custo do menor caminho / Dist??ncia
        //resultadoMenorCusto = resulatdoDijkstra.distance;

        /*
        if (resultadoMenorCusto !== Infinity) {
          resultadoMenorCaminho = resulatdoDijkstra.path.toString();

          if (possuiPeso) {
            // O custo do menor caminho caso houver peso
            resultadoMenorCusto = resulatdoDijkstra.distance;
          } else {
            // A dist??ncia do menor caminho, caso n??o haja peso
            resultadoMenorCusto = resulatdoDijkstra.path.length - 1;
          }
        } else {
          resultadoMenorCaminho = 'N??o existe caminho';
        }
        */
      } else {
        resultadoMenorCaminho = 'N??o existe caminho';
      }
    } else {
      resultadoMenorCaminho = 'Informe dois v??rtices distintos';
    }
  }
  console.log(resultadoBellmanFord);
  //console.log(resulatdoDijkstra.distance);

  console.log('origem, destino');
  console.log(selectMenorCaminhoNaoOrient);
  console.log('menor caminho n orientado=');

  // C??lculo do menor caminho entre dois v??rtices para grafos n??o orientados
  var MenorCaminhoNorientado = '';
  if (!props.orientacao) {
    console.log('origem, destino =');
    console.log(selectMenorCaminhoNaoOrient[0], selectMenorCaminhoNaoOrient[1]);
    if (
      selectMenorCaminhoNaoOrient[0] !== undefined &&
      selectMenorCaminhoNaoOrient[0] !== '' &&
      selectMenorCaminhoNaoOrient[1] !== undefined &&
      selectMenorCaminhoNaoOrient[1] !== '' &&
      selectMenorCaminhoNaoOrient[0] !== selectMenorCaminhoNaoOrient[1]
    ) {
      var resultadoLargura = largura(
        copia3,
        selectMenorCaminhoNaoOrient[0],
        selectMenorCaminhoNaoOrient[1]
      );

      console.log(resultadoLargura.cost);
      MenorCaminhoNorientado = resultadoLargura.path;
      if (resultadoLargura.cost === 0) {
        resultadoMenorCusto = resultadoLargura.distance;
      } else {
        resultadoMenorCusto = resultadoLargura.cost;
      }
    } else {
      MenorCaminhoNorientado = 'Informe dois v??rtices distintos';
    }
  }
  console.log(MenorCaminhoNorientado);

  return (
    <>
      {viewCardSelectionAresta(
        'Existe a Aresta?',
        resultadoAresta,
        grafo,
        existeAresta,
        setExisteAresta,
        props.orientacao
      )}
      {viewCardSelectionGrau(
        'Grau do V??rtice',
        grauVertice,
        grafo,
        setSelectGrauVertice
      )}
      {viewCardSelectionAdj(
        'Adjacentes do V??rtice',
        adjacenciasVertice,
        grafo,
        setSelectVerticeAdj
      )}
      {!props.orientacao
        ? viewCard(
            'Grafo N??o Orientado Conexo?',
            resultadoConexo ? 'Sim' : 'N??o',
            visibility
          )
        : null}
      {props.orientacao && resultadoConexo
        ? viewCard('Conexidade do D??grafo', resultadoConexidade, visibility)
        : null}
      {resultadoConexidade !== 'Fortemente Conexo' &&
      props.orientacao &&
      resultadoConexo
        ? viewCard(
            'Componentes Fortes',
            resultadoComponentesFortes,
            visibility
          )
        : null}
      {resultadoConexo
        ? viewCard(
            'Grafo Ciclico?',
            resultadoCiclico ? 'Sim' : 'N??o',
            visibility
          )
        : null}
      {props.orientacao && !resultadoCiclico && resultadoConexo
        ? viewCard(
            'Ordena????o Topol??gica',
            resultadoOrdenacaoTopologica,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard('Grafo Planar?', resultadoPlanar ? 'Sim' : 'N??o', visibility)
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Biconexo?',
            resultadoBiconexo ? 'Sim' : 'N??o',
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Euleriano?',
            resultadoEuleriano ? 'Sim' : 'N??o',
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
            possuiPeso ? 'Caminho de Menor Custo' : 'Caminho Mais Curto',
            MenorCaminhoNorientado,
            grafo,
            selectMenorCaminhoNaoOrient,
            setSelectMenorCaminhoNaoOrient
          )
        : null}
      {props.orientacao
        ? viewCardSelectionMenorCaminhoOrient(
            possuiPeso ? 'Caminho de Menor Custo' : 'Caminho Mais Curto',
            resultadoMenorCaminho,
            grafo,
            selectMenorCaminhoOrient,
            setSelectMenorCaminhoOrient
          )
        : null}
      {props.orientacao &&
      resultadoMenorCusto !== Infinity &&
      resultadoMenorCusto !== undefined &&
      resultadoMenorCusto !== ''
        ? viewCard(
            possuiPeso
              ? 'Custo do Menor Caminho'
              : 'Dist??ncia do Caminho Mais Curto',
            resultadoMenorCusto,
            visibility
          )
        : null}
      {!props.orientacao && resultadoMenorCusto !== ''
        ? viewCard(
            possuiPeso
              ? 'Custo do Menor Caminho'
              : 'Dist??ncia do Caminho Mais Curto',
            resultadoMenorCusto,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Custo da ??rvore Geradora M??nima',
            resultadoCustoAGM,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCardList(
            'Arestas da ??rvore Geradora M??nima',
            resultadoArestasAGM,
            visibility
          )
        : null}
    </>
  );
}
export default GraphResults;
