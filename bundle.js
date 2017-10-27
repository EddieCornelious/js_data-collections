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

	module.exports = { List: List };

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

	function ListIterator() {
	  var list = this.head;
	  var iterator = {};

	  iterator.next = function next() {
	    if (this.hasNext()) {
	      var data = list.next.data;
	      return data;
	    }
	    this.reset();
	  };

	  iterator.prev = function prev() {
	    if (this.hasPrev()) {
	      var data = list.prev.data;
	      return data;
	    }
	    this.reset();
	  };

	  iterator.hasNext = function hasNext() {
	    return list && list.next !== null;
	  };

	  iterator.hasPrev = function hasPrev() {
	    return list && list.prev !== null;
	  };

	  iterator.reset = function reset() {
	    list = this.head;
	  };
	  return iterator;
	}
	// TODO: add the below functions to prototype of base classes

	function isNumber(obj) {
	  if (typeof obj !== 'number') {
	    throw new TypeError('Invalid index must be of typ number');
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
	    this.iterator = ListIterator.call(this);
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

/***/ }
/******/ ])
});
;