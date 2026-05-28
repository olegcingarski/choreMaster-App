import { useContext, useEffect } from "react";
import { CategoryContext } from "./categoryProvider";
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/esm/Button";
import Category from "./category";

function CategoryList () {
    const {data, state, handlerMap} = useContext(CategoryContext)

    return(
        <div>
            <Stack direction="horizontal" gap={3}>
                <h2>List of categories</h2>
                <Button variant="success" onClick={() => {handlerMap.ListOfCategories()}}>Refresh</Button>
            </Stack>
            <Stack gap={2}>
                <Category />
                {data?.listOfItems && data?.listOfItems.length > 0 ? (
                data.listOfItems.map((item) => 
                    <Category key={item.id} data={item}/>
                )
            ):(
                <p>No registered categories.</p>
            )
        }
            </Stack>
        
        </div>
    )

    
}

export default CategoryList