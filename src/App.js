import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Center,
  HStack,
} from '@chakra-ui/react';
import { Cores } from './assets/Cores';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bgColor={Cores.rich_black_fogra_39}>
        <Center minH="100vh">
          <HStack spacing={0} bgColor={Cores.dark_purple} borderRadius={40} h="90vh" w="90vw" shadow={"2xl"}>
            <Box
              h="100%"
              w="10vw"
              bgColor={Cores.amethyst_2}
              borderRadius={40}
            />
            <Box
              h="100%"
              w="55vw"
            />
            <Box
                h="100%"
                w="25vw"
                bgColor={Cores.dark_purple_2}
                borderTopEndRadius={40}
                borderBottomEndRadius={40}
              />
            {/* 
            <VStack h="100%" w="20vw" bgColor={"red"}>
              <Box
                h="auto"
                w="100%"
                bgColor={Cores.dark_purple_2}
                borderRadius={40}
              />
              <Box
                h="auto"
                w="100%"
                bgColor={Cores.dark_purple_2}
                borderRadius={40}
              />
              <Box
                h="auto"
                w="100%"
                bgColor={Cores.dark_purple_2}
                borderRadius={40}
              />
            </VStack>
            */}
          </HStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
