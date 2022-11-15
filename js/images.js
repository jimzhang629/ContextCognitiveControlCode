let basketballImg = new Image(340, 340);
basketballImg.src = './images/basketball.jpg';

let flankerImg = basketballImg;

// basketball img is 340 x 340

// these images are 500 x 300
// select  images to use in task (out of 272 options for manmade and 272 options for natural)

let imageSRCs = [];

//skip over the bad images from excel sheet
let badImages = ['M28', 'M56', 'M78', 'M89', 'M108', 'M114', 'M139', 'M190', 'M195', 'M211', 'M248', 'M250', 'M252', 'M254', 'M265', 'N133', 'N182', 'N196', 'N200', 'N205', 'N249', 'N251', 'N255', 'N257', 'N263', 'N265', 'N267', 'N268'];

for (let i = 1; i <= 272; i++) {

  if(badImages.includes(`M${i}` || `N${i}`)){
    continue;
  }

  imageSRCs.push(`./images/M${i}.jpg`); //need ../ for mac but ./ for the people.duke website?
  imageSRCs.push(`./images/N${i}.jpg`);
}

// randomly sample from images
let selectedSRCs = _.sample(imageSRCs,sampleSize);
let unselectedSRCs = imageSRCs.filter(image => !selectedSRCs.includes(image))

// load images and store in selectedImages var
let selectedImages = new Array(selectedSRCs.length);

for (var i = 0; i < selectedImages.length; i++) {
  selectedImages[i] = new Image(500,300);
  selectedImages[i].src = selectedSRCs[i];
}

selectedImages = shuffle(selectedImages);

let selectedPracticeImages = selectedImages.slice(0,nPracticeTrials);
let selectedTestImages = selectedImages.slice(nPracticeTrials);
