const AJV = require('ajv')
const ajv = new AJV()
const choreDAO = require("../../dao/chore-dao")

const getChoreSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

const validation = ajv.compile(getChoreSchema)

async function getABL (req, res) {
    if (!validation(req.query)) {
        res.status(400).send("Invalid input.")
    }
    res.send(choreDAO.getChoreDAO(req.query.id))
}

module.exports = getABL