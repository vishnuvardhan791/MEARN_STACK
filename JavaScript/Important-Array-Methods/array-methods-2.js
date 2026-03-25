// Advanced methods which are used frequently in js

console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
console.log("");
console.log("Arrays methods Which are used frequently");
console.log("");
console.log("1. forEach");
console.log("Cannot create new array  but can modify original array");
let arr =[43,75,83,833,745,23,734,74];
arr.forEach(multiply2);
function multiply2(i){
    console.log(i*2);
}

console.log("Annother Way for this using arrow function");
arr.forEach((a)=>{console.log(a*3)});

console.log("");
console.log("Modification Using For Each");
let vis= [913,63,53,63,63,84,941,83,92];
console.log(vis);
vis.forEach((v,j)=>{vis[j]=v+3});
console.log(vis);

console.log("");
console.log("Map Can Create new Array  but it cannot modify the original");
console.log(arr);
let updated = arr.map((a)=>a+2);
console.log(updated);

console.log("");
console.log("it returns new array if the element satisfies condition");
let arr1=[32,52,63,53,24,35,93];
let updatedarr=arr1.filter((a)=>a%2==0);
console.log(updatedarr);

console.log("");
console.log("findindex is used to find the index of the element which satifies given condition");
let kings=["vishnu","tillu","maggi","gouds","veg","tha"];
let ele = kings.findIndex((i)=>i.length<5);
console.log(ele);
let lel=kings.find((i)=>i.length<5);
console.log(lel);

console.log("");
console.log("return cumulative result of the elements");
let sum=arr1.reduce((acc,i)=>acc+i,10);// 10+.....
console.log(sum);

let sum1 =arr1.reduce((acc,i)=>acc+i);//0+......
console.log(sum1);

console.log("");
console.log("for even numbers only");
let uyt=[97,79,90,46,36,74,4,32];
let sum2=uyt
    .filter((i)=>i%2==0)
    .reduce((vs,i)=>vs+i,0);
console.log(sum2);


console.log("");
console.log("Every is a testing method in js , it will return true if all elements of array satisfies the condition else ");


console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");


