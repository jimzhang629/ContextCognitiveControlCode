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
 * @param {string} font 
 * @param {string} fillStyle 
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

/** removes first occurrence of target value from array
 * 
 * @param {array} arr : the array from which to remove the target value 
 * @param {value} target : the value that will be removed from the array
 * @returns {array} arr : the modified array without the first occurrence of the target value
 */
function removeFirst(arr, target) {
  let idx = arr.indexOf(target);
  if (idx > -1) {
    arr.splice(idx,1);
  }

  return arr;
  }


/** ContainsConsecutiveValue checks if a numerical array contains any consecutive values.
 * @param {array}
 * @returns {boolean} : true if array contains any consecutive values
 */
function ContainsConsecutiveValue(array){
  array = array.sort((a,b)=>a-b);
  let i = 1, d;
  while (i < array.length) {
    d = array[i] - array[i-1];
    if (Math.abs(d) === 1) {
      return true;
    }
    i++;
  }
  return false;
}