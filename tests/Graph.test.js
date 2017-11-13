var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("Graph", function(){
  let graph, expected, actual;
  it("bfs should return bfs connected graph", function(){
    graph = new Structs.Graph()
    graph.addVertex(0)
    graph.addVertex(1)
    graph.addVertex(2)
    graph.addEdge(0, 1)
    graph.addEdge(2, 1)
    graph.addEdge(2, 0)
    expected = [2, 1, 0]
    actual = graph.BFS(2)
    for(let i=0; i<actual.length; i++){
      expect(actual[i]).to.be.equal(expected[i])
    }
    expect(graph.isConnected()).to.equal(true)
    
  })
  
  it("bfs should return bfs not connected graph", function(){
    graph = new Structs.Graph()
    graph.addVertex(0)
    graph.addVertex(1)
    graph.addVertex(2)
    graph.addVertex(9)
    graph.addEdge(0, 1)
    graph.addEdge(1, 2)
    expected = [2, 1, 0]
    actual = graph.BFS(2)
    for(let i=0; i<actual.length; i++){
      expect(actual[i]).to.be.equal(expected[i])
    }
    expect(graph.isConnected()).to.equal(false)
  
  })
  
  it("dfs should return dfs connected graph", function(){
    graph = new Structs.Graph()
    graph.addVertex(0)
    graph.addVertex(1)
    graph.addVertex(2)
    graph.addVertex(6)
    graph.addEdge(0, 1)
    graph.addEdge(2, 1)
    graph.addEdge(2, 0)
    graph.addEdge(2, 6)
    expected = [0, 2, 6, 1]
    actual = graph.DFS(0)
    for(let i=0; i<actual.length; i++){
      expect(actual[i]).to.be.equal(expected[i])
    }
    expect(graph.isConnected()).to.equal(true)
  })
  
  it("dfs should return dfs not connected graph", function(){
    graph = new Structs.Graph()
    graph.addVertex(0)
    graph.addVertex(1)
    graph.addVertex(2)
    graph.addVertex(6)
    graph.addEdge(0, 1)
    graph.addEdge(2, 1)
    graph.addEdge(2, 0)
    expected = [0, 2, 1]
    actual = graph.DFS(0)
    for(let i=0; i<actual.length; i++){
      expect(actual[i]).to.be.equal(expected[i])
    }
     expect(graph.isConnected()).to.equal(false)
  })
  
 
});