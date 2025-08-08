const cards = document.querySelectorAll(".cards_card");
const imgsSrc = new Array(8).fill(null);
const arrUrl = [];
const srcDom = "question.png";
let totalDom = document.querySelector("#total");
let tentativas = 0;
let acertos = 0;
let firstElement = null;
let lastElement = null;

async function fillUrls() {
  let id = Math.ceil(Math.random() * 236);

  const url = `https://picsum.photos/id/${id}/200/200`;
  if (arrUrl.includes(url)) return fillUrls();
  const response = await fetch(url);

  if (response.ok) {
    arrUrl.push(url);
    return url;
  } else {
    return fillUrls();
  }
}

async function fillFull() {
  while (arrUrl.length < 4) {
    await fillUrls();
  }

  let c = 0;

  while (imgsSrc.includes(null)) {
    fillSrc(arrUrl[c]);
    c++;
  }

  cards.forEach((card) => {
    card.addEventListener("click", initGame);
  });

  return;
}

function fillSrc(url) {
  if (!imgsSrc.includes(null)) return;

  let idx1 = Math.floor(Math.random() * 8);
  let idx2 = Math.floor(Math.random() * 8);

  if (idx1 !== idx2 && !imgsSrc[idx1] && !imgsSrc[idx2]) {
    imgsSrc[idx1] = url;
    imgsSrc[idx2] = url;
    return;
  } else {
    return fillSrc(url);
  }
}

fillFull();

function initGame(ev) {
  let img = ev.target;

  if (img.tagName !== "IMG") {
    img = ev.target.querySelector("img");
  }

  img.src = imgsSrc[img.dataset.idx];

  if (!firstElement) firstElement = img;
  if (!lastElement && firstElement.dataset.idx !== img.dataset.idx) lastElement = img;

  console.log(firstElement, lastElement)

  if (firstElement && lastElement && firstElement.src != lastElement.src) {
    tentativas++;
    totalDom.textContent = tentativas;

    setTimeout(() => {
      console.log(firstElement, lastElement);
      firstElement.src = srcDom;
      lastElement.src = srcDom;
      firstElement = null;
      lastElement = null;
    }, 1200); 
  } else if (firstElement && lastElement) {
    firstElement.parentElement.removeEventListener("click", initGame);
    lastElement.parentElement.removeEventListener("click", initGame);
    firstElement = null;
    lastElement = null;
    ++acertos;
    if (acertos === 4) return endGame();
  }
}

function endGame(){
  let success = document.querySelector(".success")
  success.textContent =  `Você acertou em ${tentativas} tentativas!`
  success.style.visibility = "visible";
}
