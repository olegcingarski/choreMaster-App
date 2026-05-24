const AJV = require('ajv')
const ajv = new AJV()
const choreDAO = require('../../dao/chore-dao')

const listSchema = {
    type: "object",  
    properties : {
        categoryId : {type : "string"}
    },
    additionalProperties: false
}

const validation = ajv.compile(listSchema)

async function listABL(req,res) {
    let data = req.query
    if (!validation(data)) {
        res.status(400).json({error: "Invalid input."})
    }
    if (data.categoryId) {
        let list = choreDAO.listChoreDAO(data.categoryId)
        return res.send(list)
    }
    let finalData = choreDAO.listChoreDAO()
    return res.send(finalData)
}

module.exports = listABL