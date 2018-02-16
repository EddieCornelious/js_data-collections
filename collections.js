(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Collections", [], factory);
	else if(typeof exports === 'object')
		exports["Collections"] = factory();
	else
		root["Collections"] = factory();
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
	var Stack = __webpack_require__(3);
	var Queue = __webpack_require__(4);
	var BHeap = __webpack_require__(5);
	var PriorityQueue = __webpack_require__(6);
	var HashMap = __webpack_require__(7);
	var HashTable = __webpack_require__(8);
	var HashSet = __webpack_require__(10);
	var BST = __webpack_require__(12);
	var Graph = __webpack_require__(15);
	var Trie = __webpack_require__(16);
	var HashMultiMap = __webpack_require__(17);
	var ArrayUtils = __webpack_require__(18);
	var RBTree = __webpack_require__(19);
	var Map = __webpack_require__(20);
	var Set = __webpack_require__(21);

	// TODO : add ie8 support and maybe load polyfills right here

	module.exports = {
	   List: List,
	   Stack: Stack,
	   Queue: Queue,
	   BHeap: BHeap,
	   PriorityQueue: PriorityQueue,
	   HashMap: HashMap,
	   HashTable: HashTable,
	   HashMultiMap: HashMultiMap,
	   HashSet: HashSet,
	   BST: BST,
	   Graph: Graph,
	   Trie: Trie,
	   ArrayUtils: ArrayUtils,
	   RBTree: RBTree,
	   Map: Map,
	   Set: Set
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns the node at given index in linked list
	 * @private
	 * @param {number} index - The index of the node to return
	 * @throws {TypeError} When @param index is not a number
	 * @returns {(Node|undefined)} Node @param index or undefined if not found
	 */
	function getNode(index) {
	  (0, _Util.isNumber)(index);
	  var head = this.head;
	  if (index < 0 || !head) {
	    return;
	  }
	  var i = 0;
	  while (i < index) {
	    head = head.next;
	    i += 1;
	    // index wanted is > than list size
	    if (!head) {
	      return;
	    }
	  }
	  return head;
	}

	/**
	 * Linked List Node
	 * @private
	 * @class
	 * @param {*} The data to assign to the node
	 */

	var Node = function Node(data) {
	  _classCallCheck(this, Node);

	  this.data = data;
	  this.next = null;
	  // previous node
	  this.prev = null;
	};

	/**
	 * Linked List representation
	 * @class
	 *
	 * @example
	 * const list = new Collections.LinkedList();
	 * // FOR ALL EXAMPLES BELOW. ASSUME list IS CLEARED BEFORE EACH EXAMPLE
	 */


	var List = function () {
	  function List() {
	    _classCallCheck(this, List);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  /**
	   * Adds the given data to left-most end of linked list
	   * @param {*} data - The data to insert
	   * @returns {List} The instance this method was called
	   *
	   * @example
	   * list.addToFront("a")
	   *  .addToFront("b"); // list is <"b", "a">
	   */


	  List.prototype.addToFront = function addToFront(data) {
	    var head = this.head,
	        length = this.length;

	    var newNode = new Node(data);
	    if (!head) {
	      this.head = newNode;
	      this.tail = this.head;
	    } else {
	      // non-empty list
	      this.head = newNode;
	      newNode.next = head;
	      head.prev = newNode;
	    }
	    this.length = length + 1;
	    return this;
	  };

	  /**
	   * Returns the data at given index
	   * @param {number} index - The index to look at
	   * @throws {TypeError} Will throw error if @param index is not number
	   * @returns {(*|undefined)} Index of element if @param index is in range
	   * or undefined
	   *
	   * @example
	   * list.addToFront("a")
	   *  .addToFront("b")
	   *  .addToFront("c");
	   * const getSomething = list.elementAtIndex(2); // "a"
	   * list.elementAtIndex(13); // undefined
	   */


	  List.prototype.elementAtIndex = function elementAtIndex() {
	    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    (0, _Util.isNumber)(index);
	    var wanted = getNode.call(this, index);
	    return wanted ? wanted.data : undefined;
	  };

	  /**
	   * Adds the given data to right-most end of linked list
	   * @param {*} data - the data to insert
	   * @returns {List} The instance this method was called
	   *
	   * @example
	   * list.addToBack("a")
	   *  .addToBack("b"); // list is <"a", "b">
	   */


	  List.prototype.addToBack = function addToBack(data) {
	    var tail = this.tail,
	        length = this.length;

	    var newNode = new Node(data);
	    if (!tail) {
	      this.head = newNode;
	      this.tail = this.head;
	    } else {
	      this.tail = newNode;
	      newNode.prev = tail;
	      tail.next = newNode;
	    }
	    this.length = length + 1;
	    return this;
	  };

	  /**
	   * Removes the left-most element in the linked list
	   * @returns {(*|undefined)} The removed data or undefined if nothing removed
	   *
	   * @example
	   * list.addToBack("a")
	   *  .addToBack("b");
	   * const removedData = list.removeFront(); // "a"
	   * // list is now <"b">
	   */


	  List.prototype.removeFront = function removeFront() {
	    var head = this.head,
	        length = this.length;

	    var removed = void 0;
	    if (head) {
	      removed = head.data;
	      this.length = length - 1;
	      this.head = head.next;

	      // current state after removal
	      var newHead = this.head;
	      // list is now empty...adjust tail
	      if (!newHead) {
	        this.tail = null;
	        this.head = this.tail;
	      } else {
	        // front of list rule
	        newHead.prev = null;
	      }
	    }
	    return removed;
	  };

	  /**
	   * Removes the right-most element in the linked list
	   * @returns {(*|undefined)} The removed data or undefined if nothing removed
	   *
	   * @example
	   * list.addToBack("a")
	   *  .addToBack("b");
	   * const removedData = list.removeBack(); // "b"
	   * // list is now <"a">
	   */


	  List.prototype.removeBack = function removeBack() {
	    var tail = this.tail,
	        length = this.length;

	    var removed = void 0;
	    if (tail) {
	      removed = tail.data;
	      var prev = tail.prev;
	      this.length = length - 1;
	      // list now empty
	      if (!prev) {
	        this.tail = null;
	        this.head = this.tail;
	      } else {
	        prev.next = null;
	        this.tail = prev;
	      }
	    }
	    return removed;
	  };

	  /**
	   * Inserts given data into specific position in the linked list
	   * @param {index} index - The index to insert data into
	   * @param {*} data - The data to insert into @param index
	   * @throws {TypeError} Will throw error if @param index is not number
	   * @returns {List} - The instance this method was called
	   *
	   * @example
	   * list.addToBack("a")
	   *  .addToBack("b");
	   * list.insert(1, "$");
	   * // list is now <"a, "$, "b">
	   */


	  List.prototype.insert = function insert() {
	    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var data = arguments[1];

	    (0, _Util.isNumber)(index);
	    var length = this.length;

	    if (index === 0) {
	      return this.addToFront(data);
	    } else if (index >= length) {
	      return this.addToBack(data);
	    }
	    // parent of wanted node
	    var prevNode = getNode.call(this, index - 1);
	    if (prevNode) {
	      var newNode = new Node(data);
	      var aft = prevNode.next;
	      newNode.next = aft;
	      aft.prev = newNode;
	      prevNode.next = newNode;
	      newNode.prev = prevNode;
	      this.length = length + 1;
	    }
	    return this;
	  };

	  /**
	   * Removes data at specific position in the linked list
	   * @param {index} index - The index to insert data into
	   * @throws {TypeError} Will throw error if @param index is not number
	   * @returns {(*|undefined)} The removed data or undefined if nothing removed
	   *
	   * @example
	   * list.addToBack("a")
	   *  .addToBack("b");
	   * list.remove(1);
	   * // list is now <"a">
	   */


	  List.prototype.remove = function remove(index) {
	    (0, _Util.isNumber)(index);
	    var length = this.length;

	    var removed = void 0;
	    if (index === 0) {
	      return this.removeFront();
	    } else if (index >= length - 1) {
	      return this.removeBack();
	    }
	    // parent of wanted node
	    var prevNode = getNode.call(this, index - 1);
	    if (prevNode) {
	      var toRemove = prevNode.next;
	      removed = toRemove.data;
	      var after = toRemove.next;
	      prevNode.next = after;
	      after.prev = prevNode;
	      this.length = length - 1;
	    }
	    return removed;
	  };

	  /**
	   * Returns the index of the given data in the linked list
	   * @param {*} data - The data to find index of
	   * @param {function} comparator - function to compare for equality
	   * @returns {number} The index of @param data or -1 if not found
	   *
	   * @example
	   * const customComparator = function(a, b) {
	   *   if(a.age < b.age) { return -1;}
	   *   else if(a.age > b.age) { return 1:}
	   *   else { return 0; }
	   * }
	   * list.addToBack({ age : 2})
	   *  .addToBack({ age : 3});
	   * list.indexOf({ age : 2}, customComparator) // 0
	   */


	  List.prototype.indexOf = function indexOf(data, comparator) {
	    var cmp = comparator || _Util.defaultComp;
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

	  /**
	   * Returns whether the linked list contains the given data
	   * @param {*} data - The data to insert into linked list
	   * @param {function} comparator - function to compare for equality
	   * @returns {number} The index of @param data or -1 if not found
	   */


	  List.prototype.contains = function contains(data, comparator) {
	    return this.indexOf(data, comparator) !== -1;
	  };

	  /**
	   * Empties the called instance
	   * @returns {undefined}
	   */


	  List.prototype.clear = function clear() {
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  };

	  /**
	   * Returns the size of the linked list
	   * @returns {number} The size of the linked list
	   */


	  List.prototype.size = function size() {
	    return this.length;
	  };

	  /**
	   * Calls a callback function for each element in the list
	   * @param {function} callback - Function executed for each element
	   * (data, index)
	   * @returns {List} The instance that this method was called
	   */


	  List.prototype.forEach = function forEach(callback) {
	    var func = callback;
	    var head = this.head;
	    var index = 0;
	    while (head) {
	      func(head.data, index);
	      head = head.next;
	      index += 1;
	    }
	    return this;
	  };

	  /**
	   * Transforms a linked list to an array
	   * @returns {Array} An array representation of 'this' List
	   */


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
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	 * Converts a given value to a string
	 * @private
	 * @param {*} value - The value to convert to a string
	 * @returns {string} @param value to string or stringified by JSON
	 */
	function toString(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type === 'string') {
	    return value;
	  } else if (type === 'number' || type === 'boolean' || type === 'function') {
	    return value.toString();
	  }
	  return JSON.stringify(value);
	}

	/**
	 * default comparator for all Collections
	 * @function defaultComparator
	 * @param {(number|string)} a - first element to compare
	 * @param {(number|string)} b - second element to compare
	 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
	 *
	 * @example
	 * function(a, b) {
	   if(a < b) {
	     return -1;
	   } else if(a > b) {
	     return 1;
	   }
	   return 0;
	 }
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
	 * Custom comparator example for all Collections
	 * @function customComparator
	 * @param {*} a - first element to compare
	 * @param {*} b - second element to compare
	 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
	 *
	 * @example
	 * // suppose data is of the form { age : 2 } , { age : 12 }....etc
	 * function(a, b) {
	   if(a.age < b.age) {
	     return -1;
	   } else if(a.age > b.age) {
	     return 1;
	   }
	   return 0;
	 }
	 */
	function customComp(a, b) {
	  // eslint-disable-line no-unused-vars
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
	 * @private
	 */
	function isNumber(value) {
	  if (typeof value !== 'number' || !isFinite(value)) {
	    // eslint-disable-line no-restricted-globals
	    throw new TypeError('Argument must be of type number or Number');
	  }
	}

	/**
	 * Generates a random integer between 0 and limit (exclusive)
	 * @private
	 * @param {number} limit - Upper bound on random number
	 * @returns {number} Random number in the range [0, @param limit)
	 */
	function genRand(limit) {
	  return Math.floor(Math.random() * limit);
	}

	module.exports = {
	  swap: swap,
	  defaultComp: defaultComp,
	  isNumber: isNumber,
	  toString: toString,
	  genRand: genRand
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Stack representation
	 * @class
	 *
	 * @example
	 * const stack = new Collections.Stack();
	 * // FOR ALL EXAMPLES BELOW. ASSUME stack IS CLEARED BEFORE EACH EXAMPLE
	 */
	var Stack = function () {
	  function Stack() {
	    _classCallCheck(this, Stack);

	    this.stack = new _List2['default']();
	  }

	  /**
	   * Pushes the given data onto the stack
	   * @param {data} data - The data to push onto stack
	   * @returns {Stack} The instance this method was called
	   *
	   * @example
	   * stack.push(1).push(2);
	   */


	  Stack.prototype.push = function push(data) {
	    this.stack.addToFront(data);
	    return this;
	  };

	  /**
	   * Removes data from stack in a last in first out manner
	   * @returns {*} The reomved data
	   *
	   * @example
	   * // FROM example above
	   * stack.pop(); // result is 2
	   */


	  Stack.prototype.pop = function pop() {
	    return this.stack.removeFront();
	  };

	  /**
	   * Reports but does not remove the staged element to be removed next
	   * @returns {*} Element staged to be removed next
	   *
	   * @example
	   * stack.enqueue(1);
	   * queue.peek() // returns 1 but does not remove it
	   */


	  Stack.prototype.peek = function peek() {
	    return this.stack.elementAtIndex(0);
	  };

	  /**
	   * Reports the size of the queue
	   * @returns {number} The size of the queue
	   */


	  Stack.prototype.size = function size() {
	    return this.stack.size();
	  };

	  return Stack;
	}();

	module.exports = Stack;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var List = __webpack_require__(1);

	/**
	 * Queue Representation
	 * @class
	 *
	 * @example
	 * const queue = new Collections.Queue();
	 * // FOR ALL EXAMPLES BELOW. ASSUME queue IS CLEARED BEFORE EACH EXAMPLE
	 */

	var Queue = function () {
	  function Queue() {
	    _classCallCheck(this, Queue);

	    this.queue = new List();
	  }

	  /**
	   * Inserts given data into queue
	   * @param {*} data - Data to insert into queue
	   * @returns {Queue} The instance that this method was called
	   *
	   * @example
	   * queue.enqueue(1).enqueue(2);
	   *
	   */


	  Queue.prototype.enqueue = function enqueue(data) {
	    var queue = this.queue;

	    queue.addToBack(data);
	    return this;
	  };

	  /**
	   * Removes from queue in a First in first out manner
	   * @returns {*} The removed data
	   * @example
	   * // FROM example above
	   * queue.dequeue() // 1 as it was inserted first
	   */


	  Queue.prototype.dequeue = function dequeue() {
	    return this.queue.removeFront();
	  };

	  /**
	   * Reports but does not remove the staged element to be removed next
	   * @returns {*} Element staged to be removed next
	   *
	   * @example
	   * queue.enqueue(1);
	   * queue.peek() // returns 1 but does not remove it
	   */


	  Queue.prototype.peek = function peek() {
	    var queue = this.queue;

	    return queue.elementAtIndex(0);
	  };

	  /**
	   * Reports the size of the queue
	   * @returns {number} The size of the queue
	   */


	  Queue.prototype.size = function size() {
	    return this.queue.size();
	  };

	  return Queue;
	}();

	module.exports = Queue;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Sifts down (swaps elements downward) the given array
	 * @private
	 * @param {Array} array - The array to sift down on.
	 * @param {number} index - The index to start the sift down operation.
	 * @param {function} comp - The comparator to use against parent and
	 * child elements.
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
	 * Sifts up (swaps elements upward) the given array
	 * @private
	 * @param {Array} array - The array to sift up on.
	 * @param {number} index - The index to start the sift up operation.
	 * @param {function} comp - The comparator to use against parent
	 * and child elements
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
	 * @param {function} comparator - @see Global#defaultComp for examples
	 * @example
	 * const heap = new Collections.BHeap();
	 * // this creates a max heap by default.
	 * // for a min heap, see @link above and swap 1 and -1
	 * // FOR ALL EXAMPLES BELOW. ASSUME heap IS CLEARED BEFORE EACH EXAMPLE
	 */

	var BHeap = function () {
	  function BHeap(comparator) {
	    _classCallCheck(this, BHeap);

	    this.heap = [null];
	    this.comp = comparator || _Util.defaultComp;
	  }

	  /**
	   * Removes the root of the BHeap and returns the data
	   * @returns {*} The extracted data
	   *
	   * @example
	   * heap.insert(1).insert(2).insert(3);
	   * let root = heap.extractRoot();
	   * // root = 3;
	   */


	  BHeap.prototype.extractRoot = function extractRoot() {
	    var heap = this.heap,
	        comp = this.comp;

	    var max = heap[1];
	    heap[1] = heap[heap.length - 1];
	    heap.length -= 1;
	    heapify(heap, 1, comp);
	    return max;
	  };

	  /**
	   * Inserts the given data into the BHeap
	   * @param {*} data - The data to insert into BHeap.
	   * @returns {BHeap} A reference to the instance that this method was called
	   *
	   * @example
	   * heap.insert(1).insert(2).insert(3).insert(3);
	   * // this heap will contain both 3s
	   *
	   * heap.extractRoot() // will be 3
	   */


	  BHeap.prototype.insert = function insert(data) {
	    var heap = this.heap,
	        comp = this.comp;

	    heap[heap.length] = data;
	    siftUp(heap, heap.length - 1, comp);
	    return this;
	  };

	  /**
	   * Transforms the BHeap into an array
	   * @returns {Array} The heap instance as an array
	   *
	   * @example
	   * heap.insert(1).insert(2);
	   * heap.toArray() // will be [2, 1]
	   */


	  BHeap.prototype.toArray = function toArray() {
	    return this.heap.slice(1);
	  };

	  /**
	   * Reports the number of elements in the BHeap.
	   * @returns The BHeap instance's number of elements
	   *
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _BHeap = __webpack_require__(5);

	var _BHeap2 = _interopRequireDefault(_BHeap);

	var _Util = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Custom comparator for min heap
	 * @private
	 * @param {valueA} valueA - First value to compare
	 * @param {valueB} valueB- Second value to compare
	 * @returns {number} 1 if @param valueA's priority is less than
	 * valueB's priority, -1 if opposite and 0 if the two priorities are equal.
	 */
	function minHeapComparator(valueA, valueB) {
	  if (valueA.priority < valueB.priority) {
	    return 1;
	  } else if (valueA.priority === valueB.priority) {
	    return 0;
	  }
	  return -1;
	}

	/**
	 * Priority Queue Representation
	 * @class
	 *
	 * @example
	 * const pq = new Collections.PriorityQueue();
	 * // FOR ALL EXAMPLES BELOW. ASSUME pq IS CLEARED BEFORE EACH EXAMPLE
	 */

	var PriorityQueue = function () {
	  function PriorityQueue() {
	    _classCallCheck(this, PriorityQueue);

	    this.queue = new _BHeap2['default'](minHeapComparator);
	  }

	  /**
	   * Inserts given data into queue with a certain priority
	   * Lower numbers are removed from queue first.
	   * @param {*} data - The data to queue
	   * @param {priority} priority - The relative Importance of @param data
	   * to othe data in the queue
	   *
	   * @example
	   * pq.enqueue("wakeup", 1);
	   * pq.enqueue("wash dishes", 2);
	   *
	   */


	  PriorityQueue.prototype.enqueue = function enqueue(data, priority) {
	    (0, _Util.isNumber)(priority);

	    var queue = this.queue;

	    return queue.insert({ data: data, priority: priority });
	  };

	  /**
	   * Removes The element with the lowest priority from the queue
	   * @returns {*} The element with the lowest priority in the queue
	   * pq.dequeue()
	   * // from the example above, this operation returns "wakeup", then
	   * "wash dishes" on second dequeue
	   */


	  PriorityQueue.prototype.dequeue = function dequeue() {
	    var queue = this.queue;

	    return queue.extractRoot().data;
	  };

	  /**
	   * Reports the size of the priorityqueue
	   * @returns {number} The size of the queue
	   */


	  PriorityQueue.prototype.size = function size() {
	    var queue = this.queue;

	    return queue.size();
	  };

	  return PriorityQueue;
	}();

	module.exports = PriorityQueue;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _HashTable = __webpack_require__(8);

	var _HashTable2 = _interopRequireDefault(_HashTable);

	var _MapInterface2 = __webpack_require__(9);

	var _MapInterface3 = _interopRequireDefault(_MapInterface2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * HashMap representation
	 * @class
	 * @implements MapInterface
	 * @param {number} [initialCapacity=13] - Initial size of the hashmap
	 * IMPORTANT : It is not recommended that you choose a size that will be a
	 * close or approximate upper bound on your data, so that number
	 * of rehashes of the inner hashtable will be small. For example, if
	 * you know you only need 100,000 inserts, a good initial capacity would not be
	 * approximately 100,000 as the inner hastable will resize once 75,000
	 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
	 * which is 112,500 , greater than your space needed.
	 * So, try something around 150,000. Or you can just rehash a lot :)
	 *
	 * @example
	 * const map = new Collections.HashMap(37);
	 * // FOR ALL EXAMPLES BELOW. ASSUME map IS CLEARED BEFORE EACH EXAMPLE
	 */
	var HashMap = function (_MapInterface) {
	  _inherits(HashMap, _MapInterface);

	  function HashMap(initialCapacity) {
	    _classCallCheck(this, HashMap);

	    var _this = _possibleConstructorReturn(this, _MapInterface.call(this));

	    _this.map = new _HashTable2['default'](initialCapacity);
	    return _this;
	  }

	  HashMap.prototype.put = function put(key, value) {
	    return this.map.put(key, value);
	  };

	  HashMap.prototype.getVal = function getVal(key) {
	    return this.map.getVal(key);
	  };

	  HashMap.prototype.remove = function remove(key) {
	    return this.map.remove(key);
	  };

	  HashMap.prototype.keys = function keys() {
	    return this.map.keys();
	  };

	  HashMap.prototype.contains = function contains(key) {
	    return this.map.contains(key);
	  };

	  HashMap.prototype.size = function size() {
	    return this.map.size();
	  };

	  return HashMap;
	}(_MapInterface3['default']);

	module.exports = HashMap;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Util = __webpack_require__(2);

	var _MapInterface2 = __webpack_require__(9);

	var _MapInterface3 = _interopRequireDefault(_MapInterface2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * From immutable.js implementation of java hashcode
	 * https://github.com/facebook/immutable-js/blob/master/src/Hash.js
	 * better distribution than fnv hash
	 *
	 * Returns the hashcode for the given string
	 * @private
	 * @param {string} str - The string to hash
	 * @returns {number} @param str's hashcode
	 */
	function hashStr(str) {
	  var hash = 0;
	  for (var i = 0; i < str.length; i += 1) {
	    hash = 31 * hash + str.charCodeAt(i) | 0;
	  }
	  return hash;
	}

	/**
	 * Returns the modulo of two numbers
	 * @private
	 * @param {number} dividend - The dividend
	 * @param {number} divisor - The divisor
	 * @returns {number} Positive number when (dividend mod divisor) is calculated
	 */
	function mod(dividend, divisor) {
	  var modulo = dividend % divisor;
	  if (dividend < 0) {
	    return modulo * -1;
	  }
	  return modulo;
	}

	/**
	 * Creates a 2 dimensional array of the given size
	 * @private
	 * @param {number} size - The size of the 2d array
	 * @returns {Array} A 1d array with @param size inner arrays
	 */
	function createTable(size) {
	  var newTable = [];
	  for (var i = 0; i < size; i += 1) {
	    newTable.push([]);
	  }
	  return newTable;
	}

	/**
	 * Inserts into a hashtable based on the hashcode of the given key
	 * @private
	 * @param {*} key - The key
	 * @param {*} value - The value mapped to by key
	 * @param {Array} table - Associative Array
	 * @returns {number} 1 for true
	 */
	function insert(key, value, table) {
	  var hash = hashStr((0, _Util.toString)(key) + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  return bucket.push(key, value);
	}

	/**
	 * Searches a hashtable based on the hashcode of the given key
	 * @private
	 * @param {*} key - The key to look for
	 * @param {Array} table - Associative Array
	 * @returns {Object} Objet literal with the bucket where @param key is found
	 * and the index of @param key in that bucket or undefined and -1 if not found
	 */
	function search(key, table) {
	  var toStr = (0, _Util.toString)(key);
	  var hash = hashStr(toStr + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	  var location = mod(hash, table.length);
	  var bucket = table[location];
	  // skip values [k1, v1, k2, v2]
	  for (var index = 0; index < bucket.length; index += 2) {
	    if (key === bucket[index]) {
	      return { bucket: bucket, index: index };
	    }
	  }
	  return { bucket: undefined, index: -1 };
	}

	/**
	 * Figures out if the given hashtable should grow larger
	 * @private
	 * @param {number} inserts - The number of items in the table
	 * @param {Array} table - Associative Array
	 * @returns {boolean} True if @param table should rehash and false otherwise
	 */
	function shouldRehash(inserts, table) {
	  var loadFactor = inserts / table.length;
	  return loadFactor >= 0.75 ? true : false;
	}

	/**
	 * HashTable representation
	 * @class
	 * @implements MapInterface
	 * @param {number} [initialCapacity=13] - Initial size of the hashtable
	 * IMPORTANT : It is not recommended that you choose a size that will be a
	 * close or approximate upper bound on your data, so that number
	 * of rehashes of the hashtable will be small. For example, if
	 * you know you only need 100,000 inserts, a good initial capacity would not be
	 * approximately 100,000 as the hastable will resize once 75,000
	 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
	 * which is 112,500 , greater than your space needed.
	 * So, try something around 150,000. Or you can just rehash a lot :)
	 *
	 * @example
	 * const map = new Collections.HashTable(37);
	 * // FOR ALL EXAMPLES BELOW. ASSUME map IS CLEARED BEFORE EACH EXAMPLE
	 */

	var HashTable = function (_MapInterface) {
	  _inherits(HashTable, _MapInterface);

	  function HashTable() {
	    var initialCapacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 13;

	    _classCallCheck(this, HashTable);

	    var _this = _possibleConstructorReturn(this, _MapInterface.call(this));

	    _this.inserts = 0;
	    _this.table = createTable(initialCapacity);
	    return _this;
	  }

	  HashTable.prototype.put = function put() {
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

	  HashTable.prototype.getVal = function getVal(key) {
	    var searchRes = search(key, this.table);
	    var bucket = searchRes.bucket,
	        index = searchRes.index;

	    return index !== -1 ? bucket[index + 1] : undefined;
	  };

	  HashTable.prototype.remove = function remove(key) {
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

	  HashTable.prototype.contains = function contains(key) {
	    return this.getVal(key) !== undefined;
	  };

	  /**
	   * Resizes (2x) and rehashes all keys in HashTable
	   * @returns {undefined}
	   */


	  HashTable.prototype.rehash = function rehash() {
	    var oldTable = this.table;
	    var newTable = createTable(oldTable.length * 2);
	    for (var i = 0; i < oldTable.length; i += 1) {
	      for (var j = 0; j < oldTable[i].length; j += 2) {
	        var oldKey = oldTable[i][j];
	        var oldValue = oldTable[i][j + 1];
	        insert(oldKey, oldValue, newTable);
	      }
	    }
	    oldTable.length = 0;
	    this.table = newTable;
	  };

	  HashTable.prototype.keys = function keys() {
	    var table = this.table;
	    var keyArr = [];
	    for (var i = 0; i < table.length; i += 1) {
	      for (var j = 0; j < table[i].length; j += 2) {
	        keyArr.push(table[i][j]);
	      }
	    }
	    return keyArr;
	  };

	  /**
	   * Returns the number of buckets in the Associative Array
	   * @returns {number} Size of inner Associative Array
	   *
	   * @example
	   * new Collections.HashTable().tableSize() // 13 initial value empty args
	   */


	  HashTable.prototype.tableSize = function tableSize() {
	    return this.table.length;
	  };

	  HashTable.prototype.size = function size() {
	    return this.inserts;
	  };

	  return HashTable;
	}(_MapInterface3['default']);

	module.exports = HashTable;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Map Interface
	 * @interface
	 */
	var MapInterface = function () {
	  function MapInterface() {
	    _classCallCheck(this, MapInterface);

	    if (this.constructor.name === "MapInterface") {
	      throw new Error("cannot instansiate an interface");
	    }
	  }

	  /**
	   * Inserts given key and value into the Map
	   * @param {*} key - The key
	   * @param {*} value - The value mapped to by @param key
	   * @returns {boolean} True
	   *
	   * @example
	   * map.put("ed", "jones");
	   * // ed maps to jones
	   * map.put("ed", "james");
	   * // now same ed maps to james
	   */


	  MapInterface.prototype.put = function put(key, value) {
	    throw new Error("must implement this method");
	  };

	  /**
	   * Retrieves the value mapped to by the given key
	   * @param {*} key - The key to lookup
	   * @returns {*} The value associated with @param key
	   *
	   * @example
	   * map.put(99, "problems");
	   * map.getVal(99); // returns "promblems"
	   */


	  MapInterface.prototype.getVal = function getVal(key) {
	    throw new Error("must implement this method");
	  };

	  /**
	   * Removes the given key and its associated value from the Map
	   * @param {*} key - The key to lookup
	   * @returns {boolean} True if the key was removed and false otherwise
	   *
	   * @example
	   * map.put(99, "problems");
	   * map.remove(88); // returns false
	   * map.remove(99); // return true
	   */


	  MapInterface.prototype.remove = function remove(key) {
	    throw new Error("must implement this method");
	  };

	  /**
	   * Reports whether the Map contains the given key
	   * @param {*} key - The key to lookup
	   * @returns {boolean} True if @param key is found and false otherwise
	   *
	   * @example
	   * map.contains("empty"); // return false
	   */


	  MapInterface.prototype.contains = function contains(key) {
	    throw new Error("must implement this method");
	  };

	  /**
	  * Returns all of the keys in the Map
	  * @returns {Array} An array of keys
	  *
	  * @example
	  * map.put(1, "b");
	  * map.put(2, "c");
	  * map.put(3, "d");
	  * map.keys() // returns ["a", "b", "c"] permutation (order not guarenteed)
	  * // but presence is
	  */


	  MapInterface.prototype.keys = function keys() {
	    throw new Error("must implement this method");
	  };

	  /**
	  * Returns number of elements in the Map
	  * @returns {number} The number of insertions
	  *
	  * @example
	  * map.put(99, "problems");
	  * map.size() // 1
	  */


	  MapInterface.prototype.size = function size() {
	    throw new Error("must implement this method");
	  };

	  return MapInterface;
	}();

	module.exports = MapInterface;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _HashTable = __webpack_require__(8);

	var _HashTable2 = _interopRequireDefault(_HashTable);

	var _SetInterface2 = __webpack_require__(11);

	var _SetInterface3 = _interopRequireDefault(_SetInterface2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * HashSet representation
	 * @class
	 * @implements SetInterface
	 * @param {number} [initialCapacity=13] - The initial size of the hashset
	 *
	 * @example
	 * const set = new Collections.HashSet();
	 * // FOR ALL EXAMPLES BELOW. ASSUME set IS CLEARED BEFORE EACH EXAMPLE
	 */
	var HashSet = function (_SetInterface) {
	  _inherits(HashSet, _SetInterface);

	  function HashSet(initialCapacity) {
	    _classCallCheck(this, HashSet);

	    var _this = _possibleConstructorReturn(this, _SetInterface.call(this));

	    _this.set = new _HashTable2['default'](initialCapacity);
	    return _this;
	  }

	  HashSet.prototype.add = function add(element) {
	    return this.set.put(element);
	  };

	  HashSet.prototype.has = function has(element) {
	    return this.set.contains(element);
	  };

	  HashSet.prototype.remove = function remove(element) {
	    return this.set.remove(element);
	  };

	  HashSet.prototype.cardinality = function cardinality() {
	    return this.set.size();
	  };

	  return HashSet;
	}(_SetInterface3['default']);

	module.exports = HashSet;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Set Interface
	 * @interface
	 */
	var SetInterface = function () {
	  function SetInterface() {
	    _classCallCheck(this, SetInterface);

	    if (this.constructor.name === "SetInterface") {
	      throw new Error("cannot instansiate an interface");
	    }
	  }

	  /**
	   * Adds an element to the set. Does nothing if already in set
	   * @param {*} element - Element to add to the set
	   * @returns {boolean} True
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set.add(1);
	   * // set contains [1, 2] order might not be guareenteed
	   */


	  SetInterface.prototype.add = function add(element) {
	    throw new Error("must implement this method");
	  };

	  /**
	   * Updates 'this' with the mathematical set difference of 'this' set and
	   * another set
	   * @param {Set} Set - another set instance
	   * @returns {undefined}
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set2 = new Structs.HashSet();
	   * set2.add(2);
	   * set.diff(set2);
	   * // set is now [1] and set2 is unchanged
	   */


	  SetInterface.prototype.diff = function diff(thatSet) {
	    var thatKeys = thatSet.keys();
	    var context = this;
	    thatKeys.forEach(function (element) {
	      context.remove(element);
	    });
	  };

	  /**
	   * Reports whether the set contains a given value
	   * @param {*} element - The element to find
	   * @returns {boolean} True if set contains @param element and false otherwise
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set.has(3); // false
	   */


	  SetInterface.prototype.has = function has(element) {
	    throw new Error("must implement this method");
	  };

	  /**
	  * Returns all elements in the set
	  * @returns {Array} Array with all elements in the set
	  */


	  SetInterface.prototype.keys = function keys() {
	    return this.set.keys();
	  };

	  /**
	   * Removes an element from the set
	   * @returns {boolean} true if @param element was removed and false otherwise
	   */


	  SetInterface.prototype.remove = function remove(element) {
	    throw new Error("must implement this method");
	  };

	  /**
	   * Updates 'this' with the mathematical set intersection of 'this' set and
	   * another set
	   * @param {Set} thatSet - another Set instance
	   * @returns {undefined}
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set2 = new Collections.HashSet();
	   * set2.add(2);
	   * set.intersect(set2);
	   * // set1 is now [2] and set2 is unchanged
	   */


	  SetInterface.prototype.intersect = function intersect(thatSet) {
	    var thisKeys = this.keys();
	    var context = this;
	    thisKeys.forEach(function (element) {
	      if (!thatSet.has(element)) {
	        context.remove(element);
	      }
	    });
	  };

	  /**
	   * Returns ths size of the set
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set.cardinality() ; // 2
	   */


	  SetInterface.prototype.cardinality = function cardinality() {
	    throw new Error("must implement this method");
	  };

	  return SetInterface;
	}();

	module.exports = SetInterface;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _BSTNode = __webpack_require__(13);

	var _BSTNode2 = _interopRequireDefault(_BSTNode);

	var _BSTPrototype = __webpack_require__(14);

	var _Util = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Binary search tree representation
	 * @class
	 * @param {function} comparator - @see Global#defaultComp for examples
	 * @example
	 * const bst = new Collections.BST();
	 * // FOR ALL EXAMPLES BELOW. ASSUME bst IS CLEARED BEFORE EACH EXAMPLE
	 */
	var BST = function () {
	  function BST(comparator) {
	    _classCallCheck(this, BST);

	    this.root = new _BSTNode2['default']();
	    this.comp = comparator || _Util.defaultComp;
	    this.inserts = 0;
	  }

	  /**
	  * Inserts the given key and value into BST
	  * @param {*} key - The key to insert into BST
	  * @param {*} value - The value that is mapped to by @param key
	  * @returns {BST} The instance that this method was called with
	  *
	  * @example
	  * bst.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
	  * // ed now maps to kane because ed already existed before.
	  */


	  BST.prototype.insert = function insert(key, value) {
	    var inserted = _BSTPrototype.BSTInsert.call(this, key, value, _BSTNode2['default']);
	    if (inserted) {
	      this.inserts += 1;
	    }
	    return this;
	  };

	  /**
	   * Removes the given key and its associated value from BST
	   * @param {*} key - The key to search for
	   * @returns {BST} The instance that this method was called with
	   *
	   * @example
	   * bst.insert(1, 5).insert(5, 10);
	   * bst.remove(1); // 1 and it's associated value are removed from tree
	   * bst.remove("dog"); // this call fails silently as dog never existed in tree
	   */


	  BST.prototype.remove = function remove(key) {
	    var removed = _BSTPrototype.BSTRemove.call(this, key);
	    if (removed) {
	      this.inserts -= 1;
	    }
	    return this;
	  };

	  /**
	  * Finds the value associated with the given key
	  * @param {*} key - The key to search for in BST
	  * @returns {(*|undefined)} The value associated with @param key or undefined
	  * if not found.
	  *
	  * @example
	  * bst.insert(1, 5).insert(5, 10);
	  * bst.find(5); // returns 10
	  * bst.find(67); // returns undefined
	  */


	  BST.prototype.find = function find(key) {
	    var node = _BSTPrototype.BSTSearch.call(this, this.root, key);
	    return node ? node.value : undefined;
	  };

	  /**
	  * Determines if the BST contains the given key
	  * @param {*} key - The key to search for
	  * @returns {boolean} True if BST contains @param key and false otherwise
	  *
	  * @example
	  * bst.insert(1, 5).insert(5, 10);
	  * bst.contains(5); // returns true
	  * bst.contains(67); // returns false
	  */


	  BST.prototype.contains = function contains(key) {
	    return this.find(key) !== undefined;
	  };

	  /**
	  * Gives the inorder traversal of the BST
	  * @returns {Array} Array of objects representing the tree
	  */


	  BST.prototype.inorder = function inorder() {
	    return (0, _BSTPrototype.BSTInorder)(this.root);
	  };

	  /**
	   * Reports the number of elements in the BST
	   * @returns {number} Number of elements in the BST
	   */


	  BST.prototype.size = function size() {
	    return this.inserts;
	  };

	  /**
	   * Gives the keys in the BST
	   * @returns {Array} The key set
	   */


	  BST.prototype.keys = function keys() {
	    return this.inorder().map(function (node) {
	      return node.key;
	    });
	  };

	  return BST;
	}();

	module.exports = BST;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	"use strict";

	/**
	* Inserts given key and value into bst (maps key to value)
	* @private
	* @param {*} key - The key to insert in bst
	* @param {*} value - the value that is mapped to by @param key
	* @param {BSTNode} Node - The Node type to insert into tree
	* @returns {(BSTNode|null)} Null if the node was already in tree, thus not inserted
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
	 * Searches for the given key in tree
	 * @private
	 * @param {BSTNode} root - The root node to start search
	 * @param {*} key - The key to search for in bst
	 * @returns {(null|BSTNode)} Null if not found. Or the actual node if found
	 */
	function search(root, key) {
	  var curRoot = root;
	  var comp = this.comp;
	  while (curRoot.key !== undefined) {
	    if (comp(curRoot.key, key) === 0) {
	      return curRoot;
	    } else if (comp(curRoot.key, key) === -1) {
	      curRoot = curRoot.right;
	    } else {
	      curRoot = curRoot.left;
	    }
	  }
	}

	/**
	 * Finds the inorder successor of the given node
	 * @private
	 * @param {BSTNode} node - The Node to find the successor for
	 * @returns {BSTNode} The inorder successor of @param node
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
	 * Searches for a node with given key and removes it from tree
	 * @private
	 * @param {*} key - Key to search for in tree
	 * @param {BSTNode} nodeType - Type of Nodes in the tree
	 * @returns {boolean} Returns True if node was deleted and false otherwise
	 */
	function remove(key) {
	  var node = search.call(this, this.root, key);
	  if (!node) {
	    return false;
	  }
	  var succ = void 0;
	  var succChild = void 0;
	  if (node.left.key === undefined || node.right.key === undefined) {
	    succ = node;
	  } else {
	    succ = successor(node);
	  }
	  if (succ.left.key !== undefined) {
	    succChild = succ.left;
	  } else {
	    succChild = succ.right;
	  }
	  succChild.parent = succ.parent;
	  if (succ.parent.key === undefined) {
	    this.root = succChild;
	  } else if (succ === succ.parent.left) {
	    succ.parent.left = succChild;
	  } else {
	    succ.parent.right = succChild;
	  }

	  if (succ !== node) {
	    node.key = succ.key;
	    node.value = succ.value;
	  }
	  return { succChild: succChild, succ: succ };
	}

	/**
	 * Gets the inorder traversal starting at given root
	 * @private
	 * @param {BSTNode} root - The root of tree
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

	module.exports = {
	  BSTInsert: insert,
	  BSTRemove: remove,
	  BSTSearch: search,
	  BSTInorder: inorder,
	  BSTSuccessor: successor
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Queue = __webpack_require__(4);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _Stack = __webpack_require__(3);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _HashMap = __webpack_require__(7);

	var _HashMap2 = _interopRequireDefault(_HashMap);

	var _HashSet = __webpack_require__(10);

	var _HashSet2 = _interopRequireDefault(_HashSet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Undirected, weighted graph representation
	 * @class
	 * @param {number} numVerticies - Number of expected verticies for the graph
	 *
	 * @example
	 * const graph = new Collections.Graph(97);
	 * // FOR ALL EXAMPLES BELOW. ASSUME graph IS CLEARED BEFORE EACH EXAMPLE
	 */
	var Graph = function () {
	  function Graph(numVerticies) {
	    _classCallCheck(this, Graph);

	    this.graph = new _HashMap2['default'](numVerticies);
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


	  Graph.prototype.addVertex = function addVertex(vertex) {
	    var graph = this.graph;
	    // so user does not accidentally overwrite values array

	    if (!graph.contains(vertex) && vertex !== undefined) {
	      graph.put(vertex, []);
	    }
	  };

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


	  Graph.prototype.addEdge = function addEdge(vertex1, vertex2) {
	    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	    // TODO: replace with PQ for Prim's
	    var graph = this.graph;

	    var v1neighbors = graph.getVal(vertex1);
	    var v2neighbors = graph.getVal(vertex2);
	    // they both exist as verticies
	    if (v1neighbors && v2neighbors) {
	      // make sure edge does not already exist
	      if (v1neighbors.indexOf(vertex2) === -1 && v2neighbors.indexOf(vertex2) === -1) {
	        // body
	        v1neighbors.push({ vertex: vertex2, weight: weight });
	        v2neighbors.push({ vertex: vertex1, weight: weight });
	      }
	    }
	  };

	  /**
	   * Performs Breadth First Search
	   * @param {*} startingVertex - The vertex to start Search from
	   * @returns {Array} An Array containing verticies in order visited
	   * through BFS
	   */


	  Graph.prototype.BFS = function BFS(startingVertex) {
	    var graph = this.graph;

	    if (!graph.contains(startingVertex)) {
	      return [];
	    }

	    var bfs = [];
	    var visited = new _HashSet2['default'](graph.size());
	    var queue = new _Queue2['default']();
	    queue.enqueue(startingVertex);
	    while (queue.size() !== 0) {
	      var currentVertex = queue.dequeue();

	      if (!visited.has(currentVertex)) {
	        visited.add(currentVertex);
	        bfs.push(currentVertex);
	        var currentVertexNeighbors = graph.getVal(currentVertex).length;
	        for (var i = 0; i < currentVertexNeighbors; i += 1) {
	          var curNeighbor = graph.getVal(currentVertex)[i].vertex;
	          if (!visited.has(curNeighbor)) {
	            queue.enqueue(curNeighbor);
	          }
	        }
	      }
	    }
	    return bfs;
	  };

	  /**
	   * Performs Depth First Search
	   * @param {*} startingVertex - The vertex to start Search from
	   * @returns {Array} An Array containing verticies in order visited
	   * through DFS
	   */


	  Graph.prototype.DFS = function DFS(startingVertex) {
	    var graph = this.graph;
	    if (!graph.contains(startingVertex)) {
	      return [];
	    }

	    var dfs = [];
	    var visited = new _HashSet2['default'](graph.size());
	    var stack = new _Stack2['default']();
	    stack.push(startingVertex);
	    while (stack.size() !== 0) {
	      var currentVertex = stack.pop();

	      if (!visited.has(currentVertex)) {
	        visited.add(currentVertex);
	        dfs.push(currentVertex);
	        var currentVertexNeighbors = graph.getVal(currentVertex).length;
	        for (var i = 0; i < currentVertexNeighbors; i += 1) {
	          var curNeighbor = graph.getVal(currentVertex)[i].vertex;
	          if (!visited.has(curNeighbor)) {
	            stack.push(curNeighbor);
	          }
	        }
	      }
	    }
	    return dfs;
	  };

	  /**
	   * Reports whether the graph is connected
	   * @returns {boolean} True if connected and false otherwise
	   */


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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Converts the given data to a lowercase string
	 * @private
	 * @param {*} data - The data to convert
	 * @returns @param data to a string
	 */
	function toLowerCaseString(data) {
	  return (0, _Util.toString)(data).toLowerCase();
	}
	/**
	 * Returns a reference to the tail of the prefix if trie contains it
	 * @private
	 * @param {TrieNode} root - The root of the trie
	 * @param {string} prefix - The prefix to search for
	 * @returns {(TrieNode|boolean)} Returns a reference to the prefix's last word
	 * or false if prefix not found in trie
	 */
	function getNode(root, pattern) {
	  if (pattern.length === 0) {
	    return false;
	  }
	  var currentNode = root.children;
	  var currentChar = void 0;
	  for (var i = 0; i < pattern.length - 1; i += 1) {
	    currentChar = pattern.charAt(i);
	    if (!currentNode[currentChar]) {
	      return false;
	    }
	    currentNode = currentNode[currentChar].children;
	  }
	  return currentNode;
	}

	/**
	 * Recursively searches a trie to find all words starting at root
	 * @private
	 * @param {TrieNode} node - The starting node
	 * @param {Array} array - The array to add words to
	 * @returns {undefined}
	 */
	function recurseTree(trieNode, array) {
	  if (!trieNode) {
	    return;
	  }
	  // all character children
	  var keys = Object.keys(trieNode);
	  for (var i = 0; i < keys.length; i += 1) {
	    var currentNode = trieNode[keys[i]];
	    if (currentNode.endOfWord) {
	      array.push(currentNode.word);
	    }
	    recurseTree(currentNode.children, array);
	  }
	}

	/**
	 * Reports whether the given trieNode has at least one child
	 * @private
	 * @param {TrieNode} trieNode - The trie node to check children of
	 * @returns {boolean} True if the node has children and false otherwise
	 */
	function hasChild(trieNode) {
	  if (!trieNode) {
	    return false;
	  }

	  /**
	   *Using this instead of Object.keys because I only need existence of one child
	   *not all
	   */
	  for (var prop in trieNode) {
	    // eslint-disable-line no-restricted-syntax
	    if (Object.prototype.hasOwnProperty.call(trieNode, prop)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Nodes for Trie
	 * @class
	 * @private
	 */

	var TrieNode = function TrieNode() {
	  _classCallCheck(this, TrieNode);

	  this.children = {};
	  this.endOfWord = false;
	  this.word = null;
	};

	/**
	 * Trie (prefix tree) representation
	 * @class
	 *
	 * @example
	 * const trie = new Collections.Trie();
	 * // FOR ALL EXAMPLES BELOW. ASSUME trie IS CLEARED BEFORE EACH EXAMPLE
	 */


	var Trie = function () {
	  function Trie() {
	    _classCallCheck(this, Trie);

	    this.root = new TrieNode();
	  }

	  /**
	   * Converts the given data to string and adds it to trie
	   * @param {*} word - The word to add into trie
	   * @returns {undefined}
	   */


	  Trie.prototype.addWord = function addWord() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    var currentNode = this.root.children;
	    var word = toLowerCaseString(data);
	    var currentChar = void 0;
	    for (var i = 0; i < word.length; i += 1) {
	      currentChar = word.charAt(i);
	      // path does not exist currently in trie
	      if (!currentNode[currentChar]) {
	        currentNode[currentChar] = new TrieNode();
	      }
	      // add end of word and word flags
	      if (i === word.length - 1) {
	        currentNode[currentChar].endOfWord = true;
	        currentNode[currentChar].word = word;
	      }
	      // trickle down the tree
	      currentNode = currentNode[currentChar].children;
	    }
	  };

	  /**
	   * Reports whether the trie contains the given word
	   * @param {*} data - The data to search for
	   * @returns {boolean} True if the trie contains @param data.toString()
	   * or false if it does not
	   */


	  Trie.prototype.containsWord = function containsWord() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    var word = toLowerCaseString(data);
	    var foundWord = getNode(this.root, word);
	    if (foundWord) {
	      var lastChar = word.charAt(word.length - 1);
	      if (foundWord[lastChar] && foundWord[lastChar].word === word) {
	        return true;
	      }
	    }
	    return false;
	  };

	  /*
	  * trie.addWord("apple");
	  * trie.addWord.("app");
	  * trie.containsPrefix("apple"); // false
	  * trie.containsPrefix("app"); // true
	  */


	  Trie.prototype.containsPrefix = function containsPrefix() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    var root = this.root;
	    var str = toLowerCaseString(prefix);
	    var foundPrefix = getNode(root, str);
	    if (foundPrefix) {
	      var lastChar = str.charAt(str.length - 1);
	      if (foundPrefix[lastChar]) {
	        var hasChildren = hasChild(foundPrefix[lastChar].children);
	        if (hasChildren) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  /**
	   * Gives all of the words in the trie with the given prefix
	   * @param {*} prefix - The prefix to search for
	   * @returns {Array} An array with all the words that are prefixed by
	   * @param prefix
	   *
	   * @example
	   * trie.addWord("apple");
	   * trie.addWord.("app");
	   * trie.prefixAll("app"); // returns only apple because app is equal to prefix
	   */


	  Trie.prototype.prefixAll = function prefixAll() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    if (!this.containsPrefix(prefix)) {
	      return [];
	    }
	    var word = toLowerCaseString(prefix);
	    var prefixTail = getNode(this.root, word);
	    var lastChar = word.charAt(word.length - 1);
	    var prefixes = [];
	    recurseTree(prefixTail[lastChar].children, prefixes);
	    return prefixes;
	  };

	  return Trie;
	}();

	module.exports = Trie;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _HashMap2 = __webpack_require__(7);

	var _HashMap3 = _interopRequireDefault(_HashMap2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * HashMultiMap representation
	 * @class
	 * @extends HashMap
	 * @param {number} [initialCapacity=13] - Initial size of the hashmultimap
	 * @inheritdoc
	 * @example
	 * const map = new Collections.HashMultiMap();
	 * // FOR ALL EXAMPLES BELOW. ASSUME map IS CLEARED BEFORE EACH EXAMPLE
	 */
	var HashMultiMap = function (_HashMap) {
	  _inherits(HashMultiMap, _HashMap);

	  function HashMultiMap(initialCapacity) {
	    _classCallCheck(this, HashMultiMap);

	    return _possibleConstructorReturn(this, _HashMap.call(this, initialCapacity));
	  }

	  /**
	   * Inserts given key and value into HashMultiMap
	   * @param {*} key - The key
	   * @param {*} value - The value mapped to by @param key
	   * @returns {boolean} True
	   *
	   * @example
	   * map.put("ed", "jones");
	   * map.put("ed", "james");
	   * // ed now maps to jones and james.
	   */


	  HashMultiMap.prototype.put = function put(key) {
	    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    var retVal = _HashMap.prototype.getVal.call(this, key);
	    if (retVal) {
	      // no duplicate values for one key
	      if (retVal.indexOf(value) === -1) {
	        return retVal.push(value);
	      }
	      return false;
	    }
	    var newValArr = [];
	    newValArr.push(value);
	    return _HashMap.prototype.put.call(this, key, newValArr);
	  };

	  return HashMultiMap;
	}(_HashMap3['default']);

	module.exports = HashMultiMap;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Pushes the given value to an array and returns the new array
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
	 * Rotates the given array's elements to the left a fixed number of times
	 * @private
	 * @param {Array} array - The array to rotate
	 * @param {number} times - The number of times to rotate left
	 * @returns {undefined}
	 */
	function lRotate(array, times) {
	  var rotations = times;
	  var front = void 0;
	  if (array.length > 1) {
	    while (rotations < 0) {
	      front = array.shift();
	      array.push(front);
	      rotations += 1;
	    }
	  }
	}

	/**
	 * Rotates the given array's elements to the right a fixed number of times
	 * @private
	 * @param {Array} array - The array to rotate
	 * @param {number} times -The number of times to rotate right
	 * @returns {undefined}
	 */
	function rRotate(array, times) {
	  var rotations = times;
	  var back = void 0;
	  if (array.length > 1) {
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
	 *
	 * @example
	 * const arrayMethods = Collections.ArrayUtils;
	 */

	var ArrayUtils = function () {
	  function ArrayUtils() {
	    _classCallCheck(this, ArrayUtils);
	  } // eslint-disable-line no-empty-function

	  /**
	   * Removes an element at the given position in the given array
	   * @static
	   * @param {Array} array - The array to remove elements from
	   * @param {number} index - The index to remove from @param array
	   * @returns {Array} Array of removed elements
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * let removedItems = arrayMethods.remove(myArray, 1);
	   * // removedItems contains [2] and myArray is [1, 3, 4]
	   */


	  ArrayUtils.remove = function remove() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	    return index >= 0 ? array.splice(index, 1) : [];
	  };

	  /**
	   * Removes the first occurence of the given value from array
	   * @static
	   * @param {Array} array - The array to remove elements from
	   * @param {*} value - The value to remove from @param array
	   * @returns {Array} Array of removed elements
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * let removedItems = arrayMethods.removeElement(myArray, 3);
	   * // changedArray contains [3] and myArray is [1, 2, 4]
	   */


	  ArrayUtils.removeElement = function removeElement() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var value = arguments[1];

	    var indexOfValue = array.indexOf(value);
	    return ArrayUtils.remove(array, indexOfValue);
	  };

	  /**
	   * Rotates the given array left(negative number) or right(positive number)
	   * @static
	   * @param {Array} array - The array to rotate
	   * @param {number} times - The number of times to rotate @param array
	   * @throws {TypeError} If @param times is not a primitive number
	   * @returns {undefined}
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * arrayMethods.rotate(myArray, 2);
	   * // myArray is [3, 4, 1, 2]
	   * arrayMethods.rotate(myArray, -2);
	   * // myArray is back to original positioning [1, 2, 3, 4]
	   */


	  ArrayUtils.rotate = function rotate() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    // avoid infinite loop in rotate methods for unconventional args
	    (0, _Util.isNumber)(times);
	    if (times < 0) {
	      return lRotate(array, times);
	    } else if (times > 0) {
	      return rRotate(array, times);
	    }
	  };

	  /**
	   * Pops the given array a given amount of times
	   * @static
	   * @param {Array} array - The array to pop
	   * @param {number} times - The number of times to pop @param array
	   * @returns {Array} A new array equal to
	   * [@param array - popped elements]
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * const altered = arrayMethods.popMany(myArray, 3);
	   * // myArray is [1, 2, 3, 4] ; altered is [1]
	   */


	  ArrayUtils.popMany = function popMany() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    var diff = array.length - times;
	    return diff > 0 ? array.slice(0, diff) : [];
	  };

	  /**
	   * Pushes many elements into the given array
	   * @static
	   * @param {Array} array - The array to push elements into
	   * @param {*} args - Consecutive arguments to push into array
	   * @returns {Array} A new array equal to [@param array + pushed elements]
	   *
	   * @example
	   * const myArray = [1, 2];
	   * const altered = arrayMethods.pushMany(myArray, "push", "me");
	   * // myArray is unchanged ; altered = [1, 2, "push", "me"]
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
	   * Returns a random index in the given array
	   * @static
	   * @param {Array} array - The array to get random index from
	   * @returns {*} Random element in @param array
	   *
	   * @example
	   * const myArray = [1, 2];
	   * const altered = arrayMethods.getRand(myArray);
	   * // altered could be 1 or 2
	   */


	  ArrayUtils.getRand = function getRand() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    return array[(0, _Util.genRand)(array.length)];
	  };

	  /**
	   * Removes a random element from the given array
	   * @static
	   * @param {Array} array - The array to remove a random element from
	   * @returns {Array} An array of length 1 containing the element removed
	   * from @param array
	   *
	   * @example
	   * const myArray = [1, 2];
	   * const altered = arrayMethods.removeRand(myArray);
	   * // altered could be 1 or 2 ; myArray's length decreases by 1
	   */


	  ArrayUtils.removeRand = function removeRand() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    var randIndex = (0, _Util.genRand)(array.length);
	    return ArrayUtils.remove(array, randIndex);
	  };

	  /**
	   * Shuffles the given array
	   * @static
	   * @param {Array} array - The array to shuffle
	   * @returns {undefined}
	   */


	  ArrayUtils.shuffle = function shuffle(array) {
	    var arrayLength = array.length;
	    for (var i = 0; i < Math.floor(arrayLength / 2); i += 1) {
	      var index1 = (0, _Util.genRand)(arrayLength);
	      var index2 = (0, _Util.genRand)(arrayLength);
	      (0, _Util.swap)(array, index1, index2);
	    }
	  };

	  /**
	   * Turns an n dimensional array into a 1 dimensional array
	   * @param {Array} array - The array to flatten
	   * @returns {Array} @param array to a one dimensional array
	   *
	   * @example
	   * const myArray = [[2], [3], [4, 5]];
	   * const altered = arrayMethods.flatten(myArray);
	   * // altered will be [2, 3, 4, 5] ; myArray is unchanged
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
	   * Splits the given array into chunks
	   * @param {Array} array - The array to chunk
	   * @param {number} bits - The size of each nested array
	   * @throws {TypeError} If @param bits is not a primitive number
	   * @returns {Array} A new array split into @param bits
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * const altered = arrayMethods.chunk(myArray, 2);
	   * // altered is [[1, 2], [3, 4]] ; myArray is unchanged
	   */


	  ArrayUtils.chunk = function chunk(arr, bits) {
	    (0, _Util.isNumber)(bits);
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _BSTNode2 = __webpack_require__(13);

	var _BSTNode3 = _interopRequireDefault(_BSTNode2);

	var _BSTPrototype = __webpack_require__(14);

	var _BST2 = __webpack_require__(12);

	var _BST3 = _interopRequireDefault(_BST2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RBNode = function (_BSTNode) {
	  _inherits(RBNode, _BSTNode);

	  function RBNode(key, value) {
	    _classCallCheck(this, RBNode);

	    var _this = _possibleConstructorReturn(this, _BSTNode.call(this, key, value));

	    _this.color = 'black';
	    return _this;
	  }

	  return RBNode;
	}(_BSTNode3['default']);

	/**
	 * Left rotates the given node
	 * @private
	 * @param {BSTNode} node - The node to rotate
	 * @returns {undefined}
	 */


	function leftRotate(node) {
	  var oldRight = node.right;
	  var nodeParent = node.parent;
	  node.right = oldRight.left;
	  oldRight.left.parent = node;
	  oldRight.parent = nodeParent;
	  // root
	  if (nodeParent.key === undefined) {
	    this.root = oldRight;
	  } else if (node === nodeParent.left) {
	    nodeParent.left = oldRight;
	  } else {
	    nodeParent.right = oldRight;
	  }
	  oldRight.left = node;
	  node.parent = oldRight;
	}

	/**
	 * Right rotates the given node
	 * @private
	 * @param {BSTNode} node - The node to rotate
	 * @returns {undefined}
	 */
	function rightRotate(node) {
	  var oldLeft = node.left;
	  var nodeParent = node.parent;
	  node.left = oldLeft.right;
	  oldLeft.right.parent = node;
	  oldLeft.parent = nodeParent;
	  // root
	  if (nodeParent.key === undefined) {
	    this.root = oldLeft;
	  } else if (node === nodeParent.left) {
	    nodeParent.left = oldLeft;
	  } else {
	    nodeParent.right = oldLeft;
	  }
	  oldLeft.right = node;
	  node.parent = oldLeft;
	}

	/**
	 * Fixes up the rb tree after insertion
	 * @private
	 * @param {BSTNode} node - The node to begin fixing
	 * @returns {undefined}
	 */
	function insertFix(nodeToFix) {
	  var currentNode = nodeToFix;
	  var uncle = void 0;
	  while (currentNode.parent.color === 'red') {
	    if (currentNode.parent === currentNode.parent.parent.left) {
	      uncle = currentNode.parent.parent.right;
	      if (uncle.color === 'red') {
	        currentNode.parent.color = 'black';
	        uncle.color = 'black';
	        currentNode.parent.parent.color = 'red';
	        currentNode = currentNode.parent.parent;
	      } else {
	        if (currentNode === currentNode.parent.right) {
	          currentNode = currentNode.parent;
	          leftRotate.call(this, currentNode);
	        }
	        currentNode.parent.color = 'black';
	        currentNode.parent.parent.color = 'red';
	        rightRotate.call(this, currentNode.parent.parent);
	      }
	    } else {
	      uncle = currentNode.parent.parent.left;
	      if (uncle.color === 'red') {
	        currentNode.parent.color = 'black';
	        uncle.color = 'black';
	        currentNode.parent.parent.color = 'red';
	        currentNode = currentNode.parent.parent;
	      } else {
	        if (currentNode === currentNode.parent.left) {
	          currentNode = currentNode.parent;
	          rightRotate.call(this, currentNode);
	        }
	        currentNode.parent.color = 'black';
	        currentNode.parent.parent.color = 'red';
	        leftRotate.call(this, currentNode.parent.parent);
	      }
	    }
	  }
	  this.root.color = 'black';
	}

	/**
	 * Fixes up the rb tree after deletion
	 * @private
	 * @param {BSTNode} node - The node to begin fixing
	 * @returns {undefined}
	 */
	function deletefixUp(nodeToFix) {
	  var currentNode = nodeToFix;
	  while (currentNode.parent.key !== undefined && currentNode.color === 'black') {
	    var uncle = void 0;
	    if (currentNode === currentNode.parent.left) {
	      uncle = currentNode.parent.right;
	      if (uncle.color === 'red') {
	        uncle.color = 'black';
	        currentNode.parent.color = 'red';
	        leftRotate.call(this, currentNode.parent);
	        uncle = currentNode.parent.right;
	      }
	      if (uncle.left.color === 'black' && uncle.right.color === 'black') {
	        uncle.color = 'red';
	        currentNode = currentNode.parent;
	      } else {
	        if (uncle.right.color === 'black') {
	          uncle.left.color = 'black';
	          uncle.color = 'red';
	          rightRotate.call(this, uncle);
	          uncle = currentNode.parent.right;
	        }
	        uncle.color = currentNode.parent.color;
	        currentNode.parent.color = 'black';
	        uncle.right.color = 'black';
	        leftRotate.call(this, currentNode.parent);
	        currentNode = this.root;
	      }
	    } else {
	      uncle = currentNode.parent.left;
	      if (uncle.color === 'red') {
	        uncle.color = 'black';
	        currentNode.parent.color = 'red';
	        rightRotate.call(this, currentNode.parent);
	        uncle = currentNode.parent.left;
	      }
	      if (uncle.right.color === 'black' && uncle.left.color === 'black') {
	        uncle.color = 'red';
	        currentNode = currentNode.parent;
	      } else {
	        if (uncle.left.color === 'black') {
	          uncle.right.color = 'black';
	          uncle.color = 'red';
	          leftRotate.call(this, uncle);
	          uncle = currentNode.parent.left;
	        }
	        uncle.color = currentNode.parent.color;
	        currentNode.parent.color = 'black';
	        uncle.left.color = 'black';
	        rightRotate.call(this, currentNode.parent);
	        currentNode = this.root;
	      }
	    }
	  }
	  currentNode.color = 'black';
	}

	/**
	 * Red-Black Tree representation
	 * @class
	 * @extends BST
	 * @param {function} comparator - @see Global#defaultComp for examples
	 * @example
	 * const bst = new Collections.RBTree();
	 * // FOR ALL EXAMPLES BELOW. ASSUME rb IS CLEARED BEFORE EACH EXAMPLE
	 */

	var RBTree = function (_BST) {
	  _inherits(RBTree, _BST);

	  function RBTree(comparator) {
	    _classCallCheck(this, RBTree);

	    var _this2 = _possibleConstructorReturn(this, _BST.call(this, comparator));

	    _this2.root = new RBNode();
	    return _this2;
	  }

	  RBTree.prototype.insert = function insert(key, value) {
	    var insertedNode = _BSTPrototype.BSTInsert.call(this, key, value, RBNode);
	    if (insertedNode) {
	      insertedNode.color = 'red';
	      insertFix.call(this, insertedNode);
	      this.inserts += 1;
	    }
	    return this;
	  };

	  RBTree.prototype.remove = function remove(key) {
	    // successor and child
	    var didRemove = _BSTPrototype.BSTRemove.call(this, key);
	    if (didRemove) {
	      var succChild = didRemove.succChild,
	          succ = didRemove.succ;

	      if (succ.color === 'black') {
	        deletefixUp.call(this, succChild);
	        this.inserts -= 1;
	      }
	    }
	    return this;
	  };

	  return RBTree;
	}(_BST3['default']);

	module.exports = RBTree;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _MapInterface2 = __webpack_require__(9);

	var _MapInterface3 = _interopRequireDefault(_MapInterface2);

	var _RedBlackTree = __webpack_require__(19);

	var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Map representaion
	 * @class
	 * @implements MapInterface
	 * @param {function} comparator - @see Global#defaultComparator
	 */
	var Map = function (_MapInterface) {
	  _inherits(Map, _MapInterface);

	  function Map(comparator) {
	    _classCallCheck(this, Map);

	    var _this = _possibleConstructorReturn(this, _MapInterface.call(this));

	    _this.map = new _RedBlackTree2['default'](comparator);
	    return _this;
	  }

	  Map.prototype.put = function put(key, value) {
	    this.map.insert(key, value);
	    return this;
	  };

	  Map.prototype.getVal = function getVal(key) {
	    return this.map.find(key);
	  };

	  Map.prototype.remove = function remove(key) {
	    this.map.remove(key);
	    return this;
	  };

	  Map.prototype.keys = function keys() {
	    return this.map.keys();
	  };

	  Map.prototype.contains = function contains(key) {
	    return this.map.contains(key);
	  };

	  Map.prototype.size = function size() {
	    return this.map.size();
	  };

	  return Map;
	}(_MapInterface3['default']);

	module.exports = Map;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _SetInterface2 = __webpack_require__(11);

	var _SetInterface3 = _interopRequireDefault(_SetInterface2);

	var _RedBlackTree = __webpack_require__(19);

	var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Set representaion
	 * @class
	 * @implements SetInterface
	 * @param {function} comparator - @see Global#defaultComparator
	 */
	var Set = function (_SetInterface) {
	  _inherits(Set, _SetInterface);

	  function Set(comparator) {
	    _classCallCheck(this, Set);

	    var _this = _possibleConstructorReturn(this, _SetInterface.call(this));

	    _this.set = new _RedBlackTree2['default'](comparator);
	    return _this;
	  }

	  Set.prototype.add = function add(element) {
	    this.set.insert(element);
	    return this;
	  };

	  Set.prototype.has = function has(element) {
	    return this.set.contains(element);
	  };

	  Set.prototype.remove = function remove(element) {
	    this.set.remove(element);
	    return this;
	  };

	  Set.prototype.cardinality = function cardinality() {
	    return this.set.size();
	  };

	  return Set;
	}(_SetInterface3['default']);

	module.exports = Set;

/***/ }
/******/ ])
});
;