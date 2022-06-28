import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack, Flex, Select } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import { Fontes } from '../assets/Fontes';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';

const options = []
const idOptions = []
const contador = 0


function criaListaOpcoes(grafo) {
  grafo.nodes.forEach(vertice => {
    if (options.length != grafo.nodes.length) {
      idOptions.push(vertice.id)
      options.push(vertice.label)
    }
  });
}

function criaListaVertices(grafo) {
  grafo.nodes.map(function (item, indice) {
      return (<option value={indice}>{item.label}</option>)
    })
  }




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
      textColor={'white'}
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
        fontWeight="semibold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
      >
        {title}
      </Box>
      <Box display={"flex"} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelection(title, info, grafo) {
  {/*console.log(criaListaVertices(grafo))*/}
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
       {/* <Select
          placeholder='Origem'
          w='auto'
          h='auto'>
          {criaListaVertices(grafo)}
       </Select>
        {'-'}
        <Select placeholder='Destino'
          w='auto'
          h='auto'>
          {criaListaVertices(grafo)}
  </Select>*/}
      </Box>
      <Box display={"flex"} fontSize={12} fontWeight="bold">
        {info}
      </Box>
    </Flex>
  );
}
