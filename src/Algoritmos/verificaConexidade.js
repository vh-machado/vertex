import criaMatrizCaminho from "./criaMatrizCaminho";

export default function verificaConexidade(graphData) {
  let V = graphData.counter;

  // Function to find the characteristic
  // of the given graph
  function checkConnected(graph, n) {
    // Check whether the graph is
    // strongly connected or not
    let strongly = true;

    // Traverse the path matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // If all the elements are
        // not equal then the graph
        // is not strongly connected
        if (graph[i][j] != graph[j][i]) {
          strongly = false;
          break;
        }
      }

      // Break out of the loop if false
      if (!strongly) {
        break;
      }
    }

    // If true then print strongly
    // connected and return
    if (strongly) {
      console.log("Fortemente Conexo")
      return 0;
    }

    // Check whether the graph is
    // Unilaterally connected by
    // checking Upper Triangle element
    let uppertri = true;

    // Traverse the path matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // If uppertriangle elements
        // are 0 then break out of the
        // loop and check the elements
        // of lowertriangle matrix
        if (i > j && graph[i][j] == 0) {
          uppertri = false;
          break;
        }
      }

      // Break out of the loop if false
      if (!uppertri) {
        break;
      }
    }

    // If true then print unilaterally
    // connected and return
    if (uppertri) {
      console.log("Unilateralmente Conexo")
      return 0;
    }

    // Check lowertraingle elements
    let lowertri = true;

    // Traverse the path matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // If lowertraingle elements
        // are 0 then break cause
        // 1's are expected
        if (i < j && graph[i][j] == 0) {
          lowertri = false;
          break;
        }
      }

      // Break out of the loop if false
      if (!lowertri) {
        break;
      }
    }

    // If true then print unilaterally
    // connected and return
    if (lowertri) {
      //document.write('Unilaterally Connected');
      console.log("Unilateralmente Conexo")
      return 0;
    }

    // If elements are in random order
    // unsynchronized then print weakly
    // connected and return
    else {
      console.log("Fracamente Conexo")
    }
    return 0;
  }

  // Driver Code

  // Number of nodes
  let n = graphData.counter;

  // Given Path Matrix
  /*
  let graph = [
    [0, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ];*/
  var graph = criaMatrizCaminho(graphData)

  // Function call
  checkConnected(graph, n);
}
