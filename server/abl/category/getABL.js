const categoryDAO = require("../../dao/category-dao.js")

async function getABL(req, res) {
    const id = req.query.id
    if (!id || id===""){
        res.status(400).send("Please provide correct input.")
    }
    const data = categoryDAO.getCategoryDAO(id)
    res.send(data)

}

module.exports = getABL