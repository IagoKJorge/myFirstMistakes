




function ex1(arr) {
  let newArr = [];

  for (const el of arr) {
    newArr.push(...el);
  }

  return newArr.sort((a, b) => a - b);
}

//console.log(ex1([[1,5,3], [6,19,11], [47, 128, 5],[1,93,57,42,103]]))

function ex2(str) {
  let arr = str.split(" ");
  let resp = arr[arr.length - 1].toUpperCase() + ", ";
  for (let i = 0; i < arr.length - 1; i++) {
    resp += arr[i][0] + ".";
  }

  return resp;
}

//console.log(ex2("Iago Jorge Silva"))

function ex3(str) {
  let n;
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    obj[str[i]] = (obj[str[i]] || 0) + 1;
  }

  n = obj[str[0]];
  console.log(obj);
  for (const key in obj) {
    if (obj[key] !== n) {
      return false;
    }
  }

  return true;
}

console.log(ex3("This is Thee"));
