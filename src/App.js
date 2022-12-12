import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Center,
  HStack,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import { Cores } from './assets/Cores';
import GraphResults from './dashboard/GraphResults';
import Menu from './dashboard/Menu';
import GraphTabs from './dashboard/GraphTabs/GraphTabs';


function App() {
  
  const [cardsVisiveis, setCardsVisiveis] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bgColor={Cores.rich_black_fogra_39}>
        <Center minH="100vh">
          <HStack
            spacing={0}
            bgColor={Cores.dark_purple}
            borderRadius={16}
            h="90vh"
            w="90vw"
            shadow={'2xl'}
          >
            <Box h="100%" w="10vw" borderRadius={16} p={2}>
              {/* Componente da esquerda */}
              <Menu
                cardsVisiveis={cardsVisiveis}
                setCardsVisiveis={setCardsVisiveis}
              />
            </Box>
            <Box h="100%" w="55vw">
              <GraphTabs/>
            </Box>

            <Flex
              h="100%"
              w="25vw"
              flex={1}
              flexDirection={'row'}
              flexWrap="wrap"
              bgColor={Cores.dark_purple_2}
              borderTopEndRadius={16}
              borderBottomEndRadius={16}
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
                <GraphResults />
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
