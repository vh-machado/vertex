import React from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useFocusEffect,
} from '@chakra-ui/react';
import GraphView from './componentes/GraphView';
import { useSelector } from 'react-redux';
import { selectGrafo } from '../../servicos/grafoSlice';
import { useEffect } from 'react';

export default function GraphTabs() {
  var { graphData, orientado } = useSelector(selectGrafo);

  var { principal, classificacao, dijkstra, agm } = graphData;

  useEffect(() => {});

  return (
    <Tabs
      isLazy
      size="sm"
      variant="line"
      h="100%"
      p="8"
      color={'white'}
      colorScheme={'purple'}
    >
      <TabPanels h="92%">
        <TabPanel h="100%" w="100%">
          {principal.counter > 0 && (
            <GraphView
              graph={principal.graph}
              orientado={orientado}
              hierarquico={false}
              curva={true}
            />
          )}
        </TabPanel>
        <TabPanel h="100%" w="100%">
          {classificacao.counter > 0 && (
            <GraphView
              graph={classificacao.graph}
              orientado={orientado}
              hierarquico={false}
              curva={true}
            />
          )}
        </TabPanel>
        <TabPanel h="100%" w="100%">
          {dijkstra.counter > 0 && (
            <GraphView
              graph={dijkstra.graph}
              orientado={orientado}
              hierarquico={false}
              curva={true}
            />
          )}
        </TabPanel>
        <TabPanel h="100%" w="100%">
          {agm.counter > 0 && (
            <GraphView
              graph={agm.graph}
              orientado={orientado}
              hierarquico={false}
              curva={true}
            />
          )}
        </TabPanel>
      </TabPanels>
      <TabList h="8%">
        <Tab>Grafo</Tab>
        <Tab>Classificação</Tab>
        <Tab>Dijkstra</Tab>
        <Tab>AGM</Tab>
      </TabList>
    </Tabs>
  );
}
