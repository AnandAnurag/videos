const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { updateVideosList, updateChannels } = require('../database/updateTables');

const processHTML = function (html) {
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
module.exports = {
    processHTML
}