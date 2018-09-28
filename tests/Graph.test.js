import Graph from '../src/Graph.js';
var expect = require('chai').expect;

describe('Graph', function() {
  let graph, expected, actual;

  beforeEach(function() {
    graph = new Graph();
  });

  afterEach(function() {
    graph, expected, (actual = null);
  });

  it('addVertex should not add the same vertex twice', function() {
    graph.addVertex(0);
    graph.addVertex(0);
    expected = [0];
    actual = graph.getVerticies();
    expect(actual).to.have.ordered.members(expected);
  });

  it('addEdge should only add edge if both vertieices exist', function() {
    graph.addVertex(0);
    graph.addVertex(0);
    graph.addEdge('p', 'q');
    graph.addEdge(0, 'q');
    expected = [];
    actual = graph.getNeighbors(0);
    expect(actual).to.have.ordered.members(expected);
  });

  it('addEdge should not add duplicate edges', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addEdge(0, 1);
    graph.addEdge(0, 1);
    expected = 1;
    actual = graph.getNeighbors(0).length;
    expect(1).to.be.equal(expected);
  });

  it('BFS should return bfs with connected graph', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(2, 0);
    expected = [2, 0, 1];
    actual = graph.BFS(2);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(true);
  });

  it('BFS should return bfs when graph is not fully connected', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(9);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    expected = [2];
    actual = graph.BFS(2);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(false);
  });

  it('BFS should return empty array when vertex does not exist', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(9);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    expected = [];
    actual = graph.BFS('lol');
    expect(actual).to.have.members([]);
  });

  it('DFS should return dfs connected graph', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(0, 2);
    graph.addEdge(2, 1);
    graph.addEdge(1, 0);
    expected = [0, 2, 1];
    actual = graph.DFS(0);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(true);
  });

  it('DFS should return dfs when graph is not fully connected', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(0, 1);
    graph.addEdge(2, 1);
    graph.addEdge(2, 0);
    expected = [0, 1, 2];
    actual = graph.DFS(0);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.be.equal(expected[i]);
    }
    expect(graph.isConnected()).to.equal(false);
  });

  it('DFS should return empty array when vertex does not exist', function() {
    graph.addVertex(0);
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(9);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    expected = [];
    actual = graph.DFS('lol');
    expect(actual).to.have.members([]);
  });
});
