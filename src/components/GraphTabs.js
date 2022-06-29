import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  theme,
} from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import GraphView from './GraphView';
import { Fontes } from '../assets/Fontes';
import verificaEuleriano from '../Algoritmos/verificaEuleriano';
import verificaBiconexo from '../Algoritmos/verificaBiconexo';
import ordenacaoTopologica from '../Algoritmos/ordenacaoTopologica';


const orientacao = true;

function GraphTabs(props) {
  var initialGraphData = {
    counter: 0,
    graph: {
      nodes: [
        /*
        { id: 1, label: 'Node 1', color: Cores.lavender_floral, x: 200, y: 0 },
        { id: 2, label: 'Node 2', color: Cores.lavender_floral, x: 50, y: 250 },
        { id: 3, label: 'Node 3', color: Cores.lavender_floral, x: 300, y: 0 },
        { id: 4, label: 'Node 4', color: Cores.lavender_floral, x: 90, y: 100 },
        { id: 5, label: 'Node 5', color: Cores.lavender_floral, x: 0, y: 10 },*/
      ],
      edges: [
        /*
        { from: 1, to: 2, label: "" },
        { from: 1, to: 3, label: "" },
        { from: 2, to: 4, label: "" },
        { from: 2, to: 5, label: "" },
        */
      ],
    },
  };

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
        { id: 7, label: 'G', x: 200, y: 0 },

      ],
      edges: [
        { from: 1, to: 2, label: "7" },
        { from: 4, to: 1, label: "5" },
        { from: 4, to: 2, label: "9" },
        { from: 2, to: 3, label: "8" },
        { from: 2, to: 5, label: "7" },
        { from: 3, to: 5, label: "5" },
        { from: 4, to: 5, label: "15" },
        { from: 4, to: 6, label: "6" },
        { from: 6, to: 5, label: "8" },
        { from: 6, to: 7, label: "11" },
        { from: 5, to: 7, label: "9" },
      ],
    },
  };

  var teste2 = {
    counter: 6,
    graph: {
      nodes: [
        { id: 1, label: '0', x: 200, y: 0 },
        { id: 2, label: '1', x: 50, y: 250 },
        { id: 3, label: '2', x: 300, y: 0 },
        { id: 4, label: '3', x: 300, y: 0 },
        { id: 5, label: '4', x: 200, y: 0 },
        { id: 6, label: '5', x: 50, y: 250 },

      ],
      edges: [
        { from: 1, to: 2, label: "6" },
        { from: 1, to: 4, label: "5" },
        { from: 1, to: 3, label: "1" },
        { from: 3, to: 2, label: "2" },
        { from: 3, to: 4, label: "2" },
        { from: 3, to: 5, label: "6" },
        { from: 3, to: 6, label: "4" },
        { from: 2, to: 5, label: "5" },
        { from: 5, to: 6, label: "3" },
        { from: 4, to: 6, label: "4" },
      ],
    },
  };

  var teste3 = {
    counter: 3,
    graph: {
      nodes: [
        { id: 1, label: 'A', x: 200, y: 0 },
        { id: 2, label: 'B', x: 50, y: 250 },
        { id: 3, label: 'C', x: 300, y: 0 },
      ],
      edges: [
        { from: 1, to: 2, label: "" },
        { from: 2, to: 3, label: "" },
      ],
    },
  };

  const [graphData, setGraphData] = useState(initialGraphData);
  var grafoOrdenado = initialGraphData;
  var grafoArvore = initialGraphData;
  var custoAGM = 0;

  const childToParent = childData => {
    setGraphData(childData);
    grafoOrdenado = ordenacaoTopologica(graphData);
    
    //var resultadoAGM = {};
    //resultadoAGM = arvoreGeradoraMinima(teste);

    //verificaConexidade(teste3);
    //verificaEuleriano(graphData.graph.nodes, graphData.graph.edges);
    //verificaBiconexo(graphData.graph.nodes, graphData.graph.edges);
  };


  /*
  const nodes = [
    { id: 1, label: ' A ', color: colorNode },
    { id: 2, label: ' B ', color: colorNode },
    { id: 3, label: ' C ', color: colorNode },
    { id: 4, label: ' D ', color: colorNode },
    { id: 5, label: ' E ', color: colorNode },
    { id: 6, label: ' F ', color: colorNode },
    { id: 7, label: ' G ', color: colorNode },
    { id: 8, label: ' H ', color: colorNode },
    { id: 9, label: ' I ', color: colorNode },
    { id: 10, label: ' J ', color: colorNode },
  ];
  const edges = [
    { from: 1, to: 6 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 9 },
    { from: 2, to: 4 },
    { from: 3, to: 1 },
    { from: 3, to: 5 },
    { from: 3, to: 7 },
    { from: 4, to: 1 },
    { from: 4, to: 2 },
    { from: 4, to: 10 },
    { from: 5, to: 2 },
    { from: 5, to: 3 },
    { from: 5, to: 8 },
    { from: 6, to: 1 },
    { from: 6, to: 9 },
    { from: 6, to: 8 },
    { from: 7, to: 3 },
    { from: 7, to: 9 },
    { from: 7, to: 10 },
    { from: 8, to: 5 },
    { from: 8, to: 6 },
    { from: 8, to: 10 },
    { from: 9, to: 2 },
    { from: 9, to: 6 },
    { from: 9, to: 7 },
    { from: 10, to: 4 },
    { from: 10, to: 8 },
    { from: 10, to: 7 },
  ];

  const nodes2 = [
    { id: 1, label: ' A ', color: colorNode },
    { id: 2, label: ' B ', color: colorNode },
    { id: 3, label: ' C ', color: colorNode },
  ];
  const edges2 = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 1, to: 3 },
  ];
  */

  return (
    <Tabs isLazy variant="unstyled" size="sm" h="100%" p="8">
      <TabPanels h="92%">
        <TabPanel h="100%" w="100%">
          <GraphView
            aba={'grafo'}
            state={graphData}
            childToParent={childToParent}
            orientado={props.orientacao}
            hierarquico={false}
            curva={false}
          ></GraphView>
        </TabPanel>
        {/*
        <TabPanel h="100%" w="100%">
          <GraphView
            aba={'ordenacao'}
            state={grafoOrdenado}
            childToParent={childToParent}
            orientado={true}
            hierarquico={true}
            curva={true}
          ></GraphView>
        </TabPanel>
        <TabPanel h="100%" w="100%">
          <GraphView
            aba={'agm'}
            state={grafoArvore}
            childToParent={childToParent}
            orientado={false}
            hierarquico={false}
            curva={true}
          ></GraphView>
        </TabPanel>
        */}
      </TabPanels>
      <TabList h="8%" fontFamily={Fontes.principal} theme={theme}>
        <Tab
          flex={[1, 0, 'auto']}
          borderBottomWidth={2}
          color={Cores.mauve}
          borderColor={'rgba(158, 150, 150, 0.05)'}
          _selected={{
            color: Cores.amethyst,
            borderColor: Cores.amethyst,
          }}
          fontWeight={400}
          fontSize={14}
        >
          Grafo
        </Tab>
        {/*
        <Tab
          flex={[1, 0, 'auto']}
          borderBottomWidth={2}
          color={Cores.mauve}
          borderColor={'rgba(158, 150, 150, 0.05)'}
          _selected={{
            color: Cores.amethyst,
            borderColor: Cores.amethyst,
          }}
          fontWeight={400}
          fontSize={14}
        >
          Ordenação Topológica
        </Tab>
        <Tab
          flex={[1, 0, 'auto']}
          borderBottomWidth={2}
          color={Cores.mauve}
          borderColor={'rgba(158, 150, 150, 0.05)'}
          _selected={{
            color: Cores.amethyst,
            borderColor: Cores.amethyst,
          }}
          fontWeight={400}
          fontSize={14}
        >
          Ciclo Euleriano
        </Tab>
        <Tab
          flex={[1, 0, 'auto']}
          borderBottomWidth={2}
          color={Cores.mauve}
          borderColor={'rgba(158, 150, 150, 0.05)'}
          _selected={{
            color: Cores.amethyst,
            borderColor: Cores.amethyst,
          }}
          fontWeight={400}
          fontSize={14}
        >
          Menor Caminho
        </Tab>
        <Tab
          flex={[1, 0, 'auto']}
          borderBottomWidth={2}
          color={Cores.mauve}
          borderColor={'rgba(158, 150, 150, 0.05)'}
          _selected={{
            color: Cores.amethyst,
            borderColor: Cores.amethyst,
          }}
          fontWeight={400}
          fontSize={14}
        >
          Árvore Geradora Mínima
        </Tab>
        */}
      </TabList>
    </Tabs>
  );
}
export default GraphTabs;
