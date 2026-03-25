console.log("");
console.log("3.Bind");
console.log("Bind in simple words we can say: Give me a new function, I'll run it later");
console.log("we pass the arrguments directly without array ");
console.log("it returns one bounding function instead of executing directly");

let user1={
    firstName:"vishnu",
    lastName:"vardhan",
    city:"srd",
    fullName:function(education,college){
        return this.firstName+" "+this.lastName+" completed "+education+" in "+college;
    }
}

let user2={
    firstName:"harish",
    lastName:"kumar",
    city:"hyd"
}

let result = user1.fullName.bind(user2," Degree","DMK");
console.log(result());