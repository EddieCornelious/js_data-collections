(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Structs", [], factory);
	else if(typeof exports === 'object')
		exports["Structs"] = factory();
	else
		root["Structs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var List = __webpack_require__(1);
	var Stack = __webpack_require__(2);
	var Queue = __webpack_require__(3);
	var BHeap = __webpack_require__(4);
	var PriorityQueue = __webpack_require__(5);
	var HashMap = __webpack_require__(6);
	var BST = __webpack_require__(7);
	var Graph = __webpack_require__(10);

	Array.prototype.SWAG = function () {
	    return "This is where I can place shims";
	};

	module.exports = { List: List, Stack: Stack, Queue: Queue, BHeap: BHeap, PriorityQueue: PriorityQueue, HashMap: HashMap, BST: BST, Graph: Graph };

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getNode(index) {
	  if (index < 0) {
	    throw new RangeError('out of bounds');
	  }
	  var head = this.head;
	  var i = 0;
	  while (i < index) {
	    head = head.next;
	    i += 1;
	    if (!head) {
	      throw new RangeError('index out of Bounds');
	    }
	  }

	  return head;
	}

	// TODO: add the below functions to prototype of base classes

	function isNumber(obj) {
	  if (typeof obj !== 'number') {
	    throw new TypeError('Invalid index must be of type number');
	  }
	  return 1;
	}

	function defaultEqual(a, b) {
	  if (a < b) {
	    return -1;
	  } else if (a === b) {
	    return 0;
	  }
	  return 1;
	}

	var Node = function Node(data) {
	  _classCallCheck(this, Node);

	  this.data = data;
	  this.next = null;
	  this.prev = null;
	};

	var List = function () {
	  function List() {
	    _classCallCheck(this, List);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  List.prototype.addToFront = function addToFront(data) {
	    var head = this.head,
	        length = this.length;

	    var newNode = new Node(data);
	    this.length = length + 1;

	    if (!head) {
	      this.head = newNode;
	      this.tail = this.head;
	      return this;
	    }
	    this.head = newNode;
	    newNode.next = head;
	    head.prev = newNode;
	    return this;
	  };

	  List.prototype.elementAtIndex = function elementAtIndex(index) {
	    isNumber(index);
	    var wanted = getNode.apply(this, [index]);
	    return wanted ? wanted.data : undefined;
	  };

	  List.prototype.addToBack = function addToBack(data) {
	    var tail = this.tail,
	        length = this.length;

	    var newNode = new Node(data);
	    this.length = length + 1;

	    if (!tail) {
	      this.head = newNode;
	      this.tail = this.head;
	      return this;
	    }
	    this.tail = newNode;
	    newNode.prev = tail;
	    tail.next = newNode;
	    return this;
	  };

	  List.prototype.removeFront = function removeFront() {
	    var head = this.head,
	        length = this.length;


	    if (head) {
	      this.length = length - 1;
	      this.head = head.next;
	      var newHead = this.head;
	      // list is now empty...adjust tail
	      if (!newHead) {
	        this.tail = this.head;
	        return this;
	      }
	      newHead.prev = null;
	    }
	    return this;
	  };

	  List.prototype.removeBack = function removeBack() {
	    var tail = this.tail,
	        length = this.length;

	    if (!this.tail) {
	      return this;
	    }
	    var prev = tail.prev;
	    this.length = length - 1;
	    // list now empty
	    if (!prev) {
	      this.tail = null;
	      this.head = null;
	      return this;
	    }
	    prev.next = null;
	    this.tail = prev;
	    return this;
	  };

	  List.prototype.insert = function insert(index, data) {
	    isNumber(index);
	    if (index === 0) {
	      return this.addToFront(data);
	    } else if (index === this.length) {
	      return this.addToBack(data);
	    }
	    var node = getNode.apply(this, [index - 1]);
	    var newNode = new Node(data);
	    var aft = node.next;
	    newNode.next = aft;
	    aft.prev = newNode;
	    node.next = newNode;
	    newNode.prev = node;
	    this.length += 1;
	    return this;
	  };

	  List.prototype.remove = function remove(index) {
	    isNumber(index);
	    var head = this.head,
	        length = this.length;

	    if (!head) {
	      return this;
	    }

	    if (index === 0) {
	      return this.removeFront();
	    } else if (index === length) {
	      return this.removeBack();
	    }
	    var node = getNode.apply(this, [index - 1]);
	    var del = node.next;
	    var after = del.next;
	    node.next = after;
	    after.prev = node;
	    this.length = length - 1;
	    return this;
	  };

	  List.prototype.indexOf = function indexOf(data, eqlFunc) {
	    var cmp = eqlFunc || defaultEqual;
	    var index = 0;
	    var head = this.head;
	    while (head) {
	      if (cmp(data, head.data) === 0) {
	        return index;
	      }
	      head = head.next;
	      index += 1;
	    }
	    return -1;
	  };

	  List.prototype.contains = function contains(data, eqlFunc) {
	    return this.indexOf(data, eqlFunc) !== -1;
	  };

	  List.prototype.clear = function clear() {
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  };

	  List.prototype.size = function size() {
	    return this.length;
	  };

	  List.prototype.isEmpty = function isEmpty() {
	    return !this.head && !this.tail;
	  };

	  List.prototype.forEach = function forEach(callback) {
	    var func = callback;
	    var head = this.head;

	    while (head) {
	      func(head.data);
	      head = head.next;
	    }
	    return this;
	  };

	  List.prototype.toArray = function toArray() {
	    var temp = [];
	    this.forEach(function (element) {
	      return temp.push(element);
	    });
	    return temp;
	  };

	  return List;
	}();

	module.exports = List;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var List = __webpack_require__(1);

	var Stack = function () {
	  function Stack() {
	    _classCallCheck(this, Stack);

	    this.rep = new List();
	  }

	  Stack.prototype.push = function push(data) {
	    this.rep.addToFront(data);
	    return this;
	  };

	  Stack.prototype.pop = function pop() {
	    var oldVal = this.rep.elementAtIndex(0);
	    this.rep.removeFront();
	    return oldVal;
	  };

	  Stack.prototype.peek = function peek() {
	    return this.rep.elementAtIndex(0);
	  };

	  Stack.prototype.size = function size() {
	    return this.rep.size();
	  };

	  return Stack;
	}();

	module.exports = Stack;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var List = __webpack_require__(1);

	var Queue = function () {
	  function Queue() {
	    _classCallCheck(this, Queue);

	    this.rep = new List();
	  }

	  Queue.prototype.enqueue = function enqueue(data) {
	    this.rep.addToBack(data);
	    return this;
	  };

	  Queue.prototype.dequeue = function dequeue() {
	    var oldVal = this.rep.elementAtIndex(0);
	    this.rep.removeFront();
	    return oldVal;
	  };
	  // TODO: Create a list method that reports tail which is 0(1) or keep this?


	  Queue.prototype.back = function back() {
	    var back = this.rep.tail;
	    return back ? back.data : undefined;
	  };

	  Queue.prototype.front = function front() {
	    return this.rep.elementAtIndex(0);
	  };

	  Queue.prototype.size = function size() {
	    return this.rep.size();
	  };

	  return Queue;
	}();

	module.exports = Queue;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function maxHeapify(A, index, comp) {
	  var left = 2 * index;
	  var right = 2 * index + 1;
	  var largest = void 0;

	  if (left <= A.length - 1 && comp(A[left], A[index]) === 1) {
	    largest = left;
	  } else {
	    largest = index;
	  }

	  if (right <= A.length - 1 && comp(A[right], A[largest]) === 1) {
	    largest = right;
	  }

	  if (comp(largest, index) !== 0) {
	    var oldIndex = A[index];
	    A[index] = A[largest];
	    A[largest] = oldIndex;
	    maxHeapify(A, largest, comp);
	  }
	}

	function siftUp(A, index, comp) {
	  if (index >= 2) {
	    var parent = Math.floor(index / 2);
	    if (comp(A[parent], A[index]) === -1) {
	      var oldParent = A[parent];
	      A[parent] = A[index];
	      A[index] = oldParent;

	      siftUp(A, parent, comp);
	    }
	  }
	}

	function defaultEqual(a, b) {
	  if (a < b) {
	    return -1;
	  } else if (a === b) {
	    return 0;
	  }
	  return 1;
	}

	var BHeap = function () {
	  function BHeap(comparator) {
	    _classCallCheck(this, BHeap);

	    this.heap = [null];
	    this.comp = comparator || defaultEqual;
	  }

	  BHeap.prototype.extractRoot = function extractRoot() {
	    var heap = this.heap;
	    var max = heap[1];
	    heap[1] = heap[heap.length - 1];
	    heap.length -= 1;
	    maxHeapify(heap, 1, this.comp);
	    return max;
	  };

	  BHeap.prototype.insert = function insert(data) {
	    var heap = this.heap;
	    heap[heap.length] = data;
	    siftUp(heap, heap.length - 1, this.comp);
	  };

	  BHeap.prototype.size = function size() {
	    return this.heap.length - 1;
	  };

	  return BHeap;
	}();

	module.exports = BHeap;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BHeap = __webpack_require__(4);

	function min(a, b) {
	  if (a.p < b.p) {
	    return 1;
	  } else if (a.p === b.p) {
	    return 0;
	  }
	  return -1;
	}

	var PriorityQueue = function () {
	  function PriorityQueue() {
	    _classCallCheck(this, PriorityQueue);

	    this.rep = new BHeap(min);
	  }

	  PriorityQueue.prototype.enqueue = function enqueue(data, priority) {
	    this.rep.insert({ data: data, p: priority });
	  };

	  return PriorityQueue;
	}();

	module.exports = PriorityQueue;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// modified code https://en.wikipedia.org/wiki/Sieve_of_Atkin#Pseudocode
	function sieveOfAtkin(limit) {
	  var toReturn = [];
	  if (limit > 2) {
	    toReturn.push(2);
	  }
	  if (limit > 3) {
	    toReturn.push(3);
	  }

	  // Initialise the sieve array with false values
	  var sieve = new Array(limit);
	  for (var i = 0; i < limit; i += 1) {
	    sieve[i] = false;
	  }
	  for (var x = 1; x * x < limit; x += 1) {
	    for (var y = 1; y * y < limit; y += 1) {
	      // Main part of Sieve of Atkin
	      var n = 4 * x * x + y * y;
	      if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
	        sieve[n] ^= true;
	      }
	      n = 3 * x * x + y * y;
	      if (n <= limit && n % 12 === 7) {
	        sieve[n] ^= true;
	      }
	      n = 3 * x * x - y * y;
	      if (x > y && n <= limit && n % 12 === 11) {
	        sieve[n] ^= true;
	      }
	    }
	  }

	  // Mark all multiples of squares as non-prime
	  for (var r = 5; r * r < limit; r += 1) {
	    if (sieve[r]) {
	      for (var _i = r * r; _i < limit; _i += r * r) {
	        sieve[_i] = false;
	      }
	    }
	  }
	  for (var a = 5; a < limit; a += 1) {
	    if (sieve[a]) {
	      toReturn.push(a);
	    }
	  }
	  return toReturn[toReturn.length - 1];
	}
	// TODO: put this in seperate file and make accessible to all
	function objToString(obj) {
	  var toStr = obj.toString();
	  if (toStr === '[object Object]') {
	    return JSON.stringify(obj);
	  }
	  return toStr;
	}
	function createTable(size) {
	  var table = [];
	  for (var i = 0; i < size; i++) {
	    table.push([]);
	  }
	  return table;
	}
	function fnv(str) {
	  var hash = 0x811c9dc5;
	  for (var i = 0; i < str.length; i += 1) {
	    hash ^= str.charCodeAt(i);
	    hash *= 0x01000193;
	  }
	  return hash < 0 ? hash * -1 : hash;
	}

	function searchBucket(bucket, item) {
	  return bucket.indexOf(item);
	}
	function insertKey(bucket, key, value) {
	  for (var i = 0; i < bucket.length; i++) {
	    var inBucket = searchBucket(bucket[i], key);
	    if (inBucket === 0) {
	      bucket[i][1] = value;
	      return;
	    }
	  }
	  bucket.push([key, value]);
	}
	//retrieve val from inner
	function retVal(bucket, key) {
	  for (var i = 0; i < bucket.length; i++) {
	    var inBucket = searchBucket(bucket[i], key);
	    if (inBucket === 0) {
	      return bucket[i][1];
	    }
	  }
	  return;
	}

	var HashMap = function () {
	  function HashMap() {
	    var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 23;

	    _classCallCheck(this, HashMap);

	    this._table = createTable(initial);
	    this._loadFactor = 0.75;
	    this.insert = 0;
	  }
	  // TODO : replace to string with object stringify for objects


	  HashMap.prototype.put = function put(key, value) {
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % this._table.length;
	    var table = this._table;
	    var bucket = table[location];
	    insertKey(bucket, key, value);
	    this.insert += 1;
	    // check if rehashing needs to be done
	    if (this.insert / table.length >= 0.75) {
	      this.rehash();
	    }
	  };

	  HashMap.prototype.rehash = function rehash() {
	    var oldTable = this._table;
	    var oldKeys = this.getKeys();
	    var newTable = createTable(sieveOfAtkin(oldTable.length * 2));
	    for (var i = 0; i < oldKeys.length; i++) {
	      var key = oldKeys[i];
	      var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % newTable.length;
	      var bucket = newTable[location];
	      insertKey(bucket, key, this.getVal(key));
	    }
	    this._table = newTable;
	    return;
	  };
	  // TODO: add indexof polyfill ie<9


	  HashMap.prototype.contains = function contains(key) {
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % this._table.length;
	    var bucket = this._table[location];
	    return retVal(bucket, key) !== undefined;
	  };

	  HashMap.prototype.getVal = function getVal(key) {
	    var table = this._table;
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % table.length;
	    var bucket = table[location];
	    return retVal(bucket, key);
	  };

	  HashMap.prototype.tableSize = function tableSize() {
	    return this._table.length;
	  };

	  HashMap.prototype.size = function size() {
	    return this.insert;
	  };

	  HashMap.prototype.getKeys = function getKeys() {
	    function notEmpty(ele) {
	      return ele.length > 0;
	    }
	    var k = [];
	    var filtered = this._table.filter(notEmpty);
	    for (var i = 0; i < filtered.length; i++) {
	      for (var j = 0; j < filtered[i].length; j++) {
	        k.push(filtered[i][j][0]);
	      }
	    }
	    return k;
	  };

	  return HashMap;
	}();

	module.exports = HashMap;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BSTNode = __webpack_require__(8);
	var BSTPrototype = __webpack_require__(9);

	var BST = function () {
	  function BST() {
	    _classCallCheck(this, BST);

	    this.root = new BSTNode();
	  }

	  BST.prototype.insert = function insert(key, value) {
	    BSTPrototype.BSTInsert.apply(this, [key, value, BSTNode]);
	    return this;
	  };

	  BST.prototype.remove = function remove(key) {
	    BSTPrototype.BSTRemove.apply(this, [key]);
	    return this;
	  };

	  BST.prototype.find = function find(key) {
	    var node = BSTPrototype.search(this.root, key);
	    return node ? node.value : undefined;
	  };

	  BST.prototype.contains = function contains(key) {
	    return this.find(key).key ? true : false;
	  };

	  BST.prototype.inorder = function inorder() {
	    return BSTPrototype.inorder(this.root);
	  };

	  return BST;
	}();

	module.exports = BST;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BSTNode = function BSTNode(key, value) {
	  _classCallCheck(this, BSTNode);

	  this.parent = null;
	  this.left = null;
	  this.right = null;
	  this.key = key;
	  this.value = value;
	};

	module.exports = BSTNode;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	function BSTInsert(key, value, Node) {
	  var x = this.root;
	  var z = new Node(key, value);
	  var y = new Node();
	  while (x.key !== undefined) {
	    y = x;
	    if (z.key < x.key) {
	      x = x.left;
	    } else if (z.key > x.key) {
	      x = x.right;
	    } else {
	      return null;
	    }
	  }
	  z.parent = y;
	  if (y.key === undefined) {
	    this.root = z;
	  } else if (z.key < y.key) {
	    y.left = z;
	  } else {
	    y.right = z;
	  }
	  z.left = new Node();
	  z.right = new Node();
	  return z;
	}

	function search(root, key) {
	  if (root.key === undefined) {
	    return null;
	  }
	  if (root.key === key) {
	    return root;
	  }
	  if (root.key < key) {
	    return search(root.right, key);
	  }
	  return search(root.left, key);
	}

	function BSTRemove(key) {
	  var node = search(this.root, key);

	  if (!node) {
	    return false;
	  }

	  var y = void 0;
	  var x = void 0;
	  if (node.left.key === undefined || node.right.key === undefined) {
	    y = node;
	  } else {
	    var SRST = node.right;
	    while (SRST.key !== undefined) {
	      if (SRST.left.key === undefined) {
	        break;
	      }
	      SRST = SRST.left;
	    }
	    y = SRST;
	  }
	  if (y.left.key !== undefined) {
	    x = y.left;
	  } else {
	    x = y.right;
	  }
	  x.parent = y.parent;
	  if (!y.parent.key) {
	    this.root = x;
	  } else {
	    if (y.key === y.parent.left.key) {
	      y.parent.left = x;
	    } else {
	      y.parent.right = x;
	    }
	  }
	  if (y.key !== node.key) {
	    node.key = y.key;
	    node.value = y.value;
	  }
	  return { y: y, x: x };
	}
	// TODO : return key and value LOLLLLLLLLLLLLLLLLLLLLLLL
	function inorder(node) {
	  if (node.key !== undefined) {
	    var tmp = [];
	    return tmp.concat(inorder(node.left.key), node.key, inorder(node.right.key));
	  }
	  return [];
	}
	module.exports = {
	  BSTInsert: BSTInsert,
	  BSTRemove: BSTRemove,
	  search: search,
	  inorder: inorder
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Queue = __webpack_require__(3);
	var Stack = __webpack_require__(2);

	var Graph = function () {
	  function Graph() {
	    _classCallCheck(this, Graph);

	    this.graph = {};
	  }

	  Graph.prototype.addVertex = function addVertex(v) {
	    this.graph[v] = [];
	  };

	  Graph.prototype.addEdge = function addEdge(v1, v2, w) {
	    // replace with PQ
	    this.graph[v1].push({ v: v2, w: w });
	    this.graph[v2].push({ v: v1, w: w });
	  };

	  Graph.prototype.BFS = function BFS(v) {
	    var graph = this.graph;
	    var bfs = [];
	    var visited = {};
	    var q = new Queue();
	    q.enqueue(v);
	    while (q.size() !== 0) {
	      var x = q.dequeue();
	      if (!visited[x]) {
	        visited[x] = true;
	        bfs.push(x);
	        for (var i = 0; i < graph[x].length; i += 1) {
	          if (!visited[graph[x][i].v]) {
	            q.enqueue(graph[x][i].v);
	          }
	        }
	      }
	    }
	    return bfs;
	  };

	  Graph.prototype.DFS = function DFS(v) {
	    var graph = this.graph;
	    var dfs = [];
	    var visited = {};
	    var s = new Stack();
	    s.push(v);
	    while (s.size() !== 0) {
	      var x = s.pop();
	      if (!visited[x]) {
	        visited[x] = true;
	        dfs.push(x);
	        for (var i = 0; i < graph[x].length; i += 1) {
	          if (!visited[graph[x][i].v]) {
	            s.push(graph[x][i].v);
	          }
	        }
	      }
	    }
	    return dfs;
	  };

	  Graph.prototype.isConnected = function isConnected() {
	    var graph = this.graph;
	    var firstKey = '';
	    var verticies = Object.keys(graph);
	    firstKey = verticies[0];
	    return this.BFS(firstKey).length === verticies.length;
	  };

	  return Graph;
	}();

	module.exports = Graph;

/***/ }
/******/ ])
});
;