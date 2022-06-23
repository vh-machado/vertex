import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';

export function viewCard(title, info) {
    return (
      <Box
          hmin = "10%"
          h="auto"
          w="95%"
          flexWrap={'wrap'}
          marginTop={5}
          marginLeft={1.5}
          borderRadius={10}
          borderWidth='1px'
          borderColor={Cores.amethyst_2}
          textColor={Cores.middle_Yellow}
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
  
  