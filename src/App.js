import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Center,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Cores } from './assets/Cores';
import GraphResults from './components/GraphResults';
import Menu from './components/Menu';
import GraphView from './components/GraphView';

function App() {
  var initialGraphData = {
    counter: 0,
    graph: {
      nodes: [
        /*
        { id: 1, label: 'Node 1', x: 200, y: 0 },
        { id: 2, label: 'Node 2', x: 50, y: 250 },
        { id: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, label: 'Node 4', x: 90, y: 100 },
        { id: 5, label: 'Node 5', x: 0, y: 10 },*/
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

  const [orientacao, setOrientacao] = useState(true);
  const [graphData, setGraphData] = useState(initialGraphData);
  const [cardsVisiveis, setCardsVisiveis] = useState(false);

  const childToParent = childData => {
    setGraphData(childData);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bgColor={Cores.rich_black_fogra_39}>
        <Center minH="100vh">
          <HStack
            spacing={0}
            bgColor={Cores.dark_purple}
            borderRadius={40}
            h="90vh"
            w="90vw"
            shadow={'2xl'}
          >
            <Box h="100%" w="10vw" borderRadius={40} p={2}>
              {/* Componente da esquerda */}
              <Menu
                orientacao={orientacao}
                setOrientacao={setOrientacao}
                cardsVisiveis={cardsVisiveis}
                setCardsVisiveis={setCardsVisiveis}
                setGraphData={setGraphData}
              />
            </Box>
            <Box h="100%" w="55vw">
              {/* Componente do meio */}
              <GraphView
                state={graphData}
                orientado={orientacao}
                childToParent={childToParent}
                hierarquico={false}
                curva={false}
              ></GraphView>
            </Box>

            <Flex
              h="100%"
              w="25vw"
              flex={1}
              flexDirection={'row'}
              flexWrap="wrap"
              bgColor={Cores.dark_purple_2}
              borderTopEndRadius={40}
              borderBottomEndRadius={40}
              padding={2}
              alignItems="stretch"
              alignContent={'flex-start'}
              justifyItems="stretch"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                  marginTop: '30px',
                  marginBottom: '30px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: Cores.textoCardResultados,
                  borderRadius: '24px',
                },
              }}
            >
              {/* Componente da direita */}
              {cardsVisiveis ? (
                <GraphResults orientacao={orientacao} state={graphData}/>
              ) : (
                <></>
              )}
            </Flex>
          </HStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
