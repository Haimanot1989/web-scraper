const express = require("express");
const app = express();
const port = 3000;
const scrapers = require("./scrapers");
const db = require("./db");
const kolonialScraper = require("./kolonial-scraper");
const bibleScraper = require("./bible-scraper");
const bodyParser = require("body-parser");

//create a middleware to extract json from the body of our request
app.use(bodyParser.json());
//disable security rules
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Content-Type");
  next();
});

app.get("/products", async (req, res) => {
  const products = await db.getAllProducts();
  res.send(products);
});

app.get("/creators", async (req, res) => {
  const creators = await db.getAllCreators();
  console.log("creators from get", creators);
  res.send(creators);
});

app.post("/creators", async (req, res) => {
  const channelData = await scrapers.scrapeChannel(req.body.channelURL);
  const creators = db.insertCreator(
    channelData.name,
    channelData.avatarURL,
    req.body.channelURL
  );
  res.send(creators);
});
app.post("/products", async (req, res) => {
  kolonialScraper.fetchAllProducts();
  /*const products = db.insertProduct(
    channelData.name,
    channelData.avatarURL,
    req.body.channelURL
  );*/
  //res.send(creators);
});

app.get("/verses", async (req, res) => {
  const bookName = req.query.name;
  const bookChapter = req.query.chapter;
  const firstVerse = req.query.first;
  const lastVerse = req.query.last;
  let a = await bibleScraper.fetchVerses(
    bookName,
    bookChapter,
    firstVerse,
    lastVerse
  );
  console.log("Hei");
  res.send(a);
});
app.listen(port, () => {
  console.log(
    `Kolonial products scraper listening at http://localhost:${port}`
  );
});
