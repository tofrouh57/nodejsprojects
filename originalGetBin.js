const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/image') {
    // Set the response header to indicate binary data (image/png in this case)
    res.setHeader('Content-Type', 'binary/octet-stream');

    // Read the binary image file asynchronously
    fs.readFile('binfile.txt', (err, data) => {
      if (err) {
        // Handle any errors (e.g., file not found)
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        // Send the binary data in the response body
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    // Handle other requests
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});