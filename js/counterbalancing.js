function getBlockOrder(blockOrderNum){
    // Latin square counterbalancing
    // controls for all possible
    // block transitions equally
    switch (blockOrderNum) {
      case 1:
        return ["learnAtop", "learnBbot", "test"];
      case 2:
        return ["learnAbot", "learnBtop", "test"];
      case 3:
        return ["learnBtop", "learnAbot", "test"];
      case 4:
        return ["learnBbot", "learnAtop", "test"];
    }
  }
  
  function getBlockCongruencies(blockLetter) {
    switch (blockLetter){
      case "learnAtop":
        return {
          c: 0.20,
          loc: 'top' //but then need another case where keep the same congruency proportion but have loc at bottom
        };
      case "learnBbot":
        return {
          c: 0.80,
          loc: 'bottom'
        };
      case "learnAbot":
        return {
          c: 0.20,
          loc: 'bottom'
        };
      case "learnBtop":
        return {
          c: 0.80,
          loc: 'top'
        };
      case "test":
        return {
          c: 0.5,
          loc: 'center'
        }
    }
  }
  
  //test