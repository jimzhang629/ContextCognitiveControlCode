/** contextFlankerPracticeTask runs the practice blocks
 * 
 */
function contextFlankerMainTask(){
    // set taskName for data logging
    taskName = "contextFlankerMainTask";

    // prepare for task
    hideInstructions();
    showCanvas();
    hideCursor();
    changeScreenBackgroundTo("white");

    // global variables for functions
    taskFunc = contextFlankerMainTrial;
    transitionFunc = itiScreen;
    imageSet = selectedTestImages; //attempt to be more modular, but honestly don't need this variable, can just set it in stimScreen.
    stimFunc = draw; //this is the actual trial function that gets run by stimScreen. For this experiment, don't really need this variable since it will always be draw().

    //draw the trial input, which is one of the practice images in this case
    //create task arrays
    taskArray = buildMainTaskArray();
    locArray = buildMainLocArray();
    console.log('taskArray:' + taskArray);
    // start task after countdown (calls taskFunc)
    countDown(3);
}

// don't forget to do locations and reinstatements for test block!

/** 
 * buildTaskArray creates an array object that contains two subarrays, one more proportionally congruent and the other more proportionally incongruent.
 * left button press (Z) is congruent, right button press (M) is incongruent.
 * @param {float} conProp: congruency proportion for this array. Must be between 0 and 1.
 * @returns {array} taskArray: a concatenated array of randomly shuffled blocks of trials in the order specified by blockOrder
 */
function buildMainTaskArray(){

    let taskArray = [];

    // untested
    blockOrder.forEach(blockLetter => {
        blockArr = buildBlockArr(blockLetter);
        taskArray = taskArray.concat(blockArr);
    });

    return taskArray;
}

function buildMainLocArray(){

    let locArray = [];

    // untested
    blockOrder.forEach(blockLetter => {
        // add the location of each block, trialsPerBlock times, to the locArray. Kind of redundant, but we might mess with this in the future.
        let blockLocArray = new Array(trialsPerBlock).fill(getBlockCongruencies(blockLetter).loc);
        locArray = locArray.concat(blockLocArray);
    });

    return locArray;
}
/** buildBlockArr creates an array of congruency values based on block parameters
 * 
 * @param {string} blockLetter : This must be one of the predefined cases in getBlockCongruencies in counterbalancing.js. Sets the location and congruency rate of the block.
 */
//untested
function buildBlockArr(blockLetter){
    let blockConProp = getBlockCongruencies(blockLetter).c;
    let blockArray = new Array(Math.floor(trialsPerBlock * blockConProp)).fill('c'); 
    blockArray = taskArray.concat(new Array(trialsPerBlock - blockArray.length).fill('i'));
    return shuffle(blockArray);
}
  
function contextFlankerMainTrial(){

    // (re)set sectionType
    sectionType = "main1";

    // if task is over, proceed back to next instruction (or end of experiment)
    if (trialCount > nBlocks * trialsPerBlock) {
    navigateInstructionPath();
    return;
    }

    // increment block
    if ((trialCount - 1) % trialsPerBlock == 0 && (trialCount - 1) != 0) {
    block++;
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
    fixationScreen();
}