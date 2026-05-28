const AJV = require('ajv')
const ajv = new AJV()
const categoryDAO = require("../../dao/category-dao")

const updateCategorySchema = {
    type : "object", 
    properties : {
        id : { type : "string"},
        name: { type : "string",
                minLength : 1,
        }
    },
    required : ["id", "name"],
    additionalProperties : false
}

const validation = ajv.compile(updateCategorySchema)

async function updateCategoryABL(req, res) {
    let data = req.body
    console.log(data)
    if (!validation(data)) {
        return res.status(400).send("Can not locate Category.")
    }
    if (data.name === "" || !categoryDAO.nameChecking(data.name)) {
        return res.status(400).send("Can not duplicate categories.")
    }
    let update = categoryDAO.updateCategoryDAO(data.id, data.name)
    return res.send(update)
    
}

module.exports = updateCategoryABL