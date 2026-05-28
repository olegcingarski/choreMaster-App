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
    try {
        let data = (req.body && Object.keys(req.body).length > 0) ? req.body : req.query;
        if (!validation(data)) {
            res.status(400).json({error: "Invalid input."})
        }
        if (data.categoryId) {
            let list = choreDAO.listChoreDAO(data.categoryId)
            return res.status(200).json({listOfItems : list})
        }
        let finalData = choreDAO.listChoreDAO()
        return res.status(200).json({listOfItems : finalData})
            
    } catch (error) {
        res.status(error.status || 500).json({error : error.message})
    }
    
}

module.exports = listABL