const choreDAO = require('../../dao/chore-dao')


async function listABL(req,res) {
    let data = choreDAO.listChoreDAO()
    res.send(data)
}

module.exports = listABL