const shortid = require("shortid")
const URL = require('../models/url')
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log(body)
    if (!body.url) return res.status(400).json({ Msg: "URL is required" })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        reidirectURL: body.url,
        visitedHistory: []
    })
    return res.json({ id: shortID })
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.VistHistory.length,
        analytics: result.VistHistory
    })
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}