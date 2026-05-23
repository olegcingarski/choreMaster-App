const fs = require("fs")
const path = require("path")

const thisPath = path.join(__dirname, "storage", "choreList")

function getChoreDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        let data = fs.readFileSync(filePath, "utf8")
        return JSON.parse(data)

    } catch(error) {
        if (error.code === "ENOENT") {
            return "Chore not found."
        }
    }
}

function postChoreDAO (title, categoryId, desc, urgencyStatus, urgencyDate) {
    let newChore = {}
    if (!categoryIdFinder(categoryId)) {
        return ("Category does not exist")
    }
    else {
        try {
            let list = indexingID(thisPath)
            newChore.id = list[list.length-1] + 1
            newChore.categoryId = categoryId 
            newChore.title = title
            desc ? newChore.desc = desc : newChore.desc = ""
            urgencyStatus ?  newChore.urgencyDate = urgencyStatus : newChore.urgencyStatus = "false"
            if (urgencyStatus === "true") {
                let today = new Date()
                if (Date.parse(urgencyDate) < today) {
                    return "Invalid urgency date input."
            }}
            newChore.date = String(new Date().toISOString())
            newChore.completionStatus = false

            let filePath = path.join(thisPath, `${newChore.id}.json`)

            fs.writeFileSync(filePath, JSON.stringify(newChore), "utf8")

            return newChore
            

        } catch (error) {
            console.log(error)
            return "Error occured."
        }

        
    }

}

function updateChoreDAO(data) {
    try {
        const filePath = path.join(thisPath, `${Number(data.id)}.json`)
        const choreData = JSON.parse(fs.readFileSync(filePath, "utf8"))
        data.title ? choreData.title = String(data.title) : choreData.title = choreData.title
        data.desc ? choreData.desc = String(data.desc) : choreData.desc = choreData.desc
        if (data.urgencyStatus && (data.urgencyStatus !== choreData.urgencyStatus)) {
            if (data.urgencyStatus === "true") {
                if (!data.urgencyDate) {
                    return "Urgency status must contain a valid urgency date." 
                }
                else {
                    let today = new Date()
                    let parsed = Date.parse(data.urgencyDate)
                    if (parsed < today) {
                        return "Can not go back in time :)."
                    }
                    else {
                        choreData.urgencyDate = data.urgencyDate
                    }
                }
            }
            else {
                choreData.urgencyStatus = "false"
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(choreData), "utf8")
        return "Successfully updated Chore."
    } catch(error) {
        if (error.code === "ENOENT") {
            return "Error: Non-existant Chore."
        }
    }
}

function deleteChoreDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        fs.unlinkSync(filePath)
        return true
    } catch (error) {
        if (error.code === "ENOENT") {
            return "Error: Chore does not exist."
        }
        else {
            return "Server error."
        }
    }

}

function completeChoreDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        let data = JSON.parse(fs.readFileSync(filePath, "utf8"))
        data.completionStatus = true
        fs.writeFileSync(filePath, JSON.stringify(data), "utf8")
        return data
    } catch (error) {
        if (error.code === "ENOENT") {
            return "This Chore does not exist."
        }

    }
    
}

function listChoreDAO(categoryId) {
    if (categoryIdFinder(categoryId) === false) {
        return "Error: Category does not exist."
    }
    let list = fs.readdirSync(thisPath)
    if (list.length === 0) {
        return "No Chores found."
    }
    let array = []
    list.map((item) => {
        let jsonItem = JSON.parse(fs.readFileSync(`${thisPath}/${item}`, "utf8"))
        if (jsonItem.completionStatus === false && jsonItem.categoryId === categoryId) {
            array.push(jsonItem)

        }
    });
    if (array.length < 1) {
        return "No active Chores in this Category."
    }
    return array
}


function indexingID (path) {
    let list = fs.readdirSync(path)
    list = list.map((item) => Number(item.slice(0,item.length-5)))
    return list
}

function categoryIdFinder(id) {
    const categoryPath = path.join(__dirname,"storage","categoryList")
    let categoryIDs = fs.readdirSync(categoryPath).map((item)=>JSON.parse(fs.readFileSync(`${categoryPath}/${item}`)).id)
    if (categoryIDs.includes(id)) {
        return true
    }
    else {
        return false
    }
}



module.exports = {
    getChoreDAO,
    postChoreDAO,
    updateChoreDAO,
    deleteChoreDAO,
    listChoreDAO,
    completeChoreDAO
}