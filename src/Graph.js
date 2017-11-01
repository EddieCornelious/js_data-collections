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
    const visited = {};
    let q = new Queue();
    q.enqueue(v);
    while(q.size()!==0){
      let x = q.dequeue();
      if(!visited[x]){
        visited[x] = true;
        console.log(x);
        for(let i=0; i<graph[x].length; i++) {
          if(!visited[graph[x][i].v]){
            q.enqueue(graph[x][i].v);
          }
        }
      }
    }
  }
  
  DFS(v) {
    const graph = this.graph;
    const visited = {};
    let s = new Stack();
    s.push(v);
    while(s.size()!==0){
      let x = s.pop();
      if(!visited[x]){
        visited[x] = true;
        console.log(x);
        for(let i=0; i<graph[x].length; i++) {
          if(!visited[graph[x][i].v]){
            s.push(graph[x][i].v);
          }
        }
      }
    }
  }
  
  Dijkstra() {
      
  }
  // I get to use my PQ!!!!
  Prim(v) {
   
  }
}
module.exports = Graph;
