let fruits = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
let transformedFruits = fruits.map(fruit => fruit === ' ' ? 'empty string' : fruit);
console.log(transformedFruits);
