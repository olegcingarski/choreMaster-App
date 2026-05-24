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
        let error = new Error("Category does not exist.")
        error.status = 400
        throw error
    }
    else {
        try {
            let list = indexingID(thisPath)
            newChore.id = String(list[list.length-1] + 1)
            newChore.categoryId = String(categoryId)
            newChore.title = title
            desc ? newChore.desc = desc : newChore.desc = ""
            urgencyStatus ?  newChore.urgencyDate = urgencyStatus : newChore.urgencyStatus = "false"
            if (urgencyStatus === "true") {
                let today = new Date()
                if (Date.parse(urgencyDate) < today) {
                    let err = new Error("Invalid input: Choose an upcoming date.")
                    err.status = 400
                    throw err
            }}
            newChore.date = String(new Date().toISOString())
            newChore.completionStatus = false

            let filePath = path.join(thisPath, `${newChore.id}.json`)

            fs.writeFileSync(filePath, JSON.stringify(newChore), "utf8")

            return newChore
            

        } catch (error) {
            throw error
        }

        
    }

}

function updateChoreDAO(data) {
    const filePath = path.join(thisPath, `${Number(data.id)}.json`)
        let choreData;
        try {
            choreData = JSON.parse(fs.readFileSync(filePath, "utf8"))
        } catch (error) {
            if (error.code === "ENOENT") {
                const err = new Error("Error: Non-existant Chore.")
                throw err
            }
            throw error
        }

        data.title ? choreData.title = String(data.title) : choreData.title = choreData.title
        data.desc ? choreData.desc = String(data.desc) : choreData.desc = choreData.desc

        if (data.urgencyStatus && (data.urgencyStatus !== choreData.urgencyStatus)) {
            if (data.urgencyStatus === "true") {
                if (!data.urgencyDate) {
                    let err = new Error("Urgency status must contain a valid urgency date.")
                    err.status = 400
                    throw err
                }
                else {
                    let today = new Date()
                    today.setHours(0, 0, 0, 0)
                    let parsed = Date.parse(data.urgencyDate)
                    if (parsed < today) {
                        let err = new Error("Cannot assign a date in the past.")
                        err.status = 400
                        throw err
                    }
                    else {
                        choreData.urgencyStatus = "true"
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
            throw error
        }
    }

}

function completeChoreDAO(id) {
    try {
        const filePath = path.join(thisPath, `${id}.json`)
        let data = JSON.parse(fs.readFileSync(filePath, "utf8"))
        if (data.completionStatus === true) {
            let err = new Error("This Chore has already been completed.")
            err.status = 400
            throw err
        }
        data.completionStatus = true
        fs.writeFileSync(filePath, JSON.stringify(data), "utf8")
        return "Chore has been successfully completed."
    } catch (error) {
        if (error.code === "ENOENT") {
            return "This Chore does not exist."
        }
    }  
}

function listChoreDAO(...params) {
    let list = fs.readdirSync(thisPath)
    if (list.length === 0) {
        let err = new Error("Chore list empty.")
        err.status = 400
        throw err
            
        }
    if (typeof params[0] === "string") {
        if (categoryIdFinder(Number(params[0])) === false) {
            let err = new Error("Category does not exist.")
            err.status = 400
            throw err
        }
        let array = []
        list.map((item) => {
            let jsonItem = JSON.parse(fs.readFileSync(`${thisPath}/${item}`, "utf8"))
            if (jsonItem.completionStatus === false && jsonItem.categoryId === params[0]) {
                array.push(jsonItem)

            }
        });
        if (array.length < 1) {
            let err = new Error("No active Chores in this Category.")
            err.status = 400
            throw err
        }
        return array
    }
    
    let array = []
    list.map((item) => {
        let jsonItem = JSON.parse(fs.readFileSync(`${thisPath}/${item}`, "utf8"))
        if (jsonItem.completionStatus === false) {
            array.push(jsonItem)

        }
    });
    if (array.length < 1) {
        let err = new Error("No active Chores.")
        err.status = 400
        throw err
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