/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const electronicUrl = "https://shopee.vn/Th%E1%BB%9Di-Trang-Nam-cat.78?page=0";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(electronicUrl);

    const returnData = await page.evaluate(() => {
      const products = document.querySelectorAll(".shopee-search-item-result__item");
      const data = [];
      products.forEach((product) => {
        const thumbnail = product.querySelector("._1gkBDw > ._3ZDC1p > img").src;
        // const percent = product.querySelector("._2N1Tif > .percent").innerText;
        // const name = product.querySelector("._3eufr2 > .O6wiAW > div").innerText;
        // const money = product.querySelector("._3eufr2 > ._2lBkmX > div._1w9jLI").innerText;
        data.push({
          thumbnail,
        });
      });

      return data;
    });

    console.log(returnData);
  } catch (error) {
    console.log(error);
  }
})();
