const choreDAO = require("../../dao/chore-dao")

async function getABL (req, res) {
    if (!req.query.id || req.query.id === "") {
        res.status(400).send("Invalid input.")
    }
    res.send(choreDAO.getChoreDAO(req.query.id))
}
// TODO!!!

module.exports = getABL