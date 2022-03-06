class MaxHeap {
    // this is the structure of each node in the tree
    /* Node = {
        data: '',
        frequency: ''
    } */
    #heapSize;
    #A;
    constructor() {
        this.#heapSize = 0;
        this.#A = []; // A is an array of Node
    }

    
    isEmpty() {
        return this.#heapSize === 0;
    }

    #left(i) {
        return 2 * i + 1;
    }
    #right(i) {
        return 2 * i + 2;
    }
    #parent(i) {
        return Math.ceil(i/2) - 1;
    }

    #maxHeapify(i) {
        let leftIndex = this.#left(i);
        let rightIndex = this.#right(i);
        let largest;
        if (leftIndex < this.#heapSize && this.#A[i].frequency < this.#A[leftIndex].frequency) {
            largest = leftIndex
        } else {
            largest = i;
        }
        if(rightIndex < this.#heapSize && this.#A[largest].frequency < this.#A[rightIndex].frequency) {
            largest = rightIndex;
        }
        if (largest != i) {
            this.#swap(i, largest);
            this.#maxHeapify(largest)
        }
    }

    /*
    * We don't use this here in this solution because we insert as we go.
    */
    #builldMaxHeap() {
        this.#heapSize = this.#A.length;
        for(let i = this.#A.length/2 ; i >=0; i--) {
            this.#maxHeapify(i);
        }
    }

    #findIndex(data) {
        return this.#A ? this.#A.map(x => x.data).indexOf(data) : -1;
    }

    #increaseKey(node, newKey) {
        if(node.frequency > newKey) {
            // error
        } else {
            node.frequency = newKey;
            let index = this.#findIndex(node.data);
            let parentIndex = this.#parent(index);
            while(parentIndex >=0 && this.#A[index].frequency > this.#A[parentIndex].frequency ) {
                this.#swap(parentIndex, index);
                index = parentIndex;
                parentIndex = this.#parent(index);
            }
        }
    }

    /*
    * public method that is exposed.
    * it performs insertOrIncreaseKey
    * If string exists, it increases key otherwise it would create a new node
    */
    insert(data) {
        const index = this.#findIndex(data);
        if (index > -1) {
            this.#increaseKey(this.#A[index], this.#A[index].frequency + 1);
        } else {
            this.#insert(data);
        }
    }

    #insert(data) {
        const node = {
            data: data,
            frequency: -1
        }
        this.#heapSize ++;
        this.#A.push(node); // adds it to the end of the array
        this.#increaseKey(node, 1);
    }

    #extractMax() {
        const result = this.#A[0];
        this.#heapSize = this.#heapSize - 1;
        this.#swap(0, this.#heapSize);
        this.#maxHeapify(0);
        return result;
    }

    heapSort() {
        const result = [];
        while(this.#heapSize > 0) {
            result.push(this.#extractMax());
        }
        return result;
    }

    #swap(a, b) {
        const temp = this.#A[b];
        this.#A[b] = this.#A[a];
        this.#A[a] = temp;
    }
}

module.exports = MaxHeap;