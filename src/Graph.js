import Queue from './Queue.js';
import Stack from './Stack.js';
import RBTree from './RedBlackTree.js';
import Set from './Set.js';

/**
 * @private
 */
function getAddAndRemovalMethods(context, BFS) {
  const queuePrototype = Queue.prototype;
  const stackPrototype = Stack.prototype;
  if (BFS) {
    return {
      add: queuePrototype.enqueue.bind(context),
      remove: queuePrototype.dequeue.bind(context)
    };
  }
  return {
    add: stackPrototype.push.bind(context),
    remove: stackPrototype.pop.bind(context)
  };
}

/**
 * @private
 */
function FirstSearch(graph, startingVertex, structure, BFS) {
  const {add, remove} = getAddAndRemovalMethods(structure, BFS);
  const res = [];
  const visited = new Set();
  add(startingVertex);
  while (structure.size() !== 0) {
    let currentVertex = remove();

    if (!visited.has(currentVertex)) {
      visited.add(currentVertex);
      res.push(currentVertex);
      let currentVertexNeighbors = graph.getVal(currentVertex).length;
      for (let i = 0; i < currentVertexNeighbors; i += 1) {
        let curNeighbor = graph.getVal(currentVertex)[i].vertex;
        if (!visited.has(curNeighbor)) {
          add(curNeighbor);
        }
      }
    }
  }
  return res;
}

/**
 * Undirected, weighted graph representation
 * @class
 * @param {number} numVerticies - Number of expected verticies for the graph
 *
 * @example
 * const graph = new Collections.Graph(97);
 * // FOR ALL EXAMPLES BELOW. ASSUME graph IS CLEARED BEFORE EACH EXAMPLE
 */
class Graph {
  constructor() {
    this.graph = new RBTree();
  }

  /**
   * Adds a vertex to the graph
   * @param {*} vertex - The vertex to place into graph
   * @returns {undefined}
   *
   * @example
   * graph.addVertex("A");
   * graph.addVertex("B");
   * // two verticies with id "A" and "B" are added to graph
   */
  addVertex(vertex) {
    const {graph} = this;
    // so user does not accidentally overwrite values array
    if (!graph.contains(vertex)) {
      graph.put(vertex, []);
    }
  }

  /**
   * Connects two verticies to create an undirected edge
   * @param {*} vertex1 - The first vertex
   * @param {*} vertex2 - The second vertex
   * @param {number} [weight=0] - Optional cost of
   * edge between @param vertex1, vertex2
   * @returns {undefined}
   *
   * @example
   * graph.addVertex("A");
   * graph.addVertex("B");
   * graph.addEdge("A", "B", 4); // adds edge between "A" & "B" of weight 4
   */
  addEdge(vertex1, vertex2, weight) {
    // TODO: replace with PQ for Prim's
    const {graph} = this;
    const v1neighbors = graph.getVal(vertex1);
    const v2neighbors = graph.getVal(vertex2);
    // they both exist as verticies
    if (v1neighbors && v2neighbors) {
      // make sure edge does not already exist
      if (
        v1neighbors.indexOf(vertex2) === -1 &&
        v2neighbors.indexOf(vertex2) === -1
      ) {
        // body
        v1neighbors.push({vertex: vertex2, weight});
        v2neighbors.push({vertex: vertex1, weight});
      }
    }
  }

  /**
   * Performs Breadth First Search
   * @param {*} startingVertex - The vertex to start Search from
   * @returns {Array} An Array containing verticies in order visited
   * through BFS
   */
  BFS(startingVertex) {
    const {graph} = this;
    if (!graph.contains(startingVertex)) {
      return [];
    }
    return FirstSearch(graph, startingVertex, new Queue(), true);
  }

  /**
   * Performs Depth First Search
   * @param {*} startingVertex - The vertex to start Search from
   * @returns {Array} An Array containing verticies in order visited
   * through DFS
   */
  DFS(startingVertex) {
    const graph = this.graph;
    if (!graph.contains(startingVertex)) {
      return [];
    }
    return FirstSearch(graph, startingVertex, new Stack(), false);
  }

  /**
   * Reports whether the graph is connected
   * @returns {boolean} True if connected and false otherwise
   */
  isConnected() {
    const graph = this.graph;
    const verticies = graph.keys();
    const firstKey = verticies[0];
    return this.BFS(firstKey).length === verticies.length;
  }
}
export default Graph;
