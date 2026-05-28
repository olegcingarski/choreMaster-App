const choreDAO = require("../../dao/chore-dao")

async function deleteABL(req, res) {
    if (!req.body.id) {
        return res.status(400).json({error:"Invalid input, can not locate Chore."})
    }
    else {
        try {
            choreDAO.deleteChoreDAO(req.body.id)
            return res.status(200).json({message:"The Chore has been successfully deleted."})
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.message })
        }
    }
}

module.exports = deleteABL