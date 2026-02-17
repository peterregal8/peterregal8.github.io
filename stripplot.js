let prices = [];
let allLists = [];
let startValue = 0;
let maxVal = 6000;
let binWidth = 1000;

function preload() {
  table = loadTable('lamborghini_sales.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let name = table.getString(i, 'Model');
    let price = table.getNum(i, 'Sales Volume');
    prices.push({ name: name, price: price});
  }
  prices.sort((a, b) => {return a.name.localeCompare(b.name);});
  
  let currList = [];
  let currName = prices[0].name;
  for (let i = 0; i < prices.length; i++) {
    let name = prices[i].name;
    let price = prices[i].price;
    if (name !== currName) {
      allLists.push(currList);
      currList = [];
      currName = name;
    }
    currList.push({ name: name, price: price});
  }
  allLists.push(currList);
  
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
  text("Distribution of Lamborghini Sales Volumes from 2020 to 2025", width / 2, 25);
  
  stroke(0);
  strokeWeight(1);
  line(left, height - bottom, left, top);
  line(left, height - bottom, width - right - 100, height - bottom);
  line(width - right - 100, height - bottom, width - right - 100, top);

  noStroke();
  textSize(12);
  let numYLines = (maxVal - startValue) / binWidth;
  let yStep = (height - 200) / numYLines;
  let y = height - bottom - 20;
  for (let i = 0; i < numYLines + 1; i++) {
    let val = startValue + (i * binWidth);
    text(val, left - 23, y);
    stroke(200);
    line(left, y - 5, width - right - 100, y - 5);
    y -= yStep;
  }
  
  textSize(12);
  let numLines = allLists.length + 1;
  let xStep = graphWidth / numLines;
  let x = left;
  
  for (let i = 0; i < numLines - 1; i++) {
    stroke(0);
    line(x, height - bottom, x, top);
    noStroke();
    text(allLists[i][0].name, x + 55, height - bottom + 20);
    let currentList = [];
    for (let j = 0; j < allLists[i].length; j++) {
      let vol = allLists[i][j].price;
      let y = map(vol, -450, 6450, height - bottom, top);
      let xPos = random(x + 40, x + xStep - 40);
      fill(247, 69, 69);
      stroke(0);
      circle(xPos, y, 5);
      fill(0);
    }
    x += xStep; 
  }


  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("Model", width - graphWidth / 1.6, height - 50);
  angleMode(DEGREES);
  push();
  let angle2 = 270;
  translate(left - 60, height - graphHeight / 1.25);
  rotate(angle2);
  text("Sales Volume", 0, 0);
  line(0, 0, 150, 0);
  pop();
  stroke(0);
  strokeWeight(1);
  line(left, height - bottom, left, top);
  line(left, top, width - right - 100, top);
  
  noLoop();
  
}
