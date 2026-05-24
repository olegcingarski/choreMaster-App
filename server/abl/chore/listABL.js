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
    if (data.id) {
        let data = choreDAO.listChoreDAO(id)
        res.send(data)
    }
    let finalData = choreDAO.listChoreDAO()
    res.send(finalData)
}

module.exports = listABL