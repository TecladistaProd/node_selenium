const { Key, By, Builder } = require("selenium-webdriver"); // Selenium
const driver = new Builder().forBrowser("chrome").build();

const wait = require("./helpers/wait");
const { writeFile } = require("./helpers/promiseFs");

(async () => {
  await driver.get("http://www.google.com");

  // const searchInp = await driver.findElement(By.name("q"));
  // await searchInp.sendKeys("tecladistaprod");
  // await searchInp.sendKeys(Key.ENTER);

  // const firstLink = await driver.findElement(By.css("#search a:first-child"));
  // await firstLink.click();

  // const searchInp = await driver.findElement({ name: "q" });
  // await searchInp.sendKeys("devpleno github");
  // await searchInp.sendKeys(Key.ENTER);

  // const firstLink = await driver.findElement({ css: "#search a:first-child" });
  // await firstLink.click();

  // await wait(5000);
  // await driver.close();

  let searchInp = await driver.findElement({ name: "q" });
  await searchInp.sendKeys("devpleno github");
  await searchInp.sendKeys(Key.ENTER);

  searchInp = await driver.findElement({ name: "q" });

  while ((await searchInp.getAttribute("value")) !== "") {
    await searchInp.sendKeys(Key.BACK_SPACE);
  }

  await searchInp.sendKeys("rocketseat");
  await searchInp.sendKeys(Key.ENTER);

  let link = await driver.findElement({ css: "#search a:first-child" });
  await link.click();

  link = await driver.findElement({ css: "a[href='/starter']" });
  await writeFile("./button.png", await link.takeScreenshot(), "base64");
  await link.click();

  await driver
    .manage()
    .window()
    .maximize();

  await wait(2000);

  // scrolling to finish smoothly

  let body = await driver.findElement({ tagName: "body" });
  await writeFile("./pagePC.png", await driver.takeScreenshot(), "base64");
  const bodyRect = await body.getRect();

  // JavaScript Way
  // let y = 0;

  // while (y < bodyRect.height) {
  //   let scr = `window.scrollTo(${y}, ${y + 10})`;
  //   await driver.executeScript(scr);
  //   y += 10;
  // }

  // Or

  // css manipulation
  await driver.executeScript(
    "document.querySelectorAll('*')." +
      "forEach(i=> i.style.scrollBehavior = 'smooth')"
  );
  await wait(1000);

  let scr = `window.scrollTo(0, ${bodyRect.height})`;
  await driver.executeScript(scr);
  await wait(2000);
  try {
    // await driver
    //     .manage()
    //     .window()
    //     .minimize()

    console.log(
      "set Size",
      await driver
        .manage()
        .window()
        .setRect({ x: 0, y: 0, width: 240, height: 720 }),
      "\r\n"
    );

    await driver.executeScript("window.scrollTo(0, 0)");

    await wait(1500);

    await writeFile("./pageCELL.png", await driver.takeScreenshot(), "base64");

    await wait(3000);
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
  } finally {
    await driver.close();
    await driver.quit();
  }
})();
