function solution(string){
  let left = 0;
  let rigth = string.length - 1;

  while(left < rigth){
    if(string[left] != string[rigth]) return false;
    left++;
    rigth--;
  }

  return true;
}
console.log(solution("abccba"))
console.log(solution("algomania"))