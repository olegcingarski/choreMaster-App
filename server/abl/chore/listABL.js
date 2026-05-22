const choreDAO = require('../../dao/chore-dao')


async function listABL(req,res) {
    let id = Number(req.query.categoryId)
    if (!id) {
        res.status(400).send("Invalid input, choose a Category to flter through.")
    }
    let data = choreDAO.listChoreDAO(id)
    res.send(data)
}

module.exports = listABL