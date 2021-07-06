import express from "express";
import path from "path";
import logger from "./src/server/logger";
import isloggedIn from "./src/server/secured";
import apiroutes from "./src/server/router";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

Object.entries(apiroutes).forEach((route) => {
  const [url, implemetation] = route;
  app.use(url, implemetation);
});

app.use(logger);

app.get("/abc", (req, res) => {
  console.log(path.join(__dirname + "/public/index.html"));
  console.log("abc in");
  return res.send({ default: "Provide Path abc" });
  console.log("abc out");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
  //res.send("Provide Path abc");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// node --inspect -r esm server.js
// run using cmd --> node -r esm server.js

// https://www.npmjs.com/package/esm
//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/

//cmd to run nodemon  ==> nodemon --watch src/server --inspect -r esm server.js
