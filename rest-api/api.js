const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const api = express();
const port = 3000;

const blogRouter = require("./router/blogRouter");

api.use(cors());

/* Handles requests */
api.use(bodyparser.urlencoded({ extended: true }));
api.use(bodyparser.json({ limit: "20mb", extended: true }));

api.use("/public", express.static(__dirname + "/public"));

router.get("/", (req, res) =>
  res.json({
    message: "API online",
  })
);

api.use("/", router);
api.use("/blog", blogRouter);

api.listen(port);
console.log("Run Api...");
