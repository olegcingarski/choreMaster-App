const AJV = require('ajv')
const ajv = new AJV()
const categoryDAO = require("../../dao/category-dao")

const getCategorySchema = {
    type : "object", 
    properties : {
        id : { type : "string"}
    },
    required : ["id"],
    additionalProperties : false
}

const validation = ajv.compile(getCategorySchema)

async function updateCategoryABL(req, res) {
    let data = req.query
    if (!validation(data)) {
        res.status(400).send("Can not locate Category.")
    }
    if (data.name === "" || !categoryDAO.nameChecking(data.name)) {
        res.status(400).send("Can not duplicate categories.")
    }
    let update = categoryDAO.updateCategoryDAO(data.id, data.name)
    res.send("Successfully updated the Category.")
    
}

module.exports = updateCategoryABL