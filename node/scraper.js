const https = require('https');
const options = {
    hostname: 'www.youtube.com',
    path: '/feed/trending',
    method: 'GET'
}
const puppeteer = require("puppeteer");

const getHTML = async function getData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();
    return html;
}
module.exports = {
    getHTML
}