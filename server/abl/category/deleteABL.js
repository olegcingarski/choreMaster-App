const categoryDAO = require("../../dao/category-dao.js")

async function deleteCategoryABL(req, res) {
    let data = req.query
    if (!data.id || data.id==="") {
        res.status(400).send("Can not locate Category.")
    }
    else {
        try {
            categoryDAO.deleteCategoryDAO(data.id)
        } catch (e) {
            throw e
        }

    }
}
/// TODO napojit, teda smazat vsechny Chores v te kategorii.

module.exports = deleteCategoryABL