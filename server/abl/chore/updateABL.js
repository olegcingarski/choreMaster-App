const choreDAO = require("../../dao/chore-dao")

async function updateABL(req, res) {
    const data = req.query
    if (!data.id) {
        res.status(400).send("Invalid input, choose an existing Chore.")
    }
    if (data.urgencyStatus && !["true", "false"].includes(data.urgencyStatus)) {
        res.status(400).send("Invalid urgency status input.")
    }
    else {
        try {
            const updatedData = choreDAO.updateChoreDAO(data);
            res.status(200).send(updatedData)
        }
        catch (error) {

            res.status(400).send(error.code)
        }
    }

}

module.exports = updateABL