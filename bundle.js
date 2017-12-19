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
	var HashSet = __webpack_require__(7);
	var BST = __webpack_require__(8);
	var Graph = __webpack_require__(11);
	var Trie = __webpack_require__(12);

	Array.prototype.SWAG = function () {
	    return "This is where I can place shims";
	};

	module.exports = { List: List, Stack: Stack, Queue: Queue, BHeap: BHeap, PriorityQueue: PriorityQueue, HashMap: HashMap, HashSet: HashSet, BST: BST, Graph: Graph, Trie: Trie };

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getNode(index) {
	  var head = this.head;
	  if (index < 0 || !head) {
	    throw new RangeError('out of bounds');
	  }
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
	/**
	 * Nodes for Linked List
	 * @class
	 * @private
	 **/

	var Node = function Node(data) {
	  _classCallCheck(this, Node);

	  this.data = data;
	  this.next = null;
	  this.prev = null;
	};
	/**Linked List Representation
	 * @class
	 * @public
	 * @example 
	 * const list = new Structs.List();
	 **/


	var List = function () {
	  function List() {
	    _classCallCheck(this, List);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }
	  /** Adds data to far left of list
	   * @public
	   * @param {*} data - the  data to insert into list
	   * @returns {this} 'this' List
	   * @example
	   * list.addToFront("a")
	   * .addToFront("b")
	   * //result is <"b", "a">
	   **/


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
	  /** returns element at the given index
	   * @public
	   * @param {Object} index- data at selected index
	   * @returns {Object} data field of list node or throws error
	   * if index out of bounds
	   * @example
	   * list.addTOFront("a");
	   * .addTOFront("b");
	   * .addTOFront("c");
	   * list.elementAtIndex(1);
	   * //returns b
	   **/


	  List.prototype.elementAtIndex = function elementAtIndex(index) {
	    isNumber(index);
	    var wanted = getNode.apply(this, [index]);
	    return wanted ? wanted.data : undefined;
	  };
	  /** Adds data to far right of list
	   * @public
	   * @param {Object} data to insert into front of list
	   * @returns {@this List}
	   **/


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
	  /** removes data from far left of list
	   * @public
	   * @returns {Object} removed item
	   **/


	  List.prototype.removeFront = function removeFront() {
	    var head = this.head,
	        length = this.length;

	    var removed = void 0;
	    if (head) {
	      removed = head.data;
	      this.length = length - 1;
	      this.head = head.next;
	      var newHead = this.head;
	      // list is now empty...adjust tail
	      if (!newHead) {
	        this.tail = this.head;
	        return removed;
	      }
	      newHead.prev = null;
	    }
	    return removed;
	  };
	  /** removes data from far right of list
	   * @public
	   * @returns {Object} removed item
	   **/


	  List.prototype.removeBack = function removeBack() {
	    var tail = this.tail,
	        length = this.length;

	    if (!this.tail) {
	      return this;
	    }
	    var removed = tail.data;
	    var prev = tail.prev;
	    this.length = length - 1;
	    // list now empty
	    if (!prev) {
	      this.tail = null;
	      this.head = null;
	      return removed;
	    }
	    prev.next = null;
	    this.tail = prev;
	    return removed;
	  };
	  /**Inserts given data into specefic position in List
	   * @param {Number} index to insert data
	   * @param {Object} data to insert into List.
	   * @public
	   * @returns {@this List} 
	   **/


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

	  /**removes data from specefic position in List
	   * @param {Number} index to insert data
	   * @public
	   * @returns {@this List} 
	   **/


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
	    var data = node.data;
	    var del = node.next;
	    var after = del.next;
	    node.next = after;
	    after.prev = node;
	    this.length = length - 1;
	    return data;
	  };
	  /** figures out the index of a certain piece of data
	   * @param {Object} data to insert into list
	   * @param {Function} eqlFunc to use as comparator against List data
	   * @public
	   * @returns {Number} index of the item or -1 if not in List
	   **/


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
	  /** figures out the List contains a certain piece of data
	   * @param {Object} data to search in List
	   * @param {Function} eqlFunc to use as comparator against List data
	   * @public
	   * @returns {Number} index of the item in List or -1 
	   **/


	  List.prototype.contains = function contains(data, eqlFunc) {
	    return this.indexOf(data, eqlFunc) !== -1;
	  };
	  /** empties Entire List
	   * @public
	   * @returns {Void}
	   **/


	  List.prototype.clear = function clear() {
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  };
	  /** the size of this List
	   * @public
	   * @returns {Number} number of items in this List
	   **/


	  List.prototype.size = function size() {
	    return this.length;
	  };
	  /** finds out if this List is empty
	   * @public
	   * @returns {Number} true if this is empty and false otherwise
	   **/


	  List.prototype.isEmpty = function isEmpty() {
	    return !this.head && !this.tail;
	  };
	  /** calls a function on each piece of data in List
	   * @param {Function} callback function to be run on data
	   * @public
	   * @returns {@this List}
	   **/


	  List.prototype.forEach = function forEach(callback) {
	    var func = callback;
	    var head = this.head;

	    while (head) {
	      func(head.data);
	      head = head.next;
	    }
	    return this;
	  };
	  /** Returns an array representaion of this
	   * @public
	   * @returns {Array} List to Native Array
	   **/


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
	/** LIFO stack 
	 * @class 
	 * @public
	 **/

	var Stack = function () {
	  function Stack() {
	    _classCallCheck(this, Stack);

	    this.rep = new List();
	  }
	  /**
	   * @param {object} data - data to push onto stack
	   * @returns {object} this - the current list
	   **/


	  Stack.prototype.push = function push(data) {
	    this.rep.addToFront(data);
	    return this;
	  };

	  Stack.prototype.pop = function pop() {
	    return this.rep.removeFront();
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
	    return this.rep.removeFront();
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

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// from immutable.js implementation of java hashcode
	//https://github.com/facebook/immutable-js/blob/master/src/Hash.js
	//better distribution than fnv TODO: change fnv name
	function fnv(str) {
	  var hash = 0;
	  for (var i = 0; i < str.length; i += 1) {
	    hash = 31 * hash + str.charCodeAt(i) | 0;
	  }
	  return hash;
	}
	function mod(a, b) {
	  var modulo = a % b;
	  if (a < 0) {
	    return modulo * -1;
	  }
	  return modulo;
	}
	function createTable(size) {
	  var newTable = [];
	  for (var i = 0; i < size; i += 1) {
	    newTable.push([]);
	  }
	  return newTable;
	}
	function toString(obj) {
	  var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
	  if (type === "string" || type === "number") {
	    return obj.toString();
	  } else if (type === "boolean" || type === "function") {
	    return obj.toString();
	  } else {
	    return JSON.stringify(obj);
	  }
	}
	function insert(k, v, table) {
	  var hash = fnv(toString(k) + (typeof k === "undefined" ? "undefined" : _typeof(k)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  return bucket.push(k, v);
	}
	function search(k) {
	  var table = this.table;

	  var toStr = toString(k);
	  var hash = fnv(toStr + (typeof k === "undefined" ? "undefined" : _typeof(k)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  for (var i = 0; i < bucket.length; i += 2) {
	    if (k === bucket[i]) {
	      return { bucket: bucket, i: i };
	    }
	  }
	  return { bucket: undefined, i: -1 };
	}

	var HashMap = function () {
	  function HashMap() {
	    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 13;

	    _classCallCheck(this, HashMap);

	    this.inserts = 0;
	    this.table = createTable(size);
	  }

	  HashMap.prototype.put = function put(k, v) {
	    if (this.contains(k)) {
	      return false;
	    }
	    var table = this.table;

	    insert(k, v, table);
	    this.inserts += 1;
	    if (this.inserts / this.table.length >= 0.75) {
	      this.rehash();
	    }
	    return true;
	  };

	  HashMap.prototype.getVal = function getVal(k) {
	    if (!this.contains(k)) {
	      return;
	    }
	    var searchRes = search.call(this, k);
	    var bucket = searchRes.bucket,
	        i = searchRes.i;

	    return bucket[i + 1];
	  };

	  HashMap.prototype.remove = function remove(k) {
	    if (!this.contains(k)) {
	      return;
	    }
	    var searchRes = search.call(this, k);
	    var bucket = searchRes.bucket,
	        i = searchRes.i;

	    bucket.splice(i, 1);
	    bucket.splice(i, 1);
	    this.inserts -= 1;
	  };

	  HashMap.prototype.contains = function contains(k) {
	    var searchRes = search.call(this, k);
	    var i = searchRes.i;

	    return i !== -1;
	  };

	  HashMap.prototype.rehash = function rehash() {
	    var oldTable = this.table;
	    var newTable = createTable(oldTable.length * 2);
	    for (var i = 0; i < oldTable.length; i += 1) {
	      for (var j = 0; j < oldTable[i].length; j += 2) {
	        var k = oldTable[i][j];
	        var v = oldTable[i][j + 1];
	        insert(k, v, newTable);
	      }
	    }
	    this.table.length = 0;
	    this.table = newTable;
	  };

	  HashMap.prototype.update = function update(k, newVal) {
	    if (!this.contains(k)) {
	      return;
	    }
	    var searchRes = search.call(this, k);
	    var bucket = searchRes.bucket,
	        i = searchRes.i;

	    bucket[i + 1] = newVal;
	  };

	  HashMap.prototype.keys = function keys() {
	    var table = this.table;
	    var keyArr = [];
	    for (var i = 0; i < table.length; i += 1) {
	      for (var j = 0; j < table[i].length; j += 2) {
	        keyArr.push(table[i][j]);
	      }
	    }
	    return keyArr;
	  };

	  HashMap.prototype.tableSize = function tableSize() {
	    return this.table.length;
	  };

	  HashMap.prototype.size = function size() {
	    return this.inserts;
	  };

	  return HashMap;
	}();

	module.exports = HashMap;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HashMap = __webpack_require__(6);

	var HashSet = function () {
	  function HashSet() {
	    _classCallCheck(this, HashSet);

	    this.set = new HashMap();
	  }

	  HashSet.prototype.add = function add(k) {
	    return this.set.put(k, null);
	  };

	  HashSet.prototype.diff = function diff(thatSet) {
	    var thatKeys = thatSet.keys();
	    var context = this;
	    thatKeys.forEach(function func(k) {
	      context.remove(k);
	    });
	  };

	  HashSet.prototype.has = function has(k) {
	    return this.set.contains(k);
	  };

	  HashSet.prototype.keys = function keys() {
	    return this.set.keys();
	  };

	  HashSet.prototype.remove = function remove(k) {
	    return this.set.remove(k);
	  };

	  HashSet.prototype.intersect = function intersect(thatSet) {
	    var thisKeys = this.keys();
	    var context = this;
	    thisKeys.forEach(function func(k) {
	      if (!thatSet.has(k)) {
	        context.remove(k);
	      }
	    });
	  };

	  HashSet.prototype.cardinality = function cardinality() {
	    return this.set.size();
	  };

	  return HashSet;
	}();

	module.exports = HashSet;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BSTNode = __webpack_require__(9);
	var BSTPrototype = __webpack_require__(10);

	function defaulComp(a, b) {
	  if (a < b) {
	    return -1;
	  } else if (a > b) {
	    return 1;
	  }
	  return 0;
	}

	var BST = function () {
	  function BST(comparator) {
	    _classCallCheck(this, BST);

	    this.root = new BSTNode();
	    this.comp = comparator || defaulComp;
	  }

	  BST.prototype.insert = function insert(key, value) {
	    BSTPrototype.BSTInsert.apply(this, [key, value, BSTNode]);
	    return this;
	  };

	  BST.prototype.remove = function remove(key) {
	    BSTPrototype.BSTRemove.call(this, key, BSTNode);
	    return this;
	  };

	  BST.prototype.find = function find(key) {
	    var node = BSTPrototype.search.call(this, this.root, key);
	    return node ? node.value : undefined;
	  };

	  BST.prototype.contains = function contains(key) {
	    var node = BSTPrototype.search.call(this, this.root, key);
	    return node ? true : false;
	  };

	  BST.prototype.inorder = function inorder() {
	    return BSTPrototype.inorder(this.root);
	  };

	  return BST;
	}();

	module.exports = BST;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	"use strict";

	function BSTInsert() {
	  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var Node = arguments[2];

	  var comp = this.comp;
	  var x = this.root;
	  var z = new Node(key, value);
	  var y = new Node();
	  while (x.key !== undefined) {
	    y = x;
	    if (comp(z.key, x.key) === -1) {
	      x = x.left;
	    } else if (comp(z.key, x.key) === 1) {
	      x = x.right;
	    } else {
	      x.value = value;
	      return null;
	    }
	  }
	  z.parent = y;
	  if (y.key === undefined) {
	    this.root = z;
	  } else if (comp(z.key, y.key) === -1) {
	    y.left = z;
	  } else {
	    y.right = z;
	  }
	  z.left = new Node();
	  z.right = new Node();
	  return z;
	}

	function search(root, key) {
	  var comp = this.comp;
	  if (!root || root.key === undefined) {
	    return null;
	  }
	  if (comp(root.key, key) === 0) {
	    return root;
	  }
	  if (comp(root.key, key) === -1) {
	    return search.call(this, root.right, key);
	  }
	  return search.call(this, root.left, key);
	}
	function successor(node) {
	  var suc = node.right;
	  if (suc.left.key === undefined) {
	    return suc;
	  }
	  while (suc.left.key !== undefined) {
	    suc = suc.left;
	  }
	  return suc;
	}
	function numChildren(node) {
	  var left = node.left.key;
	  var right = node.right.key;
	  if (left === undefined && right === undefined) {
	    return 0;
	  } else if (left === undefined && right !== undefined || right === undefined && left !== undefined) {
	    return 1;
	  }
	  return 2;
	}
	function remove0(node, NodeType) {
	  var comp = this.comp;
	  if (comp(this.root.key, node.key) === 0) {
	    this.root = new NodeType();
	    return;
	  }
	  var parent = node.parent;
	  if (comp(parent.right.key, node.key) === 0) {
	    parent.right = node.right;
	  } else {
	    parent.left = node.left;
	  }
	}

	function remove1(node) {
	  var comp = this.comp;
	  if (comp(node.key, this.root.key) === 0) {
	    var root = this.root;
	    if (root.left.key !== undefined) {
	      this.root = root.left;
	      root.left.parent = root.parent;
	    } else {
	      this.root = root.right;
	      root.right.parent = root.parent;
	    }
	    return;
	  }
	  // node to delete is left child
	  var parent = node.parent;
	  if (comp(parent.left.key, node.key) === 0) {
	    if (node.right.key !== undefined) {
	      parent.left = node.right;
	      node.right.parent = parent;
	    } else {
	      parent.left = node.left;
	      node.left.parent = parent;
	    }
	    return;
	  }
	  // node to delete is right child
	  if (node.right.key !== undefined) {
	    parent.right = node.right;
	    node.right.parent = parent;
	  } else {
	    parent.right = node.left;
	    node.left.parent = parent;
	  }
	}

	function remove2(node) {
	  var nodeSucc = successor(node);
	  var oldKey = node.key;
	  node.key = nodeSucc.key;
	  node.value = nodeSucc.value;
	  nodeSucc.key = oldKey;
	  // successor can only have one child at most and must be right child, left child is
	  // contradiction
	  var succChildren = numChildren(nodeSucc);
	  if (succChildren === 0) {
	    return remove0.call(this, nodeSucc);
	  }
	  return remove1.call(this, nodeSucc);
	}

	function BSTRemove(key, nodeType) {
	  var node = search.call(this, this.root, key);
	  if (!node) {
	    return false;
	  }
	  var children = numChildren(node);
	  if (children === 0) {
	    remove0.call(this, node, nodeType);
	    return;
	  } else if (children === 1) {
	    remove1.call(this, node);
	    return;
	  }
	  remove2.call(this, node, nodeType);
	}

	function inorder(node) {
	  if (node && node.key !== undefined) {
	    var tmp = [];
	    return tmp.concat(inorder(node.left), node, inorder(node.right));
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
/* 11 */
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
	    if (this.graph[v1] && this.graph[v2]) {
	      this.graph[v1].push({ v: v2, w: w });
	      this.graph[v2].push({ v: v1, w: w });
	    }
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
/* 12 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getPrefix(pfx) {
	  var cur = this.root.children;
	  var char = void 0;
	  for (var i = 0; i < pfx.length - 1; i += 1) {
	    char = pfx.charAt(i);
	    cur = cur[char].children;
	  }
	  return cur;
	}
	function recurseTree(node, arr) {
	  var words = arr;
	  if (!node) {
	    return;
	  }
	  var keys = Object.keys(node.children);
	  for (var i = 0; i < keys.length; i += 1) {
	    var curChild = node.children[keys[i]];
	    if (curChild.word) {
	      words.push(curChild.word);
	    }
	    recurseTree(curChild, arr);
	  }
	}
	function hasChild(obj) {
	  for (var prop in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	      return true;
	    }
	  }
	  return false;
	}

	var TrieNode = function TrieNode() {
	  _classCallCheck(this, TrieNode);

	  this.children = {};
	  this.endOfWord = false;
	  this.word = null;
	};

	var Trie = function () {
	  function Trie() {
	    _classCallCheck(this, Trie);

	    this.root = new TrieNode();
	  }

	  Trie.prototype.addWord = function addWord(word) {
	    var cur = this.root.children;
	    if (word.length === 0) {
	      return;
	    }
	    var wrd = word.toString().toLowerCase();
	    var char = void 0;
	    for (var i = 0; i < wrd.length; i += 1) {
	      char = wrd.charAt(i);
	      if (!cur[char]) {
	        cur[char] = new TrieNode();
	      }
	      if (i === wrd.length - 1) {
	        cur[char].endOfWord = true;
	        cur[char].word = wrd;
	      }
	      cur = cur[char].children;
	    }
	  };

	  Trie.prototype.containsWord = function containsWord(word) {
	    if (word.length === 0) {
	      return false;
	    }
	    var cur = this.root.children;
	    // check contains word first
	    for (var i = 0; i < word.length; i += 1) {
	      var char = cur[word[i]];
	      if (!char) {
	        return false;
	      } else if (char.word === word) {
	        return true;
	      }
	      cur = cur[word[i]].children;
	    }
	    return false;
	  };

	  Trie.prototype.containsPrefix = function containsPrefix(pfx) {
	    if (pfx.length === 0) {
	      return false;
	    }
	    var cur = this.root.children;

	    for (var i = 0; i < pfx.length; i += 1) {
	      var char = pfx.charAt(i);
	      if (!cur[char]) {
	        return false;
	      } else if (cur[char].word === pfx) {
	        // if word and has no children, it cannot be prefix, but can be word and still be prefix
	        var noChildren = hasChild(cur[char].children) === false;
	        if (noChildren) {
	          return false;
	        }
	        return true;
	      }
	      cur = cur[char].children;
	    }
	    return true;
	  };

	  Trie.prototype.prefixAll = function prefixAll(pfx) {
	    if (!this.containsPrefix(pfx)) {
	      return [];
	    }
	    var prefixTail = getPrefix.call(this, pfx);
	    var prefixes = [];
	    var lastChar = pfx.charAt(pfx.length - 1);
	    recurseTree(prefixTail[lastChar], prefixes);
	    return prefixes;
	  };

	  return Trie;
	}();

	module.exports = Trie;

/***/ }
/******/ ])
});
;