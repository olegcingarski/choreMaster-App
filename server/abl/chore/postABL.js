const AJV = require('ajv')
const ajvFormats = require('ajv-formats')
const ajv = new AJV()
ajvFormats(ajv)
const choreDAO = require("../../dao/chore-dao")

const postChoreSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        desc: { type: "string", default: "" },
        categoryId: { type: "string" },
        urgencyStatus: { type: "string", default: "false" },
        urgencyDate: { type: "string", format: "date" }
    },
    required: ["title", "categoryId"],
    if: {
        properties: { urgencyStatus: { const: "true" } },
        required: ["urgencyStatus"] 
    },
    then: {
        required: ["urgencyDate"]
    },
    
    additionalProperties: false
};

const validation = ajv.compile(postChoreSchema)

async function postABL(req, res) {
    if (!validation(req.body) || req.body === "") {
        res.status(400).json({error:validation.errors})
    }
    if (req.body.urgencyStatus === "true" && (!req.body.urgencyDate || req.body.urgencyDate === "")) {
        res.status(400).send("Missing input in urgency fields.")
    }
    else {
         let data = choreDAO.postChoreDAO(req.body.title, Number(req.body.categoryId), req.body.desc, req.body.urgencyStatus, req.body.urgencyDate)
        res.status(200).send(data)
    }
}


module.exports = postABL