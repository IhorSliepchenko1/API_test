// const person = {
//      name: 'Alex',
//      age: 25,

//      get userAge() {
//           return this.age;
//      },

//      set userAge(num) {
//           this.age = num
//      }
// }

// // console.log(person.userAge = 30);
// // console.log(person.userAge);


// class User {
//      constructor(name, age) {
//           this.name = name;
//           this._age = age
//      }

//      #surname = 'petrov'

//      say = () => {
//           console.log(`Имя: ${this.name} ${this.#surname}, возраст: ${this._age}`);
//      }

//      get age() {
//           return this._age;
//      }

//      set age(age) {
//           if (typeof age === 'number' && age > 0 && age < 110) {
//                this._age = age
//           } else {
//                console.log('Недопустимое значение!');
//                this._age = 'Error'
//           }
//      }

// }

// const ivan = new User('Ivan', 27)
// console.log(ivan.age);
// ivan.age = 99
// console.log(ivan.age);
// console.log(ivan.surname);
// ivan.say()


// var argumentsLength = function (...args) {
//      return args.length
// };

// console.log(argumentsLength({}, null, "3"));


// var once = function (fn) {
//      const slotArr = []

//      return function (...args) {
//           slotArr.push(fn(...args))

//           if (slotArr.length > 1) {
//                return
//           }

//           return slotArr[0]
//      }
// };

// let fn = (a, b, c) => (a + b + c);
// let onceFn = once(fn);

// console.log(onceFn(2, 3, 6));
// console.log(onceFn(1, 2, 3));


// var filter = function (arr, fn) {
//      let newArr = [];

//      arr.forEach((n, i) => {
//           if (fn(n, i)) {
//                newArr.push(n)
//           }
//      })

//      return newArr;
// };



// console.log(filter([-2, -1, 0, 1, 2], (n) => { return n + 1 }));

// function plusOne(n) { ret  urn n + 1 }



// var reduce = function (nums, fn, init) {
//      if (nums.length < 1) {
//           return init
//      }

//      for (let i = 0; i < nums.length; i++) {
//           init = fn(init, nums[i])
//      }

//      return init

// };


// console.log(reduce([1, 2, 3, 4], (accum, curr) => { return accum + curr }, 0));


// function memoize(fn) {

//      return function (...args) {
//           for (let j = 0; j < args.length; j++) {
//                return fn(args[j], args[j + 1])
//           }
//      }
// }



// let callCount = 0;
// const memoizedFn = memoize(function (a, b) {
//      callCount += 1;
//      return a + b;
// })
// memoizedFn(2, 3)
// memoizedFn(2, 3)
// console.log(memoizedFn(2, 3));
// console.log(callCount)


// var singleNumber = function (nums) {
//      const copyArr = nums
//      if (nums.length === 1) {
//           return nums[0]
//      }

//      let slot
//      for (let i = 0; i < copyArr.length; i++) {
//           if (copyArr.indexOf(nums[i]) === copyArr.lastIndexOf(nums[i])) {
//                slot = nums[i]
//           }
//      }
//      return slot

// };

// console.log(singleNumber([4, 1, 2, 1, 2, 2, 2, 1])); // 4
// console.log(singleNumber([2, 2, 1])); // 1
// console.log(singleNumber([1, 3, 1, -1, 3])); // -1

// var addTwoNumbers = function (l1, l2) {
//      const one = +l1.reverse().join('')
//      const two = +l2.reverse().join('')

//      const sum = (one + two)

//      const result = `${sum}`.split('').reverse()
//      return result

// };

// console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));



// var longestPalindrome = function (s) {
//      if (s.length === 1) {
//           return s;
//      }

//      const container = [];
//      const isPalindrome = (start, end) => {
//           while (start < end) {
//                console.log(start, end);
//                if (s[start] !== s[end]) {
//                     return false;
//                }
//                start++;
//                end--;
//           }
//           return true;
//      };

//      for (let i = 0; i < s.length; i++) {
//           for (let j = i + 1; j <= s.length; j++) {
//                if (isPalindrome(i, j - 1)) {
//                     container.push(s.substring(i, j));
//                }
//           }
//      }

//      container.sort((a, b) => b.length - a.length);

//      return container.filter(word => word.length === container[0].length);
// };

// // console.log(longestPalindrome('cbbd'));
// // console.log(longestPalindrome('babad'));
// console.log(longestPalindrome('babad'));

