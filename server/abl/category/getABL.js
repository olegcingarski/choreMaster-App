const AJV = require('ajv')
const ajv = new AJV()
const categoryDAO = require("../../dao/category-dao.js")

const getCategorySchema = {
    type : "object", 
    properties : {
        id : { type : "string"}
    },
    required : ["id"],
    additionalProperties : false
}

const validation = ajv.compile(getCategorySchema)


async function getABL(req, res) {
    const id = req.body
    if (!validation(id)){
        return res.status(400).json({error : "Invalid input"})
    }
    const data = categoryDAO.getCategoryDAO(id)
    return es.send(data)

}

module.exports = getABL