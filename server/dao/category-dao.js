const fs = require("fs")
const path = require("path")


const thisPath = path.join(__dirname, "storage", "categoryList")

function getCategoryDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        const data = fs.readFileSync(filePath, "utf8")
        return (JSON.parse(data))
    }catch (e) {
        if (e.code === "ENOENT") {
            throw "Category does not exist."
        }
    }
}

function listCategoryDAO() {
    let list = []
    try {
        let folder = fs.readdirSync(thisPath)
        folder.map((item) => {
            let itemPath = path.join(thisPath, item)
            list.push(JSON.parse(fs.readFileSync(itemPath, "utf8")))
        })
        if (list.length < 1) {
            let err = new Error("No categories found.")
            err.status = 400
            throw err
        }
        return list
    }catch(error) {
        return "File System error."
    }
}



function postCategoryDAO(name) {
    try{
        let category = {}
        var ids = indexingID(thisPath)
        category.id = ids[ids.length - 1] + 1
        category.name = name
        const filePath = path.join(thisPath, `${category.id}.json`)
        fs.writeFileSync(filePath, JSON.stringify(category), "utf8")
        return category
    }catch (error) {
        throw error

    }
}


function updateCategoryDAO(id, name) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        let data = JSON.parse(fs.readFileSync(filePath, "utf8"))
        data.name = name 
        fs.writeFileSync(filePath, JSON.stringify(data), "utf8")
        return data
    }catch (error) {
        if (error.code === "ENOENT") {
            throw "Category does not exist."
        }
    }
}

function deleteCategoryDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        fs.unlinkSync(filePath)
        return true
    }catch (error) {
        if (error.code === "ENOENT") {
            throw "Category does not exist."
        }
    }
    
}

function indexingID (path) {
    let list = fs.readdirSync(path)
    list = list.map((item) => Number(item.slice(0,item.length-5)))
    return list
}

function nameChecking(name) {
    let list = fs.readdirSync(thisPath)
    list = list.map((item) => JSON.parse(fs.readFileSync(`${thisPath}/${item}`,"utf-8")).name)
    if (!list.includes(name)) {
        return true
    }
    else {
        return false
    }
}


module.exports = {
    getCategoryDAO,
    postCategoryDAO,
    updateCategoryDAO,
    deleteCategoryDAO,
    listCategoryDAO,
    nameChecking
}