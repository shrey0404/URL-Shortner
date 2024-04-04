const express = require("express");
const {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", handlegenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
