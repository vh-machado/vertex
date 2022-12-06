class Graph {
  constructor(v) {
    this.time = 0;
    this.traversal_array = [];
    this.v = v;
    this.e = randomIntFromInterval(9, 45);
    this.graph_list = [];
    this.graph_matrix = [];
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getNumberOfEdges() {
    return this.e;
  }

  dfs() {
    this.visited = [false] * this.v;
    this.start_time = [0] * this.v;
    this.end_time = [0] * this.v;
  }

  traverse_dfs(node) {
    this.visited[node] = true;
    this.traversal_array.push(node);
    this.start_time[node] = this.time;
    this.time += 1;

    for (let neighbour in this.graph_list[node]) {
      if (!self.visited[neighbour]) {
        console.log('Tree edge: ', node, '-->', neighbour);
        self.traverse_dfs(neighbour);
      } else {
        if (
          this.start_time[node] > this.start_time[neighbour] &&
          this.end_time[node] < this.end_time[neighbour]
        ) {
          console.log('Back edge: ', node, '-->', neighbour);
        } else if (
          this.start_time[node] < this.start_time[neighbour] &&
          this.end_time[node] > this.end_time[neighbour]
        ) {
          console.log('Forward Edge: ', node, '-->', neighbour);
        } else if (
          this.start_time[node] > this.start_time[neighbour] &&
          this.end_time[node] > this.end_time[neighbour]
        ) {
          console.log('Cross Edge:', node, '-->', neighbour);
        }
      }
      this.end_time[node] = this.time;
      this.time += 1;
    }
  }
}
