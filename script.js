//html elements
const reset = document.querySelector(".reset");
const status = document.querySelector(".status");
const cells = document.querySelectorAll(".game-cell");

//game variables
let gameIsLive = true;
let xIsNext = true;

// cells.forEach((cell) => console.log(cell));

//functions
const letterToSymbol = (letter) => (letter === "x" ? "⨯" : "○");

const handleWin = (letter) => {
  gameIsLive = false;

  if (letter === "x") {
    status.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    status.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGameStatus = () => {
  const topLeft = cells[0].classList[1];
  const topMiddle = cells[1].classList[1];
  const topRight = cells[2].classList[1];
  const middleLeft = cells[3].classList[1];
  const middleMiddle = cells[4].classList[1];
  const middleRight = cells[5].classList[1];
  const bottomLeft = cells[6].classList[1];
  const bottomMiddle = cells[7].classList[1];
  const bottomRight = cells[8].classList[1];

  //   console.log(topLeft, topMiddle, topRight);
  //   console.log(middleLeft, middleMiddle, middleRight);
  //   console.log(bottomLeft, bottomMiddle, bottomRight);

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);
  } else if (topLeft && topLeft == middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
  } else if (topRight && topRight == middleRight && topRight === bottomRight) {
    handleWin(topRight);
  } else if (
    topMiddle &&
    topMiddle == middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    //tied
    gameIsLive = false;
    status.innerHTML = `It's a draw!`;
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      status.innerHTML = "⨯ is next";
    } else {
      status.innerHTML = "<span>○ is next</span>";
    }
  }
};

//event handlers
const handleReset = (e) => {
  xIsNext = true;
  status.innerHTML = "⨯ is next";
  for (const cell of cells) {
    cell.classList.remove("x");
    cell.classList.remove("o");
  }
  gameIsLive = true;
};

const handleCellClick = (e) => {
  if (
    !gameIsLive ||
    e.target.classList[1] === "x" ||
    e.target.classList[1] === "o"
  ) {
    return;
  }
  if (xIsNext) {
    e.target.classList.add("x");
    checkGameStatus();
  } else {
    e.target.classList.add("o");
    checkGameStatus();
  }
};
//event listeners
reset.addEventListener("click", handleReset);

for (const cell of cells) {
  cell.addEventListener("click", handleCellClick);
}
