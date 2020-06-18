// function b() {
//     console.log(`called b`);
// }
// b();

// console.log(a);
// var a = 'hello world';
// // var a;
// console.log(a);
// console.log(1 < 3 < 3);

var person = new Object();
person['firstName'] = 'Tom'; // set a primitive property

var objectLiteral = {
    firstName: 'Mary',
    isAProgrammer: true,
};

// console.log(JSON.stringify(objectLiteral)); // convert a object to JSON syntax, as a string
//4.34
function greet() {
    console.log('hi');
}
// var abcd = 2;

greet.language = 'english'; // you can actually assign a property to a function. how wild is that? functions are objects!
console.log(greet.language); // crazy. that you can just attach properties like that

// this is actually pretty cool, passing a function to another function:
// this accepts 'a'. to run 'a', you can just invoke it
function log(a) {
    a();
}
// here we invoke the above log function, pass it another function. we invoke the passed function within the accepting function
log(function () {
    console.log('hello');
});
