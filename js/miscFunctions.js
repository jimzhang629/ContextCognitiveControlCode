/**
 * declares the canvas and context, and also can set the font and text alignment too
 */
function prepareTaskCanvas() {
    canvas = document.getElementById('taskCanvas');
    ctx = canvas.getContext('2d');

    // don't know if I need these
    // ctx.font = "bold 60px Arial";
    ctx.textBaseline= "middle";
    ctx.textAlign="center";
}

// Fisher-Yates shuffle
function shuffle(array){
    for(let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }

function randIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isEven(n) {return n % 2 == 0;}
// let isEven = (n) => n % 2 == 0;

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function showCanvas(){
  canvas.style.display = "inline-block";
  $("#taskCanvas").show();
}

function hideCanvas(){
  $("#taskCanvas").hide();
}

function hideCursor(){
    document.body.style.cursor = 'none';
}

function showCursor(){
  document.body.style.cursor = 'auto';
}

function changeScreenBackgroundTo(color){
  window.document.body.style.backgroundColor = color;
}

/** clears (if true) the canvas for next task and sets the font and style
 * 
 * @param {um string?} font 
 * @param {also string?} fillStyle 
 * @param {boolean} clear
 */
function resetCanvas(font, fillStyle, clear = true){
  if (clear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  ctx.font = font;
  ctx.fillStyle = fillStyle;
}

// checks if array with two things has equal numbers of them
function equalCounts(arr){
  map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  return [...map.values()][0] == [...map.values()][1];
}

function decimalToPercent(decimal){
  return Math.round(decimal * 100 * 100) / 100;
}

/** getTargetSize takes an image.src and returns the flanker size
 * 
 * @param {string} src : filepath to an image named as M#.jpg or N#.jpg, where even # is smaller and odd # is larger
 * @returns 's' or 'l', according to image flanker size
 */
function getTargetSize(src){

  let num = src.match(/\d/g);
  num = num.join('');

  if(src.indexOf('images/') === -1) {
    throw 'Please source to an image in the images subfolder.'
  }

  // does same thing as commented out code below, need to test this though!
  else if (isEven(num)) {
    return 's';
  }

  // else if (num % 2 === 0) {
  //   return 's'
  // }

  else {
    return 'l';
  }
}