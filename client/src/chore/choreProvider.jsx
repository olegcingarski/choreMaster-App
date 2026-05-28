import { useEffect, useState, createContext, useContext } from "react";
import FetchHelperLine from "../helper-line";
import { CategoryContext } from "../category/categoryProvider";

export const ChoreContext = createContext()

const ChoreListProvider = ({children}) => {

    const categoryContext = useContext(CategoryContext);
    const categoryList = categoryContext?.data?.listOfItems || [];

    const [categoryFilter, setCategoryFilter] = useState("all")
    

    const [choreList, setChoreList] = useState({
        state : "loaded",
        data : {itemList : []},
        error: null,
    })

    async function HandleLoad() {
        setChoreList((current) => ({...current, state: "loading"}))

        const params = categoryFilter !== "all" ? 
            { categoryId: selectedCategoryFilter } :
            {}

        const result = FetchHelperLine.chore.list(params)
        setChoreList((current) => {
            if (result.ok) {
                return {...current, state : "loaded", data:result.data.listOfItems, error:null}
            }
            else {
                return {...current, state : "error", error : result.error}
            }
        })
    }

    const HandleCreate = async(data) => {
        setChoreList((current) => {return {...current, state:"loading"}})
        const response = await FetchHelperLine.chore.post(data)
        setChoreList((current) => {
            if (response.ok) {
                const currentItems = current.data?.listOfItems || [];
                return {
                    ...current, //
                    state : "loaded",
                    data : {...current.data, listOfItems : [...currentItems, response.data]},
                    error: null
                }
            } else {
                return {...current, error: response.error, state : "error"}
            }
        })
        return {ok : response.ok, error : response.ok ? undefined : response.error}
    }

    const HandleUpdate = async(data) => {
        setChoreList((current) => {return {...current, state:"loading"}})
        const response = await FetchHelperLine.chore.update(data)
        setChoreList((current) => {
            if (response.ok) {
                let copy = [...current.data.listOfItems]
                let index = current.data.listOfItems.findIndex((item) => item.id === data.id)
                if (index !== -1) copy[index] = response.data
                return {...current,
                    data : {...current.data, listOfItems : copy},
                    state : "loaded", 
                    error: null
                }
            }
            else {
                return {...current, error: response.error, state : "error"}
            }
        })
         return {ok : response.ok, error : response.ok ? undefined : response.error}
    }

    const HandleDelete = async(data) => {
        setChoreList((current) => {return {...current, state:"loading"}})
        const response = await FetchHelperLine.chore.delete(data)
        setChoreList((current) => {
            if (response.ok) {
                let copy = current.data.listOfItems.filter((item) => item.id !== data.id)
                return {...current, 
                    data : {...current.data, listOfItems : copy},
                    state: "loaded",
                    error: null
                }
            }
            else {
                return {...current, error: response.error, state : "error"}
            }
        })
        return {ok : response.ok, error : response.ok ? undefined : response.error}
    }



    const HandleComplete = async (data) => {
        setChoreList((current) => {return {...current, state:"loading"}})
        const response = await FetchHelperLine.chore.complete(data)
        setChoreList((current) => {
            if (response.ok) {
                let copy = current.data.listOfItems.filter((item) => item.id !== data.id)
                return {...current,
                    data : {...current.data, listOfItems : copy},
                    state: "loaded",
                    error: null
                }
            } else {
                return {...current, error: response.error, state : "error"}
            }
        })
        return {ok : response.ok, error : response.ok ? undefined : response.error}
    }

    const value={...choreList, categoryFilter, setCategoryFilter, handlerMap : {HandleLoad, HandleUpdate, HandleDelete, HandleCreate, HandleComplete}}

    return <ChoreContext.Provider value={value}> {children} </ChoreContext.Provider>


}

