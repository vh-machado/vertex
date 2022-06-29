import React from 'react';
//import { Cores } from '../assets/Cores';
import {viewCard, viewCardSelection} from '../components/CardInfo';
import {algoritmosGrafos} from '../Algoritmos/funcoesBasicas'
import { Select } from '@chakra-ui/react'
import { dijkstra } from '../Algoritmos/dijkstra';
import { criaMatrizAdjacencia } from '../Algoritmos/criaMatrizAdjacencia'


const teste = new algoritmosGrafos()
var algDijkstra = new dijkstra()



var state = {
  counter: 5,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
      { id: 5, label: 'E', x: 0, y: 10 },
      { id: 6, label: 'F', x: 0, y: 10 },
    ],
    edges: [
      { from: 1, to: 2, label: 3 },
      { from: 1, to: 3, label: 5 },
      { from: 2, to: 3, label: 1 },
      { from: 3, to: 2, label: 3 },
      { from: 3, to: 4, label: 9 },
      { from: 4, to: 2, label: 4 },
      { from: 4, to: 6, label: 6},
    ],
  },
};

const origem = state.graph.edges[0].from
const destino = state.graph.edges[1].to
const vertice = state.graph.nodes[0]
const grafo = state.graph

const resultadoAresta = teste.procuraAresta(origem, destino, grafo);
const grauVertice = teste.calcularGrau(grafo, vertice.id, 'nao_orientado');
const adjacenciasVertice = teste.recuperarAdjacencias(grafo, vertice.id,'nao_orientado');
const resultadoConexo = teste.eConexo(grafo);
const resultadoCiclico = teste.possuiCiclo(grafo, vertice.id, grafo.nodes[5].id)


const resulatdoDijkstra = algDijkstra.dijkstra(criaMatrizAdjacencia(grafo.nodes, grafo.edges))
const resultadoMenorCaminho = resulatdoDijkstra.path.toString();
const resultadoMenorCusto = resulatdoDijkstra.distance;


const resultadoFrConexo = "Sim";
const resultadoUnConexo = "Não";
const resultadoFoConexo = "Não";

const resultadoPlanar = "Sim";
const resultadoEuleriano = "Não";


const c = console.log()



function GraphResults() {
  return (
  
    <>
    {viewCardSelection('Existe a Aresta ', resultadoAresta, grafo)}
    {viewCard('Grau do Vértice '+ vertice.label, grauVertice)}
    {viewCard('Adjacentes do Vértice '+ vertice.label, adjacenciasVertice.toString())}
    {viewCard('Grafo não-orientado Conexo?', resultadoConexo)}
    {viewCard('Ordenação Topológica:', 'teste')}
    {viewCard('Dígrafo Fracamente Conexo?', resultadoFrConexo)}
    {viewCard('Componentes Fortes:', 'A-B-C')}
    {viewCard('Dígrafo Unilateralmente Conexo?', resultadoUnConexo)}
    {viewCard('Dígrafo Fortemente Conexo?', resultadoFoConexo)}
    {viewCard('Grafo Planar?', resultadoPlanar)}
    {viewCard('Grafo Euleriano?', resultadoEuleriano)}
    {viewCard('Menor Caminho:', resultadoMenorCaminho)}
    {viewCard('Menor Custo:', resultadoMenorCusto)}
    {viewCard('Grafo Ciclico:', resultadoCiclico.toString())}
    
    </>
  );
}
export default GraphResults;
