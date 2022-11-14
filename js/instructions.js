// This file defines all functions relevant to the instructions
// see function navigateInstructionPath() in tasks.js for navigation code

// global instruction iterator information. Change as needed

let instructions = {
  // contains the interator for each instruction block, default 1
  iterator: {
    "prac1": 1, "main1": 1
  },
  // contains the max value of each instruction iteration. iteration will STOP at max and display exit response
  max: {
    "prac1": 4, "main1": 5
  },
  // what does instruction section end with?
  // #nextSectionButton, #startExpButton, keyPressNextSection, keyPressStartTask
  exitResponse: {
    "prac1": 'keyPressStartTask',
    "main1": 'keyPressStartTask'
  }
}
let iterateAgain = false, task;

function navigateInstructionPath(repeat = false){
  if (repeat == true) {
    // if multi stage instructions, ensures it goes back to first not second
    // switch (expStage){
    //   case "prac1-1":
    //   case "prac1-2":
    //     expStage = "prac1-1";
    //     break;
    // }
  } else {
    // what is the sequence of experimental instruction stages?
    switch (expStage){
      case "prac1":
        expStage = "main1";
        break;
      case "main1":
        expStage = "final";
        experimentFlow();
        return;
    }
  }
  runInstructions();
}

function displayDefaults(stage){
  // default values of instruction blocks. add any special cases
  switch(stage){
    case "final":
      showFirst();
      $('.instruction-header').hide();
      break;
    case "prac1":
    case "main1":
       // showFirst();
    default:
      showFirst();
      $('.instruction-header').show();
      break;
  }
}

function getInstructionText(slideNum, expStage){
/* use the following options when modifying text appearance
    -  iterateAgain = true;
    -  changeTextFormat('#instructions' + slideNum,'font-weight','bold');
    -  changeTextFormat('#instructions' + slideNum,'font-size','60px');
    -  changeTextFormat('#instructions' + slideNum,'color','red');
    -  changeTextFormat('#instructions' + slideNum,'margin-top', '20px');
    -  changeTextFormat('#instructions' + slideNum,'margin-bottom', '20px');
    - $("<img src='../pics/finalpics/M33.jpg' class='insertedImage'>").insertAfter( "#instructions" + slideNum);
    - $( getImageText(instructionImages[1])).insertAfter( "#instructions" + slideNum);
*/
  switch (expStage){
    case "prac1":
      switch (slideNum){
        case 1:
          return "In this experiment, you will categorize a centrally presented image as typically larger or smaller than a basketball.";
        case 2:
          return "The centrally presented image will be flanked by two distracting images, please ignore these when making your decision.";
        case 3:
          return "Please press 's' to indicate smaller than a basketball, and 'l' to indicate larger. ";
        case 4:
          changeTextFormat('#instructions' + slideNum,'font-weight','bold');
          return "Press any button to begin a practice session. Please respond as quickly and accurately as possible";
      }
    case "main1":
      switch (slideNum){
        case 1:
          return "Good job on completing the practice!";
        case 2:
          return "You will now complete the main experiment. This should take roughly 30 minutes.";
        case 3:
          return "As a reminder, press 's' to indicate if the center image is typically smaller than a basketball, and 'l' if it is typically larger.";
        case 4:
          return 'You will need to score 75% accuracy to receive credit. A trial that is too slow is counted as incorrect.'
        case 5:
          changeTextFormat('#instructions' + slideNum,'font-weight','bold');
          return "Press any button to start the task";
      }
    
  }
}

function runInstructions(){
  // show cursor
  document.body.style.cursor = 'auto';

  // main instruction function (come here at start of instruction block)
  sectionStart = new Date().getTime() - runStart;
  sectionType = "instructions";

  // hide/clear everything, just in case
  hideInstructions();
  hideCanvas();
 
  // if (showNavButtons) {
  //   $("#navButtons").show();
  // }

  // if need to repeat instructions (e.g., participant failed to meet accuracy requirement), then reshow all instructions
  if (instructions["iterator"][expStage] >= instructions["max"][expStage]){

    // loop through instructions and show
    for (var i = 1; i <= instructions["max"][expStage]; i++) {
      $('#instructions' + i).text( getInstructionText( i, expStage ));
    }

    // reset iterateAgain in case looping turned it on by accident
    iterateAgain = false;

    // display instructions and prepare exit response mapping
    $('#instructionsDiv').show();
    displayDefaults(expStage);
    exitResponse();

  } else {

    // remove any previous click listeners, if any
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");

    // clear all previous instructions, reset styles, and remove pictures
    for (let i = 1; i <= 8; i++) {
      $('#instructions' + i).text("");
      resetDefaultStyles('#instructions' + i);
      clearInsertedContent();
    }

    // display proper instruction components, in case they are hidden
    $('#instructionsDiv').show();
    $('#nextInstrButton').show();
    $('#nextSectionButton').hide();
    $('#startExpButton').hide();
    displayDefaults(expStage);
  }

  /* code for "Next" button click during instruction display
        if running from Atom, need to use $(document).on, if through Duke Public Home Directory, either works.
        https://stackoverflow.com/questions/19237235/jquery-button-click-event-not-firing
  */
  $(document).on("click", "#nextInstrButton", function(){
  // $("#nextInstrButton").on('click', function(){
    iterateInstruction();
  });

  // code for click startExperiment button
  $(document).on('click', '#startExpButton', function(){
    let confirm = true;
    if (expStage == "main1-2" && Boolean(window.confirm)) {
      confirm = window.confirm("Are you sure you are ready to proceed?");
    }

    if (confirm) {
      // update data logger on time spent in section
      sectionEnd = new Date().getTime() - runStart;
      logSectionData();

      $('#instructionsDiv').hide();
      $('#startExpButton').hide();
      clearInsertedContent();

      // clear all button press listeners
      $(document).off("click","#nextInstrButton");
      $(document).off("click","#startExpButton");
      $(document).off("click","#nextSectionButton");
      experimentFlow();
    }
  });

  $(document).on('click', '#nextSectionButton', function(){
    // update data logger on time spent in section
    sectionEnd = new Date().getTime() - runStart;
    logSectionData();

    // clear all button press listeners
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    navigateInstructionPath();
  });
};

function iterateInstruction(){
  let instrNum = instructions["iterator"][expStage];
  $('#instructions' + instrNum).text( getInstructionText( instrNum, expStage));

  // iterate as appropriate or allow next phase
  if (instrNum < instructions["max"][expStage]){

    instructions["iterator"][expStage]++;
  } else{
    exitResponse();
  }

  if (iterateAgain == true) {
    iterateAgain = false;
    iterateInstruction();
  }
}

function exitResponse(){
  $('#nextInstrButton').hide();

  if (instructions["exitResponse"][expStage] == "#startExpButton"){
    $('#startExpButton').show();
  } else if (instructions["exitResponse"][expStage] == "#nextSectionButton") {
    $('#nextSectionButton').show();
  } else if (instructions["exitResponse"][expStage] == "keyPressStartTask"){
    keyListener = 8;
  } //else if (instructions["exitResponse"][expStage] == "buttonPressNextSection"){
    //keyListener = 6;
  //}
}

function getImageText(imageURL){
  return "<img src='" + imageURL + "' class='insertedImage'>";
}

function showFirst() {
  iterateInstruction();
}

function changeTextFormat(elementName, property ,changeTo){
  $(elementName).css( property , changeTo );
}

function clearInsertedContent(){
  $('.insertedImage').remove();
  $('.insertedContent').remove();
}

function hideInstructions(){
  // remove any previous click listeners, if any
  $(document).off("click","#nextInstrButton");
  $(document).off("click","#startExpButton");
  $(document).off("click","#nextSectionButton");

  // hide instruction DOMs
  $('#instructionsDiv').hide();
  $('#startExpButton').hide();
  $('#nextSectionButton').hide();

  // clear text from instruction DOMs
  for (let i = 1; i <= 8; i++) {
    $('#instructions' + i).text("");
    resetDefaultStyles('#instructions' + i);
    clearInsertedContent();
  }
}

function resetDefaultStyles(domObject){
  $(domObject).css('font-weight','');
  $(domObject).css('font-size','');
  $(domObject).css('color','');
  $(domObject).css('margin-top','');
  $(domObject).css('margin-bottom','');
}

function getKeyMappingText(item){
  if (keyMapping == 1 ? item == 2 : item == 1) {
    return "is oriented correctly.";
  } else {
    return "has been rotated.";
  }
}
