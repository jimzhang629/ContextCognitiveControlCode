/** displays an image located at filePath on a canvas 
 * @param {Image} centerImg : the target Image object that you want to display in the center of the screen
 * @param {string} loc : 'center','top', or 'bottom'. Screen location to display trial.
 * @param {string} flankerSize : 'small' or 'large'. Size of flanker relative to center image.
*/

// let flankerSize = 'small';
//git test

//maybe do this by shifting the canvas up and down instead of the image.
function draw(centerImg, loc='center', flankerSize='small') {
    // these are all half the size of the original image
    let scaleRatio, cImgScaledW, cImgScaledH, flankerScaledW, flankerScaledH, leftCenterImg, leftFlanker;

    scaleRatio = 0.5;
    cImgScaledW = centerImg.width * scaleRatio;
    cImgScaledH = centerImg.height * scaleRatio;

    if (flankerSize === 'large') {
      flankerScaledW = basketballImg.width * scaleRatio * 1.2; 
      flankerScaledH = basketballImg.height * scaleRatio * 1.2;
    }

    else if (flankerSize === 'small') {
      flankerScaledW = basketballImg.width * scaleRatio * 0.5; 
      flankerScaledH = basketballImg.height * scaleRatio * 0.5;
    }

    else {
      throw "Please define flankerSize as small or large."
    }

    leftCenterImg = canvas.width/2 - cImgScaledW/2;
    leftFlanker = leftCenterImg/2 - flankerScaledW/2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw center img in the center of the canvas

    if (loc === 'center') {
      ctx.drawImage(centerImg, leftCenterImg, canvas.height/2 - cImgScaledH/2, width=cImgScaledW, height=cImgScaledH);
      //draw a flanker at 1/4 of canvas width and at 3/4 of canvas width
      ctx.drawImage(basketballImg, leftFlanker, canvas.height/2 - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
      ctx.drawImage(basketballImg, canvas.width - leftFlanker - flankerScaledW, canvas.height/2 - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
    }

    else if (loc === 'bottom') {
      // draw on bottom, centered at 3/4 of canvas height
      ctx.drawImage(centerImg, leftCenterImg, canvas.height*(3/4) - cImgScaledH/2, width=cImgScaledW, height=cImgScaledH);
      ctx.drawImage(basketballImg, leftFlanker, canvas.height*(3/4) - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
      ctx.drawImage(basketballImg, canvas.width - leftFlanker - flankerScaledW, canvas.height*(3/4) - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
    }

    else if (loc === 'top') {
      // draw on top, centered at 1/4 of canvas height
      ctx.drawImage(centerImg, leftCenterImg, canvas.height/4 - cImgScaledH/2, width=cImgScaledW, height=cImgScaledH);
      ctx.drawImage(basketballImg, leftFlanker, canvas.height/4 - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
      ctx.drawImage(basketballImg, canvas.width - leftFlanker - flankerScaledW, canvas.height/4 - flankerScaledH/2, width=flankerScaledW, height=flankerScaledH);
    }
  }


function fixationScreen(){
    resetCanvas("85px Arial", "black", true);
    ctx.fillText("+",canvas.width/2,canvas.height/2);
    setTimeout(stimScreen, fixInterval);
  }
  
function stimScreen(){
    stimOnset = new Date().getTime() - runStart;
    resetCanvas("45px Arial", "black", true)
    // prepare for response
    keyListener = 1; acc = NaN, respTime = NaN, partResp = NaN, respOnset = NaN;

    // display corresponding flanker for this trial, depending on target image size and congruency
    drawMapping = {
      'c': {
        's': "large",
        'l': "small"
      },
      'i': {
        's': "small",
        'l': "large"
      }
    }
    
  //for the test block, alternate between repeat trials and novel trials

  if(block===nBlocks){
    console.log('final block!');
    if (repeat) {
      trialImg = _.sample(testArray); //choose random testArray image to draw

      //remove this trial image from testArray so it doesn't get repeated again
      idx = testArray.indexOf(trialImg);
      testArray.splice(idx, 1);
      console.log('chosen from testArray');
    }


    else {
      trialImg = _.sample(novelArray); //choose random novelArray image to draw

      //remove this trial image from novelArray so it doesn't get repeated..
      idx = novelArray.indexOf(trialImg);
      novelArray.splice(idx,1);
      console.log('chosen from novelArray');
    }
    trialImg.loc = 'center'; //draw all the repeats in the center of the screen

    repeat = !repeat; //alternate between repeated trials and novel trials.
    console.log(repeat);
  }

  //for practice exp stage, as well as learning blocks, can just draw based on trialCount
  else{
    trialImg = imageSet[trialCount-1];
  }

  //draw the trial image. Remember that this is actually an object defined in images.js.
  draw(trialImg.img, loc=trialImg.loc, flankerSize=drawMapping[trialImg.con][getTargetSize(trialImg.img.src)]);
  //proceed to iti after delay
  stimTimeout = setTimeout(itiScreen, stimInterval);
}

function itiScreen(){
    if (keyListener == 1) { // participant didn't respond
      keyListener = 0;
    } else if (keyListener == 2) { //participant still holding down response key
      keyListener = 3;
    }
  
    // log data 
    if (sectionType == "practiceTask") {
      logPracticeTask();
      
    } else {
      logMainTask();
    }
    
    // display feedback for practice task 
    resetCanvas("60px Arial", "black", true);
    ctx.fillText(accFeedback(), canvas.width/2,canvas.height/2);

    // trial finished. iterate and proceed to next
    trialCount++; blockTrialCount++;
    console.log('trialCount is ' + trialCount);
    setTimeout(taskFunc, itiInterval(itiMin, itiMax, itiStep));
  }
  
  function practiceTrialFunc(){
    // (re)set sectionType (might have been changed to block break)
    sectionType = "practiceTask";
  
    // if task is over, proceed back to next instruction
    if (trialCount > nPracticeTrials) {
      // checks if you did well enough on practice task to move forward
      if (decimalToPercent(accCount / nPracticeTrials) >= practiceAccCutoff) {
        trialCount = 1; //reset trialCount to 1 for the main task
        navigateInstructionPath();
      } else {
      //if you failed, try again
        practiceAccuracyFeedback(decimalToPercent(accCount / nPracticeTrials));
      }

      return;
    }
  
    // person is still holding down key from previous trial, tell them to let go
    if (keyListener == 3){
      promptLetGo();
      return;
    }
  
    // if they minimized the screen, tell them its too small.
    if (!screenSizeIsOk()){
      promptScreenSize();
      return;
    }
  
    // none of the above happened, proceed to trial
    breakOn = false;
    fixationScreen();
  }
  
function defaultStyle(){
    resetCanvas("45px Arial", "black", false)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
  }
  
function accFeedback(){
    if (acc == 1){
      return "Correct";
    } else if (acc == 0) {
      return "Incorrect";
    } else {
      return "Too Slow";
    }
  }
  
function accFeedbackColor(){
    if (acc == 1){
      return "green";
    } else if (acc == 0) {
      return "red";
    } else {
      return "black";
    }
  }
  
function itiInterval(min, max, jitter){
    // creates random ITI interval in range from min to max (inclusive) with step size jitter
    let itiMin = (speed == "fast") ? 20 : min; //1200
    let itiMax = (speed == "fast") ? 20 : max; //1400
    let itiStep = jitter; //step size
    // random number between itiMin and Max by step size
    return itiMin + (Math.floor( Math.random() * ( Math.floor( (itiMax - itiMin) / itiStep ) + 1 ) ) * itiStep);
  }
  
function countDown(seconds){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 80px Arial";
    if (seconds > 0){
      ctx.fillText(seconds,canvas.width/2,canvas.height/2)
      setTimeout(function(){countDown(seconds - 1)},1000);
    } else {
      taskFunc();
    }
  }

/** bad way of making them wait after a block
 * 
 * @param {*} seconds 
 */
function countDownEndOfBlock(seconds){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 80px Arial";
    if (seconds > 0){
      ctx.fillText(seconds,canvas.width/2,canvas.height/2)
      setTimeout(function(){countDownEndOfBlock(seconds - 1)},1000);
    } else {
      fixationScreen();
    }
}

function practiceAccuracyFeedback(accuracy){
    sectionStart = new Date().getTime() - runStart;
    sectionType = "pracFeedback";
  
    // prepare canvas
    resetCanvas("30px Arial", "black", true)
    keyListener = 5;
    repeatNecessary = true;
  
    // display feedback text
    ctx.fillText("You got " + accuracy + "% correct in this practice block.",canvas.width/2,canvas.height/2 - 50);
    ctx.fillText("Remember, you need to get >" + practiceAccCutoff + "%.",canvas.width/2,canvas.height/2);
    ctx.fillText("Press any button to go back ",canvas.width/2,canvas.height/2 + 80);
    ctx.fillText("to the instructions and try again.",canvas.width/2,canvas.height/2 + 110);
  }
  
function getAccuracy(accValue){
    //normalizes accuracy values into 0 or 1 (NaN becomes 0)
    return accValue == 1 ? 1 : 0;
  }
  
function promptLetGo(){
    //prepare canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
  
    // show warning
    ctx.fillText("Please release key",canvas.width/2,canvas.height/2);
    ctx.fillText("immediately after responding.",canvas.width/2,canvas.height/2 + 30);
  
    // key listener
    keyListener = 4;
  }
  
function screenSizeIsOk(){
    // attempts to check window width and height, using first base JS then jquery.
    // if both fail, returns TRUE
    let w, h, minWidth = 800, midHeight = 600;
    try {
      // base javascript
      w = window.innerWidth;
      h = window.innerHeight;
      if (w == null | h == null) {throw "window.innerWidth/innerHeight failed.";}
    } catch (err) {
      try{
        // jquery
        w = $(window).width();
        h = $(window).height();
        if (w == null | h == null) {throw "$(window).width/height failed.";}
      } catch (err2) {
        // failure mode, returns true if both screen checks failed
        return true;
      }
    }
    // return dimension check if values are defined
    return w >= minWidth && h >= midHeight;
  };
  
  let screenSizePromptCount = 0;
  let nScreenSizeWarnings = 2;

function promptScreenSize(){
    // set key press experiment type
    keyListener = 4;
  
    // prepare canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
  
    // allows up to two warnings before terminating experiment
    if (screenSizePromptCount < nScreenSizeWarnings) {
      screenSizePromptCount++;
  
      // display screen size prompt
      ctx.font = "25px Arial";
      ctx.fillText("Your screen is not full screen or the",canvas.width/2,canvas.height/2);
      ctx.fillText("screen size on your device is too small.",canvas.width/2,(canvas.height/2) + 40);
      ctx.fillText("If this issue persists, you will need",canvas.width/2,(canvas.height/2)+160);
      ctx.fillText("to restart the experiment and will ",canvas.width/2,(canvas.height/2)+200);
      ctx.fillText("not be paid for your previous time.",canvas.width/2,(canvas.height/2)+240);
      ctx.font = "bold 25px Arial";
      ctx.fillText("Please correct this and press any button to continue.",canvas.width/2,(canvas.height/2)+100);
  
    } else {
  
      // display screen size prompt
      ctx.fillText("Your screen is not full screen",canvas.width/2,canvas.height/2);
      ctx.fillText("or the screen size on your device is too small.",canvas.width/2,(canvas.height/2)+50);
      ctx.font = "bold 25px Arial";
      ctx.fillText("Please refresh the page to restart the experiment.",canvas.width/2,(canvas.height/2)+100);
  
    }
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