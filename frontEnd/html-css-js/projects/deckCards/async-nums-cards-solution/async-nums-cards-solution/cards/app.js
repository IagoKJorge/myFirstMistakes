const BASE_URL = "https://deckofcardsapi.com/api/deck";

const $cardArea = $("#card-area");
const $btn = $("button");
let deckId;

async function handleButtonClick() {
  const url = `${BASE_URL}/${deckId}/draw`;
  const cardResp = await fetch(url);
  const cardRespData = await cardResp.json();
  let cardSrc = cardRespData.cards[0].image;

  let deg = Math.random() * 90 - 45;
  let x = Math.random() * 40 - 20;
  let y = Math.random() * 40 - 20;

  $cardArea.append(
      $("<img>", {
        src: cardSrc,
        css: { transform: `translate(${x}px, ${y}px) rotate(${deg}deg)` },
      }));

  if (cardResp['remaining'] === 0) $btn.remove();
}

async function setup() {
  const url = `${BASE_URL}/new/shuffle/`;
  const deckResp = await fetch(url);
  const deckRespData = await deckResp.json();
  deckId = deckRespData["deck_id"];
  $btn.show().on("click", handleButtonClick);
}

setup();
