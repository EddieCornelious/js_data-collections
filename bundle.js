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
	var PriorityQueue = __webpack_require__(6);
	var HashMap = __webpack_require__(7);
	var HashSet = __webpack_require__(8);
	var BST = __webpack_require__(9);
	var Graph = __webpack_require__(12);
	var Trie = __webpack_require__(13);
	var HashMultiMap = __webpack_require__(14);
	var ArrayUtils = __webpack_require__(15);

	Array.prototype.SWAG = function () {
	    return "This is where I can place shims";
	};

	module.exports = { List: List, Stack: Stack, Queue: Queue, BHeap: BHeap, PriorityQueue: PriorityQueue, HashMap: HashMap, HashMultiMap: HashMultiMap, HashSet: HashSet, BST: BST, Graph: Graph, Trie: Trie, ArrayUtils: ArrayUtils };

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
	    var data = node.data;
	    var del = node.next;
	    var after = del.next;
	    node.next = after;
	    after.prev = node;
	    this.length = length - 1;
	    return data;
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @private
	 * @param {Array} array - array to sift down on.
	 * @param {number} index - index to start the sift down operation.
	 * @param {function} comp - comparator to use against parent and child elements.
	 * @returns {undefined}
	 */
	function heapify(array, index, comp) {
	  var left = 2 * index;
	  var right = 2 * index + 1;
	  var numIndicies = array.length - 1;
	  var largest = void 0;

	  if (left <= numIndicies && comp(array[left], array[index]) === 1) {
	    largest = left;
	  } else {
	    largest = index;
	  }

	  if (right <= numIndicies && comp(array[right], array[largest]) === 1) {
	    largest = right;
	  }

	  if (largest !== index) {
	    (0, _Util.swap)(array, index, largest);
	    heapify(array, largest, comp);
	  }
	}
	/**
	 * @private
	 * @param {Array} array - array to sift up on.
	 * @param {number} index - index to start the sift up operation.
	 * @param {function} comp - comparator to use against parent and child elements.
	 * @returns {undefined}
	 */
	function siftUp(array, index, comp) {
	  if (index > 1) {
	    var parent = Math.floor(index / 2);
	    if (comp(array[parent], array[index]) === -1) {
	      (0, _Util.swap)(array, parent, index);
	      siftUp(array, parent, comp);
	    }
	  }
	}
	/**
	 * Binary heap representation
	 * @class
	 * @param {function} [comparator] - function used to
	 * compare parent and child for heap operations
	 * @example
	 * const heap = new Structs.BHeap();
	 * // this creates a max heap by default.
	 * function (a, b){
	     if (a < b) {
	       return -1;
	    } else if (a > b) {
	       return 1;
	    } else {
	       return 0;
	    }
	 }
	 * // to get a min heap swap -1 and 1
	 * // you can also use a custom comparator for objects : For example,
	 * // if your ojects have the pattern
	 * // user {id : "", age: 22} simply put something like
	 * if (a.age < b.age) {
	        return -1;
	 }........
	 * // this will give u the person with the highest age at the top of the heap.
	 */

	var BHeap = function () {
	  function BHeap(comparator) {
	    _classCallCheck(this, BHeap);

	    this.heap = [null];
	    this.comp = comparator || _Util.defaultComp;
	  }
	  /**
	   * removes the root of the heap and returns the data to caller
	   * @returns {*} extracted data
	   * @example
	   * heap.insert(1).insert(2).insert(3);
	   * let root = heap.extractRoot();
	   * // root = 3;
	   */


	  BHeap.prototype.extractRoot = function extractRoot() {
	    var heap = this.heap;
	    var max = heap[1];
	    heap[1] = heap[heap.length - 1];
	    heap.length -= 1;
	    heapify(heap, 1, this.comp);
	    return max;
	  };
	  /**
	   * inserts given data into BHeap
	   * @param {*} [data] - optional data to insert into heap. Default is undefined
	   * @returns {BHeap} a reference to the instance that this method was called
	   * @example
	   * heap.insert(1).insert(2).insert(3).insert(3);
	   * // this heap will contain both 3s
	   * // heap.extractRoot() // will be 3
	   */


	  BHeap.prototype.insert = function insert(data) {
	    var heap = this.heap;
	    heap[heap.length] = data;
	    siftUp(heap, heap.length - 1, this.comp);
	    return this;
	  };
	  /**
	   * transforms a BHeap into an array
	   * @returns {Array} 'this' BHeap instance as an array
	   * @example
	   * heap.insert(1).insert(2);
	   * heap.toArray() // will be [2, 1]
	   */


	  BHeap.prototype.toArray = function toArray() {
	    return this.heap.slice(1);
	  };
	  /**
	   * gives the number of elements in the BHeap.
	   * @returns 'this' BHeap instance's number of elements
	   * @example
	   * heap.size() // would be 0
	   */


	  BHeap.prototype.size = function size() {
	    return this.heap.length - 1;
	  };

	  return BHeap;
	}();

	module.exports = BHeap;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * swap method for Structs BHeap and Array
	 * @private
	 * @param {Array} array - array to swap certain elements
	 * @param {number} index1 - index to swap with @param index2
	 * @param {number} index2 - index to swap with @param index1
	 * @returns {undefined}
	 */
	function swap(array, index1, index2) {
	  var oldIndex1 = array[index1];
	  array[index1] = array[index2];
	  array[index2] = oldIndex1;
	}
	/**
	 * default comparator for all Structs
	 * @private
	 * @param {(number|string)} a - first element to compare
	 * @param {(number|string)} a - second element to compare
	 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
	 */
	function defaultComp(a, b) {
	  if (a < b) {
	    return -1;
	  } else if (a > b) {
	    return 1;
	  }
	  return 0;
	}
	/**
	 * Number.isNaN polyfill from
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
	 * /Global_Objects/Number/isFinite
	 */
	function isNumber(obj) {
	  if (typeof obj !== 'number' || !isFinite(obj)) {
	    // eslint-disable-line no-restricted-globals
	    throw new TypeError('Argument must be of type number or Number');
	  }
	}

	module.exports = { swap: swap, defaultComp: defaultComp, isNumber: isNumber };

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// from immutable.js implementation of java hashcode
	// https://github.com/facebook/immutable-js/blob/master/src/Hash.js
	// better distribution than fnv TODO: change fnv name
	function hashStr(str) {
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
	  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	  if (type === 'string' || type === 'number') {
	    return obj.toString();
	  } else if (type === 'boolean' || type === 'function') {
	    return obj.toString();
	  }
	  return JSON.stringify(obj);
	}
	function insert(k, v, table) {
	  var hash = hashStr(toString(k) + (typeof k === 'undefined' ? 'undefined' : _typeof(k)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  return bucket.push(k, v);
	}
	function search(k, table) {
	  var toStr = toString(k);
	  var hash = hashStr(toStr + (typeof k === 'undefined' ? 'undefined' : _typeof(k)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  for (var index = 0; index < bucket.length; index += 2) {
	    if (k === bucket[index]) {
	      return { bucket: bucket, index: index };
	    }
	  }
	  return { bucket: undefined, index: -1 };
	}
	function shouldRehash(inserts, table) {
	  if (inserts / table.length >= 0.75) {
	    return true;
	  }
	}

	var HashMap = function () {
	  function HashMap() {
	    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 13;

	    _classCallCheck(this, HashMap);

	    this.inserts = 0;
	    this.table = createTable(size);
	  }

	  HashMap.prototype.put = function put() {
	    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var table = this.table,
	        inserts = this.inserts;

	    var searchRes = search(key, table);
	    var bucket = searchRes.bucket,
	        index = searchRes.index;

	    if (index === -1) {
	      insert(key, value, table);
	      this.inserts += 1;
	      if (shouldRehash(inserts + 1, table)) {
	        this.rehash();
	      }
	    } else {
	      bucket[index + 1] = value;
	    }
	    return true;
	  };

	  HashMap.prototype.getVal = function getVal(key) {
	    var searchRes = search(key, this.table);
	    var bucket = searchRes.bucket,
	        index = searchRes.index;

	    return index !== -1 ? bucket[index + 1] : undefined;
	  };

	  HashMap.prototype.remove = function remove(key) {
	    var searchRes = search(key, this.table);
	    var bucket = searchRes.bucket,
	        index = searchRes.index;

	    if (index !== -1) {
	      bucket.splice(index, 2);
	      this.inserts -= 1;
	      return true;
	    }
	    return false;
	  };

	  HashMap.prototype.contains = function contains(key) {
	    return this.getVal(key) !== undefined;
	  };

	  HashMap.prototype.rehash = function rehash() {
	    var oldTable = this.table;
	    var newTable = createTable(oldTable.length * 2);
	    for (var i = 0; i < oldTable.length; i += 1) {
	      for (var j = 0; j < oldTable[i].length; j += 2) {
	        var oldKey = oldTable[i][j];
	        var oldValue = oldTable[i][j + 1];
	        insert(oldKey, oldValue, newTable);
	      }
	    }
	    this.table.length = 0;
	    this.table = newTable;
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HashMap = __webpack_require__(7);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _BSTPrototype = __webpack_require__(10);

	var _Util = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BSTNode = __webpack_require__(11);

	/**
	 * Binary search tree representation
	 * @class
	 * @param {function} [comparator] - function used to compare nodes in tree
	 * @example
	 * // custom comparator example
	 * const bst = new Structs.BST(function(a, b){
	 *   if (a.data < b.data) {
	 *     return -1;
	 *   } else if (a.data > b.data) {
	 *      return 1;
	 *   } else { return 0;}
	 * });
	 * // default comparator simply compares (a < b) : returns -1
	 * //(a > b) : returns 1, else : 0
	 */
	var BST = function () {
	  function BST(comparator) {
	    _classCallCheck(this, BST);

	    this.root = new BSTNode();
	    this.comp = comparator || _Util.defaultComp;
	  }
	  /**
	  * inserts the given key and value into BST
	  * @param {*} key - the key to insert into BST
	  * @param {*} value - the value that is mapped to by @param key
	  * @returns {BST} the instance that this method was called with
	  * @example
	  * bst.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
	  * // ed now maps to kane because it already existed before.
	  */


	  BST.prototype.insert = function insert(key, value) {
	    _BSTPrototype.insert.call(this, key, value, BSTNode);
	    return this;
	  };
	  /**
	   * removes a key and it's associated from BST
	   * @param {*} key - the key to search for
	   * @returns {BST} the instance that this method was called with
	   * @example
	   * bst.insert(1, 5).insert(5, 10);
	   * bst.remove(1); // 1 and it's associated value are removed from tree
	   * bst.remove("dog"); // this call fails silently as dog never existed in tree
	   */


	  BST.prototype.remove = function remove(key) {
	    _BSTPrototype.remove.call(this, key, BSTNode);
	    return this;
	  };
	  /**
	  * finds the value associated with given key
	  * @param {*} key to search for in BST
	  * @returns {(*|undefined)} value associated with @param key or undefined
	  * if not found.
	  * @example
	  * bst.insert(1, 5).insert(5, 10);
	  * bst.find(5); // returns 10
	  * bst.find(67); // returns undefined
	  */


	  BST.prototype.find = function find(key) {
	    var node = _BSTPrototype.search.call(this, this.root, key);
	    return node ? node.value : undefined;
	  };
	  /**
	  * determines if BST contains the given key
	  * @param {*} key to search for in BST
	  * @returns {boolean} true if BST contains @param key and false otherwise
	  * @example
	  * bst.insert(1, 5).insert(5, 10);
	  * bst.contains(5); // returns true
	  * bst.contains(67); // returns false
	  */


	  BST.prototype.contains = function contains(key) {
	    var node = _BSTPrototype.search.call(this, this.root, key);
	    return node ? true : false;
	  };
	  /**
	  * gives the inorder traversal of a BST
	  * @param {*} key to search for in BST
	  * @returns {*|undefined} value associated with @param key or undefined
	  * if not found.
	  * @example
	  * bst.insert(1, 5).insert(5, 10).insert(2, 10);
	  * bst.inorder(); // [{key: 1, value:5, parent: undefined},
	  * {key: 5, value:10, parent: 1}..... ]
	  */


	  BST.prototype.inorder = function inorder() {
	    return (0, _BSTPrototype.inorder)(this.root);
	  };

	  return BST;
	}();

	module.exports = BST;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	/**
	* inserts given key and value into bst (maps key to value)
	* @private
	* @param {*} key - key to insert in bst
	* @param {*} value - value that is mapped to by @param key
	* @param {BSTNode} Node - Node type to insert into tree
	* @returns null if the node was already in tree, thus not inserted
	* or the new node that was just inserted successfully.
	*/
	function insert(key, value, Node) {
	  var comp = this.comp;
	  var root = this.root;
	  var newNode = new Node(key, value);
	  var prevRoot = new Node();
	  while (root.key !== undefined) {
	    prevRoot = root;
	    if (comp(newNode.key, root.key) === -1) {
	      root = root.left;
	    } else if (comp(newNode.key, root.key) === 1) {
	      root = root.right;
	    } else {
	      root.value = value;
	      return null;
	    }
	  }
	  newNode.parent = prevRoot;
	  if (prevRoot.key === undefined) {
	    this.root = newNode;
	  } else if (comp(newNode.key, prevRoot.key) === -1) {
	    prevRoot.left = newNode;
	  } else {
	    prevRoot.right = newNode;
	  }
	  newNode.left = new Node();
	  newNode.right = new Node();
	  return newNode;
	}
	/**
	 * searches for the given key in tree
	 * @private
	 * @param {BSTNode} root - the root node to start search
	 * @param {*} key - the key to search for in bst
	 * @returns {null|BSTNode} null if not found. Or the actual node if found
	 */
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
	/**
	 * finds the inorder successor of @param node
	 * @private
	 * @param {BSTNode} node - node to find the successor for
	 * @returns {BSTNode} the inorder successor of @param node
	 */
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
	/**
	 * gets the number of children of the given node
	 * @private
	 * @param {BSTNode} node - node to geet number of children of
	 * @returns {0|1|2} indicating number of non-Nil children
	 */
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
	/**
	 * removes given node from tree which has 0 children
	 * @private
	 * @param {BSTNode} node - node to remove from tree
	 * @param {NodeType} NodeType - type of node in BST
	 * @returns {undefined}
	 */
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
	/**
	 * removes given node from tree which has 1 child
	 * @private
	 * @param {BSTNode} node - node to remove from tree
	 * @returns {undefined}
	 */
	function remove1(node) {
	  var comp = this.comp;
	  // node is root
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
	/**
	 * removes given node from tree which has 2 children
	 * @private
	 * @param {BSTNode} node - node to remove from tree
	 * @returns {undefined}
	 */
	function remove2(node) {
	  var nodeSucc = successor(node);
	  var oldKey = node.key;
	  node.key = nodeSucc.key;
	  node.value = nodeSucc.value;
	  nodeSucc.key = oldKey;
	  // successor can only have one child at most and that node
	  // must be right child. Or else, node has left child which is a
	  // contradiction as that node would be the minimum.
	  var succChildren = numChildren(nodeSucc);
	  if (succChildren === 0) {
	    return remove0.call(this, nodeSucc);
	  }
	  return remove1.call(this, nodeSucc);
	}
	/**
	 * Searches for a node with given key and removes it from tree
	 * @private
	 * @param {*} key - key to search for in tree
	 * @param {BSTNode} nodeType - type of Nodes in the tree
	 * @returns {true|false} true if node was deleted and false otherwise
	 */
	function remove(key, nodeType) {
	  var node = search.call(this, this.root, key);
	  if (!node) {
	    return false;
	  }
	  var children = numChildren(node);
	  if (children === 0) {
	    return remove0.call(this, node, nodeType);
	  } else if (children === 1) {
	    return remove1.call(this, node);
	  }
	  return remove2.call(this, node, nodeType);
	}
	/**
	 * gets the inorder traversal starting at given root
	 * @private
	 * @param {BSTNode} root - root of tree
	 * @returns {Array(Object)} Array containing key and value info as well as
	 * parent info for each node
	 */
	function inorder(root) {
	  if (root && root.key !== undefined) {
	    var tmp = [];
	    return tmp.concat(inorder(root.left), root, inorder(root.right));
	  }
	  return [];
	}
	/**
	 * @private
	 */
	module.exports = {
	  insert: insert,
	  remove: remove,
	  search: search,
	  inorder: inorder
	};

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Queue = __webpack_require__(3);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _Stack = __webpack_require__(2);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _HashMap = __webpack_require__(7);

	var _HashMap2 = _interopRequireDefault(_HashMap);

	var _HashSet = __webpack_require__(8);

	var _HashSet2 = _interopRequireDefault(_HashSet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graph = function () {
	  function Graph(numVerticies) {
	    _classCallCheck(this, Graph);

	    this.graph = new _HashMap2['default'](numVerticies);
	  }

	  Graph.prototype.addVertex = function addVertex(vertex) {
	    var graph = this.graph;
	    // so user does not accidentally overwrite values array

	    if (!graph.contains(vertex) && vertex !== undefined) {
	      graph.put(vertex, []);
	    }
	  };

	  Graph.prototype.addEdge = function addEdge(vertex1, vertex2) {
	    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	    // TODO: replace with PQ for Prim's
	    var graph = this.graph;

	    var v1neighbors = graph.getVal(vertex1);
	    var v2neighbors = graph.getVal(vertex2);
	    // they both exist as verticies
	    if (v1neighbors && v2neighbors) {
	      v1neighbors.push({ vertex: vertex2, weight: weight });
	      v2neighbors.push({ vertex: vertex1, weight: weight });
	    }
	  };

	  Graph.prototype.BFS = function BFS(startingVertex) {
	    var graph = this.graph;

	    var bfs = [];
	    var visited = new _HashSet2['default'](graph.size());
	    var q = new _Queue2['default']();
	    q.enqueue(startingVertex);
	    while (q.size() !== 0) {
	      var currentVertex = q.dequeue();
	      if (!visited.has(currentVertex)) {
	        visited.add(currentVertex);
	        bfs.push(currentVertex);
	        var currentVertexNeighbors = graph.getVal(currentVertex).length;
	        for (var i = 0; i < currentVertexNeighbors; i += 1) {
	          var curNeighbor = graph.getVal(currentVertex)[i].vertex;
	          if (!visited.has(curNeighbor)) {
	            q.enqueue(curNeighbor);
	          }
	        }
	      }
	    }
	    return bfs;
	  };

	  Graph.prototype.DFS = function DFS(vertex) {
	    var graph = this.graph;
	    var dfs = [];
	    var visited = new _HashSet2['default'](graph.size());
	    var s = new _Stack2['default']();
	    s.push(vertex);
	    while (s.size() !== 0) {
	      var currentVertex = s.pop();
	      if (!visited.has(currentVertex)) {
	        visited.add(currentVertex);
	        dfs.push(currentVertex);
	        var currentVertexNeighbors = graph.getVal(currentVertex).length;
	        for (var i = 0; i < currentVertexNeighbors; i += 1) {
	          var curNeighbor = graph.getVal(currentVertex)[i].vertex;
	          if (!visited.has(curNeighbor)) {
	            s.push(curNeighbor);
	          }
	        }
	      }
	    }
	    return dfs;
	  };

	  Graph.prototype.isConnected = function isConnected() {
	    var graph = this.graph;
	    var firstKey = '';
	    var verticies = graph.keys();
	    firstKey = verticies[0];
	    return this.BFS(firstKey).length === verticies.length;
	  };

	  return Graph;
	}();

	module.exports = Graph;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getPrefix(root, pfx) {
	  var cur = root.children;
	  var char = void 0;
	  for (var i = 0; i < pfx.length; i += 1) {
	    char = pfx.charAt(i);
	    if (!cur[char]) {
	      return false;
	    }
	    cur = cur[char].children;
	  }
	  return cur;
	}
	function recurseTree(node, arr) {
	  var words = arr;
	  if (!node) {
	    return;
	  }
	  var keys = Object.keys(node);
	  for (var i = 0; i < keys.length; i += 1) {
	    var curChild = node[keys[i]];
	    if (curChild.word) {
	      words.push(curChild.word);
	    }
	    recurseTree(curChild.children, arr);
	  }
	}
	function hasChild(obj) {
	  for (var prop in obj) {
	    // eslint-disable-line no-restricted-syntax
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
	    var curRoot = this.root;
	    var foundPrefix = getPrefix(curRoot, pfx.toString());
	    if (foundPrefix) {
	      var hasChildren = hasChild(foundPrefix);
	      if (hasChildren) {
	        return true;
	      }
	      return false;
	    }
	    return false;
	  };

	  Trie.prototype.prefixAll = function prefixAll(pfx) {
	    if (!this.containsPrefix(pfx)) {
	      return [];
	    }
	    var prefixTail = getPrefix(this.root, pfx);
	    var prefixes = [];
	    recurseTree(prefixTail, prefixes);
	    return prefixes;
	  };

	  return Trie;
	}();

	module.exports = Trie;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _HashMap2 = __webpack_require__(7);

	var _HashMap3 = _interopRequireDefault(_HashMap2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HashMultiMap = function (_HashMap) {
	  _inherits(HashMultiMap, _HashMap);

	  function HashMultiMap(size) {
	    _classCallCheck(this, HashMultiMap);

	    return _possibleConstructorReturn(this, _HashMap.call(this, size));
	  }

	  HashMultiMap.prototype.put = function put(key, value) {
	    var retVal = _HashMap.prototype.getVal.call(this, key);
	    if (retVal) {
	      if (retVal.indexOf(value) === -1) {
	        return retVal.push(value);
	      }
	    } else {
	      var newValArr = [];
	      newValArr.push(value);
	      return _HashMap.prototype.put.call(this, key, newValArr);
	    }
	    return true;
	  };

	  return HashMultiMap;
	}(_HashMap3['default']);

	module.exports = HashMultiMap;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Pushes a value to an array
	 * @private
	 * @param {*} value - The value to push to array
	 * @returns {Array} Array of length one with @param value in it
	 */
	function pushValToArray(value) {
	  var array = [];
	  array.push(value);
	  return array;
	}

	/**
	 * Generates a random number integer between 0 and limit (exclusive)
	 * @param {number} limit - Upper bound on random number
	 * @returns {number} Random number in the range [0, @param number)
	 */
	function genRand(limit) {
	  return Math.floor(Math.random() * limit);
	}

	/**
	 * Rotates array elements to the left
	 * @param {Array} array - Array to rotate
	 * @param {number} times - Number of times to rotate
	 * @returns {undefined}
	 */
	function lRotate(array, times) {
	  var rotations = times;
	  var front = void 0;
	  if (array.length > 0) {
	    while (rotations < 0) {
	      front = array.shift();
	      array.push(front);
	      rotations += 1;
	    }
	  }
	}
	/**
	 * Rotates array elements to the right
	 * @param {Array} array - Array to rotate
	 * @param {number} times - Number of times to rotate
	 * @returns {undefined}
	 */
	function rRotate(array, times) {
	  var rotations = times;
	  var back = void 0;
	  if (array.length > 0) {
	    while (rotations > 0) {
	      back = array.pop();
	      array.unshift(back);
	      rotations -= 1;
	    }
	  }
	}
	/**
	 * Various utility methods that can be called with arrays
	 * @class
	 * @static
	 */

	var ArrayUtils = function () {
	  function ArrayUtils() {
	    _classCallCheck(this, ArrayUtils);
	  } // eslint-disable-line no-empty-function

	  /**
	   * Removes the element at a given position
	   * @static
	   * @param {Array} array - An array to remove elements from
	   * @param {number} index - Index of element to remove
	   * @returns {Array} Array of elements removed
	   */


	  ArrayUtils.remove = function remove() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	    return index >= 0 ? array.splice(index, 1) : [];
	  };

	  /**
	   * Removes a given value from array
	   * @static
	   * @param {Array} array - An array to remove elements from
	   * @param {*} value - value to remove from @param array
	   * @returns {Array} Array of removed elements
	   */


	  ArrayUtils.removeObj = function removeObj() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var value = arguments[1];

	    var index = array.indexOf(value);
	    return ArrayUtils.remove(array, index);
	  };

	  /**
	   * Rotates an array left(negative number) right(positive number)
	   * @static
	   * @param {Array} array - Array to rotate
	   * @param {number} times - Number of times to rotate @param array
	   * @returns {undefined}
	   */


	  ArrayUtils.rotate = function rotate() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    (0, _Util.isNumber)(times);
	    if (times < 0) {
	      return lRotate(array, times);
	    }
	    return rRotate(array, times);
	  };

	  /**
	   * Pops an array several times
	   * @static
	   * @param {Array} array - Array to pop
	   * @param {number} times - Number of times to pop @param array
	   * @returns {Array} A new array A new array equal to
	   * [@param array - popped elements]
	   */


	  ArrayUtils.popMany = function popMany() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    var diff = array.length - times;
	    return diff > 0 ? array.slice(0, diff) : [];
	  };

	  /**
	   * Pushes many elemnts into an array
	   * @static
	   * @param {Array} array - Array to push onto
	   * @param {number} times - Number of times to pop @param array
	   * @returns {Array} A new array equal to [@param array + new elements]
	   */


	  ArrayUtils.pushMany = function pushMany() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    // eslint-disable-line no-unused-vars
	    var args = [].concat(Array.prototype.slice.call(arguments));
	    // throw out array arg
	    args.shift();
	    return array.concat(args);
	  };

	  /**
	   * Returns a random index in a array
	   * @static
	   * @param {Array} array - Array to get random index from
	   * @returns {*} Random index in @param array
	   */


	  ArrayUtils.getRand = function getRand() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    return array[genRand(array.length)];
	  };

	  /**
	   * Removes a random element from an array
	   * @static
	   * @param {Array} array - Array to remove random element from
	   * @returns {Array} array - Array of elements removed from @param array
	   */


	  ArrayUtils.removeRand = function removeRand() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    var rand = genRand(array.length);
	    return ArrayUtils.remove(array, rand);
	  };

	  /**
	   * Shuffles the given array
	   * @static
	   * @param {Array} array - Array to shuffle
	   * @returns {undefined}
	   */


	  ArrayUtils.shuffle = function shuffle(array) {
	    var arrayLength = array.length;
	    for (var i = 0; i < Math.floor(arrayLength / 2); i += 1) {
	      var index1 = genRand(arrayLength);
	      var index2 = genRand(arrayLength);
	      (0, _Util.swap)(array, index1, index2);
	    }
	  };

	  /**
	   * Turns an n dimensional array into a 1 dimensional array
	   * @param {Array} array - Array to flatten
	   * @returns {Array} The flattened array
	   */


	  ArrayUtils.flatten = function flatten(array) {
	    var newArr = [];
	    var curValue = void 0;
	    for (var i = 0; i < array.length; i += 1) {
	      curValue = array[i];
	      newArr = Array.isArray(curValue) ? newArr.concat(ArrayUtils.flatten(curValue)) : newArr.concat(pushValToArray(curValue));
	    }
	    return newArr;
	  };

	  /**
	   * Splits an array into chunks
	   * @param {Array} array - Array to chunk
	   * @returns {Array} A new array with split into @param bits
	   */


	  ArrayUtils.chunk = function chunk(arr, bits) {
	    var newArr = [];
	    if (bits <= 0) {
	      return [];
	    }
	    for (var i = 0; i < arr.length; i += bits) {
	      newArr.push(arr.slice(i, i + bits));
	    }
	    return newArr;
	  };

	  return ArrayUtils;
	}();

	module.exports = ArrayUtils;

/***/ }
/******/ ])
});
;