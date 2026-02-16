let prices = [];
let allLists = [];
let startValue = 250000;
let maxVal = 600000;
let binWidth = 50000;

function preload() {
  table = loadTable('lamborghini_sales_2020_2025.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let name = table.getString(i, 'Model');
    let price = table.getNum(i, 'Base Price (USD)');
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
  text("Distribution of Lamborghini Model Prices from 2020 to 2025", width / 2, 25);
  
  stroke(0);
  strokeWeight(1);
  line(left, height - bottom, left, top);
  line(left, height - bottom, width - right - 100, height - bottom);
  line(width - right - 100, height - bottom, width - right - 100, top);

  noStroke();
  textSize(12);
  let numYLines = (maxVal - startValue) / binWidth;
  let yStep = (height - 200) / numYLines;
  let y = height - 125;
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
    let minVal, maxVal, median, firstQ, thirdQ = 0;
    let currentList = [];
    for (let j = 0; j < allLists[i].length; j++) {
      currentList.push(allLists[i][j].price);
    }
    currentList.sort();
    minVal = currentList[0];
    maxVal = currentList[currentList.length - 1];
    if (currentList.length % 2 == 1) {
      let medianIndex = floor(currentList.length / 2);
      median = currentList[medianIndex];
      firstQ = currentList[floor(medianIndex / 2)];
      thirdQ = currentList[((currentList.length - 1) + (medianIndex + 1)) / 2];
    } else {
      let medianFirst = (currentList.length / 2) - 1;
      let medianSecond = (currentList.length / 2);
      median = (currentList[medianFirst] + currentList[medianSecond]) / 2;
      if (medianFirst % 2 == 1) {
        let meddFirst = floor(medianFirst / 2);
        let meddSecond = meddFirst + 1;
        firstQ = (currentList[meddFirst] + currentList[meddSecond]) / 2;
        let meddThird = floor((currentList.length - 1 + medianSecond) / 2);
        let meddFourth = meddThird + 1;
        thirdQ = (currentList[meddThird] + currentList[meddFourth]) / 2;
      } else {
        firstQ = currentList[medianFirst / 2];
        thirdQ = currentList[((currentList.length - 1) + (medianSecond)) / 2];
        let medFirst = (medianFirst / 2) - 1;
        let medSecond = (medianFirst / 2);
      }
    }
    
    stroke(0);
    let minY = map(minVal, 214000, 625000, height - bottom, top);
    let firstY = map(firstQ, 214000, 625000, height - bottom, top);
    let medianY = map(median, 214000, 625000, height - bottom, top);
    let thirdY = map(thirdQ, 214000, 625000, height - bottom, top);
    let maxY = map(maxVal, 214000, 625000, height - bottom, top);
    line(x + 20, minY, x + xStep - 20, minY);
    line((x + x + xStep) / 2, minY, (x + x + xStep) / 2, firstY);
    line(x + 10, firstY, x + xStep - 10, firstY);
    line(x + 10, thirdY, x + xStep - 10, thirdY);
    line(x + 10, firstY, x + 10, thirdY);
    line(x + xStep - 10, firstY, x + xStep - 10, thirdY);
    fill(247, 69, 69);
    rect(x + 10, thirdY, xStep - 20, firstY - thirdY);
    fill(0);
    line(x + 10, medianY, x + xStep - 10, medianY);
    line((x + x + xStep) / 2, thirdY, (x + x + xStep) / 2, maxY);
    line(x + 20, maxY, x + xStep - 20, maxY);
    
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
  text("Base Price (USD)", 0, 0);
  line(0, 0, 150, 0);
  pop();
  stroke(0);
  strokeWeight(1);
  line(left, height - bottom, left, top);
  line(left, top, width - right - 100, top);
  
  noLoop();
  
}
