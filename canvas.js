const { createCanvas, registerFont } = require('canvas');
//const fetch = require('node-fetch');
const fs = require('fs');
var Jimp = require('jimp');


const canvasWidth = 320;
const canvasHeight = 240;

// for lissing fints config: sudo apt install fontconfig



// Load a custom font if needed
// registerFont('path/to/custom-font.ttf', { family: 'CustomFont' });

function drawWeatherInfo(ctx, weatherDescription) {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Location: Rouhling, France`, 20, 50);
  ctx.fillText(`Weather: ${weatherDescription}`, 20, 100);
  ctx.fillText(`Weather: ${weatherDescription}`, 20, 100);
}

function createGradientBackground() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');
  // Create a linear gradient from yellow to red
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  gradient.addColorStop(0, 'yellow');
  gradient.addColorStop(1, 'red');

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  return canvas;
}

async function createWeatherImage() {
  const gradientCanvas = createGradientBackground();
  const ctx = gradientCanvas.getContext('2d');

  // Draw weather information on the canvas
  const weatherDescription = 'Sunny'; // Replace with the desired weather description
  drawWeatherInfo(ctx, weatherDescription);

  // Convert the canvas image to base64
  const base64Image = gradientCanvas.toDataURL('image/png').split(';base64,').pop();
  const buffer = gradientCanvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);

  // Output the base64 image to the console
  console.log("data:image/png;base64," + base64Image);
}


function convertWeatherImage() {







  let lines = 240;
  var buffer = new ArrayBuffer(320 * 240 * 2);
  let bView = new Uint16Array(buffer); // treat buffer as a sequence of 32-bit integers


  var fileContent = 'const uint16_t mercy [] PROGMEM = {\n';
  let bviewCnt = 0;
  Jimp.read("image.png")
    .then((image) => {
      console.log("got image:");
      image.resize(320, 240);

      for (let y = 0; y < 240; y++) {
        for (let x = 0; x < 320; x++) {

          let pixColor = image.getPixelColor(x, y);

          let r = (pixColor & 0xFF000000) >>> 24;
          let g = (pixColor & 0xFF0000) >>> 16;
          let b = (pixColor & 0xFF00) >>> 8;

          r = (r * 249 + 1014) >>> 11;
          g = (g * 253 + 505) >>> 10;
          b = (b * 249 + 1014) >>> 11;
          let RGB565 = 0;
          RGB565 = RGB565 | (r << 11);
          RGB565 = RGB565 | (g << 5);
          RGB565 = RGB565 | b;

          fileContent = fileContent + '0x' + RGB565.toString(16);
          fileContent = fileContent + ', ';
          bView[bviewCnt] = RGB565;
          bviewCnt++;
        }
        fileContent = fileContent + '\n';
      }


      // fs.appendFile('mynewfile1.txt', fileContent, function (err) {
      //     if (err) throw err;
      //     console.log('Saved!');
      // });
      fs.writeFileSync('binfile.txt', bView);
      //        fs.writeFileSync('binfile.txt', bView, function (err) {
      console.log('Saved!');



    })
    .catch((err) => {
      console.log("cannot open file");
      // Handle an exception.
    });

}






createWeatherImage();
convertWeatherImage();
