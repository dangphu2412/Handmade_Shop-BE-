/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const electronicUrl = "https://nshopvn.com/";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(electronicUrl);

    const returnData = await page.evaluate(() => {
      const products = document.querySelectorAll(".product");
      console.log(products);
      const data = [];
      products.forEach((product) => {
        console.log(product);
        const img = product.querySelector(".image > img").src;
        const title = product.querySelector(".product-title").innerText;
        data.push({
          img,
          title,
        });
      });

      return data;
    });

    console.log(returnData);
  } catch (error) {
    console.log(error);
  }
})();
