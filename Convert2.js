//https://www.npmjs.com/package/jimp

var Jimp = require('jimp');
var fs = require('fs');

let lines = 240;
var buffer = new ArrayBuffer(320 * 240 * 2);
//let bView = new Uint16Array(buffer); // treat buffer as a sequence of 32-bit integers



function convertImageToBin(image) {
    console.log("image width : " + image.getWidth() + "  image height : " + image.getHeight());

    image.resize(320, 240);
    let bviewCnt = 0;
    let bView = new Uint16Array(buffer); // treat buffer as a sequence of 32-bit integers
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

            bView[bviewCnt] = RGB565;
            bviewCnt++;
        }
        return bView;
    }
}


var vIndex = 1;
const files  = fs.readdirSync ("./pictures")
    
    files.forEach( function (file => {
        console.log(file);

        Jimp.read("./pictures/"+file)
            .then(image => {
                console.log("got image:");
                console.log("invoke to bin");
                bView = convertImageToBin(image);


                fs.writeFileSync("./converted/"+ vIndex +".txt", bView); //, function (err) {
                    // if (err) console.log(err);
                    // else{
                    vIndex++;
                    console.log('Saved!' + vIndex+bView[10].toString(16));
                    }
            )
       

        
            .catch(err => {
                console.log("cannot open file");
                // Handle an exception.
            });

    });








