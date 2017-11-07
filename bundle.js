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
	var RBTree = __webpack_require__(10);
	var Set = __webpack_require__(12);
	var Graph = __webpack_require__(13);
	var AVL = __webpack_require__(14);

	Array.prototype.SWAG = function () {
	    return "This is where I can place shims";
	};

	module.exports = { List: List, Stack: Stack, Queue: Queue, BHeap: BHeap, PriorityQueue: PriorityQueue, HashMap: HashMap, BST: BST, RBTree: RBTree, Set: Set, Graph: Graph, AVL: AVL };

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

	function rehash() {
	  var oldTable = this._table;
	  this._table = [];
	  this._table.length = sieveOfAtkin(oldTable.length * 2);
	  this.insert = 0;
	  for (var i = 0; i < oldTable.length; i += 1) {
	    if (oldTable[i]) {
	      for (var j = 0; j < oldTable[i].length; j += 2) {
	        this.put(oldTable[i][j], oldTable[i][j + 1]);
	      }
	    }
	  }
	}

	function fnv(str) {
	  var hash = 0x811c9dc5;
	  for (var i = 0; i < str.length; i += 1) {
	    hash ^= str.charCodeAt(i);
	    hash *= 0x01000193;
	  }
	  return hash < 0 ? hash * -1 : hash;
	}

	var HashMap = function () {
	  function HashMap() {
	    var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 23;

	    _classCallCheck(this, HashMap);

	    this._table = [];
	    this._table.length += initial;
	    this._loadFactor = 0.75;
	    this.insert = 0;
	  }
	  // TODO : replace to string with object stringify for objects


	  HashMap.prototype.put = function put(key, value) {
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % this._table.length;
	    var table = this._table;
	    var bucket = table[location];
	    if (!bucket) {
	      table[location] = [];
	      table[location].push(key, value);
	      this.insert += 1;
	    } else {
	      var keyIndex = bucket.indexOf(key);
	      if (keyIndex !== -1) {
	        bucket[keyIndex + 1] = value;
	      } else {
	        bucket.push(key, value);
	        this.insert += 1;
	      }
	    }
	    // check if rehashing needs to be done
	    if (this.insert / table.length >= 0.75) {
	      rehash.call(this);
	    }
	  };
	  // TODO: add indexof polyfill ie<9


	  HashMap.prototype.contains = function contains(key) {
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % this._table.length;
	    return this._table[location] && this._table[location].indexOf(key) !== -1;
	  };

	  HashMap.prototype.getVal = function getVal(key) {
	    var table = this._table;
	    var location = fnv(objToString(key) + '' + (typeof key === 'undefined' ? 'undefined' : _typeof(key))) % this._table.length;
	    var bucket = table[location];
	    if (bucket) {
	      var keyIndex = bucket.indexOf(key);
	      if (keyIndex !== -1) {
	        return bucket[keyIndex + 1];
	      }
	    }
	  };

	  HashMap.prototype.keys = function keys() {
	    var table = this._table;
	    var keyArr = [];
	    var filledBuckets = Object.keys(table);
	    for (var i = 0; i < filledBuckets.length; i += 1) {
	      var curBucket = table[filledBuckets[i]];
	      for (var j = 0; j < curBucket.length; j += 2) {
	        keyArr.push(curBucket[j]);
	      }
	    }
	    return keyArr;
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
	  };

	  BST.prototype.remove = function remove(key) {
	    BSTPrototype.BSTRemove.apply(this, [key]);
	  };

	  BST.prototype.find = function find(key) {
	    return BSTPrototype.search(this.root, key);
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

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BSTNode = __webpack_require__(8);
	var BSTPrototype = __webpack_require__(9);
	var RBTreePrototype = __webpack_require__(11);
	var BST = __webpack_require__(7);

	var RBNode = function (_BSTNode) {
	  _inherits(RBNode, _BSTNode);

	  function RBNode(key, value) {
	    _classCallCheck(this, RBNode);

	    var _this = _possibleConstructorReturn(this, _BSTNode.call(this, key, value));

	    _this.color = 'black';
	    return _this;
	  }

	  return RBNode;
	}(BSTNode);

	var RBTree = function (_BST) {
	  _inherits(RBTree, _BST);

	  function RBTree() {
	    _classCallCheck(this, RBTree);

	    var _this2 = _possibleConstructorReturn(this, _BST.call(this));

	    _this2.root = new RBNode();
	    return _this2;
	  }

	  RBTree.prototype.insert = function insert(key, value) {
	    var insertedNode = BSTPrototype.BSTInsert.apply(this, [key, value, RBNode]);
	    insertedNode.color = 'red';
	    RBTreePrototype.insertFix.apply(this, [insertedNode]);
	  };

	  RBTree.prototype.remove = function remove(key) {
	    var removeNode = BSTPrototype.BSTRemove.apply(this, [key]);
	    if (removeNode && removeNode.y.color === 'black') {
	      RBTreePrototype.deletefixUp.apply(this, [removeNode.x]);
	    }
	  };

	  RBTree.prototype.find = function find(key) {
	    return _BST.prototype.find.call(this, key);
	  };

	  RBTree.prototype.constains = function constains(key) {
	    _BST.prototype.contains.call(this, key);
	  };

	  return RBTree;
	}(BST);

	module.exports = RBTree;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	function leftRotate(x) {
	  var y = x.right;
	  x.right = y.left;
	  if (y.left.key === undefined) {
	    y.left.parent = x;
	  }
	  y.parent = x.parent;
	  if (x.parent.key === undefined) {
	    this.root = y;
	  } else if (x.key === x.parent.left.key) {
	    x.parent.left = y;
	  } else {
	    x.parent.right = y;
	  }

	  y.left = x;
	  x.parent = y;
	}
	function rightRotate(x) {
	  var y = x.left;
	  x.left = y.right;
	  if (y.right.key === undefined) {
	    y.right.parent = x;
	  }
	  y.parent = x.parent;
	  if (x.parent.key === undefined) {
	    this.root = y;
	  } else if (x.key === x.parent.right.key) {
	    x.parent.right = y;
	  } else {
	    x.parent.left = y;
	  }

	  y.right = x;
	  x.parent = y;
	}

	function insertFix(node) {
	  while (node.parent && node.parent.parent && node.parent.color === 'red') {
	    var uncle = void 0;
	    if (node.parent.key === node.parent.parent.left.key) {
	      uncle = node.parent.parent.right;
	      if (uncle.color === 'red') {
	        node.parent.color = 'black';
	        uncle.color = 'black';
	        node = node.parent.parent;
	        node.color = 'red';
	      } else {
	        if (node.key === node.parent.right.key) {
	          node = node.parent;
	          leftRotate.apply(this, [node]);
	        }
	        node.parent.color = 'black';
	        node.parent.parent.color = 'red';
	        rightRotate.apply(this, [node.parent.parent]);
	      }
	    } else if (node.parent.key === node.parent.parent.right.key) {
	      uncle = node.parent.parent.left;
	      if (uncle.color === 'red') {
	        node.parent.color = 'black';
	        uncle.color = 'black';
	        node = node.parent.parent;
	        node.color = 'red';
	      } else {
	        if (node.key === node.parent.left.key) {
	          node = node.parent;
	          rightRotate.apply(this, [node]);
	        }
	        node.parent.color = 'black';
	        node.parent.parent.color = 'red';
	        leftRotate.apply(this, [node.parent.parent]);
	      }
	    }
	  }
	  this.root.color = 'black';
	}

	function deletefixUp(node) {
	  while (node.parent.key !== undefined && node.color === 'black') {
	    var w = void 0;
	    if (node.key === node.parent.left.key) {
	      w = node.parent.right;
	      if (w.color === 'red') {
	        w.color = 'black';
	        node.parent.color = 'red';
	        leftRotate.apply(this, [node.parent]);
	        w = node.parent.right;
	      }
	      if (w.left.color === 'black' && w.right.color === 'black') {
	        w.color = 'red';
	        node = node.parent;
	      } else {
	        if (w.right.color === 'black') {
	          w.left.color = 'black';
	          w.color = 'red';
	          rightRotate.apply(this, [w]);
	          w = node.parent.right;
	        }
	        w.color = node.parent.color;
	        node.parent.color = 'black';
	        w.right.color = 'black';
	        leftRotate.apply(this, [node.parent]);
	        node = this.root;
	      }
	    } else {
	      w = node.parent.left;
	      if (w.color === 'red') {
	        w.color = 'black';
	        node.parent.color = 'red';
	        rightRotate.apply(this, [node.parent]);
	        w = node.parent.left;
	      }
	      if (w.right.color === 'black' && w.left.color === 'black') {
	        w.color = 'red';
	        node = node.parent;
	      } else {
	        if (w.left.color === 'black') {
	          w.right.color = 'black';
	          w.color = 'red';
	          leftRotate.apply(this, [w]);
	          w = node.parent.left;
	        }
	        w.color = node.parent.color;
	        node.parent.color = 'black';
	        w.left.color = 'black';
	        rightRotate.apply(this, [node.parent]);
	        node = this.root;
	      }
	    }
	  }
	  node.color = 'black';
	}
	module.exports = { insertFix: insertFix, deletefixUp: deletefixUp };

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function isArray(arg) {
	  return Object.prototype.toString.call(arg) === '[object Array]';
	}

	var Set = function () {
	  function Set() {
	    var _this = this;

	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    _classCallCheck(this, Set);

	    this.set = [];
	    if (!isArray(args)) {
	      throw new TypeError('expected type Array');
	    }
	    args.forEach(function (element) {
	      return _this.add(element);
	    });
	  }

	  Set.isSet = function isSet($set) {
	    return $set instanceof Set;
	  };

	  Set.prototype.union = function union($set) {
	    var thisSet = this.set;
	    var thatSet = $set.toArray();
	    var unionSet = new Set([].concat(thisSet));
	    unionSet.add.apply(unionSet, thatSet);
	    return unionSet;
	  };

	  Set.prototype.intersect = function intersect($set) {
	    var thisSet = this.set;
	    var thatSet = $set.toArray();
	    var cross = thisSet.filter(function (element) {
	      return thatSet.indexOf(element) !== -1;
	    });
	    return new Set(cross);
	  };

	  Set.prototype.add = function add() {
	    // call is array method from base
	    var thisSet = this.set;
	    var args = arguments;
	    for (var i = 0; i < args.length; i += 1) {
	      var curArg = args[i];
	      if (!this.contains(curArg)) {
	        thisSet.push(curArg);
	      }
	    }
	    return this;
	  };

	  Set.prototype.removeAny = function removeAny() {
	    if (!this.size() > 0) {
	      return;
	    }
	    var thisSet = this.set;
	    var randNum = Math.floor(Math.random() * 2);
	    var element = void 0;
	    if (randNum === 0) {
	      element = thisSet.pop();
	      return element;
	    }
	    element = thisSet.shift();
	    return element;
	  };

	  Set.prototype.size = function size() {
	    return this.set.length;
	  };

	  Set.prototype.diff = function diff($set) {
	    var thisSet = this.set;
	    var thatSet = $set.toArray();
	    var diff = thisSet.filter(function (element) {
	      return thatSet.indexOf(element) === -1;
	    });
	    return new Set(diff);
	  };

	  Set.prototype.product = function product($set) {
	    var thisSet = this.set;
	    var thatSet = $set.toArray();
	    var cartesian = new Set();
	    for (var i = 0; i < thisSet.length; i += 1) {
	      for (var j = 0; j < thatSet.length; j += 1) {
	        cartesian.add([[thisSet[i], thatSet[j]]]);
	      }
	    }
	    return cartesian;
	  };

	  Set.prototype.toArray = function toArray() {
	    return Array.from(this.set);
	  };

	  Set.prototype.contains = function contains(key) {
	    return this.set.indexOf(key) !== -1;
	  };

	  return Set;
	}();

	module.exports = Set;

/***/ },
/* 13 */
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BSTNode = __webpack_require__(8);
	var BSTPrototype = __webpack_require__(9);

	function height(z) {
	  if (!z) {
	    return 0;
	  }
	  return z.height;
	}

	function leftRotate(x) {
	  var y = x.right;
	  x.right = y.left;
	  if (y.left.key === undefined) {
	    y.left.parent = x;
	  }
	  y.parent = x.parent;
	  if (x.parent.key === undefined) {
	    this.root = y;
	  } else if (x.key === x.parent.left.key) {
	    x.parent.left = y;
	  } else {
	    x.parent.right = y;
	  }
	  y.left = x;
	  x.parent = y;
	  x.height = Math.max(height(x.left), height(x.right)) + 1;
	  y.height = Math.max(height(y.left), height(y.right)) + 1;
	}

	function rightRotate(x) {
	  var y = x.left;
	  x.left = y.right;
	  if (y.right.key === undefined) {
	    y.right.parent = x;
	  }
	  y.parent = x.parent;
	  if (x.parent.key === undefined) {
	    this.root = y;
	  } else if (x.key === x.parent.right.key) {
	    x.parent.right = y;
	  } else {
	    x.parent.left = y;
	  }
	  y.right = x;
	  x.parent = y;
	  x.height = Math.max(height(x.left), height(x.right)) + 1;
	  y.height = Math.max(height(y.left), height(y.right)) + 1;
	}
	function getBalance(z) {
	  if (!z) {
	    return 0;
	  }
	  return z.left.height - z.right.height;
	}
	function fixUp(node) {
	  node.height = 1 + Math.max(height(node.left), height(node.right));
	  var balance = getBalance(node);
	  if (balance > 1) {
	    if (getBalance(node.left) < 0) {
	      leftRotate.call(this, node.left);
	    }
	    return rightRotate.call(this, node);
	  }
	  if (balance < -1) {
	    if (getBalance(node.right) > 0) {
	      rightRotate.call(this, node.right);
	    }
	    return leftRotate.call(this, node);
	  }
	  if (node.parent.key !== undefined) {
	    fixUp.call(this, node.parent);
	  }
	}

	var AVLNode = function (_BSTNode) {
	  _inherits(AVLNode, _BSTNode);

	  function AVLNode(key, value) {
	    _classCallCheck(this, AVLNode);

	    var _this = _possibleConstructorReturn(this, _BSTNode.call(this, key, value));

	    _this.height = 0;
	    return _this;
	  }

	  return AVLNode;
	}(BSTNode);

	var AVL = function () {
	  function AVL() {
	    _classCallCheck(this, AVL);

	    this.root = new AVLNode();
	  }

	  AVL.prototype.insert = function insert(key, value) {
	    var inserted = BSTPrototype.BSTInsert.apply(this, [key, value, AVLNode]);
	    if (inserted) {
	      fixUp.call(this, inserted);
	    }
	  };

	  AVL.prototype.remove = function remove(key) {
	    var removed = BSTPrototype.BSTRemove.apply(this, [key]);
	    // y is removed node so we trickle up to it's parent
	    if (removed) {
	      fixUp.call(this, removed.y);
	    }
	  };

	  return AVL;
	}();

	module.exports = AVL;

/***/ }
/******/ ])
});
;