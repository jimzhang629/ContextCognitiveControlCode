// data logging for sections
// instructions, break screens, etc
function logSectionData(){
  data.push([expStage, sectionType, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, sectionStart, sectionEnd, sectionEnd - sectionStart]);
  console.log(data);
}

function logMainTask(){
  //blockLetter is undefined..
  data.push([sectionType, taskName, block, blockOrder, blockOrder[block-1], trialCount, blockTrialCount, trialImg, trialImg.img.src, trialImg.con, trialImg.loc, repeat, stimOnset, respOnset, respTime, getAccuracy(acc), NaN, NaN, NaN]);
  console.log(data);
}

//need to add however many NaNs for each block in block order
function logPracticeTask(){
  // let distractorLocation = (distractionArr[trialCount - 1] == "d") ? distractorLocationArr[trialCount - 1] : NaN;
  data.push([sectionType, taskName, NaN, NaN, NaN, NaN, NaN, trialCount, NaN, trialImg, trialImg.img.src, trialImg.con, trialImg.loc, NaN, stimOnset, respOnset, respTime, getAccuracy(acc), NaN, NaN, NaN]);
  console.log(data);
}

/** logExpArrays stores the conArray, locArray, and repeatArray (which is actually two arrays). Don't actually need this though, it screws up formatting.
 * 
 */
function logExpArrays(){
  data.push([NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, locArray, conArray, selectedImages]); //add however many NaNs you need to until the end, and attach the arrays
}


