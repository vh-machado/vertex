import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack } from '@chakra-ui/react';
import { Cores } from './assets/Cores';
import GraphTabs from './components/GraphTabs';

function App() {
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
            <Box
              h="100%"
              w="10vw"
              bgColor={Cores.amethyst_2}
              borderRadius={40}
            >
              {/* Componente da esquerda */}

            </Box>
            <Box h="100%" w="55vw">
              {/* Componente do meio */}
              <GraphTabs />
            </Box>
            <Box
              h="100%"
              w="25vw"
              bgColor={Cores.dark_purple_2}
              borderTopEndRadius={40}
              borderBottomEndRadius={40}
            >
              {/* Componente da direita */}

            </Box>
          </HStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
