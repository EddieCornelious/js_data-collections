import Queue from './Queue.js';
import Stack from './Stack.js';
import MultiMap from './MultiMap.js';
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
function visitNeighbors(vertex, neighborList, visited, add) {
  const neighborLen = neighborList.length;
  for (let i = 0; i < neighborLen; i += 1) {
    let curNeighbor = neighborList[i].vertex;
    if (!visited.has(curNeighbor)) {
      add(curNeighbor);
    }
  }
}

/**
 * @private
 */
function FirstSearch(startingVertex, structure, BFS) {
  const {add, remove} = getAddAndRemovalMethods(structure, BFS);
  const res = [];
  const visited = new Set();
  add(startingVertex);
  while (structure.size() !== 0) {
    let currentVertex = remove();

    if (!visited.has(currentVertex)) {
      visited.add(currentVertex);
      res.push(currentVertex);
      let currentVertexNeighbors = this.getNeighbors(currentVertex);
      visitNeighbors(currentVertex, currentVertexNeighbors, visited, add);
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
    this.graph = new MultiMap();
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
   * Get verticies
   */
  getVerticies() {
    return this.graph.keys();
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
    const v1neighbors = this.getNeighbors(vertex1);
    const v2neighbors = this.getNeighbors(vertex2);
    // they both exist as verticies
    if (v1neighbors && v2neighbors) {
      // make sure edge does not already exist
      if (!v1neighbors.find(v => v === vertex2)) {
        v1neighbors.push({vertex: vertex2, weight});
      }
    }
  }

  /**
   * Returns an array containing the fiven vertex's neighbors
   * @param {number|string} vertex - The vertex id to search for
   * @returns {Array} The vertex's neighbors
   */
  getNeighbors(vertex) {
    return this.graph.getVal(vertex);
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
    return FirstSearch.call(this, startingVertex, new Queue(), true);
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
    return FirstSearch.call(this, startingVertex, new Stack(), false);
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
