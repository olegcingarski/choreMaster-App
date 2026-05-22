const express = require("express")
const router = express.Router()

const getCategoryABL = require("../abl/category/getABL")
const postCategoryABL = require("../abl/category/postABL") 
const updateCategoryABL = require("../abl/category/updateABL")
const deleteCategoryABL = require("../abl/category/deleteABL")
const listCategoryABL = require("../abl/category/listABL")

router.use("/get", getCategoryABL)

router.use("/list", listCategoryABL)

router.use("/post", postCategoryABL)

router.use("/update", updateCategoryABL)

router.use("/delete", deleteCategoryABL) 

module.exports = router