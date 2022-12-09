//DFS non-oriented graph
function DFS(graph, start, visited = new Set()) {
    visited.add(start);
    for (let child of graph[start]) {
      if (!visited.has(child)) {
        DFS(graph, child, visited);
      }
    }
    return visited;
  }
  
  const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: ['f'],
    f: []
  };
  
  console.log(DFS(graph, 'a'));
  