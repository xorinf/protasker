async function fetchData() {
  console.log("start");

  const result = await Promise.resolve("data");

  console.log(result);
  console.log("end");
}

console.log("before");
fetchData();
console.log("after");