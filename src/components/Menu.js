import React, { useEffect } from 'react';
import { Cores } from '../assets/Cores';
import {
  VStack,
  useDisclosure,
  useRadioGroup,
  useRadio,
  Box,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { render } from '@testing-library/react';
import { Fontes } from '../assets/Fontes';


function Menu(props) {
  //const { isOpenGerar, onOpenGerar, onCloseGerar } = useDisclosure();

  // 1. Create a component that consumes the `useRadio` hook
  function RadioCard(propsradio) {
    const { getInputProps, getCheckboxProps } = useRadio(propsradio);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label" flex={[1, 0, 'auto']} w="100%">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          color={Cores.russian_violet}
          borderColor={Cores.russian_violet}
          borderWidth="2px"
          borderRadius="md"
          boxShadow="sm"
          fontSize={14}
          fontFamily={Fontes.principal}
          fontWeight={600}
          justifyContent={'center'}
          _checked={{
            variant: 'outline',
            color: 'white',
            borderColor: Cores.lavender_floral,
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={2}
          py={2}
        >
          {propsradio.children}
        </Box>
      </Box>
    );
  }

  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  function TipoGrafo() {
    const options = ['Orientado', 'Não Orientado'];

    const { value, getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: props.orientacao == true ? 'Orientado' : 'Não Orientado',
      onChange: () => props.setOrientacao(!props.orientacao),
    });
    const group = getRootProps();
    return (
      <VStack {...group} fontSize="14">
        {options.map(value => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </VStack>
    );
  }

  let [textValue, setTextValue] = useState('');
  let [isInvalid, setIsInvalid] = useState(false);
  var texto;

  let handleTextChange = e => {
    let inputValue = e.target.value;
    setTextValue(inputValue);
  };

  let onSave = () => {
    texto = textValue.replace(/\n\r?/g, '/');
    texto = texto.replace(/\s/g, '_');

    var arestas = texto.split('/');
    var vertices = new Set();

    var listaVertices = new Array();
    var listaArestas = new Array();
    var contador = 0;

    //console.log(arestas)

    arestas.forEach(a => {
      var verticesDivididos = a.split('_');
      vertices.add(verticesDivididos[0]);
      if (verticesDivididos[1] !== undefined) {
        vertices.add(verticesDivididos[1]);
      }
    });

    vertices.forEach(v => {
      contador++;
      listaVertices = [
        ...listaVertices,
        {
          id: contador,
          label: v,
          x: 0,
          y: 0,
        },
      ];
    });

    arestas.forEach(a => {
      if (a.length > 1) {
        var conexao = a.split('_');
        listaArestas = [
          ...listaArestas,
          {
            from: listaVertices.find(v => v.label === conexao[0]).id,
            to: listaVertices.find(v => v.label === conexao[1]).id,
            label: conexao.length === 3 ? conexao[2] : '',
          },
        ];
      }
    });

    console.log('novos vértices');
    console.log(listaVertices);
    console.log('novas arestas');
    console.log(listaArestas);

    var newState = {
      counter: contador,
      graph: {
        nodes: listaVertices,
        edges: listaArestas,
      },
    };
    console.log('novo grafo');
    console.log(newState);

    props.setGraphData(newState);
  };

  return (
    <VStack
      spacing={5}
      align="stretch"
      justify="flex-end"
      w="100%"
      h="100%"
      padding={2}
      pb={10}
      pt={10}
      bgColor={Cores.amethyst_2}
      borderRadius={35}
    >
      <Textarea
        isInvalid={isInvalid}
        _invalid={{ borderColor: 'red', borderWidth: 2 }}
        bgColor={'white'}
        color={Cores.russian_violet}
        fontFamily={Fontes.principal}
        fontWeight={400}
        fontSize={18}
        size="sm"
        value={textValue}
        onChange={handleTextChange}
        resize="none"
        flex={[1, 0, 'auto']}
      ></Textarea>

      <Button
        onClick={() => {
          onSave();
          props.setCardsVisiveis(true);
        }}
        textColor="white"
        size="xs"
        h="12%"
        borderRadius={20}
        fontSize="15"
        fontFamily={Fontes.principal}
        fontWeight={600}
        bgColor={Cores.russian_violet}
        _hover={{ bg: Cores.dark_purple_2 }}
        _active={{
          bg: Cores.purple_dark_purple,
          transform: 'scale(0.98)',
        }}
        _focus={{
          boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        Salvar
      </Button>

      <TipoGrafo />

      {/*
      <Button
        onClick={() => }
        textColor="white"
        size="xs"
        h="12%"
        borderRadius={20}
        fontSize="15"
        fontFamily={Fontes.principal}
        fontWeight={600}
        bgColor={Cores.russian_violet}
        _hover={{ bg: Cores.dark_purple_2 }}
        _active={{
          bg: Cores.purple_dark_purple,
          transform: 'scale(0.98)',
        }}
        _focus={{
          boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        Gerar
      </Button>
      */}
    </VStack>
  );
}

export default Menu;
