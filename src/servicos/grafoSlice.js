import { createSlice } from '@reduxjs/toolkit';

export const grafoSlice = createSlice({
  name: 'grafo',
  initialState: {
    value: {
      orientado: false,
      graphData: {
        principal: { counter: 0, graph: {nodes: [], edges: []} },
        classificacao: { counter: 0, graph: {nodes: [], edges: []} },
        dijkstra: { counter: 0, graph: {nodes: [], edges: []} },
        agm: { counter: 0, graph: {nodes: [], edges: []} },
      },
    },
  },
  reducers: {
    adicionarVertice: (state, action) => {
      state.value.graphData.principal[action.payload] = [];
    },
    adicionarAresta: (state, action) => {
      const { origem, destino, peso } = action.payload;
      state.value.graphData.principal[origem].push({
        idVertice: destino,
        pesoArestA: peso,
      });
    },
    removerVertice: (state, action) => {
      delete state.value.graphData.principal[action.payload];
    },
    removerAresta: (state, action) => {
      const { origem, destino } = action.payload;
      state.value[origem] = state.value.graphData.principal[origem].filter(
        aresta => aresta.idVertice !== destino.idVertice
      );
    },
    mudarTipo: (state, action) => {
      state.value = {...state.value, orientado: action.payload };
    },
    setGrafoPrincipal: (state, action) => {
      console.log('setando grafo: ', action.payload);
      state.value = {
        orientado: state.value.orientado,
        graphData: { ...state.value.graphData, principal: action.payload },
      };
    },
    setGrafoClassificacao: (state, action) => {
      console.log('setando grafo: ', action.payload);
      state.value = {
        orientado: state.value.orientado,
        graphData: { ...state.value.graphData, classificacao: action.payload },
      };
    },
    setGrafoDijkstra: (state, action) => {
      state.value = {
        orientado: state.value.orientado,
        graphData: { ...state.value.graphData, dijkstra: action.payload },
      };
    },
    setGrafoAGM: (state, action) => {
      state.value = {
        orientado: state.value.orientado,
        graphData: { ...state.value.graphData, agm: action.payload },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  adicionarVertice,
  adicionarAresta,
  removerVertice,
  removerAresta,
  mudarTipo,
  setGrafoPrincipal,
  setGrafoClassificacao,
  setGrafoDijkstra,
  setGrafoAGM,
} = grafoSlice.actions;
export const selectGrafo = state => state.grafo.value;
export default grafoSlice.reducer;
