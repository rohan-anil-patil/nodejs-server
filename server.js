const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostname = "localhost";
const home = fs.readFileSync("./index.html", "utf-8");
const homecss = fs.readFileSync("./style.css", "utf-8");
const homejs = fs.readFileSync("./app.js", "utf-8");
const homedata = fs.readFileSync("./data.json", "utf-8");
const homeheroimg = fs.readFileSync("./images/hero.png");
const homepngegg = fs.readFileSync("./images/pngegg.png");
const about = fs.readFileSync("./about.html", "utf-8");
const contact = fs.readFileSync("./contact.html", "utf-8");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end(home);
  } else if (req.url === "/style.css") {
    return res.end(homecss);
  } else if (req.url === "/app.js") {
    return res.end(homejs);
  } else if (req.url === "/data.json") {
    return res.end(homedata);
  } else if (req.url === "/images/hero.png") {
    return res.end(homeheroimg);
  } else if (req.url === "/images/pngegg.png") {
    return res.end(homepngegg);
  } else if (req.url === "/about.html") {
    return res.end(about);
  } else if (req.url === "/contact.html") {
    return res.end(contact);
  } else {
    return res.end("404 Not Found");
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
