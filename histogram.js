let prices = new Map();
let startValue = 200000;
let binWidth = 50000;

function preload() {
  table = loadTable('lamborghini_sales.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);
  
  let startValue = 200000;
  let endValue = 600000;
  let binWidth = 50000;
  for (let i = 0; i < (endValue - startValue) / binWidth; i++){
    prices.set(i, 0);
  }
  for (let i = 0; i < table.getRowCount(); i++) {
    let price = table.getNum(i, 'Base Price (USD)');
    let binIndex = floor((price - startValue) / binWidth);
    if (prices.has(binIndex)) {
      prices.set(binIndex, prices.get(binIndex) + 1);
    } else {
      prices.set(binIndex, 1);
    }
  }
  
  const sortedPrices = new Map([...prices.entries()].sort((a, b) => { return a[0] - b[0]; }));
  
  
}

function draw() {
  background(220);
  
  let top = 50;
  let left = 100;
  let right = 50;
  let bottom = 100;
  
  let graphWidth = width - left - right;
  let graphHeight = height - top - bottom;
  
  textSize(18);
  textAlign(CENTER);
  text("Distribution of Lamborghini Model Prices from 2020 to 2025", width / 2, 25);

  stroke(0);
  strokeWeight(1);
  line(left, height - bottom, left, top);
  
  let numLines = prices.size + 1;
  let xStep = ((width - left) / numLines);
  let x = left + 30;
  
  let maxVal = 0;
  for (let i = 0; i < prices.size; i++) {
    if (prices.get(i) >= maxVal) {
      maxVal = prices.get(i);
    }
  }
  
  fill(0, 0, 0);
  numLines = maxVal;
  let yStep = (graphHeight - 10) / numLines;
  let y = height - bottom;
  
  noStroke();
  textSize(12);
  for (let i = 0; i < numLines + 1; i+=2) {
    let val = i;
    text(val, left - 20, y + 3);
    stroke(200);
    strokeWeight(1);
    line(left + 1, y, width - right, y);
    y -= yStep * 2;
  }

  noStroke();
  textSize(12);
  for (let i = 0; i < numLines; i++) {
    fill(0, 0, 0)
    let val = startValue + (i * binWidth);
    text(val, x, height - bottom + 20);
    stroke(200);
    strokeWeight(1);
    line(x, height - bottom, x, top);
    fill(247, 69, 69);
    rect(x, (height - bottom) - prices.get(i) * 19, xStep, prices.get(i) * 19);
    x += xStep;
  }
  
  
  stroke(0);
  line(left, height - bottom, width - right, height - bottom);
  
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("Base Price (USD)", width - graphWidth / 1.75, height - 50);
  angleMode(DEGREES);
  push();
  let angle2 = 270;
  translate(left - 45, height - graphHeight / 1.25);
  rotate(angle2);
  text("Count", 0, 0);
  line(0, 0, 150, 0);
  pop();
  
  noLoop();
  
}
