const Queue = require("./Queue.js");
const Stack = require("./Stack.js");
const PQ = require("./PriorityQueue.js");
class Graph {
  constructor() {
    this.graph = {};
  }
  
  addVertex(v) {
    this.graph[v] = [];
  }
  
  addEdge(v1, v2, w) {
    //replace with PQ
    this.graph[v1].push({v: v2, w});
    this.graph[v2].push({v: v1, w});
  }
  
  BFS(v) {
    const graph = this.graph;
    const bfs = [];
    const visited = {};
    let q = new Queue();
    q.enqueue(v);
    while(q.size() !== 0) {
      let x = q.dequeue();
      if (!visited[x]) {
        visited[x] = true;
        bfs.push(x);
        for(let i=0; i < graph[x].length; i +=1) {
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
    while(s.size()!== 0) {
      let x = s.pop();
      if (!visited[x]) {
        visited[x] = true;
        dfs.push(x);
        for(let i=0; i<graph[x].length; i++) {
          if(!visited[graph[x][i].v]){
            s.push(graph[x][i].v);
          }
        }
      }
    }
    return dfs;
  }

  isConnected() {
    const graph = this.graph;
    let firstKey = "";
    for (let vertex in graph) {
      firstKey = vertex;
      break;
    }
    return this.BFS(firstKey).length === Object.keys(graph).length;
  }
}
module.exports = Graph;
