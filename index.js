const puppeteer = require('puppeteer');

async function initBrowser() {

    const browser = await puppeteer.launch({ args: ["--incognito"], headless: false }); //Launches browser in incognito
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage(); //Ensures the new page is also incognito
    await page.evaluateOnNewDocument(() => { delete navigator.proto.webdriver; });
    await page.goto('http://127.0.0.1:8080/Biblivre5/'); //goes to given link
    return page;
}

async function Login(page) {
    await page.type('[name="username"]', 'admin');
    await page.type('[name="password"]', 'abracadabra');
    await page.focus('[name="password"]');
    await page.keyboard.press('Enter');

    return page;
}
/*
async function Lending(page) {
    await page.click('[href="?action=circulation_reservation"]');
}
*/

(async () => {
    const page = await initBrowser()
    await Login(page);
    await page.waitForNavigation();
    await Lending(page);
})()

// chamada de função padrão //
/*(async () => {
    const page = await initBrowser()
    await Login(page)
})() */