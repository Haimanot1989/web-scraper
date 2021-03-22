const puppeteer = require("puppeteer");
const db = require("./db");
const $ = require("cheerio");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");

const url = "https://kolonial.no/kategorier/373-hygieneartikler/";

async function fetchAllProducts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });
  let categories = await fetchAllCategories(page);
  console.log("categories", categories);

  let subCategories = [];
  for (const categoryUrl of categories) {
    console.log("categoryUrl", categoryUrl);
    await page.goto(categoryUrl, { waitUntil: "networkidle2" });
    let subCat = await fetchAllSubCategories(page);
    console.log("==========subcat=========");
    console.log(subCat);
    subCategories = [...subCategories, ...subCat];
  }

  let products = [];
  for (const subCategoryUrl of subCategories) {
    console.log("subCategoryUrl", subCategoryUrl);
    await page.goto(subCategoryUrl, { waitUntil: "networkidle2" });
    let productsTest = await getProducts(page);
    console.log("*************products**************");
    console.log(products);
    for (p in productsTest) {
      //db.insertProduct(p);
    }
    products = [...products, ...productsTest];
  }

  console.log(products);
  console.log(`Number of categories${categories.length}`);
  console.log(`Number of subcategories ${subCategories.length}`);
  console.log(`Number of products ${products.length}`);
  return products;
}

async function getProducts(page) {
  await page.reload();
  let products = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "div#content div div div div.col-xs-12.col-sm-9.col-md-9 div.col-xs-6.col-sm-3.col-md-2"
      )
    ).map((p) => {
      let product = {};
      product["id"] = p.querySelector(
        "div.buttons div.add-to-cart-group"
      ).dataset["product"];
      product["name"] = p.querySelector(
        "h3 div.name-main.wrap-two-lines"
      ).innerText;
      product["label_price"] = p
        .querySelector("p.price.label")
        .innerText.replace(/[^0-9,]+/g, "");
      product["unit_price"] = p
        .querySelector("p.unit-price")
        .innerText.replace(/[^0-9,]+/g, "");
      product["url"] = p.querySelector(
        "div.product-category-list.ws-xs > div > div div a"
      ).href;
      product["image_url"] = p.querySelector("div.image-container img").src;

      return product;
    })
  );
  return products;
}

async function fetchAllCategories(page) {
  await page.reload();

  const categoryLinks = await page.evaluate(() => {
    var categoryLinksSelector = "#navbar-category-sidebar > ul > li";
    var categories = document.querySelectorAll(categoryLinksSelector);
    return Array.from(categories)
      .map((category) => {
        return category.querySelector("a").href;
      })
      .filter((link) => link.includes("https://kolonial.no/kategorier"));
  });

  console.log(categoryLinks);
  return categoryLinks;
}

async function fetchAllSubCategories(page) {
  await page.reload();

  const subCategoryLinks = await page.evaluate(() => {
    var subCategoryLinksSelector =
      "#navbar-category-sidebar > ul > li.parent-category > ul > li";
    var subCategories = document.querySelectorAll(subCategoryLinksSelector);
    return Array.from(subCategories).map((subCategory) => {
      return subCategory.querySelector("a").href;
    });
  });

  console.log(`subCategoryLinks ${subCategoryLinks}`);
  return subCategoryLinks;
}

module.exports = { fetchAllProducts };
