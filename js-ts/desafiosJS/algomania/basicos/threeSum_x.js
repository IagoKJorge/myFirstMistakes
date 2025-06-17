function solution(numbers, target_sum = 0) {
  let complements = new Map();
  let nums = new Map();
  let result = [];
  //[-1, 0, 1, 2, -1, -4]

  for (let i = 0; i < numbers.length; i++) {
    nums.has(numbers[i])
      ? nums.get(numbers[i]).push(i)
      : nums.set(numbers[i], [i]);
    for (let c = i + 1; c < numbers.length; c++) {
      nums.has(numbers[c])
        ? nums.get(numbers[c]).push(c)
        : nums.set(numbers[c], [c]);
      let complement = -1*(numbers[i] + numbers[c]);

      if (complements.has(complement)) {
        complements.get(complement).push([i, c]);
      } else {
        complements.set(complement, [[i, c]]);
      }

      if (nums.has(complement)) {
        let arr = [i, c];
        if (nums.get(complement).length > 1) {
          for (let l = 0; l < nums.get(complement).length; l++) {
            let indNew = nums.get(complement)[l];
            !arr.includes(indNew)
              ? result.push([numbers[arr[0]], numbers[arr[1]], numbers[indNew]])
              : "";
          }
        } else {
          let indNew = nums.get(complement)[0];
          !arr.includes(indNew)
            ? result.push([numbers[arr[0]], numbers[arr[1]], numbers[indNew]])
            : "";
        }
      }
    }
  }

  return result;
}

console.log(solution([-1, 0, 1, 2, -1, -4]))