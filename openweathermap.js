const request = require('request');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const width = 320;
const height = 240;

var iconName = "";
var body_ = "";

request('https://api.openweathermap.org/data/2.5/weather?lat=49.1378107&lon=7.0039717&units=metric&lang=FR&appid=f92facb13d104e1e703c209990730eae', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //  iconName = (body.weather[0].icon);  
  iconName = (body.weather[0].icon);
  body_ = body;
  console.log(body);
  //https://api.openweathermap.org/data/3.0/onecall?lat=49.1378107&lon=7.0039717&units=metric&lang=FR&appid=f92facb13d104e1e703c209990730eae

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#542dad";
  context.fillRect(0, 0, width, height);

    const icon_ = "https://openweathermap.org/img/wn/" + iconName + "@2x.png";
  //const icon_ = "https://openweathermap.org/img/wn/11d@2x.png";
  console.log(icon_);
  loadImage(icon_).then((image) => {
    context.drawImage(image, 60, 10, 100,100);
    

  
  context.font = "bold 25pt 'trebuchet ms'";
  context.textAlign = "center";
  context.fillStyle = "#FFF";
  context.fillText("Rouhling", 160, 50);

  context.font = "bold 15pt 'trebuchet ms'";
  context.textAlign = "center";
  context.fillStyle = "#FFF";
  context.fillText("Météo", 160, 100);
  


    context.font = "10pt 'trebuchet ms'";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(body_.weather[0].description, 50, 170);

    context.font = "8pt 'trebuchet ms'";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(body_.main.temp_min, 20, 210);

    context.font = "8pt 'trebuchet ms'";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(body_.main.temp_max, 70, 190);








    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);





  })


});

/*

Daily Forecast 16 Days needs subs
https://api.openweathermap.org/data/2.5/forecast/daily?lat=49.1378107&lon=7.0039717&units=metric&lang=FR&appid=f92facb13d104e1e703c209990730eae


  Call 5 day / 3 hour forecast data
https://api.openweathermap.org/data/2.5/forecast?lat=49.1378107&lon=7.0039717&units=metric&lang=FR&appid=f92facb13d104e1e703c209990730eae


  Hourly forecast need susbs
https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=49.1378107&lon=7.0039717&units=metric&lang=FR&appid=f92facb13d104e1e703c209990730eae

*/
