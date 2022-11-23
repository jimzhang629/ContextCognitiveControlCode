// data logging for sections
// instructions, break screens, etc
function logSectionData(){
  data.push([expStage, sectionType, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, sectionStart, sectionEnd, sectionEnd - sectionStart]);
  console.log(data);
}

function logMainTask(){
  //blockLetter is undefined..
  data.push([sectionType, taskName, block, blockOrder, blockOrder[block], trialCount, blockTrialCount, trialImg, trialImg.con, trialImg.loc, repeat, stimOnset, respOnset, respTime, getAccuracy(acc), locArray[trialCount-1], conArray[trialCount-1], imageSet[trialCount-1].src, NaN, NaN, NaN]);
  console.log('block is: ' + block);
}

function logPracticeTask(){
  // let distractorLocation = (distractionArr[trialCount - 1] == "d") ? distractorLocationArr[trialCount - 1] : NaN;
  data.push([sectionType, taskName, NaN, NaN, NaN, trialCount, NaN, trialImg, trialImg.con, trialImg.loc, NaN, stimOnset, respOnset, respTime, getAccuracy(acc), locArray[trialCount-1], conArray[trialCount-1], imageSet[trialCount-1].src, NaN, NaN, NaN]);
}

/** logExpArrays stores the conArray, locArray, and repeatArray (which is actually two arrays)
 * 
 */
function logExpArrays(){
  data.push(NaN, NaN, NaN, ...arguments, locArray, conArray) //add however many NaNs you need to until the end, and attach the arrays
}


