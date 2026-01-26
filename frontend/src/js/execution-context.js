console.log(a);

var a = 10;

function test() {
  console.log(a);
  var a = 20;
  console.log(a);
}

test();
console.log(a);