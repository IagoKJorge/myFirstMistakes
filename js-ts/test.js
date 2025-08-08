class Stack {
    constructor() {
      this.queue1 = new Queue();
    }
    push(val) {
      this.queue1.enqueue(val);
      return this;
    }
    pop() {
      
      let queue2 = new Queue();
      let temp;
      while (this.queue1.first.next) {
        queue2.enqueue(this.queue1.dequeue());
      }

      temp = this.queue1.dequeue();

      this.queue1 = queue2;

      return temp;
    }
}

// QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(data) {
        var node = new Node(data);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }

        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}
