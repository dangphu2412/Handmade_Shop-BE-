/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const electronicUrl = "https://nshopvn.com/";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(electronicUrl);

    const returnData = await page.evaluate(() => {
      const products = document.querySelectorAll(".products");
      const data = [];
      products.forEach((product) => {
        const thumbnail = product.querySelector(".image  > img").src;
        const content = product.querySelector(".product-title").innerText;
        // const name = product.querySelector("._3eufr2 > .O6wiAW > div").innerText;
        // const money = product.querySelector("._3eufr2 > ._2lBkmX > div._1w9jLI").innerText;
        data.push({
          thumbnail,
          content,
        });
      });

      return data;
    });

    console.log(returnData);
  } catch (error) {
    console.log(error);
  }
})();
