const AJV = require('ajv')
const ajvFormats = require('ajv-formats')
const ajv = new AJV()
ajvFormats(ajv)
const choreDAO = require("../../dao/chore-dao")

const postChoreSchema = {
    type: "object",
    properties: {
        title : {type : "string"},
        desc : {type : "string", default: ""},
        categoryId : {type: "string"},
        urgencyStatus : {type : "string", default: "false"},
        urgencyDate : {type : "string", format : "date"}
    },
    required:["title", "categoryId"],
    additionalProperties: false
    
}

const validation = ajv.compile(postChoreSchema)

async function postABL(req, res) {
    if (!validation(req.query) || req.query === "") {
        res.status(400).json({error:validation.errors})
    }
    if (req.query.urgencyStatus === "true" && (!req.query.urgencyDate || req.query.urgencyDate === "")) {
        res.status(400).send("Missing input in urgency fields.")
    }
    else {
         let data = choreDAO.postChoreDAO(req.query.title, Number(req.query.categoryId), req.query.desc, req.query.urgencyStatus, req.query.urgencyDate)
        res.status(200).send(data)
    }
}


module.exports = postABL