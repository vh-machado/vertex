import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack, Flex } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';

export function viewCard(title, info) {
    return (
      <Box
          h="auto"
          w="auto"
          margin={2}
          borderRadius={10}
          borderWidth='0px'
          borderColor={Cores.amethyst_2}
          textColor={Cores.middle_Yellow}
          background={Cores.russian_violet}
          boxShadow='lg' 
          p='6' 
          rounded='md' 
          textAlign="start"
          paddingLeft={3}
          paddingRight={3}
          paddingTop={3}
          paddingBottom={3}>
          <Box 
          fontSize = {15}
          fontWeight = 'bold'
          textColor = {Cores.textoCardResultados}>
            {title}
          </Box>
          <Box 
          fontSize = {12}
          fontWeight = 'bold'>
            {info}
          </Box>
      </Box>
    );
  }
  
  