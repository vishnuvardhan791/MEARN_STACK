// Guess the Output of this Questions
console.log("*******************************");
console.log("Tricky Questions for Interview");
console.log("*******************************");
console.log("when we add +1 to entire array then 1 is added as concatination to the last element in the array");

let arr=[4,2,6,334,9];
console.log(arr+1);

console.log("*******************************");


console.log("when we add value to the index out of range then this is the output");

arr[8]=875;
console.log(arr.length);
console.log(arr);
console.log("*******************************");

console.log("Here for + it is acting like concation for all the other things it acts like a operation so the output is NaN");
console.log(arr*2);
console.log("*******************************");

console.log("If there is a null value and then want to add a number then null is replaced by that number");
let arr1=[2,3,5,3,2,4,true,"vishnu",null];
console.log(arr1+1);

console.log("*******************************");

console.log("Array De Structuring");
console.log("spread");

let arr2=["Abhi","Travis","Nitish","pat","klassen","ishan"];
var [p1,p2,...allp]=arr2;
console.log(p1);
console.log(allp);
console.log("");

// i have a doubt here try to break out afterwards
console.log("Rest");
function sum(...a){
    return a.reduce((acc,i)=>acc+i);
}
console.log(sum(3,6,34,26,63,84,35));

//this is the doubt
function sum(...a){
    return a.reduce((acc,i)=>acc+3);
}
console.log(sum(3,6,34,26,63,84,35));

console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");