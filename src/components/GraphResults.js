import React from 'react';
import {viewCard, viewCardSelection} from '../components/CardInfo';
import {algoritmosGrafos} from '../Algoritmos/funcoesBasicas'
import { dijkstra } from '../Algoritmos/dijkstra';
import { criaMatrizAdjacencia } from '../Algoritmos/criaMatrizAdjacencia';
import {planarity_test} from '../Algoritmos/planarFunction';
import {arvoreGeradoraMinima} from '../Algoritmos/arvoreGeradoraMinima'
import {cicloEuleriano} from '../Algoritmos/cicloEuleriano'
import {componentesFortes} from '../Algoritmos/componentesFortes'
import {ordenacaoTopologica} from '../Algoritmos/ordenacaoTopologica'
import {verificaBiconexo} from '../Algoritmos/verificaBiconexo'
import {verificaConexidade} from '../Algoritmos/verificaConexidade'
import {verificaEuleriano} from '../Algoritmos/verificaEuleriano'

//Grafo de teste
const stateOriginal = {
  counter: 6,
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
      { from: 1, to: 2, label: '3' },
      { from: 1, to: 3, label: '5' },
      { from: 3, to: 2, label: '3' },
      { from: 3, to: 4, label: '9' },
      { from: 4, to: 5, label: '4' },
      { from: 4, to: 6, label: '6' },
    ],
  },
};
console.log(stateOriginal)

const state = JSON.parse(JSON.stringify(stateOriginal));

/*
let state2 = {
  counter: 4,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
    ],
    edges: [
      { from: 1, to: 2, label: '3' },
      { from: 1, to: 3, label: '5' },
      { from: 3, to: 2, label: '3' },
      { from: 3, to: 4, label: '9' },
    ],
  },
};
*/


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
const vertices = state.graph.nodes;
const arestas = state.graph.edges;
const grafo = state.graph //variável com o grafo para se pegar mais facilmente os nodes e as edges
const tamanhoListavertices = state.graph.nodes.length//tamanho da lista de vértices
const origemBFS = state.graph.nodes[0].label
const destinoBFS = state.graph.nodes[3].label

const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

//Implementados
const copia1 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia2 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia3 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia4 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

console.log(grafo)
//Implementados
const resultadoPlanar = planarity_test(copia4.nodes, copia4.edges);
const resultadoAresta = teste.procuraAresta(origem, destino, copia5);
const grauVertice = teste.calcularGrau(copia6, vertice.id, 'nao_orientado');
const adjacenciasVertice = teste.recuperarAdjacencias(copia7, vertice.id,'nao_orientado');
const resultadoConexo = teste.eConexo(copia8);
const resultadoCiclico = teste.possuiCiclo(copia2, origem, destino)
const resulatdoDijkstra = algDijkstra.dijkstra(criaMatrizAdjacencia(copia1.nodes, copia1.edges))
resulatdoDijkstra.path[0] = state.graph.nodes[0].label
resulatdoDijkstra.path[resulatdoDijkstra.path.length-1] = state.graph.nodes[tamanhoListavertices-1].label
const resultadoMenorCaminho = resulatdoDijkstra.path.toString();
const MenorCaminhoNorientado = teste.bfs(copia3, origemBFS, destinoBFS)
const resultadoMenorCusto = resulatdoDijkstra.distance;
const tipoGrafo = 'orientado';
const visibility = false;
var resultadoConexidade = ''
//Falta Implementar

if(tipoGrafo === 'orientado'){
   resultadoConexidade = verificaConexidade(vertices, arestas)
}else{
   resultadoConexidade = 'Não cabe'
}
console.log(resultadoConexidade)

const resultadoEuleriano = verificaEuleriano(grafo.nodes, grafo.edges);
const resultadoCicloEuleriano = cicloEuleriano(grafo.nodes, grafo.edges);
const resultadosAGM = arvoreGeradoraMinima(state)
const resultadoCustoAGM = resultadosAGM.custo;
const resultadoArestasAGM = resultadosAGM.arestas;
const resultadoOrdenacaoTopologica = ordenacaoTopologica(grafo)

//Retorna os cards com os resultados
function GraphResults() {
  return (
    <>
    {viewCardSelection('Existe a Aresta ', resultadoAresta, grafo)}
    {viewCard('Grau do Vértice '+ vertice.label, grauVertice, visibility)}
    {viewCard('Adjacentes do Vértice '+ vertice.label, adjacenciasVertice.toString(), visibility)}
    {viewCard('Grafo não-orientado Conexo?', resultadoConexo, visibility)}
    {viewCard('Ordenação Topológica:', resultadoOrdenacaoTopologica, visibility)}
    {viewCard('Conexidade do Dígrafo?', resultadoConexidade, visibility)}
    {viewCard('Componentes Fortes:', 'A-B-C', visibility)}
    {viewCard('Grafo Planar?', resultadoPlanar.toString(), visibility)}
    {viewCard('Grafo Euleriano?', resultadoEuleriano.toString(), visibility)}
    {viewCard('Ciclo Euleriano?', resultadoCicloEuleriano.toString(), visibility)}
    {viewCard('Menor Caminho não orientado:', MenorCaminhoNorientado.expandedNodes, visibility)}
    {viewCard('Menor Caminho:', resultadoMenorCaminho, visibility)}
    {viewCard('Menor Custo:', resultadoMenorCusto, visibility)}
    {viewCard('Grafo Ciclico:', resultadoCiclico.toString(), visibility)}
    {viewCard('Custo Árvore Geradora Mínima:', resultadoCustoAGM, visibility)}
    {viewCard('Arestas Árvore Geradora Mínima:', resultadoArestasAGM, visibility)}
    </>
  );
}
export default GraphResults;
