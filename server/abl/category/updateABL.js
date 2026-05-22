const categoryDAO = require("../../dao/category-dao")

async function updateCategoryABL(req, res) {
    let data = req.query
    if (!data.id) {
        res.status(400).send("Can not locate Category.")
    }
    if (data.name === "" || !categoryDAO.nameChecking(data.name)) {
        res.status(400).send("Can not duplicate categories.")
    }
    let update = categoryDAO.updateCategoryDAO(data.id, data.name)
    res.send("Successfully updated the Category.")
    
}

module.exports = updateCategoryABL