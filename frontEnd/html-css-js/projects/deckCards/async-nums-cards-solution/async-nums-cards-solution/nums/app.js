"use strict";

const BASE_URL = "http://numbersapi.com";

// 1.

async function showNumberTrivia(num) {
  const url = `${BASE_URL}/${num}?json`;
  const response = await fetch(url);
  const numberTrivia = await response.json();
  console.log("showNumberTrivia:", numberTrivia.text);
}

// 2.

/** Show "winning" trivia: the first of FAV_NUMBERS to return. */

async function showNumberRace(nums) {
  const respPromises = nums.map(
    n => fetch(`${BASE_URL}/${n}?json`)
  );

  const winningResponse = await Promise.race(respPromises);
  const winningData = await winningResponse.json();

  console.log("showNumberRace:", winningData.text);
}

// 3.

/** Show information (trivia/error messages) for all requests. */

async function showNumberAll(nums) {
  //make our requests, await
  const respPromises = nums.map(
    n => fetch(`${BASE_URL}/${n}?json`)
  );

  const settledFetchResponses = await Promise.allSettled(respPromises);

  //handle the ok responses; those that are fulfilled and status code 200-299
  const okResponses = settledFetchResponses
    .filter(r => r.status === "fulfilled" && r.value.ok === true);

  const numDataJsonPromises = okResponses
    .map(r => r.value.json());

  const numberData = await Promise.all(numDataJsonPromises);
  const facts = numberData.map(d => d.text);
  console.log("showNumberAll fulfilled:", facts);

  //handle the not ok responses; those that are fulfilled and status code 300+
  const errors = settledFetchResponses
    .filter(r => r.status === "fulfilled" && r.value.ok === false)
    .map(r => `${r.value.status}: ${r.value.statusText}`);

  console.log("showNumberAll rejected:", errors);
}

/** Call all three functions one-after-another. */

async function main() {
  await showNumberTrivia(5);
  await showNumberRace([7, 11, 22, 42]);
  await showNumberAll([7, 11, 22, "WRONG"]);
}

main();