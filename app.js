const gridWrapper = document.querySelector('.grid-wrapper');
const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset-button');
const blackButton = document.querySelector('#blackButton');
const rgbButton = document.querySelector('#rgbButton');
const eraseButton = document.querySelector('#eraseButton');
let gridSize = 16;
let colorSelection = 'black'
let brushOn = false;

const makeOneCell = (row, column, className,) => {
  const cell = document.createElement('div');
  cell.setAttribute("id", `${row}${column}`);
  cell.classList.add(className);
  cell.style.gridArea = `${row + 1} / ${column + 1}`;
  cell.setAttribute("draggable", "false")
  cellEvents(cell);
  return cell;
}
const cellFactory = (gridSize) => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      container.appendChild(makeOneCell(i, j, 'cells'));
    }
  }
}

const ifClicked = () => {
  if (brushOn === false) {
    brushOn = true;
  } else {
    brushOn = false;
  }
}

const generateRandomColor = () => {
  return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
}

const cellEvents = (cell) => {
  cell.addEventListener('pointerdown', (e) => {
    if (colorSelection === 'black') {
      e.target.style.backgroundColor = 'black';
    } else if (colorSelection === 'rgb') {
      e.target.style.backgroundColor = generateRandomColor();
    } else if (colorSelection === 'erase') {
      e.target.style.backgroundColor = '#FFFFFF';
    }
  });

  cell.addEventListener('pointerover', (e) => {
    if (brushOn === true) {
      if (colorSelection === 'black') {
        e.target.style.backgroundColor = 'black';
      } else if (colorSelection === 'rgb') {
        e.target.style.backgroundColor = generateRandomColor();
      } else if (colorSelection === 'erase') {
        e.target.style.backgroundColor = '#FFFFFF';
      }
    }
  });

  //finds the real element under a touchmove event 
  cell.addEventListener('touchmove', (e) => {
    let locX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    let locY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
    let realTarget = document.elementFromPoint(locX, locY);
    if (realTarget.className === 'cells') {
      if (colorSelection === 'black') {
        realTarget.style.backgroundColor = 'black';
      } else if (colorSelection === 'rgb') {
        realTarget.style.backgroundColor = generateRandomColor();
      } else if (colorSelection === 'erase') {
        realTarget.style.backgroundColor = '#FFFFFF';
      }
    }
  })
};

const resetAndPrompt = () => {
  let promptMsg = "Enter Grid Size";
  gridSize = parseInt(prompt(promptMsg));
  container.textContent = '';
  if (!gridSize || typeof gridSize !== 'number' || gridSize < 1) {
    cellFactory(16);
  } else if (gridSize > 100) {
    cellFactory(100);
  } else {
    cellFactory(gridSize);
  }
}

const mainFunction = () => {
  gridWrapper.addEventListener('pointerdown', ifClicked);
  gridWrapper.addEventListener('pointerup', () => brushOn = false);
  resetButton.addEventListener('click', resetAndPrompt);
  blackButton.addEventListener('pointerdown', () => colorSelection = 'black');
  rgbButton.addEventListener('pointerdown', () => colorSelection = 'rgb');
  eraseButton.addEventListener('pointerdown', () => colorSelection = 'erase');
  cellFactory(gridSize);
}

mainFunction();