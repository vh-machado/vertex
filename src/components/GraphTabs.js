import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import GraphView from './GraphView';
import { Cores } from '../assets/Cores';

const orientacao = false;
const colorNode = Cores.lavender_floral;
const nodesEntrada = [
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
const edgesEntrada = [
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

const nodesEntrada2 = [
  { id: 1, label: ' A ', color: colorNode },
  { id: 2, label: ' B ', color: colorNode },
  { id: 3, label: ' C ', color: colorNode },
];
const edgesEntrada2 = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 1, to: 3 }
];

function GraphTabs(props) {
  return (
    <Tabs isLazy size="sm" variant="line" h="100%" p="8" colorScheme={'purple'}>
      <TabPanels h="92%">
        <TabPanel h="100%" w="100%">
          <GraphView
            orientado={orientacao}
            hierarquico={false}
            nodes={nodesEntrada}
            edges={edgesEntrada}
            curva={false}
          ></GraphView>
        </TabPanel>
        <TabPanel h="100%" w="100%">
          <GraphView
            orientado={true}
            hierarquico={true}
            nodes={nodesEntrada2}
            edges={edgesEntrada2}
            curva={true}
          ></GraphView>
        </TabPanel>
      </TabPanels>
      <TabList h="8%">
        <Tab>Grafo</Tab>
        <Tab>Ordenação Topológica</Tab>
        <Tab>Ciclo Euleriano</Tab>
        <Tab>Menor Caminho</Tab>
        <Tab>Árvore Geradora Mínima</Tab>
      </TabList>
    </Tabs>
  );
}
export default GraphTabs;
