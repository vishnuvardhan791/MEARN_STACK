console.log("");
console.log("1. Call");
console.log("It is used to borrow the function from another");
console.log("It Accepts the arguments");

let user1={
    firstName:"vishnu",
    lastName:"vardhan",
    city:"srd",
    fullName:function(){
        return this.firstName+" "+this.lastName;
    }
}
//console.log(user1.fullName());

let user2={
    firstName:"harish",
    lastName:"kumar",
    city:"hyd"
}
console.log(user1.fullName.call(user2))
console.log(" ");
console.log("Here what happened is we are calling the elemets of user2 from user1");