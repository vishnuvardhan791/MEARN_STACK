console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
console.log("");
console.log("Problem 1 =>")
console.log("");

// console.log(" Write a function that takes an object and a list of keys,")
// console.log(" and returns a new object that only contains the properties from the list of keys. ");

//eg=>
// const obj = { a: 1, b: 2, c: 3, d: 4 }; 
// const keys = ['b', 'c']; 
// output : { b: 2, c: 3 }

const obj ={a:1,b:2,c:3,d:4,e:5};
const arr1=['e','c','z'];

console.log(filterObject(obj,arr1));

function filterObject(obj,arr1){
    let result = {};// e:5 c:3

    for(let i of arr1){
        if(i in obj){
            result[i]=obj[i];//i->e obj[i]->5

        }
    }
    return result;
}


console.log("");
console.log("Problem 2 =>")
console.log("");

// console.log(" Given an array of movie objects, each with properties movieName, movieHero, movieGenre, ")
// console.log("and releaseDate, write a function to sort the array in ascending order of the releaseDate");

// movies = [ 
// { movieName: 'Movie A', movieHero: 'Hero A', movieGenre: 'Action', releaseDate: '2020-01-15' }, 
// { movieName: 'Movie B', movieHero: 'Hero B', movieGenre: 'Drama', releaseDate: '2019-06-10' }, 
// { movieName: 'Movie C', movieHero: 'Hero C', movieGenre: 'Comedy', releaseDate: '2021-12-25' 
// }, 
// { movieName: 'Movie D', movieHero: 'Hero D', movieGenre: 'Horror', releaseDate: '2018-04-05'},]; 

//If dates are already in YYYY-MM-DD format
// You can also compare strings directly

let movies = [
{ movieName: 'Movie A', movieHero: 'Hero A', movieGenre: 'Action', releaseDate: '2020-01-15' },
{ movieName: 'Movie B', movieHero: 'Hero B', movieGenre: 'Drama', releaseDate: '2019-06-10' },
{ movieName: 'Movie C', movieHero: 'Hero C', movieGenre: 'Comedy', releaseDate: '2021-12-25' },
{ movieName: 'Movie D', movieHero: 'Hero D', movieGenre: 'Horror', releaseDate: '2018-04-05' }
];

// To copy array of objects safely 
let newMovies = movies.map(movie => ({ ...movie }));

console.log(sortMoviesByDate(newMovies))

function sortMoviesByDate(newMovies){
    return newMovies.sort((a,b)=>{
        return new Date(a.releaseDate)- new Date(b.releaseDate);
    });
}

// console.log("Using map with spread creates a shallow copy of objects. It works fine for flat objects,")
// console.log(" but for nested objects, references are still shared. For complete deep copy, we need structuredClone or other methods.");

console.log("");
console.log("Problem 3 =>")
console.log("");
// console.log("Use localeCompare() for string sorting")

const employees = [
{ name: 'Alice', salary: 50000 },
{ name: 'Bob', salary: 60000 },
{ name: 'Charlie', salary: 40000 },
];

let result = getEmployeeNames(employees, 45000);
console.log(result);

function getEmployeeNames(employees,minSalary){
    return employees
              .filter(emp=>emp.salary>minSalary)
              .sort((a,b)=>a.name.localeCompare(b.name))
              .map(emp=>emp.name);
}

console.log("");

console.log("");
console.log("Problem 4 =>")
console.log("");

//  Given an array of objects representing books, use the findIndex method to find the index of 
// the book with a specific title given by the user.

// find() → returns object
// findIndex() → returns position 

const books = [ 
{ title: 'Book A', author: 'Author 1' }, 
{ title: 'Book B', author: 'Author 2' }, 
{ title: 'Book C', author: 'Author 3' }, 
];

let index= findBookIndex(books,'Book B');
console.log(index);

function findBookIndex(books,title){
    return books.findIndex(book=>book.title===title);
}

console.log("");
console.log("Problem 5 =>")
console.log("");

// Given an array of objects representing students, use the map method to create a new array of objects
//  where each object has an additional property isAdult that is true 
// if the student's age is 18 or above, and false otherwise.

let students = [ 
{ name: 'John', age: 17 }, 
{ name: 'Jane', age: 19 }, 
{ name: 'Jack', age: 18 }, 
];

let results = adultMamaNuvvu(students);
console.log(results);

function adultMamaNuvvu(students){
    return students.map(stu=>({
        ...stu,
        NuvAdultAhKaada: stu.age>=18
    }))
}


console.log("");
console.log("Problem 6 =>")
console.log("");

// write a JavaScript program to perform addition of n numbers using single function in js

console.log(add(42,62,623,53,24,623,745,74));

function add(...num){
    let sum=0;
    for(let k of num){
        sum+=k;
    }
    return sum;
}

console.log("");
console.log("Problem 7 =>")
console.log("");

// write a JavaScript program to implement promises for even numbers, if number is even fulfil 
// the promise and it is odd reject the promise


function checkEvenMama(num){
    return new Promise((resolve,reject)=>{
        if(num%2===0){
            resolve("Even Number anta mama")
        }
        else{
            reject("Odd Number anta macha")
        }
    })
}

checkEvenMama(6)
       .then(result=>console.log(result))
       .catch(error => console.log(error));

checkEvenMama(7)
        .then(result=>console.log(result))
        .catch(error=>console.log(error));
       
console.log("");
console.log("Problem 8 =>")
console.log("");   

//write a JavaScript program to store factorials of each number into new array from given array 

let arr=[3,5,2,6,6,8,7,5];

let resulta = arr.map(num=>{
    let fact =1;
    for(let i=1;i<=num;i++){
        fact*=i;
    }
    return fact;
});

console.log(resulta);

console.log("");
console.log("Problem 9 =>")
console.log(""); 

// Write JavaScript program to create new array of leap years from given array 

let years = [1900,3600,2012,5023,1490,9014,2025,2026,2024];

let resultb = getLeapYear(years);

function getLeapYear(years){
    return years.filter(y=>
          (y%4===0 && y%100!==0)|| (y%400===0)
    );
}

console.log(resultb);

console.log("");
console.log("Problem 10 =>")
console.log(""); 

//Write a JavaScript program to apply text color for h1 which user entered in input tag and submit  



