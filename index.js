const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url.model");
const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/staticroutes");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
