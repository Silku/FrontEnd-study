var age = 20;;
console.log('나이 : %d', age);

var Person = {};
Person["age"] = 20;
Person["name"] = '에스파'
Person.add = function(a,b){
    return a + b;
};

console.log('+ %s', Person.add(10, 10))