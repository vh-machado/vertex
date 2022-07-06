export class dijkstra {
  findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs);

    const lowestCostNode = knownNodes.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (costs[node] < costs[lowest] && !processed.includes(node)) {
        lowest = node;
      }
      return lowest;
    }, null);

    return lowestCostNode;
  };

  // function that returns the minimum cost and path to reach Finish
  dijkstra = graph => {
    console.log('Graph: ');
    console.log(graph);

    // track lowest cost to reach each node
    const trackedCosts = Object.assign({ finish: Infinity }, graph.start);
    console.log('Initial `costs`: ');
    console.log(trackedCosts);

    // track paths
    const trackedParents = { finish: null };
    for (let child in graph.start) {
      trackedParents[child] = 'start';
    }
    console.log('Initial `parents`: ');
    console.log(trackedParents);
    // track nodes that have already been processed
    const processedNodes = [];
    const nodesList = new Set();

    // Set initial node. Pick lowest cost node.
    let node = this.findLowestCostNode(trackedCosts, processedNodes);
    //console.log('Initial `node`: ', node)

    //console.log('while loop starts: ')
    console.log('Inicio do dijkstra')
    while (node) {
      // console.log(`* 'currentNode': ${node} *`)
      let costToReachNode = trackedCosts[node];
      let childrenOfNode = graph[node];

      console.log('node:',node)
      for (let child in childrenOfNode) {
        let costFromNodetoChild = childrenOfNode[child];
        let costToChild = costToReachNode + costFromNodetoChild;
        console.log('child:',child)

        if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
          nodesList.add(node);
          trackedCosts[child] = costToChild;
          trackedParents[child] = node;
          if (
            trackedParents.finish === null &&
            trackedCosts.finish === Infinity
          ) {
            console.log('----------AQUI1------------')
            let results = {
              distance: Infinity,
              path: ['Não existe caminho!',[]],
            };
            return results;
          }
        }

        console.log('`trackedCosts`', trackedCosts);
        console.log('`trackedParents`', trackedParents);
        console.log('----------------');
      }

      processedNodes.push(node);

      node = this.findLowestCostNode(trackedCosts, processedNodes);
    }

    console.log('while loop ends: ');
    let nodesTrackedParents = [];
    let optimalPath = [];
    let optimalPathSet = new Set();

    optimalPathSet.add('finish');
    optimalPathSet.add(trackedParents.finish);

    function pushNodes(value1, value2, set) {
      nodesTrackedParents.push(value2);
    }

    function pushPath(value1, value2, set) {
      optimalPath.push(value2);
    }

    nodesList.forEach(pushNodes);
    nodesTrackedParents.reverse();

    while (!optimalPathSet.has('start'))
      for (let i = 0; i < nodesTrackedParents.length; i++) {
        optimalPathSet.add(trackedParents[nodesTrackedParents[i]]);
      }
    optimalPathSet.forEach(pushPath);

    optimalPath.reverse();
    if (trackedCosts.finish === Infinity) {
      console.log('----------AQUI2------------')
      optimalPath = ['Não existe caminho!',[]];
    }

    const results = {
      distance: trackedCosts.finish,
      path: optimalPath,
    };

    return results;
  };
}
