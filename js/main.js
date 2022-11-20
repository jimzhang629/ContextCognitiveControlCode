// QOL parameters
let expStage = "prac1"; //first expStage, see instructions.js
let speed = "normal"; //speed of experiment: fast or normal

// ----- Global Variables  ----- //
let nLearnBlocks = 2; //this should prob be 2, but we might play with it.
let nTestBlocks = 1;
let trialsPerBlock = 3;
let nBlocks = nLearnBlocks + nTestBlocks; //this should always be 3 for this experiment I think..

let trialsPerLearnBlock = 3; //this is kinda redundant with trialsPerBlock rn but might use it in the future.
let trialsPerTestBlock = 3; //this can be changed if we want, I think.
let repeatTrialsPerCondition = 1;
let repeat = true; //first trial of test block is a repeat trial drawn from testArray

  if(repeatTrialsPerCondition > Math.floor(1+trialsPerLearnBlock/2)){
    throw('Too many repeat trials, please lower repeatTrialsPerCondition in main.js');
  }

let stimInterval = (speed == "fast") ? 10 : 2500;
let fixInterval = (speed == "fast") ? 10 : 500;
let itiMin = (speed == "fast") ? 10 : 1200;
let itiMax = (speed == "fast") ? 10 : 1400;
let itiStep = 50;
let trialInput;
// let delayBtwnBlocks = 10;

// for practice task
let nPracticeTrials = 1;
let practiceConProp = 0.5; // 50% congruency for practice
let practiceAccCutoff = 0; // this is the percentage of practice trials you need to get right to move on to main task

// for main task
let conArray, locArray;
let nRepeatTrials = 1; //how many trials from the learning blocks to reinstate in the test block
let repeatArray;
let testArray;
let repeatLog; //variable for if this trial was a repeat, and if so, which trial was it a repeat of

// trial level information (default to lowest value)
let trialCount = 1, blockTrialCount = 1, block = 1, accCount = 0;

//other global vars
let canvas, ctx; // global canvas variable
let sampleSize = nPracticeTrials + nBlocks * trialsPerBlock; //might need to subtract the number of repeat trials from this, but don't see the harm in grabbing extra images
let taskFunc, transitionFunc, stimFunc, taskName;
let acc, stimOnset, respOnset, respTime, partResp, runStart;
let stimTimeout, breakOn = false, repeatNecessary = false, data=[];
let sectionStart, sectionEnd, sectionType, sectionTimer;
let keyListener = 0; // see below

let blockOrder = getBlockOrder(randIntFromInterval(1,4));
let blockLetter;
let trialImg; //use this for data logging which image wrapper is displayed on this trial

// see counterbalancing.js for block order stuff. Define getBlockOrder in some other function.

function experimentFlow(){
    trialCount = 1;
    blockTrialCount = 1;
    if (!repeatNecessary) {
      block = 1;
    } else {
      block++;
    }
    accCount = 0;
    repeatNecessary = false;
    
    // I only have one practice task and one main task, so don't need all this stuff
    // also only two blocks
    // make a practice task though, and test using it

    if (expStage.indexOf("prac1") != -1){
      contextFlankerPracticeTask();
    } else if (expStage.indexOf("main1") != -1){
      contextFlankerMainTask();
    }
    else if (expStage.indexOf('final') != -1){
      endOfExperiment(); //untested
    }
  }
  
  function startExperiment(){
    prepareTaskCanvas();
  
    // create key press listener
    $("body").keypress(
      function(event){keyPressListener(event)}
    );
  
    // create key release listener
    $("body").keyup(
      function(event){keyReleaseListener(event)}
    );
  
    // start experiment
    runStart = new Date().getTime();
    runInstructions();
  }
  
  function endOfExperiment(){
    // hide stuff, show cursor
    hideInstructions();
    hideCanvas();
    showCursor();
  
    // upload data to menu.html's DOM element
    $("#RTs").val(data.join(";"));
    
    // need to get the updateMainMenu function working first before doing this
    // show debriefing script from experimentWrapper.js
    updateMainMenu(nextForm());
    
  }

  function getAccuracyAndRT(partResp){
    // determine reaction time
    respTime = respOnset - stimOnset;
  
    // determine accuracy
    // [83,115] - s and [76,108] - l

    //because using img wrapper object, need to use imageSet[].img.src instead of just imageset[].src

    if (getTargetSize(imageSet[trialCount-1].img.src) == 's') { //if it's a small image, then press z
      acc = ([83, 115].indexOf(event.which) != -1) ? 1 : 0;
    } else {
      acc = ([76, 108].indexOf(event.which) != -1) ? 1 : 0; //if large image, press m
    }
  
    // update acc count
    if (acc == 1){accCount++;}
  }
     /** key-value meanings
     * 0: default keyPressListener
     * 1: key press during task
     * 2: default keyReleaseListener
     * 3: they kept holding from last trial, prompt them to let go
     * 4:
     * 5:
     * 6:
     * 7:
     * 8: this is keypress for start task?
     * 9:
     */
    
  function keyPressListener(event){

    // unnecessary key press
    if (keyListener == 0) {
      keyListener = 3;
      return
    }
  
    //key press during task when expected
    if (keyListener == 1) {
      keyListener = 2;
      partResp = event.which;
      respOnset = new Date().getTime() - runStart;
      getAccuracyAndRT(partResp);
    }
  }

  function keyReleaseListener(event){
    // expected key press during task
    if (keyListener == 2){
      keyListener = 0;
      clearTimeout(stimTimeout);
      transitionFunc();
      return;
    }
  
    // key press that was held too long
    if (keyListener == 3) {
      keyListener = 0;
      return;
    }
  
    // returning to task after holding down key too long or getting a screen size warning
    if (keyListener == 4) {
      keyListener = 0;
      countDown(3);
    }
  
    // after practice task feedback
    if (keyListener == 5) {
      keyListener = 0;
      sectionEnd = new Date().getTime() - runStart;
      logSectionData();
      navigateInstructionPath(repeatNecessary);
    }
  
    // block break
    if (keyListener == 7) {
      clearInterval(sectionTimer);
      sectionEnd = new Date().getTime() - runStart;
      logSectionData();
      keyListener = 0;
      
      // increment block information before beginning next block
      block++;
      blockLetter = blockOrder[block - 1];
      blockTrialCount = 1;
      countDown(3);
    }
  
    if (keyListener == 8) { // press button to start task
      keyListener = 0;
      sectionEnd = new Date().getTime() - runStart;
      // logSectionData();
      experimentFlow();
      return
    }}