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
    let id = req.query.categoryId
    if (id) {
        let data = choreDAO.listChoreDAO(id)
        res.send(data)
    }
    let data = choreDAO.listChoreDAO()
    res.send(data)
}

module.exports = listABL