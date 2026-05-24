const choreDAO = require("../../dao/chore-dao")

async function deleteABL(req, res) {
    if (!req.query.id) {
        res.status(400).send("Invalid input, can not locate Chore.")
    }
    else {
        try {
            choreDAO.deleteChoreDAO(req.query.id)
            res.status(200).send("The Chore has been successfully deleted.")
        } catch (error) {
            throw error
        }
    }
}

module.exports = deleteABL