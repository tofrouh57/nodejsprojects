//https://www.npmjs.com/package/jimp

var Jimp = require('jimp');
var fs = require('fs');
/*
let buffer = new ArrayBuffer(16); // create a buffer of length 16

let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

alert(view.length); // 4, it stores that many integers
alert(view.byteLength); // 16, the size in bytes

// let's write a value
view[0] = 123456;

// iterate over values
for(let num of view) {
  alert(num); // 123456, then 0, 0, 0 (4 values total)
}
*/

let lines = 240;
var buffer = new ArrayBuffer(320*240*2);
let bView = new Uint16Array(buffer); // treat buffer as a sequence of 32-bit integers


var fileContent = 'const uint16_t mercy [] PROGMEM = {\n';
let bviewCnt = 0;
Jimp.read("image.png")
    .then((image) => {
        console.log("got image:");
        image.resize(320,240);

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


        fs.appendFile('mynewfile1.txt', fileContent, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        fs.appendFile('binfile.txt', bView, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


    })
    .catch((err) => {
        console.log("cannot open file");
        // Handle an exception.
    });

