const express = require("express")
const app = express()
const urlRoute = require('./routes/url')
const URL = require("./models/url");
const connectwithDB = require('./connect')
connectwithDB("mongodb://localhost:27017/short-url").then(() => console.log("CONNECTED WITH DATABASE"))
app.use(express.json())
app.use("/url", urlRoute)
app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        {
            $push: {
                VistHistory: {
                    timestamp:Date.now(),
                }
            }
        }
    );
    res.redirect(entry.reidirectURL);
})
app.listen(8000, () => console.log("I AM LISTENING ON PORT NO 8000"))