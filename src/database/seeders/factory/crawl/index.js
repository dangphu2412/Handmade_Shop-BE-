/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const url = "https://shopee.vn/Th%E1%BB%9Di-Trang-Nam-cat.78?page=0";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const returnData = await page.evaluate(() => {
      const products = document.querySelectorAll(".col-xs-2-4");
      const data = [];
      products.forEach((product) => {
        const img = product.querySelector("img");
        if (img !== null && img.src) {
          data.push({
            img: img.src,
          });
        }
      });

      return data;
    });

    console.log(returnData);
  } catch (error) {
    console.log(error);
  }
})();
