import CategoryList from "./categoryList";
import CategoryProvider from "./categoryProvider";
import Container from "react-bootstrap/esm/Container";

function Categories () {
    return ( 
        <Container>
            <CategoryProvider>
                <CategoryList />
            </CategoryProvider>
        </Container>
    )
}

export default Categories