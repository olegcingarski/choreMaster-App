const choreDAO = require("../../dao/chore-dao")

async function completeABL(req, res) {
    let id = req.query.id
    try {
        let completedCategory = choreDAO.completeChoreDAO(id)
        res.send(completedCategory)
    }catch(error) {
        console.log("Error")
    }
}

module.exports = completeABL