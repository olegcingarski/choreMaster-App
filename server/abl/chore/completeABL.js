const choreDAO = require("../../dao/chore-dao")

async function completeABL(req, res) {
    let id = req.body.id
    if (!id || id === "") {
        res.status(400).json({error : "Invalid input."})
    }
    try {
        choreDAO.completeChoreDAO(id)
        res.send("Selected Chore is completed.")
    } catch (error) {
        res.status(error.status || 500).json({error : error.message})
    }
}

module.exports = completeABL