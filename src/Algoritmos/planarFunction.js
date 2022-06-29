import { PlanarityChecker } from '../Algoritmos/planarity';

export function planarity_test(nodes, edges) {
  //console.log(nodes)
  //console.log(edges)
    if (nodes == null) {
      nodes = [
        { 'id': '0' },
        { 'id': '1' },
        { 'id': '2' },
        { 'id': '3' },
        { 'id': '4' },
      ];
    }
    if (edges == null) {
      edges = [
        { 'from': '0', 'to': '1', 'label': 1 },
        { 'from': '0', 'to': '2', 'label': 1 },
        { 'from': '0', 'to': '3', 'label': 1 },
        { 'from': '0', 'to': '4', 'label': 1 },
        { 'from': '1', 'to': '2', 'label': 1 },
        { 'from': '1', 'to': '3', 'label': 1 },
        { 'from': '1', 'to': '4', 'label': 1 },
        { 'from': '2', 'to': '3', 'label': 1 },
        // { 'from': '2', 'to': '4', 'label': 1 },
        { 'from': '3', 'to': '4', 'label': 1 },
      ];
    }
    let checker = new PlanarityChecker(nodes.length);
    let id_idx = {};
    let idx_id = {};
    for (let v of nodes) {
      id_idx[v.id] = Object.keys(id_idx).length;
      idx_id[id_idx[v.id]] = v.id;
    }
    let n = Object.keys(id_idx).length;
    let m = edges.length;
    for (let e of edges)
      checker.add_edge(id_idx[e.from], id_idx[e.to]);
    let planarity = checker.is_planar();
    //console.log(checker);
    //console.log('Graph planarity:' + planarity);
    if (3 * n - 6 >= m && planarity && n > 4) {
      checker.get_embedding();
      for (let e of edges) {
        let edge = [id_idx[e.from], id_idx[e.to]];
        if (!checker.adj_list[edge[0]].has(edge[1]))
          [edge[0], edge[1]] = [edge[1], edge[0]];
        let embed_list = checker.embedding_adj_list[edge[1]];
        if (checker.parent[edge[1]] != edge[0]) { // back edge
          let length = 1;
          for (let i = 0; i < embed_list.length; i++) {
            if (JSON.stringify(embed_list[i]) == JSON.stringify(edge)) {
              length = embed_list.length - i - 1;
              break;
            }
          }
          e.label = checker.height[edge[0]] - 1;
          e.color = checker.side[edge] == 1 ? 'red' : 'blue';
        }
        // console.log(e);
      }
    }
    // console.log(checker.adj_list);
    // console.log(checker.embedding_adj_list);
    if (planarity)
      return true
    else
      return false
  } 