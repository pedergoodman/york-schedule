const { toMatchImageSnapshot } = require("jest-image-snapshot");
const puppeteer = require("puppeteer");
require("dotenv").config();
const { YORKPASSWORD } = process.env;

expect.extend({ toMatchImageSnapshot });

describe("interview schedule", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: "new" });
    page = await browser.newPage();

    // Navigate to the login page
    await page.goto("https://yorkdevtraining.com/recruiting/login");

    await new Promise((r) => setTimeout(r, 500));
    //navigate to username on York
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Fill in the login form
    await page.keyboard.type("nafziger10@gmail.com");
    await page.keyboard.press("Tab");
    await page.keyboard.type(YORKPASSWORD);

    //"Enter" to login
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 1000)); // 500 was to short and caused failure in navigation

    //go to schedule
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 500));
    page.setViewport({ width: 1100, height: 1500 });

    // await new Promise((r) => setTimeout(r, 1000));
  }, 10000);

  for (let i = 0; i < 4; i++)
    test(`Page ${i + 1}:`, async () => {
      checkHyphens();
      // Occasionally screenshots cause test to fail maybe 1 out of 20
      // so just check screenshots to make sure each page is accessed once a day.
      // const screenshot = await page.screenshot();
      // expect(screenshot).toMatchImageSnapshot();
      await new Promise((r) => setTimeout(r, 200));

      const elements = await page.$x('//*[contains(text(), "Next Week")]');
      await elements[0].click();
      await new Promise((r) => setTimeout(r, 200));
    });

  async function checkHyphens() {
    //grab all the innerText
    const pageText = await page.evaluate(() => document.body.innerText);
    // Count the number of hyphens in the page text
    const hyphenCount = (pageText.match(/-/g) || []).length;
    expect(hyphenCount).toEqual(175);
  }

  afterAll(async () => {
    await browser.close();
  });
});
// npm run test
