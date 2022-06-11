import React from 'react';
import { ChakraProvider, Box, theme, Center, HStack } from '@chakra-ui/react';
import { Cores } from '../assets/Cores';
import {viewCard} from '../components/CardInfo';

const resultadoAresta = "Sim";
const grauVertice = "3";
const adjacenciasVertice = ['a ', 'b ', 'e ', 'd '];
const resultadoConexo = "Sim";
const resultadoFrConexo = "Sim";
const resultadoUnConexo = "Não";
const resultadoFoConexo = "Não";
const resultadoCiclico = "Sim";
const resultadoPlanar = "Sim";
const resultadoEuleriano = "Não";
const resultadoMenorCaminho = ['a', 'b', 'e', 'd'];
const resultadoMenorCusto = '80';





function GraphResults() {
  return (
    <>
    {viewCard('Existe a Aresta X?', resultadoAresta)}
    {viewCard('Grau do Vértice X?', grauVertice)}
    {viewCard('Adjacentes do Vértice X?', adjacenciasVertice)}
    {viewCard('Grafo não-orientado Conexo?', resultadoConexo)}
    {viewCard('Dígrafo Fracamente Conexo?', resultadoFrConexo)}
    {viewCard('Dígrafo Unilateralmente Conexo?', resultadoUnConexo)}
    {viewCard('Dígrafo Fortemente Conexo?', resultadoFoConexo)}
    {viewCard('Grafo Planar?', resultadoPlanar)}
    {viewCard('Grafo Euleriano?', resultadoEuleriano)}
    {viewCard('Menor Caminho:', resultadoMenorCaminho)}
    {viewCard('Menor Custo:', resultadoMenorCusto)}
    </>
  );
}
export default GraphResults;
