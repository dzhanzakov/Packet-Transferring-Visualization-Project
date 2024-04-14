// Priority queue implementation using a min-heap
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    // Function to swap two elements in the heap
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    // Function to get the parent index of a given index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Function to enqueue an element with a priority
    enqueue(element, priority) {
        this.heap.push({ element, priority });
        this.heapifyUp();
    }

    // Function to maintain the heap property upwards
    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    // Function to dequeue the element with the highest priority (minimum priority)
    dequeue() {
        if (this.isEmpty()) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    // Function to maintain the heap property downwards
    heapifyDown() {
        let currentIndex = 0;
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let nextIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[nextIndex].priority) {
                nextIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[nextIndex].priority) {
                nextIndex = rightChildIndex;
            }
            if (nextIndex !== currentIndex) {
                this.swap(currentIndex, nextIndex);
                currentIndex = nextIndex;
            } else {
                break;
            }
        }
    }

    // Function to check if the priority queue is empty
    isEmpty() {
        return this.heap.length === 0;
    }
}

export default PriorityQueue;
