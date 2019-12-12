//========================Slide nav menu open, and close========================
function openSlideMenu() {
document.getElementById('menu').style.width = '250px';
document.getElementById('navbar').style.marginLeft = '250px';
}

function closeSlideMenu() {
document.getElementById('menu').style.width = '0';
document.getElementById('navbar').style.marginLeft = '0';
}
//=============================== globle =====================================
const ALLBREEDLIST_URL = 'https://dog.ceo/api/breeds/list/all';
const RANDOMIMAGE_URL = 'https://dog.ceo/api/breeds/image/random/3';

let breed = window.location.hash;
console.log(breed);
if (breed) {
  breed = breed.substring(1);
  let breedAndSubBreed = breed.split('+');
  console.log(breedAndSubBreed);
  if(breedAndSubBreed.length === 1){
    onClick();
  } else if (breedAndSubBreed.length === 2) {
    onClick2(breedAndSubBreed);
  }
} else {
    getRandomImage();
}
//========================get list of breeds====================================
function getAllBreedList() {
  axios.get(ALLBREEDLIST_URL)
    .then(function (response) {
      let breeds = response.data.message;
      createAllBreedList(breeds);
  });
}
//================create element list for all breeds, first page================
function createAllBreedList(breeds) {
  let ul = document.getElementById('list');
  ul.innerHTML = '';
  for (let breed in breeds) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = uppCase(breed);
    a.setAttribute('onClick', 'closeSlideMenu()');
    a.addEventListener('click', function() {
      window.location.hash = breed;
      location.reload();
    });
    li.appendChild(a);
    ul.appendChild(li);
  }
  createSubBreedList(breeds);
}
//================================OnClick ======================================
function onClick() {
  cleanUp();
  createBreedName(breed);
  getBreedImage('https://dog.ceo/api/breed/' +breed+ '/images/random/3');
}
//========================Create Title for the Breeds=========================
function createBreedName(breed) {
  let div = document.querySelector('.gallery2');
  let h2 = document.createElement('h2');
  h2.textContent= uppCase(breed);
  div.appendChild(h2);
}
//===============================CleanUp =======================================
function cleanUp() {
  let div = document.querySelector('.gallery2');
  div.innerHTML="";
}
//====================Get Images for each Breed ================================
function getBreedImage(url) {
  console.log(url);
  axios.get(url)
  .then(function(response){
    let dog = response.data.message;
    createBreedImage(dog,url);
  });
}
//========================Create Breed Image list ==============================
function createBreedImage(dog,url) {
  let div = document.querySelector('.gallery2');
  let imageOne = document.createElement('div');
  imageOne.className ='image';
  div.appendChild(imageOne);

  let img = document.createElement('img');
  img.setAttribute('src', dog[0]);
  img.style.height = '400px';
  img.style.width = '350px';
  imageOne.appendChild(img);

  let imgTwo = document.createElement('img');
  imgTwo.setAttribute('src', dog[1]);
  imgTwo.style.height = '400px';
  imgTwo.style.width = '350px';
  imageOne.appendChild(imgTwo);

  let imgThree = document.createElement('img');
  imgThree.setAttribute('src', dog[2]);
  imgThree.style.height = '400px';
  imgThree.style.width = '350px';
  imageOne.appendChild(imgThree);

  getAllBreedList();

  let button = document.createElement('button');
  button.className= 'button';
  button.textContent = 'Refresh Button';
  button.addEventListener('click', function(){
    onClick();
    });
  div.appendChild(button);
  button.before(imageOne);
}
//=======================Create a sub breed list ==============================
function createSubBreedList(breeds) {
  let gallery = document.querySelector('.gallery2');
  for (let dogBreed in breeds) {
    let dogs = breeds[dogBreed];
    if (dogBreed === breed) {
      console.log(dogBreed);
      for(let dog of dogs){
      console.log(dog);
      let li = document.createElement('li');
      li.style.margin ='25px';
      let a = document.createElement('a');
      a.textContent = uppCase(dog);
      a.setAttribute('href', '#');
      a.setAttribute('onclick', 'closeSlideMenu()');
      a.addEventListener('click', function() {
        window.location.hash = breed + '+' +dog;
        location.reload();
        });
      li.appendChild(a);
      gallery.appendChild(li);
      }
    }
  }
}
//=============================onclick for sub-page=============================
function onClick2(breedAndSubBreed) {
  cleanUp();
  createBreedName(breedAndSubBreed[1]);
  getSubBreedImage(breedAndSubBreed);
}
//=======================Get image of sub-breed=================================
function getSubBreedImage(breedAndSubBreed) {
  axios.get('https://dog.ceo/api/breed/' +breedAndSubBreed[0] + '/' +breedAndSubBreed[1]+ '/images/random/3')
  .then(function(response){
    let dogImage = response.data.message;
    createSubBreedImage(dogImage,breedAndSubBreed)
  });
}
//=========================create subBreed image ===============================
function createSubBreedImage(dogImage,breedAndSubBreed) {
  let div = document.querySelector('.gallery2');
  let imageOne = document.createElement('div');
  imageOne.className ='image';
  div.appendChild(imageOne);

  let img = document.createElement('img');
  img.setAttribute('src', dogImage[0]);
  img.style.height = '400px';
  img.style.width = '350px';
  imageOne.appendChild(img);

  let imgTwo = document.createElement('img');
  imgTwo.setAttribute('src', dogImage[1]);
  imgTwo.style.height = '400px';
  imgTwo.style.width = '350px';
  imageOne.appendChild(imgTwo);

  let imgThree = document.createElement('img');
  imgThree.setAttribute('src', dogImage[2]);
  imgThree.style.height = '400px';
  imgThree.style.width = '350px';
  imageOne.appendChild(imgThree);

  getAllBreedList();

  let button = document.createElement('button');
  button.className= 'button';
  button.textContent = 'Refresh Button';
  button.addEventListener('click', function(){
    onClick2(breedAndSubBreed);
    });
  div.appendChild(button);
  button.before(imageOne);
}

//=======================Get images of random breeds============================
function getRandomImage() {
  axios.get(RANDOMIMAGE_URL)
  .then(function(response) {
    let randomImages = response.data.message;
    createRandomImages(randomImages);
  });
}
//========================Create random image frame=============================
function createRandomImages(randomImages) {
  let div = document.querySelector('.gallery2');
  let imageOne = document.createElement('div');
  imageOne.className ='image';
  div.appendChild(imageOne);

  let img = document.createElement('img');
  img.setAttribute('src', randomImages[0]);
  img.style.height = '400px';
  img.style.width = '350px';
  imageOne.appendChild(img);

  let imgTwo = document.createElement('img');
  imgTwo.setAttribute('src', randomImages[1]);
  imgTwo.style.height = '400px';
  imgTwo.style.width = '350px';
  imageOne.appendChild(imgTwo);

  let imgThree = document.createElement('img');
  imgThree.setAttribute('src', randomImages[2]);
  imgThree.style.height = '400px';
  imgThree.style.width = '350px';
  imageOne.appendChild(imgThree);

  let button = document.querySelector('button');
  button.before(imageOne);
  getAllBreedList();
}
//===========================Refreshing Button==================================
function getData() {
  location.reload();
}
//============================uppercase first letter ===========================
function uppCase(nameUppCase){
    let uppCaseChar = nameUppCase.charAt(0).toUpperCase() + nameUppCase.slice(1);
    return uppCaseChar;
}
