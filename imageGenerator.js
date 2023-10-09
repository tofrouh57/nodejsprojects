var fs = require("fs");

const iWidth = 480;
const iHeight = 320;


var arrayBuffer = new ArrayBuffer(iWidth * iHeight * 3);
let buffer = new Uint8Array(arrayBuffer);
                
let cpt = 0;
for (let h = 0; h<iHeight; h++) {

    for (let w = 0; w < iWidth/ 2; w++) {
//un pixel
        buffer[cpt] = 0xFF;
        cpt++;
        buffer[cpt] = 0x00;
        cpt++;
        buffer[cpt] = 0x00;
        cpt++;
   
   
    }
    for (let w = 0; w < iWidth / 2; w++) {
        buffer[cpt] = 0x00;
        cpt++;
        buffer[cpt] = 0xFF;
        cpt++;
        buffer[cpt] = 0x00;
        cpt++;
}
}
console.log('Saved!' + buffer[iWidth].toString(32));
fs.writeFileSync("./converted888/test1.txt", buffer);

//xxd -i -c240 test1.txt > test1.h