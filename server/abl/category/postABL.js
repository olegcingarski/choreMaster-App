const AJV = require('ajv')
const ajv = new AJV()
const categoryDAO = require("../../dao/category-dao")

const postCategorySchema = {
    type: "object",
    properties : {
        name : {type : "string"}
    },
    required: ["name"],
    additionalProperties : false
};

const validation = ajv.compile(postCategorySchema)

async function postABL(req, res) {
    let data = req.query
    if (!validation(data) || data.name === "") {
        res.status(400).send("Name of category required.")
    }
    if (!categoryDAO.nameChecking(data.name)) {
        res.status(400).send("Can not duplicate categories.")
    }
    else {
        let category = categoryDAO.postCategoryDAO(data.name)
        res.status(200).send(category)
    }

}

module.exports = postABL