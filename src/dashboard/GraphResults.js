import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  viewCard,
  viewCardList,
  viewCardSelectionAdj,
  ViewCardSelectionAGMOrigem,
  viewCardSelectionAresta,
  ViewCardSelectionDijkstraOrigem,
  viewCardSelectionGrau,
  ViewCardSelectionMenorCaminho,
  ViewCardSelectionProfundidadeOrigem,
} from '../dashboard/CardInfo';
import { funcoesBasicas } from '../Algoritmos/funcoesBasicas';
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
import geraListaAdjacencia from '../Algoritmos/geraListaAdjacencia';

//Retorna os cards com os resultados
function GraphResults() {
  const { graphData, orientado } = useSelector(selectGrafo);
  const dispatch = useDispatch();

  const [existeAresta, setExisteAresta] = useState(['', '']);
  const [selectGrauVertice, setSelectGrauVertice] = useState('');
  const [selectVerticeAdj, setSelectVerticeAdj] = useState('');
  const [selectProfundidadeOrigem, setSelectProfundidadeOrigem] = useState('');
  const [selectMenorCaminho, setSelectMenorCaminho] = useState({
    origem: '',
    destino: '',
  });
  const [selectAGMOrigem, setSelectAGMOrigem] = useState('');
  const [selectDijkstraOrigem, setSelectDijkstraOrigem] = useState('');

  useEffect(() => {
    var origemNaoESumidouro = !orientado
      ? true
      : grafo.edges.find(
          aresta => aresta.from === Number(selectDijkstraOrigem)
        );

    if (
      origemNaoESumidouro &&
      selectDijkstraOrigem !== undefined &&
      selectDijkstraOrigem !== ''
    ) {
      let resultadoDijkstra = aplicaDijkstra(
        graphData.principal,
        selectDijkstraOrigem,
        orientado
      );
      solucaoDijkstra = resultadoDijkstra.solucao;

      grafoDijkstra = {
        ...resultadoDijkstra.grafoDijkstra,
      };

      setTimeout(() => dispatch(setGrafoDijkstra(grafoDijkstra)), 0);
    }
  }, [selectDijkstraOrigem]);

  useEffect(() => {
    if (
      selectProfundidadeOrigem !== undefined &&
      selectProfundidadeOrigem !== ''
    ) {
      let resultadoProfundidade = aplicaBuscaProfundidade(
        graphData.principal,
        selectProfundidadeOrigem,
        orientado
      );

      let grafoClassificacaoArestas = {};
      grafoClassificacaoArestas = {
        ...resultadoProfundidade.grafoClassificacaoArestas,
      };

      setTimeout(
        () => dispatch(setGrafoClassificacao(grafoClassificacaoArestas)),
        0
      );
    }
  }, [selectProfundidadeOrigem]);

  useEffect(() => {
    var origemNaoESumidouro = !orientado
      ? true
      : grafo.edges.find(aresta => aresta.from === Number(selectAGMOrigem));

    if (
      origemNaoESumidouro &&
      selectAGMOrigem !== undefined &&
      selectAGMOrigem !== ''
    ) {
      let resultadoAGM = aplicaPrim(
        graphData.principal,
        selectAGMOrigem,
        orientado
      );

      // O menor caminho só será calculado se o destino não for uma fonte
      console.log('AGM=', aplicaPrim(graphData.principal, 1));
      grafoAGM = {
        ...resultadoAGM.grafoPrim,
      };
      setTimeout(() => dispatch(setGrafoAGM(grafoAGM)), 0);
    }
  }, [selectAGMOrigem]);

  const { graph: grafo } = graphData.principal; //variável com o grafo para se pegar mais facilmente os nodes e as edges

  const funcoes = new funcoesBasicas();
  funcoes.listaAdjacencia = geraListaAdjacencia(grafo, orientado);
  funcoes.orientado = orientado;

  //Implementados
  const copia5 = JSON.parse(JSON.stringify(grafo));
  const copia6 = JSON.parse(JSON.stringify(grafo));
  const copia7 = JSON.parse(JSON.stringify(grafo));

  // Algoritmos Implementados

  // Procura a existência da aresta
  var resultadoAresta = 'Informe dois vértices';
  if (existeAresta[0] !== '' && existeAresta[1] !== '') {
    resultadoAresta = funcoes.procuraAresta(
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
      funcoes.calcularGrau(
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
    adjacenciasVertice = funcoes.recuperarAdjacencias(copia7, selectVerticeAdj);
  } else {
    adjacenciasVertice = 'Escolha um vértice';
  }

  // Busca em profundidade
  let resultadoProfundidade;
  let cfc = 'Realize a busca em profundidade';
  let ordenacaoTopologica = 'Realize a busca em profundidade';
  let ciclo = 'Realize a busca em profundidade';
  var solucaoProfundidade = [''];

  if (
    selectProfundidadeOrigem !== undefined &&
    selectProfundidadeOrigem !== ''
  ) {
    resultadoProfundidade = aplicaBuscaProfundidade(
      graphData.principal,
      selectProfundidadeOrigem,
      orientado
    );

    let grafoClassificacaoArestas = {};
    if (graphData.classificacao.counter === 0) {
      grafoClassificacaoArestas = {
        ...resultadoProfundidade.grafoClassificacaoArestas,
      };

      setTimeout(
        () => dispatch(setGrafoClassificacao(grafoClassificacaoArestas)),
        0
      );
    }

    solucaoProfundidade = resultadoProfundidade.descobertasTerminos;
    ciclo = resultadoProfundidade.ciclo ? 'Sim' : 'Não';
    cfc = resultadoProfundidade.cfc;
    ordenacaoTopologica = resultadoProfundidade.ordenacaoTopologicaFormatado;
  } else {
    solucaoProfundidade = ['Escolha um vértice de origem'];
  }

  console.log('Caminho mais curto (busca em largura):');
  var respostaCaminhoMaisCurto = '';
  var descobertasLargura = [''];

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
    descobertasLargura = resultadoBuscaLargura.descobertas;
  } else {
    respostaCaminhoMaisCurto = 'Informe dois vértices distintos';
    descobertasLargura = ['Informe dois vértices distintos'];
  }

  // Obtém a Árvore Geradora Mínima do grafo
  var grafoAGM = {};
  var solucaoAGM = [''];

  if (selectAGMOrigem !== undefined && selectAGMOrigem !== '') {
    var origemNaoESumidouro = !orientado
      ? true
      : grafo.edges.find(aresta => aresta.from === Number(selectAGMOrigem));

    if (origemNaoESumidouro) {
      let resultadoAGM = aplicaPrim(
        graphData.principal,
        selectAGMOrigem,
        orientado
      );

      solucaoAGM = resultadoAGM.solucao;

      // O menor caminho só será calculado se o destino não for uma fonte
      if (graphData.agm.counter === 0) {
        console.log('AGM=', aplicaPrim(graphData.principal, 1));
        grafoAGM = {
          ...resultadoAGM.grafoPrim,
        };
        setTimeout(() => dispatch(setGrafoAGM(grafoAGM)), 0);
      }
    } else {
      solucaoAGM = ['Sumidouro não pode ser vértice de origem'];
    }
  } else {
    solucaoAGM = ['Informe um vértice de origem'];
  }

  // Dijkstra
  var grafoDijkstra = {};
  var solucaoDijkstra = [''];

  if (selectDijkstraOrigem !== undefined && selectDijkstraOrigem !== '') {
    var origemNaoESumidouro = !orientado
      ? true
      : grafo.edges.find(
          aresta => aresta.from === Number(selectDijkstraOrigem)
        );

    if (origemNaoESumidouro) {
      let resultadoDijkstra = aplicaDijkstra(
        graphData.principal,
        selectDijkstraOrigem,
        orientado
      );
      solucaoDijkstra = resultadoDijkstra.solucao;

      // O menor caminho só será calculado se o destino não for uma fonte
      if (graphData.dijkstra.counter === 0) {
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
      solucaoDijkstra = ['Sumidouro não pode ser vértice de origem'];
    }
  } else {
    solucaoDijkstra = ['Informe um vértice de origem'];
  }

  const visibility = false;

  return (
    <>
      {viewCard(
        'numVertices',
        'Número de vértices',
        funcoes.quantidadeVertices(),
        visibility
      )}
      {viewCard(
        'quantArestas',
        'Número de arestas',
        funcoes.quantidadeArestas(),
        visibility
      )}
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
      {ViewCardSelectionProfundidadeOrigem(
        'Busca em Profundidade',
        solucaoProfundidade,
        grafo,
        setSelectProfundidadeOrigem
      )}
      {viewCard('componentesFortes', 'Componentes Fortes', cfc, visibility)}
      {viewCard('ciclo', 'Grafo Ciclico?', ciclo, visibility)}
      {viewCard(
        'ordenacaoTopologica',
        'Ordenação Topológica',
        ordenacaoTopologica,
        visibility
      )}
      {ViewCardSelectionMenorCaminho(
        'Caminho Mais Curto',
        respostaCaminhoMaisCurto,
        grafo,
        selectMenorCaminho,
        setSelectMenorCaminho
      )}
      {viewCardList('Busca em Largura', descobertasLargura, visibility)}
      {ViewCardSelectionAGMOrigem(
        'Algoritmo de Prim',
        solucaoAGM,
        grafo,
        setSelectAGMOrigem
      )}
      {ViewCardSelectionDijkstraOrigem(
        'Algoritmo de Dijkstra',
        solucaoDijkstra,
        grafo,
        setSelectDijkstraOrigem
      )}
    </>
  );
}

export default GraphResults;
