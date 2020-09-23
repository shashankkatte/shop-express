const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // fs.writeFileSync('message.txt', message);
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  //  lets send some response, we will be using better ways to send back html in future but for now lets brute force it!
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Hello from node.js server!</title></head>');
  res.write('<body><h1>Hello from node.js server!</h1></body>');
  res.write('</html>');
  res.end();
};

//  export this module
// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text',
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.SomeText = ' Some hrd coded text';
