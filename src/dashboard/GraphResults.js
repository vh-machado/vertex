import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  viewCard,
  viewCardList,
  viewCardSelectionAdj,
  viewCardSelectionAresta,
  ViewCardSelectionDijkstraOrigem,
  viewCardSelectionGrau,
  ViewCardSelectionMenorCaminho,
} from '../dashboard/CardInfo';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';
import { ordenacaoTopologica } from '../Algoritmos/ordenacaoTopologica';
import { aplicaDijkstra } from '../Algoritmos/aplicaDijkstra';
import {
  selectGrafo,
  setGrafoAGM,
  setGrafoClassificacao,
  setGrafoDijkstra,
} from '../servicos/grafoSlice';
import aplicaPrim from '../Algoritmos/aplicaPrim';
import aplicaBuscaLargura from '../Algoritmos/aplicaBuscaLargura';
import aplicaBuscaProfundidade from '../Algoritmos/aplicaBuscaProfundidade';

//Retorna os cards com os resultados
function GraphResults() {
  const { graphData, orientado } = useSelector(selectGrafo);
  const dispatch = useDispatch();

  const [existeAresta, setExisteAresta] = useState(['', '']);
  const [selectGrauVertice, setSelectGrauVertice] = useState('');
  const [selectVerticeAdj, setSelectVerticeAdj] = useState('');
  const [selectMenorCaminho, setSelectMenorCaminho] = useState({
    origem: '',
    destino: '',
  });
  const [selectDijkstraOrigem, setSelectDijkstraOrigem] = useState('');

  const teste = new algoritmosGrafos(); //Cria objeto da classe algoritmosGrafos para realizar os testes e gerar os resultados

  const { graph: grafo } = graphData.principal; //variável com o grafo para se pegar mais facilmente os nodes e as edges

  //Implementados
  const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  // Algoritmos Implementados

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

  // Busca em profundidade
  let resultadoProfundidade = aplicaBuscaProfundidade(
    graphData.principal,
    1,
    orientado
  );

  let grafoClassificacaoArestas = {};
  if (graphData.classificacao.counter === 0) {
    grafoClassificacaoArestas = {
      ...resultadoProfundidade.grafoClassificacaoArestas,
    };

    setTimeout(() => dispatch(setGrafoClassificacao(grafoClassificacaoArestas)), 0);
  }

  console.log('Caminho mais curto (busca em largura):');
  var respostaCaminhoMaisCurto = '';

  // Cálculo do menor caminho entre dois vértices para grafos não orientados

  console.log('origem, destino =');
  console.log(selectMenorCaminho);
  if (
    selectMenorCaminho.origem !== undefined &&
    selectMenorCaminho.origem !== '' &&
    selectMenorCaminho.destino !== undefined &&
    selectMenorCaminho.destino !== '' &&
    selectMenorCaminho.origem !== selectMenorCaminho.destino
  ) {
    let resultadoBuscaLargura = aplicaBuscaLargura(
      graphData.principal,
      selectMenorCaminho.origem,
      selectMenorCaminho.destino,
      orientado
    );

    respostaCaminhoMaisCurto = resultadoBuscaLargura.caminho;
  } else {
    respostaCaminhoMaisCurto = 'Informe dois vértices distintos';
  }

  // Obtém a Árvore Geradora Mínima do grafo
  var grafoAGM = {};

  if (graphData.agm.counter === 0) {
    console.log('AGM=', aplicaPrim(graphData.principal, 1));
    grafoAGM = {
      ...aplicaPrim(graphData.principal, 1, orientado).grafoPrim,
    };
    setTimeout(() => dispatch(setGrafoAGM(grafoAGM)), 0);
  }


  // Dijkstra
  var grafoDijkstra = {};
  var solucaoDijkstra = '';

  if (selectDijkstraOrigem !== undefined && selectDijkstraOrigem !== '') {
    // Verifica se o vértice de destino é uma fonte (não pode)
    var verticeDestino = grafo.nodes.find(
      vertice => vertice.label === selectDijkstraOrigem
    );
    var testaDestino = grafo.edges.find(
      aresta => aresta.to === verticeDestino.id
    );

    let resultadoDijkstra = aplicaDijkstra(graphData.principal, 1, orientado);
    solucaoDijkstra = resultadoDijkstra.solucao;

    // O menor caminho só será calculado se o destino não for uma fonte
    if (testaDestino !== undefined && graphData.dijkstra.counter === 0) {
      console.log(
        'dijkstra=',
        aplicaDijkstra(graphData.principal, selectDijkstraOrigem, orientado)
      );

      grafoDijkstra = {
        ...resultadoDijkstra.grafoDijkstra,
      };

      setTimeout(() => dispatch(setGrafoDijkstra(grafoDijkstra)), 0);
    }
  } else {
    solucaoDijkstra = 'Informe dois vértices distintos';
  }

  const visibility = false;

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
      {viewCard(
        'componentesFortes',
        'Componentes Fortes',
        resultadoProfundidade?.cfc,
        visibility
      )}
      {viewCard(
        'ciclo',
        'Grafo Ciclico?',
        resultadoProfundidade?.ciclo ? 'Sim' : 'Não',
        visibility
      )}
      {viewCard(
        'ordenacaoTopologica',
        'Ordenação Topológica',
        resultadoProfundidade?.ordenacaoTopologicaFormatado,
        visibility
      )}
      {ViewCardSelectionMenorCaminho(
        'Caminho Mais Curto',
        respostaCaminhoMaisCurto,
        grafo,
        selectMenorCaminho,
        setSelectMenorCaminho
      )}
      {ViewCardSelectionDijkstraOrigem(
        'Solução Dijkstra',
        solucaoDijkstra,
        grafo,
        setSelectDijkstraOrigem
      )}
    </>
  );
}

export default GraphResults;
