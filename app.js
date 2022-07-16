localStorage.clear(); 
sessionStorage.clear(); 
const gridWrapper = document.querySelector('.grid-wrapper');
const container = document.querySelector('.container');
const blackButton = document.querySelector('#blackButton');
const rgbButton = document.querySelector('#rgbButton');
const eraseButton = document.querySelector('#eraseButton');
const clearButton = document.querySelector('#clearButton');
const sliderContainer = document.querySelector('.slidecontainer');
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.textContent = `16 X 16`;
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

const determineCurrentColor = (eventTarget) => {
  if (colorSelection === 'black') {
    eventTarget.style.backgroundColor = '#000000';
  } else if (colorSelection === 'rgb') {
    eventTarget.style.backgroundColor = generateRandomColor();
  } else if (colorSelection === 'erase') {
    eventTarget.style.backgroundColor = '#FFFFFF';
  }
}

const cellEvents = (cell) => {
  cell.addEventListener('pointerdown', (e) => {
    determineCurrentColor(e.target);
  });

  cell.addEventListener('pointerover', (e) => {
    if (brushOn === true) {
      determineCurrentColor(e.target);
    }
  });

  //finds the real element under a touchmove event 
  cell.addEventListener('touchmove', (e) => {
    let locX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    let locY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
    let realTarget = document.elementFromPoint(locX, locY);
    if (realTarget.className === 'cells') {
      determineCurrentColor(realTarget);
    }
  })
};


const mainFunction = () => {
  gridWrapper.addEventListener('pointerdown', ifClicked);
  gridWrapper.addEventListener('pointerup', () => brushOn = false);
  blackButton.addEventListener('pointerdown', () => colorSelection = 'black');
  rgbButton.addEventListener('pointerdown', () => colorSelection = 'rgb');
  eraseButton.addEventListener('pointerdown', () => colorSelection = 'erase');
  clearButton.addEventListener('pointerdown', () => {
    container.textContent = '';
    cellFactory(gridSize);
  });
  slider.addEventListener('input', e => {
    gridSize = e.target.value;
    output.textContent = `${gridSize} X ${gridSize}`
    container.textContent = '';
    cellFactory(gridSize);
  });
  cellFactory(gridSize);
}

mainFunction();