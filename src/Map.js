
import MapInterface from "./MapInterface.js";
import RBTree from "./RedBlackTree.js";

class Map extends MapInterface {
  constructor() {
    this.map = new RBTree();  
  }
  
   put(key, value) {
    return this.map.insert(key, value);
  }
  
  getVal(key) {
    return this.map.find(key);
  }
  
  remove(key) {
    return this.map.remove(key);
  }
  
  keys() {
    // preorder traversal or post order
    return 1;
  }
  
  contains(key) {
    return this.map.contains(key);
  }
  
  size() {
    return 0;
  }
 
}
