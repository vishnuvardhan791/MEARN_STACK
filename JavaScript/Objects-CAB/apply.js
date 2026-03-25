console.log("");
console.log("2.Apply");
console.log("used when we need to pass extra argument in the form  of array");

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
console.log(user1.fullName.apply(user2,["BTech","BVRIT"]));