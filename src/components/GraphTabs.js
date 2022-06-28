import React, { useState, useEffect } from 'react';
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
import ordenacaoTopologica from '../Algoritmos/ordenacaoTopologica';

const orientacao = true;
const colorNode = Cores.lavender_floral;

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

  /*
  var ordenado = {
    counter: 0,
    graph: {nodes: [], edges: []},
  };*/

  const [graphData, setGraphData] = useState(initialGraphData);
  var grafoOrdenado = initialGraphData;
  //const [sortGraph, setSortGraph] = useState(ordenado);

  const childToParent = childData => {
    setGraphData(childData);
    grafoOrdenado = ordenacaoTopologica(graphData)
    //setSortGraph(ordenacaoTopologica(childData));
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
            orientado={orientacao}
            hierarquico={false}
            curva={false}
          ></GraphView>
        </TabPanel>
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
      </TabList>
    </Tabs>
  );
}
export default GraphTabs;
