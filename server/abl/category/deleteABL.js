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
    let data = req.body
    console.log(data)
    if (!validation(data)) {
        return res.status(400).send("Can not locate Category.")
    }
    else {
        try {
            let deleted = categoryDAO.deleteCategoryDAO(data.id)
            return res.status(200).json(deleted)
        } catch (e) {
            throw e
        }

    }
}
/// TODO napojit, teda smazat vsechny Chores v te kategorii.

module.exports = deleteCategoryABL