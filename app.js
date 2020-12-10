const gridWrapper = document.querySelector('.grid-wrapper');
const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset-button');
const blackButton = document.querySelector('#blackButton');
const rgbButton = document.querySelector('#rgbButton');
let gridSize = 16;
let colorSecltion = 'black'
let clicked = false;
let cells;

blackButton.addEventListener('pointerdown', ()=> colorSecltion = 'black');
rgbButton.addEventListener('pointerdown', ()=> colorSecltion = 'rgb');

const makeOneDiv = (row, column, className,) => {
  const div = document.createElement('div');
  div.setAttribute("id", `${row}${column}`);
  div.classList.add(className);
  div.style.gridArea = `${row + 1} / ${column + 1}`;
  div.setAttribute("draggable", "false")
  return div;
}
const divFactory = (gridSize) => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      container.appendChild(makeOneDiv(i, j, 'divs'));
    }
  }
}

const ifClicked = () => {
  if (clicked === false) {
    clicked = true;
  } else {
    clicked = false;
  }
}

const generateRandomColor = () => {
  return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
}

const cellEvents = () => {
  cells.forEach(cell => {
    cell.addEventListener('pointerdown', (e) => {
      if (colorSecltion === 'black') {
        e.target.style.backgroundColor = 'black';
      } else if (colorSecltion === 'rgb') {
        e.target.style.backgroundColor = generateRandomColor();
      }
    });

    cell.addEventListener('pointerover', (e) => {
      if (clicked === true) {
        if (colorSecltion === 'black') {
          e.target.style.backgroundColor = 'black';
        } else if (colorSecltion === 'rgb') {
          e.target.style.backgroundColor = generateRandomColor();
        }
      }

      //finds the real element under a touchmove event 
      cell.addEventListener('touchmove', (e) => {
        let locX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
        let locY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
        let realTarget = document.elementFromPoint(locX, locY);
        if (realTarget.className === 'divs') {
          if (colorSecltion === 'black') {
            realTarget.style.backgroundColor = 'black';
          } else if (colorSecltion === 'rgb') {
            realTarget.style.backgroundColor = generateRandomColor();
          }
        }
      })
    });
  });
};

const resetAndPrompt = () => {
  gridSize = parseInt(prompt("Enter Grid Size"));
  container.textContent = '';
  if (!gridSize || typeof gridSize !== 'number' || gridSize < 1) {
    divFactory(16);
  } else if (gridSize > 100) {
    divFactory(100);
  } else {
    divFactory(gridSize);
  }
  cells = document.querySelectorAll(".divs");
  cellEvents();
}

divFactory(gridSize);
cells = document.querySelectorAll(".divs");
cellEvents();

gridWrapper.addEventListener('pointerdown', ifClicked);
gridWrapper.addEventListener('pointerup', () => clicked = false);
resetButton.addEventListener('pointerdown', resetAndPrompt);