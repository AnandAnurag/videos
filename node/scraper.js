const https = require('https');
const options = {
    hostname: 'www.youtube.com',
    path: '/feed/trending',
    method: 'GET'
}
const puppeteer = require("puppeteer");
const { processHTML } = require('./process');

const getData = async function getData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.youtube.com/feed/trending");
    const data = await page.content();
    await browser.close();
    processHTML(data);
}
module.exports = {
    getData
}
getData();