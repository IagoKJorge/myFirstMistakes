function solution(numbers, k) {
  let i = 0;
  let resp = [];
  let obj = {};
  let most = 0;

  for (let c = 0; c < numbers.length; c++) {
    obj[numbers[c]] = (obj[numbers[c]] || 0) + 1;
  }

  while (i < k) {
    for (const key in obj) {
      if (obj[key] > most) {
        most = obj[key];
        resp[i] = Number(key);
      }
    }
    most = 0;
    delete obj[resp[i]];
    i++;
  }

  return resp;
}

console.log(solution([1, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10], 2))