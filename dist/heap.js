var BinaryHeap = function (customCompare) {
  this.list = [];
  if (customCompare) {
    this.compare = customCompare;
  }
};

BinaryHeap.prototype.extractMinimum = function () {
  if (!this.list.length) {
    return undefined;
  }
  if (this.list.length === 1) {
    return this.list.shift();
  }
  var min = this.list[0];
  this.list[0] = this.list.pop();
  heapify(this, 0);
  return min;
};

BinaryHeap.prototype.insert = function (key, value) {
  var i = this.list.length;
  var node = new Node(key, value);
  this.list.push(node);
  var parent = getParent(i);
  while (typeof parent !== 'undefined' &&
      this.compare(this.list[i], this.list[parent]) < 0) {
    swap(this.list, i, parent);
    i = parent;
    parent = getParent(i);
  }
  return node;
};

BinaryHeap.prototype.compare = function (a, b) {
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
};

function heapify(heap, i) {
  var l = getLeft(i);
  var r = getRight(i);
  var smallest = i;
  if (l < heap.list.length &&
      heap.compare(heap.list[l], heap.list[i]) < 0) {
    smallest = l;
  }
  if (r < heap.list.length &&
      heap.compare(heap.list[r], heap.list[smallest]) < 0) {
    smallest = r;
  }
  if (smallest !== i) {
    swap(heap.list, i, smallest);
    heapify(heap, smallest);
  }
}

function swap(array, a, b) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function getParent(i) {
  if (i === 0) {
    return undefined;
  }
  return Math.floor((i - 1) / 2);
}

function getLeft(i) {
  return 2 * i + 1;
}

function getRight(i) {
  return 2 * i + 2;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
}
BinaryHeap.prototype.decreaseKey = function(key,value){
  this.insert(key,value)
}
