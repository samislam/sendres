const express = require("express");
const log = require("@samislam/log");

const app = express();
const { sendRes, sendResMw } = require("./index");

console.clear();
app.listen(8111, () => log.info(log.label, "test running on port 8111..."));
