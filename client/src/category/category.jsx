import { useState, useContext} from "react";
import { CategoryContext } from "./categoryProvider"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col";

// import @mdi

function Category ({data}) {
    const {state, handlerMap} = useContext(CategoryContext)
    const [name, setName] = useState(data?.name || "")

    const handlePost = async () => {
        await handlerMap.HandlePost(name)
        setName("")
    }

    const handleUpdate = async() => {
        handlerMap.HandleUpdate(data.id, name)
    };

    return (
        <Container fluid className="py-3">
            <Row>
                <Col xs={12} md={4}>
                    <Stack direction="horizontal" gap={3} className="mb-3">
                        <Form.Control 
                        type="text" 
                        placeholder="Category name" 
                        required 
                        value={name}
                        onChange={(e) => {setName(e.target.value)}} 
                        className="me-auto"
                        />
                        {!data?.id ? (<Button type="button" disabled={!name || state === "creating"} onClick={() => handlePost()}>Create</Button>) : 
                        (<Button type="submit" disabled={data?.name === name || state === "updating"} onClick={() => handleUpdate()}>Update</Button>)}
        
                    </Stack>
                </Col>
            
            </Row>
        </Container>
        
    )


}
export default Category