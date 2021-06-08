const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { updateVideosList, updateChannels } = require('../database/updateTables');
const { getHTML } = require('./scraper');

const processTrendingVideos = async function () {
    const html = await getHTML("https://www.youtube.com/feed/trending");
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const trending = [];
    const channels = {};
    let nodes = document.querySelectorAll('ytd-video-renderer');
    for (let n of nodes) {
        const anchor = n.querySelector('ytd-thumbnail a');
        const url = anchor?.href;
        const vid = url?.match(/(?<=\?v=).*/)[0];
        const thumbnail = `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`
        const title = n.querySelector('a#video-title')?.title;
        const description = n.querySelector('#description-text')?.textContent;
        const views = n.querySelector('#metadata-line .ytd-video-meta-block')?.textContent;

        const cNode = n.querySelector('ytd-channel-name a');
        const curl = cNode?.href;
        const match = curl?.replace("https://www.youtube.com/", '');
        const cid = match ?? null;
        const name = cNode?.textContent;

        trending.push({
            vid,
            thumbnail,
            title,
            description,
            cid,
            views,
            dislikes: null,
            likes: null
        });

        channels[cid] = {
            cid,
            name,
            description: null,
            thumbnail: null,
            subscribers: null,
        }
    }
    updateVideosList(trending);
    updateChannels(channels);
}
const processIndividualVideo = async function (vid, cid) {
    try {
        const html = await getHTML(`https://www.youtube.com/watch?v=${vid}`);
        const dom = new JSDOM(html);
        const { document } = dom.window;
        const trending = [];
        const channels = {};
        const metaEl = document?.querySelectorAll('yt-formatted-string#text.style-scope.ytd-toggle-button-renderer');
        const likes = metaEl[0]?.textContent;
        const dislikes = metaEl[1]?.textContent;
        const description = document.querySelector('#description')?.textContent;

        const ownerEl = document?.querySelector('ytd-video-owner-renderer.style-scope.ytd-video-secondary-info-renderer');
        const thumbnail = ownerEl.querySelector('img')?.src;
        const subscribers = ownerEl.querySelector('#owner-sub-count')?.textContent.replace(/[^\d]/g, '');

        trending.push({
            vid,
            dislikes,
            likes,
            description,
            stale: false
        });

        channels[cid] = {
            cid,
            thumbnail,
            subscribers
        }
        updateVideosList(trending);
        updateChannels(channels);
        console.log(`Updated Video: ${vid}`);
    } catch (err) {
        console.log(`Update Failed: ${vid}`)
    }

}


module.exports = {
    processTrendingVideos,
    processIndividualVideo
}