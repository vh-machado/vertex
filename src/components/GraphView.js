import React, { useEffect, useRef, useState } from 'react';
import { network, Network } from 'vis-network';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import EditPopOver from './EditPopOver';
import { Fontes } from '../assets/Fontes';
import { ViewIcon } from '@chakra-ui/icons';

const GraphView = props => {
  var grafo;
  var editData;

  const getEditData = addData => {
    editData = addData;
  };

  function buttonAddNode(inputData) {
    getEditData(inputData);
    grafo.addNodeMode();
  }
  function buttonAddEdge(inputData) {
    getEditData(inputData);
    grafo.addEdgeMode();
  }
  function buttonDelete(confirmation) {
    if (confirmation) {
      grafo.deleteSelected();
    }
  }

  const container = useRef(null);

  /*
  var state = {
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: 'Node 1', x: 200, y: 0 },
        { id: 2, label: 'Node 2', x: 50, y: 250 },
        { id: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, label: 'Node 4', x: 90, y: 100 },
        { id: 5, label: 'Node 5', x: 0, y: 10 },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
  };*/

  var state = props.state;

  console.log('state:')
  console.log(state)

  const { graph } = state;

  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: {
        enabled: false,
        direction: 'LR',
        sortMethod: 'directed',
        shakeTowards: 'leaves',
      },
    },
    edges: {
      arrows: {
        to: {
          enabled: props.orientado,
        },
      },
      font: {
        face: Fontes.principal,
        size: 16,
        color: Cores.mauve,
        strokeWidth: 0,
        align: 'top',
      },
      color: {
        color: Cores.mauve,
        highlight: Cores.lavender_floral,
        hover: Cores.lavender_floral,
        inherit: 'from',
        opacity: 1.0,
      },
      width: 2,
      smooth: {
        enabled: props.curva,
        type: 'curvedCW',
      },
    },
    nodes: {
      borderWidth: 1,
      shape: 'circle',
      margin: 8,
      widthConstraint: {
        minimum: 20,
      },
      font: {
        face: Fontes.principal,
        size: 16,
        color: Cores.dark_purple,
      },
      color: {
        border: Cores.amethyst_2,
        background: Cores.lavender_floral,
        highlight: {
          border: Cores.lavender_floral,
          background: Cores.amethyst_2,
        },
        hover: {
          border: Cores.lavender_floral,
          background: Cores.amethyst_2,
        },
      },
    },
    interaction: {
      dragNodes: true,
      hover: true,
      dragView: false,
      zoomView: false,
    },
    physics: {
      enabled: true,
      stabilization: true,
    },
    manipulation: {
      enabled: false,
      addNode: function (nodeData, callback) {
        state.counter += 1;
        nodeData.id = state.counter;
        nodeData.label = editData;
        state.graph.nodes = [
          ...state.graph.nodes,
          {
            id: state.counter,
            label: nodeData.label,
            x: nodeData.x,
            y: nodeData.y,
          },
        ];
        props.childToParent(state);
        callback(nodeData);
      },
      addEdge: function (edgeData, callback) {
        if (edgeData.from == edgeData.to) {
          callback(null);
        } else {
          edgeData.label = editData;
          state.graph.edges = [
            ...state.graph.edges,
            {
              from: edgeData.from,
              to: edgeData.to,
              label: edgeData.label,
            },
          ];
          props.childToParent(state);
          callback(edgeData);
        }
      },
      deleteNode: function (deleteData, callback) {
        state.graph.nodes = state.graph.nodes.filter(
          node => node.id !== deleteData.nodes[0]
        );
        deleteData.edges.forEach(function (edge) {
          state.graph.edges = state.graph.edges.filter(e => e.id !== edge);
        });
        props.childToParent(state);
        console.log(state.graph)
        callback(deleteData);
      },
      deleteEdge: function (deleteData, callback) {
        state.graph.edges = state.graph.edges.filter(
          e => e.id !== deleteData.edges[0]
        );
        props.childToParent(state);
        console.log(state.graph)
        callback(deleteData);
      },
    },
  };

  useEffect(() => {
    const network =
      container.current && new Network(container.current, graph, options);
    network.on('dragEnd', function (params) {
      params.event = '[original event]';
      const position = network.getPosition(params.nodes[0]);
      const index = state.graph.nodes.findIndex(
        node => node.id === params.nodes[0]
      );
      state.graph.nodes[index].x = position.x;
      state.graph.nodes[index].y = position.y;
      props.childToParent(state);
    });

    grafo = network;
    console.log(grafo)
  }, [container, graph.nodes, graph.edges, props.orientado]);
  /*
  var teste = {
    counter: 7,
    graph: {
      nodes: [
        { id: 1, label: 'A', x: 200, y: 0 },
        { id: 2, label: 'B', x: 50, y: 250 },
        { id: 3, label: 'C', x: 300, y: 0 },
        { id: 4, label: 'D', x: 300, y: 0 },
        { id: 5, label: 'E', x: 200, y: 0 },
        { id: 6, label: 'F', x: 50, y: 250 },
        { id: 7, label: 'G', x: 300, y: 0 },
      ],
      edges: [
        { from: 1, to: 2, label: '7' },
        { from: 4, to: 1, label: '5' },
        { from: 4, to: 2, label: '9' },
        { from: 2, to: 3, label: '8' },
        { from: 2, to: 5, label: '7' },
        { from: 3, to: 5, label: '5' },
        { from: 4, to: 5, label: '15' },
        { from: 4, to: 6, label: '6' },
        { from: 6, to: 5, label: '8' },
        { from: 6, to: 7, label: '11' },
        { from: 5, to: 7, label: '9' },
      ],
    },
  };*/

  //ordenacaoTopologica(teste, teste2);
  //componentesFortes(state.graph.nodes, state.graph.edges);
  //isStrong(state.graph.nodes, state.graph.edges);  //criaMatrizAdjacenciaNaoOrientad();
  //arvoreGeradoraMinima(teste.graph.nodes, teste.graph.edges);

  /*
  const [resultadoVisivel, setResultadoVisivel] = useState(false);

  const operacoes = () => {
    setResultadoVisivel(!resultadoVisivel);
    if (props.aba === 'ordenacao') {
      state = ordenacaoTopologica(state);
      console.log('a');
    } else if (props.aba === 'agm') {
      state = arvoreGeradoraMinima(state).arvore;
      console.log(state);
    }
  };*/

  return (
    <Box h='100%' p="8">
      {/*
      <Flex direction={'row'} justifyItems={'flex-start'}>
        <EditPopOver
          operation={'add'}
          buttonText={'Adicionar Vértice'}
          headerText={'Novo Vértice'}
          inputText={'Rótulo'}
          eventClick={buttonAddNode}
        />

        <EditPopOver
          operation={'add'}
          buttonText={'Adicionar Aresta'}
          headerText={'Nova Aresta'}
          inputText={'Peso'}
          eventClick={buttonAddEdge}
        />

        <EditPopOver
          operation={'del'}
          buttonText={'Remover'}
          headerText={'Remover Elemento?'}
          eventClick={buttonDelete}
        />
        
      </Flex>
      */}

      <div ref={container} style={{ height: '100%', width: '100%' }} />
    </Box>
  );
};

export default GraphView;
