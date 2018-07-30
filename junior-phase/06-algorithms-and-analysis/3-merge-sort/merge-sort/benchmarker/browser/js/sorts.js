/**
 * Copy your sorting algorithms in here.
 * They must be named `bubbleSort` and `mergeSort`, and take an array param.
 */

const bubbleSort = function (array) {
  let sorted = false;
  for (let end = array.length; end > 0 && !sorted; end--) { // passes
    sorted = true; // assume until proven incorrect
    for (let j = 0; j < end; j++) { // bubbling
      if (!inOrder(array, j)) {
        swap(array, j);
        sorted = false;
      }
    }
  }
  return array;
};

/* Since we want to spy on our 'inOrder' and 'swap'
functions in our test specs, we want them to be added
as properties of the 'window' object. This doesn't
happen with const, let, or class declarations, but
*does* happen with function declarations. So we'll
just do that here. (see No. 6 of this article:
http://www.2ality.com/2015/02/es6-scoping.html) */

function inOrder (array, index) { // pure function
  if (index === array.length - 1) return true;
  return array[index] < array[index + 1];
}

function swap (array, index) { // side effects
  const oldLeftValue = array[index];
  array[index] = array[index + 1];
  array[index + 1] = oldLeftValue;
}

// In-place algorithms use only a small, constant amount of extra space.
// Bubble sort is an in-place algorithm;
// it has good space complexity at O(1), but bad time complexity O(n^2).

const mergeSort = function (array) {
  if (array.length < 2) return array; // base case
  const splits = split(array),
        left = splits[0],
        right = splits[1];
  return merge(mergeSort(left), mergeSort(right)); // merge sorted!
};

const split = function (array) {
  const center = array.length / 2,
        left = array.slice(0, center),
        right = array.slice(center);
  return [left, right];
};

const merge = function (left, right) {
  const merged = [];
  let leftIdx = 0,
      rightIdx = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      merged.push(left[leftIdx++]);
    } else {
      merged.push(right[rightIdx++]);
    }
  }
  for (; leftIdx < left.length; leftIdx++) merged.push(left[leftIdx]);
  for (; rightIdx < right.length; rightIdx++) merged.push(right[rightIdx]);
  return merged;
};

// // from old video...
// function merge (left, right) {
//   const merged = [];
//   let leftIdx = 0,
//       rightIdx = 0,
//       leftVal,
//       rightVal;
//   // admittedly pretty convoluted, but we do this in order to avoid shift
//   while (leftIdx < left.length || rightIdx < right.length) {
//     leftVal = left[leftIdx];
//     rightVal = right[rightIdx];
//     if (leftVal < rightVal || rightVal === undefined) {
//       merged.push(leftVal);
//       leftIdx++;
//     } else {
//       merged.push(rightVal);
//       rightIdx++;
//     }
//   }
//   return merged;
// }
