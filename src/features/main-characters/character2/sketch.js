let saveButton;

function setup() {
  createCanvas(800, 600);
  background(210);
  // Your character design code here
  // For example, let's draw a simple character
  drawWaterGirl(width / 2, height / 2);
  
  // Create a button to save the canvas
  saveButton = createButton('Save Character');
  saveButton.position(10, 10);
  saveButton.mousePressed(saveCharacter);
}

function drawWaterGirl(x, y) {
  noStroke();
  
  
  fill("#C2592A");
  rect(430,420,20,100)
  rect(330,420,20,100)
  rect(330,420,100,20)
  
  
  
  fill("#F0C49D");
  rect(340,150,120,50);
  rect(350,180,110,50);
  fill("#D3A38C");
  rect(360,200,10,30);
  rect(350,190,10,10);
  rect(340,150,10,50);
  rect(340,150,80,10);
  
  fill("#363495");
  rect(340,230,30,190);
  rect(310,260,30,50);
  rect(330,250,10,10);
  
  
  fill("#494FC1");
  rect(370,230,80,190);
  rect(460,230,20,90);
  rect(300,310,40,10);
  rect(330,400,10,20)
  
  
  fill("#F0C49D");
  rect(460,320,20,100);
  rect(300,320,40,80);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  fill("black");
  rect(360,90,80,10);
  rect(350,100,100,50);
  rect(340,110,120,40);
  rect(330,120,140,10);
  rect(330,120,90,30);
  rect(330,120,10,70);
  rect(340,190,10,10);
  rect(460,130,10,20);
  rect(440,150,60,30);
  rect(420,150,50,20);
  rect(460,180,10,20);
  rect(450,200,10,30);
  rect(360,230,110,10);
  rect(350,200,10,30);
  rect(350,200,10,30);
  rect(340,230,10,10);
  rect(330,240,10,10);
  rect(320,250,10,10);
  rect(310,260,10,10);
  rect(300,270,10,130);
  rect(310,400,20,10);
  rect(330,350,10,50);
  rect(470,230,20,10);
  rect(450,240,10,280);
  rect(460,130,20,20);
  rect(480,240,10,170);
  rect(460,410,20,10);
  rect(420,510,30,10);
  rect(420,440,10,80);
  rect(320,400,10,120);
  rect(320,510,40,10);
  rect(350,440,10,80);
  rect(350,440,70,10);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}

function saveCharacter() {
  saveCanvas('character', 'png'); // Saves the canvas as character.png
}
