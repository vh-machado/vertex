import React, { useEffect, useState } from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { Fontes } from '../../assets/Fontes';
import { Cores } from '../../assets/Cores';
import {
  mudarTipo,
  selectGrafo,
  setGrafoAGM,
  setGrafoDijkstra,
  setGrafoPrincipal,
} from '../../servicos/grafoSlice';
import EscolhaTipoGrafo from './componentes/EscolhaTipoGrafo';
import EntradaGrafo from './componentes/EntradaGrafo';

function Menu(props) {
  const dispatch = useDispatch();
  const { graphData, orientado } = useSelector(selectGrafo);

  useEffect(() => {
    console.log('selectGrafo = ', { orientado, graphData });
  }, [graphData, orientado]);

  const [textValue, setTextValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isOrientado, setIsOrientado] = useState(orientado);

  var texto;

  let onSave = () => {
    texto = textValue.replace(/\n\r?/g, '/');
    texto = texto.replace(/\s/g, '_');

    var arestas = texto.split('/');
    var vertices = new Set();

    var listaVertices = [];
    var listaArestas = [];

    //console.log(arestas)

    arestas.forEach(a => {
      var verticesDivididos = a.split('_');
      vertices.add(verticesDivididos[0]);
      if (verticesDivididos[1] !== undefined) {
        vertices.add(verticesDivididos[1]);
      }
    });

    vertices.forEach(v => {
      var novoId =
        listaVertices.length === 0
          ? 1
          : listaVertices[listaVertices.length - 1].id + 1;
      listaVertices = [
        ...listaVertices,
        {
          id: novoId,
          label: v,
          x: 0,
          y: 0,
        },
      ];

      //dispatch(adicionarVertice(contador));
    });

    arestas.forEach(a => {
      if (a.length > 1) {
        var novoId =
          listaArestas.length === 0
            ? 1
            : listaArestas[listaArestas.length - 1].id + 1;
        var conexao = a.split('_');
        listaArestas = [
          ...listaArestas,
          {
            id: novoId,
            from: listaVertices.find(v => v.label === conexao[0]).id,
            to: listaVertices.find(v => v.label === conexao[1]).id,
            label: conexao.length === 3 ? conexao[2] : '',
          },
        ];

        /*
        dispatch(
          adicionarAresta({
            origem: listaVertices.find(v => v.label === conexao[0]).id,
            destino: listaVertices.find(v => v.label === conexao[1]).id,
            peso: conexao.length === 3 ? conexao[2] : '',
          })
        );*/
      }
    });

    var newState = {
      counter: listaVertices.length,
      graph: {
        nodes: listaVertices,
        edges: listaArestas,
      },
    };
    console.log('novo grafo');
    console.log(newState);
    console.log('orientacao:', isOrientado);

    dispatch(mudarTipo(isOrientado));
    dispatch(setGrafoPrincipal({ ...newState }));
    dispatch(setGrafoDijkstra({ counter: 0, graph: { nodes: [], edges: [] } }));
    dispatch(setGrafoAGM({ counter: 0, graph: { nodes: [], edges: [] } }));


    //props.setGraphData(newState);
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
      <EntradaGrafo {...{ textValue, setTextValue, isInvalid, setIsInvalid }} />
      <EscolhaTipoGrafo {...{ ...props, isOrientado, setIsOrientado }} />

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
    </VStack>
  );
}

export default Menu;
