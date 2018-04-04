let toadPic = document.createElement('img');
let wallPic = document.createElement('img');
let starPic = document.createElement('img');
let doorPic = document.createElement('img');
let platformPic = document.createElement('img');

let picsToLoad = 0;

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    imageLoadingDone();
  }
}

function beginLoadingImages (image, fileName) {
  image.onload = countLoadedImages();
  image.src = fileName;
}

function loadImages() {
  let imageList = [
    {imageName: toadPic, fileName: 'assets/toad.png'},
    {imageName: wallPic, fileName: 'assets/mario_tile.png'},
    {imageName: starPic, fileName: 'assets/star.png'},
    {imageName: doorPic, fileName: 'assets/mario_door.png'},
    {imageName: platformPic, fileName: 'assets/mario_platform.png'}
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    beginLoadingImages(imageList[i].imageName, imageList[i].fileName)
  }
}
