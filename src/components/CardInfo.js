import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Center,
  HStack,
  Flex,
  Select,
  Text,
} from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import { Fontes } from '../assets/Fontes';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';

export function viewCard(title, info, visible) {
  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        visibility={visible}
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        mb="1"
      >
        {title}
      </Box>
      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelectionAresta(
  title,
  info,
  grafo,
  existeAresta,
  setExisteAresta,
  orientacao
) {
  const handleChangeOrigem = event => {
    if (event.target.value !== '') {
      setExisteAresta([parseInt(event.target.value), existeAresta[1]]);
    } else {
      setExisteAresta(['', existeAresta[1]]);
    }
  };
  const handleChangeDestino = event => {
    if (event.target.value !== '') {
      setExisteAresta([existeAresta[0], parseInt(event.target.value)]);
    } else {
      setExisteAresta([existeAresta[0], '']);
    }
  };

  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        flexDirection={'column'}
      >
        {title}
        <Box mt="2" mb="3" display={'flex'} flexDirection={'row'}>
          <Select
            id="origem"
            placeholder="Origem"
            w="auto"
            h="auto"
            onChange={handleChangeOrigem}
            borderColor={Cores.amethyst}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;

              return (
                <option key={idVertice.toString()} value={idVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
          <Box
            alignSelf={'center'}
            h="0.5"
            w="15%"
            bgColor={Cores.lavender_floral}
            borderRadius="10"
          />

          {orientacao ? '>' : ''}

          <Select
            id="destino"
            placeholder="Destino"
            w="auto"
            h="auto"
            onChange={handleChangeDestino}
            borderColor={Cores.amethyst}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;
              return (
                <option key={idVertice.toString()} value={idVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
        </Box>
      </Box>
      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelectionGrau(
  title,
  info,
  grafo,
  setSelectGrauVertice
) {
  const handleChangeGrauVertice = event => {
    //setValue(event.target.value)
    console.log(event.target.value);
    if (event.target.value !== '') {
      setSelectGrauVertice(parseInt(event.target.value));
    } else {
      setSelectGrauVertice('');
    }
  };

  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        flexDirection={'column'}
      >
        {title}
        <Select
          id="vertice"
          placeholder="Vértice"
          w="auto"
          h="auto"
          onChange={handleChangeGrauVertice}
          mt="2"
          mb="3"
          borderColor={Cores.amethyst}
        >
          {grafo.nodes.map(value => {
            const idVertice = value.id;
            const nomeVertice = value.label;

            return (
              <option key={idVertice.toString()} value={idVertice}>
                {nomeVertice}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelectionAdj(title, info, grafo, setSelectAdj) {
  const handleChangeAdj = event => {
    //setValue(event.target.value)
    setSelectAdj(parseInt(event.target.value));
  };

  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        flexDirection={'column'}
      >
        {title}
        <Select
          id="vertice"
          placeholder="Vértice"
          w="auto"
          h="auto"
          onChange={handleChangeAdj}
          mt="2"
          mb="3"
          borderColor={Cores.amethyst}
        >
          {grafo.nodes.map(value => {
            const idVertice = value.id;
            const nomeVertice = value.label;

            return (
              <option key={idVertice.toString()} value={idVertice}>
                {nomeVertice}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelectionMenorCaminhoOrient(
  title,
  info,
  grafo,
  selectMenorCaminhoOrient,
  setSelectMenorCaminhoOrient
) {
  const handleChangeOrigem = event => {
    //setValue(event.target.value)
    setSelectMenorCaminhoOrient([
      event.target.value,
      selectMenorCaminhoOrient[1],
    ]);
  };
  const handleChangeDestino = event => {
    //setValue(event.target.value)
    setSelectMenorCaminhoOrient([
      selectMenorCaminhoOrient[0],
      event.target.value,
    ]);
  };

  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        flexDirection={'column'}
      >
        {title}
        <Box mt="2" mb="3" display={'flex'} flexDirection={'row'}>
          <Select
            id="origem"
            placeholder="Origem"
            w="auto"
            h="auto"
            onChange={handleChangeOrigem}
            borderColor={Cores.amethyst}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;

              return (
                <option key={idVertice.toString()} value={nomeVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
          <Box
            alignSelf={'center'}
            h="0.5"
            w="15%"
            bgColor={Cores.lavender_floral}
            borderRadius="10"
          />

          {'>'}
          <Select
            id="destino"
            placeholder="Destino"
            w="auto"
            h="auto"
            onChange={handleChangeDestino}
            borderColor={Cores.amethyst}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;
              return (
                <option key={idVertice.toString()} value={nomeVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
        </Box>
      </Box>
      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardSelectionMenorCaminhoNaoOrient(
  title,
  info,
  grafo,
  selectMenorCaminhoNaoOrient,
  setSelectMenorCaminhoNaoOrient
) {
  const handleChangeOrigem = event => {
    //setValue(event.target.value)
    setSelectMenorCaminhoNaoOrient([
      event.target.value,
      selectMenorCaminhoNaoOrient[1],
    ]);
  };
  const handleChangeDestino = event => {
    //setValue(event.target.value)
    setSelectMenorCaminhoNaoOrient([
      selectMenorCaminhoNaoOrient[0],
      event.target.value,
    ]);
  };

  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        flexDirection={'column'}
      >
        {title}
        <Box mt="2" mb="3" display={'flex'} flexDirection={'row'}>
          <Select
            id="origem"
            placeholder="Origem"
            w="auto"
            h="auto"
            borderColor={Cores.amethyst}
            onChange={handleChangeOrigem}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;

              return (
                <option key={idVertice.toString()} value={nomeVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
          <Box
            alignSelf={'center'}
            h="0.5"
            w="15%"
            bgColor={Cores.lavender_floral}
            borderRadius="10"
          />
          <Select
            id="destino"
            placeholder="Destino"
            w="auto"
            h="auto"
            onChange={handleChangeDestino}
            borderColor={Cores.amethyst}
          >
            {grafo.nodes.map(value => {
              const idVertice = value.id;
              const nomeVertice = value.label;
              return (
                <option key={idVertice.toString()} value={nomeVertice}>
                  {nomeVertice}
                </option>
              );
            })}
          </Select>
        </Box>
      </Box>
      <Box display={'flex'} fontSize={14} fontWeight="regular">
        {info}
      </Box>
    </Flex>
  );
}

export function viewCardList(title, infoList, visible) {
  console.log(infoList);
  return (
    <Flex
      h="auto"
      w="auto"
      direction={'column'}
      flex={[1, 0, 'auto']}
      justify={'stretch'}
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
        visibility={visible}
        display={'flex'}
        width="100%"
        fontSize={15}
        fontWeight="bold"
        textColor={Cores.lavender_floral}
        fontFamily={Fontes.principal}
        mb="1"
      >
        {title}
      </Box>
      <Box
        display={'flex'}
        fontSize={14}
        fontWeight="regular"
        flexDirection={'column'}
      >
        {infoList.map(info => (
          <Box mb="0.5">{info}</Box>
        ))}
      </Box>
    </Flex>
  );
}
