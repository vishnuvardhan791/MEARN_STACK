console.log("#####################################################################");
console.log("Array Methods");

console.log("1.Push    2.Pop");

let srhPlayers = ["Abhi","Travis","Ishan","Kalseen","Pat","livingston"];
console.log("This is before all the operations::")

console.log(srhPlayers);
srhPlayers.pop();
console.log("This is after pop operation");

console.log(srhPlayers);
srhPlayers.push("Vishnu");
console.log("This is after push operation ");

console.log(srhPlayers);

console.log("============================");

console.log("3. shift  4.Unshift");
console.log("Shift is used to delete element from begining");

srhPlayers.shift();
console.log(srhPlayers);

console.log("Unshift is used to add element at the beginning");

srhPlayers.unshift("hitters");
console.log(srhPlayers);

console.log("============================");

console.log("5.splice");
console.log("we use splice to add or remove at any position of the array");

// syntax : splice(start pos , no of elements to delete ,no of elements to add)

console.log("To Just delete we use this syntax");
srhPlayers.splice(1,2);
console.log(srhPlayers);
console.log("");

console.log("To do both add and delete");
srhPlayers.splice(1,2,"bharath");
console.log(srhPlayers);
console.log("");

console.log("To Just add the element");
srhPlayers.splice(1,0,"mahadev");
console.log(srhPlayers);
console.log("");

console.log("============================");

console.log("6.slice");
console.log("To Print sub array from start and end index");

let favPlayer=srhPlayers.slice(1,3);
console.log(favPlayer);

console.log("============================");

console.log("7.indexof     8.lastindexof");
console.log("indexOf will return the first occurence of the element");
srhPlayers.push("Vishnu");
console.log(srhPlayers.indexOf("Vishnu"));

console.log("");
console.log("lastIndexOf will return the last occurence of element");
console.log(srhPlayers.lastIndexOf("Vishnu"));

console.log("============================");

console.log("9.sort  10.Join  11.concat");

