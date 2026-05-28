const categoryDAO = require("../../dao/category-dao")

async function listCategoryABL(req, res) {
    try {
        const data = categoryDAO.listCategoryDAO()
        return res.status(200).json({listOfItems : data})
    } catch (e) {
        throw e
    }

}
module.exports = listCategoryABL