const AJV = require('ajv')
const ajvFormats = require('ajv-formats')
const ajv = new AJV()
ajvFormats(ajv)
const choreDAO = require("../../dao/chore-dao")

const updateChoreSchema = {
    type: "object",
    properties: {
        id : {type : "string"},
        title : {type : "string"},
        desc : {type : "string"},
        categoryId : {type: "string"},
        urgencyStatus : {type : "string"},
        urgencyDate : {type : "string", format : "date"}
    },
    required:["id"],

    if : {properties : {urgencyStatus : {const : "true"}},
        required : ["urgencyStatus"]},
    then : {required : ["urgencyDate"]},
    additionalProperties: false
    
}
const validation = ajv.compile(updateChoreSchema)

async function updateABL(req, res) {
    let data = req.body
    if (!validation(data)) {
        return res.status(400).json({error:"Invalid input", details:validation.errors})
    }
        try {
            const updatedData = choreDAO.updateChoreDAO(data);
            return res.status(200).json(updatedData)
        }
        catch (error) {
            return res.status(400).send(error)
        }

}

module.exports = updateABL