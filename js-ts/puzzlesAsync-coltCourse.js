async function showNumberTrivia(n) {
  const response = await fetch(`http://numbersapi.com/${n}`);

  const text = await response.text();
  console.log(`Fato sobre ${n}:`, text);
  return text;
}

async function showNumberRace(n1,n2,n3,n4){
  const response = await Promise.race([fetch(`http://numbersapi.com/${n1}`),fetch(`http://numbersapi.com/${n2}`), fetch(`http://numbersapi.com/${n3}`), fetch(`http://numbersapi.com/${n4}`)]);

  const text = await response.text();
  console.log(`Vencedor:`, text);
  return text;
}


async function showNumberAll(n1,n2,n3,n4){
  const responses = await Promise.all([fetch(`http://numbersapi.com/${n1}`),fetch(`http://numbersapi.com/${n2}`), fetch(`http://numbersapi.com/${n3}`), fetch(`http://numbersapi.com/${n4}`)]);


    let oks = "";
    let noOks = "";

  for (const response of responses) {
    if(response.ok){
      let fact = await response.text();
      oks += fact + "\n"
    }else{
      noOks = `${arguments[responses.indexOf(response)]}: ${response.ok}`
    }
  }

  console.log(oks);
  console.log(noOks);
  return responses;
}


async function main(n0,n1,n2,n3,n4,n5){
  await showNumberTrivia(n0);
  await showNumberRace(n1,n2,n3,n4);
  await showNumberAll(n0,n3,n4,n2);
}

main(0,1,2,3,4,"wrong")