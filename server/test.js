var paragraphTitles = [
  "Kongesønnens bryllup (1-14)",
  "Gud og keiseren (15-22)",
  "Oppstandelsen fra de døde (23-33)",
  "Det største budet i loven (34-40)",
  "Messias - Davids sønn og Guds Sønn (41-46)",
];
var pureVerses = [
  "1 Jesus tok igjen til orde og talte til dem i lignelser. Han sa:",
  "2 Himlenes rike er å ligne med en konge som gjorde bryllup for sønnen sin.",
  "3 Han sendte tjenerne sine ut for å kalle de innbudte til bryllupet. Men de ville ikke komme.",
  "4 Da sendte han andre tjenere ut, og sa: Si til de… er slaktet, og alt er ferdig. Kom til bryllupet!",
  "5 Men de brydde seg ikke om det og gikk sin vei, en til sin åker, og en til sin handel.",
  "6 Men andre la hånd på tjenerne hans, de mishandlet dem og slo dem i hjel.",
  "7 Da ble kongen harm, han sendte ut sine krigshære…drepte disse morderne og satte ild på byen deres.",
  "8 Så sa han til tjenerne sine: Bryllupsfesten er jo ferdig, men de innbudte var den ikke verd.",
  "9 Gå derfor ut til veikryssene, og be inn til bryllupet alle som dere treffer på.",
  "10 Så gikk da disse tjenerne ut på veiene og fikk …e og gode, og bryllupshuset ble fullt av gjester.",
  "11 Men da kongen gikk inn for å se gjestene, så han der en mann som ikke hadde bryllupsklær på.",
  "12 Han sier til ham: Venn, hvordan er du kommet inn her uten bryllupsklær? Men han tidde.",
  "13 Da sa kongen til tjenerne: Bind hender og føtte…rket utenfor! Der skal de gråte og skjære tenner.",
  "14 For mange er kalt, men få er utvalgt.",
  "15 Da gikk fariseerne bort og rådslo om hvordan de kunne fange ham i ord.",
  "16 De sendte disiplene sine til ham sammen med her…va noen sier, for du gjør ikke forskjell på folk.",
  "17 Si oss hva du mener: Er det tillatt å gi keiseren skatt, eller er det ikke?",
  "18 Men Jesus merket deres ondskap og sa: Hvorfor frister dere meg, dere hyklere?",
  "19 Vis meg mynten som skatten betales med! De rakte ham en denar.",
  "20 Og han sier til dem: Hvem har sitt bilde og sin påskrift her?",
  "21 De sier til ham: Keiseren. Da sier han til dem:…ren det som keiserens er, og Gud det som Guds er!",
  "22 Da de hørte dette, undret de seg, og de forlot ham og gikk bort.",
  "23 Samme dag kom noen saddukeere til ham, de som s…t det ikke er noen oppstandelse, og de spurte ham",
  "24 og sa: Mester! Moses har sagt: Om en mann dør b…med hans kone og holde oppe slekten for sin bror.",
  "25 Nå var det hos oss sju brødre. Den første gifte…kke hadde barn, etterlot han sin kone til broren.",
  "26 På samme måte gikk det med den andre og den tredje, ja, med alle sju.",
  "27 Men sist av alle døde også kvinnen.",
  "28 Men i oppstandelsen, hvem av de sju skal da ha henne til kone? Alle har jo hatt henne.",
  "29 Men Jesus svarte og sa til dem: Dere farer vill…ikke kjenner Skriftene og heller ikke Guds kraft.",
  "30 For i oppstandelsen verken tar de til ekte elle…t til ekte, men de er som Guds engler i himmelen.",
  "31 Men når det gjelder de dødes oppstandelse, har …e lest det som er talt til dere av Gud, som sier:",
  "32 Jeg er Abrahams Gud og Isaks Gud og Jakobs Gud. Han er ikke de dødes Gud, men de levendes.",
  "33 Folket som hørte dette, ble slått av undring over hans lære.",
  "34 Men da fariseerne hørte at han hadde stoppet munnen på saddukeerne, samlet de seg om ham.",
  "35 Og en av dem, en lovlærd, fristet ham og sa:",
  "36 Mester! Hvilket bud er det største i loven?",
  "37 Han sa til ham: Du skal elske Herren din Gud av…jerte og av hele din sjel og av all din forstand.",
  "38 Dette er det største og første budet.",
  "39 Men et annet er like stort: Du skal elske din neste som deg selv.",
  "40 På disse to budene hviler hele loven og profetene.",
  "41 Men mens fariseerene var samlet, spurte Jesus dem:",
  "42 Hva mener dere om Messias? Hvem er han sønn av? De sier til ham: Av David.",
  "43 Han sier til dem: Hvordan kan da David i Ånden kalle ham Herre? Han sier jo:",
  "44 Herren sa til min Herre: Sett deg ved min høyre…år lagt dine fiender til skammel for dine føtter!",
  "45 Når nå David kaller ham Herre, hvordan kan han da være hans sønn?",
  "46 Og ingen var i stand til å svare ham et ord. He…r ikke våget noen å spørre ham mer fra den dagen.",
];

paragraphTitles
  .map((title) => {
    var intervalArr = title.split(" (")[1].split("-");
    var paragraph = `${title}</br>${pureVerses
      .slice(intervalArr[0] - 1, intervalArr[intervalArr[1]])
      .join(" ")}`;
    return paragraph;
  })
  .join("</br></br>");

const puppeteer = require("puppeteer");

const baseUrl = "http://les.norsk-bibel.no/index_reader.php?res=";
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

function findBookIndexFromTheSite(book) {
  return books.indexOf(book);
}

async function fetchVerses(book, chapter, firstVerse, lastVerse) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var shortBookNameIndex = isNaN(book) ? findBookIndexFromTheSite(book) : book;
  var fullBookName = fullBookNames[shortBookNameIndex];
  console.log(`fullBookName ${fullBookName}`);
  var verseUrl = `${baseUrl}${books[shortBookNameIndex]}:${chapter}`;
  console.log(`requesting verse from ${verseUrl}`);

  await page.goto(verseUrl, {
    waitUntil: "networkidle2",
  });

  return getVerses(page);
}

async function getVerses(page) {
  await page.reload();

  var verses = await page.evaluate(() => {
    var pureVerses = Array.from(
      document.querySelectorAll("#reader-div-2 > div.verse")
    ).map((a) => a.innerText);

    console.log(`pureVerses: ${pureVerses}`);

    /*var paragraphTitles = await Array.from(
      document.querySelectorAll("#reader-div-2 > .paragraph-title-div")
    ).map((a) => a.innerText);

    var chapterWithParagraphTitles = `</br></br>`;
    console.log(`paragraphTitles: ${paragraphTitles}`);

    chapterWithParagraphTitles += await paragraphTitles
      .map((title) => {
        var intervalArr = title.split(" (")[1].split("-");
        var paragraph = `${title}</br>${pureVerses
          .slice(intervalArr[0] - 1, intervalArr[intervalArr[1]])
          .join(" ")}`;
        return paragraph;
      })
      .join("</br></br>");
    return chapterWithParagraphTitles;*/
  });

  //var selectedVerse = start ? verses.slice(start - 1, end) : verses;
  //var v = selectedVerse.join(" ");
  console.log(`Verse: ${pureVerses}`);
  return verses;
}

module.exports = { fetchVerses };
