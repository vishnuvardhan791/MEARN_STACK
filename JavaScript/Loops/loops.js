// no of digits 
console.log("");
console.log("To Count No of Digits");
let num = 92836;
let og =num;
let count=0;

while(num!=0){
    num=parseInt(num/10);
    count++;
}

console.log("no of digits : "+count);
console.log("");

// sum of the digits 

console.log("To Find the Sum of the digits in the number");

let num1 = 87699875;
let og2 = num;
let sum =0;

while(num1!=0){
    sum+=num1%10;
    num1=parseInt(num1/10);
}

console.log("sum of the digits: "+sum);
console.log("");


// Reverse a number

console.log("To Reverse a number");

let num2=8975987608;
let rev = "";
while(num2!=0){
    rev+=(num2%10);
    num2=parseInt(num2/10);
}

console.log(`The reversed number is:${rev}`);
console.log("");

// Amstrong Number

let amNum = 153;
let copy=amNum;

let amRevNum=0;
let countD=0;

while(amNum!=0){
    amNum=parseInt(amNum/10);
    countD++;
}
amNum=copy;
while(amNum!=0){
    amRevNum+=(amNum%10)**countD;
    amNum=parseInt(amNum/10);
}
console.log(amRevNum==copy ? "The Number is AmStrong Number":"The Number is Not AmStrong");
console.log("");
