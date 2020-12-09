const gridWrapper = document.querySelector('.grid-wrapper');
const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset-button');
let divNumber = 16;
let clicked = false;
let cells;

const makeOneDiv = (row, column, className,) => {
  const div = document.createElement('div');
  div.setAttribute("id", `${row}${column}`);
  div.classList.add(className);
  div.style.gridArea = `${row + 1 } / ${column + 1}`;
  div.setAttribute("draggable", "false")
  return div;
}
const divFactory = (num) => {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      container.appendChild(makeOneDiv(i, j, 'divs'));
    }
  }
}

divFactory(divNumber);
cells = document.querySelectorAll(".divs");

const ifClicked = () => {
  if (clicked === false) {
    clicked = true;
  } else {
    clicked = false;
  }
}

const cellEvents = () => {
  cells.forEach(cell => {
    cell.addEventListener('pointerdown', (e) => {
      e.target.classList.add('divs-colored');
    });

    cell.addEventListener('mouseover', (e) => {
      if (clicked === true) {
        e.target.classList.add('divs-colored')
      }
    });
  });
};

const resetAndPrompt = () => {
  divNumber = parseInt(prompt("Enter Grid Size"));
  container.textContent = '';
  if(!divNumber || typeof divNumber !== 'number' || divNumber < 1) {
    divFactory(16);
  }else if (divNumber > 100) {
    divFactory(100);
  }else {
    divFactory(divNumber);
  }
  cells = document.querySelectorAll(".divs");
  cellEvents();
}

cellEvents();

gridWrapper.addEventListener('pointerdown', ifClicked);
gridWrapper.addEventListener('pointerup', () => clicked = false);
resetButton.addEventListener('pointerdown', resetAndPrompt);



