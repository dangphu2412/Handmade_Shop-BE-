/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

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
          }, 1000);
      });
  });
}

const url = "https://shopee.vn/Th%E1%BB%9Di-Trang-Nam-cat.78?page=0";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(1000);

    await autoScroll(page);
    await page.waitFor(5000);

    const returnData = await page.evaluate(() => {
      window.scrollTo(0, 50)
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
