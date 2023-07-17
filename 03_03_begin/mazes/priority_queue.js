// Un tas binaire (binary heap en anglais) est une structure de données en forme d'arbre binaire qui satisfait la propriété du tas. Il est souvent utilisé pour implémenter une file de priorité, car il permet une insertion et une suppression efficaces des éléments tout en maintenant l'élément de plus haute priorité enraciné en haut de l'arbre.

// Un tas binaire peut être de deux types :
// 1. Le tas binaire de min (min heap) : Dans ce type de tas binaire, la valeur de chaque nœud est inférieure ou égale à la valeur de ses enfants. Ainsi, l'élément de plus basse valeur se trouve toujours à la racine du tas.
// 2. Le tas binaire de max (max heap) : Dans ce type de tas binaire, la valeur de chaque nœud est supérieure ou égale à la valeur de ses enfants. Par conséquent, l'élément de plus haute valeur se trouve toujours à la racine du tas.

// La structure de données du tas binaire est généralement implémentée à l'aide d'un tableau, où chaque nœud est représenté par un élément du tableau. Les relations entre les nœuds sont déterminées par leurs indices dans le tableau. Par exemple, pour un nœud à l'index `i`, ses enfants se trouvent aux indices `2*i+1` et `2*i+2`, et son parent se trouve à l'index `(i-1)//2`.

// Les principales opérations sur un tas binaire incluent :
// - Insertion : Ajouter un nouvel élément dans le tas tout en maintenant la propriété du tas.
// - Suppression : Retirer l'élément de plus haute priorité du tas et réorganiser les autres éléments pour maintenir la propriété du tas.
// - Accès à l'élément de plus haute priorité : Obtenir la valeur de l'élément de plus haute priorité sans le supprimer du tas.

// L'avantage d'utiliser un tas binaire pour implémenter une file de priorité est que les opérations d'insertion et de suppression ont une complexité temporelle très efficace de O(log n), où n est le nombre d'éléments dans le tas. Cela en fait une structure de données appropriée pour gérer des ensembles d'éléments avec des priorités associées.

// En résumé, un tas binaire est une structure de données en forme d'arbre binaire utilisée pour maintenir la propriété du tas et permettre une manipulation efficace des éléments selon leur priorité. C'est une composante clé dans l'implémentation de la file de priorité et d'autres algorithmes nécessitant un accès rapide à l'élément de plus haute (ou plus basse) priorité.

class BinaryHeap {
    constructor() {
      this.heap = [];
    }
  
    getLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
    }
  
    getRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
    }
  
    getParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
    }
  
    hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.heap.length;
    }
  
    hasRightChild(index) {
      return this.getRightChildIndex(index) < this.heap.length;
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    leftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
    }
  
    rightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
    }
  
    parent(index) {
      return this.heap[this.getParentIndex(index)];
    }
  
    swap(index1, index2) {
      [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
  
    peek() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty.");
      }
      return this.heap[0];
    }
  
    poll() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty.");
      }
      const item = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown();
      return item;
    }
  
    add(item) {
      this.heap.push(item);
      this.heapifyUp();
    }
  
    heapifyUp() {
      let index = this.heap.length - 1;
      while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
        const parentIndex = this.getParentIndex(index);
        this.swap(index, parentIndex);
        index = parentIndex;
      }
    }
  
    heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
          smallerChildIndex = this.getRightChildIndex(index);
        }
        if (this.heap[index] < this.heap[smallerChildIndex]) {
          break;
        }
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      }
    }
  }
  