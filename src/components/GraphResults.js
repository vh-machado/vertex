import React from 'react';
//import { Cores } from '../assets/Cores';
import {viewCard, viewCardSelection} from '../components/CardInfo';
import {algoritmosGrafos} from '../Algoritmos/funcoesBasicas'
import { Select } from '@chakra-ui/react'

const teste = new algoritmosGrafos()

var state = {
  counter: 5,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
      { id: 5, label: 'E', x: 0, y: 10 },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 5 },
      { from: 1, to: 4 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 4, to: 1}
    ],
  },
};

const origem = state.graph.edges[0].from
const destino = state.graph.edges[1].to
const vertice = state.graph.nodes[1]
const grafo = state.graph
const resultadoAresta = teste.procuraAresta(origem, destino, grafo);
const grauVertice = teste.calcularGrau(grafo, vertice.id, 'nao_orientado');
const adjacenciasVertice = teste.recuperarAdjacencias(grafo, vertice.id,'orientado');
console.log(adjacenciasVertice)


const resultadoConexo = "Sim";
const resultadoFrConexo = "Sim";
const resultadoUnConexo = "Não";
const resultadoFoConexo = "Não";
const resultadoCiclico = "Sim";
const resultadoPlanar = "Sim";
const resultadoEuleriano = "Não";
const resultadoMenorCaminho = ['a', 'b', 'e', 'd'];
const resultadoMenorCusto = '80';

const c = console.log()



function GraphResults() {
  /*console.log("teste aresta origem", origem)
  console.log("teste aresta destino", destino)
  console.log("teste aresta grafo", grafo)*/
  //console.log("teste aresta", resultadoAresta)
  return (
  
    <>
    {viewCardSelection('Existe a Aresta ', resultadoAresta, grafo)}
    {viewCard('Grau do Vértice '+ vertice.label, grauVertice)}
    {viewCard('Adjacentes do Vértice '+ vertice.label, adjacenciasVertice.toString())}
    {viewCard('Grafo não-orientado Conexo?', resultadoConexo)}
    {viewCard('Dígrafo Fracamente Conexo?', resultadoFrConexo)}
    {viewCard('Dígrafo Unilateralmente Conexo?', resultadoUnConexo)}
    {viewCard('Dígrafo Fortemente Conexo?', resultadoFoConexo)}
    {viewCard('Grafo Planar?', resultadoPlanar)}
    {viewCard('Grafo Euleriano?', resultadoEuleriano)}
    {viewCard('Menor Caminho:', resultadoMenorCaminho)}
    {viewCard('Menor Custo:', resultadoMenorCusto)}
    {viewCard('Grafo Ciclico:', resultadoCiclico)}
    
    </>
  );
}
export default GraphResults;
