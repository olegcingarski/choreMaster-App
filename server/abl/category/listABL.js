const categoryDAO = require("../../dao/category-dao")

async function listCategoryABL(req, res) {
    try {
        const data = categoryDAO.listCategoryDAO()
        res.send(data)
    } catch (e) {
        throw e
    }

}


module.exports = listCategoryABL