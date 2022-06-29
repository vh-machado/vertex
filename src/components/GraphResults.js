import React from 'react';
import {viewCard, viewCardSelection} from '../components/CardInfo';
import {algoritmosGrafos} from '../Algoritmos/funcoesBasicas'
import { dijkstra } from '../Algoritmos/dijkstra';
import { criaMatrizAdjacencia } from '../Algoritmos/criaMatrizAdjacencia';
import {planarity_test} from '../Algoritmos/planarFunction';

//Grafo de teste
let state = {
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

//Grafo K5 para teste de planaridade
var K5 = {
    nodes: [
      { id: 0, label: 'A', x: 200, y: 0 },
      { id: 1, label: 'B', x: 50, y: 250 },
      { id: 2, label: 'C', x: 300, y: 0 },
      { id: 3, label: 'D', x: 90, y: 100 },
      { id: 4, label: 'E', x: 0, y: 10 },
    ],
    edges: [
      { from: 0, to: 1, label: 3 },
      { from: 0, to: 2, label: 5 },
      { from: 0, to: 3, label: 1 },
      { from: 0, to: 4, label: 3 },
      { from: 1, to: 2, label: 9 },
      { from: 1, to: 3, label: 4 },
      { from: 1, to: 4, label: 6},
      { from: 2, to: 3, label: 9 },
      { from: 2, to: 4, label: 4 },
      { from: 3, to: 4, label: 6},
    ],
};

const teste = new algoritmosGrafos()//Cria objeto da classe algoritmosGrafos para realizar os testes e gerar os resultados
const algDijkstra = new dijkstra()//Cria objeto da classe dijkstra para aplicar o algoritmo

const origem = state.graph.edges[0].from // Usado no resultado de existe aresta
const destino = state.graph.edges[3].to // Usado no resultado de existe aresta
const vertice = state.graph.nodes[0]// Usado nos resultados que se escolhe um vértice
const grafo = state.graph //variável com o grafo para se pegar mais facilmente os nodes e as edges
const tamanhoListavertices = state.graph.nodes.length//tamanho da lista de vértices
const origemBFS = state.graph.nodes[0].label
const destinoBFS = state.graph.nodes[3].label

const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

//Implementados
const resultadoAresta = teste.procuraAresta(origem, destino, grafo);
const grauVertice = teste.calcularGrau(grafo, vertice.id, 'nao_orientado');
const adjacenciasVertice = teste.recuperarAdjacencias(grafo, vertice.id,'nao_orientado');
const resultadoConexo = teste.eConexo(grafo);
const resultadoCiclico = teste.possuiCiclo(grafo, vertice.id, grafo.nodes[5].id)
const resultadoPlanar = planarity_test(state.graph.nodes, state.graph.edges);
const resulatdoDijkstra = algDijkstra.dijkstra(criaMatrizAdjacencia(copia.nodes, copia.edges))
resulatdoDijkstra.path[0] = state.graph.nodes[0].label
resulatdoDijkstra.path[resulatdoDijkstra.path.length-1] = state.graph.nodes[tamanhoListavertices-1].label
const resultadoMenorCaminho = resulatdoDijkstra.path.toString();
const MenorCaminhoNorientado = teste.bfs(grafo, origemBFS, destinoBFS)
const resultadoMenorCusto = resulatdoDijkstra.distance;


//Falta Implementar
const resultadoFrConexo = "Sim";
const resultadoUnConexo = "Não";
const resultadoFoConexo = "Não";
const resultadoEuleriano = "Não";


//Retorna os cards com os resultados
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
    {viewCard('Grafo Planar?', resultadoPlanar.toString())}
    {viewCard('Grafo Euleriano?', resultadoEuleriano)}
    {viewCard('Menor Caminho não orientado:', MenorCaminhoNorientado.expandedNodes)}
    {viewCard('Menor Caminho:', resultadoMenorCaminho)}
    {viewCard('Menor Custo:', resultadoMenorCusto)}
    {viewCard('Grafo Ciclico:', resultadoCiclico.toString())}
    
    </>
  );
}
export default GraphResults;
