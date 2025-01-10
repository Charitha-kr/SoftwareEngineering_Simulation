import java.util.ArrayList;

public class PowerOfTwoMaxHeap {
    private ArrayList<Integer> heap;
    private int numChildren;

    // Constructor to initialize the heap with a specified number of children per parent
    public PowerOfTwoMaxHeap(int x) {
        this.heap = new ArrayList<>();
        this.numChildren = (int) Math.pow(2, x);
    }

    // Method to insert a new value into the heap
    public void insert(int value) {
        heap.add(value); // Add the new value to the end of the heap
        siftUp(heap.size() - 1); // Restore the heap property
    }

    // Method to remove and return the maximum value from the heap
    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        int maxValue = heap.get(0); // The root contains the maximum value
        int lastIndex = heap.size() - 1;
        heap.set(0, heap.get(lastIndex)); // Move the last element to the root
        heap.remove(lastIndex); // Remove the last element
        siftDown(0); // Restore the heap property
        return maxValue;
    }

    // Helper method to restore the heap property by sifting up
    private void siftUp(int index) {
        int parentIndex = (index - 1) / numChildren;
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            swap(index, parentIndex);
            index = parentIndex;
            parentIndex = (index - 1) / numChildren;
        }
    }

    // Helper method to restore the heap property by sifting down
    private void siftDown(int index) {
        int size = heap.size();
        int largest = index;

        for (int i = 1; i <= numChildren; i++) {
            int childIndex = numChildren * index + i;
            if (childIndex < size && heap.get(childIndex) > heap.get(largest)) {
                largest = childIndex;
            }
        }

        if (largest != index) {
            swap(index, largest);
            siftDown(largest);
        }
    }

    // Helper method to swap two elements in the heap
    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    // Method to get the current size of the heap
    public int size() {
        return heap.size();
    }
}
