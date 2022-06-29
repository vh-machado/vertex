import React, { useState } from 'react';
import { ChakraProvider, Box, theme, Center, HStack, Flex } from '@chakra-ui/react';
import { Cores } from './assets/Cores';
import GraphTabs from './components/GraphTabs';
import GraphResults from './components/GraphResults';
import Menu from './components/Menu';
function App() {

  const [orientacao, setOrientacao] = useState(true);

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
              <Menu orientacao={orientacao} setOrientacao={setOrientacao}/>
            </Box>
            <Box h="100%" w="55vw">
              {/* Componente do meio */}
              <GraphTabs orientacao={orientacao}/>
            </Box>

            <Flex
              h="100%"
              w="25vw"
              flex={1}
              flexDirection={"row"}
              flexWrap='wrap'
              bgColor={Cores.dark_purple_2}
              borderTopEndRadius={40}
              borderBottomEndRadius={40}
              padding={2}
              alignItems='stretch'
              alignContent={'flex-start'}
              justifyItems='stretch'
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                  
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                  marginTop: '30px',
                  marginBottom: '30px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: Cores.textoCardResultados,
                  borderRadius: '24px',
                },
              }}
            >
              <GraphResults/>
              {/* Componente da direita */}

            </Flex>
          </HStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
