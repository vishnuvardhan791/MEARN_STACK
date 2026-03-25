console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
console.log("");
console.log("Functional Constructor");
console.log("A function constructor is a regular function used with the new keyword to create and initialize objects.");

function Student(SName,SCity,SAge){
    this.SName=SName;
    this.SCity=SCity;
    this.SAge=SAge;
}
let s1 = new Student("Vishnu","SRD",22);
let s2 = new Student("Harish","HyD",21);
let s3 = new Student("Likhith","BHEL",24);
console.log(s1.SName);

console.log("==========================");
console.log(" ");
console.log("To Print All the Students");

console.log("");
let friends= [s1,s2,s3];
for(let i of friends){
    for(let j in i){
        console.log(`${j}:${i[j]}`);
    }
    console.log("");
}

console.log("");
console.log("To Represent in Table format we did this");
console.table(friends);

console.log("");
console.log("To Print like aray format ");
let newarr=friends.map((obj)=>{
    return{
        ...obj
    }
})
console.log(newarr)


console.log("");
console.log("If you want to filter the array");
let oldPeople= friends.filter(i=>i.SAge>22);
console.log(oldPeople);
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");