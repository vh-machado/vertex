import React from 'react';
import { Box, Flex, Select } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import { Fontes } from '../assets/Fontes';

export function viewCard(key, title, info, visible) {
  return (
    <Flex
      key={key}
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
  orientado
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

          {orientado ? '>' : ''}

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

export function ViewCardSelectionProfundidadeOrigem(
  title,
  infoList,
  grafo,
  setSelectProfundidadeOrigem
) {
  const handleChangeOrigem = event => {
    console.log(event.target.value);
    setSelectProfundidadeOrigem(event.target.value);
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
        </Box>
      </Box>
      <Box
        display={'flex'}
        fontSize={14}
        fontWeight="regular"
        flexDirection={'column'}
      >
        {infoList.map((info, index) => (
          <Box key={index} mb="0.5">
            {info}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export function ViewCardSelectionAGMOrigem(
  title,
  infoList,
  grafo,
  setSelectAGMOrigem
) {
  const handleChangeOrigem = event => {
    console.log(event.target.value);
    setSelectAGMOrigem(event.target.value);
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
        </Box>
      </Box>
      <Box
        display={'flex'}
        fontSize={14}
        fontWeight="regular"
        flexDirection={'column'}
      >
        {infoList.map((info, index) => (
          <Box key={index} mb="0.5">
            {info}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export function ViewCardSelectionDijkstraOrigem(
  title,
  infoList,
  grafo,
  setSelectDijkstraOrigem
) {
  const handleChangeOrigem = event => {
    console.log(event.target.value);
    setSelectDijkstraOrigem(event.target.value);
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
        </Box>
      </Box>
      <Box
        display={'flex'}
        fontSize={14}
        fontWeight="regular"
        flexDirection={'column'}
      >
        {infoList.map((info, index) => (
          <Box key={index} mb="0.5">
            {info}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export function ViewCardSelectionMenorCaminho(
  title,
  info,
  grafo,
  selectMenorCaminho,
  setSelectMenorCaminho
) {
  const handleChangeOrigem = event => {
    //setValue(event.target.value)
    setSelectMenorCaminho({
      ...selectMenorCaminho,
      origem: event.target.value,
    });
  };
  const handleChangeDestino = event => {
    setSelectMenorCaminho({
      ...selectMenorCaminho,
      destino: event.target.value,
    });
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
        {infoList.map((info, index) => (
          <Box key={index} mb="0.5">
            {info}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
