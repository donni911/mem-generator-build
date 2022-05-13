import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("mem");
const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");

let image;

imageInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(canvas, image, topText.value, bottomText.value);
    },
    { once: true }
  );
});

topText.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

bottomText.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);

  let imgToPng = canvas.toDataURL("image/png");

  let imgToJpg = canvas.toDataURL("image/jpg");
  let imgToGif = canvas.toDataURL("image/gif");

  let downloadImg = document.querySelector(".mem-download__wrapper");

  downloadImg.innerHTML =
    '         <button class="mem-download__button">Download</button>    <ul class="mem-download"> <li class="mem-download__item"> <a download="mem.png" href="' +
    imgToPng +
    '">Download PNG</a></li> <li class="mem-download__item"><a download="mem.jpg" href="' +
    imgToJpg +
    '">Download JPG</a> </li> <li class="mem-download__item"><a download="mem.gif" href="' +
    imgToGif +
    '">Download GIF</a></li> </ul> ';
}
