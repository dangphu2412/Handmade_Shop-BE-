/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const puppeteer = require("puppeteer");
const fs = require("fs");

const pathToJson = "D:/Languages/Nodejs/BaseExpress/src/database/seeders/factory/json/";
const path = `${pathToJson}products-toys.json`;

async function autoScroll(page) {
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          let totalHeight = 0;
          const distance = 300;
          const timer = setInterval(() => {
              const { scrollHeight } = document.body;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve();
              }
          }, 5000);
      });
  });
}

(async () => {
  try {
    const crawlUrl = `https://shopee.vn/%C4%90%E1%BB%93-Ch%C6%A1i-cat.13242?page=${1}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(crawlUrl);
    await page.waitFor(3000);

    await autoScroll(page);
    await page.waitFor(5000);
    const returnData = await page.evaluate(() => {
      window.scrollTo(0, 50);
      const products = document.querySelectorAll(".shopee-search-item-result__item");
      const data = [];

      products.forEach((product) => {
        const name = product.querySelector("._1NoI8_");
        const price = product.querySelector("._1w9jLI");
        const reduce = product.querySelector("._341bF0");
        const sold = product.querySelector("._18SLBt");
        const thumbnail = product.querySelector("._1T9dHf");
        const percent = product.querySelector(".percent");

        data.push({
          name: (name !== null) ? name.innerText : "",
          price: (price !== null) ? price.innerText : "0",
          reduce: (reduce !== null) ? reduce.innerText : "0",
          sold: (sold !== null) ? sold.innerText : "0",
          thumbnail: (thumbnail !== null) ? thumbnail.src : "",
          percent: (percent !== null) ? percent.innerText : "0",
        });
      });
      return data;
    });
    console.log("Finish crawling");
    const oldData = require("../json/products-toys.json");
    console.log("Pushing into new ...");
    const newData = [...oldData, ...returnData];
    fs.writeFileSync(path, JSON.stringify(newData));
  } catch (error) {
    console.log(error);
  }
})();
