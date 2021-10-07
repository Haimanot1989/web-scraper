const puppeteer = require("puppeteer");

const baseUrl = "http://les.norsk-bibel.no/index_reader.php?res=";
/*books.reduce((map, book) => ({
  ...map,
  [books.indexOf(book)]: book,
}), {})*/
let booksWithIndex = {"0":"","1":"gen","2":"exod","3":"lev","4":"num","5":"deut","6":"josh","7":"judg","8":"ruth","9":"1sam","10":"2sam","11":"1kgs","12":"2kgs","13":"1chr","14":"2chr","15":"ezra","16":"neh","17":"esth","18":"job","19":"ps","20":"prov","21":"eccl","22":"song","23":"isa","24":"jer","25":"lam","26":"ezek","27":"dan","28":"hos","29":"joel","30":"amos","31":"obad","32":"jonah","33":"mic","34":"nah","35":"hab","36":"zeph","37":"hag","38":"zech","39":"mal","40":"matt","41":"mark","42":"luke","43":"john","44":"acts","45":"rom","46":"1cor","47":"2cor","48":"gal","49":"eph","50":"phil","51":"col","52":"1thess","53":"2thess","54":"1tim","55":"2tim","56":"titus","57":"phlm","58":"heb","59":"jas","60":"1pet","61":"2pet","62":"1john","63":"2john","64":"3john","65":"jude","66":"rev"}
let books = [
  "",
  "gen",
  "exod",
  "lev",
  "num",
  "deut",
  "josh",
  "judg",
  "ruth",
  "1sam",
  "2sam",
  "1kgs",
  "2kgs",
  "1chr",
  "2chr",
  "ezra",
  "neh",
  "esth",
  "job",
  "ps",
  "prov",
  "eccl",
  "song",
  "isa",
  "jer",
  "lam",
  "ezek",
  "dan",
  "hos",
  "joel",
  "amos",
  "obad",
  "jonah",
  "mic",
  "nah",
  "hab",
  "zeph",
  "hag",
  "zech",
  "mal",
  "matt",
  "mark",
  "luke",
  "john",
  "acts",
  "rom",
  "1cor",
  "2cor",
  "gal",
  "eph",
  "phil",
  "col",
  "1thess",
  "2thess",
  "1tim",
  "2tim",
  "titus",
  "phlm",
  "heb",
  "jas",
  "1pet",
  "2pet",
  "1john",
  "2john",
  "3john",
  "jude",
  "rev",
];
//test
var fullBookNames = [
  "",
  "1. Mosebok ",
  "2. Mosebok ",
  "3. Mosebok ",
  "4. Mosebok ",
  "5. Mosebok ",
  "Josvas bok ",
  "Dommernes bok ",
  "Ruts bok ",
  "1. Samuelsbok ",
  "2. Samuelsbok ",
  "1. Kongebok ",
  "2. Kongebok ",
  "1. Krønikebok ",
  "2. Krønikebok ",
  "Esras bok ",
  "Nehemjas bok ",
  "Esters bok ",
  "Jobs bok ",
  "Salmenes bok ",
  "Salomos ordspråk ",
  "Predikantens bok ",
  "Salomos høysang ",
  "Profeten Jesaja ",
  "Profeten Jeremia ",
  "Klagesangene ",
  "Profeten Esekiel ",
  "Profeten Daniel ",
  "Profeten Hosea ",
  "Profeten Joel ",
  "Profeten Amos ",
  "Profeten Obadja ",
  "Profeten Jonas ",
  "Profeten Mika ",
  "Profeten Nahum ",
  "Profeten Habakkuk ",
  "Profeten Sefanja ",
  "Profeten Haggai ",
  "Profeten Sakarias ",
  "Profeten Malakias ",
  "Matteus evangelium ",
  "Markus evangelium ",
  "Lukas´ evangelium ",
  "Johannes´ evangelium ",
  "Apostlenes gjerninger	apg (el. apg ",
  "Romerbrevet ",
  "1. Korinterbrev ",
  "2. Korinterbrev ",
  "Galaterbrevet ",
  "Efeserbrevet ",
  "Filipperbrevet ",
  "Kolosserbrevet ",
  "1. Tessalonikerbrev ",
  "2. Tessalonikerbrev ",
  "1. Timoteusbrev ",
  "2. Timoteusbrev ",
  "Titus´ brev ",
  "Filemons brev ",
  "Hebreerbrevet ",
  "Jakobs brev ",
  "1. Peters brev ",
  "2. Peters brev ",
  "1. Johannes´ brev ",
  "2. Johannes´ brev ",
  "3. Johannes´ brev ",
  "Judas´ brev ",
  "Johannes´ Åpenbaring ",
];

/*
=====The end goal
Input
Proverbs 11:1
Numbers 25-26
Matthew 16:13-28
Psalms 35:1-10

Output 
Block of text rightly formatted
*/

/*
The simpler approach
Proverbs 11:1
    - get one verse
Numbers 25-26
    - Get both the full chapters
Matthew 16:13-28
    -  

*/

function findBookIndexFromTheSite(shortBookName) {
  let books = [];
  for (let i = 2; i <= 67; i++) {
    books.push(
      document.querySelector(`#search-tips-table > tbody > tr:nth-child(${i})`)
        .innerText
    );
  }
  var shortBooks = books.map((a) => a.split("/")).map((b) => b[1].trim()); //get the handles
  //var shortBooks = books.map((a) => a.split("/")).map((b) => b[0].trim()); //get the full name
  return shortBooks.indexOf(shortBookName) + 1;
}

function fetchShortBokName(book) {
  return books.indexOf(book);
}

async function fetchVerses(book, chapter, firstVerse, lastVerse) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //if it is a short book name(text), do nothing
  //if it is a number, fetch the short book name from books array to pass it to the url
  var isText = isNaN(book); //true if book == "prov"
  var shortBookName = isText ? book : books[book];

  var bookId = books.indexOf(shortBookName);
  var fullBookName = fullBookNames[bookId];
  var verseUrl = `${baseUrl}${shortBookName}:${chapter}`;
  console.log(`requesting verse from ${verseUrl}`);

  await page.goto(verseUrl, {
    waitUntil: "networkidle2",
  });

  return getVerses(page, fullBookName, chapter, firstVerse, lastVerse);
}

async function getVerses(page, book, chapter, start, end) {
  await page.reload();

  var verses = await page.evaluate(() => {
    return {
      v: Array.from(document.querySelectorAll("#reader-div-2 > div.verse")).map(
        (a) => a.innerText
      ),
      paragraphTitles: Array.from(
        document.querySelectorAll("#reader-div-2 > .paragraph-title-div")
      ).map((b) => b.innerText),
    };
  });

  var chapterWithParagraphTitles = `${book} ${chapter}</br></br>`;

  chapterWithParagraphTitles += verses.paragraphTitles.length
    ? verses.paragraphTitles
        .map((title) => {
          var intervalArr = title.split(" (")[1].replace(")", "").split("-");
          var paragraph = `${title}</br>${verses.v
            .slice(intervalArr[0] - 1, intervalArr[1])
            .join(" ")}`;
          console.log(`paragraph ${intervalArr}`);
          //return JSON.stringify({ [intervalArr[0]]: paragraph });
          return paragraph;
        })
        .join("</br></br>")
    : verses.v.join(" ");

  var selectedVerse = start ? verses.v.slice(start - 1, end) : verses.v;
  var v = selectedVerse.join(" ");
  return chapterWithParagraphTitles;
}

module.exports = { fetchVerses };
