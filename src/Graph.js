const Queue = require('./Queue.js');
const Stack = require('./Stack.js');
class Graph {
  constructor() {
    this.graph = {};
  }
  addVertex(v) {
    this.graph[v] = [];
  }
  addEdge(v1, v2, w) {
    // replace with PQ
    if (this.graph[v1] && this.graph[v2]) {
      this.graph[v1].push({ v: v2, w });
      this.graph[v2].push({ v: v1, w });
    }
  }
  BFS(v) {
    const graph = this.graph;
    const bfs = [];
    const visited = {};
    let q = new Queue();
    q.enqueue(v);
    while (q.size() !== 0) {
      let x = q.dequeue();
      if (!visited[x]) {
        visited[x] = true;
        bfs.push(x);
        for (let i = 0; i < graph[x].length; i += 1) {
          if (!visited[graph[x][i].v]) {
            q.enqueue(graph[x][i].v);
          }
        }
      }
    }
    return bfs;
  }
  DFS(v) {
    const graph = this.graph;
    const dfs = [];
    const visited = {};
    let s = new Stack();
    s.push(v);
    while (s.size() !== 0) {
      let x = s.pop();
      if (!visited[x]) {
        visited[x] = true;
        dfs.push(x);
        for (let i = 0; i < graph[x].length; i += 1) {
          if (!visited[graph[x][i].v]) {
            s.push(graph[x][i].v);
          }
        }
      }
    }
    return dfs;
  }

  isConnected() {
    const graph = this.graph;
    let firstKey = '';
    const verticies = Object.keys(graph);
    firstKey = verticies[0];
    return this.BFS(firstKey).length === verticies.length;
  }
}
module.exports = Graph;
