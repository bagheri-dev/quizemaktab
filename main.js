document.addEventListener("DOMContentLoaded", () => {
  const puzzle = document.getElementById("puzzle");
  const table = document.querySelector("table");
  const btnNew = document.getElementById("btn-new");
  const btnReset = document.getElementById("btn-reset");

  const photo = [
    "angular.svg",
    "aurelia.svg",
    "backbone.svg",
    "ember.svg",
    "react.svg",
    "vue.svg",
    "angular.svg",
    "aurelia.svg",
    "backbone.svg",
    "ember.svg",
    "react.svg",
    "vue.svg",
  ];
  photo.sort(() => Math.random() - 0.5);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.style.backgroundImage = "url(js.svg)";
    cardFront.style.backgroundRepeat = "no-repeat";
    cardFront.style.backgroundPosition = "center";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    const img = document.createElement("img");
    img.src = image;
    cardBack.appendChild(img);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => flipCard(card));
    return card;
  }

  function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch =
      firstCard.querySelector("img").src ===
      secondCard.querySelector("img").src;

    if (isMatch) {
      disableCards();
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", () => flipCard(firstCard));
    secondCard.removeEventListener("click", () => flipCard(secondCard));

    matchedPairs++;

    if (matchedPairs === photo.length / 2) {
      setTimeout(() => {
        const userName = prompt(
          "تبریک. لطفاً نام خود را وارد کنید:"
        );
        const userScore = prompt("لطفا امتیاز خود را وارد کنید:");
        if (userName) {
          const tRows = document.createElement("tr");
          const tD = document.createElement("td");
          const tD2 = document.createElement("td");
          table.append(tRows);
          tRows.append(tD);
          tD.append(userName);
          tRows.append(tD2);
          tD2.append(userScore);
          btnReset.addEventListener("click" , () => {
            tRows.remove();
          })        
        }
      }, 500);
    }
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  photo.forEach((image) => {
    const card = createCard(image);
    puzzle.appendChild(card);
  });
});