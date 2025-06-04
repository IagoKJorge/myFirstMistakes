const BASE_URL = "https://pokeapi.co/api/v2";


// 1.

async function part1() {
  const url = `${BASE_URL}/pokemon/?limit=1000`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  console.log("Part 1");
  console.log(pokemonData.results);
}

part1();


// 2.

async function part2() {
  // get bulk Pokemon data from API
  const url = `${BASE_URL}/pokemon/?limit=1000`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  const allPokemon = pokemonData.results;

  // pluck out three random Pokemons' urls from resolved data
  let urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  // fire off a fetch request for each url, get raw data
  const pokemonR = await Promise.all(urls.map(url => fetch(url)));

  // call the .json() method on each pokemon, get promises of pokemonFacts
  const pokemonFactsP = pokemonR.map(r => r.json());

  // resolve those promises and get JSON
  const pokemonFacts = await Promise.all(pokemonFactsP);

  console.log("Part 2");
  pokemonFacts.forEach(console.log);
}

part2();


// 3.

async function part3() {
  const url = `${BASE_URL}/pokemon/?limit=1000`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  const allPokemon = pokemonData.results;

  const urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  // fire off a fetch request for each url, get raw data
  const pokemonR = await Promise.all(urls.map(url => fetch(url)));

  // call the .json() method on each pokemon, await those promises and get JSON
  const pokemonFacts = await Promise.all(
    pokemonR.map(r => r.json()));

  // fire off a fetch request to each species url, get raw data
  const speciesR = await Promise.all(
    pokemonFacts.map(p => fetch(p.species.url)));

  // call the .json() method on each species response, await the promises and get JSON
  const speciesData = await Promise.all(
    speciesR.map(sr => sr.json()));

  let descriptions = speciesData.map(d => {
    const descriptionObj = d["flavor_text_entries"].find(
      entry => entry.language.name === "en",
    );

    const description = descriptionObj
      ? descriptionObj["flavor_text"]
      : "No description available.";
    return description;
  });

  console.log("Part 3");
  descriptions.forEach((desc, i) => {
    console.log(`${pokemonFacts[i].name}: ${desc}`);
  });
}

part3();


// 4.

const $btn = $("button");
const $pokeArea = $("#pokemon-area");

async function handleButtonClick() {
  const url = `${BASE_URL}/pokemon/?limit=1000`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  const allPokemon = pokemonData.results;

  const urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  // fire off a fetch request for each url, get raw data
  const pokemonR = await Promise.all(urls.map(url => fetch(url)));

  // call the .json() method on each pokemon, await those promises and get JSON
  const pokemonFacts = await Promise.all(
    pokemonR.map(r => r.json()));

  // fire off a fetch request to each species url, get raw data
  const speciesR = await Promise.all(
    pokemonFacts.map(r => fetch(r.species.url)));

  // call the .json() method on each species response, await the promises and get JSON
  const speciesData = await Promise.all(
    speciesR.map(sr => sr.json()));

  let descriptions = speciesData.map(d => {
    const descriptionObj = d["flavor_text_entries"].find(
      entry => entry.language.name === "en",
    );

    const description = descriptionObj
      ? descriptionObj["flavor_text"]
      : "No description available.";

    return description;
  });

  $pokeArea.empty();

  descriptions.forEach((desc, i) => {
    const name = pokemonFacts[i].name;
    const imgSrc = pokemonFacts[i].sprites.front_default;
    const description = descriptions[i];
    $pokeArea.append(makePokeCard(name, imgSrc, description));
  });
}

$btn.on("click", handleButtonClick);

function makePokeCard(name, imgSrc, description) {
  return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} alt="${name}" />
        <p>${description}</p>
      </div>
    `;
}
