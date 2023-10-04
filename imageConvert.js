//https://www.npmjs.com/package/jimp

var Jimp = require('jimp');
var fs = require('fs');

let lines = 240;
var buffer = new ArrayBuffer(320 * 240 * 2);
//let bView = new Uint16Array(buffer); // treat buffer as a sequence of 32-bit integers



var vIndex = 0;
const files  = fs.readdirSync ("./pictures")
    
    files.forEach( function (fileName){
       console.log(fileName);

        Jimp.read("./pictures/"+fileName, function (err, image){
            if (err) {console.log("error loading file: "+ err)}
            else{
                console.log("got image:");
                console.log("image width : " + image.getWidth() + "  image height : " + image.getHeight());

                image.resize(320, 240, function(){
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
                }

                fs.writeFileSync("./converted/"+ vIndex +".txt", bView); 
                    vIndex++;
                    console.log('Saved!' + vIndex+bView[10].toString(16));
            });

       }   });

                });
       

  