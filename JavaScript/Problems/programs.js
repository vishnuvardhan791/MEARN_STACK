console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
console.log("");
console.log("Find the maximum and minimum element of an Array");
let arr =[23,62,623,64,25,51,94,65];
let max= arr[0];
let min = arr[0];

for(let i=0;i<arr.length;i++){
    if(arr[i]>max){
        max=arr[i];
    }
    if(arr[i]<min){
        min=arr[i];
    }

}
let diff = max-min;
console.log("max ele = "+max);
console.log("min ele = "+min);
console.log("diff btw them is = "+diff);

console.log("The Above one is without using the built in functions");
console.log("");
console.log("The Below problem is using Builtin functions");

let max1= Math.max(...arr);
let min1 = Math.min(...arr);

console.log(max1);
console.log(min1);

console.log("");