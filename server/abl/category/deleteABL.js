const AJV = require('ajv')
const ajv = new AJV()
const categoryDAO = require("../../dao/category-dao.js")

const postCategorySchema = {
    type : "object", 
    properties : {
        id : { type : "string"}
    },
    required : ["id"],
    additionalProperties : false
}

const validation = ajv.compile(postCategorySchema)

async function deleteCategoryABL(req, res) {
    let data = req.query
    if (!validation(data)) {
        res.status(400).send("Can not locate Category.")
    }
    else {
        try {
            categoryDAO.deleteCategoryDAO(data.id)
            return "Category has been successfully deleted."
        } catch (e) {
            throw e
        }

    }
}
/// TODO napojit, teda smazat vsechny Chores v te kategorii.

module.exports = deleteCategoryABL