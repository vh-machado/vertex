import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack, Flex } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import {Fontes} from '../assets/Fontes';

export function viewCard(title, info) {
    return (
      <Flex
      h="auto"
      w="auto"
      direction={"column"}
      flex={[1, 0, "auto"]}
      justify={"stretch"}
      margin={2}
      borderRadius={10}
      borderWidth="0px"
      borderColor={Cores.amethyst_2}
      textColor={Cores.middle_Yellow}
      background={Cores.russian_violet}
      boxShadow="lg"
      p="6"
      rounded="md"
      textAlign="start"
      paddingLeft={3}
      paddingRight={3}
      paddingTop={3}
      paddingBottom={3}
      fontFamily={Fontes.principal}
    >
      <Box
        display={"flex"}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.textoCardResultados}
        fontFamily={Fontes.principal}
      >
        {title}
      </Box>
      <Box display={"flex"} fontSize={12} fontWeight="bold">
        {info}
      </Box>
    </Flex>
    );
  }
  
  