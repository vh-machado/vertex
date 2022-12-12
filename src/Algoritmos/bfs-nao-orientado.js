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


  //BFS non-oriented graph
function BFS(graph, start, visited = new Set()) {
    const queue = [start];
    while (queue.length > 0) {
      const node = queue.shift();
      visited.add(node);
      for (let child of graph[node]) {
        if (!visited.has(child)) {
          queue.push(child);
        }
      }
    }
    return visited;
  }
  
  const graph2 = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: ['f'],
    f: []
  };
  
  console.log(BFS(graph, 'a'));


//BFS non-oriented graph
