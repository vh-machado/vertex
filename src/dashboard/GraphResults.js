import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  viewCard,
  viewCardList,
  viewCardSelectionAdj,
  viewCardSelectionAresta,
  viewCardSelectionGrau,
  viewCardSelectionMenorCaminhoNaoOrient,
  ViewCardSelectionMenorCaminhoOrient,
} from '../dashboard/CardInfo';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';
import { criaMatrizAdjacencia } from '../Algoritmos/criaMatrizAdjacencia';
import { arvoreGeradoraMinima } from '../Algoritmos/arvoreGeradoraMinima';
import { componentesFortes } from '../Algoritmos/componentesFortes';
import { ordenacaoTopologica } from '../Algoritmos/ordenacaoTopologica';
import { verificaConexidade } from '../Algoritmos/verificaConexidade';
import { aplicaDijkstra } from '../Algoritmos/aplicaDijkstra';
import {
  selectGrafo,
  setGrafoAGM,
  setGrafoDijkstra,
} from '../servicos/grafoSlice';
import aplicaPrim from '../Algoritmos/aplicaPrim';
import aplicaBuscaLargura from '../Algoritmos/aplicaBuscaLargura';

//Retorna os cards com os resultados
function GraphResults(props) {
  const { graphData, orientado } = useSelector(selectGrafo);
  const dispatch = useDispatch();

  const [existeAresta, setExisteAresta] = useState(['', '']);
  const [selectGrauVertice, setSelectGrauVertice] = useState('');
  const [selectVerticeAdj, setSelectVerticeAdj] = useState('');
  const [selectMenorCaminhoOrient, setSelectMenorCaminhoOrient] = useState([
    '',
    '',
  ]);
  const [selectMenorCaminhoNaoOrient, setSelectMenorCaminhoNaoOrient] =
    useState(['', '']);

  const teste = new algoritmosGrafos(); //Cria objeto da classe algoritmosGrafos para realizar os testes e gerar os resultados

  const grafo = graphData.principal.graph; //variável com o grafo para se pegar mais facilmente os nodes e as edges
  const vertices = graphData.principal.nodes;
  const arestas = graphData.principal.edges;

  //const origem = grafo.nodes[grafo.nodes.length - 1].id;
  //const destino = grafo.nodes[0].id;
  let origem, destino;
  const origemBFS = '';
  const destinoBFS = '';
  const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  //Implementados
  const copia2 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia3 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia9 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  // Algoritmos Implementados

  // Verifica se o grafo é conexo
  var resultadoConexo = false;

  resultadoConexo = teste.verificaConexo(copia8);
  console.log('Resultado conexo:', resultadoConexo);

  // Verifica se o  dígrafo é fortemente, unilateralmente ou fracamente conexo
  var resultadoConexidade = '';
  var resultadoComponentesFortes = '';

  /*
  if (resultadoConexo && orientado) {
    resultadoConexidade = verificaConexidade(vertices, arestas);
    console.log('Teste conexidade:');
    console.log(resultadoConexidade);
    // Obtém os componentes fortes, caso o dígrafo seja fortemente conexo
    if (resultadoConexidade !== 'Fortemente Conexo') {
      resultadoComponentesFortes = componentesFortes(grafo.nodes, grafo.edges);
    }
  }
  */
  // Verifica se o grafo possui ciclo
  var resultadoCiclico = false;

  if (resultadoConexo && orientado) {
    resultadoCiclico = false;
  } else if (resultadoConexo && !orientado) {
    resultadoCiclico = false;
  }
  console.log('Possui ciclo? ', resultadoCiclico);

  // Realiza a ordenação topológica, caso seja acíclico e conexo
  var resultadoOrdenacaoTopologica = '';

  if (!resultadoCiclico && resultadoConexo && orientado) {
    resultadoOrdenacaoTopologica = ordenacaoTopologica(grafo);
  }
  console.log('Ordenação Topológica:');
  console.log(resultadoOrdenacaoTopologica);

  const visibility = false;

  // Obtém a Árvore Geradora Mínima do grafo
  var grafoAGM = {};

  var resultadosAGM = '';
  var resultadoCustoAGM = '';
  var resultadoArestasAGM = [];

  if (resultadoConexo && graphData.agm.counter === 0) {
    console.log('AGM=', aplicaPrim(graphData.principal, 1));
    grafoAGM = {
      ...aplicaPrim(graphData.principal, 1, orientado).grafoPrim,
    };
    setTimeout(() => dispatch(setGrafoAGM(grafoAGM)), 0);

    //resultadosAGM = arvoreGeradoraMinima(graphData.principal);
    //resultadoCustoAGM = resultadosAGM.custo;
    //resultadoArestasAGM = resultadosAGM.arestas;
  }

  console.log('Custo AGM:', resultadoCustoAGM);
  console.log('AGM:');
  console.log(resultadoArestasAGM);

  // Procura a existência da aresta
  var resultadoAresta = 'Informe dois vértices';
  if (existeAresta[0] !== '' && existeAresta[1] !== '') {
    resultadoAresta = teste.procuraAresta(
      existeAresta[0],
      existeAresta[1],
      copia5,
      orientado
    );
  } else {
    resultadoAresta = 'Informe dois vértices';
  }

  // Verifica grau do vértice
  var grauVertice = 'Escolha um vértice';
  console.log(selectGrauVertice);
  if (selectGrauVertice !== '' && selectGrauVertice !== undefined) {
    grauVertice =
      'Grau ' +
      teste.calcularGrau(
        copia6,
        selectGrauVertice,
        orientado ? 'orientado' : 'nao_orientado'
      );
  } else {
    grauVertice = 'Escolha um vértice';
  }

  // Verifica as adjacências do vértice
  var adjacenciasVertice = 'Escolha um vértice';
  if (selectVerticeAdj !== '' && selectVerticeAdj !== undefined) {
    adjacenciasVertice = teste.recuperarAdjacencias(copia7, selectVerticeAdj);
  } else {
    adjacenciasVertice = 'Escolha um vértice';
  }

  // Verifica se o grafo possui peso em pelo menos uma aresta
  var possuiPeso = false;
  for (let i = 0; i < grafo.edges.length; i++) {
    if (grafo.edges[i].label != '') {
      possuiPeso = true;
      break;
    }
  }

  var grafoDijkstra = {};
  var solucaoDijkstra = '';

  console.log('origem, destino =');
  console.log(selectMenorCaminhoOrient[0], selectMenorCaminhoOrient[1]);
  if (
    selectMenorCaminhoOrient[0] !== undefined &&
    selectMenorCaminhoOrient[0] !== '' &&
    selectMenorCaminhoOrient[1] !== undefined &&
    selectMenorCaminhoOrient[1] !== '' &&
    selectMenorCaminhoOrient[0] !== selectMenorCaminhoOrient[1]
  ) {
    // Verifica se o vértice de destino é uma fonte (não pode)
    var verticeDestino = grafo.nodes.find(
      vertice => vertice.label === selectMenorCaminhoOrient[1]
    );
    var testaDestino = grafo.edges.find(
      aresta => aresta.to === verticeDestino.id
    );

    let resultadoDijkstra = aplicaDijkstra(graphData.principal, 1, orientado);
    solucaoDijkstra = resultadoDijkstra.solucao;

    // O menor caminho só será calculado se o destino não for uma fonte
    if (testaDestino !== undefined && graphData.dijkstra.counter === 0) {
      console.log('dijkstra=', aplicaDijkstra(graphData.principal, 1));


      grafoDijkstra = {
        ...resultadoDijkstra.grafoDijkstra,
      };

      setTimeout(() => dispatch(setGrafoDijkstra(grafoDijkstra)), 0);

    }
  } else {
    solucaoDijkstra = 'Informe dois vértices distintos';
  }

  console.log('Caminho mais curto (busca em largura):');
  var respostaCaminhoMaisCurto = '';

  // Cálculo do menor caminho entre dois vértices para grafos não orientados

  console.log('origem, destino =');
  console.log(selectMenorCaminhoNaoOrient[0], selectMenorCaminhoNaoOrient[1]);
  if (
    selectMenorCaminhoNaoOrient[0] !== undefined &&
    selectMenorCaminhoNaoOrient[0] !== '' &&
    selectMenorCaminhoNaoOrient[1] !== undefined &&
    selectMenorCaminhoNaoOrient[1] !== '' &&
    selectMenorCaminhoNaoOrient[0] !== selectMenorCaminhoNaoOrient[1]
  ) {
    let resultadoBuscaLargura = aplicaBuscaLargura(
      graphData.principal,
      selectMenorCaminhoNaoOrient[0],
      selectMenorCaminhoNaoOrient[1],
      orientado
    );

    respostaCaminhoMaisCurto = resultadoBuscaLargura.caminho;
  } else {
    respostaCaminhoMaisCurto = 'Informe dois vértices distintos';
  }

  return (
    <>
      {viewCardSelectionAresta(
        'Existe a Aresta?',
        resultadoAresta,
        grafo,
        existeAresta,
        setExisteAresta,
        orientado
      )}
      {viewCardSelectionGrau(
        'Grau do Vértice',
        grauVertice,
        grafo,
        setSelectGrauVertice
      )}
      {viewCardSelectionAdj(
        'Adjacentes do Vértice',
        adjacenciasVertice,
        grafo,
        setSelectVerticeAdj
      )}
      {!orientado
        ? viewCard(
            'conexidade',
            'Grafo Não Orientado Conexo?',
            resultadoConexo ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {orientado && resultadoConexo
        ? viewCard(
            'conexidadeDigrafo',
            'Conexidade do Dígrafo',
            resultadoConexidade,
            visibility
          )
        : null}
      {resultadoConexidade !== 'Fortemente Conexo' &&
      orientado &&
      resultadoConexo
        ? viewCard(
            'componentesFortes',
            'Componentes Fortes',
            resultadoComponentesFortes,
            visibility
          )
        : null}
      {resultadoConexo
        ? viewCard(
            'ciclo',
            'Grafo Ciclico?',
            resultadoCiclico ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {orientado && !resultadoCiclico && resultadoConexo
        ? viewCard(
            'ordenacaoTopologica',
            'Ordenação Topológica',
            resultadoOrdenacaoTopologica,
            visibility
          )
        : null}
      {viewCardSelectionMenorCaminhoNaoOrient(
        'Caminho Mais Curto',
        respostaCaminhoMaisCurto,
        grafo,
        selectMenorCaminhoNaoOrient,
        setSelectMenorCaminhoNaoOrient
      )}
      {/*!orientado && resultadoConexo
        ? viewCard(
            'agm',
            'Custo da Árvore Geradora Mínima',
            resultadoCustoAGM,
            visibility
          )
        : null*/}
      {ViewCardSelectionMenorCaminhoOrient(
        'Solução Dijkstra',
        solucaoDijkstra,
        grafo,
        selectMenorCaminhoOrient,
        setSelectMenorCaminhoOrient
      )}
    </>
  );
}

export default GraphResults;
