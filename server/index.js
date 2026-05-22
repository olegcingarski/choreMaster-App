const express = require("express");
const app = express();
const port = 3000;

const categoryRoute = require("./controller/category")
const choreRoute = require("./controller/chore")

app.get("/", (req, res) => {
    res.send("App is working!")
})
//TODO

app.use("/category", categoryRoute)
app.use("/chore", choreRoute)

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`)
})