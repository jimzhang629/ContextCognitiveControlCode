/** contextFlankerPracticeTask runs the practice blocks
 * 
 */
function contextFlankerPracticeTask(){
    // set taskName for data logging
    taskName = "contextFlankerPracticeTask";
    // nPracticeTrials = 3; //this gets overriden by main anyway

    // prepare for task
    hideInstructions();
    showCanvas();
    hideCursor();
    changeScreenBackgroundTo("lightgrey");

    // global variables for functions
    taskFunc = practiceTrialFunc;
    transitionFunc = itiScreen;
    imageSet = selectedPracticeImages; //attempt to be more modular, but honestly don't need this variable, can just set it in stimScreen.
    stimFunc = draw; //this is the actual trial function that gets run by stimScreen. For this experiment, don't really need this variable since it will always be draw().

    //draw the trial input, which is one of the practice images in this case
    //create task arrays
    taskArray = buildTaskArray(nPracticeTrials);

    console.log('taskArray:' + taskArray);
    // selectedImages.forEach(i => draw(i)); //run a trial on each target image in selectedImages array
    // start task after countdown (calls taskFunc)
    countDown(3);

}

/** 
 * buildTaskArray creates an array object that contains two subarrays, one more proportionally congruent and the other more proportionally incongruent.
 * left button press (Z) is congruent, right button press (M) is incongruent.
 * @param {int} nTrials : how many trials you want the array to be
 * @param {float} conProp: congruency proportion for this array. Must be between 0 and 1.
 * @returns {array} taskArray: randomly shuffled array of trials with average proportion congruency equal to conProp
 */
function buildTaskArray(nTrials, conProp = 0.8){

    if (conProp < 0 || conProp > 1){
        throw 'Please choose a congruency proportion (conProp) between 0 and 1.';
    }
    // left press is congruent and right press is incongruent, make array by adding con trials first, then inc trials.

    let taskArray = new Array(Math.floor(nTrials * conProp)).fill('c'); 
    taskArray = taskArray.concat(new Array(nTrials - taskArray.length).fill('i'));
    return shuffle(taskArray);
}

