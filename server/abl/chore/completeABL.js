const choreDAO = require("../../dao/chore-dao")

async function completeABL(req, res) {
    let id = req.query.id
    if (!id || id === "") {
        res.status(400).json({error : "Invalid input."})
    }
    try {
        let markAsComplete = choreDAO.completeChoreDAO(id)
        res.send("Selected Chore is completed.")
    } catch (error) {
        throw error
    }
}

module.exports = completeABL