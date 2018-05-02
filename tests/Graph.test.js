const Collections = require("../collections.js");
var expect = require("chai").expect;

describe("Graph", function() {
  let graph, expected, actual;

  beforeEach(function() {
    graph = new Collections.Graph();
  });

  afterEach(function() {
    graph, expected, (actual = null);
  });

  it("BFS should return bfs with connected graph", function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(0, 1);
    graph.addEdge(2, 1);
    graph.addEdge(2, 0);
    expected = [2, 1, 0];
    actual = graph.BFS(2);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(true);
  });

  it("BFS should return bfs when graph is not fully connected", function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(9);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    expected = [2, 1, 0];
    actual = graph.BFS(2);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(false);
  });

  it("DFS should return dfs connected graph", function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(6);
    graph.addEdge(0, 1);
    graph.addEdge(2, 1);
    graph.addEdge(2, 0);
    graph.addEdge(2, 6);
    expected = [0, 2, 6, 1];
    actual = graph.DFS(0);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(true);
  });

  it("DFS should return dfs when graph is not fully connected", function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(6);
    graph.addEdge(0, 1);
    graph.addEdge(2, 1);
    graph.addEdge(2, 0);
    expected = [0, 2, 1];
    actual = graph.DFS(0);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(false);
  });
});
