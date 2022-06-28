import React, { useEffect, useRef, useState } from 'react';
import { network, Network } from 'vis-network';
import { Button, Flex } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import EditPopOver from './EditPopOver';
import { Fontes } from '../assets/Fontes';
import { ViewIcon } from '@chakra-ui/icons';
import ordenacaoTopologica from '../Algoritmos/ordenacaoTopologica';

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
        { id: 1, label: 'Node 1', color: Cores.lavender_floral, x: 200, y: 0 },
        { id: 2, label: 'Node 2', color: Cores.lavender_floral, x: 50, y: 250 },
        { id: 3, label: 'Node 3', color: Cores.lavender_floral, x: 300, y: 0 },
        { id: 4, label: 'Node 4', color: Cores.lavender_floral, x: 90, y: 100 },
        { id: 5, label: 'Node 5', color: Cores.lavender_floral, x: 0, y: 10 },
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

  const createNode = label => {
    /*
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      //const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: label, color: Cores.lavender_floral },
          ],
          edges: [...edges],
        },
        counter: id,
        ...rest,
      };
    });*/
  };

  const { graph } = state;

  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: {
        enabled: props.hierarquico,
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
      dragNodes: props.aba === 'grafo' ? true : false,
      hover: true,
      dragView: false,
      zoomView: false,
    },
    physics: {
      enabled: false,
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
      },
      deleteNode: function (deleteData, callback) {
        state.graph.nodes = state.graph.nodes.filter(
          node => node.id !== deleteData.nodes[0]
        );
        deleteData.edges.forEach(function (edge) {
          state.graph.edges = state.graph.edges.filter(e => e.id !== edge);
        });
        props.childToParent(state);
        callback(deleteData);
      },
      deleteEdge: function (deleteData, callback) {
        state.graph.edges = state.graph.edges.filter(
          e => e.id !== deleteData.edges[0]
        );
        props.childToParent(state);
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
    /*network.on('click', function (params) {
      params.event = '[original event]';
      clicado = this.getNodeAt(params.pointer.DOM)
      
      //createNode();
    });*/
    /*
    network.on('doubleClick', function (params) {
      params.event = '[original event]';
      createNode();
    });*/

    grafo = network;
  }, [container, graph.nodes, graph.edges]);

  /*
  var teste = {
    counter: 3,
    graph: {
      nodes: [
        { id: 0, label: 'Node 1', color: Cores.lavender_floral, x: 200, y: 0 },
        { id: 1, label: 'Node 2', color: Cores.lavender_floral, x: 50, y: 250 },
        { id: 2, label: 'Node 3', color: Cores.lavender_floral, x: 300, y: 0 },
      ],
      edges: [
        { from: 2, to: 1, label: "a" },
        { from: 1, to: 0, label: "b" },
      ],
    },
  };
  var teste2 = {
    counter: 0,
    graph: {nodes: [], edges: [],},
  };
  ordenacaoTopologica(teste, teste2);*/

  return (
    <>
      <Flex direction={'row'} justifyItems={'flex-start'}>
        {props.aba === 'grafo' ? (
          <>
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
          </>
        ) : (
          <></>
        )}

        {/*
        {props.aba === 'ordenacao' ? (
          
          <Button
            onClick= {ordenacaoTopologica(state)}
            marginEnd={4}
            size="sm"
            color="white"
            leftIcon={<ViewIcon/>}
            fontFamily={Fontes.principal}
            fontWeight={400}
            bgColor="rgba(255,255,255,0.05)"
            _hover={{ bg: Cores.dark_purple_2 }}
            _active={{
              bg: Cores.purple_mountain_majesty,
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
          >
            Visualizar
          </Button>
        ) : (
          <></>
        )}*/}
      </Flex>
      <div ref={container} style={{ height: '100%', width: '100%' }} />
    </>
  );
};

export default GraphView;
