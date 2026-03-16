// for of example
// direct values instead of indexes

console.log("Example of the for-of:");
let arr =[9,53,84,234,74,733,74,73,90];
for(let i of arr){
    console.log(i);
}
console.log("");

// maximum element in array
console.log("Maximum element in array: ");
let maxEle=arr[0];
for(let i of arr){
    if(i>maxEle){
        maxEle=i;
    }
}
console.log(maxEle);
console.log("");

