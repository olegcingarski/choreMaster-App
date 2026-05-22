const express = require("express")
const router = express.Router()

const getAbl = require("../abl/chore/getABL")
const postABL = require("../abl/chore/postABL")
const updateABL = require("../abl/chore/updateABL")
const completeABL = require("../abl/chore/completeABL")
const deleteABL = require("../abl/chore/deleteABL")
const listABL = require("../abl/chore/listABL")

router.use("/get", getAbl)
router.use("/list", listABL)
router.use("/post", postABL)
router.use("/update", updateABL)
router.use("/delete", deleteABL)
router.use("/complete", completeABL)

module.exports = router