class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(source, destination, directed=false) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
    
    if(!directed){
      this.adjacencyList[destination].push(source);
    }
  }
  removeEdge(source, destination) {
    this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
  }
  removeVertex(vertex) {
    
    while (this.adjacencyList[vertex].length > 0) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }  
}
  
function getVertexNumber(adjacencyList){
  console.log(Object.keys(adjacencyList).length);
}
  
function getEdgeNumber(adjacencyList, directed=false){
    
    let count = 0;
    for (let V of Object.keys(adjacencyList)) {
      count += adjacencyList[V].length
    }
    
    //grafos não orientados    
    if(!directed){
      console.log(count / 2)
    }
    
    //grafos orientados
    else{
      console.log(count)
    }
  }

let G = new Graph()

G.addVertex("A")
G.addVertex("B")
G.addVertex("C")
G.addVertex("D")

G.addEdge("A", "B", true)
G.addEdge("A", "C", true)
G.addEdge("A", "D", true)
G.addEdge("B", "C", true)
G.addEdge("B", "D", true)


getVertexNumber(G.adjacencyList)
getEdgeNumber(G.adjacencyList, true)
