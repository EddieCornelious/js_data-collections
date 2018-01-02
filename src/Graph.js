import Queue from './Queue.js';
import Stack from './Stack.js';
import HashMap from "./HashMap.js";
import HashSet from "./HashSet.js";

class Graph {
  constructor(numVerticies) {
    this.graph = new HashMap(numVerticies);
  }
  addVertex(vertex) {
    const { graph } = this;
    // so user does not accidentally overwrite values array
    if(!graph.contains(vertex) && vertex !== undefined) {
      graph.put(vertex, []);
    }
  }
  addEdge(vertex1, vertex2, weight = 0) {
    // TODO: replace with PQ for Prim's 
    const { graph } = this;
    const v1neighbors = graph.getVal(vertex1);
    const v2neighbors = graph.getVal(vertex2);
    // they both exist as verticies
    if (v1neighbors && v2neighbors) {
      v1neighbors.push({ vertex: vertex2, weight });
      v2neighbors.push({ vertex: vertex1, weight });
    }
  }
  BFS(startingVertex) {
    const { graph } = this;
    const bfs = [];
    const visited = new HashSet(graph.size());
    let q = new Queue();
    q.enqueue(startingVertex);
    while (q.size() !== 0) {
      let currentVertex = q.dequeue();
      if (!visited.has(currentVertex)) {
        visited.add(currentVertex);
        bfs.push(currentVertex);
        let current_vertex_neighbors = graph.getVal(currentVertex).length;
        for (let i = 0; i < current_vertex_neighbors; i += 1) {
          let curNeighbor = graph.getVal(currentVertex)[i].vertex;
          if (!visited.has(curNeighbor)) {
            q.enqueue(curNeighbor);
          }
        }
      }
    }
    return bfs;
  }
  DFS(vertex) {
    const graph = this.graph;
    const dfs = [];
    const visited = new HashSet(graph.size());
    let s = new Stack();
    s.push(vertex);
    while (s.size() !== 0) {
      let currentVertex = s.pop();
      if (!visited.has(currentVertex)) {
        visited.add(currentVertex);
        dfs.push(currentVertex);
        let current_vertex_neighbors = graph.getVal(currentVertex).length;
        for (let i = 0; i < current_vertex_neighbors; i += 1) {
          let curNeighbor = graph.getVal(currentVertex)[i].vertex;
          if (!visited.has(curNeighbor)) {
            s.push(curNeighbor);
          }
        }
      }
    }
    return dfs;
  }

  isConnected() {
    const graph = this.graph;
    let firstKey = '';
    const verticies = graph.keys();
    firstKey = verticies[0];
    return this.BFS(firstKey).length === verticies.length;
  }
}
module.exports = Graph;
