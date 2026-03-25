console.log("");
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
console.log("");
console.log("1.SetTimeOut");

console.log("");
console.log("It is a Function which is used to pause the execution of the function for certain time");

function helloMama(){
    console.log("hello cheppu raa");
}
console.log("hello");
setTimeout(helloMama,3000);
console.log("last mama");


console.log("");
console.log("2.SetInterval");
console.log("setInterval executes a function repeatedly at a specified time interval until it is stopped using clearInterval.");

let count=0;
let id = setInterval(()=> {
    count++;
    console.log(count);

    if(count==10){
        clearInterval(id);
    }
},2000);