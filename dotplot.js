let table;
let artists = [];

function preload() {
  table = loadTable('Top100SpotifySongs.csv', 'csv', 'header');
}


function setup() {
  createCanvas(900, 500);
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let artist = table.getString(i, 'Artist');
    let streams = table.getNum(i, 'Spotify_Streams_Millions');
    artists.push({ artist: artist, streams: streams });
    artists.sort(function(a, b){return b.streams - a.streams});
  }
  
}

function draw() {
  background(240);

  let mL = 150, mR = 40, mT = 60, mB = 100;
  let pW = width - mL - mR;
  let pH = height - mT - mB;

  let max = Math.ceil(artists[0].streams / 1000) * 1000;
  let step = (pH / artists.length);
  let barH = step * 0.5;

  textSize(18);
  textAlign(CENTER);
  text("Streams (in Millions) of the Top 20 Spotify Artists of 2025", width / 2, 25);

  stroke(0);
  strokeWeight(1);
  line(mL, height - mB, width - mR, height - mB);

  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  let numTicks = max / 1000;
  for (let i = 0; i <= numTicks; i++) {
      let val = (max / numTicks) * i;
      let x = map(val, 0, max, mL, width - mR);
      text(Math.round(val), x, height - mB + 8);
      stroke(215);
      strokeWeight(1);
      line(x, mT, x, height - mB);
      noStroke();
  }
  
  stroke(0);
  strokeWeight(1);
  line(mL, height - 100, mL, 50);

  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("Spotify Streams (Millions)", mL + pW / 2, height - 50);

  for (let i = 0; i < artists.length; i++) {
      let y = mT + i * step;
      let w = map(artists[i].streams, 0, max, 0, pW);
      stroke(215);
      strokeWeight(1);
      line(mL, y, width - mR, y);
      
      fill(247, 69, 69);
      noStroke();
      circle(w + mL, y, 8);

      fill(0);
      textSize(10);
      textAlign(RIGHT, CENTER);
      text(artists[i].artist, mL - 2, y + barH / 2);
  }

  textSize(12);
  textAlign(CENTER);
  text("Artist", mL - 100, pH / 2);
  
}
