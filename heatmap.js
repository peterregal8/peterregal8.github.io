let table;
let artists = [];
let artistsList = [];

function preload() {
  table = loadTable('SpotifyGenres.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let artist = table.getString(i, 'Artist');
    let genre = table.getString(i, 'Genre');
    let numSongs = table.getNum(i, 'Number of Songs');
    artists.push({ artist: artist, genre: genre, numSongs: numSongs });
  }

  for (let i = 0; i < table.getRowCount(); i += 9) {
    let artist = table.getString(i, 'Artist');
    artistsList.push({ artist: artist});
  }
}

function draw() {
  background(240);
  
  let mL = 150, mR = 40, mT = 60, mB = 100;
  let pW = width - mL - mR;
  let pH = height - mT - mB;
  
  textSize(18);
  textAlign(CENTER);
  text("Frequency of Genres Among Artists in 2025", width / 2, 25);

  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("Genre", mL + pW / 2, height - 60);
  
  textSize(10);
  for (let i = 0; i < 9; i++) {
    let x = mL + i * 60;
    text(artists[i].genre, x + 30, height - mB - 5);
    stroke(0);
    strokeWeight(1);
    line(x, mT, x, height - mB - 20);
    noStroke();
  }
  stroke(0);
  line(mL + 540, mT, mL + 540, height - mB - 20);

  for (let i = 0; i < artistsList.length; i++) {
    let y = mT + i * 16;
    stroke(0);
    strokeWeight(1);
    line(mL, y, 690, y);
  
    noStroke();

    fill(0);
    textSize(10);
    textAlign(RIGHT, CENTER);
    text(artistsList[i].artist, mL - 2, y + 8);
  }
  stroke(0);
  line(mL, 380, pW - 20, 380);
  
  let x = mL;
  let y = 60;
  for (let i = 0; i < artists.length; i++) {
    if (i > 0 && i % 9 == 0) {
      x = mL;
      y += 16;
    }
    let val = artists[i].numSongs;
    fill(247, 69, 69, val * 60);
    rect(x, y, 60, 16);
    x += 60;
  }

  fill(0);
  noStroke();
  textSize(12);
  textAlign(CENTER);
  text("Artist", mL - 100, pH / 2 + 40);
  
  noLoop();
}
