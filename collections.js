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

	exports.__esModule = true;
	exports.MultiMap = exports.RBTree = exports.Set = exports.ArrayUtils = exports.Trie = exports.Graph = exports.BST = exports.HashSet = exports.HashMap = exports.PriorityQueue = exports.BHeap = exports.Queue = exports.Stack = exports.List = undefined;

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	var _Stack = __webpack_require__(3);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _Queue = __webpack_require__(4);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _BHeap = __webpack_require__(5);

	var _BHeap2 = _interopRequireDefault(_BHeap);

	var _PriorityQueue = __webpack_require__(6);

	var _PriorityQueue2 = _interopRequireDefault(_PriorityQueue);

	var _HashMap = __webpack_require__(7);

	var _HashMap2 = _interopRequireDefault(_HashMap);

	var _HashSet = __webpack_require__(9);

	var _HashSet2 = _interopRequireDefault(_HashSet);

	var _BST = __webpack_require__(11);

	var _BST2 = _interopRequireDefault(_BST);

	var _Graph = __webpack_require__(14);

	var _Graph2 = _interopRequireDefault(_Graph);

	var _Trie = __webpack_require__(18);

	var _Trie2 = _interopRequireDefault(_Trie);

	var _ArrayUtils = __webpack_require__(19);

	var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

	var _RedBlackTree = __webpack_require__(16);

	var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

	var _Set = __webpack_require__(17);

	var _Set2 = _interopRequireDefault(_Set);

	var _MultiMap = __webpack_require__(15);

	var _MultiMap2 = _interopRequireDefault(_MultiMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.List = _List2['default'];
	exports.Stack = _Stack2['default'];
	exports.Queue = _Queue2['default'];
	exports.BHeap = _BHeap2['default'];
	exports.PriorityQueue = _PriorityQueue2['default'];
	exports.HashMap = _HashMap2['default'];
	exports.HashSet = _HashSet2['default'];
	exports.BST = _BST2['default'];
	exports.Graph = _Graph2['default'];
	exports.Trie = _Trie2['default'];
	exports.ArrayUtils = _ArrayUtils2['default'];
	exports.Set = _Set2['default'];
	exports.RBTree = _RedBlackTree2['default'];
	exports.MultiMap = _MultiMap2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

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
	  var head = this.head;
	  if (index < 0 || !head) {
	    return;
	  }
	  var i = 0;
	  while (i < index) {
	    head = head.next;
	    i += 1;
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

	    var foundNode = getNode.call(this, index);
	    return foundNode ? foundNode.data : undefined;
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

	    var removedData = void 0;
	    if (head) {
	      removedData = head.data;
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
	    return removedData;
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

	    var removedData = void 0;
	    if (tail) {
	      removedData = tail.data;
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
	    return removedData;
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
	    var length = this.length;

	    if (index === 0) {
	      return this.addToFront(data);
	    } else if (index >= length) {
	      return this.addToBack(data);
	    }
	    // parent of wanted node
	    var parentNode = getNode.call(this, index - 1);
	    if (parentNode) {
	      var newNode = new Node(data);
	      var oldParentNext = parentNode.next;
	      newNode.next = oldParentNext;
	      oldParentNext.prev = newNode;
	      parentNode.next = newNode;
	      newNode.prev = parentNode;
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
	    var length = this.length;

	    var removedData = void 0;
	    if (index === 0) {
	      return this.removeFront();
	    } else if (index >= length - 1) {
	      return this.removeBack();
	    }
	    // parent of wanted node
	    var parentNode = getNode.call(this, index - 1);
	    if (parentNode) {
	      var toRemove = parentNode.next;
	      removedData = toRemove.data;
	      var toRemoveNext = toRemove.next;
	      parentNode.next = toRemoveNext;
	      toRemoveNext.prev = parentNode;
	      this.length = length - 1;
	    }
	    return removedData;
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
	    var cmp = comparator || _Util.defaultComparator;
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
	   * Empties the List
	   * @returns {undefined}
	   */


	  List.prototype.clear = function clear() {
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  };

	  /**
	   * Returns the size of the List
	   * @returns {number} The size of the List
	   */


	  List.prototype.size = function size() {
	    return this.length;
	  };

	  /**
	   * Calls a callback function for each element in the list
	   * @param {function} predicate - Function executed for each element
	   * (data, index)
	   * @returns {List} The instance that this method was called
	   */


	  List.prototype.forEach = function forEach(predicate) {
	    var head = this.head;
	    var index = 0;
	    while (head) {
	      predicate(head.data, index);
	      head = head.next;
	      index += 1;
	    }
	    return this;
	  };

	  /**
	   * Returns a new list with only elements that return truthy when passed to the
	   * given callback
	   * @param {function(data)} predicate - The function used to evaluate elements
	   * @returns {List} A new list with filtered elements
	   */


	  List.prototype.filter = function filter(predicate) {
	    var head = this.head;
	    var newList = new List();
	    var data = void 0;
	    while (head) {
	      data = head.data;
	      if (predicate(data)) {
	        newList.addToBack(data);
	      }
	      head = head.next;
	    }
	    return newList;
	  };

	  /**
	   * Reports if every element in the list passes a certain condition
	   * @param {function(data)} predicate - The function used for evaluations
	   * @returns {boolean} True if every element passes the test and false otherwise
	   */


	  List.prototype.every = function every(predicate) {
	    var head = this.head;
	    while (head) {
	      if (!predicate(head.data)) {
	        return false;
	      }
	      head = head.next;
	    }
	    return true;
	  };

	  /**
	   * Reports if at least one element in the list passes a certain condition
	   * @param {function(data)} predicate - The function used for evaluations
	   * @returns {boolean} True if one or more elements passes the test and false otherwise
	   */


	  List.prototype.some = function some(predicate) {
	    var head = this.head;
	    while (head) {
	      if (predicate(head.data)) {
	        return true;
	      }
	      head = head.next;
	    }
	    return false;
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

	exports['default'] = List;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.swap = swap;
	exports.flat = flat;
	exports.toString = toString;
	exports.defaultComparator = defaultComparator;
	exports.isNumber = isNumber;
	exports.generateRandomInt = generateRandomInt;
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
	 * Makes a 1-D array from an n-D array
	 * @private
	 * @param {Array} array - The array to flatten
	 * @param {res} - The new flattened array
	 * @returns {undefined}
	 */
	function flat(array, res) {
	  var newArr = [];
	  var curValue = void 0;
	  for (var i = 0, len = array.length; i < len; i += 1) {
	    curValue = array[i];
	    if (Array.isArray(curValue)) {
	      flat(curValue, res);
	    } else {
	      res.push(curValue);
	    }
	  }
	  return newArr;
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
	function defaultComparator(a, b) {
	  if (a < b) {
	    return -1;
	  }
	  if (a === b) {
	    return 0;
	  }
	  return 1;
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
	// eslint-disable-next-line no-unused-vars
	function customComparator(a, b) {
	  // eslint-disable-line no-unused-vars
	  if (a < b) {
	    return -1;
	  }
	  if (a === b) {
	    return 0;
	  }
	  return 1;
	}

	/**
	 * Number.isNaN polyfill from
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
	 * /Global_Objects/Number/isFinite
	 * @private
	 */
	function isNumber(value) {
	  // eslint-disable-next-line no-restricted-globals
	  if (typeof value !== 'number' || !isFinite(value)) {
	    throw new TypeError('Argument must be of type number or Number');
	  }
	}

	/**
	 * Generates a random integer between 0 and limit (exclusive)
	 * @private
	 * @param {number} limit - Upper bound on random number
	 * @returns {number} Random number in the range [0, @param limit)
	 */
	function generateRandomInt(limit) {
	  return Math.floor(Math.random() * limit);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

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
	   * stack.push(1).push(2); // <2, 1>
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
	   * stack.push(1).push(2).push(3);
	   * stack.pop(); // 3
	   */


	  Stack.prototype.pop = function pop() {
	    return this.stack.removeFront();
	  };

	  /**
	   * Reports but does not remove the staged element to be removed next
	   * @returns {*} The element staged to be removed next
	   *
	   * @example
	   * stack.push(1);
	   * stack.peek() // returns 1 but does not remove it
	   */


	  Stack.prototype.peek = function peek() {
	    return this.stack.elementAtIndex(0);
	  };

	  /**
	   * Empties the Stack
	   * @returns {undefined}
	   */


	  Stack.prototype.clear = function clear() {
	    return this.stack.clear();
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

	exports['default'] = Stack;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	    this.queue = new _List2['default']();
	  }

	  /**
	   * Inserts given data into queue
	   * @param {*} data - The data to insert into queue
	   * @returns {Queue} The instance that this method was called
	   *
	   * @example
	   * queue.enqueue(1).enqueue(2);
	   *
	   */


	  Queue.prototype.enqueue = function enqueue(data) {
	    this.queue.addToBack(data);
	    return this;
	  };

	  /**
	   * Removes from the queue in a first in first out manner
	   * @returns {*} The removed data
	   * @example
	   * queue.enqueue(1).enqueue(2);
	   * queue.dequeue() // 1
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
	    return this.queue.elementAtIndex(0);
	  };

	  /**
	   * Empties the Queue
	   * @returns {undefined}
	   */


	  Queue.prototype.clear = function clear() {
	    return this.queue.clear();
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

	exports['default'] = Queue;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Sifts down (swaps elements downward) the given array
	 * @private
	 * @param {Array} array - The array to sift down on.
	 * @param {number} index - The index to start the sift down operation.
	 * @param {function} comparator - The comparator to use against parent and
	 * child elements.
	 * @returns {undefined}
	 */
	function heapify(array, index, comparator) {
	  var leftChildIndex = 2 * index;
	  var rightChildIndex = 2 * index + 1;
	  var numIndicies = array.length - 1;
	  var largest = void 0;

	  if (leftChildIndex <= numIndicies && comparator(array[leftChildIndex], array[index]) === 1) {
	    largest = leftChildIndex;
	  } else {
	    largest = index;
	  }

	  if (rightChildIndex <= numIndicies && comparator(array[rightChildIndex], array[largest]) === 1) {
	    largest = rightChildIndex;
	  }

	  if (largest !== index) {
	    (0, _Util.swap)(array, index, largest);
	    heapify(array, largest, comparator);
	  }
	}

	/**
	 * Sifts up (swaps elements upward) the given array
	 * @private
	 * @param {Array} array - The array to sift up on.
	 * @param {number} index - The index to start the sift up operation.
	 * @param {function} comparator - The comparator to use against parent
	 * and child elements
	 * @returns {undefined}
	 */
	function siftUp(array, index, comparator) {
	  if (index > 1) {
	    var parent = Math.floor(index / 2);
	    if (comparator(array[parent], array[index]) === -1) {
	      (0, _Util.swap)(array, parent, index);
	      siftUp(array, parent, comparator);
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
	    this.comparator = comparator || _Util.defaultComparator;
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
	        comparator = this.comparator;

	    var max = heap[1];
	    heap[1] = heap[heap.length - 1];
	    heap.length -= 1;
	    heapify(heap, 1, comparator);
	    return max;
	  };

	  /**
	   * Inserts the given data into the BHeap
	   * @param {*} [data=null] - The data to insert into BHeap.
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
	        comparator = this.comparator;

	    heap[heap.length] = data;
	    siftUp(heap, heap.length - 1, comparator);
	    return this;
	  };

	  /**
	   * Reports whether the BHeap contains the given data
	   * @param {*} [data=null] - The data to search for
	   * @returns {boolean} True if the heap contains @param data and false otherwise
	   *
	   * @example
	   * heap.insert(1).insert(2);
	   * heap.contains(2) // true
	   */


	  BHeap.prototype.contains = function contains(data) {
	    return this.toArray().indexOf(data) !== -1;
	  };

	  /**
	   * Retrieves the element staged to be removed next but does not remove it
	   * @returns {* | undefined} The set to be removed data or undefined if empty heap
	   *
	   * @example
	   * heap.insert(9);
	   * heap.peek() // returns 9 and heap is still of size 1
	   */


	  BHeap.prototype.peek = function peek() {
	    return this.heap[1];
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

	  /**
	   * Empties the Heap
	   * @returns {undefined}
	   */


	  BHeap.prototype.clear = function clear() {
	    this.heap.length = 1;
	  };

	  return BHeap;
	}();

	exports['default'] = BHeap;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _BHeap = __webpack_require__(5);

	var _BHeap2 = _interopRequireDefault(_BHeap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Custom comparator for min heap
	 * @private
	 * @param {valueA} objectA - First value to compare
	 * @param {valueB} objectB- Second value to compare
	 * @returns {number} 1 if @param objectA's priority is less than
	 * objectB's priority, -1 if opposite and 0 if the two priorities are equal.
	 */
	function minHeapComparator(objectA, objectB) {
	  if (objectA.priority < objectB.priority) {
	    return 1;
	  }
	  if (objectA.priority === objectB.priority) {
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
	   * @param {number} data - The data to queue
	   * @param {priority} priority - The relative Importance of @param data
	   * to othe data in the queue
	   *
	   * @example
	   * pq.enqueue("wakeup", 1);
	   * pq.enqueue("wash dishes", 2);
	   *
	   */


	  PriorityQueue.prototype.enqueue = function enqueue(data, priority) {
	    return this.queue.insert({ data: data, priority: priority });
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
	    return this.queue.size();
	  };

	  /**
	   * Removes all elements from the PriorityQueue
	   * @returns {undefined}
	   */


	  PriorityQueue.prototype.clear = function clear() {
	    return this.queue.clear();
	  };

	  return PriorityQueue;
	}();

	exports['default'] = PriorityQueue;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _HashTable = __webpack_require__(8);

	var _HashTable2 = _interopRequireDefault(_HashTable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	 */
	var HashMap = function () {
	  function HashMap(initialCapacity) {
	    _classCallCheck(this, HashMap);

	    this.map = new _HashTable2['default'](initialCapacity);
	  }

	  HashMap.prototype.put = function put(key, value) {
	    var self = this;
	    self.map.put(key, value);
	    return self;
	  };

	  HashMap.prototype.getVal = function getVal(key) {
	    return this.map.getVal(key);
	  };

	  HashMap.prototype.clear = function clear() {
	    return this.map.clear();
	  };

	  HashMap.prototype.remove = function remove(key) {
	    return this.map.remove(key);
	  };

	  HashMap.prototype.keys = function keys() {
	    return this.map.keys();
	  };

	  HashMap.prototype.values = function values() {
	    return this.map.values();
	  };

	  HashMap.prototype.contains = function contains(key) {
	    return this.map.contains(key);
	  };

	  HashMap.prototype.size = function size() {
	    return this.map.size();
	  };

	  return HashMap;
	}();

	exports['default'] = HashMap;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * From immutable.js implementation of java hashcode
	 * https://github.com/facebook/immutable-js/blob/master/src/Hash.js
	 *
	 * Returns the hashcode for the given string
	 * @private
	 * @param {string} str - The string to hash
	 * @returns {number} @param str's hashcode
	 */
	function hashString(string) {
	  var hash = 0;
	  for (var i = 0, len = string.length; i < len; i += 1) {
	    hash = 31 * hash + string.charCodeAt(i) | 0;
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
	  return dividend < 0 ? modulo * -1 : modulo;
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
	 * Gets the proper index the given key should be hashed to in the given array
	 * @private
	 * @param {*} key - The key
	 * @param {Array} Associative Array
	 * @returns {number} The index that @param key hashes to
	 */
	function getLocationInTable(key, table) {
	  var keyHash = hashString((0, _Util.toString)(key) + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	  return mod(keyHash, table.length);
	}

	/**
	 * Inserts into an Associative Array based on the hashcode of the given key
	 * @private
	 * @param {*} key - The key
	 * @param {*} value - The value mapped to by @param key
	 * @param {Array} table - Associative Array
	 * @returns {number} 1 for true
	 */
	function insert(key, value, table) {
	  var location = getLocationInTable(key, table);
	  var bucket = table[location];
	  return bucket.push(key, value);
	}

	/**
	 * Gets the keys or the values in the given table
	 * @private
	 * @param {string} query - The partial of the pair wanted either key or value
	 * @param {Array} table - The associative array
	 * @returns {Array} Array filled with keys or values
	 */
	function getKeysOrValues(query, table) {
	  var start = query === 'keys' ? 0 : 1;
	  var result = [];
	  var tableLen = table.length;
	  for (var i = 0; i < tableLen; i += 1) {
	    var currentBucket = table[i];
	    for (var j = start; j < currentBucket.length; j += 2) {
	      result.push(currentBucket[j]);
	    }
	  }
	  return result;
	}

	/**
	 * Searches an Associative Array based on the hashcode of the given key
	 * @private
	 * @param {*} key - The key to look for
	 * @param {Array} table - Associative Array
	 * @returns {Object} Object literal with the bucket where @param key is found
	 * and the index of @param key in that bucket or undefined and -1 if not found
	 */
	function search(key, table) {
	  var location = getLocationInTable(key, table);
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
	 * Figures out if the given Associative Array should grow larger
	 * @private
	 * @param {number} inserts - The number of items in the table
	 * @param {Array} table - Associative Array
	 * @returns {boolean} True if @param table should rehash and false otherwise
	 */
	function shouldRehash(inserts, table) {
	  var load = inserts / table.length;
	  return load >= 0.75 ? true : false;
	}

	/**
	 * HashTable representation
	 * @class
	 * @private
	 * @implements MapInterface
	 * @param {number} [initialCapacity=13] - Initial size of the hashtable
	 * IMPORTANT : It is not recommended that you choose a size that will be a
	 * close or approximate upper bound on your data, so that number
	 * of rehashes of the hashtable will be small. For example, if
	 * you know you only need 100,000 inserts, a good initial capacity would not be
	 * approximately 100,000 as the hastable will resize once 75,000
	 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
	 * which is 112,500 , greater than your space needed.
	 */

	var HashTable = function () {
	  function HashTable() {
	    var initialCapacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 13;

	    _classCallCheck(this, HashTable);

	    this.inserts = 0;
	    this.table = createTable(initialCapacity);
	  }

	  HashTable.prototype.put = function put() {
	    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    var self = this;
	    var table = self.table,
	        inserts = self.inserts;

	    var searchResult = search(key, table);
	    var bucket = searchResult.bucket,
	        index = searchResult.index;

	    if (index === -1) {
	      insert(key, value, table);
	      self.inserts += 1;
	      if (shouldRehash(inserts + 1, table)) {
	        self.rehash();
	      }
	    } else {
	      bucket[index + 1] = value;
	    }
	    return self;
	  };

	  HashTable.prototype.getVal = function getVal(key) {
	    var searchResult = search(key, this.table);
	    var bucket = searchResult.bucket,
	        index = searchResult.index;

	    return index !== -1 ? bucket[index + 1] : undefined;
	  };

	  HashTable.prototype.remove = function remove(key) {
	    var self = this;
	    var searchResult = search(key, self.table);
	    var bucket = searchResult.bucket,
	        index = searchResult.index;

	    if (index !== -1) {
	      self.inserts -= 1;
	      bucket.splice(index, 2);
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
	    var oldLen = oldTable.length;

	    for (var i = 0; i < oldLen; i += 1) {
	      var currentBucket = oldTable[i];
	      for (var j = 0; j < currentBucket.length; j += 2) {
	        var oldKey = currentBucket[j];
	        var oldValue = currentBucket[j + 1];
	        insert(oldKey, oldValue, newTable);
	      }
	    }
	    oldTable.length = 0;
	    this.table = newTable;
	  };

	  HashTable.prototype.keys = function keys() {
	    return getKeysOrValues('keys', this.table);
	  };

	  HashTable.prototype.values = function values() {
	    return getKeysOrValues('values', this.table);
	  };

	  /**
	   * Returns the number of buckets in the Associative Array
	   * @returns {number} Size of inner Associative Array
	   */


	  HashTable.prototype.tableSize = function tableSize() {
	    return this.table.length;
	  };

	  HashTable.prototype.clear = function clear() {
	    var self = this;
	    self.table.length = 0;
	    self.inserts = 0;
	    self.table = createTable(13);
	  };

	  HashTable.prototype.size = function size() {
	    return this.inserts;
	  };

	  return HashTable;
	}();

	exports['default'] = HashTable;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _HashTable = __webpack_require__(8);

	var _HashTable2 = _interopRequireDefault(_HashTable);

	var _SetInterface2 = __webpack_require__(10);

	var _SetInterface3 = _interopRequireDefault(_SetInterface2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : _defaults(subClass, superClass); }

	/**
	 * HashSet representation
	 * @class
	 * @implements {SetInterface}
	 * @param {number} [initialCapacity=13] - The initial size of the hashset
	 *
	 * @example
	 * const set = new Collections.HashSet();
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
	    this.set.put(element, 1);
	    return this;
	  };

	  HashSet.prototype.has = function has(element) {
	    return this.set.contains(element);
	  };

	  HashSet.prototype.remove = function remove(element) {
	    this.set.remove(element);
	    return this;
	  };

	  HashSet.prototype.entries = function entries() {
	    return this.set.keys();
	  };

	  HashSet.prototype.cardinality = function cardinality() {
	    return this.set.size();
	  };

	  HashSet.prototype.union = function union(thatSet) {
	    return _SetInterface.prototype.union.call(this, thatSet);
	  };

	  HashSet.prototype.diff = function diff(thatSet) {
	    return _SetInterface.prototype.diff.call(this, thatSet);
	  };

	  HashSet.prototype.intersect = function intersect(thatSet) {
	    return _SetInterface.prototype.intersect.call(this, thatSet);
	  };

	  return HashSet;
	}(_SetInterface3['default']);

	exports['default'] = HashSet;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Collection of elements that contain no duplicates
	 *
	 * @interface
	 *
	 */
	var SetInterface = function () {
	  function SetInterface() {
	    _classCallCheck(this, SetInterface);
	  }

	  /**
	   * Adds an element to the set if already in set
	   * @param {*} element - The element to add to the set
	   * @returns {Set} The instance that this method was called
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set.add(1);
	   * // set contains [1, 2] order might not be guareenteed
	   */


	  SetInterface.prototype.add = function add(element) {};

	  /**
	   * Returns the set difference (not symmetric) of 'this' set and
	   * another set x such that x is in A and x is not in B, where A and B
	   * are two sets
	   * @param {Set} thatSet - another set instance
	   * @returns {Array} The difference of this and @param thatSet
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set2 = new <Another Set>
	   * set2.add(2);
	   * set.diff(set2); // [1]
	   */


	  SetInterface.prototype.diff = function diff(thatSet) {
	    var thisKeys = this.entries();
	    var result = [];
	    var thisLen = thisKeys.length;
	    var curElement = void 0;
	    for (var i = 0; i < thisLen; i += 1) {
	      curElement = thisKeys[i];
	      if (!thatSet.has(curElement)) {
	        result.push(curElement);
	      }
	    }
	    return result;
	  };

	  /**
	   * Returns the mathematical set union of 'this' set and
	   * another set
	   * @param {Set} thatSet - another set instance
	   * @returns {Array} An array containing the union of this and @param thatSet
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set2 = new <Another Set>
	   * set2.add(2);
	   * set.union(set2); // [1, 2]
	   */


	  SetInterface.prototype.union = function union(thatSet) {
	    var thatKeys = thatSet.entries();
	    var self = this;
	    var thisKeys = self.entries();
	    var curElement = void 0;
	    var thatLen = thatKeys.length;
	    for (var i = 0; i < thatLen; i += 1) {
	      curElement = thatKeys[i];
	      if (!self.has(curElement)) {
	        thisKeys.push(curElement);
	      }
	    }
	    return thisKeys;
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


	  SetInterface.prototype.has = function has(element) {};

	  /**
	   * Returns all elements in the set
	   * @returns {Array} Array with all elements in the set
	   */


	  SetInterface.prototype.entries = function entries() {};

	  /**
	   * Removes an element from the set
	   * @returns {Set} the instance that this method was called
	   */


	  SetInterface.prototype.remove = function remove(element) {};

	  /**
	   * Returns the mathematical set intersection of 'this' set and
	   * another set
	   * @param {Set} thatSet - another Set instance
	   * @returns {Array} The array containing the set intersection of this and
	   * @param thatSet
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set2 = new Collections.HashSet();
	   * set2.add(2);
	   * set.intersect(set2); // [2]
	   */


	  SetInterface.prototype.intersect = function intersect(thatSet) {
	    var largerSet = void 0,
	        smallerSet = void 0;
	    var self = this;
	    var result = [];
	    if (self.cardinality() > thatSet.cardinality()) {
	      largerSet = self;
	      smallerSet = thatSet.entries();
	    } else {
	      largerSet = thatSet;
	      smallerSet = self.entries();
	    }
	    var smallLen = smallerSet.length;
	    var curElement = void 0;
	    for (var i = 0; i < smallLen; i += 1) {
	      curElement = smallerSet[i];
	      if (largerSet.has(curElement)) {
	        result.push(curElement);
	      }
	    }
	    return result;
	  };

	  /**
	   * Returns the number of elements in the set
	   *
	   * @example
	   * set.add(1);
	   * set.add(2);
	   * set.cardinality() ; // 2
	   */


	  SetInterface.prototype.cardinality = function cardinality() {};

	  return SetInterface;
	}();

	exports["default"] = SetInterface;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _BSTNode = __webpack_require__(12);

	var _BSTNode2 = _interopRequireDefault(_BSTNode);

	var _BSTPrototype = __webpack_require__(13);

	var _Util = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Binary search tree representation
	 * @class
	 * @implements {MapInterface}
	 * @param {function} comparator - @see Global#defaultComp for examples
	 * @example
	 * const bst = new Collections.BST();
	 * // FOR ALL EXAMPLES BELOW. ASSUME bst IS CLEARED BEFORE EACH EXAMPLE
	 */
	var BST = function () {
	  function BST(comparator) {
	    _classCallCheck(this, BST);

	    this.root = new _BSTNode2['default']();
	    this.comparator = comparator || _Util.defaultComparator;
	    this.inserts = 0;
	  }

	  /**
	   * puts the given key and value into the BST
	   * @param {*} [key=null] - The key to insert into the BST
	   * @param {*} [value=null] - The value that is mapped to by @param key
	   * @returns {BST} The instance that this method was called with
	   *
	   * @example
	   * bst.put("ed", "jones").put("george", "james").put("ed", "kane");
	   * // ed now maps to kane because ed already existed before.
	   */


	  BST.prototype.put = function put() {
	    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    var self = this;
	    var inserted = _BSTPrototype.BSTInsert.call(self, key, value, _BSTNode2['default']);
	    if (inserted) {
	      self.inserts += 1;
	    }
	    return self;
	  };

	  /**
	   * Removes the given key and its associated value from the BST
	   * @param {*} key - The key to search fo
	   * @returns {boolean} True if the key existed before and false otherwise
	   *
	   * @example
	   * bst.put(1, 5).put(5, 10);
	   * bst.remove(1); // 1 and it's associated value are removed from BST
	   * bst.remove("dog");// this call fails silently as dog never existed in BST
	   */


	  BST.prototype.remove = function remove(key) {
	    var self = this;
	    var removed = _BSTPrototype.BSTRemove.call(self, key);
	    if (removed) {
	      self.inserts -= 1;
	      return true;
	    }
	    return false;
	  };

	  /**
	   * Finds the value associated with the given key
	   * @param {*} key - The key to search for in the BST
	   * @returns {(*|undefined)} The value associated with @param key or undefined
	   * if not found.
	   *
	   * @example
	   * bst.put(1, 5).put(5, 10);
	   * bst.find(5); // returns 10
	   * bst.find(67); // returns undefined
	   */


	  BST.prototype.getVal = function getVal(key) {
	    var self = this;
	    var node = _BSTPrototype.BSTSearch.call(self, self.root, key);
	    return node ? node.value : undefined;
	  };

	  /**
	   * Determines if the BST contains the given key
	   * @param {*} key - The key to search for
	   * @returns {boolean} True if the BST contains @param key and false otherwise
	   *
	   * @example
	   * bst.put(1, 5).put(5, 10);
	   * bst.contains(5); // returns true
	   * bst.contains(67); // returns false
	   */


	  BST.prototype.contains = function contains(key) {
	    return this.getVal(key) !== undefined;
	  };

	  /**
	   * Gives the inorder traversal of the BST
	   * @returns {Array} Array of objects representing the BST
	   */


	  BST.prototype.inorder = function inorder() {
	    var result = [];
	    (0, _BSTPrototype.BSTInorder)(this.root, result);
	    return result;
	  };

	  /**
	   * Returns the smallest value in the BST according to it's ordering function
	   * @returns {*} The smallest value in the BST
	   */


	  BST.prototype.min = function min() {
	    return (0, _BSTPrototype.minOrMax)('min', this.root);
	  };

	  /**
	   * Returns the greatest value in the tree according to it's ordering function
	   * @returns {*} The greatest value in the BST
	   */


	  BST.prototype.max = function max() {
	    return (0, _BSTPrototype.minOrMax)('max', this.root);
	  };

	  /**
	   * Returns all keys less than the given key in the BST
	   * @param {*} value - The value used as the upper bound
	   * @returns {Array} Array of keys less than @param key
	   */


	  BST.prototype.keysLess = function keysLess(value) {
	    var self = this;
	    var result = [];
	    (0, _BSTPrototype.less)(self.root, value, self.comparator, result);
	    return result;
	  };

	  /**
	   * Returns all keys greater than the given key in the BST
	   * @param {*} value - The value used as the lower bound
	   * @returns {Array} Array of keys greater than @param key
	   */


	  BST.prototype.keysGreater = function keysGreater(value) {
	    var self = this;
	    var result = [];
	    (0, _BSTPrototype.greater)(self.root, value, self.comparator, result);
	    return result;
	  };

	  /**
	   * Empties the BST
	   * @returns {undefined}
	   */


	  BST.prototype.clear = function clear() {
	    this.root = null;
	    this.inserts = 0;
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
	    var result = [];
	    (0, _BSTPrototype.getKeysOrValues)(this.root, 'key', result);
	    return result;
	  };

	  /**
	   * Gives the values in the BST
	   * @returns {Array} The value set
	   */


	  BST.prototype.values = function values() {
	    var result = [];
	    (0, _BSTPrototype.getKeysOrValues)(this.root, 'value', result);
	    return result;
	  };

	  /**
	   * Returns an array of all keys in the given range
	   * @param {*} lower - The lower bound
	   * @param {*} upper - The upper bound
	   * @returns {Array} An array containing the keyRange [lower, upper]
	   */


	  BST.prototype.keyRange = function keyRange(lower, upper) {
	    var self = this;
	    if (lower === undefined || upper === undefined) {
	      throw new TypeError('Both a lower and upper bound are required');
	    }
	    if (self.comparator(lower, upper) !== -1) {
	      throw new RangeError('Lower bound must be strictly less than upper bound');
	    }
	    var res = [];
	    (0, _BSTPrototype.keysBetween)(self.root, lower, upper, self.comparator, res);
	    return res;
	  };

	  return BST;
	}();

	exports['default'] = BST;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BSTNode = function () {
	  function BSTNode(key, value) {
	    _classCallCheck(this, BSTNode);

	    this.parent = null;
	    this.left = null;
	    this.right = null;
	    this.key = key;
	    this.value = value;
	  }

	  BSTNode.prototype.isNil = function isNil() {
	    return this.key === undefined;
	  };

	  BSTNode.prototype.isLeftChild = function isLeftChild() {
	    return this.parent.left === this;
	  };

	  BSTNode.prototype.hasLeftChild = function hasLeftChild() {
	    return this.left.key !== undefined;
	  };

	  BSTNode.prototype.hasRightChild = function hasRightChild() {
	    return this.right.key !== undefined;
	  };

	  BSTNode.prototype.isRightChild = function isRightChild() {
	    return this.parent.right === this;
	  };

	  return BSTNode;
	}();

	exports["default"] = BSTNode;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.BSTInsert = BSTInsert;
	exports.BSTSearch = BSTSearch;
	exports.BSTRemove = BSTRemove;
	exports.BSTInorder = BSTInorder;
	exports.getKeysOrValues = getKeysOrValues;
	exports.less = less;
	exports.greater = greater;
	exports.minOrMax = minOrMax;
	exports.keysBetween = keysBetween;
	/**
	 * Adjusts references for parent and child post insert
	 * @private
	 */
	function adjustParentAndChildrenOfNewNode(newNode, oldRoot, comparator, NodeType) {
	  newNode.parent = oldRoot;
	  if (oldRoot.isNil()) {
	    this.root = newNode;
	  } else if (comparator(newNode.key, oldRoot.key) === -1) {
	    oldRoot.left = newNode;
	  } else {
	    oldRoot.right = newNode;
	  }
	  newNode.left = new NodeType();
	  newNode.right = new NodeType();
	}
	/**
	 * Inserts the given key and value into bst (maps key to value)
	 * @private
	 * @param {*} key - The key to insert into the bst
	 * @param {*} value - The value that is mapped to by @param key
	 * @param {BSTNode} Node - The Node type to insert into the tree
	 * @returns {(BSTNode|undefined)} undefined if the node was already in tree,
	 * thus not inserted or the new node that was just inserted successfully.
	 */
	function BSTInsert(key, value, NodeType) {
	  var comparator = this.comparator;
	  var root = this.root;
	  var newNode = new NodeType(key, value);
	  var oldRoot = new NodeType();
	  while (!root.isNil()) {
	    var comparatorResult = comparator(newNode.key, root.key);
	    oldRoot = root;
	    if (comparatorResult === -1) {
	      root = root.left;
	    } else if (comparatorResult === 1) {
	      root = root.right;
	    } else {
	      root.value = value;
	      return;
	    }
	  }
	  adjustParentAndChildrenOfNewNode.call(this, newNode, oldRoot, comparator, NodeType);
	  return newNode;
	}

	/**
	 * Searches for the given key in tree
	 * @private
	 * @param {BSTNode} root - The root node to start search
	 * @param {*} key - The key to search for in bst
	 * @returns {(undefined|BSTNode)} undefined if not found. Or the actual node if found
	 */
	function BSTSearch(root, key) {
	  var currentRoot = root;
	  var comparator = this.comparator;
	  while (!currentRoot.isNil()) {
	    var comparatorResult = comparator(currentRoot.key, key);
	    if (comparatorResult === 0) {
	      return currentRoot;
	    } else if (comparatorResult === -1) {
	      currentRoot = currentRoot.right;
	    } else {
	      currentRoot = currentRoot.left;
	    }
	  }
	}

	/**
	 * Finds the inorder successor of the given node that has 2 children
	 * @private
	 * @param {BSTNode} node - The Node to find the successor for
	 * @returns {BSTNode} The inorder successor of @param node
	 */
	function successor(node) {
	  var nodeSuccessor = node.right;
	  while (nodeSuccessor.hasLeftChild()) {
	    nodeSuccessor = nodeSuccessor.left;
	  }
	  return nodeSuccessor;
	}

	/**
	 * @private
	 */
	function swapPropsWithSucccessor(nodeSuccessor, node) {
	  if (nodeSuccessor !== node) {
	    node.key = nodeSuccessor.key;
	    node.value = nodeSuccessor.value;
	  }
	}
	/**
	 * Searches for a node with given key and removes it from tree
	 * @private
	 * @param {*} key - The key to search for in the tree
	 * @returns {boolean|BSTNode} Returns false if node doesn't exist with @param key
	 * or the successor and successor child of the node to remove
	 */
	function BSTRemove(key) {
	  var node = BSTSearch.call(this, this.root, key);
	  if (!node) {
	    return false;
	  }
	  var nodeSuccessor = void 0;
	  var successorChild = void 0;
	  if (!node.hasLeftChild() || !node.hasRightChild()) {
	    nodeSuccessor = node;
	  } else {
	    nodeSuccessor = successor(node);
	  }
	  if (nodeSuccessor.hasLeftChild()) {
	    successorChild = nodeSuccessor.left;
	  } else {
	    successorChild = nodeSuccessor.right;
	  }
	  successorChild.parent = nodeSuccessor.parent;
	  if (nodeSuccessor.parent.isNil()) {
	    this.root = successorChild;
	  } else if (nodeSuccessor.isLeftChild()) {
	    nodeSuccessor.parent.left = successorChild;
	  } else {
	    nodeSuccessor.parent.right = successorChild;
	  }
	  swapPropsWithSucccessor(nodeSuccessor, node);
	  return { successorChild: successorChild, nodeSuccessor: nodeSuccessor };
	}

	/**
	 * Gets the inorder traversal starting at given root
	 * @private
	 * @param {BSTNode} root - The root of tree
	 * @param {string} propWanted - The property of each node wanted
	 * @param {Array} array - The Array to be updated with the result
	 * @returns {undefined}
	 */
	function BSTInorder(root, array) {
	  if (root && !root.isNil()) {
	    BSTInorder(root.left, array);
	    array.push(root);
	    BSTInorder(root.right, array);
	  }
	}

	function getKeysOrValues(root, prop, array) {
	  if (root && !root.isNil()) {
	    getKeysOrValues(root.left, prop, array);
	    array.push(root[prop]);
	    getKeysOrValues(root.right, prop, array);
	  }
	}

	/**
	 * Returns all keys less than the given value
	 * @private
	 * @param {BSTNode} root - The root of the tree
	 * @param {*} key - The upper bound value
	 * @param {function} comparator - The function used to compare keys to @param value
	 * @param {Array} array - The array that holds the result
	 * @returns {undefined}
	 */
	function less(root, value, comparator, array) {
	  if (!root || root.isNil()) {
	    return;
	  }
	  var rootKey = root.key;
	  var comparatorResult = comparator(rootKey, value);
	  if (comparatorResult === -1) {
	    array.push(rootKey);
	    less(root.left, value, comparator, array);
	    return less(root.right, value, comparator, array);
	  }
	  return less(root.left, value, comparator, array);
	}

	/**
	 * Returns all keys greater than the given value
	 * @private
	 * @param {BSTNode} root - The root of the tree
	 * @param {*} key - The lower bound value
	 * @param {function} comparator - The function used to compare keys to @param value
	 * @param {Array} array - The array that holds the result
	 * @returns {undefined}
	 */
	function greater(root, value, comparator, array) {
	  if (!root || root.isNil()) {
	    return;
	  }
	  var rootKey = root.key;
	  var comparatorResult = comparator(rootKey, value);
	  if (comparatorResult === 1) {
	    array.push(rootKey);
	    greater(root.left, value, comparator, array);
	    return greater(root.right, value, comparator, array);
	  }
	  return greater(root.right, value, comparator, array);
	}

	/**
	 * Returns the max or min based on the given query
	 * @private
	 * @param {string} query - The value wanted either min or max
	 * @param {BSTNode} root - The root of the tree
	 * @returns {*|undefined} The min or max value in the tree or undefined for empty tree
	 */
	function minOrMax(query, root) {
	  var currentRoot = root;
	  var direction = query === 'min' ? 'left' : 'right';
	  if (currentRoot.isNil()) {
	    return;
	  }
	  while (currentRoot[direction].key !== undefined) {
	    currentRoot = currentRoot[direction];
	  }
	  return currentRoot.key;
	}

	/**
	 * Returns all keys in the given range
	 * @private
	 * @param {BSTNode} root - The root of the tree
	 * @param {*} lower - The lower bound
	 * @param {*} upper - The upper bound
	 * @param {function} comparator - The compare function
	 * @param {Array} array - The result array
	 * @returns {undefined}
	 */
	function keysBetween(root, lower, upper, comparator, array) {
	  if (!root || root.isNil()) {
	    return;
	  }
	  var rootKey = root.key;
	  var lowerRootComp = comparator(lower, rootKey);
	  if (lowerRootComp >= 0) {
	    if (lowerRootComp === 0) {
	      array.push(rootKey);
	    }
	    return keysBetween(root.right, lower, upper, comparator, array);
	  }
	  if (comparator(rootKey, upper) <= 0) {
	    array.push(rootKey);
	  }
	  keysBetween(root.left, lower, upper, comparator, array);
	  return keysBetween(root.right, lower, upper, comparator, array);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Queue = __webpack_require__(4);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _Stack = __webpack_require__(3);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _MultiMap = __webpack_require__(15);

	var _MultiMap2 = _interopRequireDefault(_MultiMap);

	var _Set = __webpack_require__(17);

	var _Set2 = _interopRequireDefault(_Set);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @private
	 */
	function getAddAndRemovalMethods(context, BFS) {
	  var queuePrototype = _Queue2['default'].prototype;
	  var stackPrototype = _Stack2['default'].prototype;
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
	  var neighborLen = neighborList.length;
	  for (var i = 0; i < neighborLen; i += 1) {
	    var curNeighbor = neighborList[i].vertex;
	    if (!visited.has(curNeighbor)) {
	      add(curNeighbor);
	    }
	  }
	}

	/**
	 * @private
	 */
	function FirstSearch(startingVertex, structure, BFS) {
	  var _getAddAndRemovalMeth = getAddAndRemovalMethods(structure, BFS),
	      add = _getAddAndRemovalMeth.add,
	      remove = _getAddAndRemovalMeth.remove;

	  var res = [];
	  var visited = new _Set2['default']();
	  add(startingVertex);
	  while (structure.size() !== 0) {
	    var currentVertex = remove();

	    if (!visited.has(currentVertex)) {
	      visited.add(currentVertex);
	      res.push(currentVertex);
	      var currentVertexNeighbors = this.getNeighbors(currentVertex);
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

	var Graph = function () {
	  function Graph() {
	    _classCallCheck(this, Graph);

	    this.graph = new _MultiMap2['default']();
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

	    if (!graph.contains(vertex)) {
	      graph.put(vertex, []);
	    }
	  };

	  /**
	   * Get verticies
	   */


	  Graph.prototype.getVerticies = function getVerticies() {
	    return this.graph.keys();
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


	  Graph.prototype.addEdge = function addEdge(vertex1, vertex2, weight) {
	    // TODO: replace with PQ for Prim's
	    var v1neighbors = this.getNeighbors(vertex1);
	    var v2neighbors = this.getNeighbors(vertex2);
	    // they both exist as verticies
	    if (v1neighbors && v2neighbors) {
	      // make sure edge does not already exist
	      if (!v1neighbors.find(function (v) {
	        return v === vertex2;
	      })) {
	        v1neighbors.push({ vertex: vertex2, weight: weight });
	      }
	    }
	  };

	  /**
	   * Returns an array containing the fiven vertex's neighbors
	   * @param {number|string} vertex - The vertex id to search for
	   * @returns {Array} The vertex's neighbors
	   */


	  Graph.prototype.getNeighbors = function getNeighbors(vertex) {
	    return this.graph.getVal(vertex);
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
	    return FirstSearch.call(this, startingVertex, new _Queue2['default'](), true);
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
	    return FirstSearch.call(this, startingVertex, new _Stack2['default'](), false);
	  };

	  /**
	   * Reports whether the graph is connected
	   * @returns {boolean} True if connected and false otherwise
	   */


	  Graph.prototype.isConnected = function isConnected() {
	    var graph = this.graph;
	    var verticies = graph.keys();
	    var firstKey = verticies[0];
	    return this.BFS(firstKey).length === verticies.length;
	  };

	  return Graph;
	}();

	exports['default'] = Graph;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _RedBlackTree = __webpack_require__(16);

	var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : _defaults(subClass, superClass); }

	/**
	 * MultiMap representation
	 * @class
	 * @implements {MultiMapInterface}
	 * @extends {RBTree}
	 */
	var MultiMap = function (_RBTree) {
	  _inherits(MultiMap, _RBTree);

	  function MultiMap(comparator) {
	    _classCallCheck(this, MultiMap);

	    return _possibleConstructorReturn(this, _RBTree.call(this, comparator));
	  }

	  MultiMap.prototype.put = function put(key, value) {
	    var foundValues = _RBTree.prototype.getVal.call(this, key);
	    if (foundValues) {
	      if (foundValues.indexOf(value) === -1) {
	        foundValues.push(value);
	      }
	    } else if (Array.isArray(value)) {
	      _RBTree.prototype.put.call(this, key, value);
	    } else {
	      _RBTree.prototype.put.call(this, key, [value]);
	    }
	    return this;
	  };

	  MultiMap.prototype.removeVal = function removeVal(key, value) {
	    var foundValues = _RBTree.prototype.getVal.call(this, key);
	    var removedValue = [];
	    if (foundValues && foundValues.length > 0) {
	      var indexOfValue = foundValues.indexOf(value);
	      if (indexOfValue !== -1) {
	        removedValue = foundValues.splice(indexOfValue, 1);
	      }
	    }
	    return removedValue;
	  };

	  MultiMap.prototype.containsEntry = function containsEntry(key, value) {
	    var foundValues = _RBTree.prototype.getVal.call(this, key);
	    if (foundValues && foundValues.length > 0) {
	      return foundValues.indexOf(value) !== -1;
	    }
	    return false;
	  };

	  MultiMap.prototype.replaceVal = function replaceVal(key, oldValue, newValue) {
	    var foundValues = _RBTree.prototype.getVal.call(this, key);
	    if (foundValues && foundValues.length > 0) {
	      var index = foundValues.indexOf(oldValue);
	      if (index !== -1) {
	        return foundValues.splice(index, 1, newValue);
	      }
	    }
	    return [];
	  };

	  return MultiMap;
	}(_RedBlackTree2['default']);

	exports['default'] = MultiMap;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _BSTNode2 = __webpack_require__(12);

	var _BSTNode3 = _interopRequireDefault(_BSTNode2);

	var _BSTPrototype = __webpack_require__(13);

	var _BST2 = __webpack_require__(11);

	var _BST3 = _interopRequireDefault(_BST2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : _defaults(subClass, superClass); }

	var BLACK = 'black';
	var RED = 'red';

	var RBNode = function (_BSTNode) {
	  _inherits(RBNode, _BSTNode);

	  function RBNode(key, value) {
	    _classCallCheck(this, RBNode);

	    var _this = _possibleConstructorReturn(this, _BSTNode.call(this, key, value));

	    _this.color = BLACK;
	    return _this;
	  }

	  RBNode.prototype.isRed = function isRed() {
	    return this.color === RED;
	  };

	  RBNode.prototype.isBlack = function isBlack() {
	    return this.color === BLACK;
	  };

	  RBNode.prototype.colorRed = function colorRed() {
	    this.color = RED;
	  };

	  RBNode.prototype.colorBlack = function colorBlack() {
	    this.color = BLACK;
	  };

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
	  if (nodeParent.isNil()) {
	    this.root = oldRight;
	  } else if (node.isLeftChild()) {
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
	  if (nodeParent.isNil()) {
	    this.root = oldLeft;
	  } else if (node.isLeftChild()) {
	    nodeParent.left = oldLeft;
	  } else {
	    nodeParent.right = oldLeft;
	  }
	  oldLeft.right = node;
	  node.parent = oldLeft;
	}

	/**
	 * Performs the re coloring stage upon insert, based on uncle color
	 * @private
	 * @param {RBNode} uncle - The uncle of the current node
	 * @param {RBNode} currentNode - The current node being fixed in the tree
	 * @returns {undefined}
	 */
	function insertFixRecolor(uncle, currentNode) {
	  currentNode.parent.colorBlack();
	  uncle.colorBlack();
	  currentNode.parent.parent.colorRed();
	}

	/**
	 * @private
	 * Performs the rotation stage on insert, based on uncle color and if current
	 * right child
	 * @param {RBNode} currentNode - The current node being fixed in the tree
	 * @param {RBNode} context - The RBTree instance
	 * @returns {undefined}
	 */
	function insertFixRotate1(node, context) {
	  var currentNode = node;
	  if (currentNode.isRightChild()) {
	    currentNode = currentNode.parent;
	    leftRotate.call(context, currentNode);
	  }
	  currentNode.parent.colorBlack();
	  currentNode.parent.parent.colorRed();
	  rightRotate.call(context, currentNode.parent.parent);
	}

	/**
	 * @private
	 * Performs the rotation stage on insert, based on uncle color and if current
	 * node is left child
	 * @param {RBNode} currentNode - The current node being fixed in the tree
	 * @param {RBNode} context - The RBTree instance
	 * @returns {undefined}
	 */
	function insertFixRotate2(node, context) {
	  var currentNode = node;
	  if (currentNode.isLeftChild()) {
	    currentNode = currentNode.parent;
	    rightRotate.call(context, currentNode);
	  }
	  currentNode.parent.colorBlack();
	  currentNode.parent.parent.colorRed();
	  leftRotate.call(context, currentNode.parent.parent);
	}

	/**
	 * Performs the recoloring stage when the node's sibling is red
	 * @private
	 */
	function deleteRedSiblingCaseRecolor(currentNode, sibling) {
	  sibling.colorBlack();
	  currentNode.parent.colorRed();
	}

	/**
	 * Fixes up the rb tree after insertion
	 * @private
	 * @param {BSTNode} node - The node to begin fixing
	 * @returns {undefined}
	 */
	function insertFix(nodeToFix) {
	  var currentNode = nodeToFix;
	  var context = this;
	  var uncle = void 0;
	  while (currentNode.parent.isRed()) {
	    if (currentNode.parent.isLeftChild()) {
	      uncle = currentNode.parent.parent.right;
	      if (uncle.isRed()) {
	        insertFixRecolor(uncle, currentNode);
	        currentNode = currentNode.parent.parent;
	      } else {
	        insertFixRotate1(currentNode, context);
	      }
	    } else {
	      uncle = currentNode.parent.parent.left;
	      if (uncle.isRed()) {
	        insertFixRecolor(uncle, currentNode);
	        currentNode = currentNode.parent.parent;
	      } else {
	        insertFixRotate2(currentNode, context);
	      }
	    }
	  }
	  context.root.colorBlack();
	}

	/**
	 * Fixes up the rb tree after deletion
	 * @private
	 * @param {BSTNode} node - The node to begin fixing
	 * @returns {undefined}
	 */
	function deletefixUp(nodeToFix) {
	  var currentNode = nodeToFix;
	  var context = this;
	  while (!currentNode.parent.isNil() && currentNode.isBlack()) {
	    var sibling = void 0;
	    if (currentNode.isLeftChild()) {
	      sibling = currentNode.parent.right;
	      if (sibling.isRed()) {
	        deleteRedSiblingCaseRecolor(currentNode, sibling);
	        leftRotate.call(context, currentNode.parent);
	        sibling = currentNode.parent.right;
	      }
	      if (sibling.left.isBlack() && sibling.right.isBlack()) {
	        sibling.colorRed();
	        currentNode = currentNode.parent;
	      } else {
	        if (sibling.right.isBlack()) {
	          sibling.left.colorBlack();
	          sibling.colorRed();
	          rightRotate.call(context, sibling);
	          sibling = currentNode.parent.right;
	        }
	        sibling.color = currentNode.parent.color;
	        currentNode.parent.colorBlack();
	        sibling.right.colorBlack();
	        leftRotate.call(context, currentNode.parent);
	        currentNode = context.root;
	      }
	    } else {
	      sibling = currentNode.parent.left;
	      if (sibling.isRed()) {
	        deleteRedSiblingCaseRecolor(currentNode, sibling);
	        rightRotate.call(context, currentNode.parent);
	        sibling = currentNode.parent.left;
	      }
	      if (sibling.right.isBlack() && sibling.left.isBlack()) {
	        sibling.colorRed();
	        currentNode = currentNode.parent;
	      } else {
	        if (sibling.left.isBlack()) {
	          sibling.right.colorBlack();
	          sibling.colorRed();
	          leftRotate.call(context, sibling);
	          sibling = currentNode.parent.left;
	        }
	        sibling.color = currentNode.parent.color;
	        currentNode.parent.colorBlack();
	        sibling.left.color = BLACK;
	        rightRotate.call(context, currentNode.parent);
	        currentNode = context.root;
	      }
	    }
	  }
	  currentNode.colorBlack();
	}

	/**
	 * Red-Black Tree representation
	 * @class
	 * @extends {BST}
	 * @param {function} comparator - @see Global#defaultComp for examples
	 * @example
	 * const bst = new Collections.RBTree();
	 */

	var RBTree = function (_BST) {
	  _inherits(RBTree, _BST);

	  function RBTree(comparator) {
	    _classCallCheck(this, RBTree);

	    var _this2 = _possibleConstructorReturn(this, _BST.call(this, comparator));

	    _this2.root = new RBNode();
	    return _this2;
	  }

	  RBTree.prototype.put = function put(key, value) {
	    var self = this;
	    var insertedNode = _BSTPrototype.BSTInsert.call(self, key, value, RBNode);
	    if (insertedNode) {
	      insertedNode.colorRed();
	      insertFix.call(self, insertedNode);
	      self.inserts += 1;
	    }
	    return self;
	  };

	  RBTree.prototype.remove = function remove(key) {
	    var self = this;
	    // successor and child
	    var didRemove = _BSTPrototype.BSTRemove.call(self, key);
	    if (didRemove) {
	      var successorChild = didRemove.successorChild,
	          nodeSuccessor = didRemove.nodeSuccessor;

	      if (nodeSuccessor.isBlack()) {
	        deletefixUp.call(self, successorChild);
	      }
	      self.inserts -= 1;
	      return true;
	    }
	    return false;
	  };

	  return RBTree;
	}(_BST3['default']);

	exports['default'] = RBTree;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _SetInterface2 = __webpack_require__(10);

	var _SetInterface3 = _interopRequireDefault(_SetInterface2);

	var _RedBlackTree = __webpack_require__(16);

	var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : _defaults(subClass, superClass); }

	/**
	 * Set representaion
	 * @class
	 * @implements {SetInterface}
	 * @param {function} comparator - @see Global#defaultComparator
	 *
	 * @example
	 * const set = new Collections.Set();
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
	    this.set.put(element, 1);
	    return this;
	  };

	  Set.prototype.has = function has(element) {
	    return this.set.contains(element);
	  };

	  Set.prototype.remove = function remove(element) {
	    return this.set.remove(element);
	  };

	  Set.prototype.entries = function entries() {
	    return this.set.keys();
	  };

	  Set.prototype.cardinality = function cardinality() {
	    return this.set.size();
	  };

	  Set.prototype.min = function min() {
	    return this.map.min();
	  };

	  Set.prototype.max = function max() {
	    return this.map.max();
	  };

	  Set.prototype.union = function union(thatSet) {
	    return _SetInterface.prototype.union.call(this, thatSet);
	  };

	  Set.prototype.intersect = function intersect(thatSet) {
	    return _SetInterface.prototype.intersect.call(this, thatSet);
	  };

	  Set.prototype.diff = function diff(thatSet) {
	    return _SetInterface.prototype.diff.call(this, thatSet);
	  };

	  return Set;
	}(_SetInterface3['default']);

	exports['default'] = Set;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

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
	 * Nodes for Trie
	 * @class
	 * @private
	 */

	var TrieNode = function () {
	  function TrieNode() {
	    _classCallCheck(this, TrieNode);

	    this.children = {};
	    this.endOfWord = false;
	    this.word = null;
	  }

	  TrieNode.prototype.hasChildren = function hasChildren() {
	    /**
	     *Using this instead of Object.keys because I only need existence of one child
	     *not all
	     */
	    var children = this.children;
	    // eslint-disable-next-line no-restricted-syntax

	    for (var prop in children) {
	      if (Object.prototype.hasOwnProperty.call(children, prop)) {
	        return true;
	      }
	    }
	    return false;
	  };

	  return TrieNode;
	}();

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
	    var foundNode = getNode(this.root, word);
	    if (foundNode) {
	      var lastChar = word.charAt(word.length - 1);
	      if (foundNode[lastChar] && foundNode[lastChar].word === word) {
	        return true;
	      }
	    }
	    return false;
	  };

	  /*
	  * Reports whether the trie contains the given prefix
	  * @param {string} prefix - The prefix string
	  * @returns {boolean} True or false if prefix does not exist
	  *
	  * @example
	  * trie.addWord("apple");
	  * trie.addWord.("app");
	  * trie.containsPrefix("apple"); // false
	  * trie.containsPrefix("app"); // true
	  */


	  Trie.prototype.containsPrefix = function containsPrefix() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    var root = this.root;
	    var str = toLowerCaseString(prefix);
	    var foundNode = getNode(root, str);
	    if (foundNode) {
	      var lastChar = str.charAt(str.length - 1);
	      if (foundNode[lastChar]) {
	        return foundNode[lastChar].hasChildren();
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

	exports['default'] = Trie;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Util = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Various utility methods that can be used on arrays
	 * @class
	 * @static
	 *
	 * @example
	 * const arrayMethods = Collections.ArrayUtils;
	 */
	var ArrayUtils = function () {
	  // eslint-disable-next-line no-empty-function
	  function ArrayUtils() {
	    _classCallCheck(this, ArrayUtils);
	  }

	  /**
	   * Removes the element at the given position in the given array
	   * @static
	   * @param {Array} array - The array to remove elements from
	   * @param {number} [index=0] - The index to remove from @param array
	   * @returns {Array} Array of removed elements
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * let removedItems = arrayMethods.remove(myArray, 1);
	   * // removedItems contains [2] and myArray is [1, 3, 4]
	   */


	  ArrayUtils.remove = function remove() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    return index >= 0 ? array.splice(index, 1) : [];
	  };

	  /**
	   * Removes the first occurence of the given value from the array
	   * @static
	   * @param {Array} array - The array to remove elements from
	   * @param {function} predicate - The function used to compare values
	   * @returns {Array} Array of removed elements
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * let removedItems = arrayMethods.removeElement(myArray, 3);
	   * // changedArray contains [3] and myArray is [1, 2, 4]
	   */


	  ArrayUtils.removeElement = function removeElement() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var predicate = arguments[1];

	    var indexToRemove = ArrayUtils.findIndex(array, predicate);
	    return ArrayUtils.remove(array, indexToRemove);
	  };

	  /**
	   * Rotates the given array left(negative number) or right(positive number)
	   * @static
	   * @param {Array} array - The array to rotate
	   * @param {number} [times=0] - The number of times to rotate @param array
	   * @throws {TypeError} If @param times is not a primitive number
	   * @returns {Array} A new Array with rotations applied
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * let B = arrayMethods.rotate(myArray, 2);
	   * // myArray is [1, 2, 3, 4]
	   * // B is [3, 4, 1, 2]
	   * B = arrayMethods.rotate(B, -2);
	   * // B is back to original positioning of myArray [1, 2, 3, 4]
	   */


	  ArrayUtils.rotate = function rotate() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    var len = array.length;
	    if (times > 0) {
	      var upperBound = len - times;
	      return array.slice(upperBound).concat(array.slice(0, upperBound));
	    }
	    var timesToPositiveInt = Math.abs(times);
	    return array.slice(timesToPositiveInt).concat(array.slice(0, timesToPositiveInt));
	  };

	  /**
	   * Removes the last element from the given array
	   * @static
	   * @param {Array} array - The array to pop
	   * @param {number} [times=0] - The number of times to pop @param array
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

	    var upperBound = array.length - times;
	    return upperBound > 0 ? array.slice(0, upperBound) : [];
	  };

	  /**
	   * Adds elements to the end of the given array
	   * @static
	   * @param {Array} [array=empty array] - The array to push elements into
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

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return array.concat(args);
	  };

	  /**
	   * Removes the first element from the given array
	   * @static
	   * @param {Array} array - The array to shift
	   * @param {number} [times=0] - The number of times to shift @param array
	   * @returns {Array} A new array equal to
	   * [@param array - shifted elements]
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * const altered = arrayMethods.shiftMany(myArray, 3);
	   * // myArray is [1, 2, 3, 4] ; altered is [4]
	   */


	  ArrayUtils.shiftMany = function shiftMany() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    return times > 0 ? array.slice(times) : array;
	  };

	  /**
	   * Adds elements to the front of the given array
	   * @static
	   * @param {Array} [array=empty array] - The array to add elements into
	   * @param {*} args - Consecutive arguments to push into array
	   * @returns {Array} A new array equal to
	   * [unshifted elements + @param array ]
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * const altered = arrayMethods.unshiftMany(myArray, "hi");
	   * // myArray is [1, 2, 3, 4] ; altered is ["hi", 1, 2, 3, 4]
	   */


	  ArrayUtils.unshiftMany = function unshiftMany() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    return args.concat(array);
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

	    var randomIndex = (0, _Util.generateRandomInt)(array.length);
	    return array[randomIndex];
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

	    var randomIndex = (0, _Util.generateRandomInt)(array.length);
	    return ArrayUtils.remove(array, randomIndex);
	  };

	  /**
	   * Shuffles the given array
	   * @static
	   * @param {Array} array - The array to shuffle
	   * @returns {undefined}
	   */


	  ArrayUtils.shuffle = function shuffle() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    var i = array.length - 1;
	    while (i > 0) {
	      var randomIndex = (0, _Util.generateRandomInt)(i + 1);
	      (0, _Util.swap)(array, randomIndex, i);
	      i -= 1;
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
	    var res = [];
	    (0, _Util.flat)(array, res);
	    return res;
	  };

	  /**
	   * Splits the given array into chunks
	   * @param {Array} array - The array to chunk
	   * @param {number} [bits=0] - The size of each nested array
	   * @throws {TypeError} If @param bits is not a primitive number
	   * @returns {Array} A new array split into @param bits
	   *
	   * @example
	   * const myArray = [1, 2, 3, 4];
	   * const altered = arrayMethods.chunk(myArray, 2);
	   * // altered is [[1, 2], [3, 4]] ; myArray is unchanged
	   */


	  ArrayUtils.chunk = function chunk() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var bits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    var newArr = [];
	    if (bits <= 0) {
	      return newArr;
	    }
	    for (var i = 0, len = array.length; i < len; i += bits) {
	      var newChunk = array.slice(i, i + bits);
	      newArr.push(newChunk);
	    }
	    return newArr;
	  };

	  /**
	   * Finds the first occurrence in the given array where a given callback evaluates to truthy
	   * @param {Array} array - The array to search through
	   * @param {function(curElement, index)} callback - The function used to evaluate each element
	   * @returns {number|undefined} The element @callback is truthy or undefined if none passed
	   */


	  ArrayUtils.find = function find(array, callback) {
	    var len = array.length;
	    var index = 0;
	    while (index < len) {
	      var data = array[index];
	      if (callback(data, index)) {
	        return data;
	      }
	      index += 1;
	    }
	  };

	  /**
	   * Finds the index in the given array that passes the given testing function
	   * @param {Array} array - The array to search through
	   * @param {function(curElement, index)} callback - The function used to evaluate each element
	   * @returns {number} The index where @callback is truthy or -1 if none passed
	   */


	  ArrayUtils.findIndex = function findIndex(array, callback) {
	    var len = array.length;
	    var index = 0;
	    while (index < len) {
	      if (callback(array[index], index)) {
	        return index;
	      }
	      index += 1;
	    }
	    return -1;
	  };

	  /**
	   * Returns a new array with elements that give non-truthy values for the given testing function
	   * @param {Array} array - The array to filter
	   * @param {function(curElement, index)} callback - The function used to evaluate each element
	   * @returns {Array} A new Array filled wit only elements that did not pass the test
	   */


	  ArrayUtils.filterNot = function filterNot(array, callback) {
	    var len = array.length;
	    var res = [];
	    var index = 0;
	    while (index < len) {
	      var data = array[index];
	      if (!callback(data, index)) {
	        res.push(data);
	      }
	      index += 1;
	    }
	    return res;
	  };

	  /**
	   * Returns a new Array with elements mapped only if they pass a testing function first
	   * @param {Array} array - The array to map to another array
	   * @param {function(curElement, index)} test - The testing function
	   * @param {function(curElement, index)} mapper - The mappping function
	   * @return {Array} A new Array with mapped elements that pass the @param test
	   */


	  ArrayUtils.mapIf = function mapIf(array, test, mapper) {
	    var len = array.length;
	    var index = 0;
	    var res = [];
	    while (index < len) {
	      var data = array[index];
	      if (test(data, index)) {
	        var mappedElement = mapper(data, index);
	        res.push(mappedElement);
	      }
	      index += 1;
	    }
	    return res;
	  };

	  return ArrayUtils;
	}();

	exports['default'] = ArrayUtils;

/***/ }
/******/ ])
});
;