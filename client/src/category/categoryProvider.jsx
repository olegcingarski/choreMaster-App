import { useState, useEffect, createContext } from "react";

export const CategoryContext = createContext()

const CategoryProvider = ({children}) => {

  const [data, setData] = useState()
  const [error, setError] = useState()
  const [state, setState] = useState()

  const ListOfCategories = async() => {
      setState("loading")
      const response = await fetch('/category/list',
        {method : "GET"}
      )
      if (response.ok) {
        const list = await response.json()
          setData(list)
          setState("success")
        
      
        
      }
      else {
        setError(response.statusText)
        setState("error")
      }
  }

  const HandlePost = async (name) => {
    setState("creating")
    const response = await fetch('/category/post', {
      method : "POST",
      headers: {"Content-Type" : "application/json"},
      body : JSON.stringify({name})
    })

    if (response.ok) {
      let newData = await response.json()
      setData((currentData) => {
        const oldItems = currentData?.listOfItems || [];
        return {...currentData,
          listOfItems : [...oldItems, newData]
        }
      })
      setState('success')
    }
    else {
      setError(response.error)
      setState("error")

    }
    
  }

  const HandleUpdate = async (id, name) => {
    setState("updating")
    const response = await fetch('/category/update', {
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({id, name})
    })
    if (response.ok) {
      const updatedCategory = await response.json()
      setData((currentData) => {
        let copyOfCurrentdata = [...currentData.listOfItems]
        const index = currentData.listOfItems.findIndex((item) => 
        item.id === id)
        copyOfCurrentdata[index] = updatedCategory
        return {...currentData,
          listOfItems : copyOfCurrentdata
        }
      })
      console.log(data)
      setState('success')
    }
    else {
      setError(response.statusText)
      setState('error')
    }
    
  }

  const HandleDelete = async (id) => {
    setState("loading")
    const response = await fetch('/category/delete', {
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({id})
    })
    if (response.ok) {
      setData((currentData) => {
        let copyOfCurrentData = currentData.listOfItems.filter((item) => item.id !==id)
        return {...currentData,
          listOfItems : copyOfCurrentData
        }
      })
      setState('success')
    }
    else {
      setError(response.statusText)
      setState('error')
    }
  }


    useEffect(() => {
      ListOfCategories()
      }, []);

      return <CategoryContext.Provider value={{data, error, state, handlerMap:{ListOfCategories, HandlePost, HandleUpdate, HandleDelete}}}> {children} </CategoryContext.Provider>

  };

 
export default CategoryProvider
