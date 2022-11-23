let basketballImg = new Image(340, 340);
basketballImg.src = './images/basketball.jpg';

let flankerImg = basketballImg;

// basketball img is 340 x 340

// these images are 500 x 300
// select  images to use in task (out of 272 options for manmade and 272 options for natural)

let imageSRCs = [];

//skip over the bad images from excel sheet
let badImages = ['M4','M5','M6','M16','M28','M32','M52','M56','M60','M61','M62','M64','M66','M74','M78','M82','M83','M86','M89','M96','M101','M108','M110','M112','M114','M122','M123','M126','M138','M139','M142','M146','M148','M158','M172','M184','M190','M192','M195','M197','M198','M200','M201','M202','M203','M205','M206','M207','M213','M215','M216','M217','M219','M220','M224','M228','M240','M241','M246','M250','M252','M254','M258','M260','M261','M264','N1','N4','N9','N12','N20','N30','N31','N35','N35','N38','N43','N45','N48','N65','N68','N81','N83','N99','N106','N130','N131','N133','N135','N137','N164','N169','N178','N182','N191','N196','N197','N198','N200','N202','N203','N208','N210','N212','N213','N213','N216','N220','N221','N222','N228','N230','N232','N233','N235','N238','N247','N248','N251','N257','N259','N260','N261','N263','N265','N268','N271','N272'];

for (let i = 1; i <= 272; i++) {

  if(badImages.includes(`M${i}` || `N${i}`)){
    continue;
  }
  
  //check if it exists first before pushing it
  imageSRCs.push(`./images/M${i}.jpg`); //need ../ for mac but ./ for the people.duke website?
  imageSRCs.push(`./images/N${i}.jpg`);
}

// randomly sample from images
let selectedSRCs = _.sample(imageSRCs,sampleSize);
let unselectedSRCs = imageSRCs.filter(image => !selectedSRCs.includes(image))

// load images and store in selectedImages var
let selectedImages = new Array(selectedSRCs.length);

for (var i = 0; i < selectedImages.length; i++) {
  // img = new Imagw
  // img.src = src
  // dict = {
  //   image: img
  //   diff: 
  //   posit
  // }
  // Array.push (dict)
  
  selectedImg = new Image(500,300);
  selectedImg.src = selectedSRCs[i];

  // wrap the image in an object, so that we can add congruency, location, block info later in contextFlankerMainTask.js and such.
  imgWrapper = {
    img: selectedImg,
    //add congruency, position, and block keys when initializing the main task
  }

  selectedImages[i] = imgWrapper;
//github desktop test
}

//does github desktop save changes

selectedImages = shuffle(selectedImages);

let selectedPracticeImages = selectedImages.slice(0,nPracticeTrials);
let selectedTestImages = selectedImages.slice(nPracticeTrials);
